import React from "react";
import { Select } from "../../ui";
import { SortAscendingOutlined, FilterOutlined } from "@ant-design/icons";

const ServicesSort = ({
  totalResults,
  activeFiltersCount,
  sortValue,
  onSortChange,
}) => {
  const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "price-asc", label: "Giá tăng dần" },
    { value: "price-desc", label: "Giá giảm dần" },
    { value: "popular", label: "Phổ biến" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Tìm thấy {totalResults} dịch vụ
        </span>
        {activeFiltersCount > 0 && (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">
            ({activeFiltersCount} bộ lọc đang áp dụng)
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <SortAscendingOutlined className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sắp xếp:
        </span>
        <Select
          value={sortValue}
          onChange={onSortChange}
          options={sortOptions}
          placeholder="Chọn cách sắp xếp"
          className="w-48"
        />
      </div>
    </div>
  );
};

export default ServicesSort;
