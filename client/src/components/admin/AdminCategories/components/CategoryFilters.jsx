// components/admin/AdminCategories/components/CategoryFilters.jsx
import React from "react";
import { Card } from "../../../ui";
import { Input } from "../../../ui";
import { Select } from "../../../ui";
import { Button } from "../../../ui";

const CategoryFilters = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  // Debug log
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Bộ lọc
        </h3>
        {hasActiveFilters && (
          <Button size="sm" variant="outline" onClick={onClearFilters}>
            Xóa bộ lọc
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tìm kiếm
          </label>
          <Input
            type="text"
            placeholder="Tên danh mục, mô tả..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Trạng thái
          </label>
          <Select
            value={filters.status}
            onChange={(value) => onFilterChange("status", value)}
            options={[
              { value: "", label: "Tất cả trạng thái" },
              { value: "active", label: "Hoạt động" },
              { value: "inactive", label: "Tạm dừng" },
            ]}
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cấp độ
          </label>
          <Select
            value={filters.level}
            onChange={(value) => onFilterChange("level", value)}
            options={[
              { value: "", label: "Tất cả cấp độ" },
              { value: "0", label: "Cấp 0" },
              { value: "1", label: "Cấp 1" },
              { value: "2", label: "Cấp 2" },
            ]}
          />
        </div>
      </div>
    </Card>
  );
};

export default CategoryFilters;
