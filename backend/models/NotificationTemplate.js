import mongoose from "mongoose";

const notificationTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên mẫu thông báo"],
      trim: true,
      maxLength: [100, "Tên mẫu thông báo không được vượt quá 100 ký tự"],
    },
    type: {
      type: String,
      required: [true, "Vui lòng chọn loại thông báo"],
      enum: [
        "confirmation",
        "reminder",
        "reschedule",
        "cancellation",
        "thank_you",
        "promotion",
        "birthday",
        "anniversary",
        "feedback",
        "other",
      ],
    },
    trigger: {
      type: String,
      required: [true, "Vui lòng chọn trigger"],
      enum: [
        "appointment_created",
        "appointment_reminder",
        "appointment_rescheduled",
        "appointment_cancelled",
        "appointment_completed",
        "customer_birthday",
        "customer_anniversary",
        "promotion_created",
        "feedback_request",
        "manual",
      ],
    },
    subject: {
      type: String,
      required: [true, "Vui lòng nhập tiêu đề"],
      trim: true,
      maxLength: [200, "Tiêu đề không được vượt quá 200 ký tự"],
    },
    content: {
      type: String,
      required: [true, "Vui lòng nhập nội dung"],
      trim: true,
      maxLength: [2000, "Nội dung không được vượt quá 2000 ký tự"],
    },
    channels: [
      {
        type: String,
        enum: ["sms", "email", "push", "whatsapp", "phone"],
        required: [true, "Vui lòng chọn ít nhất một kênh"],
      },
    ],
    variables: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        example: {
          type: String,
          trim: true,
        },
      },
    ],
    timing: {
      type: {
        type: String,
        enum: ["immediate", "scheduled", "relative"],
        default: "immediate",
      },
      delay: {
        value: {
          type: Number,
          min: [0, "Giá trị delay không được âm"],
        },
        unit: {
          type: String,
          enum: ["minutes", "hours", "days"],
        },
      },
      scheduledTime: {
        type: String,
        match: [
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Giờ lên lịch không hợp lệ",
        ],
      },
    },
    conditions: {
      customerLevel: [
        {
          type: String,
          enum: ["Thường", "Loyal", "Premium", "VIP"],
        },
      ],
      serviceTypes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
      ],
      branches: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Branch",
        },
      ],
      minAppointments: {
        type: Number,
        min: [0, "Số lịch hẹn tối thiểu không được âm"],
      },
      minSpent: {
        type: Number,
        min: [0, "Số tiền chi tối thiểu không được âm"],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 1,
      min: [1, "Độ ưu tiên tối thiểu là 1"],
      max: [10, "Độ ưu tiên tối đa là 10"],
    },
    language: {
      type: String,
      default: "vi",
      enum: ["vi", "en"],
    },
    tags: [String],
    notes: {
      type: String,
      trim: true,
      maxLength: [500, "Ghi chú không được vượt quá 500 ký tự"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vui lòng xác định người tạo"],
    },
    lastUsed: {
      type: Date,
    },
    usageCount: {
      type: Number,
      default: 0,
      min: [0, "Số lần sử dụng không được âm"],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
// Avoid using the document field "language" as MongoDB's language override by
// specifying a non-existent override field and default_language none.
notificationTemplateSchema.index(
  { name: "text", subject: "text" },
  { language_override: "textLang", default_language: "none" }
);
notificationTemplateSchema.index({ type: 1 });
notificationTemplateSchema.index({ trigger: 1 });
notificationTemplateSchema.index({ isActive: 1 });
notificationTemplateSchema.index({ priority: -1 });
notificationTemplateSchema.index({ createdBy: 1 });

// Virtual fields
notificationTemplateSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
notificationTemplateSchema.set("toJSON", {
  virtuals: true,
});

notificationTemplateSchema.set("toObject", {
  virtuals: true,
});

// Instance methods
notificationTemplateSchema.methods.toJSON = function () {
  const template = this.toObject();
  delete template.__v;
  return template;
};

notificationTemplateSchema.methods.processContent = function (variables) {
  let content = this.content;

  // Replace variables in content
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    content = content.replace(regex, variables[key] || "");
  });

  return content;
};

notificationTemplateSchema.methods.processSubject = function (variables) {
  let subject = this.subject;

  // Replace variables in subject
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    subject = subject.replace(regex, variables[key] || "");
  });

  return subject;
};

notificationTemplateSchema.methods.incrementUsage = function () {
  this.usageCount += 1;
  this.lastUsed = new Date();
  return this.save();
};

// Static methods
notificationTemplateSchema.statics.findByTrigger = function (trigger) {
  return this.find({ trigger, isActive: true }).sort({ priority: -1 });
};

notificationTemplateSchema.statics.findByType = function (type) {
  return this.find({ type, isActive: true }).sort({ priority: -1 });
};

notificationTemplateSchema.statics.findByChannel = function (channel) {
  return this.find({ channels: channel, isActive: true }).sort({
    priority: -1,
  });
};

// Pre-save middleware
notificationTemplateSchema.pre("save", function (next) {
  // Validate that at least one channel is selected
  if (this.channels.length === 0) {
    return next(new Error("Vui lòng chọn ít nhất một kênh thông báo"));
  }

  // Validate timing settings
  if (this.timing.type === "scheduled" && !this.timing.scheduledTime) {
    return next(
      new Error("Vui lòng chọn giờ lên lịch cho thông báo theo lịch")
    );
  }

  if (
    this.timing.type === "relative" &&
    (!this.timing.delay.value || !this.timing.delay.unit)
  ) {
    return next(new Error("Vui lòng cấu hình delay cho thông báo tương đối"));
  }

  next();
});

const NotificationTemplate = mongoose.model(
  "NotificationTemplate",
  notificationTemplateSchema
);

export default NotificationTemplate;
