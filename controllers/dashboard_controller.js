import asyncHandler from "../response/asyncHandler.js";
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../response/response.js";
import { AppStrings } from "../constants/app.strings.js";
import { Offer } from "../models/offer.model.js";


const getDashboard = asyncHandler(async (req, res) => {

    let categories = await Category.aggregate([
        { $sample: { size: 4 } }
    ])

    let products = await Product.aggregate([
        { $sample: { size: 4 } }
    ])

    let offers = await Offer.aggregate([
        { $sample: { size: 4 } }
    ])

    res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: { categories, products, offers } }))
});

export { getDashboard }