import httpClient from "../httpClient.js";

class ServicesAPI {
  constructor() {
    this.baseURL = "/public/services";
  }

  // GET /api/public/services/featured - Lấy danh sách dịch vụ nổi bật
  async getFeaturedServices(limit = 4) {
    try {
      const response = await httpClient.get(`${this.baseURL}/featured`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching featured services:", error);
      throw error;
    }
  }

  // GET /api/public/services - Lấy danh sách tất cả dịch vụ
  async getServices(params = {}) {
    try {
      const response = await httpClient.get(this.baseURL, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  }

  // GET /api/public/services/:id - Lấy chi tiết dịch vụ
  async getServiceById(id) {
    try {
      console.log("Making API call to:", `${this.baseURL}/${id}`);
      const response = await httpClient.get(`${this.baseURL}/${id}`);
      console.log("Raw API response:", response);
      console.log("Response data:", response.data);
      console.log("Response data type:", typeof response.data);
      return response.data; // httpMethods.get already returns response.data
    } catch (error) {
      console.error("Error fetching service:", error);
      console.error("Error details:", error.response?.data);
      throw error;
    }
  }
}

export default new ServicesAPI();
