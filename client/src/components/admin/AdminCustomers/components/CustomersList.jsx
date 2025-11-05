// components/admin/AdminCustomers/components/CustomersList.jsx
import React, { useState } from "react";
import { Card, Button, Input, Select, Badge, Pagination } from "../../../ui";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const CustomersList = ({
  customers,
  loading,
  pagination,
  filters,
  searchInput,
  onEdit,
  onDelete,
  onViewProfile,
  onPageChange,
  onPageSizeChange,
  onFilterChange,
  onSearchChange,
  onClearFilters,
}) => {
  const [sortBy, setSortBy] = useState("totalSpent");

  // Sort customers locally (API doesn't handle sorting yet)
  const sortedCustomers = [...customers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "totalAppointments":
        return (b.totalAppointments || 0) - (a.totalAppointments || 0);
      case "lastBooking":
        return new Date(b.lastBooking || 0) - new Date(a.lastBooking || 0);
      case "totalSpent":
      default:
        return (b.totalSpent || 0) - (a.totalSpent || 0);
    }
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getCustomerLevel = (totalSpent) => {
    if (totalSpent >= 10000000) return { level: "VIP", color: "gold" };
    return { level: "Thường", color: "blue" };
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
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
          <div className="relative md:col-span-8">
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm khách hàng..."
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={filters.level}
            onChange={(value) => onFilterChange("level", value)}
            className="w-full md:col-span-2"
            options={[
              { value: "", label: "Tất cả cấp độ" },
              { value: "VIP", label: "VIP" },
              { value: "Thường", label: "Thường" },
            ]}
          />
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full md:col-span-2"
          >
            <FilterOutlined className="mr-1" />
            Xóa bộ lọc
          </Button>
        </div>
      </Card>

      {/* Customers List */}
      {sortedCustomers.length === 0 ? (
        <Card className="p-12 text-center">
          <UserOutlined className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Không tìm thấy khách hàng
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Thử thay đổi bộ lọc hoặc tìm kiếm khác
          </p>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {sortedCustomers.map((customer) => {
              const customerLevel = getCustomerLevel(customer.totalSpent);
              return (
                <Card
                  key={customer._id || customer.id}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                        {customer.avatar ? (
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl ${
                            customer.avatar ? "hidden" : "flex"
                          }`}
                        >
                          {customer.name.charAt(0)}
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {customer.name}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <PhoneOutlined className="mr-2" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MailOutlined className="mr-2" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <DollarOutlined className="mr-2" />
                            {formatCurrency(customer.totalSpent)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CalendarOutlined className="mr-2" />
                            {customer.totalAppointments} lịch
                          </div>
                        </div>

                        {/* Last Booking */}
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Lần đặt gần nhất: {formatDate(customer.lastBooking)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <Button
                          size="small"
                          variant="ghost"
                          onClick={() => onViewProfile(customer)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <EyeOutlined />
                        </Button>
                        <Button
                          size="small"
                          variant="ghost"
                          onClick={() => onEdit(customer)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <EditOutlined />
                        </Button>
                        <Button
                          size="small"
                          variant="ghost"
                          onClick={() => onDelete(customer._id || customer.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <DeleteOutlined />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
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
            infoText="Hiển thị {start}-{end} của {total} khách hàng"
          />
        </>
      )}
    </div>
  );
};

export default CustomersList;
