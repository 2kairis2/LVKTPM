import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
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
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    weight: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    sale: {
        type: Number,
        default: 0,
    },
    mfg: {
        type: Date,
    },
    exp: {
        type: Date,
        required: true,
    },
    /**
     * 0: Hạt giống
     * 1: Rau củ
     * 2: Cây cảnh
     * 3: Phân bón
     * 4: Thuốc trừ sâu
     * 5: Dụng cụ thủy canh
     */
    type: {
        type: String,
        enum: [0, 1, 2, 3, 4, 5],
        required: true,
    },
    /**
     * 0: Bột
     * 1: Viên
     * 2: Nước
     * 3: Cây
     * 4: Củ
     * 5: Lỏng
     */
    feature: {
        type: String,
        enum: [0, 1, 2, 3, 4, 5],
        required: true,
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        },
    ],
});

productSchema.index({ name: 'text', description: 'text', content: 'text' });

export default mongoose.model('Product', productSchema);
