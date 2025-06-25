import express from "express";
import {
  createPaymentIntent,
  getAllPayement,
  savePayement,
} from "../controllers/paymentController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create-payment-intent", authenticate, createPaymentIntent);
router.post("/save-payment", authenticate, savePayement);
router.get("/all", authenticate, getAllPayement);

export default router;
