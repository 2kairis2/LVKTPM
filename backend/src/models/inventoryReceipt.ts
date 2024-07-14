import mongoose from 'mongoose';

const ItemInventoryReceiptSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const InventoryReceiptSchema = new mongoose.Schema(
    {
        items: [ItemInventoryReceiptSchema],
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('InventoryReceipt', InventoryReceiptSchema);
