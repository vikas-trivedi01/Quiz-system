import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    answers: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
                required: true,
            },
            selectedOption: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
            },
            isAnswerCorrect: {
                type: Boolean,
                required: true,
                default: false,
            },
        }
    ],
    score: {
        type: Number,
        required: true,
        default: 0,
    },
    completedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        enum: ["very_poor", "poor", "needs_improvement", "fair", "good", "excellent", "outstanding"],
        lowercase: true,
        trim: true,
        default: "very_poor",
    },
}, { timestamps: true });

export const Attempt = new mongoose.model("Attempt", attemptSchema);
