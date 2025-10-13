import { Router } from "express";
import { deleteReview, getAllReviews } from "../../controllers/admin/review.controller";
import { verifyJWT } from "../../middlewares/auth.middlewares";
import { verifyAdmin } from "../../middlewares/verify-admin.middleware";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.get("/get-all-reviews", getAllReviews);
router.delete("/delete-review/:reviewId", deleteReview);

export default router;
