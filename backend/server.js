// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin/index.js";
import publicContactRoutes from "./routes/public/contact.js";
import publicServicesRoutes from "./routes/public/services.js";
import publicCategoriesRoutes from "./routes/public/categories.js";
import publicStaffRoutes from "./routes/public/staff.js";
import userBookingsRoutes from "./routes/user/bookings.js";
import userProfileRoutes from "./routes/user/profile.js";
import userReviewsRoutes from "./routes/user/reviews.js";
import config from "./config/index.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = config.PORT;

// Middleware
app.use(
  cors({
    origin: config.CORS.ALLOWED_ORIGINS,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user/bookings", userBookingsRoutes);
app.use("/api/user/profile", userProfileRoutes);
app.use("/api/user/reviews", userReviewsRoutes);
app.use("/api/public/contact", publicContactRoutes);
app.use("/api/public/services", publicServicesRoutes);
app.use("/api/public/categories", publicCategoriesRoutes);
app.use("/api/public/staff", publicStaffRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Authentication API Server is running",
    timestamp: new Date().toISOString(),
    database: "MongoDB Connected",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "MERN Authentication API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      admin: "/api/admin",
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Global error:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📋 API Documentation: http://localhost:${port}/api/health`);
  console.log(`🔄 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
