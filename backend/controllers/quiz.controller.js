import { Question } from "../models/question.model.js";
import { Quiz } from "../models/quiz.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

const createQuiz = asyncErrorHandler(async (req, res) => {
    const {
        quizName,
        numberOfQuestions,
        totalMarks,
        eachQuestionMarks,
        category,
        difficulty,
        status,
        questions,
    } = req.body;

    const existedQuiz = await Quiz.findOne({
        quizName
    });

    if (existedQuiz)
        return res.status(400).json(new ApiError("Quiz already exists", 400));

    const creator = req.user?._id;

    const quiz = await Quiz.insertOne({
        quizName,
        numberOfQuestions,
        totalMarks,
        eachQuestionMarks,
        category,
        difficulty,
        status,
        questions: [],
        creator,
    });

    const questionIds = [];

    for (const question of questions) {
        const insertedQuestion = await Question.insertOne({
            ...question,
            quiz: quiz._id,
        });

        questionIds.push(insertedQuestion._id);

    }

    quiz.questions = questionIds;

    await quiz.save();


    return res.status(201)
        .json(new ApiResponse("Quiz created successfully", 201));

});

const getAllQuizzes = asyncErrorHandler(async (req, res) => {

    const creator = req.user?._id;

    if (creator) {
        let quizzes = await Quiz.find({
            creator
        }).populate("creator", "-fullName -email -age -password -refreshToken -role -quizzesAttempted -createdAt -updatedAt -__v -_id")
            .populate("questions", "-createdAt -updatedAt -__v -_id");

        if (quizzes) {
            return res.status(200)
                .json(new ApiResponse(quizzes, "All quizzes fetched successfully", 200));
        } else {
            return res.status(404)
                .json(new ApiError("No quizzes found", 404));
        }
    } else {
        return res.status(401)
            .json(new ApiError("Not authorized", 401));
    }
});

const deleteQuiz = asyncErrorHandler(async (req, res) => {

    const quizId = req.params.id;

    if (!quizId)
        return res.status(400).json(new ApiError("Quiz ID is required", 400));

    const quiz = await Quiz.findById(quizId);

    if (!quiz)
        return res.status(404).json(new ApiError("Quiz not found", 404));

    if (quiz.creator.toString() !== req.user._id.toString())
        return res.status(403).json(new ApiError("You are not authorized to delete this quiz", 403));

    
    await quiz.deleteOne();

    return res.status(200)
        .json(new ApiResponse({}, "Quiz deleted successfully", 200));
});


export {
    createQuiz,
    getAllQuizzes,
    deleteQuiz
}