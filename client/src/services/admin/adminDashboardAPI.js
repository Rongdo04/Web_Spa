// services/adminDashboardAPI.js
import httpClient, { httpUtils } from "../httpClient";

const adminDashboardAPI = {
  // GET /api/admin/dashboard
  getDashboard: async () => {
    try {
      return await httpClient.get("/admin/dashboard");
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },
};

export default adminDashboardAPI;
