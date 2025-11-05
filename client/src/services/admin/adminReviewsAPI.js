import http from "../httpClient.js";

class AdminReviewsAPI {
  constructor() {
    this.baseURL = "/admin/reviews";
  }

  // GET /api/admin/reviews - List all reviews with filtering and pagination
  async getReviews(params = {}) {
    try {
      const response = await http.get(this.baseURL, { params });
      console.log("AdminReviewsAPI - Raw response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }

  // GET /api/admin/reviews/:id - Get single review by ID
  async getReviewById(id) {
    try {
      const response = await http.get(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching review:", error);
      throw error;
    }
  }

  // GET /api/admin/reviews/stats - Get review statistics
  async getReviewStats() {
    try {
      const response = await http.get(`${this.baseURL}/stats`);
      return response.data;
    } catch (error) {
      console.error("Error fetching review stats:", error);
      throw error;
    }
  }
}

export default new AdminReviewsAPI();
