// controllers/admin/categoriesController.js
import Category from "../../models/Category.js";
import Service from "../../models/Service.js";
import { validationResult } from "express-validator";

// Get all categories with pagination and filtering
export const getCategories = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      isActive,
      parentCategory,
      level,
      sortBy = "displayOrder",
      sortOrder = "asc",
    } = req.query;

    // Build filter object
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }
    if (isActive !== undefined && isActive !== "all") {
      filter.isActive = isActive === "true" || isActive === "active";
    }
    if (parentCategory) {
      filter.parentCategory = parentCategory;
    }
    if (level !== undefined && level !== "all" && !isNaN(parseInt(level))) {
      filter.level = parseInt(level);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const categories = await Category.find(filter)
      .populate("parentCategory", "name slug")
      .populate("subcategories", "name slug isActive")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Category.countDocuments(filter);

    res.json({
      success: true,
      data: {
        categories,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách danh mục",
      error: error.message,
    });
  }
};

// Get category tree (hierarchical structure)
export const getCategoryTree = async (req, res) => {
  try {
    const { activeOnly = true } = req.query;
    const tree = await Category.getCategoryTree(activeOnly === "true");

    res.json({
      success: true,
      data: { tree },
    });
  } catch (error) {
    console.error("Error fetching category tree:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy cây danh mục",
      error: error.message,
    });
  }
};

// Get single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id)
      .populate("parentCategory", "name slug")
      .populate("subcategories", "name slug isActive")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin danh mục",
      error: error.message,
    });
  }
};

// Create new category
export const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const {
      name,
      description,
      icon,
      color,
      displayOrder,
      isActive = true,
      parentCategory,
      seoTitle,
      seoDescription,
    } = req.body;

    // Check if parent category exists
    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent) {
        return res.status(400).json({
          success: false,
          message: "Danh mục cha không tồn tại",
        });
      }
    }

    const categoryData = {
      name,
      description,
      icon,
      color,
      displayOrder: displayOrder || 0,
      isActive,
      parentCategory: parentCategory || null,
      seoTitle,
      seoDescription,
      createdBy: req.user.id,
    };

    const category = await Category.create(categoryData);

    // Populate the created category
    await category.populate([
      { path: "parentCategory", select: "name slug" },
      { path: "createdBy", select: "name email" },
    ]);

    res.status(201).json({
      success: true,
      message: "Tạo danh mục thành công",
      data: category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Slug đã tồn tại",
      });
    }
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo danh mục",
      error: error.message,
    });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const updateData = { ...req.body, updatedBy: req.user.id };

    // Check if parent category exists and prevent circular reference
    if (updateData.parentCategory) {
      if (updateData.parentCategory === id) {
        return res.status(400).json({
          success: false,
          message: "Không thể chọn chính danh mục này làm danh mục cha",
        });
      }

      const parent = await Category.findById(updateData.parentCategory);
      if (!parent) {
        return res.status(400).json({
          success: false,
          message: "Danh mục cha không tồn tại",
        });
      }

      // Check for circular reference
      const isCircular = await checkCircularReference(
        id,
        updateData.parentCategory
      );
      if (isCircular) {
        return res.status(400).json({
          success: false,
          message: "Không thể tạo tham chiếu vòng tròn",
        });
      }
    }

    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("parentCategory", "name slug")
      .populate("subcategories", "name slug isActive")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật danh mục thành công",
      data: category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Slug đã tồn tại",
      });
    }
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật danh mục",
      error: error.message,
    });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục",
      });
    }

    // Check if category can be deleted
    const canDelete = await category.canBeDeleted();
    if (!canDelete) {
      return res.status(400).json({
        success: false,
        message: "Không thể xóa danh mục có dịch vụ hoặc danh mục con",
      });
    }

    await Category.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Xóa danh mục thành công",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa danh mục",
      error: error.message,
    });
  }
};

// Toggle category status
export const toggleCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục",
      });
    }

    category.isActive = !category.isActive;
    category.updatedBy = req.user.id;
    await category.save();

    res.json({
      success: true,
      message: `Danh mục đã được ${
        category.isActive ? "kích hoạt" : "vô hiệu hóa"
      }`,
      data: category,
    });
  } catch (error) {
    console.error("Error toggling category status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi thay đổi trạng thái danh mục",
      error: error.message,
    });
  }
};

// Reorder categories
export const reorderCategories = async (req, res) => {
  try {
    const { categoryIds } = req.body;

    if (!Array.isArray(categoryIds)) {
      return res.status(400).json({
        success: false,
        message: "Danh sách ID danh mục không hợp lệ",
      });
    }

    const updatePromises = categoryIds.map((categoryId, index) =>
      Category.findByIdAndUpdate(categoryId, { displayOrder: index + 1 })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: "Sắp xếp danh mục thành công",
    });
  } catch (error) {
    console.error("Error reordering categories:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi sắp xếp danh mục",
      error: error.message,
    });
  }
};

// Get category statistics
export const getCategoryStats = async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    const activeCategories = await Category.countDocuments({ isActive: true });
    const inactiveCategories = totalCategories - activeCategories;

    // Get categories with most services
    const topCategories = await Category.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "category",
          as: "services",
        },
      },
      {
        $addFields: {
          serviceCount: { $size: "$services" },
        },
      },
      { $sort: { serviceCount: -1 } },
      { $limit: 5 },
      {
        $project: {
          name: 1,
          serviceCount: 1,
          color: 1,
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalCategories,
        activeCategories,
        inactiveCategories,
        topCategories,
      },
    });
  } catch (error) {
    console.error("Error fetching category stats:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thống kê danh mục",
      error: error.message,
    });
  }
};

// Helper function to check circular reference
async function checkCircularReference(categoryId, parentId) {
  let currentParent = parentId;
  while (currentParent) {
    if (currentParent.toString() === categoryId.toString()) {
      return true;
    }
    const parent = await Category.findById(currentParent);
    currentParent = parent?.parentCategory;
  }
  return false;
}
