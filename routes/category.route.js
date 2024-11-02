import { Router } from "express";
import { getCategories, setCategory, updateCategory } from "../controllers/category_controller.js";

const router = Router();

router.route("/").post(setCategory).put(updateCategory).get(getCategories);


export default router;