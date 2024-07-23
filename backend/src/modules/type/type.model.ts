import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    desc: {
        type: String,
    },
    content: {
        type: String,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
});

export default mongoose.model('Type', typeSchema);
