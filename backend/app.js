import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js"
import quizRouter from "./routes/quiz.routes.js"
import authRouter from "./routes/auth.routes.js"

import { asyncErrorHandler } from "./utils/asyncErrorHandler.js";
import { User } from "./models/user.model.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { Quiz } from "./models/quiz.model.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/quizzes", quizRouter);

app.get("/api/v1/counts", asyncErrorHandler(async (req, res) => {
    const users = await User.find({});
    const quizzes = await Quiz.find({});
    const categories = await Quiz.find().select("category");

    const counts = [
        Array.isArray(users) ? users.length : 0 ,
        Array.isArray(quizzes) ? quizzes.length : 0 ,
        Array.isArray(categories) ? categories.length : 0 ,
    ];

    res.status(200)
        .json(new ApiResponse({counts}, "Counts fetched successfully", 200));
}));
export { app }