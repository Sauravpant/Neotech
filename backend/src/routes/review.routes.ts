import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { verifyUser } from "../middlewares/verify-user.middleware";
import { createReview, deleteReview, getMyReviews, updateReview } from "../controllers/review.controller";

const router = Router();

router.use(verifyJWT);
router.use(verifyUser);

router.get("/get-my-reviews", getMyReviews);
router.post("/create-review", createReview);
router.patch("/update-review/:id", updateReview);
router.delete("/delete-review/:id", deleteReview);

export default router;
