import { Router } from "express";
import { getAllProducts, getProductById } from "../controllers/product.controller";

const router = Router();

router.get("/get-all-products", getAllProducts);
router.get("/:productId", getProductById);
export default router;
