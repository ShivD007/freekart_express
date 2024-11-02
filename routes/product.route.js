import { Router } from "express";
import { getAllProduct, getProduct, removeProductVariant, setProduct } from "../controllers/product_controller.js";

const router = Router();

router.route("/").post(setProduct).get(getAllProduct);
router.route(":id").get(getProduct);
router.route("/removeProductVariant").get(removeProductVariant);


export default router;