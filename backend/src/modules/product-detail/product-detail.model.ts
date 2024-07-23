import mongoose from 'mongoose';

const productDetailSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
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
});

export default mongoose.model('ProductDetail', productDetailSchema);
