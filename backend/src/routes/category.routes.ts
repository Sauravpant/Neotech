import { Router } from "express";
import { getAllCategories } from "../controllers/category.controller";

const router = Router();

router.get("/get-all-categories", getAllCategories);

export default router;
