// services/public/availabilityAPI.js
// Public API for checking availability of services and staff

import { httpClient } from "../httpClient";

class AvailabilityAPI {
  constructor() {
    this.baseURL = "/public/availability";
  }

  /**
   * Check availability for a specific service and staff member
   * @param {Object} params - Availability check parameters
   * @param {string} params.serviceId - Service ID
   * @param {string} params.staffId - Staff ID (optional)
   * @param {string} params.date - Date in YYYY-MM-DD format
   * @param {string} params.timeSlot - Time slot (optional)
   * @returns {Promise<Object>} Availability data
   */
  async checkAvailability(params) {
    try {
      const response = await httpClient.get(`${this.baseURL}/check`, {
        params: {
          serviceId: params.serviceId,
          staffId: params.staffId,
          date: params.date,
          timeSlot: params.timeSlot,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error checking availability:", error);
      throw error;
    }
  }

  /**
   * Get available time slots for a service and date
   * @param {Object} params - Time slots parameters
   * @param {string} params.serviceId - Service ID
   * @param {string} params.staffId - Staff ID (optional)
   * @param {string} params.date - Date in YYYY-MM-DD format
   * @returns {Promise<Array>} Available time slots
   */
  async getAvailableTimeSlots(params) {
    try {
      const response = await httpClient.get(`${this.baseURL}/time-slots`, {
        params: {
          serviceId: params.serviceId,
          staffId: params.staffId,
          date: params.date,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting available time slots:", error);
      throw error;
    }
  }

  /**
   * Get staff availability for a specific date
   * @param {Object} params - Staff availability parameters
   * @param {string} params.staffId - Staff ID
   * @param {string} params.date - Date in YYYY-MM-DD format
   * @returns {Promise<Object>} Staff availability data
   */
  async getStaffAvailability(params) {
    try {
      const response = await httpClient.get(`${this.baseURL}/staff`, {
        params: {
          staffId: params.staffId,
          date: params.date,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting staff availability:", error);
      throw error;
    }
  }

  /**
   * Get service availability for a specific date
   * @param {Object} params - Service availability parameters
   * @param {string} params.serviceId - Service ID
   * @param {string} params.date - Date in YYYY-MM-DD format
   * @returns {Promise<Object>} Service availability data
   */
  async getServiceAvailability(params) {
    try {
      const response = await httpClient.get(`${this.baseURL}/service`, {
        params: {
          serviceId: params.serviceId,
          date: params.date,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting service availability:", error);
      throw error;
    }
  }

  /**
   * Get all available staff for a service on a specific date
   * @param {Object} params - Available staff parameters
   * @param {string} params.serviceId - Service ID
   * @param {string} params.date - Date in YYYY-MM-DD format
   * @param {string} params.timeSlot - Time slot (optional)
   * @returns {Promise<Array>} Available staff list
   */
  async getAvailableStaff(params) {
    try {
      const response = await httpClient.get(`${this.baseURL}/staff-list`, {
        params: {
          serviceId: params.serviceId,
          date: params.date,
          timeSlot: params.timeSlot,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting available staff:", error);
      throw error;
    }
  }

  /**
   * Check if a specific appointment slot is available
   * @param {Object} params - Appointment slot parameters
   * @param {string} params.serviceId - Service ID
   * @param {string} params.staffId - Staff ID
   * @param {string} params.date - Date in YYYY-MM-DD format
   * @param {string} params.timeSlot - Time slot
   * @returns {Promise<boolean>} Whether the slot is available
   */
  async isSlotAvailable(params) {
    try {
      const response = await httpClient.get(`${this.baseURL}/slot-check`, {
        params: {
          serviceId: params.serviceId,
          staffId: params.staffId,
          date: params.date,
          timeSlot: params.timeSlot,
        },
      });
      return response.data.available;
    } catch (error) {
      console.error("Error checking slot availability:", error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const availabilityAPI = new AvailabilityAPI();
export default availabilityAPI;

// Export the class for testing purposes
export { AvailabilityAPI };
