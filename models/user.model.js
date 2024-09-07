import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
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

    address: {
        type: Schema.Types.ObjectId,
        ref: "addressSchema"
    },


}, { timestamps: true });



export const User = mongoose.model("User", userSchema)

