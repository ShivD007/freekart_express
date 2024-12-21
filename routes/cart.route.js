import { Router } from "express";
import { addToCart, deleteFromCart, getCartItems, updateCart } from "../controllers/cart_controller.js";

const router = Router();

router.route("/").post(addToCart).get(getCartItems).put(updateCart).delete(deleteFromCart);



export default router