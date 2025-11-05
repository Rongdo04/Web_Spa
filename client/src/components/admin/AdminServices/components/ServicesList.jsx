// components/admin/AdminServices/components/ServicesList.jsx
import React, { useState } from "react";
import { Card, Button, Input, Select, Badge, Pagination } from "../../../ui";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  SettingOutlined,
  DragOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";

const ServicesList = ({
  services,
  loading,
  pagination,
  filters,
  searchInput,
  onEdit,
  onDelete,
  onView,
  onToggleActive,
  onReorder,
  onPageChange,
  onPageSizeChange,
  onFilterChange,
  onSearchChange,
  onClearFilters,
}) => {
  const categories = [...new Set(services.map((s) => s.category))];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStatusColor = (isActive) => {
    return isActive ? "green" : "red";
  };

  const getStatusText = (isActive) => {
    return isActive ? "Hoạt động" : "Tạm dừng";
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="relative md:col-span-12">
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm dịch vụ..."
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Services Grid */}
      {services.length === 0 ? (
        <Card className="p-12 text-center">
          <SettingOutlined className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Không tìm thấy dịch vụ
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Thử thay đổi bộ lọc hoặc tìm kiếm khác
          </p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {service.name}
                      </h3>
                      {service.isFeatured && (
                        <Badge variant="warning" className="text-xs">
                          Nổi bật
                        </Badge>
                      )}
                    </div>
                    <Badge
                      variant={service.isActive ? "success" : "error"}
                      className="text-sm"
                    >
                      {getStatusText(service.isActive)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="small"
                      variant="ghost"
                      onClick={() => onReorder(index, Math.max(0, index - 1))}
                      disabled={index === 0}
                      className="p-1"
                    >
                      <UpOutlined />
                    </Button>
                    <Button
                      size="small"
                      variant="ghost"
                      onClick={() =>
                        onReorder(
                          index,
                          Math.min(services.length - 1, index + 1)
                        )
                      }
                      disabled={index === services.length - 1}
                      className="p-1"
                    >
                      <DownOutlined />
                    </Button>
                  </div>
                </div>

                {/* Service Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Danh mục:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {service.category}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Thời lượng:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {formatDuration(service.duration)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Giá:
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Thứ tự:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      #{service.displayOrder}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Nổi bật:
                    </span>
                    <Badge
                      variant={service.isFeatured ? "success" : "default"}
                      className="text-xs"
                    >
                      {service.isFeatured ? "Có" : "Không"}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button
                      size="small"
                      variant="ghost"
                      onClick={() => onView(service)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <EyeOutlined />
                    </Button>
                    <Button
                      size="small"
                      variant="ghost"
                      onClick={() => onEdit(service)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <EditOutlined />
                    </Button>
                    <Button
                      size="small"
                      variant="ghost"
                      onClick={() => onDelete(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                  <Button
                    size="small"
                    variant={service.isActive ? "outline" : "solid"}
                    onClick={() => onToggleActive(service.id)}
                    className={
                      service.isActive
                        ? "text-red-600 border-red-600 hover:bg-red-50 p-1"
                        : "bg-green-600 text-white hover:bg-green-700 p-1"
                    }
                  >
                    {service.isActive ? "Tạm dừng" : "Kích hoạt"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            pageSizeOptions={[5, 10, 20, 50]}
            infoText="Hiển thị {start}-{end} của {total} dịch vụ"
          />
        </>
      )}
    </div>
  );
};

export default ServicesList;
