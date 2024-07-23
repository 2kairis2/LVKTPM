import mongoose from 'mongoose';

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
    /**
     * 0: Draft
     * 1: Available
     * 2: Sold
     * 3: Stop
     */
    status: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 0,
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

export default mongoose.model('Product', productSchema);
