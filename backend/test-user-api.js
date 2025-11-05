// test-user-api.js - Test user API endpoints
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import User from "./models/User.js";
import { generateToken } from "./utils/jwt.js";

dotenv.config();

const testUserAPI = async () => {
  try {
    await connectDB();
    console.log("🔗 Connected to database");

    // Find admin user
    const adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      console.log("❌ No admin user found. Please run seed.js first.");
      return;
    }

    console.log("👤 Found admin user:", {
      id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
    });

    // Generate token for testing
    const token = generateToken({ id: adminUser._id });
    console.log("🔑 Generated token:", token);

    // Test API endpoints
    const baseURL = "http://localhost:8000";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    console.log("\n🧪 Testing API endpoints...");

    // Test 1: Get Profile
    try {
      const profileResponse = await fetch(`${baseURL}/api/admin/user/profile`, {
        method: "GET",
        headers,
      });
      const profileData = await profileResponse.json();
      console.log(
        "✅ GET /profile:",
        profileData.success ? "SUCCESS" : "FAILED"
      );
      if (profileData.success) {
        console.log("   Data:", {
          name: profileData.data.name,
          email: profileData.data.email,
          role: profileData.data.role,
        });
      }
    } catch (error) {
      console.log("❌ GET /profile failed:", error.message);
    }

    // Test 2: Update Profile
    try {
      const updateResponse = await fetch(`${baseURL}/api/admin/user/profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          name: "Admin Updated",
          email: adminUser.email,
        }),
      });
      const updateData = await updateResponse.json();
      console.log(
        "✅ PUT /profile:",
        updateData.success ? "SUCCESS" : "FAILED"
      );
      if (updateData.success) {
        console.log("   Message:", updateData.message);
      }
    } catch (error) {
      console.log("❌ PUT /profile failed:", error.message);
    }

    // Test 3: Change Password
    try {
      const passwordResponse = await fetch(
        `${baseURL}/api/admin/user/change-password`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            currentPassword: "123456",
            newPassword: "newpassword123",
          }),
        }
      );
      const passwordData = await passwordResponse.json();
      console.log(
        "✅ PUT /change-password:",
        passwordData.success ? "SUCCESS" : "FAILED"
      );
      if (passwordData.success) {
        console.log("   Message:", passwordData.message);
      }
    } catch (error) {
      console.log("❌ PUT /change-password failed:", error.message);
    }

    // Test 4: Upload Avatar
    try {
      const avatarResponse = await fetch(`${baseURL}/api/admin/user/avatar`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          avatarUrl: "https://via.placeholder.com/150x150.png?text=Avatar",
        }),
      });
      const avatarData = await avatarResponse.json();
      console.log("✅ PUT /avatar:", avatarData.success ? "SUCCESS" : "FAILED");
      if (avatarData.success) {
        console.log("   Message:", avatarData.message);
      }
    } catch (error) {
      console.log("❌ PUT /avatar failed:", error.message);
    }

    console.log("\n🎉 API testing completed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await mongoose.connection.close();
  }
};

testUserAPI();
