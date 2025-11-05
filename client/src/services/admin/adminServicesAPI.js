// services/adminServicesAPI.js
import httpClient, { httpUtils } from "../httpClient";

const base = "/admin/services";

const adminServicesAPI = {
  // GET /api/admin/services
  list: async (params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs ? `${base}?${qs}` : base;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/services/:id
  getById: async (id) => {
    try {
      return await httpClient.get(`${base}/${id}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // POST /api/admin/services
  create: async (data) => {
    try {
      return await httpClient.post(base, data);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/admin/services/:id
  update: async (id, data) => {
    try {
      return await httpClient.put(`${base}/${id}`, data);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // DELETE /api/admin/services/:id
  remove: async (id) => {
    try {
      return await httpClient.delete(`${base}/${id}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PATCH /api/admin/services/:id/toggle
  toggle: async (id) => {
    try {
      return await httpClient.patch(`${base}/${id}/toggle`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/admin/services/reorder
  reorder: async (orderedIds) => {
    try {
      return await httpClient.put(`${base}/reorder`, { orderedIds });
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },
};

export default adminServicesAPI;
