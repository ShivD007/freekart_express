import { Router } from "express";
import { createOffer, deleteOffer, getOffer, getOffers, updateOffer } from "../controllers/offer_controller.js";

const router = Router();

router.route("/admin/getOffers/").post(createOffer).get(getOffers);
router.route("/admin/getOffers/").put(updateOffer).delete(deleteOffer);
router.route("/getOffers/").get(getOffers);
router.route("/getOffers/:id").get(getOffer);

export default router;