import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({

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

