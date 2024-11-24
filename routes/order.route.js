import { Router } from "express";
import { addOrder, cancelOrder, getUserOrder } from "../controllers/order_controller";

const router = Router();

router.route("/").post(addOrder).get(getUserOrder).delete(cancelOrder);



export default router