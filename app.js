import mongoose from "mongoose";
import express from 'express';
import connectDB from "./services/db.js";
import userRoutes from './routes/user.routes.js'
import { ApiError, NotFoundException } from './response/apiError.js'
import { ApiResponse } from './response/response.js'
import { createTokenUsingRefreshToken as generateToken, tokenAuthentication } from "./controllers/token_controller.js";
import { getCategories, setCategory } from "./controllers/category_controller.js";
import productRouter from "./routes/product.route.js"
import cartRouter from "./routes/cart.route.js"
import orderRouter from "./routes/order.route.js"
import categoryRouter from "./routes/category.route.js"
import addressRouter from "./routes/address.route.js"
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


app.use(tokenAuthentication);
//-----------------------Admin------------------------------//

//admin
app.use("api/v1/admin/setCategory", categoryRouter);


//-----------------------Admin-end------------------------------//

app.use("api/v1/product", productRouter);
app.use("api/v1/cart", cartRouter);
app.use("api/v1/order", orderRouter);
app.use("api/v1/address", addressRouter);
app.use("api/v1/getCategories", getCategories);

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




