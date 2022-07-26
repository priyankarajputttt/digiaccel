const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const quizSchema = new mongoose.Schema({
    userId: {
        type: ObjectId, 
        ref: "user", 
        required: 'userId is required', 
        unique: true
    },
    difficulty: {
        type: Number,
        default: 5
    },
    quesNum: {
        type: Number,
        required: true,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('quiz', quizSchema)