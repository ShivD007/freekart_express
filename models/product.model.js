import mongoose, { Schema } from "mongoose";
import { subProductSchema } from "./sub_product.model.js";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId, ref: "Category"
    },
    variants: [subProductSchema],

    frequentVariant: subProductSchema,

}, { timestamps: true });



export const Product = mongoose.model("Product", productSchema)

