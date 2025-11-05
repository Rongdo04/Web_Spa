import express from "express";
import { getDashboard } from "../../controllers/admin/dashboardController.js";

const router = express.Router();

// GET /api/admin/dashboard
router.get("/", getDashboard);

export default router;
