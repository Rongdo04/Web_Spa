// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Họ tên là bắt buộc"],
      trim: true,
      minlength: [2, "Họ tên phải có ít nhất 2 ký tự"],
      maxlength: [50, "Họ tên không được quá 50 ký tự"],
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Email không hợp lệ",
      },
    },
    phone: {
      type: String,
      required: false,
      unique: false,
      sparse: true,
      validate: {
        validator: function (v) {
          // Chỉ validate nếu phone không rỗng
          return !v || /^[0-9]{9,11}$/.test(v);
        },
        message: "Số điện thoại phải có 9-11 chữ số",
      },
    },
    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Customer fields merged from Customer model
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    totalSpent: {
      type: Number,
      default: 0,
      min: [0, "Tổng chi tiêu không được âm"],
    },
    totalAppointments: {
      type: Number,
      default: 0,
      min: [0, "Tổng số lịch hẹn không được âm"],
    },
    lastBooking: {
      type: Date,
    },
    level: {
      type: String,
      enum: ["Thường", "Loyal", "Premium", "VIP"],
      default: "Thường",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    points: {
      type: Number,
      default: 0,
      min: [0, "Điểm tích lũy không được âm"],
    },
    notes: {
      type: String,
      trim: true,
      maxLength: [1000, "Ghi chú không được vượt quá 1000 ký tự"],
    },
    preferences: {
      services: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
      ],
      staff: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Staff",
        },
      ],
      timeSlots: [String], // ["morning", "afternoon", "evening"]
      communication: {
        sms: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
        phone: { type: Boolean, default: false },
      },
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        trim: true,
      },
    },
    emergencyContact: {
      name: {
        type: String,
        trim: true,
      },
      phone: {
        type: String,
        match: [/^[0-9]{10,11}$/, "Số điện thoại khẩn cấp không hợp lệ"],
      },
      relationship: {
        type: String,
        trim: true,
      },
    },
    lastVisit: {
      type: Date,
    },
    source: {
      type: String,
      enum: [
        "website",
        "referral",
        "walk-in",
        "social",
        "advertisement",
        "other",
      ],
      default: "website",
    },
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index để tìm kiếm nhanh
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 }, { sparse: true });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
// Customer-related indexes
userSchema.index({ level: 1 });
userSchema.index({ name: "text" });
userSchema.index({ totalSpent: -1 });
userSchema.index({ lastBooking: -1 });

// Hash password trước khi save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware for level update
userSchema.pre("save", async function (next) {
  if (this.isModified("totalSpent")) {
    // Update level without calling save() to avoid parallel save
    if (this.totalSpent >= 10000000) {
      this.level = "VIP";
    } else if (this.totalSpent >= 5000000) {
      this.level = "Premium";
    } else if (this.totalSpent >= 2000000) {
      this.level = "Loyal";
    } else {
      this.level = "Thường";
    }
  }
  next();
});

// Method để so sánh password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Lỗi xác thực mật khẩu");
  }
};

// Method để tạo user object an toàn
userSchema.methods.toSafeObject = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpires;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpires;
  return userObject;
};

// Customer-related methods
userSchema.methods.updateLevel = function () {
  if (this.totalSpent >= 10000000) {
    this.level = "VIP";
  } else if (this.totalSpent >= 5000000) {
    this.level = "Premium";
  } else if (this.totalSpent >= 2000000) {
    this.level = "Loyal";
  } else {
    this.level = "Thường";
  }
  // Don't call save() here to avoid parallel save issues
  return this;
};

userSchema.methods.addPoints = function (points) {
  this.points += points;
  return this.save();
};

userSchema.methods.usePoints = function (points) {
  if (this.points >= points) {
    this.points -= points;
    return this.save();
  }
  throw new Error("Không đủ điểm để sử dụng");
};

// Static method để tìm user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase(), isActive: true });
};

// Static method để get user stats
userSchema.statics.getStats = async function () {
  const totalUsers = await this.countDocuments({ isActive: true });
  const totalAdmins = await this.countDocuments({
    role: "admin",
    isActive: true,
  });
  const totalActiveUsers = await this.countDocuments({
    role: "user",
    isActive: true,
  });
  const recentUsers = await this.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    isActive: true,
  });

  return {
    totalUsers,
    totalAdmins,
    totalActiveUsers,
    recentUsers,
  };
};

// Customer-related static methods
userSchema.statics.findByLevel = function (level) {
  return this.find({ level, isActive: true, role: "user" });
};

userSchema.statics.findVIP = function () {
  return this.find({ level: "VIP", isActive: true, role: "user" });
};

userSchema.statics.findInactive = function (days = 90) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  return this.find({
    lastBooking: { $lt: cutoffDate },
    isActive: true,
    role: "user",
  });
};

const User = mongoose.model("User", userSchema);

export default User;
