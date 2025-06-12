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
        attemptQuiz
} from "../controllers/quiz.controller.js";
import { validateQuiz } from "../middlewares/quiz.middleware.js";
import { authenticateRequest } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/")
        .post(authenticateRequest, createQuiz)
        .get(authenticateRequest, getListOfQuizzes);

router.route("/questions/:id")
        .put(authenticateRequest, validateQuiz, editQuizQuestions);

router.route("/quiz/:id")
        .put(authenticateRequest, validateQuiz, editQuiz)
        .get(authenticateRequest, validateQuiz, getQuiz)
        .delete(authenticateRequest, validateQuiz, deleteQuiz);

router.route("/admin")
        .get(authenticateRequest, getAdminQuizzes);

router.route("/participate/:id")
        .post(authenticateRequest, validateQuiz, participateInQuiz);

router.route("/attempt/:id")
        .post(authenticateRequest, validateQuiz, attemptQuiz);

export default router;