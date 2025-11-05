import React from "react";
import { Button } from "../../ui";

const ReviewsFilters = ({ currentFilter, onFilterChange, totalReviews }) => {
  const filters = [
    { id: "newest", label: "Mới nhất" },
    { id: "highest", label: "Cao nhất" },
    { id: "lowest", label: "Thấp nhất" },
    { id: "withImages", label: "Có ảnh" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Sắp xếp theo:</span>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={currentFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter.id)}
              className="text-xs"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Hiển thị {totalReviews} đánh giá
      </div>
    </div>
  );
};

export { ReviewsFilters };
