import express from "express";
import { getPublicContactInfo } from "../../controllers/admin/contactController.js";

const router = express.Router();

// GET /api/public/contact - Lấy thông tin liên hệ công khai
router.get("/", getPublicContactInfo);

export default router;
