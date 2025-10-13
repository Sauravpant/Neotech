import { Router } from "express";
import { verifyAdmin } from "../../middlewares/verify-admin.middleware";
import { verifyJWT } from "../../middlewares/auth.middlewares";
import { deleteUserById, getAllUsers, getUserById, getUserStats } from "../../controllers/admin/user.controller";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.get("/all-users", getAllUsers);
router.get("/get-user/:userId", getUserById);
router.delete("/delete-user/:userId", deleteUserById);
router.get("/get-stats", getUserStats);


export default router;
