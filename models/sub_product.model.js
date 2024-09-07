import mongoose, { Schema } from "mongoose";


const subProductSchema = new mongoose.Schema({
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
    category: {
        type: Schema.Types.ObjectId, ref: "Category"
    },
    images: [{
        type: String,
        required: true
    }],
}, { timestamps: true });



export const SubProduct = mongoose.model("SubProduct", subProductSchema)

