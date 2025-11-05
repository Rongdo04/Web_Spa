// services/userBookingsAPI.js
import httpMethods, { httpUtils } from "./httpClient";

const base = "/user/bookings";

const userBookingsAPI = {
  // GET /api/user/bookings - Lấy danh sách bookings của user hiện tại
  getMyBookings: async (params = {}) => {
    try {
      const response = await httpMethods.get(base, { params });
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/user/bookings/:id - Lấy chi tiết booking
  getBookingById: async (id) => {
    try {
      const response = await httpMethods.get(`${base}/${id}`);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/user/bookings/:id/cancel - Hủy booking
  cancelBooking: async (id, reason = "") => {
    try {
      const response = await httpMethods.put(`${base}/${id}/cancel`, {
        reason,
      });
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // PUT /api/user/bookings/:id/reschedule - Đổi lịch booking
  rescheduleBooking: async (id, newDate, newTime) => {
    try {
      const response = await httpMethods.put(`${base}/${id}/reschedule`, {
        newDate,
        newTime,
      });
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },

  // GET /api/user/bookings/stats - Lấy thống kê bookings của user
  getBookingStats: async () => {
    try {
      const response = await httpMethods.get(`${base}/stats`);
      return response;
    } catch (error) {
      throw httpUtils.handleApiError(error);
    }
  },
};

export default userBookingsAPI;
