import mongoose, { Schema } from "mongoose";


const subProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
}, { timestamps: true });



export const SubProduct = mongoose.model("SubProduct", subProductSchema)

