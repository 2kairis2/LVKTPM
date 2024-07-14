import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    /**
     * 0: Nam
     * 1: Nữ
     * 2: Khác
     */
    gender: {
        type: String,
        enum: [0, 1, 2],
        default: '2',
    },
    address: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    avatar: {
        type: String,
        default: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
});

export default mongoose.model('User', UserSchema);
