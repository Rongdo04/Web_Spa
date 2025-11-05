// backend/api/index.js
// Vercel serverless function handler for Express.js
import app from "../server.js";
import { ensureConnection } from "../config/database.js";

// Export as handler function for Vercel serverless
// This is the correct format for Express apps on Vercel
export default async (req, res) => {
  try {
    // Ensure MongoDB connection is ready before handling request
    // This is critical for Vercel serverless where connection might not be ready
    await ensureConnection();

    return app(req, res);
  } catch (error) {
    console.error("Serverless function error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
