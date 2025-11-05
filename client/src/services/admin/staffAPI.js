// services/admin/staffAPI.js
import httpClient, { httpUtils } from "../httpClient";

const base = "/admin/staff";

const staffAPI = {
  // GET /api/admin/staff
  getStaffList: async (params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs ? `${base}?${qs}` : base;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/staff/:id
  getStaffById: async (id) => {
    try {
      return await httpClient.get(`${base}/${id}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // POST /api/admin/staff
  createStaff: async (data) => {
    try {
      return await httpClient.post(base, data);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/admin/staff/:id
  updateStaff: async (id, data) => {
    try {
      return await httpClient.put(`${base}/${id}`, data);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // DELETE /api/admin/staff/:id
  deleteStaff: async (id) => {
    try {
      return await httpClient.delete(`${base}/${id}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PATCH /api/admin/staff/:id/toggle
  toggleStaffStatus: async (id, data) => {
    try {
      return await httpClient.patch(`${base}/${id}/toggle`, data);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/staff/:id/stats
  getStaffStatistics: async (id, params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs ? `${base}/${id}/stats?${qs}` : `${base}/${id}/stats`;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },
};

export default staffAPI;
