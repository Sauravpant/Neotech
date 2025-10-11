import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { verifyUser } from "../middlewares/verify-user.middleware";
import { addToCart, clearCart, decrementQuantity, getMyCart, incrementQuantity, removeFromCart } from "../controllers/cart.controller";

const router = Router();

router.use(verifyJWT);
router.use(verifyUser);

router.get("/get-cart", getMyCart);
router.post("/add-to-cart/:productId", addToCart);
router.patch("/increment-quantity/:productId", incrementQuantity);
router.patch("/decrement-quantity/:productId", decrementQuantity);
router.patch("/remove-item/:productId", removeFromCart);
router.delete("/clear-cart", clearCart);


export default router;