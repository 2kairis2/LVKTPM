import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        require,
    },
    path: {
        type: String,
        require,
    },
});

export default mongoose.model('Image', imageSchema);
