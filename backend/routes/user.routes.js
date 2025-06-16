import { Router } from "express"
import { loginUser, logoutUser, registerUser, profileDetails, changePassword, editProfile } from "../controllers/user.controller.js"
import { authenticateRequest } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateRequest, logoutUser);

router.route("/profile").get(authenticateRequest, profileDetails)
                        .put(authenticateRequest, editProfile);
router.route("/change-password").put(authenticateRequest, changePassword);

export default router;