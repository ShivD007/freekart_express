import mongoose from "mongoose";
import express from 'express';
import connectDB from "./services/db.js";
import e from "express";


require('dotenv').config({ path: './env' })
const app = express();






connectDB((req, res, next) => {
    app.listen(process.env.PORT, (e) => {
        console.log(e);
    });
})


app.all("*", (req, res, next) => {
    next(NotFoundException(`${req.url} not found on server`));
})

app.use((error, req, res, next) => {
    if (error instanceof ApiError) {
        res.status(error.statusCode || 500)
            .send(ApiResponse(error.statusCode, error.message, error.data))
    }
})




