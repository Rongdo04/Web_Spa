// services/adminNotificationsAPI.js
import httpClient, { httpUtils } from "../httpClient";

const base = "/admin/notifications";

const adminNotificationsAPI = {
  // Templates
  listTemplates: async (params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs ? `${base}/templates?${qs}` : `${base}/templates`;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  getTemplateById: async (id) => {
    try {
      return await httpClient.get(`${base}/templates/${id}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  createTemplate: async (data) => {
    try {
      return await httpClient.post(`${base}/templates`, data);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  updateTemplate: async (id, data) => {
    try {
      return await httpClient.put(`${base}/templates/${id}`, data);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  deleteTemplate: async (id) => {
    try {
      return await httpClient.delete(`${base}/templates/${id}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  toggleTemplate: async (id) => {
    try {
      return await httpClient.patch(`${base}/templates/${id}/toggle`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // Logs
  listLogs: async (params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs ? `${base}/logs?${qs}` : `${base}/logs`;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // Send test notification
  sendTest: async (templateId, email) => {
    try {
      return await httpClient.post(`${base}/send`, {
        templateId,
        email,
      });
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },
};

export default adminNotificationsAPI;
