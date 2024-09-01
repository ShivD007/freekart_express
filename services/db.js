import mongoose from "mongoose";
import { DB_NAME } from "../constants/app.constant.js"


const connectDB =(fn)=> async (req, res, next) => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        fn(req.res,next);
    } catch (error) {
        console.log(e);
        process.exit(1);
    }

}


export default connectDB;