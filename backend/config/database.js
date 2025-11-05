// config/database.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/Web_spa",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Lắng nghe các sự kiện của database
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log("🔄 MongoDB connection closed through app termination");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error closing MongoDB connection:", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Don't exit process in serverless environment (Vercel)
    // Let the connection retry on next request
    if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
      process.exit(1);
    }
  }
};

// Check if connection is ready
// readyState values: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
export const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get connection state string for logging
export const getConnectionState = () => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  return states[mongoose.connection.readyState] || "unknown";
};

// Ensure connection is ready before query
// This is critical for Vercel serverless where connection might not be ready
export const ensureConnection = async () => {
  const state = mongoose.connection.readyState;

  // Already connected
  if (state === 1) {
    return true;
  }

  // Currently connecting, wait for it
  if (state === 2) {
    console.log("⏳ MongoDB is connecting, waiting...");
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Connection timeout"));
      }, 10000); // 10 second timeout

      mongoose.connection.once("connected", () => {
        clearTimeout(timeout);
        console.log("✅ MongoDB connection established");
        resolve(true);
      });

      mongoose.connection.once("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
  }

  // Disconnected, try to connect
  if (state === 0 || state === 3) {
    console.log("🔄 MongoDB disconnected, attempting to connect...");
    try {
      await connectDB();
      return true;
    } catch (error) {
      console.error("❌ Failed to establish connection:", error.message);
      throw error;
    }
  }

  return false;
};

export default connectDB;
