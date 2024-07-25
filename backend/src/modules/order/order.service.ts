import mongoose from 'mongoose';
import Order from './order.model';
import { CustomError } from '~/helper';
import cartService from '~/modules/cart/cart.service';
import productDetailService from '~/modules/product-detail/product-detail.service';
import { HttpStatus, StringOrObjectId, IOrder, IProduct, StatusOrder } from '~/types';

const orderService = {
    createOrder: async (data: IOrder) => {
        let totalPrice = 0;

        for (const item of data.items) {
            const productDetail = await productDetailService.getProductDetailById(item.product, 'product');
            if (!productDetail) {
                throw new CustomError('Sản phẩm không tồn tại', HttpStatus.NOT_FOUND);
            }
            if (productDetail.sold) {
                throw new CustomError('Sản phẩm đã được bán', HttpStatus.BAD_REQUEST);
            }
            productDetail.sold = true;
            productDetail.soldAt = new Date();
            productDetail.sale = (productDetail.product as unknown as IProduct).sale;
            totalPrice += (productDetail.product as unknown as IProduct).sale;
            await productDetail.save();
        }

        const order = new Order({
            ...data,
            total_price: totalPrice,
        });
        return order.save();
    },
    countDocuments: async (query: Record<string, any>) => {
        const count = await Order.countDocuments(query);
        return count;
    },
    getOrder: async ({
        limit = 10,
        sort = '-createdAt',
        skip = 0,
        query = {},
        includes = '',
    }: {
        limit?: number;
        sort?: string | Record<string, any>;
        skip?: number;
        query?: Record<string, any>;
        includes?: string | Array<string>;
    }) => {
        const orders = await Order.find(query).skip(skip).limit(limit).populate(includes).sort(sort);

        return orders;
    },
    getOrderById: async (id: StringOrObjectId, includes: string | Array<string> = '') => {
        const order = await Order.findById(id).populate(includes);

        if (!order) {
            throw new CustomError('Order không tìm thấy', HttpStatus.NOT_FOUND);
        }

        return order;
    },
    updateOrder: async (id: StringOrObjectId, data: any, userId?: StringOrObjectId) => {
        const order = await Order.findById(id);

        if (!order) {
            throw new CustomError('Order không tồn tại', HttpStatus.NOT_FOUND);
        }

        if (order.status === StatusOrder.DONE || order.status === StatusOrder.FAILED) {
            throw new CustomError('Không thể cập nhật đơn hàng', HttpStatus.BAD_REQUEST);
        }

        if (data.status === StatusOrder.FAILED && order.status !== StatusOrder.PENDING) {
            throw new CustomError('Không thể hủy đơn hàng', HttpStatus.BAD_REQUEST);
        }

        if (data.status === StatusOrder.DELIVERING && order.status === StatusOrder.PENDING && userId) {
            order.staff = userId as mongoose.Types.ObjectId;
        }

        if (data.status === StatusOrder.FAILED) {
            for (const item of order.items) {
                const productDetail = await productDetailService.getProductDetailById(item.product, 'product');
                if (!productDetail) {
                    throw new CustomError('Sản phẩm không tồn tại', HttpStatus.NOT_FOUND);
                }
                productDetail.sold = false;
                productDetail.soldAt = null;
                productDetail.sale = 0;
                await productDetail.save();
            }
        }

        if (data.status === StatusOrder.DONE) {
            let productIds = [];
            for (const item of order.items) {
                const productDetail = await productDetailService.getProductDetailById(item.product);
                if (!productDetail) {
                    continue;
                }
                productIds.push(productDetail.product);
            }
            productIds = [...new Set(productIds)];
            await cartService.deleteManyProduct(order.user, productIds);
            order.paid = true;
            order.receivedAt = new Date();
        }

        Object.assign(order, data);

        return order.save();
    },
    invalidOrder: async (id: StringOrObjectId, conditions?: Record<'status', Array<StatusOrder>>) => {
        const order = await Order.findById(id);
        if (!order) {
            throw new CustomError('Đơn hàng không tìm thấy', HttpStatus.NOT_FOUND);
        }
        if (conditions?.status && !conditions.status.includes(order.status)) {
            throw new CustomError('Không thể thực hiện thao tác', HttpStatus.BAD_REQUEST);
        }
    },
};

export default orderService;
