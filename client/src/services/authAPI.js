// services/authAPI.js
import httpMethods, { httpUtils } from "./httpClient";

const base = "/auth";

const authAPI = {
  // POST /api/auth/login - Đăng nhập
  login: async (credentials) => {
    try {
      const response = await httpMethods.post(`${base}/login`, credentials);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // POST /api/auth/register - Đăng ký
  register: async (userData) => {
    try {
      const response = await httpMethods.post(`${base}/register`, userData);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // POST /api/auth/logout - Đăng xuất
  logout: async () => {
    try {
      const response = await httpMethods.post(`${base}/logout`);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/auth/me - Lấy thông tin user hiện tại
  getProfile: async () => {
    try {
      const response = await httpMethods.get(`${base}/me`);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/auth/change-password - Đổi mật khẩu
  changePassword: async (passwordData) => {
    try {
      const response = await httpMethods.put(
        `${base}/change-password`,
        passwordData
      );
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/auth/profile - Cập nhật profile
  updateProfile: async (profileData) => {
    try {
      const response = await httpMethods.put(`${base}/profile`, profileData);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // POST /api/auth/forgot-password - Quên mật khẩu
  forgotPassword: async (email) => {
    try {
      const response = await httpMethods.post(`${base}/forgot-password`, {
        email,
      });
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // POST /api/auth/reset-password - Đặt lại mật khẩu
  resetPassword: async (token, password) => {
    try {
      const response = await httpMethods.post(`${base}/reset-password`, {
        token,
        password,
      });
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },
};

export default authAPI;
