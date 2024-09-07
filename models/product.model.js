import mongoose, { Schema } from "mongoose";


const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    variants: [{
        type: Schema.Types.ObjectId, ref: "SubProduct"
    }],

    frequentVariant: {
        type: Schema.Types.ObjectId, ref: "SubProduct"
    },

}, { timestamps: true });



export const Product = mongoose.model("Product", productSchema)

