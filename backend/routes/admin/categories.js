// routes/admin/categories.js
import express from "express";
import {
  getCategories,
  getCategoryTree,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  reorderCategories,
  getCategoryStats,
} from "../../controllers/admin/categoriesController.js";
import { authenticate, requireAdmin } from "../../middleware/auth.js";
import { body } from "express-validator";

const router = express.Router();

// Validation rules
const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tên danh mục là bắt buộc")
    .isLength({ max: 100 })
    .withMessage("Tên danh mục không được vượt quá 100 ký tự"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Mô tả không được vượt quá 500 ký tự"),
  body("icon").optional().isURL().withMessage("Icon phải là URL hợp lệ"),
  body("color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Màu sắc phải là mã hex hợp lệ"),
  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Thứ tự hiển thị phải là số nguyên không âm"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("Trạng thái phải là boolean"),
  body("parentCategory")
    .optional()
    .isMongoId()
    .withMessage("ID danh mục cha không hợp lệ"),
  body("seoTitle")
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage("SEO title không được vượt quá 60 ký tự"),
  body("seoDescription")
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage("SEO description không được vượt quá 160 ký tự"),
];

// Apply authentication and admin role to all routes
router.use(authenticate, requireAdmin);

// GET /api/admin/categories - Get all categories with pagination
router.get("/", getCategories);

// GET /api/admin/categories/tree - Get category tree
router.get("/tree", getCategoryTree);

// GET /api/admin/categories/stats - Get category statistics
router.get("/stats", getCategoryStats);

// GET /api/admin/categories/:id - Get single category
router.get("/:id", getCategoryById);

// POST /api/admin/categories - Create new category
router.post("/", categoryValidation, createCategory);

// PUT /api/admin/categories/:id - Update category
router.put("/:id", categoryValidation, updateCategory);

// DELETE /api/admin/categories/:id - Delete category
router.delete("/:id", deleteCategory);

// PATCH /api/admin/categories/:id/toggle - Toggle category status
router.patch("/:id/toggle", toggleCategoryStatus);

// PATCH /api/admin/categories/reorder - Reorder categories
router.patch("/reorder", reorderCategories);

export default router;
