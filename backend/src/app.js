import  express from 'express';
import path from 'path';
import connectDB from '../config/database.js';
import userRouter from '../routes/user.routes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

//  Routes
app.use('/api/auth/', userRouter);

connectDB()

export default app;