import mongoose from "mongoose";
import express from 'express';
import connectDB from "./services/db.js";
import userRoutes from './routes/user.routes.js'
import { ApiError, NotFoundException } from './response/apiError.js'
import { ApiResponse } from './response/response.js'
import { createTokenUsingRefreshToken as generateToken, tokenAuthentication } from "./controllers/token_controller.js";
import { getCategories, setCategory } from "./controllers/category_controller.js";
const app = express();


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))


connectDB((req, res, next) => {
    app.listen(process.env.PORT, (e) => {
        console.log(`Listenning to ${process.env.PORT}`);
    });
})();

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/generateToken", generateToken);
app.use("api/v1/getCategories", getCategories);


app.use(tokenAuthentication);
//-----------------------Admin------------------------------//

//admin
app.use("api/v1/admin/setCategory", setCategory);


//-----------------------Admin-end------------------------------//


// error handling
app.all("*", (req, res, next) => {
    next(new NotFoundException(`${req.url} not found on server`));
})

app.use((error, req, res, next) => {

    if (error instanceof ApiError) {
        res.status(error.statusCode || 500)
            .send(new ApiResponse({ status: error.statusCode, message: error.message, data: error.data }))
    } else {
        res.status(error.statusCode || 500)
            .send(new ApiResponse({ status: error.statusCode, message: error.message, data: error.data }))
    }
})




