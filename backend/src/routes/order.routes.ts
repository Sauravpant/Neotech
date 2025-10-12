import express, { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { verifyUser } from "../middlewares/verify-user.middleware";
import { cancelOrder, createOrder, getMyOrders, getOrderById, stripeWebhook } from "../controllers/order.controller";

const router = Router();

router.use(verifyJWT);
router.use(verifyUser);

router.post("/checkout", createOrder);
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
router.get("/my-orders", getMyOrders);
router.get("/get/:orderId", getOrderById);
router.patch("/cancel/:orderId", cancelOrder);

export default router;
