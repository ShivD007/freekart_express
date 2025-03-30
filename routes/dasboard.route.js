import { Router } from "express";
import { getDashboard } from "../controllers/dashboard_controller.js";

const router = Router();

router.route("/").get(getDashboard)
console.log("Dashboard route loaded")

export default router;