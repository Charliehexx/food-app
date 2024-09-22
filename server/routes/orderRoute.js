import { createCheckOutSession, getOrders, stripeWebhook } from "../controller/order-controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import express from 'express';
const router = express.Router();


router.route("/").get(isAuthenticated, getOrders)
router.route('/checkout/create-checkout-session').post(isAuthenticated, createCheckOutSession)
router.route("/webhook").post(express.raw({ type: 'application/json' }), stripeWebhook);
export default router