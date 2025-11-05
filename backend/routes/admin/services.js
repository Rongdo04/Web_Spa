import express from "express";
import {
  getServicesList,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
  reorderServices,
} from "../../controllers/admin/servicesController.js";

const router = express.Router();

// GET /api/admin/services - Lấy danh sách dịch vụ
router.get("/", getServicesList);

// GET /api/admin/services/:id - Lấy chi tiết dịch vụ
router.get("/:id", getServiceById);

// POST /api/admin/services - Tạo dịch vụ mới
router.post("/", createService);

// PUT /api/admin/services/:id - Cập nhật dịch vụ
router.put("/:id", updateService);

// DELETE /api/admin/services/:id - Xóa dịch vụ
router.delete("/:id", deleteService);

// PATCH /api/admin/services/:id/toggle - Bật/tắt dịch vụ
router.patch("/:id/toggle", toggleServiceStatus);

// PUT /api/admin/services/reorder - Sắp xếp thứ tự dịch vụ
router.put("/reorder", reorderServices);

export default router;
