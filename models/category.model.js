import mongoose, { Schema } from "mongoose";


const categorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }

}, { timestamps: true });



export const Category = mongoose.model("Category", categorySchema)

