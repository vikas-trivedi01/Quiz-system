import { Router } from "express";
import {
        createQuiz,
        deleteQuiz,
        editQuiz,
        editQuizQuestions,
        getAdminQuizzes,
        getListOfQuizzes,
        getQuiz,
        participateInQuiz,
        attemptQuiz,
        getAllParticipants,
        joinQuizWithCode,
        getQuizCode
} from "../controllers/quiz.controller.js";
import { validateQuiz } from "../middlewares/quiz.middleware.js";
import { authenticateRequest } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/")
        .post(authenticateRequest, createQuiz)
        .get(authenticateRequest, getListOfQuizzes);

router.route("/:id/questions")
        .put(authenticateRequest, validateQuiz, editQuizQuestions);

router.route("/manage/:id")
        .put(authenticateRequest, validateQuiz, editQuiz)
        .get(authenticateRequest, validateQuiz, getQuiz)
        .delete(authenticateRequest, validateQuiz, deleteQuiz);

router.route("/admin")
        .get(authenticateRequest, getAdminQuizzes);

router.route("/:id/participate")
        .post(authenticateRequest, validateQuiz, participateInQuiz);

router.route("/:id/attempt")
        .post(authenticateRequest, validateQuiz, attemptQuiz);
        
router.route("/:id/participants")
        .get(authenticateRequest, validateQuiz, getAllParticipants);

router.route("/join-code/participate")
                .post(authenticateRequest, joinQuizWithCode);

router.route("/:id/quiz-code")
                .get(authenticateRequest, validateQuiz, getQuizCode);


export default router;