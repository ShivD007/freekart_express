import mongoose, { Schema } from "mongoose";
import { subProductSchema } from "./sub_product.model.js";


const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    variant: {
        type: subProductSchema,
        required: true
    },
    association: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    priceAfterDiscount: {
        type: Number,
    }

}, { timestamps: true });



export const Cart = mongoose.model("Cart", cartSchema)

