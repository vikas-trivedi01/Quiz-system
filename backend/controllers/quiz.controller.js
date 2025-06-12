import { Attempt } from "../models/attempt.model.js";
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

const getAdminQuizzes = asyncErrorHandler(async (req, res) => {

    const creator = req.user?._id;

    if (creator) {
        let quizzes = await Quiz.find({
            creator
        }).populate({ path: "creator", select: "-fullName -email -age -password -refreshToken -role -quizzesAttempted -createdAt -updatedAt -__v -_id" })
        .populate({ path: "questions", select: "-createdAt -updatedAt -__v -_id" });


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
    const quiz = req.quiz;

    if (quiz.creator.toString() !== req.user._id.toString())
        return res.status(403).json(new ApiError("You are not authorized to delete this quiz", 403));
    
    await quiz.deleteOne();

    return res.status(200)
        .json(new ApiResponse({}, "Quiz deleted successfully", 200));
    });
    
const editQuizQuestions = asyncErrorHandler(async (req, res) => {
    const quiz = req.quiz;

    if (quiz.creator.toString() !== req.user._id.toString())
        return res.status(403).json(new ApiError("You are not authorized to edit questions of this quiz", 403));

    
    const { questions } = req.body;
    if(!questions)
        return res.status(400).json(new ApiError("Quiz questions are required to edit quiz", 400));

    quiz.questions = [];

    await Question.deleteMany({
        quiz: quiz?._id
    })

    const questionIds = [];
    
    for (const question of questions) {
        const insertedQuestion = await Question.insertOne({
            ...question
        });
        //  quiz: quiz._id, already present in question object
    
        questionIds.push(insertedQuestion._id);
    }
    
    quiz.questions = questionIds;
    await quiz.save();
    
    return res.status(200)
        .json(new ApiResponse({}, "Quiz's questions edited successfully", 200));
});

const editQuiz = asyncErrorHandler(async (req, res) => {
    const quizId = req.quiz?._id;

  const {
    quizName,
    totalMarks,
    eachQuestionMarks,
    category,
    difficulty,
  } = req.body;

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    quizId,
    {
      quizName,
      totalMarks,
      eachQuestionMarks,
      category,
      difficulty,
    },
    { new: true, runValidators: true }
  );

  if (!updatedQuiz)
    return res
      .status(404)
      .json(new ApiError("Quiz not found or editing failed", 404));

  return res
    .status(200)
    .json(new ApiResponse({}, "Quiz edited successfully", 200));
});

const getQuiz = asyncErrorHandler(async (req, res) => {

    const quiz = await req.quiz.populate({ path: "questions", select: "-quiz -createdAt -updatedAt -__v" });
    const questions = quiz.questions;
    
    return res.status(200)
    .json(new ApiResponse(questions, "All questions fetched successfully", 200));
        
});


const getListOfQuizzes  = asyncErrorHandler(async (req, res) => {

     const quizzes = await Quiz.find()
                    .populate({
                        path: "creator",
                        select: "-fullName -email -age -password -refreshToken -role -quizzesAttempted -createdAt -updatedAt -__v -_id"
                    })
                    .populate({
                        path: "questions",
                        select: "-createdAt -updatedAt -__v -_id"
                    });

                    if (quizzes) {
            return res.status(200)
                .json(new ApiResponse(quizzes, "All quizzes fetched successfully", 200));
        } else {
            return res.status(404)
                .json(new ApiError("No quizzes found", 404));
        }
});

const participateInQuiz = asyncErrorHandler(async (req, res) => {
    const quiz = req.quiz;
    
    //  if(quiz.participants.includes(req.user?._id))
    //     return res.status(406).json(new ApiError("Already participated in this quiz", 406, "Already participated in this quiz"));

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quiz?._id,
      {
       participants: [...quiz.participants, req.user?._id]
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedQuiz)
      return res
        .status(404)
        .json(new ApiError("Failed to participate in quiz", 404));
    
    return res
      .status(200)
      .json(new ApiResponse({}, "Participated in quiz successfully", 200));

});

const attemptQuiz = asyncErrorHandler(async (req, res) => {
    const quiz = req.quiz;

    const {  
        answers,
        score,
        performanceStatus,
    } = req.body;

     const existedAttempt = await Attempt.findOne({
        $and: [{user: req.user?._id}, {quizName: quiz.quizName}]
    });

    if (existedAttempt)
        return res.status(400).json(new ApiError("Quiz attempted already", 400));

    const userId = req.user?._id;

    await Attempt.insertOne({
        user: userId,
        quiz: quiz?._id,
        answers,
        score,
        performanceStatus
    });

    return res.status(201)
                .json(new ApiResponse({}, "Quiz attempted successfully", 201));
    
});

export {
    createQuiz,
    getAdminQuizzes,
    deleteQuiz,
    editQuizQuestions,
    editQuiz,
    getQuiz,
    getListOfQuizzes,
    participateInQuiz,
    attemptQuiz
}