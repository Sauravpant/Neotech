import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  sendOtp,
  changePassword,
  forgotPassword,
  verifyAccount,
  deleteAccount,
} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/send-otp", sendOtp);
router.patch("/change-password", verifyJWT, changePassword);
router.patch("/forgot-password", forgotPassword);
router.patch("/verify-account", verifyJWT, verifyAccount);
router.delete("/delete-account", verifyJWT, deleteAccount);

export default router;
