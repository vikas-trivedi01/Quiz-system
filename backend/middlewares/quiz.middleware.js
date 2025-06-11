import { Quiz } from "../models/quiz.model.js";
import { ApiError } from "../utils/ApiError.js";

export const validateQuiz = async (req, res, next) => {
    const quizId = req.params.id || req.body.quizId ;

    if (!quizId) {
        return res.status(400).json(new ApiError("Quiz ID is required", 400));
    }

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json(new ApiError("Quiz not found", 404));
        }
        req.quiz = quiz;
        next();
    } catch (error) {
        return res.status(500).json(new ApiError("Internal Server Error", 500));
    }
};
