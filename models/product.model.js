import mongoose, { Schema } from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId, ref: "Category"
    },
    variants: [{
        type: Schema.Types.ObjectId, ref: "SubProduct"
    }],

    frequentVariant: {
        type: Schema.Types.ObjectId, ref: "SubProduct"
    },
    

}, { timestamps: true });



export const Product = mongoose.model("Product", productSchema)

