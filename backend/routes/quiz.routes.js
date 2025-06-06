import { Router } from "express";
import { authenticateRequest } from "../auth.middleware.js";
import { createQuiz, getAllQuizzes } from "../controllers/quiz.controller.js";

const router = Router();

router.route("/")
        .post(authenticateRequest, createQuiz)
        .get(authenticateRequest, getAllQuizzes);
export default router;