import express from "express";
import userController from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/updateProfile.middleware.js";

const userRouter = express.Router();

// auth routes
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/verify-otp", userController.verifyEmailOtp);
userRouter.post("/logout", userController.logoutUser);

// profile update
userRouter.patch(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  userController.updateProfile
);

// check auth
userRouter.get("/check", protectRoute, userController.checkAuth);

export default userRouter;