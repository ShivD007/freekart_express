import mongoose, { Schema } from "mongoose";


const offerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },

    product: [{
        type: Schema.Types.ObjectId, ref: "SubProduct"
    }
    ],
}, { timestamps: true });



export const Offer = mongoose.model("Offer", offerSchema)

