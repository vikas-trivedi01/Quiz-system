import { Router } from "express";
import { authenticateRequest } from "../auth.middleware.js";
import { createQuiz } from "../controllers/quiz.controller.js";

const router = Router();

router.route("/")
        .post(authenticateRequest, createQuiz);
export default router;