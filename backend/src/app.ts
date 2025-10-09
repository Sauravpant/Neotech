import express from "express";
import type { Express } from "express";
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
import errorMiddleware from "./middlewares/error-handler.middleware";

app.use("/api/v1/auth", authRoutes);



app.use(errorMiddleware)
export default app;
