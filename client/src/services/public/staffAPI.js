import { httpClient } from "../httpClient";

// Lấy danh sách nhân viên công khai
export const getPublicStaff = async (params = {}) => {
  try {
    const { role = "", limit = 20 } = params;
    const queryParams = new URLSearchParams();

    if (role) queryParams.append("role", role);
    if (limit) queryParams.append("limit", limit);

    const url = `/public/staff${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await httpClient.get(url);

    return response;
  } catch (error) {
    console.error("Error fetching public staff:", error);
    throw error;
  }
};

// Lấy chi tiết nhân viên công khai
export const getPublicStaffById = async (id) => {
  try {
    const response = await httpClient.get(`/public/staff/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching public staff member:", error);
    throw error;
  }
};

// Lấy nhân viên theo vai trò
export const getStaffByRole = async (role) => {
  try {
    const response = await getPublicStaff({ role, limit: 50 });
    return response;
  } catch (error) {
    console.error("Error fetching staff by role:", error);
    throw error;
  }
};

const staffAPI = {
  getPublicStaff,
  getPublicStaffById,
  getStaffByRole,
};

export default staffAPI;
