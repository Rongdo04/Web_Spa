// controllers/admin/userController.js
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware

    const user = await User.findById(userId).select(
      "-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin người dùng",
      error: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    // Check if email already exists for another user
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email đã được sử dụng bởi tài khoản khác",
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select(
      "-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật thông tin thành công",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật thông tin",
      error: error.message,
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu hiện tại không đúng",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi đổi mật khẩu",
      error: error.message,
    });
  }
};

// Upload avatar
export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { avatarUrl } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true }
    ).select(
      "-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật ảnh đại diện thành công",
      data: user,
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật ảnh đại diện",
      error: error.message,
    });
  }
};

// Admin CRUD operations for users

// GET /api/admin/users - Lấy danh sách users
export const getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      role = "",
      level = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build filter - show all users (active + inactive)
    const filter = {};

    if (role) {
      filter.role = role;
    }

    if (level) {
      filter.level = level;
    }

    // Handle search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort
    const sortObj = {};
    sortObj[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Execute query
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(filter)
      .select(
        "-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires"
      )
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const totalItems = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / parseInt(limit));

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách người dùng",
      error: error.message,
    });
  }
};

// GET /api/admin/users/:id - Lấy chi tiết user
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(
      "-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error getting user by id:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông tin người dùng",
      error: error.message,
    });
  }
};

// POST /api/admin/users - Tạo user mới
export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const {
      name,
      email,
      phone,
      password,
      role = "user",
      level = "Thường",
      totalSpent = 0,
      totalAppointments = 0,
      points = 0,
      notes = "",
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email đã được sử dụng",
      });
    }

    // Create user
    const user = new User({
      name,
      email,
      phone,
      password,
      role,
      level,
      totalSpent,
      totalAppointments,
      points,
      notes,
      preferences: {
        communication: {
          email: true,
          sms: true,
          phone: false,
        },
      },
    });

    await user.save();

    // Return user without password
    const userResponse = user.toSafeObject();

    res.status(201).json({
      success: true,
      message: "Tạo người dùng thành công",
      data: userResponse,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo người dùng",
      error: error.message,
    });
  }
};

// PUT /api/admin/users/:id - Cập nhật user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove password from update data if present
    delete updateData.password;

    const user = await User.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select(
      "-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật người dùng thành công",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật người dùng",
      error: error.message,
    });
  }
};

// DELETE /api/admin/users/:id - Xóa user (hard delete)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Hard delete - xóa thật khỏi database
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      message: "Xóa người dùng thành công",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa người dùng",
      error: error.message,
    });
  }
};

// GET /api/admin/users/stats - Lấy thống kê users
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      isActive: true,
      role: "user",
    });
    const totalAdmins = await User.countDocuments({
      isActive: true,
      role: "admin",
    });
    const vipUsers = await User.countDocuments({
      isActive: true,
      role: "user",
      level: "VIP",
    });
    const premiumUsers = await User.countDocuments({
      isActive: true,
      role: "user",
      level: "Premium",
    });
    const loyalUsers = await User.countDocuments({
      isActive: true,
      role: "user",
      level: "Loyal",
    });
    const regularUsers = await User.countDocuments({
      isActive: true,
      role: "user",
      level: "Thường",
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalAdmins,
        vipUsers,
        premiumUsers,
        loyalUsers,
        regularUsers,
      },
    });
  } catch (error) {
    console.error("Error getting user stats:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thống kê người dùng",
      error: error.message,
    });
  }
};
