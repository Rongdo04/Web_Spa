// services/notificationService.js
import NotificationTemplate from "../models/NotificationTemplate.js";
import NotificationLog from "../models/NotificationLog.js";
import { sendNotificationEmail } from "./emailService.js";
import smsService from "./smsService.js";

// Gửi thông báo dựa trên trigger
export const sendNotification = async (
  trigger,
  customerData,
  appointmentData = null
) => {
  try {
    console.log(`🔔 Sending notification for trigger: ${trigger}`);

    // Tìm template phù hợp
    const templates = await NotificationTemplate.find({
      trigger,
      isActive: true,
    }).sort({ priority: -1 });

    if (templates.length === 0) {
      console.log(`⚠️ No active template found for trigger: ${trigger}`);
      return {
        success: false,
        message: "Không tìm thấy mẫu thông báo phù hợp",
      };
    }

    const template = templates[0]; // Sử dụng template có priority cao nhất
    console.log(`📧 Using template: ${template.name}`);

    // Chuẩn bị variables
    const variables = {
      customer_name: customerData.name || "Khách hàng",
      customer_phone: customerData.phone || "",
      customer_email: customerData.email || "",
      service_name: appointmentData?.serviceName || "Dịch vụ",
      appointment_date: appointmentData?.appointmentDate || "",
      start_time: appointmentData?.startTime || "",
      end_time: appointmentData?.endTime || "",
      staff_name: appointmentData?.staffName || "Nhân viên",
      branch_name: appointmentData?.branchName || "Chi nhánh",
      amount: appointmentData?.totalAmount || "0",
      appointment_number: appointmentData?.appointmentNumber || "",
    };

    const results = [];

    // Gửi qua các kênh được cấu hình
    for (const channel of template.channels) {
      try {
        if (channel === "email" && customerData.email) {
          console.log(`📧 Sending email to: ${customerData.email}`);
          const emailResult = await sendNotificationEmail(
            customerData.email,
            template,
            variables
          );

          // Ghi log
          await NotificationLog.create({
            templateId: template._id,
            userId: customerData.id,
            appointmentId: appointmentData?.id,
            channel: "email",
            recipient: {
              name: customerData.name,
              email: customerData.email,
              phone: customerData.phone,
            },
            content: {
              subject: template.subject,
              body: template.content,
            },
            status: "sent",
            sentAt: new Date(),
          });

          results.push({
            channel: "email",
            success: true,
            messageId: emailResult.messageId,
          });
        } else if (channel === "sms" && customerData.phone) {
          console.log(`📱 Sending SMS to: ${customerData.phone}`);

          try {
            // Process template content for SMS
            let smsContent = template.content;
            Object.keys(variables).forEach((key) => {
              const placeholder = `{{${key}}}`;
              smsContent = smsContent.replace(
                new RegExp(placeholder, "g"),
                variables[key]
              );
            });

            // Send SMS
            const smsResult = await smsService.sendSMS(
              customerData.phone,
              smsContent,
              {
                userId: customerData.id,
                customerName: customerData.name,
                templateId: template._id,
              }
            );

            // Ghi log thành công
            await NotificationLog.create({
              templateId: template._id,
              userId: customerData.id,
              appointmentId: appointmentData?.id,
              channel: "sms",
              recipient: {
                name: customerData.name,
                email: customerData.email,
                phone: customerData.phone,
              },
              content: {
                subject: template.subject,
                body: smsContent,
              },
              status: "sent",
              sentAt: new Date(),
              messageId: smsResult.messageId,
            });

            results.push({
              channel: "sms",
              success: true,
              messageId: smsResult.messageId,
            });
          } catch (smsError) {
            console.error(`❌ SMS Error:`, smsError);

            // Ghi log lỗi SMS
            await NotificationLog.create({
              templateId: template._id,
              userId: customerData.id,
              appointmentId: appointmentData?.id,
              channel: "sms",
              recipient: {
                name: customerData.name,
                email: customerData.email,
                phone: customerData.phone,
              },
              content: {
                subject: template.subject,
                body: template.content,
              },
              status: "failed",
              sentAt: null,
              error: smsError.message,
            });

            results.push({
              channel: "sms",
              success: false,
              error: smsError.message,
            });
          }
        }
      } catch (error) {
        console.error(`❌ Error sending ${channel}:`, error);

        // Ghi log lỗi
        await NotificationLog.create({
          templateId: template._id,
          userId: customerData.id,
          appointmentId: appointmentData?.id,
          channel,
          recipient: {
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
          },
          content: {
            subject: template.subject,
            body: template.content,
          },
          status: "failed",
          sentAt: null,
          error: error.message,
        });

        results.push({
          channel,
          success: false,
          error: error.message,
        });
      }
    }

    // Cập nhật usage count
    await template.incrementUsage();

    return {
      success: true,
      message: "Gửi thông báo thành công",
      results,
    };
  } catch (error) {
    console.error("❌ Error in sendNotification:", error);
    return {
      success: false,
      message: "Lỗi khi gửi thông báo",
      error: error.message,
    };
  }
};

// Gửi thông báo test
export const sendTestNotification = async (templateId, customerEmail) => {
  try {
    const template = await NotificationTemplate.findById(templateId);
    if (!template) {
      return { success: false, message: "Không tìm thấy mẫu thông báo" };
    }

    const testVariables = {
      customer_name: "Nguyễn Văn Test",
      customer_phone: "0123456789",
      customer_email: customerEmail,
      service_name: "Dịch vụ Test",
      appointment_date: "2024-01-20",
      start_time: "09:00",
      end_time: "10:00",
      staff_name: "Nhân viên Test",
      branch_name: "Chi nhánh Test",
      amount: "500000",
      appointment_number: "APT-001",
    };

    const result = await sendNotification(
      template.trigger,
      { name: "Nguyễn Văn Test", email: customerEmail, phone: "0123456789" },
      {
        serviceName: "Dịch vụ Test",
        appointmentDate: "2024-01-20",
        startTime: "09:00",
        endTime: "10:00",
        staffName: "Nhân viên Test",
        branchName: "Chi nhánh Test",
        totalAmount: "500000",
        appointmentNumber: "APT-001",
      }
    );

    return result;
  } catch (error) {
    console.error("❌ Error in sendTestNotification:", error);
    return {
      success: false,
      message: "Lỗi khi gửi thông báo test",
      error: error.message,
    };
  }
};

// Gửi SMS hàng loạt
export const sendBulkSMS = async (recipients, message, options = {}) => {
  try {
    console.log(`📱 Sending bulk SMS to ${recipients.length} recipients`);

    const result = await smsService.sendBulkSMS(recipients, message, options);

    // Ghi log cho từng SMS
    for (const smsResult of result.results) {
      await NotificationLog.create({
        templateId: options.templateId || null,
        userId: smsResult.userId,
        appointmentId: options.appointmentId || null,
        channel: "sms",
        recipient: {
          name: smsResult.customerName || "Bulk SMS",
          phone: smsResult.phone,
        },
        content: {
          subject: "Bulk SMS",
          body: message,
        },
        status: "sent",
        sentAt: new Date(),
        messageId: smsResult.messageId,
      });
    }

    // Ghi log lỗi
    for (const error of result.errors) {
      await NotificationLog.create({
        templateId: options.templateId || null,
        userId: error.userId,
        appointmentId: options.appointmentId || null,
        channel: "sms",
        recipient: {
          name: error.customerName || "Bulk SMS",
          phone: error.phone,
        },
        content: {
          subject: "Bulk SMS",
          body: message,
        },
        status: "failed",
        sentAt: null,
        error: error.error,
      });
    }

    return {
      success: true,
      message: `Gửi SMS hàng loạt thành công: ${result.totalSent} thành công, ${result.totalErrors} lỗi`,
      totalSent: result.totalSent,
      totalErrors: result.totalErrors,
      results: result.results,
      errors: result.errors,
    };
  } catch (error) {
    console.error("❌ Error in sendBulkSMS:", error);
    return {
      success: false,
      message: "Lỗi khi gửi SMS hàng loạt",
      error: error.message,
    };
  }
};

// Kiểm tra trạng thái SMS
export const getSMSStatus = async (messageId) => {
  try {
    return await smsService.getSMSStatus(messageId);
  } catch (error) {
    console.error("❌ Error getting SMS status:", error);
    return {
      success: false,
      message: "Lỗi khi kiểm tra trạng thái SMS",
      error: error.message,
    };
  }
};

// Lấy lịch sử SMS
export const getSMSHistory = async (options = {}) => {
  try {
    return await smsService.getSMSHistory(options);
  } catch (error) {
    console.error("❌ Error getting SMS history:", error);
    return {
      success: false,
      message: "Lỗi khi lấy lịch sử SMS",
      error: error.message,
    };
  }
};

export default {
  sendNotification,
  sendTestNotification,
  sendBulkSMS,
  getSMSStatus,
  getSMSHistory,
};
