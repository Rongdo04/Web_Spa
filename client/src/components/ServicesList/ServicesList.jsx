import React, { useState, useEffect } from "react";
import { ErrorState } from "../ui";
import { PublicLayout } from "../layout";
import {
  ServicesHeader,
  ServicesSidebar,
  ServicesSort,
  ServicesGrid,
  ServicesPagination,
} from "./components";
import { useServicesFilter } from "./hooks/useServicesFilter";

const ServicesList = () => {
  // Use custom hook for filtering logic
  const {
    filters,
    currentPage,
    totalPages,
    paginatedServices,
    filteredAndSortedServices,
    activeFiltersCount,
    categories,
    loading,
    error,
    pagination,
    handleFilterChange,
    handleSearch,
    clearFilters,
    setCurrentPage,
  } = useServicesFilter();

  if (error) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorState
              title="Không thể tải danh sách dịch vụ"
              description="Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau."
              onRetry={() => window.location.reload()}
            />
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesHeader
            onSearch={handleSearch}
            searchQuery={filters.search}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            <ServicesSidebar
              filters={filters}
              categories={categories}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              onSearch={handleSearch}
            />

            <div className="flex-1">
              <ServicesSort
                totalResults={filteredAndSortedServices.length}
                activeFiltersCount={activeFiltersCount}
                sortValue={filters.sort}
                onSortChange={(value) => handleFilterChange("sort", value)}
              />

              <ServicesGrid
                services={paginatedServices}
                isLoading={loading}
                onClearFilters={clearFilters}
              />

              <ServicesPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ServicesList;
