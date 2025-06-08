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
        .json(new ApiResponse({}, "Quiz created successfully", 201));

});

const getAllQuizzes = asyncErrorHandler(async (req, res) => {
    
    const creator = req.user?._id;
    
    if(creator) {
        let quizzes = await Quiz.find({
            creator
        }).populate("creator", "-fullName -email -age -password -accessToken -refreshToken -role -quizzesAttempted -createdAt -updatedAt -__v -_id")
        .populate("questions", "-createdAt -updatedAt -__v -_id");
        
        if(quizzes) {
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

export {
    createQuiz,
    getAllQuizzes
}