import mongoose from 'mongoose';

const DiscountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        // required: true,
    },
    limit: {
        type: Number,
    },
    /**
     * 0: percent
     * 1: money
     */
    type: {
        enum: [0, 1],
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    expire: {
        type: Date,
        required: true,
    },
});

export default mongoose.model('Discount', DiscountSchema);
