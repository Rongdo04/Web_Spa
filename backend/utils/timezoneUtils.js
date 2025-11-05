// utils/timezoneUtils.js

// Múi giờ Việt Nam (UTC+7)
const VIETNAM_OFFSET = 7 * 60; // 7 giờ * 60 phút

/**
 * Lấy thời gian hiện tại theo múi giờ Việt Nam
 */
const getVietnamTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const vietnamTime = new Date(utc + VIETNAM_OFFSET * 60000);
  return vietnamTime;
};

/**
 * Chuyển đổi Date object sang chuỗi ngày theo định dạng YYYY-MM-DD (múi giờ VN)
 */
const formatDateToVietnamString = (date) => {
  if (!date) return "";

  const vietnamTime = new Date(date.getTime() + VIETNAM_OFFSET * 60000);
  return vietnamTime.toISOString().split("T")[0];
};

/**
 * Chuyển đổi chuỗi ngày YYYY-MM-DD sang Date object (múi giờ VN)
 */
const parseVietnamDate = (dateString) => {
  if (!dateString) return null;

  // Tạo Date object từ chuỗi ngày và đặt thời gian là 00:00:00 theo múi giờ VN
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day, 0, 0, 0);

  // Điều chỉnh để phù hợp với múi giờ VN
  const utc = date.getTime() - date.getTimezoneOffset() * 60000;
  const vietnamTime = new Date(utc - VIETNAM_OFFSET * 60000);

  return vietnamTime;
};

/**
 * Kiểm tra xem một ngày có phải là hôm nay không (theo múi giờ VN)
 */
const isTodayVietnam = (date) => {
  const today = getVietnamTime();
  const targetDate = new Date(date);

  return (
    targetDate.getDate() === today.getDate() &&
    targetDate.getMonth() === today.getMonth() &&
    targetDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Lấy ngày hiện tại theo định dạng YYYY-MM-DD (múi giờ VN)
 */
const getTodayVietnamString = () => {
  return formatDateToVietnamString(getVietnamTime());
};

/**
 * Lấy ngày mai theo định dạng YYYY-MM-DD (múi giờ VN)
 */
const getTomorrowVietnamString = () => {
  const tomorrow = getVietnamTime();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDateToVietnamString(tomorrow);
};

/**
 * Format ngày theo định dạng Việt Nam
 */
const formatVietnamDate = (date, options = {}) => {
  if (!date) return "";

  const defaultOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("vi-VN", {
    ...defaultOptions,
    ...options,
  });
};

/**
 * Format thời gian theo định dạng Việt Nam
 */
const formatVietnamTime = (time) => {
  if (!time) return "";

  // Nếu time là string (HH:MM), chuyển thành Date object
  if (typeof time === "string") {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return new Date(time).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format ngày giờ theo định dạng Việt Nam
 */
const formatVietnamDateTime = (dateTime) => {
  if (!dateTime) return "";

  return new Date(dateTime).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Tạo filter cho MongoDB để lấy appointments trong khoảng thời gian (múi giờ VN)
 */
const createDateRangeFilter = (startDate, endDate) => {
  if (!startDate || !endDate) return {};

  const start = parseVietnamDate(startDate);
  const end = parseVietnamDate(endDate);

  // Thêm 1 ngày vào end date để bao gồm cả ngày cuối
  end.setDate(end.getDate() + 1);

  return {
    date: {
      $gte: start,
      $lt: end,
    },
  };
};

export {
  getVietnamTime,
  formatDateToVietnamString,
  parseVietnamDate,
  isTodayVietnam,
  getTodayVietnamString,
  getTomorrowVietnamString,
  formatVietnamDate,
  formatVietnamTime,
  formatVietnamDateTime,
  createDateRangeFilter,
};
