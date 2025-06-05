import { Router } from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import { authenticateRequest } from "../auth.middleware.js"

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateRequest, logoutUser);

export default router;