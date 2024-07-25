import mongoose from 'mongoose';
import { PaymentMethod, StatusOrder } from '~/types';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'ProductDetail',
                    required: true,
                },
            },
        ],
        shipping_address: {
            type: String,
            required: true,
        },
        payment_method: {
            type: Number,
            enum: PaymentMethod,
            required: true,
            default: PaymentMethod.COD,
        },
        payment_info: {
            type: String,
            default: '',
        },
        status: {
            type: Number,
            enum: StatusOrder,
            required: true,
            default: StatusOrder.PENDING,
        },
        total_price: {
            type: Number,
            min: 0,
            required: true,
        },
        receivedAt: {
            type: Date,
        },
        paid: {
            type: Boolean,
            default: false,
        },
        note: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Order', orderSchema);
