import mongoose, { Schema } from "mongoose";


const cartSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

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

    orderStatus: {
        type: String
    },

    address: {
        type: Schema.Types.ObjectId,
        ref: "addressSchema"
    }
}, { timestamps: true });



export const User = mongoose.model("Cart", cartSchema)

