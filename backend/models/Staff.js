import mongoose from "mongoose";

const workScheduleSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Giờ bắt đầu không hợp lệ"],
  },
  end: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Giờ kết thúc không hợp lệ"],
  },
  isWorking: {
    type: Boolean,
    default: true,
  },
});

const staffSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Không bắt buộc
    },
    employeeId: {
      type: String,
      unique: true,
      required: false, // Không bắt buộc, sẽ tự động tạo
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên nhân viên"],
      trim: true,
      maxLength: [50, "Tên nhân viên không được vượt quá 50 ký tự"],
    },
    phone: {
      type: String,
      match: [/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"],
      trim: true,
    },
    email: {
      type: String,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không hợp lệ"],
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return v === "" || /^https?:\/\/.+/.test(v);
        },
        message: "URL hình ảnh không hợp lệ",
      },
    },
    role: {
      type: String,
      required: false, // Không bắt buộc
      default: "Nhân viên", // Giá trị mặc định
      enum: [
        "Massage Therapist",
        "Beauty Specialist",
        "Hair Stylist",
        "Nail Technician",
        "Spa Therapist",
        "Receptionist",
        "Manager",
        "Nhân viên",
        "Khác",
      ],
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    workSchedule: {
      monday: workScheduleSchema,
      tuesday: workScheduleSchema,
      wednesday: workScheduleSchema,
      thursday: workScheduleSchema,
      friday: workScheduleSchema,
      saturday: workScheduleSchema,
      sunday: workScheduleSchema,
    },
    daysOff: [
      {
        type: Date,
      },
    ],
    revenueShare: {
      type: Number,
      min: [0, "Tỷ lệ chia doanh thu không được âm"],
      max: [1, "Tỷ lệ chia doanh thu không được vượt quá 100%"],
      default: 0.3,
    },
    hourlyRate: {
      type: Number,
      min: [0, "Lương theo giờ không được âm"],
      default: 0,
    },
    commission: {
      type: Number,
      min: [0, "Hoa hồng không được âm"],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hireDate: {
      type: Date,
      default: Date.now,
    },
    terminationDate: {
      type: Date,
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
    notes: {
      type: String,
      trim: true,
      maxLength: [500, "Ghi chú không được vượt quá 500 ký tự"],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
staffSchema.index({ employeeId: 1 });
staffSchema.index({ userId: 1 });
staffSchema.index({ role: 1 });
staffSchema.index({ isActive: 1 });
staffSchema.index({ name: "text" });

// Virtual fields
staffSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
staffSchema.set("toJSON", {
  virtuals: true,
});

staffSchema.set("toObject", {
  virtuals: true,
});

// Instance methods
staffSchema.methods.toJSON = function () {
  const staff = this.toObject();
  delete staff.__v;
  return staff;
};

// Pre-save middleware to auto-generate employeeId
staffSchema.pre("save", async function (next) {
  if (!this.employeeId) {
    // Generate employeeId: ST + timestamp + random 3 digits
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    this.employeeId = `ST${timestamp}${random}`;
  }
  next();
});

// Static methods
staffSchema.statics.findByRole = function (role) {
  return this.find({ role, isActive: true });
};

staffSchema.statics.findAvailable = function (date, startTime, endTime) {
  const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
    weekday: "lowercase",
  });

  return this.find({
    isActive: true,
    [`workSchedule.${dayOfWeek}.isWorking`]: true,
    $or: [
      { daysOff: { $nin: [new Date(date)] } },
      { daysOff: { $exists: false } },
    ],
  });
};

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
