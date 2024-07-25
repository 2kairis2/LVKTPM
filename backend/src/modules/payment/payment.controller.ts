import { Request, Response } from 'express';
import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';
import orderService from '~/modules/order/order.service';
import { StatusOrder } from '~/types';
import { handleError, responseWithData, responseWithMessage } from '~/helper';
import { RESPONSE_CODE_VNPAY } from '~/constants';

const paymentController = {
    createPaymentVnp: async (req: Request, res: Response) => {
        try {
            const { amount, language: locale = 'vn', bankCode, orderId } = req.body;

            await orderService.invalidOrder(orderId, { status: [StatusOrder.PENDING] });

            const date = new Date();
            const createDate = moment(date).format('YYYYMMDDHHmmss');

            const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

            const tmnCode = process.env.VNP_TMN_CODE;
            const secretKey = process.env.VNP_HASH_SECRET || '';
            let vnpUrl = process.env.VNP_URL || '';
            const returnUrl = process.env.VNP_RETURN_URL;

            const currCode = process.env.CURR_CODE || 'VND';
            let vnp_Params: Record<string, any> = {};
            vnp_Params['vnp_Version'] = '2.1.0';
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = tmnCode;
            vnp_Params['vnp_Locale'] = locale;
            vnp_Params['vnp_CurrCode'] = currCode;
            vnp_Params['vnp_TxnRef'] = orderId;
            vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
            vnp_Params['vnp_OrderType'] = 'billpayment';
            vnp_Params['vnp_Amount'] = amount * 100;
            vnp_Params['vnp_ReturnUrl'] = returnUrl;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_CreateDate'] = createDate;
            if (bankCode !== null && bankCode !== '') {
                vnp_Params['vnp_BankCode'] = bankCode;
            }

            vnp_Params = sortObject(vnp_Params);

            const signData = querystring.stringify(vnp_Params, { encode: false });

            const hmac = crypto.createHmac('sha512', secretKey);
            const buffer = Buffer.from(signData, 'utf8');
            const signed = hmac.update(buffer).digest('hex');
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
            console.log('🚀 ~ createPaymentVnp: ~ vnpUrl:', vnpUrl);

            res.redirect(vnpUrl);
        } catch (error) {
            handleError(error, res);
        }
    },

    vnpayIpn: async (req: Request, res: Response) => {
        try {
            let vnp_body = req.body;
            const secureHash = vnp_body['vnp_SecureHash'];

            const orderId = vnp_body['vnp_TxnRef'];
            const rspCode = vnp_body['vnp_ResponseCode'] as string;
            const amount = +(vnp_body['vnp_Amount'] as string) / 100;
            const bankTransNo = vnp_body['vnp_BankTranNo'];
            const bankCode = vnp_body['vnp_BankCode'];
            const paymentDate = vnp_body['vnp_PayDate'];

            delete vnp_body['vnp_SecureHash'];
            delete vnp_body['vnp_SecureHashType'];

            vnp_body = sortObject(vnp_body);

            const secretKey = process.env.VNP_HASH_SECRET || '';

            const signData = querystring.stringify(vnp_body, { encode: false });
            const hmac = crypto.createHmac('sha512', secretKey);
            const buffer = Buffer.from(signData, 'utf8');
            const signed = hmac.update(buffer).digest('hex');

            const order = await orderService.getOrderById(orderId as string);

            if (secureHash !== signed) {
                responseWithMessage({ res, status: 200, message: 'Sai mã' });
            }
            if (order.total_price !== amount) {
                responseWithMessage({ res, status: 200, message: 'Tiền thanh toán không chính xác' });
            }
            if (rspCode == '00') {
                const payment_info = `Thanh toán thành công qua VNPAY mã GD: ${orderId} - Ngân hàng: ${bankCode} - Mã giao dịch: ${bankTransNo} - Ngày thanh toán: ${paymentDate}`;
                await orderService.updateOrder(orderId as string, {
                    payment_info,
                    paid: true,
                });
                responseWithData({ res, status: 200, data: { code: rspCode }, message: 'Giao dịch thành công' });
            }

            responseWithData({
                res,
                status: 200,
                data: { code: rspCode },
                message: Object.prototype.hasOwnProperty.call(RESPONSE_CODE_VNPAY, rspCode)
                    ? RESPONSE_CODE_VNPAY[rspCode]
                    : 'Không xác định',
            });
        } catch (error) {
            handleError(error, res);
        }
    },
};

export default paymentController;

function sortObject(obj: any) {
    const sorted: Record<string, any> = {};
    const str: Array<string> = [];
    let key;
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
