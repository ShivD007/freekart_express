import { AppStrings } from "../constants/app.strings.js";
import { Cart } from "../models/cart.model.js";
import { Order, OrderStatus } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { BadRequestException, NotFoundException, ServerApiError } from "../response/apiError.js";
import asyncHandler from "../response/asyncHandler.js";
import { ApiResponse } from "../response/response.js";
import mongoose from "mongoose";

const addOrder = asyncHandler(async (req, res, next) => {

    const { userId } = req.body;
    if (!userId) next(new BadRequestException())

    const currentCartItems = await Cart.find({
        association: mongoose.Types.ObjectId(userId)
    }).populate("association");

    if (!currentCartItems) next(new NotFoundException());


    let mrp = 0;
    let discount = 0;
    let priceAfterDiscount = 0;

    let items = [];

    currentCartItems.map((e) => {
        mrp += e.mrp;
        discount += e.discount;
        priceAfterDiscount += e.priceAfterDiscount
        items.push({
            productId: e.productId,
            quantity: e.quantity
        })
    });

    const user = await User.findById(userId)

    const currentOrderSchema = new OrderStatus({ status: "Created", timeStamp: new Date() });
    const order = await Order.create(
        {
            mrp: mrp,
            discount: discount,
            priceAfterDiscount: priceAfterDiscount,
            association: user,
            orderStatus: [currentOrderSchema],
            address: user.address,
            isOrderCompleted: false,
            items: items
        }
    );

    if (!order) next(new ServerApiError());
    await Cart.deleteMany({
        association: mongoose.Types.ObjectId(userId)
    }).populate("association")

    res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: null }))
});


const getUserOrder = asyncHandler(async (req, res, next) => {
    const userId = req.body;
    const order = await Order.find({
        association: mongoose.Types.ObjectId(userId)
    }).populate("association")

    if (!order) next(res.status(200).send(new ApiResponse({
        status: 200,
        message: AppStrings.noItemFound,
        data: []
    }),
    ))



    res.status(200).send(new ApiResponse({
        status: 200,
        message: AppStrings.successful,
        data: order
    }))
});


const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const { orderId, orderStatus, isOrderCompleted } = req.body;

    if (!orderId) next(new BadRequestException());
    const updates = {}

    if (isOrderCompleted) {
        updates.isOrderCompleted = true
    }

    const status = new OrderStatus({ status: orderStatus, timeStamp: new Date() });
    const order = await Order.findByIdAndUpdate(orderId, {
        $push: { orderStatus: { status: status } },
        "$set": updates // to set orderComplete once it reached to user
    })

    if (!order) next(new NotFoundException());

    res.status(200).send(new ApiResponse({
        status: 200,
        message: AppStrings.successful,
        data: []
    }))
})

const cancelOrder = asyncHandler(async (req, res, next) => {
    const { orderId } = req.body;

    if (!orderId) next(new BadRequestException());

    const order = await Order.findOneAndDelete({ _id: orderId });

    if (!order) next(new NotFoundException());

    res.status(200).send(new ApiResponse({
        status: 200,
        message: AppStrings.successful,
        data: []
    }))
})

export { addOrder, updateOrderStatus, getUserOrder, cancelOrder }