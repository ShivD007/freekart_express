import mongoose from "mongoose";
import { DB_NAME } from "../constants/app.constant.js"


const connectDB = (fn) => async (req, res, next) => {
    try {
        console.log(`${process.env.DB_URL}/${DB_NAME}`);

        await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)

        fn(req, res, next);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }

}


export default connectDB;