import { AppStrings } from "../constants/app.strings.js";
import { Offer } from "../models/offer.model.js";
import { Product } from "../models/product.model.js";
import { BadRequestException, NotFoundException } from "../response/apiError.js";
import asyncHandler from "../response/asyncHandler.js";
import { ApiResponse } from "../response/response.js";




const createOffer = asyncHandler(async (req, res, next) => {

    const { name, description, products, discount } = req.body;
    if (!name || !description || !discount) next(new BadRequestException());

    if (products) {
        if (!Array.isArray(products)) next(new BadRequestException());

        const _products = await Product.find({ _id: { $in: products } })

        if (_products.length !== products.length) next(new NotFoundException())

    }

    const offer = new Offer({ name, description, products: products || [], discount });
    await offer.save();
    res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: offer }))

});

const getOffers = asyncHandler(async (req, res, next) => {

    const offers = await Offer.find({}).populate("products");

    res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: offers }))
});

const getOffer = asyncHandler(async (req, res, next) => {
    const id = req.query.id;

    if (!id) next(new BadRequestException());

    const offer = await Offer.findById(id).populate("products");

    if (!offer) next(new BadRequestException(AppStrings.noItemFound))
    res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: offer }))
});

const updateOffer = asyncHandler(async (req, res, next) => {
    const id = req.query.id;

    if (!id) next(new BadRequestException());

    const offer = await Offer.findById(id);

    if (!offer) next(new BadRequestException(AppStrings.noEntryFoundWithProvidedId));

    const { name, description, products, discount } = req.body;

    if (products) {
        if (!Array.isArray(products)) next(new BadRequestException());
        const _products = await Product.find({ _id: { $in: products } })
        if (_products.length !== products.length) next(new BadRequestException(AppStrings.noEntryFoundWithProvidedId))

    }

    if (name && name !== offer.name) offer.name = name;
    if (description && description !== offer.description) offer.description = description;
    if (products && products !== offer.products) offer.products = products;
    if (discount && discount !== offer.discount) offer.discount = discount;

    await offer.save();

    res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: offer }))



});

const deleteOffer = asyncHandler(async (req, res, next) => {
    const id = req.query.id;

    if (!id) next(new BadRequestException());

    const offer = Offer.findByIdAndDelete(id);

    if (!offer) next(new BadRequestException(AppStrings.noEntryFoundWithProvidedId))

    res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: null }))


});

export { createOffer, getOffers, getOffer, updateOffer, deleteOffer }