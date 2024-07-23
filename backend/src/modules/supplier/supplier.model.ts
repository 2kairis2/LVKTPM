import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        note: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Supplier', supplierSchema);
