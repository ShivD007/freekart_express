import mongoose from "mongoose";
import { AppStrings } from "../constants/app.strings.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { BadRequestException, ServerApiError } from "../response/apiError.js";
import asyncHandler from "../response/asyncHandler.js";
import { ApiResponse } from "../response/response.js";

const addToCart = asyncHandler(async (req, res, next) => {
      const { productId, variantId, quantity } = req.body;


      if ([productId, variantId, quantity].some((entry) => {
            return entry == null
      })) {
            throw new BadRequestException(AppStrings.allParamsRequired)
      }

      const user = await User.findById(req.headers.users.id);
      const product = await Product.findById(productId);
      const subProduct = product.variants.id(variantId);
      if (!subProduct) {
            return res.status(404).send(new BadRequestException({
                  message: "Variant not found",
            }));
      }

      const mrp = subProduct.mrp;
      const discount = subProduct.discount;
      const priceAfterDiscount = discount == null ? mrp : mrp - discount;

      const cartItem = await Cart.findOne({ "productId": productId, "variant._id": variantId });
      console.log(cartItem)
      if (cartItem) {
            res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: null }))
            return;
      }
      const cart = new Cart({
            productId: productId,
            association: user,
            quantity: quantity,
            mrp: mrp,
            variant: subProduct,
            discount: discount,
            priceAfterDiscount: priceAfterDiscount
      })
      await cart.save();

      res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: null }))

})


const getCartItems = asyncHandler(async (req, res, next) => {
      const userId = req.headers.users.id;

      if (!userId) {
            throw new BadRequestException(AppStrings.allParamsRequired)
      }

      const cart = await Cart.find({
            "association": userId
      })

      if (!cart) {
            res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: [] }))
      }


      let mrp = 0;
      let discount = 0;
      let priceAfterDiscount = 0;
      cart.map((e) => {
            mrp += e.mrp
            if (e.discount)
                  discount += e.discount
            priceAfterDiscount += e.priceAfterDiscount
      });
      res.status(200).send(new ApiResponse({
            status: 200, message: AppStrings.successful, data: {
                  products: cart,
                  mrp: mrp,
                  discount: discount,
                  priceAfterDiscount: priceAfterDiscount
            }
      }),
      )
})



const updateCart = asyncHandler(async (req, res, next) => {
      const { cartId, productId, variantId, quantity } = req.body;


      if (quantity == 0) {
            await deleteItemFromCart(cartId)
      }

      const subProduct = (await Product.findById(productId)).variants.id(variantId);

      const mrp = subProduct.mrp;
      const discount = subProduct.discount;
      const priceAfterDiscount = discount == null ? mrp : mrp - discount;


      const cartItem = await Cart.findByIdAndUpdate({
            _id: cartId
      }, {
            $set: {
                  quantity: quantity,
                  mrp: mrp,
                  discount: discount,
                  priceAfterDiscount: priceAfterDiscount
            }
      },

            { upsert: false }
      );
      if (!cartItem) {
            throw new ServerApiError(AppStrings.notAbleToCreateEntry);

      }

      res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: cartItem }))

})


const deleteFromCart = asyncHandler(async (req, res, next) => {
      const { cartId } = req.body;
      await deleteItemFromCart(cartId);
      res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: null }))
})



const deleteItemFromCart = async (cartId) => {

      await Cart.deleteOne({ _id: cartId })

}


export { addToCart, getCartItems, updateCart, deleteFromCart }