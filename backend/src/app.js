import  express from 'express';
import path from 'path';
import connectDB from '../config/database.js';
import userRouter from '../routes/user.routes.js';
import AllUserRouter from '../routes/AllUser.route.js';
import messageRouter from '../routes/message.routes.js';


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
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true
  })
);

//  Routes
app.use('/api/auth/', userRouter);
app.use('/api/user/', AllUserRouter);
app.use('/api/messages/', messageRouter);


connectDB()

export default app;