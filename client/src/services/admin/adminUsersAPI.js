// services/admin/adminUsersAPI.js
import httpMethods, { httpUtils } from "../httpClient";

const base = "/admin/users";

const adminUsersAPI = {
  // GET /api/admin/users - Lấy danh sách users
  list: async (params = {}) => {
    try {
      const response = await httpMethods.get(base, { params });
      return response; // httpMethods already returns response.data
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/users/:id - Lấy chi tiết user
  getById: async (id) => {
    try {
      const response = await httpMethods.get(`${base}/${id}`);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // POST /api/admin/users - Tạo user mới
  create: async (userData) => {
    try {
      const response = await httpMethods.post(base, userData);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/admin/users/:id - Cập nhật user
  update: async (id, userData) => {
    try {
      const response = await httpMethods.put(`${base}/${id}`, userData);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // DELETE /api/admin/users/:id - Xóa user
  remove: async (id) => {
    try {
      const response = await httpMethods.delete(`${base}/${id}`);
      console.log("adminUsersAPI.remove success response:", response);
      // httpMethods.delete already returns response.data, so response is the data
      return (
        response || { success: true, message: "Xóa người dùng thành công" }
      );
    } catch (error) {
      console.error("adminUsersAPI.remove error:", error);
      // Return error response instead of throwing
      return {
        success: false,
        message: error.message || "Lỗi khi xóa người dùng",
        error: error,
      };
    }
  },

  // GET /api/admin/users/stats - Lấy thống kê users
  getStats: async () => {
    try {
      const response = await httpMethods.get(`${base}/stats`);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/admin/users/:id/status - Thay đổi trạng thái user
  updateStatus: async (id, status) => {
    try {
      const response = await httpMethods.put(`${base}/${id}/status`, {
        status,
      });
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/admin/users/:id/level - Cập nhật level user
  updateLevel: async (id, level) => {
    try {
      const response = await httpMethods.put(`${base}/${id}/level`, { level });
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },
};

export default adminUsersAPI;
