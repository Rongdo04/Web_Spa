import express from "express";
import {
  getFeaturedServices,
  getPublicServices,
  getPublicServiceById,
} from "../../controllers/public/servicesController.js";

const router = express.Router();

// GET /api/public/services/featured - Lấy danh sách dịch vụ nổi bật
router.get("/featured", getFeaturedServices);

// GET /api/public/services - Lấy danh sách tất cả dịch vụ công khai
router.get("/", getPublicServices);

// GET /api/public/services/:id - Lấy chi tiết dịch vụ công khai
router.get("/:id", getPublicServiceById);

export default router;
