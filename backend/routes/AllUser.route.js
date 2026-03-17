import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllUsersForChat,
  getUserForChat
} from "../controllers/AllUser.controller.js";

const router = express.Router();


router.get("/chat/all", protectRoute, getAllUsersForChat);


router.get("/chat/:id", protectRoute, getUserForChat);

export default router;