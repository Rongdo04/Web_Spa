// components/admin/AdminServices/components/ServiceDetails.jsx
import React from "react";
import { Modal, Card } from "../../../ui";
import {
  CloseOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  TagOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";

const ServiceDetails = ({ service, onClose }) => {
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
      return `${hours} giờ ${mins} phút`;
    }
    return `${mins} phút`;
  };

  const getStatusColor = (isActive) => {
    return isActive ? "green" : "red";
  };

  const getStatusText = (isActive) => {
    return isActive ? "Đang hoạt động" : "Tạm dừng";
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="large" className="max-w-4xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {service.name}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {service.category}
              </span>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  service.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {getStatusText(service.isActive)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TagOutlined className="mr-2" />
                Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Tên dịch vụ
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {service.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Danh mục
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {service.category}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Thời lượng
                  </label>
                  <p className="text-gray-900 dark:text-white flex items-center">
                    <ClockCircleOutlined className="mr-1" />
                    {formatDuration(service.duration)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Giá dịch vụ
                  </label>
                  <p className="text-gray-900 dark:text-white font-semibold flex items-center">
                    <DollarOutlined className="mr-1" />
                    {formatCurrency(service.price)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Thứ tự hiển thị
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    #{service.displayOrder}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Trạng thái
                  </label>
                  <p
                    className={`font-medium ${
                      service.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {getStatusText(service.isActive)}
                  </p>
                </div>
              </div>
              {service.description && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Mô tả
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {service.description}
                  </p>
                </div>
              )}
            </Card>

            {/* Combo Packages */}
            {service.combo && service.combo.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <StarOutlined className="mr-2" />
                  Gói combo ({service.combo.length})
                </h3>
                <div className="space-y-3">
                  {service.combo.map((combo, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {combo.name}
                        </p>
                      </div>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">
                        {formatCurrency(combo.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Thống kê nhanh
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatDuration(service.duration)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Thời lượng
                  </p>
                </div>
              </div>
            </Card>

            {/* Service Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Thông tin hệ thống
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-gray-600 dark:text-gray-400 mb-1">
                    ID dịch vụ
                  </label>
                  <p className="text-gray-900 dark:text-white font-mono">
                    #{service.id}
                  </p>
                </div>
                {service.createdAt && (
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Ngày tạo
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(service.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                )}
                {service.updatedAt && (
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 mb-1">
                      Cập nhật lần cuối
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(service.updatedAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDetails;
