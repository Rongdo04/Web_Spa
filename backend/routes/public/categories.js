import express from "express";
import {
  getPublicCategories,
  getPublicCategoryById,
} from "../../controllers/public/categoriesController.js";

const router = express.Router();

// GET /api/public/categories - Lấy danh sách danh mục công khai
router.get("/", getPublicCategories);

// GET /api/public/categories/:id - Lấy chi tiết danh mục công khai
router.get("/:id", getPublicCategoryById);

export default router;
