import mongoose, { Schema } from "mongoose";


const cartSchema = new mongoose.Schema({
    productId: {
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

    association: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true });



export const User = mongoose.model("Cart", cartSchema)

