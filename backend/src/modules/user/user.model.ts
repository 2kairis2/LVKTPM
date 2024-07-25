import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
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
        default: 2,
    },
    address: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        autopopulate: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
});

UserSchema.plugin(mongooseAutoPopulate);

export default mongoose.model('User', UserSchema);
