import mongoose, { Schema } from "mongoose";


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category Name is required"]
    },
    image: {
        type: String
    }

}, { timestamps: true });



export const Category = mongoose.model("Category", categorySchema)

