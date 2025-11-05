// services/smsService.js
import axios from "axios";

class SMSService {
  constructor() {
    // Cấu hình SMS provider (có thể thay đổi tùy theo nhà cung cấp)
    this.provider = process.env.SMS_PROVIDER || "mock"; // twilio, vonage, mock, etc.
    this.apiKey = process.env.SMS_API_KEY;
    this.apiSecret = process.env.SMS_API_SECRET;
    this.fromNumber = process.env.SMS_FROM_NUMBER;
    this.baseUrl = process.env.SMS_BASE_URL;
  }

  /**
   * Gửi SMS đơn lẻ
   * @param {string} to - Số điện thoại nhận
   * @param {string} message - Nội dung tin nhắn
   * @param {object} options - Tùy chọn bổ sung
   */
  async sendSMS(to, message, options = {}) {
    try {
      // Validate phone number
      if (!this.isValidPhoneNumber(to)) {
        throw new Error("Số điện thoại không hợp lệ");
      }

      // Format phone number
      const formattedNumber = this.formatPhoneNumber(to);

      switch (this.provider) {
        case "twilio":
          return await this.sendViaTwilio(formattedNumber, message, options);
        case "vonage":
          return await this.sendViaVonage(formattedNumber, message, options);
        case "mock":
          return await this.sendViaMock(formattedNumber, message, options);
        default:
          throw new Error(`SMS provider không được hỗ trợ: ${this.provider}`);
      }
    } catch (error) {
      console.error("Lỗi gửi SMS:", error);
      throw error;
    }
  }

  /**
   * Gửi SMS hàng loạt
   * @param {Array} recipients - Danh sách người nhận
   * @param {string} message - Nội dung tin nhắn
   * @param {object} options - Tùy chọn bổ sung
   */
  async sendBulkSMS(recipients, message, options = {}) {
    try {
      const results = [];
      const errors = [];

      for (const recipient of recipients) {
        try {
          const result = await this.sendSMS(recipient.phone, message, {
            ...options,
            userId: recipient.userId,
            customerName: recipient.name,
          });
          results.push({
            phone: recipient.phone,
            userId: recipient.userId,
            status: "success",
            messageId: result.messageId,
          });
        } catch (error) {
          errors.push({
            phone: recipient.phone,
            userId: recipient.userId,
            status: "error",
            error: error.message,
          });
        }
      }

      return {
        success: true,
        totalSent: results.length,
        totalErrors: errors.length,
        results,
        errors,
      };
    } catch (error) {
      console.error("Lỗi gửi SMS hàng loạt:", error);
      throw error;
    }
  }

  /**
   * Gửi SMS qua Twilio
   */
  async sendViaTwilio(to, message, options = {}) {
    try {
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${this.apiKey}/Messages.json`,
        new URLSearchParams({
          To: to,
          From: this.fromNumber,
          Body: message,
        }),
        {
          auth: {
            username: this.apiKey,
            password: this.apiSecret,
          },
        }
      );

      return {
        success: true,
        messageId: response.data.sid,
        status: response.data.status,
        to,
        message,
      };
    } catch (error) {
      throw new Error(
        `Lỗi Twilio: ${error.response?.data?.message || error.message}`
      );
    }
  }

  /**
   * Gửi SMS qua Vonage (Nexmo)
   */
  async sendViaVonage(to, message, options = {}) {
    try {
      const response = await axios.post("https://rest.nexmo.com/sms/json", {
        api_key: this.apiKey,
        api_secret: this.apiSecret,
        to,
        from: this.fromNumber,
        text: message,
      });

      if (response.data.messages[0].status !== "0") {
        throw new Error(response.data.messages[0]["error-text"]);
      }

      return {
        success: true,
        messageId: response.data.messages[0]["message-id"],
        status: "sent",
        to,
        message,
      };
    } catch (error) {
      throw new Error(`Lỗi Vonage: ${error.message}`);
    }
  }

  /**
   * Mock SMS service for development/testing
   */
  async sendViaMock(to, message, options = {}) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("📱 MOCK SMS SENT:");
    console.log(`To: ${to}`);
    console.log(`Message: ${message}`);
    console.log(`Options:`, options);

    return {
      success: true,
      messageId: `mock_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      status: "sent",
      to,
      message,
    };
  }

  /**
   * Kiểm tra số điện thoại hợp lệ
   */
  isValidPhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");

    // Check if it's a valid Vietnamese phone number
    // Vietnamese mobile numbers: 09x, 08x, 07x, 03x (10-11 digits)
    const vietnameseMobileRegex = /^(03|05|07|08|09)[0-9]{8}$/;

    return vietnameseMobileRegex.test(cleaned);
  }

  /**
   * Format số điện thoại theo chuẩn quốc tế
   */
  formatPhoneNumber(phone) {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, "");

    // Add country code if not present
    if (cleaned.startsWith("0")) {
      cleaned = "84" + cleaned.substring(1);
    } else if (!cleaned.startsWith("84")) {
      cleaned = "84" + cleaned;
    }

    return "+" + cleaned;
  }

  /**
   * Kiểm tra trạng thái SMS
   */
  async getSMSStatus(messageId) {
    try {
      switch (this.provider) {
        case "twilio":
          return await this.getTwilioStatus(messageId);
        case "vonage":
          return await this.getVonageStatus(messageId);
        default:
          return { status: "unknown", messageId };
      }
    } catch (error) {
      console.error("Lỗi kiểm tra trạng thái SMS:", error);
      throw error;
    }
  }

  async getTwilioStatus(messageId) {
    try {
      const response = await axios.get(
        `https://api.twilio.com/2010-04-01/Accounts/${this.apiKey}/Messages/${messageId}.json`,
        {
          auth: {
            username: this.apiKey,
            password: this.apiSecret,
          },
        }
      );

      return {
        messageId,
        status: response.data.status,
        direction: response.data.direction,
        dateCreated: response.data.date_created,
        dateUpdated: response.data.date_updated,
        price: response.data.price,
        priceUnit: response.data.price_unit,
      };
    } catch (error) {
      throw new Error(`Lỗi kiểm tra trạng thái Twilio: ${error.message}`);
    }
  }

  async getVonageStatus(messageId) {
    // Vonage doesn't provide status checking in the same way
    // This would need to be implemented based on webhooks
    return {
      messageId,
      status: "delivered", // Assume delivered for simplicity
      note: "Vonage status checking requires webhook implementation",
    };
  }

  /**
   * Lấy lịch sử SMS đã gửi
   */
  async getSMSHistory(options = {}) {
    try {
      switch (this.provider) {
        case "twilio":
          return await this.getTwilioHistory(options);
        case "vonage":
          return await this.getVonageHistory(options);
        default:
          return { messages: [], total: 0 };
      }
    } catch (error) {
      console.error("Lỗi lấy lịch sử SMS:", error);
      throw error;
    }
  }

  async getTwilioHistory(options = {}) {
    try {
      const params = new URLSearchParams();
      if (options.dateSentAfter)
        params.append("DateSent>=", options.dateSentAfter);
      if (options.dateSentBefore)
        params.append("DateSent<=", options.dateSentBefore);
      if (options.limit) params.append("PageSize", options.limit);

      const response = await axios.get(
        `https://api.twilio.com/2010-04-01/Accounts/${this.apiKey}/Messages.json?${params}`,
        {
          auth: {
            username: this.apiKey,
            password: this.apiSecret,
          },
        }
      );

      return {
        messages: response.data.messages,
        total: response.data.messages.length,
      };
    } catch (error) {
      throw new Error(`Lỗi lấy lịch sử Twilio: ${error.message}`);
    }
  }

  async getVonageHistory(options = {}) {
    // Vonage history implementation would go here
    return { messages: [], total: 0 };
  }
}

// Export singleton instance
export default new SMSService();
