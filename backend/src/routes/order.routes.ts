import express, { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { verifyUser } from "../middlewares/verify-user.middleware";
import { createOrder } from "../controllers/order.controller";

const router = Router();

router.use(verifyJWT);
router.use(verifyUser);

router.post("/checkout", createOrder);
router.post("/webhook", express.raw({ type: "application/json" }));

export default router;
