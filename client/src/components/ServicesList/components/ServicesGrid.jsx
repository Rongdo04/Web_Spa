import React from "react";
import { LoadingSkeleton, EmptyState } from "../../ui";
import ServiceCard from "./ServiceCard";

const ServicesGrid = ({ services, isLoading, onClearFilters }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton.Card key={index} />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <EmptyState.Data
        title="Không tìm thấy dịch vụ nào"
        description="Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm của bạn."
        action={
          <button
            onClick={onClearFilters}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Xóa bộ lọc
          </button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesGrid;
