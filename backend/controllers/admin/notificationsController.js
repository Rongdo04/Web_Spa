import NotificationTemplate from "../../models/NotificationTemplate.js";
import NotificationLog from "../../models/NotificationLog.js";
import { validationResult } from "express-validator";
import {
  sendTestNotification,
  sendBulkSMS,
  getSMSStatus,
  getSMSHistory,
} from "../../services/notificationService.js";

// GET /api/admin/notifications/templates - Lấy danh sách mẫu thông báo
export const getTemplatesList = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      type = "",
      status = "",
    } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (type) {
      filter.type = type;
    }

    if (status) {
      filter.isActive = status === "active";
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const templates = await NotificationTemplate.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalItems = await NotificationTemplate.countDocuments(filter);

    // Calculate statistics
    const totalTemplates = await NotificationTemplate.countDocuments({});
    const activeTemplates = await NotificationTemplate.countDocuments({
      isActive: true,
    });
    const inactiveTemplates = await NotificationTemplate.countDocuments({
      isActive: false,
    });

    // Transform data to match frontend expectations
    const transformedTemplates = templates.map((template) => ({
      id: template._id,
      name: template.name,
      type: template.type,
      trigger: template.trigger,
      subject: template.subject,
      content: template.content,
      channels: template.channels || [],
      isActive: template.isActive,
      priority: template.priority || 1,
      language: template.language || "vi",
      createdBy: template.createdBy?.name || "N/A",
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    }));

    res.json({
      success: true,
      data: {
        templates: transformedTemplates,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: parseInt(limit),
        },
        stats: {
          totalTemplates,
          activeTemplates,
          inactiveTemplates,
        },
      },
    });
  } catch (error) {
    console.error("Error getting templates:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách mẫu thông báo",
      error: error.message,
    });
  }
};

// GET /api/admin/notifications/logs - Lấy danh sách log thông báo
export const getNotificationLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      channel = "",
      status = "",
      startDate = "",
      endDate = "",
    } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$or = [
        { "recipient.name": { $regex: search, $options: "i" } },
        { "recipient.phone": { $regex: search, $options: "i" } },
        { "recipient.email": { $regex: search, $options: "i" } },
        { "content.subject": { $regex: search, $options: "i" } },
      ];
    }

    if (channel) {
      filter.channel = channel;
    }

    if (status) {
      filter.status = status;
    }

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const logs = await NotificationLog.find(filter)
      .populate("templateId", "name type")
      .populate("userId", "name phone email")
      .populate("appointmentId", "appointmentNumber")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalItems = await NotificationLog.countDocuments(filter);

    // Calculate statistics
    const sentCount = await NotificationLog.countDocuments({ status: "sent" });
    const failedCount = await NotificationLog.countDocuments({
      status: "failed",
    });
    const smsCount = await NotificationLog.countDocuments({ channel: "sms" });
    const emailCount = await NotificationLog.countDocuments({
      channel: "email",
    });

    // Transform data to match frontend expectations
    const transformedLogs = logs.map((log) => ({
      id: log._id,
      templateName: log.templateId?.name || "N/A",
      templateType: log.templateId?.type || "N/A",
      customerName: log.userId?.name || log.recipient?.name || "N/A",
      customerPhone: log.userId?.phone || log.recipient?.phone || "N/A",
      customerEmail: log.userId?.email || log.recipient?.email || "N/A",
      appointmentNumber: log.appointmentId?.appointmentNumber || "N/A",
      channel: log.channel,
      subject: log.content?.subject || "N/A",
      content: log.content?.body || "N/A",
      status: log.status,
      sentAt: log.sentAt,
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    }));

    res.json({
      success: true,
      data: {
        logs: transformedLogs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: parseInt(limit),
        },
        stats: {
          sentCount,
          failedCount,
          smsCount,
          emailCount,
        },
      },
    });
  } catch (error) {
    console.error("Error getting notification logs:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách log thông báo",
      error: error.message,
    });
  }
};

// POST /api/admin/notifications/templates - Tạo mẫu thông báo mới
export const createTemplate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const templateData = req.body;
    const template = new NotificationTemplate(templateData);
    await template.save();

    const populatedTemplate = await NotificationTemplate.findById(
      template._id
    ).populate("createdBy", "name email");

    const transformedTemplate = {
      id: populatedTemplate._id,
      name: populatedTemplate.name,
      type: populatedTemplate.type,
      trigger: populatedTemplate.trigger,
      subject: populatedTemplate.subject,
      content: populatedTemplate.content,
      channels: populatedTemplate.channels || [],
      isActive: populatedTemplate.isActive,
      priority: populatedTemplate.priority || 1,
      language: populatedTemplate.language || "vi",
      createdBy: populatedTemplate.createdBy?.name || "N/A",
      createdAt: populatedTemplate.createdAt,
      updatedAt: populatedTemplate.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: "Tạo mẫu thông báo thành công",
      data: transformedTemplate,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo mẫu thông báo",
      error: error.message,
    });
  }
};

// PUT /api/admin/notifications/templates/:id - Cập nhật mẫu thông báo
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const template = await NotificationTemplate.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("createdBy", "name email");

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy mẫu thông báo",
      });
    }

    const transformedTemplate = {
      id: template._id,
      name: template.name,
      type: template.type,
      trigger: template.trigger,
      subject: template.subject,
      content: template.content,
      channels: template.channels || [],
      isActive: template.isActive,
      priority: template.priority || 1,
      language: template.language || "vi",
      createdBy: template.createdBy?.name || "N/A",
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };

    res.json({
      success: true,
      message: "Cập nhật mẫu thông báo thành công",
      data: transformedTemplate,
    });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật mẫu thông báo",
      error: error.message,
    });
  }
};

// DELETE /api/admin/notifications/templates/:id - Xóa mẫu thông báo
export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await NotificationTemplate.findByIdAndDelete(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy mẫu thông báo",
      });
    }

    res.json({
      success: true,
      message: "Xóa mẫu thông báo thành công",
    });
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa mẫu thông báo",
      error: error.message,
    });
  }
};

// PATCH /api/admin/notifications/templates/:id/toggle - Bật/tắt mẫu thông báo
export const toggleTemplateStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // First get the current template to toggle its status
    const currentTemplate = await NotificationTemplate.findById(id);

    if (!currentTemplate) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy mẫu thông báo",
      });
    }

    // Toggle the isActive status
    const newStatus = !currentTemplate.isActive;

    const template = await NotificationTemplate.findByIdAndUpdate(
      id,
      { isActive: newStatus },
      { new: true, runValidators: true }
    ).populate("createdBy", "name email");

    const transformedTemplate = {
      id: template._id,
      name: template.name,
      type: template.type,
      trigger: template.trigger,
      subject: template.subject,
      content: template.content,
      channels: template.channels || [],
      isActive: template.isActive,
      priority: template.priority || 1,
      language: template.language || "vi",
      createdBy: template.createdBy?.name || "N/A",
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };

    res.json({
      success: true,
      message: `${
        newStatus ? "Kích hoạt" : "Vô hiệu hóa"
      } mẫu thông báo thành công`,
      data: transformedTemplate,
    });
  } catch (error) {
    console.error("Error toggling template status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật trạng thái mẫu thông báo",
      error: error.message,
    });
  }
};

// POST /api/admin/notifications/send - Gửi thông báo test
export const sendTestNotificationController = async (req, res) => {
  try {
    const { templateId, email } = req.body;

    if (!templateId || !email) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp templateId và email",
      });
    }

    const result = await sendTestNotification(templateId, email);

    res.json(result);
  } catch (error) {
    console.error("Error sending test notification:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi gửi thông báo test",
      error: error.message,
    });
  }
};

// POST /api/admin/notifications/sms/bulk - Gửi SMS hàng loạt
export const sendBulkSMSNotification = async (req, res) => {
  try {
    const { recipients, message, templateId, appointmentId } = req.body;

    // Validation
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Danh sách người nhận không hợp lệ",
      });
    }

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Nội dung tin nhắn không được để trống",
      });
    }

    // Validate recipients format
    for (const recipient of recipients) {
      if (!recipient.phone || !recipient.name) {
        return res.status(400).json({
          success: false,
          message: "Mỗi người nhận phải có số điện thoại và tên",
        });
      }
    }

    const result = await sendBulkSMS(recipients, message, {
      templateId,
      appointmentId,
    });

    res.json({
      success: result.success,
      message: result.message,
      data: {
        totalSent: result.totalSent,
        totalErrors: result.totalErrors,
        results: result.results,
        errors: result.errors,
      },
    });
  } catch (error) {
    console.error("Error sending bulk SMS:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi gửi SMS hàng loạt",
      error: error.message,
    });
  }
};

// GET /api/admin/notifications/sms/status/:messageId - Kiểm tra trạng thái SMS
export const getSMSNotificationStatus = async (req, res) => {
  try {
    const { messageId } = req.params;

    if (!messageId) {
      return res.status(400).json({
        success: false,
        message: "Message ID không được để trống",
      });
    }

    const result = await getSMSStatus(messageId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error getting SMS status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi kiểm tra trạng thái SMS",
      error: error.message,
    });
  }
};

// GET /api/admin/notifications/sms/history - Lấy lịch sử SMS
export const getSMSNotificationHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20, dateFrom = "", dateTo = "" } = req.query;

    const options = {
      limit: parseInt(limit),
    };

    if (dateFrom) {
      options.dateSentAfter = new Date(dateFrom);
    }

    if (dateTo) {
      options.dateSentBefore = new Date(dateTo);
    }

    const result = await getSMSHistory(options);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error getting SMS history:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy lịch sử SMS",
      error: error.message,
    });
  }
};

// GET /api/admin/notifications/sms/logs - Lấy logs SMS từ database
export const getSMSLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status = "",
      dateFrom = "",
      dateTo = "",
    } = req.query;

    // Build filter
    const filter = { channel: "sms" };

    if (status) {
      filter.status = status;
    }

    if (dateFrom || dateTo) {
      filter.sentAt = {};
      if (dateFrom) {
        filter.sentAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.sentAt.$lte = new Date(dateTo);
      }
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const logs = await NotificationLog.find(filter)
      .populate("templateId", "name")
      .populate("userId", "name phone")
      .populate("appointmentId", "appointmentNumber")
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalItems = await NotificationLog.countDocuments(filter);

    // Transform data
    const transformedLogs = logs.map((log) => ({
      id: log._id,
      templateName: log.templateId?.name || "Bulk SMS",
      customerName: log.recipient.name,
      customerPhone: log.recipient.phone,
      appointmentNumber: log.appointmentId?.appointmentNumber || "N/A",
      content: log.content.body,
      status: log.status,
      sentAt: log.sentAt,
      messageId: log.messageId,
      error: log.error,
    }));

    res.json({
      success: true,
      data: {
        logs: transformedLogs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Error getting SMS logs:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy logs SMS",
      error: error.message,
    });
  }
};
