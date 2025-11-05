import express from "express";
import { body } from "express-validator";
import {
  getContactInfo,
  updateContactInfo,
} from "../../controllers/admin/contactController.js";
import { authenticate, requireAdmin } from "../../middleware/auth.js";

const router = express.Router();

// Validation rules
const contactValidation = [
  body("businessName")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Tên doanh nghiệp phải từ 1-100 ký tự"),

  body("businessDescription")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Mô tả doanh nghiệp không được vượt quá 500 ký tự"),

  body("phone")
    .optional()
    .matches(/^[0-9]{9,11}$/)
    .withMessage("Số điện thoại phải có 9-11 chữ số"),

  body("email").optional().isEmail().withMessage("Email không hợp lệ"),

  body("address.street")
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Địa chỉ phải từ 1-200 ký tự"),

  body("address.city")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Thành phố phải từ 1-50 ký tự"),

  body("address.state")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Tỉnh/thành không được vượt quá 50 ký tự"),

  body("address.zipCode")
    .optional()
    .trim()
    .isLength({ max: 10 })
    .withMessage("Mã bưu điện không được vượt quá 10 ký tự"),

  body("address.country")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Quốc gia không được vượt quá 50 ký tự"),

  body("socialMedia.facebook").optional().trim(),

  body("socialMedia.instagram").optional().trim(),

  body("socialMedia.tiktok").optional().trim(),

  body("socialMedia.youtube").optional().trim(),

  body("logo").optional().isURL().withMessage("Logo URL không hợp lệ"),

  body("favicon").optional().isURL().withMessage("Favicon URL không hợp lệ"),

  body("seo.title")
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage("SEO title không được vượt quá 60 ký tự"),

  body("seo.description")
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage("SEO description không được vượt quá 160 ký tự"),
];

// Routes
router.get("/", authenticate, requireAdmin, getContactInfo);
router.put(
  "/",
  authenticate,
  requireAdmin,
  contactValidation,
  updateContactInfo
);

export default router;
