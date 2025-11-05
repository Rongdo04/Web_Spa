import mongoose from "mongoose";

const notificationLogSchema = new mongoose.Schema(
  {
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NotificationTemplate",
      required: [true, "Vui lòng liên kết với mẫu thông báo"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vui lòng liên kết với người dùng"],
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    channel: {
      type: String,
      required: [true, "Vui lòng chọn kênh gửi"],
      enum: ["sms", "email", "push", "whatsapp", "phone"],
    },
    recipient: {
      name: {
        type: String,
        required: [true, "Vui lòng nhập tên người nhận"],
        trim: true,
      },
      phone: {
        type: String,
        match: [/^[0-9]{10,11}$/, "Số điện thoại người nhận không hợp lệ"],
      },
      email: {
        type: String,
        lowercase: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Email người nhận không hợp lệ",
        ],
      },
    },
    content: {
      subject: {
        type: String,
        trim: true,
        maxLength: [200, "Tiêu đề không được vượt quá 200 ký tự"],
      },
      body: {
        type: String,
        required: [true, "Vui lòng nhập nội dung thông báo"],
        trim: true,
        maxLength: [2000, "Nội dung không được vượt quá 2000 ký tự"],
      },
    },
    status: {
      type: String,
      enum: [
        "pending",
        "sent",
        "delivered",
        "failed",
        "bounced",
        "opened",
        "clicked",
      ],
      default: "pending",
    },
    statusMessage: {
      type: String,
      trim: true,
    },
    sentAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    openedAt: {
      type: Date,
    },
    clickedAt: {
      type: Date,
    },
    failedAt: {
      type: Date,
    },
    retryCount: {
      type: Number,
      default: 0,
      min: [0, "Số lần thử lại không được âm"],
    },
    maxRetries: {
      type: Number,
      default: 3,
      min: [0, "Số lần thử lại tối đa không được âm"],
    },
    provider: {
      name: {
        type: String,
        trim: true,
      },
      messageId: {
        type: String,
        trim: true,
      },
      response: {
        type: String,
        trim: true,
      },
    },
    cost: {
      type: Number,
      min: [0, "Chi phí không được âm"],
      default: 0,
    },
    variables: {
      type: mongoose.Schema.Types.Mixed,
    },
    metadata: {
      userAgent: String,
      ipAddress: String,
      deviceType: String,
      browser: String,
      os: String,
    },
    error: {
      code: String,
      message: String,
      details: String,
    },
    scheduledFor: {
      type: Date,
    },
    priority: {
      type: Number,
      default: 1,
      min: [1, "Độ ưu tiên tối thiểu là 1"],
      max: [10, "Độ ưu tiên tối đa là 10"],
    },
    tags: [String],
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
notificationLogSchema.index({ templateId: 1 });
notificationLogSchema.index({ userId: 1 });
notificationLogSchema.index({ appointmentId: 1 });
notificationLogSchema.index({ channel: 1 });
notificationLogSchema.index({ status: 1 });
notificationLogSchema.index({ sentAt: -1 });
notificationLogSchema.index({ createdAt: -1 });
notificationLogSchema.index({ scheduledFor: 1 });

// Compound indexes
notificationLogSchema.index({ userId: 1, createdAt: -1 });
notificationLogSchema.index({ status: 1, createdAt: -1 });
notificationLogSchema.index({ channel: 1, status: 1 });

// Virtual fields
notificationLogSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

notificationLogSchema.virtual("isExpired").get(function () {
  if (this.status === "pending" && this.scheduledFor) {
    return new Date() > this.scheduledFor;
  }
  return false;
});

notificationLogSchema.virtual("canRetry").get(function () {
  return this.status === "failed" && this.retryCount < this.maxRetries;
});

// Ensure virtual fields are serialized
notificationLogSchema.set("toJSON", {
  virtuals: true,
});

notificationLogSchema.set("toObject", {
  virtuals: true,
});

// Instance methods
notificationLogSchema.methods.toJSON = function () {
  const log = this.toObject();
  delete log.__v;
  return log;
};

notificationLogSchema.methods.markAsSent = function (
  messageId,
  providerResponse
) {
  this.status = "sent";
  this.sentAt = new Date();
  this.provider.messageId = messageId;
  this.provider.response = providerResponse;
  return this.save();
};

notificationLogSchema.methods.markAsDelivered = function () {
  this.status = "delivered";
  this.deliveredAt = new Date();
  return this.save();
};

notificationLogSchema.methods.markAsOpened = function () {
  this.status = "opened";
  this.openedAt = new Date();
  return this.save();
};

notificationLogSchema.methods.markAsClicked = function () {
  this.status = "clicked";
  this.clickedAt = new Date();
  return this.save();
};

notificationLogSchema.methods.markAsFailed = function (error) {
  this.status = "failed";
  this.failedAt = new Date();
  this.retryCount += 1;
  this.error = error;
  return this.save();
};

notificationLogSchema.methods.retry = function () {
  if (this.canRetry) {
    this.status = "pending";
    this.retryCount += 1;
    return this.save();
  }
  throw new Error("Không thể thử lại thông báo này");
};

// Static methods
notificationLogSchema.statics.findByStatus = function (status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

notificationLogSchema.statics.findByUser = function (userId) {
  return this.find({ userId }).sort({ createdAt: -1 });
};

notificationLogSchema.statics.findByChannel = function (channel) {
  return this.find({ channel }).sort({ createdAt: -1 });
};

notificationLogSchema.statics.findPending = function () {
  return this.find({ status: "pending" }).sort({ priority: -1, createdAt: 1 });
};

notificationLogSchema.statics.findFailed = function () {
  return this.find({ status: "failed" }).sort({ createdAt: -1 });
};

notificationLogSchema.statics.getStats = function (startDate, endDate) {
  const matchStage = {};
  if (startDate && endDate) {
    matchStage.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalCost: { $sum: "$cost" },
      },
    },
  ]);
};

// Pre-save middleware
notificationLogSchema.pre("save", function (next) {
  // Set scheduled time if not provided
  if (this.status === "pending" && !this.scheduledFor) {
    this.scheduledFor = new Date();
  }

  // Validate recipient based on channel
  if (this.channel === "sms" && !this.recipient.phone) {
    return next(new Error("Số điện thoại là bắt buộc cho SMS"));
  }

  if (this.channel === "email" && !this.recipient.email) {
    return next(new Error("Email là bắt buộc cho email"));
  }

  next();
});

const NotificationLog = mongoose.model(
  "NotificationLog",
  notificationLogSchema
);

export default NotificationLog;
