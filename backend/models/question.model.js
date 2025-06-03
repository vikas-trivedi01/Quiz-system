import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
    },
    options: [
        {
            option: {
                type: String,
                required: true,
                trim: true,
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false,
            },
        }
    ],
}, { timestamps: true });

export const Question = new mongoose.model("Question", questionSchema);

questionSchema.pre("save", function (next) {
    const hasCorrect = this.options.some(opt => opt.isCorrect);
    if (!hasCorrect) {
        return next(new Error("At least one option must be correct"));
    }
    next();
});

