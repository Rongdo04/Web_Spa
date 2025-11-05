import Contact from "../../models/Contact.js";
import { validationResult } from "express-validator";

// GET /api/admin/contact - Lấy thông tin liên hệ
export const getContactInfo = async (req, res) => {
  try {
    let contact = await Contact.getActiveContact();

    // Nếu chưa có thông tin liên hệ, tạo mặc định
    if (!contact) {
      contact = new Contact({
        businessName: "Spa & Beauty Center",
        businessDescription:
          "Chuyên cung cấp các dịch vụ làm đẹp và chăm sóc sức khỏe",
        phone: "0123456789",
        email: "info@spa.com",
        address: {
          street: "123 Đường ABC",
          city: "Hồ Chí Minh",
          state: "TP.HCM",
          zipCode: "70000",
          country: "Việt Nam",
        },
        socialMedia: {
          facebook: "",
          instagram: "",
          tiktok: "",
          youtube: "",
          zalo: "",
        },
        workingHours: {
          monday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          tuesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          wednesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          thursday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          friday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          saturday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          sunday: { isOpen: false, openTime: "08:00", closeTime: "20:00" },
        },
        seo: {
          title: "Spa & Beauty Center - Dịch vụ làm đẹp chuyên nghiệp",
          description:
            "Chuyên cung cấp các dịch vụ làm đẹp, massage, chăm sóc da và sức khỏe",
          keywords: ["spa", "beauty", "massage", "chăm sóc da", "làm đẹp"],
        },
      });
      await contact.save();
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error getting contact info:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin liên hệ",
      error: error.message,
    });
  }
};

// PUT /api/admin/contact - Cập nhật thông tin liên hệ
export const updateContactInfo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const updateData = req.body;

    // Tìm thông tin liên hệ hiện tại
    let contact = await Contact.getActiveContact();

    if (!contact) {
      // Nếu chưa có, tạo mới
      contact = new Contact(updateData);
    } else {
      // Cập nhật thông tin hiện tại
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== undefined) {
          contact[key] = updateData[key];
        }
      });
    }

    await contact.save();

    res.json({
      success: true,
      message: "Cập nhật thông tin liên hệ thành công",
      data: contact,
    });
  } catch (error) {
    console.error("Error updating contact info:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật thông tin liên hệ",
      error: error.message,
    });
  }
};

// GET /api/public/contact - Lấy thông tin liên hệ công khai
export const getPublicContactInfo = async (req, res) => {
  try {
    let contact = await Contact.getPublicContact();

    // Nếu chưa có thông tin liên hệ, trả về thông tin mặc định
    if (!contact) {
      contact = {
        businessName: "Spa & Beauty Center",
        businessDescription:
          "Chuyên cung cấp các dịch vụ làm đẹp và chăm sóc sức khỏe",
        phone: "0123456789",
        email: "info@spa.com",
        address: {
          street: "123 Đường ABC",
          city: "Hồ Chí Minh",
          state: "TP.HCM",
          zipCode: "70000",
          country: "Việt Nam",
        },
        socialMedia: {
          facebook: "",
          instagram: "",
          tiktok: "",
          youtube: "",
          zalo: "",
        },
        workingHours: {
          monday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          tuesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          wednesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          thursday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          friday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          saturday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
          sunday: { isOpen: false, openTime: "08:00", closeTime: "20:00" },
        },
        logo: "",
      };
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error getting public contact info:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin liên hệ",
      error: error.message,
    });
  }
};
