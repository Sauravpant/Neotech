import { Router } from "express";
import { deleteOrder, getAllOrders, getOrderStats, updateOrderStatus } from "../../controllers/admin/order.controller";

const router = Router();

router.get("/get-all-orders", getAllOrders);
router.patch("/update-order/:orderId", updateOrderStatus);
router.delete("/delete-order/:orderId", deleteOrder);
router.get("/get-order-stats", getOrderStats);

export default router;
