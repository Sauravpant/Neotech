import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middlewares";
import { verifyAdmin } from "../../middlewares/verify-admin.middleware";
import { createProduct, deleteProduct, updateProduct } from "../../controllers/admin/product.controller";
import { upload } from "../../middlewares/multer.middlewares";

const router = Router();
router.use(verifyJWT, verifyAdmin);

router.post("/add-product", upload.single("productImage"), createProduct);
router.patch("/update-product/:productId", upload.single("productImage"), updateProduct);
router.delete("/delete-product/:productId", deleteProduct);

export default router;
