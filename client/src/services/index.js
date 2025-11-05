// services/index.js
// Export all services
export { default as authAPI } from "./authAPI";
export { httpClient, httpUtils, apiEndpoints } from "./httpClient";
export { default as httpMethods } from "./httpClient";
export {
  default as ApiService,
  userService,
  adminService,
  fileService,
  notificationService,
  searchService,
  healthService,
} from "./apiService";

// Re-export commonly used utilities
export { httpUtils as apiUtils } from "./httpClient";

// Service factory for creating new API services
export const createApiService = (baseEndpoint) => {
  return new ApiService(baseEndpoint);
};

// Admin API services
export { default as adminDashboardAPI } from "./admin/adminDashboardAPI";
export { default as adminAppointmentsAPI } from "./admin/adminAppointmentsAPI";
export { default as adminServicesAPI } from "./admin/adminServicesAPI";
export { default as adminStaffAPI } from "./admin/adminStaffAPI";
export { default as adminNotificationsAPI } from "./admin/adminNotificationsAPI";
export { default as adminCategoriesAPI } from "./admin/adminCategoriesAPI";
export { default as adminUsersAPI } from "./admin/adminUsersAPI";
export { default as adminContactAPI } from "./admin/adminContactAPI";
export { default as adminReviewsAPI } from "./admin/adminReviewsAPI";

// Public API services
export { default as availabilityAPI } from "./public/availabilityAPI";
export { default as contactAPI } from "./public/contactAPI";
export { default as servicesAPI } from "./public/servicesAPI";

// User API services
export { default as userBookingsAPI } from "./userBookingsAPI";
export { default as reviewsAPI } from "./reviewsAPI";
