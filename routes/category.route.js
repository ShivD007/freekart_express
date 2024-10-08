import { Router } from "express";
import { getCategories, setCategory } from "../controllers/category_controller.js";

const router = Router();

router.route("/").post(setCategory).get(getCategories);


export default router;