// backend/api/index.js
// Vercel serverless function handler for Express.js
import app from "../server.js";

// Export as handler function for Vercel serverless
// This is the correct format for Express apps on Vercel
export default (req, res) => {
  try {
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
