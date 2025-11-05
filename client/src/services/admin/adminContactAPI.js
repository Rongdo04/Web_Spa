// services/admin/adminContactAPI.js
// Admin API for contact management

import { httpClient } from "../httpClient";

class AdminContactAPI {
  constructor() {
    this.baseURL = "/admin/contact";
  }

  /**
   * Get contact information
   * @returns {Promise<Object>} Contact information
   */
  async getContactInfo() {
    try {
      const response = await httpClient.get(this.baseURL);
      return response.data;
    } catch (error) {
      console.error("Error getting contact info:", error);
      throw error;
    }
  }

  /**
   * Update contact information
   * @param {Object} contactData - Contact data to update
   * @returns {Promise<Object>} Updated contact information
   */
  async updateContactInfo(contactData) {
    try {
      const response = await httpClient.put(this.baseURL, contactData);
      return response.data;
    } catch (error) {
      console.error("Error updating contact info:", error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const adminContactAPI = new AdminContactAPI();
export default adminContactAPI;

// Export the class for testing purposes
export { AdminContactAPI };
