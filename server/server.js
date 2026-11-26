import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import helmet from "helmet";
import {rateLimit} from "express-rate-limit";
import connectDB from "./config/db.js";


dotenv.config();

const app=express();

app.use(helmet());

app.use(
    cors({
        origin:process.env.CLIENT_URL|| 'http://localhost:5173',
        Credentials:true,
    })
);

app.use(express.json({limit:"10kb"}));
app.use(express.urlencoded({extended:true}));

const apiLimiter=rateLimit({
    windowMs:15*60*1000,
    limit:100,
    legacyHeaders:false,
    message:{
        success:false,
        message:"Too many request. Please try again later.",
    }
});

app.use("/api", apiLimiter);

//health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "VoxAgent server is running successfully!",
    environment: process.env.NODE_ENV,
  });
});

//error handler

app.use((req,res,next)=>{
    const error=new Error(
        `Route not found: ${req.originalUrl}`
    )


error.statusCode=404;

next(error);


});

//global error handler

app.use((err,req,res,next)=>{
    const statusCode=err.statuscode ||500;
    res.status(statusCode).json({
        sucess:false,
        message:
        statusCode===500 ? "Internal Server Error": err.meassage,
    });
});


//start server
const PORT = process.env.PORT || 5000;

const startServer=async()=>{
    await connectDB();


app.listen(PORT,()=>{
    console.log(`VoxAgent server running on port ${PORT}`);
});
}

startServer();

