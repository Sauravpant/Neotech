import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../../controllers/admin/category.controller";
import { verifyJWT } from "../../middlewares/auth.middlewares";
import { verifyAdmin } from "../../middlewares/verify-admin.middleware";

const router = Router();

router.use(verifyJWT);
router.use(verifyAdmin);

router.post("/add-category", addCategory);
router.get("/get-all-categories", getAllCategories);
router.get("/get-category/:categoryId", getCategoryById);
router.patch("/update-category/:categoryId", updateCategory);
router.delete("/delete-category/:categoryId", deleteCategory);

export default router;
