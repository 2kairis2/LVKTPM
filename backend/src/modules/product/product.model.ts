import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { StatusProduct } from '~/types';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
    },
    content: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    sale: {
        type: Number,
        required: true,
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
            autopopulate: true,
        },
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
    },
    discount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
    },
    /**
     * 0: Draft
     * 1: Available
     * 2: Sold
     * 3: Stop
     */
    status: {
        type: Number,
        enum: StatusProduct,
        default: StatusProduct.DRAFT,
    },
    weight: {
        type: Number,
    },
    expired: {
        type: Number,
        required: true,
    },
});

productSchema.index({ title: 'text', desc: 'text', content: 'text' });
productSchema.plugin(mongooseAutoPopulate);

export default mongoose.model('Product', productSchema);
