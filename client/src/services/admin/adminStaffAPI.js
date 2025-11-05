// services/adminStaffAPI.js
import httpClient, { httpUtils } from "../httpClient";

const base = "/admin/staff";

const adminStaffAPI = {
  // GET /api/admin/staff
  list: async (params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs ? `${base}?${qs}` : base;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/staff/:id
  getById: async (id) => {
    try {
      return await httpClient.get(`${base}/${id}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // POST /api/admin/staff
  create: async (data) => {
    try {
      return await httpClient.post(base, data);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/admin/staff/:id
  update: async (id, data) => {
    try {
      return await httpClient.put(`${base}/${id}`, data);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // DELETE /api/admin/staff/:id
  remove: async (id) => {
    try {
      return await httpClient.delete(`${base}/${id}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PATCH /api/admin/staff/:id/toggle
  toggle: async (id) => {
    try {
      return await httpClient.patch(`${base}/${id}/toggle`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/staff/:id/stats
  getStatistics: async (id, params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs ? `${base}/${id}/stats?${qs}` : `${base}/${id}/stats`;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },
};

export default adminStaffAPI;
