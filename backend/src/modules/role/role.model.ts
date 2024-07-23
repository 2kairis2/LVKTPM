import mongoose from 'mongoose';
import { IPermission } from '~/types';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    permissions: [
        {
            type: Number,
            enum: IPermission,
            required: true,
        },
    ],
});

export default mongoose.model('Role', roleSchema);
