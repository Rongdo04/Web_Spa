// components/admin/AdminServices/components/ServiceForm.jsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  Card,
} from "../../../ui";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import adminCategoriesAPI from "../../../../services/admin/adminCategoriesAPI";

const ServiceForm = ({ service, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: 30,
    price: 0,
    description: "",
    images: "",
    displayOrder: 1,
    isActive: true,
    isFeatured: false,
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      // Process images
      let processedImages = "";
      if (service.images) {
        if (Array.isArray(service.images)) {
          processedImages =
            service.images.length > 0 ? service.images.join(", ") : "";
        } else if (typeof service.images === "string") {
          processedImages = service.images;
        }
      }

      const formDataToSet = {
        name: service.name || "",
        category: service.categoryId || service.category || "",
        duration: service.duration || 30,
        price: service.price || 0,
        description: service.description || "",
        images: processedImages,
        displayOrder: service.displayOrder || 1,
        isActive: service.isActive !== undefined ? service.isActive : true,
        isFeatured:
          service.isFeatured !== undefined ? service.isFeatured : false,
      };

      setFormData(formDataToSet);
    } else {
      // Reset form when no service
      setFormData({
        name: "",
        category: "",
        duration: 30,
        price: 0,
        description: "",
        images: "",
        displayOrder: 1,
        isActive: true,
        isFeatured: false,
      });
    }
  }, [service]);

  // Load categories from API
  useEffect(() => {
    loadCategories();
  }, []);

  // Sync category when categories are loaded and service exists
  useEffect(() => {
    if (service && categories.length > 0) {
      // Check if the current category value exists in the loaded categories
      const categoryExists = categories.some(
        (cat) => cat.value === formData.category
      );

      if (!categoryExists) {
        // Try to find by categoryId first
        let foundCategory = null;
        if (service.categoryId) {
          foundCategory = categories.find(
            (cat) => cat.value === service.categoryId
          );
        }

        // If not found by ID, try to find by name (formData.category is the name)
        if (!foundCategory && formData.category) {
          foundCategory = categories.find(
            (cat) => cat.label === formData.category
          );
        }

        if (foundCategory) {
          setFormData((prev) => ({ ...prev, category: foundCategory.value }));
        }
      }
    }
  }, [categories, service]);

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await adminCategoriesAPI.list({
        level: "0", // Chỉ load danh mục cấp 0
        limit: 100,
      });

      if (response.success && response.data) {
        // Flatten categories including subcategories
        const allCategories = [];

        (response.data.categories || []).forEach((cat) => {
          // Add main category
          allCategories.push({
            value: cat._id || cat.id,
            label: cat.name,
          });

          // Add subcategories if they exist
          if (cat.subcategories && cat.subcategories.length > 0) {
            cat.subcategories.forEach((subcat) => {
              allCategories.push({
                value: subcat._id || subcat.id,
                label: `${cat.name} - ${subcat.name}`,
              });
            });
          }
        });

        setCategories(allCategories);
      } else {
        // Fallback to hardcoded categories if API fails
        setCategories([
          { value: "toc", label: "Tóc" },
          { value: "cham-soc-da", label: "Chăm sóc da" },
          { value: "mong-tay", label: "Móng tay" },
          { value: "massage", label: "Massage" },
          { value: "spa", label: "Spa" },
          { value: "khac", label: "Khác" },
        ]);
      }
    } catch (error) {
      // Fallback to hardcoded categories if API fails
      setCategories([
        { value: "toc", label: "Tóc" },
        { value: "cham-soc-da", label: "Chăm sóc da" },
        { value: "mong-tay", label: "Móng tay" },
        { value: "massage", label: "Massage" },
        { value: "spa", label: "Spa" },
        { value: "khac", label: "Khác" },
      ]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validation
    const validationErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      validationErrors.name = "Tên dịch vụ không được để trống";
    }

    if (!formData.category) {
      validationErrors.category = "Vui lòng chọn danh mục";
    }

    if (!formData.duration || formData.duration <= 0) {
      validationErrors.duration = "Thời lượng phải lớn hơn 0";
    }

    if (!formData.price || formData.price <= 0) {
      validationErrors.price = "Giá dịch vụ phải lớn hơn 0";
    }

    if (formData.price && formData.price < 1000) {
      validationErrors.price = "Giá dịch vụ tối thiểu là 1,000 VNĐ";
    }

    if (formData.duration && formData.duration > 480) {
      validationErrors.duration = "Thời lượng tối đa là 8 giờ (480 phút)";
    }

    // Validate images URL
    if (formData.images && formData.images.trim() !== "") {
      const imageUrls = formData.images
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url);
      const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;

      for (const url of imageUrls) {
        if (!urlPattern.test(url)) {
          validationErrors.images =
            "Vui lòng nhập URL hình ảnh hợp lệ (jpg, jpeg, png, gif, webp, svg)";
          break;
        }
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Convert images string to array
      const processedData = {
        ...formData,
        images: formData.images
          ? formData.images
              .split(",")
              .map((url) => url.trim())
              .filter((url) => url)
          : [],
      };

      await onSave(processedData);
    } catch (error) {
      // Handle error silently or show user-friendly message
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="large" className="max-w-4xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {service ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseOutlined />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tên dịch vụ *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Nhập tên dịch vụ"
                  required
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Danh mục *
                </label>
                <Select
                  options={categories}
                  value={formData.category}
                  onChange={(value) => {
                    handleInputChange("category", value);
                  }}
                  placeholder={
                    loadingCategories ? "Đang tải danh mục..." : "Chọn danh mục"
                  }
                  required
                  disabled={loadingCategories}
                  error={errors.category}
                  className={errors.category ? "border-red-500" : ""}
                />

                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thời lượng (phút) *
                </label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", parseInt(e.target.value) || 0)
                  }
                  placeholder="30"
                  min="1"
                  max="480"
                  required
                  className={errors.duration ? "border-red-500" : ""}
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Giá (VNĐ) *
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    handleInputChange("price", parseInt(e.target.value) || 0)
                  }
                  placeholder="150000"
                  min="1000"
                  required
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mô tả
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Mô tả chi tiết về dịch vụ"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hình ảnh (URL)
                </label>
                <Input
                  value={formData.images}
                  onChange={(e) => handleInputChange("images", e.target.value)}
                  placeholder="https://example.com/image.jpg (có thể nhập nhiều URL cách nhau bởi dấu phẩy)"
                  className={errors.images ? "border-red-500" : ""}
                />
                {errors.images && (
                  <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Nhập URL hình ảnh (jpg, jpeg, png, gif, webp, svg). Nhiều URL
                  cách nhau bởi dấu phẩy.
                </p>
              </div>
            </div>
          </Card>

          {/* Settings */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Cài đặt
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thứ tự hiển thị
                </label>
                <Input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    handleInputChange(
                      "displayOrder",
                      parseInt(e.target.value) || 1
                    )
                  }
                  placeholder="1"
                  min="1"
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={formData.isActive}
                  onChange={(e) =>
                    handleInputChange("isActive", e.target.checked)
                  }
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Kích hoạt dịch vụ
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    handleInputChange("isFeatured", e.target.checked)
                  }
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dịch vụ nổi bật
                </label>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              <SaveOutlined className="mr-2" />
              {loading ? "Đang lưu..." : service ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ServiceForm;
