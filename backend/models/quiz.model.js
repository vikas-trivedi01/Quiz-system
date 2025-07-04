import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    numberOfQuestions: {
        type: Number,
        min: 1,
        default: 1,
        required: true,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    participantsCount: {
        type: Number,
        default: 0,
    },
    totalMarks: {
        type: Number,
        min: 1,
        default: 1,
        required: true,
    },
    eachQuestionMarks: {
        type: Number,
        min: 1,
        default: 1,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    difficulty: {
        type: String,
        required: true,
        trim: true,
        enum: ["easy", "medium", "hard"],
        default: "easy",
    },
    status: {
        type: String,
        enum: ["published", "archived"],
        default: "archived",
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quizCode: {
        type: String,
        trim: true, 
        unique: true,
        default: null,
    },
    codeExpiresAt: {
        type: Date,
        default: null,
    },
    leaderboard: [
        {
            user: { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: "User" 
            },
            score: Number,
            attemptedAt: String,
        }
    ],
}, { timestamps: true });

export const Quiz = new mongoose.model("Quiz", quizSchema);
