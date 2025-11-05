import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    // Thông tin cơ bản
    businessName: {
      type: String,
      required: [true, "Vui lòng nhập tên doanh nghiệp"],
      trim: true,
      maxLength: [100, "Tên doanh nghiệp không được vượt quá 100 ký tự"],
    },
    businessDescription: {
      type: String,
      trim: true,
      maxLength: [500, "Mô tả doanh nghiệp không được vượt quá 500 ký tự"],
    },

    // Thông tin liên hệ
    phone: {
      type: String,
      required: [true, "Vui lòng nhập số điện thoại"],
      match: [/^[0-9]{9,11}$/, "Số điện thoại phải có 9-11 chữ số"],
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Vui lòng nhập email hợp lệ",
      ],
    },
    address: {
      street: {
        type: String,
        required: [true, "Vui lòng nhập địa chỉ"],
        trim: true,
        maxLength: [200, "Địa chỉ không được vượt quá 200 ký tự"],
      },
      city: {
        type: String,
        required: [true, "Vui lòng nhập thành phố"],
        trim: true,
        maxLength: [50, "Thành phố không được vượt quá 50 ký tự"],
      },
      state: {
        type: String,
        trim: true,
        maxLength: [50, "Tỉnh/thành không được vượt quá 50 ký tự"],
      },
      zipCode: {
        type: String,
        trim: true,
        maxLength: [10, "Mã bưu điện không được vượt quá 10 ký tự"],
      },
      country: {
        type: String,
        default: "Việt Nam",
        trim: true,
        maxLength: [50, "Quốc gia không được vượt quá 50 ký tự"],
      },
    },

    // Thông tin mạng xã hội
    socialMedia: {
      facebook: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/.+/,
          "Facebook URL phải bắt đầu bằng http:// hoặc https://",
        ],
      },
      instagram: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/.+/,
          "Instagram URL phải bắt đầu bằng http:// hoặc https://",
        ],
      },
      tiktok: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/.+/,
          "TikTok URL phải bắt đầu bằng http:// hoặc https://",
        ],
      },
      youtube: {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/.+/,
          "YouTube URL phải bắt đầu bằng http:// hoặc https://",
        ],
      },
      zalo: {
        type: String,
        trim: true,
      },
    },

    // Giờ làm việc
    workingHours: {
      monday: {
        isOpen: { type: Boolean, default: true },
        openTime: { type: String, default: "08:00" },
        closeTime: { type: String, default: "20:00" },
      },
      tuesday: {
        isOpen: { type: Boolean, default: true },
        openTime: { type: String, default: "08:00" },
        closeTime: { type: String, default: "20:00" },
      },
      wednesday: {
        isOpen: { type: Boolean, default: true },
        openTime: { type: String, default: "08:00" },
        closeTime: { type: String, default: "20:00" },
      },
      thursday: {
        isOpen: { type: Boolean, default: true },
        openTime: { type: String, default: "08:00" },
        closeTime: { type: String, default: "20:00" },
      },
      friday: {
        isOpen: { type: Boolean, default: true },
        openTime: { type: String, default: "08:00" },
        closeTime: { type: String, default: "20:00" },
      },
      saturday: {
        isOpen: { type: Boolean, default: true },
        openTime: { type: String, default: "08:00" },
        closeTime: { type: String, default: "20:00" },
      },
      sunday: {
        isOpen: { type: Boolean, default: false },
        openTime: { type: String, default: "08:00" },
        closeTime: { type: String, default: "20:00" },
      },
    },

    // Thông tin bổ sung
    logo: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i,
        "Logo phải là URL hợp lệ của hình ảnh",
      ],
    },
    favicon: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg|ico)(\?.*)?$/i,
        "Favicon phải là URL hợp lệ của hình ảnh",
      ],
    },

    // Cài đặt hiển thị
    isActive: {
      type: Boolean,
      default: true,
    },

    // Thông tin SEO
    seo: {
      title: {
        type: String,
        trim: true,
        maxLength: [60, "SEO title không được vượt quá 60 ký tự"],
      },
      description: {
        type: String,
        trim: true,
        maxLength: [160, "SEO description không được vượt quá 160 ký tự"],
      },
      keywords: [
        {
          type: String,
          trim: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
contactSchema.index({ isActive: 1 });

// Virtual fields
contactSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
contactSchema.set("toJSON", {
  virtuals: true,
});

contactSchema.set("toObject", {
  virtuals: true,
});

// Instance methods
contactSchema.methods.toJSON = function () {
  const contact = this.toObject();
  delete contact.__v;
  return contact;
};

// Static methods
contactSchema.statics.getActiveContact = function () {
  return this.findOne({ isActive: true });
};

contactSchema.statics.getPublicContact = function () {
  return this.findOne({ isActive: true }).select(
    "businessName businessDescription phone email address socialMedia workingHours logo"
  );
};

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
