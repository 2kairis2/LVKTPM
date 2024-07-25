import mongoose from 'mongoose';
import { StatusInventoryReceipt } from '~/types';

const inventoryReceiptSchema = new mongoose.Schema(
    {
        note: {
            type: String,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                producedAt: {
                    type: Date,
                    required: true,
                },
            },
        ],
        staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
            min: 0,
        },
        total_quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        /**
         * 0: pending
         * 1: done
         */
        status: {
            type: Number,
            enum: StatusInventoryReceipt,
            default: StatusInventoryReceipt.PENDING,
        },
        importedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('InventoryReceipt', inventoryReceiptSchema);
