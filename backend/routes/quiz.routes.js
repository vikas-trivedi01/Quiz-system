import { Router } from "express";
import { authenticateRequest } from "../auth.middleware.js";
import { createQuiz, deleteQuiz, editQuiz, editQuizQuestions, getAdminQuizzes, getListOfQuizzes, getQuiz } from "../controllers/quiz.controller.js";

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

export default router;