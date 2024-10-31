import express from "express"
import { updateUserAddress } from "../controllers/address_controller"
const router = express.Router()

router.put("/updateAddress", updateUserAddress);


export default router 