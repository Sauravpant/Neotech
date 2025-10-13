import express from "express";
import type { Express } from "express";
import errorMiddleware from "./middlewares/error-handler.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

const environment = process.env.NODE_ENV;

app.use(
  cors({
    origin: environment === "production" ? process.env.CORS_ORIGIN : "http://localhost:5173",
    credentials: true,
  })
);

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

//Admin routes
import adminCategoryRoutes from "./routes/admin/category.routes";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/report", reportRoutes);

// Admin routes
app.use("/api/v1/admin/category", adminCategoryRoutes);


app.use(errorMiddleware);
export default app;
