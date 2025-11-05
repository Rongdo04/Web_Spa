// services/adminAppointmentsAPI.js
import httpClient, { httpUtils } from "../httpClient";

const base = "/admin/appointments";

const adminAppointmentsAPI = {
  // GET /api/admin/appointments
  list: async (params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs ? `${base}?${qs}` : base;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/appointments/calendar
  calendar: async (params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs ? `${base}/calendar?${qs}` : `${base}/calendar`;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/appointments/check-conflicts
  checkConflicts: async (params = {}) => {
    try {
      const qs = httpUtils.buildQueryString(params);
      const url = qs
        ? `${base}/check-conflicts?${qs}`
        : `${base}/check-conflicts`;
      return await httpClient.get(url);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/appointments/number/:appointmentNumber
  getByNumber: async (appointmentNumber) => {
    try {
      return await httpClient.get(`${base}/number/${appointmentNumber}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/admin/appointments/:id
  getById: async (id) => {
    try {
      return await httpClient.get(`${base}/${id}`);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // POST /api/admin/appointments
  create: async (data) => {
    try {
      return await httpClient.post(base, data);
    } catch (error) {
      throw error; // Keep original error to preserve response data
    }
  },

  // PUT /api/admin/appointments/:id
  update: async (id, data) => {
    try {
      return await httpClient.put(`${base}/${id}`, data);
    } catch (error) {
      throw error; // Keep original error to preserve response data
    }
  },

  // DELETE /api/admin/appointments/:id
  remove: async (id) => {
    try {
      return await httpClient.delete(`${base}/${id}`);
    } catch (error) {
      throw error; // Keep original error to preserve response data
    }
  },

  // PATCH /api/admin/appointments/:id/status
  updateStatus: async (id, status) => {
    try {
      return await httpClient.patch(`${base}/${id}/status`, { status });
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PATCH /api/admin/appointments/:id/reschedule
  reschedule: async (id, payload) => {
    try {
      return await httpClient.patch(`${base}/${id}/reschedule`, payload);
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PATCH /api/admin/appointments/:id/assign-staff
  assignStaff: async (id, staffId) => {
    try {
      return await httpClient.patch(`${base}/${id}/assign-staff`, { staffId });
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },
};

export default adminAppointmentsAPI;
