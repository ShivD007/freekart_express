import mongoose from "mongoose";
const { Schema } = mongoose;


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
        ref: "Address"
    }
}, { timestamps: true });



export const User = mongoose.model("User", userSchema)

