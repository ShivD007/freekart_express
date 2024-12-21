import { Router } from "express";
import { addOrder, cancelOrder, getUserOrder } from "../controllers/order_controller.js";

const router = Router();

router.route("/").post(addOrder).get(getUserOrder).delete(cancelOrder);



export default router