import mongoose from 'mongoose';

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
            enum: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31,
            ],
            required: true,
        },
    ],
});

export default mongoose.model('Role', roleSchema);
