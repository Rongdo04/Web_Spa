// components/admin/AdminCategories/components/CategoryItem.jsx
import React from "react";
import { Button } from "../../../ui";
import { Badge } from "../../../ui";
import {
  TagsOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const CategoryItem = ({ category, onEdit, onDelete }) => {
  const getStatusBadge = (isActive) => {
    return (
      <Badge variant={isActive ? "success" : "error"} className="text-xs">
        {isActive ? "Hoạt động" : "Tạm dừng"}
      </Badge>
    );
  };

  const getLevelBadge = (level) => {
    const variants = {
      0: "info", // blue
      1: "success", // green
      2: "warning", // orange
    };
    return (
      <Badge variant={variants[level] || "secondary"} className="text-xs">
        Cấp {level}
      </Badge>
    );
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      onDelete(category.id);
    }
  };

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {category.name}
              </h4>
            </div>
            {getStatusBadge(category.isActive)}
            {getLevelBadge(category.level)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <TagsOutlined className="text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {category.serviceCount} dịch vụ
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <UserOutlined className="text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                Thứ tự: {category.displayOrder}
              </span>
            </div>

            {category.slug && (
              <div className="text-gray-600 dark:text-gray-400">
                /{category.slug}
              </div>
            )}
          </div>

          {category.description && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <strong>Mô tả:</strong> {category.description}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(category)}>
            <EditOutlined />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
