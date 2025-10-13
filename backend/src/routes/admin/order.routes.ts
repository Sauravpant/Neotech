import { Router } from "express";
import { deleteOrder, getAllOrders, getOrderStats, updateOrderStatus } from "../../controllers/admin/order.controller";
import { verifyAdmin } from "../../middlewares/verify-admin.middleware";
import { verifyJWT } from "../../middlewares/auth.middlewares";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.get("/get-all-orders", getAllOrders);
router.patch("/update-order/:orderId", updateOrderStatus);
router.delete("/delete-order/:orderId", deleteOrder);
router.get("/get-order-stats", getOrderStats);

export default router;
