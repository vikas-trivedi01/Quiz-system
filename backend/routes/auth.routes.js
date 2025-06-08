import { Router } from "express";
import { refreshAccessToken } from "../controllers/auth.controller.js";
import { authenticateRequest } from "../auth.middleware.js";

const router = Router();
router.route("/refresh-token").post(authenticateRequest, refreshAccessToken);

export default router;