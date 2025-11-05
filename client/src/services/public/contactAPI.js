// services/public/contactAPI.js
// Public API for contact information

import { httpClient } from "../httpClient";

class ContactAPI {
  constructor() {
    this.baseURL = "/public/contact";
  }

  /**
   * Get public contact information
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
}

// Create and export a singleton instance
const contactAPI = new ContactAPI();
export default contactAPI;

// Export the class for testing purposes
export { ContactAPI };
