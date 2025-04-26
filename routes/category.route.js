import { Router } from "express";
import { getCategory, setCategory, updateCategory, getAllCategories } from "../controllers/category_controller.js";

const router = Router();

router.route("/").post(setCategory).put(updateCategory);
router.route("/").get(getCategory);
router.route("/allCategories").get(getAllCategories);

export default router;