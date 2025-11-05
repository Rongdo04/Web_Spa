import Category from "../../models/Category.js";

// GET /api/public/categories - Lấy danh sách danh mục công khai
export const getPublicCategories = async (req, res) => {
  try {
    const { level, limit = 1000 } = req.query;

    // Build filter object
    const filter = { isActive: true };

    // Filter by level if specified
    if (level !== undefined) {
      filter.level = parseInt(level);
    }

    // Debug logging
    console.log("🔍 Categories Query - Filter:", JSON.stringify(filter));
    console.log("🔍 Categories Query - Limit:", limit);

    // Execute query
    const limitNum = parseInt(limit);
    const categories = await Category.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limitNum);

    console.log(`✅ Categories Query Result: ${categories.length} categories found`);

    // Transform data to match frontend expectations
    const transformedCategories = categories.map((category) => ({
      id: category._id,
      name: category.name,
      description: category.description || "",
      level: category.level,
      parentCategory: category.parentCategory,
      displayOrder: category.displayOrder || 0,
      isActive: category.isActive,
      subcategories: category.subcategories || [],
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));

    res.json({
      success: true,
      data: {
        categories: transformedCategories,
        total: transformedCategories.length,
      },
    });
  } catch (error) {
    console.error("Error getting public categories:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách danh mục",
      error: error.message,
    });
  }
};

// GET /api/public/categories/:id - Lấy chi tiết danh mục công khai
export const getPublicCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id, isActive: true });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục",
      });
    }

    const transformedCategory = {
      id: category._id,
      name: category.name,
      description: category.description || "",
      level: category.level,
      parentCategory: category.parentCategory,
      displayOrder: category.displayOrder || 0,
      isActive: category.isActive,
      subcategories: category.subcategories || [],
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };

    res.json({
      success: true,
      data: transformedCategory,
    });
  } catch (error) {
    console.error("Error getting public category:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết danh mục",
      error: error.message,
    });
  }
};
