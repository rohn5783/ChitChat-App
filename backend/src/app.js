import  express from 'express';
import connectDB from '../config/database.js';
import userRouter from '../routes/user.routes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());




//  Routes
app.use('/api/auth/', userRouter);

connectDB()

export default app;