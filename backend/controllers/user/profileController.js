// controllers/user/profileController.js
import User from "../../models/User.js";

// GET /api/user/profile - Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Người dùng không tồn tại",
      });
    }

    res.json({
      success: true,
      data: {
        user: user.toSafeObject(),
      },
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

// PUT /api/user/profile - Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, dateOfBirth, gender, address } = req.body;
    const userId = req.user.id;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email này đã được sử dụng bởi người dùng khác",
        });
      }
    }

    // Check if phone is already taken by another user
    if (phone) {
      const existingUser = await User.findOne({
        phone: phone,
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Số điện thoại này đã được sử dụng bởi người dùng khác",
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.toLowerCase().trim();
    if (phone) updateData.phone = phone.trim();
    if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
    if (gender) updateData.gender = gender;
    if (address) updateData.address = address;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json({
      success: true,
      message: "Cập nhật thông tin thành công",
      data: {
        user: updatedUser.toSafeObject(),
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật thông tin người dùng",
      error: error.message,
    });
  }
};

// PUT /api/user/profile/change-password - Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu mới phải có ít nhất 6 ký tự",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Người dùng không tồn tại",
      });
    }

    // Check current password
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

// POST /api/user/profile/avatar - Upload avatar
export const uploadAvatar = async (req, res) => {
  try {
    const { avatarUrl } = req.body;
    const userId = req.user.id;

    if (!avatarUrl || !avatarUrl.trim()) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập URL ảnh đại diện",
      });
    }

    // Validate URL
    try {
      new URL(avatarUrl.trim());
    } catch {
      return res.status(400).json({
        success: false,
        message: "URL không hợp lệ",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl.trim() },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Cập nhật ảnh đại diện thành công",
      data: {
        user: updatedUser.toSafeObject(),
      },
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

// DELETE /api/user/profile/avatar - Delete avatar
export const deleteAvatar = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: null },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Xóa ảnh đại diện thành công",
      data: {
        user: updatedUser.toSafeObject(),
      },
    });
  } catch (error) {
    console.error("Error deleting avatar:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa ảnh đại diện",
      error: error.message,
    });
  }
};
