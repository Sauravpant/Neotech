import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { verifyUser } from "../middlewares/verify-user.middleware";
import { reportProduct, deleteReport, getMyReports } from "../controllers/report.controller";

const router = Router();

router.use(verifyJWT);
router.use(verifyUser);

router.get("/my-reports", getMyReports);
router.post("/report-product/:productId", reportProduct);
router.delete("/delete-report/:reportId", deleteReport);

export default router;
