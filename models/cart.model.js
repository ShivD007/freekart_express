import mongoose, { Schema } from "mongoose";


const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    variantId: {
        type: String,
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

