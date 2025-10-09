import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middlewares";
import { uploadProfilePicture, deleteProfilePicture, getUserProfile, deactivateAccount, updateUserProfile } from "../controllers/user.controller";

const router = Router();

router.get("/me", verifyJWT, getUserProfile);
router.patch("/update-profile", verifyJWT, updateUserProfile);
router.patch("/upload-profile-picture", verifyJWT, upload.single("profilePicture"), uploadProfilePicture);
router.delete("/delete-profile-picture", verifyJWT, deleteProfilePicture);
router.patch("/deactivate-account", verifyJWT, deactivateAccount);

export default router;
