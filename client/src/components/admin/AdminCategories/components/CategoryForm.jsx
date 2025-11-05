// components/admin/AdminCategories/components/CategoryForm.jsx
import React from "react";
import { Modal } from "../../../ui";
import { Button } from "../../../ui";
import { Input } from "../../../ui";
import { Select } from "../../../ui";
import { Textarea } from "../../../ui";

const CategoryForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  editingCategory,
  categories,
  loading,
}) => {
  // Debug log để kiểm tra dữ liệu
  // Filter parent categories (loại bỏ danh mục đang edit)
  const availableParentCategories = categories.filter((cat) => {
    return !editingCategory || cat.id !== editingCategory.id;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên danh mục *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => onInputChange("name", e.target.value)}
                required
                placeholder="Nhập tên danh mục"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục cha
              </label>
              <Select
                value={formData.parentCategory}
                onChange={(value) => onInputChange("parentCategory", value)}
                options={[
                  { value: null, label: "Chọn danh mục cha" },
                  ...availableParentCategories.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                  })),
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => onInputChange("description", e.target.value)}
              placeholder="Nhập mô tả danh mục"
              rows={3}
            />
          </div>

          {/* Display Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thứ tự hiển thị *
              </label>
              <Input
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  onInputChange("displayOrder", parseInt(e.target.value) || 0)
                }
                required
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <Select
                value={formData.isActive}
                onChange={(value) => onInputChange("isActive", value)}
                options={[
                  { value: true, label: "Hoạt động" },
                  { value: false, label: "Tạm dừng" },
                ]}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {editingCategory ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CategoryForm;
