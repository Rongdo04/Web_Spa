import Service from "../../models/Service.js";
import Category from "../../models/Category.js";
import Staff from "../../models/Staff.js";

// GET /api/public/services/featured - Lấy danh sách dịch vụ nổi bật
export const getFeaturedServices = async (req, res) => {
  try {
    const { limit = 4 } = req.query;

    const services = await Service.find({
      isActive: true,
      isFeatured: true,
    })
      .populate("category", "name")
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(parseInt(limit));

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
      tags: service.tags || [],
      isFeatured: service.isFeatured,
      displayOrder: service.displayOrder || 0,
    }));

    res.json({
      success: true,
      data: transformedServices,
    });
  } catch (error) {
    console.error("Error getting featured services:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách dịch vụ nổi bật",
      error: error.message,
    });
  }
};

// GET /api/public/services - Lấy danh sách tất cả dịch vụ công khai
export const getPublicServices = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category = "",
      search = "",
      sort = "newest",
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    // Build sort object
    let sortObj = { displayOrder: 1, createdAt: -1 }; // Default sort
    switch (sort) {
      case "newest":
        sortObj = { createdAt: -1, displayOrder: 1 };
        break;
      case "price-asc":
        sortObj = { price: 1, displayOrder: 1 };
        break;
      case "price-desc":
        sortObj = { price: -1, displayOrder: 1 };
        break;
      case "popular":
        sortObj = { isFeatured: -1, displayOrder: 1, createdAt: -1 };
        break;
      default:
        sortObj = { displayOrder: 1, createdAt: -1 };
    }

    // Execute query with pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const services = await Service.find(filter)
      .populate("category", "name")
      .sort(sortObj)
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
      tags: service.tags || [],
      isFeatured: service.isFeatured,
      displayOrder: service.displayOrder || 0,
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
    console.error("Error getting public services:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách dịch vụ",
      error: error.message,
    });
  }
};

// GET /api/public/services/:id - Lấy chi tiết dịch vụ công khai
export const getPublicServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findOne({
      _id: id,
      isActive: true,
    }).populate("category", "name");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dịch vụ",
      });
    }

    // Get available staff for this service
    const staff = await Staff.find({
      isActive: true,
    }).select("name email phone image workSchedule revenueShare");

    const transformedService = {
      id: service._id,
      name: service.name,
      description: service.description || "",
      longDescription: service.description || "", // Use description as longDescription
      category: service.category?.name || "N/A",
      categoryId: service.category?._id,
      duration: service.duration,
      price: service.price,
      originalPrice: service.price, // Use price as originalPrice
      addOns: service.addOns || [],
      combo: service.combo || [],
      images: service.images || [],
      tags: service.tags || [],
      requirements: service.requirements || "",
      notes: service.notes || "",
      benefits: [], // Empty array for now
      faqs: [], // Empty array for now
      availability: {}, // Empty object for now
      staff: staff.map((s) => ({
        id: s._id,
        name: s.name,
        email: s.email,
        phone: s.phone,
        image: s.image,
        workSchedule: s.workSchedule,
        revenueShare: s.revenueShare,
      })),
      isFeatured: service.isFeatured,
      displayOrder: service.displayOrder || 0,
    };

    res.json({
      success: true,
      data: transformedService,
    });
  } catch (error) {
    console.error("Error getting public service:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết dịch vụ",
      error: error.message,
    });
  }
};
