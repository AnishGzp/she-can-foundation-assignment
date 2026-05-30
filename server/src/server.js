import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sendSuccess } from "./utils/apiResponse.js";
import { handleError } from "./utils/handleError.js";
import { dbConnect } from "./config/dbConnect.js";
import { adminSeeder } from "./config/seeding.js";
import authRoutes from "./router/auth.routes.js";
import contactRouter from "./router/contact.routes.js";

const app = express();

const PORT = process.env.PORT || 4000;

// Supporting middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// Health check
app.get("/api/health", (req, res) => {
  sendSuccess(res, "API is running", { timeStamp: new Date().toISOString() });
});

// APIs
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRouter);

// Global error handler
app.use(handleError);

const startServer = async () => {
  try {
    await dbConnect();

    await adminSeeder();

    app.listen(PORT, () => {
      console.log(`App is listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server\n", error);
  }
};

startServer();
