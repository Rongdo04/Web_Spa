import express from "express";
import {
  getTemplatesList,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  toggleTemplateStatus,
  getNotificationLogs,
  sendTestNotificationController,
  sendBulkSMSNotification,
  getSMSNotificationStatus,
  getSMSNotificationHistory,
  getSMSLogs,
} from "../../controllers/admin/notificationsController.js";

const router = express.Router();

// GET /api/admin/notifications/templates - Lấy danh sách mẫu thông báo
router.get("/templates", getTemplatesList);

// POST /api/admin/notifications/templates - Tạo mẫu thông báo mới
router.post("/templates", createTemplate);

// PUT /api/admin/notifications/templates/:id - Cập nhật mẫu thông báo
router.put("/templates/:id", updateTemplate);

// DELETE /api/admin/notifications/templates/:id - Xóa mẫu thông báo
router.delete("/templates/:id", deleteTemplate);

// PATCH /api/admin/notifications/templates/:id/toggle - Bật/tắt mẫu thông báo
router.patch("/templates/:id/toggle", toggleTemplateStatus);

// GET /api/admin/notifications/logs - Lấy nhật ký gửi thông báo
router.get("/logs", getNotificationLogs);

// POST /api/admin/notifications/send - Gửi thông báo test
router.post("/send", sendTestNotificationController);

// SMS Routes
// POST /api/admin/notifications/sms/bulk - Gửi SMS hàng loạt
router.post("/sms/bulk", sendBulkSMSNotification);

// GET /api/admin/notifications/sms/status/:messageId - Kiểm tra trạng thái SMS
router.get("/sms/status/:messageId", getSMSNotificationStatus);

// GET /api/admin/notifications/sms/history - Lấy lịch sử SMS
router.get("/sms/history", getSMSNotificationHistory);

// GET /api/admin/notifications/sms/logs - Lấy logs SMS từ database
router.get("/sms/logs", getSMSLogs);

export default router;
