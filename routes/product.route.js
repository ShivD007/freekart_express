import { Router } from "express";
import { getAllProduct, getProduct, setProduct } from "../controllers/product_controller.js";

const router = Router();

router.route("/").post(setProduct).get(getAllProduct);
router.route(":id").get(getProduct);


export default router;