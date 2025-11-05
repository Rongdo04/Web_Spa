import express from "express";
import {
  getPublicStaff,
  getPublicStaffById,
} from "../../controllers/public/staffController.js";

const router = express.Router();

// GET /api/public/staff - Lấy danh sách nhân viên công khai
router.get("/", getPublicStaff);

// GET /api/public/staff/:id - Lấy chi tiết nhân viên công khai
router.get("/:id", getPublicStaffById);

export default router;
