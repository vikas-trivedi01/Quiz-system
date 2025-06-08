import { Router } from "express";
import { authenticateRequest } from "../auth.middleware.js";
import { createQuiz, deleteQuiz, getAllQuizzes } from "../controllers/quiz.controller.js";

const router = Router();

router.route("/")
        .post(authenticateRequest, createQuiz)
        .get(authenticateRequest, getAllQuizzes);

router.route("/:id").delete(authenticateRequest, deleteQuiz);

export default router;