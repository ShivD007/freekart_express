import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";


// Define a schema for the status and timestamp list
const orderStatusSchema = new Schema({
    status: {
        type: String,
        required: true,  // status is required
    },
    timeStamp: {
        type: Date,
        required: true,  // timeStamp is required
    },
});


const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    items:
        [{
            productId: {
                type: String,
                required: true
            },


            quantity: {
                type: Number,
                required: true
            },
        }
        ],
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
    variantsId: {
        type: Schema.Types.ObjectId, ref: "SubProduct"
    },
    association: {
        type: Schema.Types.ObjectId, ref: "User",
        required: true
    },
    orderStatus: [orderStatusSchema],

    address: {
        type: String,
        required: true
    },
    isOrderCompleted: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });



export const Order = mongoose.model("Order", orderSchema)
export const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema)

