import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    address: {
        type: Schema.Types.ObjectId,
        ref: "addressSchema"
    }
}, { timestamps: true });



export const User = mongoose.model("User", userSchema)

