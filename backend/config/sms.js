// config/sms.js
export const smsConfig = {
  // SMS Provider Configuration
  provider: process.env.SMS_PROVIDER || "mock",

  // Twilio Configuration
  twilio: {
    accountSid: process.env.SMS_API_KEY || "",
    authToken: process.env.SMS_API_SECRET || "",
    fromNumber: process.env.SMS_FROM_NUMBER || "+1234567890",
  },

  // Vonage (Nexmo) Configuration
  vonage: {
    apiKey: process.env.SMS_API_KEY || "",
    apiSecret: process.env.SMS_API_SECRET || "",
    fromNumber: process.env.SMS_FROM_NUMBER || "YourBrandName",
  },

  // SMS Settings
  settings: {
    maxRecipients: 100, // Maximum recipients per bulk SMS
    rateLimit: 100, // SMS per minute
    retryAttempts: 3, // Number of retry attempts
    retryDelay: 5000, // Delay between retries (ms)
  },

  // Message Templates
  templates: {
    appointmentReminder:
      "Nhắc nhở: Bạn có lịch hẹn {{service_name}} vào {{appointment_date}} lúc {{start_time}} tại {{branch_name}}. Vui lòng đến đúng giờ.",
    appointmentConfirmation:
      "Xác nhận: Lịch hẹn {{service_name}} của bạn đã được xác nhận vào {{appointment_date}} lúc {{start_time}} với {{staff_name}}.",
    appointmentCancellation:
      "Hủy lịch: Lịch hẹn {{service_name}} vào {{appointment_date}} đã bị hủy. Vui lòng liên hệ để đặt lại.",
    paymentReminder:
      "Nhắc nhở thanh toán: Bạn còn nợ {{amount}} VND cho dịch vụ {{service_name}}. Vui lòng thanh toán sớm.",
    promotion:
      "Khuyến mãi: {{content}}. Áp dụng đến {{expiry_date}}. Liên hệ {{phone}} để biết thêm chi tiết.",
  },

  // Vietnamese phone number patterns
  phonePatterns: {
    mobile: /^(03|05|07|08|09)[0-9]{8}$/,
    landline: /^(02|04|08)[0-9]{8,9}$/,
  },

  // Error messages
  errors: {
    invalidPhone: "Số điện thoại không hợp lệ",
    emptyMessage: "Nội dung tin nhắn không được để trống",
    tooManyRecipients: "Số lượng người nhận vượt quá giới hạn",
    providerError: "Lỗi từ nhà cung cấp SMS",
    networkError: "Lỗi kết nối mạng",
    rateLimitExceeded: "Vượt quá giới hạn gửi tin nhắn",
  },
};

export default smsConfig;
