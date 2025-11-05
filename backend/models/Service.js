import mongoose from "mongoose";

const addOnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên add-on"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Vui lòng nhập giá add-on"],
    min: [0, "Giá add-on không được âm"],
  },
});

const comboSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên combo"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Vui lòng nhập giá combo"],
    min: [0, "Giá combo không được âm"],
  },
  originalPrice: {
    type: Number,
    required: [true, "Vui lòng nhập giá gốc combo"],
    min: [0, "Giá gốc combo không được âm"],
  },
});

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên dịch vụ"],
      trim: true,
      maxLength: [100, "Tên dịch vụ không được vượt quá 100 ký tự"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Vui lòng chọn danh mục"],
    },
    duration: {
      type: Number,
      required: [true, "Vui lòng nhập thời gian dịch vụ"],
      min: [15, "Thời gian dịch vụ tối thiểu 15 phút"],
      max: [480, "Thời gian dịch vụ tối đa 8 giờ"],
    },
    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá dịch vụ"],
      min: [0, "Giá dịch vụ không được âm"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [1000, "Mô tả không được vượt quá 1000 ký tự"],
    },
    addOns: [addOnSchema],
    combo: [comboSchema],
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        type: String,
        match: [/^https?:\/\/.+/, "URL hình ảnh không hợp lệ"],
      },
    ],
    tags: [String],
    requirements: {
      type: String,
      trim: true,
      maxLength: [500, "Yêu cầu không được vượt quá 500 ký tự"],
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
serviceSchema.index({ name: "text", description: "text" });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ isFeatured: 1 });
serviceSchema.index({ displayOrder: 1 });

// Virtual fields
serviceSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
serviceSchema.set("toJSON", {
  virtuals: true,
});

serviceSchema.set("toObject", {
  virtuals: true,
});

// Instance methods
serviceSchema.methods.toJSON = function () {
  const service = this.toObject();
  delete service.__v;
  return service;
};

const Service = mongoose.model("Service", serviceSchema);

export default Service;
