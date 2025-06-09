import { Router } from "express";
import { authenticateRequest } from "../auth.middleware.js";
import { createQuiz, deleteQuiz, editQuizQuestions, getAllQuizzes } from "../controllers/quiz.controller.js";

const router = Router();

router.route("/")
        .post(authenticateRequest, createQuiz)
        .get(authenticateRequest, getAllQuizzes);

router.route("/:id").delete(authenticateRequest, deleteQuiz);
router.route("/questions/:id").put(authenticateRequest, editQuizQuestions);
export default router;