import express from "express";
import dashboardRoutes from "./dashboard.js";
import servicesRoutes from "./services.js";
import staffRoutes from "./staff.js";
import notificationsRoutes from "./notifications.js";
import appointmentsRoutes from "./appointments.js";
import categoriesRoutes from "./categories.js";
import userRoutes from "./user.js";
import contactRoutes from "./contact.js";
import reviewsRoutes from "./reviews.js";

const router = express.Router();

// Mount admin routes
router.use("/dashboard", dashboardRoutes);
router.use("/services", servicesRoutes);
router.use("/staff", staffRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/user", userRoutes);
router.use("/users", userRoutes);
router.use("/contact", contactRoutes);
router.use("/reviews", reviewsRoutes);

export default router;
