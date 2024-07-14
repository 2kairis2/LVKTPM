import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        default: 1,
    },
    /**
     * sale: Giá bán sau khi đã trừ khuyến mãi
     */
    sale: {
        type: Number,
        default: 0,
    },
    /**
     * discount: Phần trăm giảm giá
     */
    discount: {
        type: Number,
        default: 0,
    },
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        items: [orderItemSchema],
        address: {
            type: String,
            required: true,
        },
        /**
         * paymentMethod: Phương thức thanh toán
         * 0: Thanh toán khi nhận hàng
         * 1: Thanh toán qua ví điện tử
         */
        paymentMethod: {
            type: String,
            enum: [0, 1],
            default: 0,
            required: true,
        },
        /**
         * deliveryMethod: Phương thức giao hàng
         * 0: Giao hàng tiết kiệm
         * 1: Giao hàng nhanh
         */
        deliveryMethod: {
            type: String,
            enum: [0, 1],
            default: 0,
            required: true,
        },
        note: {
            type: String,
        },
        /**
         * status: Trạng thái đơn hàng
         * 0: Đã hủy
         * 1: Đang chờ xử lý
         * 2: Đang giao hàng
         * 3: Đã hoàn thành
         */
        status: {
            type: Number,
            enum: [0, 1, 2, 3, 4],
            default: 4,
        },
        /**
         * total: Tổng tiền đơn hàng
         */
        total: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Order', orderSchema);
