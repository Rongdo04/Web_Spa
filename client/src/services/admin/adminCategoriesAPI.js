// services/admin/adminCategoriesAPI.js
import httpMethods from "../httpClient.js";

const BASE_URL = "/admin/categories";

const adminCategoriesAPI = {
  // Get all categories with pagination and filtering
  list: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;
      return await httpMethods.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Get category tree (hierarchical structure)
  getTree: async (activeOnly = true) => {
    try {
      const url = `${BASE_URL}/tree?activeOnly=${activeOnly}`;
      return await httpMethods.get(url);
    } catch (error) {
      throw error;
    }
  },

  // Get single category by ID
  getById: async (id) => {
    try {
      return await httpMethods.get(`${BASE_URL}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Create new category
  create: async (categoryData) => {
    try {
      return await httpMethods.post(BASE_URL, categoryData);
    } catch (error) {
      throw error;
    }
  },

  // Update category
  update: async (id, categoryData) => {
    try {
      return await httpMethods.put(`${BASE_URL}/${id}`, categoryData);
    } catch (error) {
      throw error;
    }
  },

  // Delete category
  delete: async (id) => {
    try {
      return await httpMethods.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Alias for remove
  remove: async (id) => {
    return this.delete(id);
  },

  // Toggle category status
  toggleStatus: async (id, data) => {
    try {
      return await httpMethods.patch(`${BASE_URL}/${id}/toggle`, data);
    } catch (error) {
      throw error;
    }
  },

  // Alias for toggle
  toggle: async (id) => {
    return this.toggleStatus(id, {});
  },

  // Reorder categories
  reorder: async (categoryIds) => {
    try {
      return await httpMethods.patch(`${BASE_URL}/reorder`, { categoryIds });
    } catch (error) {
      throw error;
    }
  },

  // Get category statistics
  getStats: async () => {
    try {
      return await httpMethods.get(`${BASE_URL}/stats`);
    } catch (error) {
      throw error;
    }
  },

  // Search categories
  search: async (query, options = {}) => {
    try {
      const params = {
        search: query,
        ...options,
      };
      return await this.list(params);
    } catch (error) {
      throw error;
    }
  },

  // Get categories by parent
  getByParent: async (parentId, options = {}) => {
    try {
      const params = {
        parentCategory: parentId,
        ...options,
      };
      return await this.list(params);
    } catch (error) {
      throw error;
    }
  },

  // Get root categories (no parent)
  getRootCategories: async (options = {}) => {
    try {
      const params = {
        parentCategory: null,
        ...options,
      };
      return await this.list(params);
    } catch (error) {
      throw error;
    }
  },

  // Get active categories only
  getActive: async (options = {}) => {
    try {
      const params = {
        isActive: true,
        ...options,
      };
      return await this.list(params);
    } catch (error) {
      throw error;
    }
  },

  // Bulk operations
  bulkUpdate: async (updates) => {
    try {
      const promises = updates.map(({ id, data }) => this.update(id, data));
      return await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  },

  bulkToggle: async (ids, isActive) => {
    try {
      const promises = ids.map((id) => this.toggle(id));
      return await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  },

  bulkDelete: async (ids) => {
    try {
      const promises = ids.map((id) => this.remove(id));
      return await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  },
};

export default adminCategoriesAPI;
