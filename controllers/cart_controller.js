import mongoose from "mongoose";
import { AppStrings } from "../constants/app.strings.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { BadRequestException, ServerApiError } from "../response/apiError.js";
import asyncHandler from "../response/asyncHandler.js";
import { ApiResponse } from "../response/response.js";

const addToCart = asyncHandler(async (req, res, next) => {
      const { productId, variantId, userId, quantity } = req.body;

      if (!userId) {
            throw new BadRequestException(AppStrings.allParamsRequired)
      }

      const user = await User.findById(userId);

      const subProduct = (await Product.findById(productId)).variants.id(variantId);

      const mrp = subProduct.mrp;
      const discount = subProduct.discount;
      const priceAfterDiscount = discount == null ? mrp : mrp - discount;


      const cart = new Cart({
            productId: productId,
            association: user,
            quantity: quantity,
            mrp: mrp,
            discount: discount,
            priceAfterDiscount: priceAfterDiscount
      })
      cart.save();

      res.status(200).send(new ApiResponse({ status: 200, message: AppStrings.successful, data: null }))

})


const getCartItems = asyncHandler(async (req, res, next) => {
      const { userId } = req.body;

      if (!userId) {
            throw new BadRequestException(AppStrings.allParamsRequired)
      }

      const cart = await Cart.find({
            "$elemMatch": {
                  "association": mongoose.Types.ObjectId(userId)
            }
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

      const cart = await Cart.findById(cartId)

      if (quantity == 0) {
            deleteItemFromCart(cartId)
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

})



const deleteItemFromCart = async (cartId) => {

      await Cart.deleteOne(cartId)

}


export { addToCart, getCartItems, updateCart, deleteFromCart }