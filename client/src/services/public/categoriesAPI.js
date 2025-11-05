import httpClient from "../httpClient.js";

class CategoriesAPI {
  constructor() {
    this.baseURL = "/public/categories";
  }

  // GET /api/public/categories - Lấy danh sách danh mục công khai
  async getCategories(params = {}) {
    try {
      const response = await httpClient.get(this.baseURL, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // GET /api/public/categories/:id - Lấy chi tiết danh mục
  async getCategoryById(id) {
    try {
      const response = await httpClient.get(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  }
}

export default new CategoriesAPI();
