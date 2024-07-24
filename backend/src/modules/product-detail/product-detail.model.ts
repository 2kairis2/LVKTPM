import mongoose from 'mongoose';

const productDetailSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    receipt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryReceipt',
        required: true,
    },
    note: {
        type: String,
        default: '',
    },
    sold: {
        type: Boolean,
        required: true,
        default: false,
    },
    soldAt: {
        type: Date,
    },
    sale: {
        type: Number,
        min: 0,
    },
    producedAt: {
        type: Date,
        required: true,
    },
    expiredAt: {
        type: Date,
        required: true,
    },
});

export default mongoose.model('ProductDetail', productDetailSchema);
