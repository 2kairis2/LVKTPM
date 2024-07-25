import mongoose from 'mongoose';
import { EStatusDiscount, ETypeDiscount } from '~/types';

const discountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    /**
     * 0: percent
     * 1: money
     */
    type: {
        type: Number,
        enum: ETypeDiscount,
        default: ETypeDiscount.PERCENT,
    },
    value: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        enum: EStatusDiscount,
        default: EStatusDiscount.NOT_ACTIVE,
    },
    startAt: {
        type: Date,
        required: true,
    },
    endAt: {
        type: Date,
        required: true,
    },
});

export default mongoose.model('Discount', discountSchema);
