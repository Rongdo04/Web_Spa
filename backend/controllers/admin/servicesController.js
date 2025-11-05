import Service from "../../models/Service.js";
import Category from "../../models/Category.js";
import User from "../../models/User.js";
import { validationResult } from "express-validator";
import { sendNewServiceEmail } from "../../services/emailService.js";

// GET /api/admin/services - Lấy danh sách dịch vụ
export const getServicesList = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      currentPage = 1,
      itemsPerPage = 10,
      search = "",
      category = "",
      status = "",
      isActive,
    } = req.query;

    // Use currentPage and itemsPerPage if provided, otherwise fallback to page and limit
    const pageNum = parseInt(currentPage) || parseInt(page);
    const limitNum = parseInt(itemsPerPage) || parseInt(limit);

    // Build filter object
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.isActive = status === "active";
    }

    // Handle isActive filter (for direct boolean values)
    if (isActive !== undefined && !status) {
      filter.isActive = isActive === "true" || isActive === true;
    }

    // Execute query with pagination
    const skip = (pageNum - 1) * limitNum;
    const services = await Service.find(filter)
      .populate("category", "name")
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const totalItems = await Service.countDocuments(filter);

    // Transform data to match frontend expectations
    const transformedServices = services.map((service) => ({
      id: service._id,
      name: service.name,
      description: service.description || "",
      category: service.category?.name || "N/A",
      categoryId: service.category?._id,
      duration: service.duration,
      price: service.price,
      images: service.images || [],
      addOns: service.addOns || [],
      combo: service.combo || [],
      displayOrder: service.displayOrder || 0,
      isActive: service.isActive,
      isFeatured: service.isFeatured || false,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }));

    res.json({
      success: true,
      data: {
        services: transformedServices,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalItems / limitNum),
          totalItems,
          itemsPerPage: limitNum,
        },
      },
    });
  } catch (error) {
    console.error("Error getting services:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách dịch vụ",
      error: error.message,
    });
  }
};

// GET /api/admin/services/:id - Lấy chi tiết dịch vụ
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id).populate("category", "name");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dịch vụ",
      });
    }

    const transformedService = {
      id: service._id,
      name: service.name,
      description: service.description || "",
      category: service.category?.name || "N/A",
      categoryId: service.category?._id,
      duration: service.duration,
      price: service.price,
      images: service.images || [],
      addOns: service.addOns || [],
      combo: service.combo || [],
      displayOrder: service.displayOrder || 0,
      isActive: service.isActive,
      isFeatured: service.isFeatured || false,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };

    res.json({
      success: true,
      data: transformedService,
    });
  } catch (error) {
    console.error("Error getting service:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết dịch vụ",
      error: error.message,
    });
  }
};

// POST /api/admin/services - Tạo dịch vụ mới
export const createService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const serviceData = req.body;
    const service = new Service(serviceData);
    await service.save();

    const populatedService = await Service.findById(service._id).populate(
      "category",
      "name"
    );

    const transformedService = {
      id: populatedService._id,
      name: populatedService.name,
      description: populatedService.description || "",
      category: populatedService.category?.name || "N/A",
      categoryId: populatedService.category?._id,
      duration: populatedService.duration,
      price: populatedService.price,
      images: populatedService.images || [],
      addOns: populatedService.addOns || [],
      combo: populatedService.combo || [],
      displayOrder: populatedService.displayOrder || 0,
      isActive: populatedService.isActive,
      createdAt: populatedService.createdAt,
      updatedAt: populatedService.updatedAt,
    };

    // Gửi email thông báo dịch vụ mới cho tất cả khách hàng (chỉ khi dịch vụ active)
    if (populatedService.isActive) {
      try {
        console.log("📧 Sending new service notification emails...");

        // Lấy danh sách tất cả khách hàng có email và cho phép nhận email
        const customers = await User.find({
          email: { $exists: true, $ne: null, $ne: "" },
          "preferences.communication.email": true,
          isActive: true,
        }).populate("userId", "email");

        console.log(`📧 Found ${customers.length} customers to notify`);

        // Chuẩn bị dữ liệu dịch vụ cho email
        const serviceEmailData = {
          name: populatedService.name,
          description: populatedService.description || "",
          category: populatedService.category?.name || "N/A",
          duration: populatedService.duration,
          price: populatedService.price,
        };

        // Gửi email cho từng khách hàng (bất đồng bộ, không chờ)
        const emailPromises = customers.map(async (customer) => {
          try {
            const email = customer.email || customer.userId?.email;
            if (email) {
              await sendNewServiceEmail(email, serviceEmailData);
              console.log(`✅ Email sent to: ${email}`);
            }
          } catch (emailError) {
            console.error(
              `❌ Failed to send email to ${customer.email}:`,
              emailError.message
            );
            // Không throw error để không ảnh hưởng đến việc tạo dịch vụ
          }
        });

        // Chạy tất cả email promises song song
        Promise.allSettled(emailPromises).then((results) => {
          const successful = results.filter(
            (r) => r.status === "fulfilled"
          ).length;
          const failed = results.filter((r) => r.status === "rejected").length;
          console.log(
            `📧 Email notification completed: ${successful} successful, ${failed} failed`
          );
        });
      } catch (emailError) {
        console.error("❌ Error sending new service emails:", emailError);
        // Không throw error để không ảnh hưởng đến việc tạo dịch vụ
      }
    }

    res.status(201).json({
      success: true,
      message: "Tạo dịch vụ thành công",
      data: transformedService,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo dịch vụ",
      error: error.message,
    });
  }
};

// PUT /api/admin/services/:id - Cập nhật dịch vụ
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const service = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("category", "name");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dịch vụ",
      });
    }

    const transformedService = {
      id: service._id,
      name: service.name,
      description: service.description || "",
      category: service.category?.name || "N/A",
      categoryId: service.category?._id,
      duration: service.duration,
      price: service.price,
      images: service.images || [],
      addOns: service.addOns || [],
      combo: service.combo || [],
      displayOrder: service.displayOrder || 0,
      isActive: service.isActive,
      isFeatured: service.isFeatured || false,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };

    res.json({
      success: true,
      message: "Cập nhật dịch vụ thành công",
      data: transformedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật dịch vụ",
      error: error.message,
    });
  }
};

// DELETE /api/admin/services/:id - Xóa dịch vụ
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dịch vụ",
      });
    }

    res.json({
      success: true,
      message: "Xóa dịch vụ thành công",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa dịch vụ",
      error: error.message,
    });
  }
};

// PATCH /api/admin/services/:id/toggle - Bật/tắt dịch vụ
export const toggleServiceStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // First get the current service to toggle its status
    const currentService = await Service.findById(id);
    if (!currentService) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dịch vụ",
      });
    }

    // Toggle the isActive status
    const newStatus = !currentService.isActive;

    const service = await Service.findByIdAndUpdate(
      id,
      { isActive: newStatus },
      { new: true, runValidators: true }
    ).populate("category", "name");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dịch vụ",
      });
    }

    const transformedService = {
      id: service._id,
      name: service.name,
      description: service.description || "",
      category: service.category?.name || "N/A",
      categoryId: service.category?._id,
      duration: service.duration,
      price: service.price,
      images: service.images || [],
      addOns: service.addOns || [],
      combo: service.combo || [],
      displayOrder: service.displayOrder || 0,
      isActive: service.isActive,
      isFeatured: service.isFeatured || false,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };

    // Gửi email thông báo khi kích hoạt dịch vụ (từ inactive sang active)
    if (newStatus && !currentService.isActive) {
      try {
        console.log("📧 Sending service activation notification emails...");

        // Lấy danh sách tất cả khách hàng có email và cho phép nhận email
        const customers = await User.find({
          email: { $exists: true, $ne: null, $ne: "" },
          "preferences.communication.email": true,
          isActive: true,
        }).populate("userId", "email");

        console.log(
          `📧 Found ${customers.length} customers to notify about service activation`
        );

        // Chuẩn bị dữ liệu dịch vụ cho email
        const serviceEmailData = {
          name: service.name,
          description: service.description || "",
          category: service.category?.name || "N/A",
          duration: service.duration,
          price: service.price,
        };

        // Gửi email cho từng khách hàng (bất đồng bộ, không chờ)
        const emailPromises = customers.map(async (customer) => {
          try {
            const email = customer.email || customer.userId?.email;
            if (email) {
              await sendNewServiceEmail(email, serviceEmailData);
              console.log(`✅ Activation email sent to: ${email}`);
            }
          } catch (emailError) {
            console.error(
              `❌ Failed to send activation email to ${customer.email}:`,
              emailError.message
            );
            // Không throw error để không ảnh hưởng đến việc kích hoạt dịch vụ
          }
        });

        // Chạy tất cả email promises song song
        Promise.allSettled(emailPromises).then((results) => {
          const successful = results.filter(
            (r) => r.status === "fulfilled"
          ).length;
          const failed = results.filter((r) => r.status === "rejected").length;
          console.log(
            `📧 Service activation email notification completed: ${successful} successful, ${failed} failed`
          );
        });
      } catch (emailError) {
        console.error(
          "❌ Error sending service activation emails:",
          emailError
        );
        // Không throw error để không ảnh hưởng đến việc kích hoạt dịch vụ
      }
    }

    res.json({
      success: true,
      message: `${newStatus ? "Kích hoạt" : "Vô hiệu hóa"} dịch vụ thành công`,
      data: transformedService,
    });
  } catch (error) {
    console.error("Error toggling service status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật trạng thái dịch vụ",
      error: error.message,
    });
  }
};

// PATCH /api/admin/services/reorder - Sắp xếp lại thứ tự dịch vụ
export const reorderServices = async (req, res) => {
  try {
    const { services } = req.body; // Array of { id, displayOrder }

    const updatePromises = services.map(({ id, displayOrder }) =>
      Service.findByIdAndUpdate(id, { displayOrder }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: "Sắp xếp lại thứ tự dịch vụ thành công",
    });
  } catch (error) {
    console.error("Error reordering services:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi sắp xếp lại thứ tự dịch vụ",
      error: error.message,
    });
  }
};
