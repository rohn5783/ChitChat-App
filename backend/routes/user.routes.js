import express from "express";
import userController from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/verify-otp", userController.verifyEmailOtp);
userRouter.post("/logout", userController.logoutUser);

userRouter.get("/check", protectRoute, userController.checkAuth);

export default userRouter;