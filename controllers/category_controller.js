import { BadRequestException, ConflictException } from "../response/apiError.js";
import asyncHandler from "../response/asyncHandler.js";
import { AppStrings } from "../constants/app.strings.js";
import { Category } from "../models/category.model.js";
import { ApiResponse } from "../response/response.js";

// this is for location Api
const setCategory = asyncHandler(async (req, res, next) => {
    const { image, name } = req.body;

    [image, name].some((e) => {
        if (e.trim() === "") throw new BadRequestException(AppStrings.allParamsRequired)
    });

    const category = await Category.findOne({ name: name.trim() });

    if (category) throw new ConflictException("An Entry is already present in database.")

    const savedCategory = await Category.create({ name: name, image: image });

    res.status(200).send(new ApiResponse({ status: 200, message: "Category Created!", data: savedCategory }))
});


const getCategories = asyncHandler(async (req, res, next) => {
    const { name } = req.query;

    const categories = Category.find({ name: { $regex: name ?? "", option: "i" } })
    let data = []
    if (!categories) data = categories;


    res.status(200).send(new ApiResponse({ message: "Success", status: 200, data: data }));

})



export { setCategory, getCategories }