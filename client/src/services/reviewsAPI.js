import http from "./httpClient";

const BASE = "/user/reviews";

const reviewsAPI = {
  getByService: async (serviceId) => {
    return await http.get(`${BASE}/by-service/${serviceId}`);
  },

  getByBooking: async (bookingId) => {
    return await http.get(`${BASE}/by-booking/${bookingId}`);
  },

  create: async ({ serviceId, bookingId, rating, comment, images = [] }) => {
    return await http.post(`${BASE}`, {
      serviceId,
      bookingId,
      rating,
      comment,
      images,
    });
  },
};

export default reviewsAPI;
