import mongoose from "mongoose";
import { getVietnamTime } from "../utils/timezoneUtils.js";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentNumber: {
      type: String,
      unique: true,
      required: [true, "Vui lòng tạo mã lịch hẹn"],
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vui lòng chọn khách hàng"],
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Vui lòng chọn dịch vụ"],
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: [true, "Vui lòng chọn nhân viên"],
    },
    appointmentDate: {
      type: Date,
      required: [true, "Vui lòng chọn ngày hẹn"],
    },
    startTime: {
      type: String,
      required: [true, "Vui lòng chọn giờ bắt đầu"],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Giờ bắt đầu không hợp lệ"],
    },
    endTime: {
      type: String,
      required: [true, "Vui lòng chọn giờ kết thúc"],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Giờ kết thúc không hợp lệ"],
    },
    duration: {
      type: Number,
      required: [true, "Vui lòng nhập thời gian dịch vụ"],
      min: [15, "Thời gian dịch vụ tối thiểu 15 phút"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in-progress",
        "completed",
        "cancelled",
        "no-show",
      ],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: [true, "Vui lòng nhập tổng tiền"],
      min: [0, "Tổng tiền không được âm"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Giảm giá không được âm"],
    },
    finalAmount: {
      type: Number,
      required: [true, "Vui lòng nhập số tiền cuối cùng"],
      min: [0, "Số tiền cuối cùng không được âm"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "partial", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "bank_transfer", "points", "combo"],
    },
    notes: {
      type: String,
      trim: true,
      maxLength: [500, "Ghi chú không được vượt quá 500 ký tự"],
    },
    specialRequests: {
      type: String,
      trim: true,
      maxLength: [500, "Yêu cầu đặc biệt không được vượt quá 500 ký tự"],
    },
    addOns: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    combo: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
        name: String,
        price: Number,
        originalPrice: Number,
      },
    ],
    reminders: [
      {
        type: {
          type: String,
          enum: ["sms", "email", "phone"],
        },
        sentAt: Date,
        status: {
          type: String,
          enum: ["pending", "sent", "failed"],
        },
      },
    ],
    cancellationReason: {
      type: String,
      trim: true,
    },
    cancelledBy: {
      type: String,
      enum: ["customer", "staff", "admin", "system"],
    },
    cancelledAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    rating: {
      score: {
        type: Number,
        min: [1, "Điểm đánh giá tối thiểu là 1"],
        max: [5, "Điểm đánh giá tối đa là 5"],
      },
      comment: {
        type: String,
        trim: true,
        maxLength: [500, "Bình luận không được vượt quá 500 ký tự"],
      },
      ratedAt: Date,
    },
    followUp: {
      required: {
        type: Boolean,
        default: false,
      },
      scheduledDate: Date,
      completed: {
        type: Boolean,
        default: false,
      },
      notes: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
appointmentSchema.index({ appointmentNumber: 1 });
appointmentSchema.index({ customerId: 1 });
appointmentSchema.index({ serviceId: 1 });
appointmentSchema.index({ staffId: 1 });
appointmentSchema.index({ appointmentDate: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ paymentStatus: 1 });
appointmentSchema.index({ createdAt: -1 });

// Compound indexes
appointmentSchema.index({ staffId: 1, appointmentDate: 1, startTime: 1 });
appointmentSchema.index({ customerId: 1, appointmentDate: -1 });
appointmentSchema.index({ status: 1, appointmentDate: 1 });

// Virtual fields
appointmentSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

appointmentSchema.virtual("isConflict").get(function () {
  // Logic để check conflict sẽ được implement trong controller
  return false;
});

// Ensure virtual fields are serialized
appointmentSchema.set("toJSON", {
  virtuals: true,
});

appointmentSchema.set("toObject", {
  virtuals: true,
});

// Instance methods
appointmentSchema.methods.toJSON = function () {
  const appointment = this.toObject();
  delete appointment.__v;
  return appointment;
};

appointmentSchema.methods.cancel = function (reason, cancelledBy) {
  this.status = "cancelled";
  this.cancellationReason = reason;
  this.cancelledBy = cancelledBy;
  this.cancelledAt = getVietnamTime();
  return this.save();
};

appointmentSchema.methods.complete = function () {
  this.status = "completed";
  this.completedAt = getVietnamTime();
  return this.save();
};

appointmentSchema.methods.addRating = function (score, comment) {
  this.rating = {
    score,
    comment,
    ratedAt: getVietnamTime(),
  };
  return this.save();
};

// Static methods
appointmentSchema.statics.findByDateRange = function (startDate, endDate) {
  return this.find({
    appointmentDate: {
      $gte: startDate,
      $lte: endDate,
    },
  }).populate("customerId serviceId staffId");
};

appointmentSchema.statics.findByStaff = function (staffId, date) {
  return this.find({
    staffId,
    appointmentDate: date,
    status: { $nin: ["cancelled"] },
  });
};

appointmentSchema.statics.findByCustomer = function (customerId) {
  return this.find({ customerId }).sort({ appointmentDate: -1 });
};

appointmentSchema.statics.findConflicts = function (
  staffId,
  date,
  startTime,
  endTime,
  excludeId = null
) {
  const query = {
    staffId,
    appointmentDate: date,
    status: { $nin: ["cancelled", "no-show"] },
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      },
    ],
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return this.find(query);
};

// Pre-save middleware
appointmentSchema.pre("save", function (next) {
  if (this.isNew) {
    // Generate appointment number using Vietnam time
    const date = getVietnamTime();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    this.appointmentNumber = `APT${year}${month}${day}${random}`;
  }

  // Calculate final amount
  this.finalAmount = this.totalAmount - this.discount;

  next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
