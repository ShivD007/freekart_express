import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    address: {
        type: String,

    },
    pincode: {
        type: Number
    },

    alternateMobileNo: {
        type: Number
    }
}, { timestamps: true });



export const Address = mongoose.model("Address", addressSchema)

