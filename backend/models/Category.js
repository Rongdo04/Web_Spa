// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên danh mục là bắt buộc"],
      trim: true,
      maxlength: [100, "Tên danh mục không được vượt quá 100 ký tự"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Mô tả không được vượt quá 500 ký tự"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Icon phải là URL hợp lệ",
      },
    },
    color: {
      type: String,
      trim: true,
      match: [/^#[0-9A-Fa-f]{6}$/, "Màu sắc phải là mã hex hợp lệ"],
      default: "#3B82F6",
    },
    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Thứ tự hiển thị không được âm"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    level: {
      type: Number,
      default: 0,
      min: [0, "Cấp độ không được âm"],
    },
    path: {
      type: String,
      default: "",
    },
    serviceCount: {
      type: Number,
      default: 0,
      min: [0, "Số lượng dịch vụ không được âm"],
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [60, "SEO title không được vượt quá 60 ký tự"],
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [160, "SEO description không được vượt quá 160 ký tự"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for subcategories
categorySchema.virtual("subcategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parentCategory",
});

// Virtual for full path
categorySchema.virtual("fullPath").get(function () {
  return this.path ? `${this.path} > ${this.name}` : this.name;
});

// Indexes
categorySchema.index({ name: "text", description: "text" });
categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ displayOrder: 1 });
categorySchema.index({ parentCategory: 1 });
categorySchema.index({ level: 1 });

// Pre-save middleware to generate slug and path
categorySchema.pre("save", async function (next) {
  if (this.isModified("name") || this.isNew) {
    // Generate slug from name
    this.slug = this.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");
  }

  // Generate path for hierarchical structure
  if (this.parentCategory) {
    const parent = await this.constructor.findById(this.parentCategory);
    if (parent) {
      this.level = parent.level + 1;
      this.path = parent.path ? `${parent.path} > ${parent.name}` : parent.name;
    }
  } else {
    this.level = 0;
    this.path = "";
  }

  next();
});

// Pre-save middleware to update service count
categorySchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("isActive")) {
    const Service = mongoose.model("Service");
    this.serviceCount = await Service.countDocuments({
      category: this._id,
      isActive: true,
    });
  }
  next();
});

// Static method to get category tree
categorySchema.statics.getCategoryTree = async function (activeOnly = true) {
  const query = activeOnly ? { isActive: true } : {};
  const categories = await this.find(query)
    .populate("subcategories")
    .sort({ displayOrder: 1, name: 1 });

  return this.buildTree(categories);
};

// Static method to build tree structure
categorySchema.statics.buildTree = function (categories, parentId = null) {
  return categories
    .filter((cat) => cat.parentCategory?.toString() === parentId?.toString())
    .map((cat) => ({
      ...cat.toObject(),
      subcategories: this.buildTree(categories, cat._id),
    }));
};

// Instance method to get all descendants
categorySchema.methods.getDescendants = async function () {
  const descendants = await this.constructor.find({
    path: { $regex: new RegExp(this.name, "i") },
  });
  return descendants;
};

// Instance method to check if can be deleted
categorySchema.methods.canBeDeleted = async function () {
  const Service = mongoose.model("Service");
  const hasServices = await Service.exists({ category: this._id });
  const hasSubcategories = await this.constructor.exists({
    parentCategory: this._id,
  });

  return !hasServices && !hasSubcategories;
};

const Category = mongoose.model("Category", categorySchema);

export default Category;
