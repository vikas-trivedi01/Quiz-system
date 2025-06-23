import { Router } from "express"
import { loginUser, logoutUser, registerUser, profileDetails, changePassword, editProfile, lastLoginDateTime, removeAccount } from "../controllers/user.controller.js"
import { authenticateRequest } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(authenticateRequest, logoutUser);

router.route("/profile")
    .get(authenticateRequest, profileDetails)
    .put(authenticateRequest, editProfile)
    .delete(authenticateRequest, removeAccount);

router.route("/change-password").put(authenticateRequest, changePassword);

router.route("/last-login").get(authenticateRequest, lastLoginDateTime);


export default router;