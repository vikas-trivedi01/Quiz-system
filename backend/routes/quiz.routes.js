import { Router } from "express";
import { authenticateRequest } from "../auth.middleware.js";
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

const router = Router();

router.route("/")
        .post(authenticateRequest, createQuiz)
        .get(authenticateRequest, getListOfQuizzes);

router.route("/questions/:id")
        .put(authenticateRequest, editQuizQuestions);

router.route("/quiz/:id")
        .put(authenticateRequest, editQuiz)
        .get(authenticateRequest, getQuiz)
        .delete(authenticateRequest, deleteQuiz);

router.route("/admin")
        .get(authenticateRequest, getAdminQuizzes);

router.route("/participate/:id")
        .post(authenticateRequest, participateInQuiz);

router.route("/attempt/:id")
        .post(authenticateRequest, attemptQuiz);

export default router;