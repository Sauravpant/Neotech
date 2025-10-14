import express from "express";
import type { Express, Request, Response } from "express";
import errorMiddleware from "./middlewares/error-handler.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

// Rate Limiter configuration to limit repeated requests to public APIs and/or endpoints such as password reset
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  ipv6Subnet: 56,
});

const app: Express = express();

const environment = process.env.NODE_ENV;

app.use(
  cors({
    origin: environment === "production" ? process.env.CORS_ORIGIN : "http://localhost:5173",
    credentials: true,
  })
);

app.use(limiter);
app.use(express.json({ limit: "1000kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import reviewRoutes from "./routes/review.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import reportRoutes from "./routes/report.routes";
import categoryRoutes from "./routes/category.routes";

//Admin routes
import adminCategoryRoutes from "./routes/admin/category.routes";
import adminProductRoutes from "./routes/admin/product.routes";
import adminUserRoutes from "./routes/admin/user.routes";
import adminOrderRoutes from "./routes/admin/order.routes";
import adminReportRoutes from "./routes/admin/report.routes";
import adminReviewRoutes from "./routes/admin/review.routes";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/report", reportRoutes);
app.use("/api/v1/category", categoryRoutes);


// Admin routes
app.use("/api/v1/admin/category", adminCategoryRoutes);
app.use("/api/v1/admin/product", adminProductRoutes);
app.use("/api/v1/admin/user", adminUserRoutes);
app.use("/api/v1/admin/order", adminOrderRoutes);
app.use("/api/v1/admin/report", adminReportRoutes);
app.use("/api/v1/admin/review", adminReviewRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: "Route not found" });
});

app.use(errorMiddleware);
export default app;
