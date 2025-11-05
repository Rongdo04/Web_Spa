// services/admin/adminUserAPI.js
import { httpClient } from "../httpClient.js";

const adminUserAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await httpClient.get("/admin/user/profile");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await httpClient.put("/admin/user/profile", profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await httpClient.put(
        "/admin/user/change-password",
        passwordData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload avatar
  uploadAvatar: async (avatarUrl) => {
    try {
      const response = await httpClient.put("/admin/user/avatar", {
        avatarUrl,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default adminUserAPI;
