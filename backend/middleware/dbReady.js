// middleware/dbReady.js
// Middleware to ensure MongoDB connection is ready before processing requests
import { ensureConnection, getConnectionState } from "../config/database.js";

/**
 * Middleware to ensure MongoDB connection is ready before processing API requests
 * This is critical for Vercel serverless where connection might not be ready
 */
const ensureDbConnection = async (req, res, next) => {
  try {
    const state = getConnectionState();

    // Log connection state for debugging
    if (process.env.NODE_ENV === "development" || process.env.VERCEL) {
      console.log(
        `🔍 DB Connection State: ${state} for ${req.method} ${req.path}`
      );
    }

    // Ensure connection is ready
    await ensureConnection();

    next();
  } catch (error) {
    console.error("❌ Database connection error in middleware:", error);
    res.status(503).json({
      success: false,
      message: "Database connection unavailable. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default ensureDbConnection;
