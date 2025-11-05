// services/emailService.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Tạo transporter
const createTransporter = () => {
  // Sử dụng Gmail transporter cho cả development và production
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Template email chung
const createEmailTemplate = (title, content, buttonText, buttonUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #66c2ff 0%, #4a90e2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
            Hệ thống Quản lý
          </h1>
          <p style="color: #ffffff; margin: 10px 0 0; opacity: 0.9; font-size: 16px;">
            ${title}
          </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          ${content}
          
          ${
            buttonText && buttonUrl
              ? `
          <div style="text-align: center; margin: 40px 0;">
            <a href="${buttonUrl}" 
               style="display: inline-block; padding: 15px 30px; background-color: #66c2ff; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 194, 255, 0.3);">
              ${buttonText}
            </a>
          </div>
          `
              : ""
          }
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #6c757d; margin: 0; font-size: 14px;">
            Email này được gửi tự động, vui lòng không reply.
          </p>
          <p style="color: #6c757d; margin: 10px 0 0; font-size: 12px;">
            © 2025 Hệ thống Quản lý. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Gửi email khôi phục mật khẩu
export const sendPasswordResetEmail = async (to, resetToken) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    console.log("📧 Sending password reset email to:", to);
    console.log("🔗 Reset URL:", resetUrl);

    const content = `
      <h2 style="color: #333; margin-top: 0;">Khôi phục mật khẩu</h2>
      <p style="color: #666; line-height: 1.6; font-size: 16px;">
        Chúng tôi đã nhận được yêu cầu khôi phục mật khẩu cho tài khoản của bạn.
        Nếu bạn đã yêu cầu điều này, vui lòng click vào nút bên dưới để đặt lại mật khẩu.
      </p>
      <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #856404; font-size: 14px;">
          <strong>⚠️ Lưu ý:</strong> Link này chỉ có hiệu lực trong vòng 15 phút.
          Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.
        </p>
      </div>
    `;

    const mailOptions = {
      from: {
        name: "Hệ thống Quản lý",
        address: process.env.EMAIL_USER,
      },
      to,
      subject: "Khôi phục mật khẩu",
      html: createEmailTemplate(
        "Khôi phục mật khẩu",
        content,
        "Đặt lại mật khẩu",
        resetUrl
      ),
      text: `
        Khôi phục mật khẩu
        
        Chúng tôi đã nhận được yêu cầu khôi phục mật khẩu cho tài khoản của bạn.
        
        Vui lòng truy cập link sau để đặt lại mật khẩu:
        ${resetUrl}
        
        Link này chỉ có hiệu lực trong vòng 15 phút.
        
        Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
    throw new Error("Không thể gửi email khôi phục mật khẩu");
  }
};

// Gửi email chào mừng
export const sendWelcomeEmail = async (to, userName, userRole) => {
  try {
    if (process.env.NODE_ENV === "development" && !process.env.EMAIL_USER) {
      console.log("📧 Development: Welcome email would be sent to:", to);
      return { messageId: "dev-mode" };
    }

    const transporter = createTransporter();

    const content = `
      <h2 style="color: #333; margin-top: 0;">Chào mừng ${userName}!</h2>
      <p style="color: #666; line-height: 1.6; font-size: 16px;">
        Cảm ơn bạn đã đăng ký tài khoản tại hệ thống của chúng tôi.
        Tài khoản của bạn đã được tạo thành công với quyền <strong>${
          userRole === "admin" ? "Quản trị viên" : "Người dùng"
        }</strong>.
      </p>
      <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 6px; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #0c5460; font-size: 14px;">
          <strong>🎉 Tài khoản đã sẵn sàng!</strong> Bạn có thể đăng nhập và bắt đầu sử dụng các tính năng của hệ thống.
        </p>
      </div>
    `;

    const mailOptions = {
      from: {
        name: "Hệ thống Quản lý",
        address: process.env.EMAIL_USER,
      },
      to,
      subject: "Chào mừng bạn đến với Hệ thống Quản lý",
      html: createEmailTemplate(
        "Chào mừng bạn!",
        content,
        "Đăng nhập ngay",
        process.env.CLIENT_URL || "http://localhost:5173"
      ),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    // Không throw error cho welcome email để không ảnh hưởng đến đăng ký
  }
};

// Gửi email thông báo dịch vụ mới
export const sendNewServiceEmail = async (to, serviceData) => {
  try {
    if (process.env.NODE_ENV === "development" && !process.env.EMAIL_USER) {
      console.log("📧 Development: New service email would be sent to:", to);
      console.log("📧 Service:", serviceData.name);
      return { messageId: "dev-mode" };
    }

    const transporter = createTransporter();

    const content = `
      <h2 style="color: #333; margin-top: 0;">🎉 Dịch vụ mới đã được thêm!</h2>
      <p style="color: #666; line-height: 1.6; font-size: 16px;">
        Chúng tôi vui mừng thông báo rằng một dịch vụ mới đã được thêm vào danh sách dịch vụ của chúng tôi.
      </p>
      
      <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="color: #495057; margin-top: 0; font-size: 20px;">${
          serviceData.name
        }</h3>
        <p style="color: #6c757d; margin: 10px 0; font-size: 14px;">
          <strong>Danh mục:</strong> ${serviceData.category}
        </p>
        <p style="color: #6c757d; margin: 10px 0; font-size: 14px;">
          <strong>Thời gian:</strong> ${serviceData.duration} phút
        </p>
        <p style="color: #6c757d; margin: 10px 0; font-size: 14px;">
          <strong>Giá:</strong> ${serviceData.price.toLocaleString("vi-VN")} VNĐ
        </p>
        ${
          serviceData.description
            ? `
        <p style="color: #495057; margin: 15px 0 0; line-height: 1.5;">
          ${serviceData.description}
        </p>
        `
            : ""
        }
      </div>

      <div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #155724; font-size: 14px;">
          <strong>🌟 Ưu đãi đặc biệt!</strong> Đặt lịch ngay hôm nay để được trải nghiệm dịch vụ mới với giá ưu đãi.
        </p>
      </div>
    `;

    const mailOptions = {
      from: {
        name: "Hệ thống Quản lý Spa",
        address: process.env.EMAIL_USER,
      },
      to,
      subject: `🎉 Dịch vụ mới: ${serviceData.name}`,
      html: createEmailTemplate(
        "Dịch vụ mới",
        content,
        "Đặt lịch ngay",
        `${process.env.CLIENT_URL || "http://localhost:5173"}/services`
      ),
      text: `
        Dịch vụ mới: ${serviceData.name}
        
        Chúng tôi vui mừng thông báo rằng một dịch vụ mới đã được thêm vào danh sách dịch vụ của chúng tôi.
        
        Thông tin dịch vụ:
        - Tên: ${serviceData.name}
        - Danh mục: ${serviceData.category}
        - Thời gian: ${serviceData.duration} phút
        - Giá: ${serviceData.price.toLocaleString("vi-VN")} VNĐ
        ${serviceData.description ? `- Mô tả: ${serviceData.description}` : ""}
        
        Đặt lịch ngay hôm nay để được trải nghiệm dịch vụ mới!
        ${process.env.CLIENT_URL || "http://localhost:5173"}/services
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ New service email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Error sending new service email:", error);
    throw new Error("Không thể gửi email thông báo dịch vụ mới");
  }
};

// Gửi thông báo dựa trên template
export const sendNotificationEmail = async (to, template, variables = {}) => {
  try {
    if (process.env.NODE_ENV === "development" && !process.env.EMAIL_USER) {
      console.log("📧 Development: Notification email would be sent to:", to);
      console.log("📧 Template:", template.name);
      console.log("📧 Variables:", variables);
      return { messageId: "dev-mode" };
    }

    const transporter = createTransporter();

    // Xử lý nội dung template với variables
    let processedSubject = template.subject;
    let processedContent = template.content;

    // Thay thế variables trong subject và content
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      processedSubject = processedSubject.replace(regex, variables[key] || "");
      processedContent = processedContent.replace(regex, variables[key] || "");
    });

    // Chuyển đổi content từ text sang HTML
    const htmlContent = processedContent
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");

    const mailOptions = {
      from: {
        name: "Hệ thống Quản lý Spa",
        address: process.env.EMAIL_USER,
      },
      to,
      subject: processedSubject,
      html: createEmailTemplate(
        template.name,
        htmlContent,
        null, // Không có button
        null
      ),
      text: processedContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Notification email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Error sending notification email:", error);
    throw new Error("Không thể gửi email thông báo");
  }
};

export default {
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendNewServiceEmail,
  sendNotificationEmail,
};
