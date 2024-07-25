import { Router } from 'express';

import paymentController from './payment.controller';
import { authorization, validateDto } from '~/middlewares';
import { CreatePaymentVNPDto, PaymentVNPIpnDto } from '~/modules/payment/dtos';

const router = Router();

router.post('/vnpay', authorization, validateDto(CreatePaymentVNPDto), paymentController.createPaymentVnp);
router.post('/vnpay-ipn', authorization, validateDto(PaymentVNPIpnDto), paymentController.vnpayIpn);

export default router;
