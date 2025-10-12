import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { verifyUser } from "../middlewares/verify-user.middleware";
import { addToWishlist, removeFromWishlist, getMyWishlist, clearWishlist } from "../controllers/wishlist.controller";

const router = Router();

router.use(verifyJWT);
router.use(verifyUser);

router.get("/get-wishlist", getMyWishlist);
router.post("/add-to-wishlist/:productId", addToWishlist);
router.patch("/remove-from-wishlist/:productId", removeFromWishlist);
router.delete("/clear-wishlist", clearWishlist);

export default router;
