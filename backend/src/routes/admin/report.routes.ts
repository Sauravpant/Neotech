import { Router } from "express";
import { deleteReport, getAllReports } from "../../controllers/admin/report.controller";
import { verifyJWT } from "../../middlewares/auth.middlewares";
import { verifyAdmin } from "../../middlewares/verify-admin.middleware";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.get("/get-all-reports", getAllReports);
router.delete("/delete-report/:reportId", deleteReport);

export default router;
