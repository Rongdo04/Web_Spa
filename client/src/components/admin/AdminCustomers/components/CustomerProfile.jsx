// components/admin/AdminCustomers/components/CustomerProfile.jsx
import React, { useState } from "react";
import { Modal, Card, Button, Input, Badge } from "../../../ui";
import {
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const CustomerProfile = ({ customer, onClose, onUpdateNotes }) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(customer.notes || "");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: "green",
      pending: "orange",
      cancelled: "red",
      confirmed: "blue",
    };
    return colors[status] || "default";
  };

  const getStatusText = (status) => {
    const texts = {
      completed: "Hoàn thành",
      pending: "Chờ xác nhận",
      cancelled: "Đã hủy",
      confirmed: "Đã xác nhận",
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <CheckCircleOutlined />,
      pending: <ClockCircleOutlined />,
      cancelled: <CloseCircleOutlined />,
      confirmed: <ExclamationCircleOutlined />,
    };
    return icons[status] || <ClockCircleOutlined />;
  };

  const getCustomerLevel = (totalSpent) => {
    if (totalSpent >= 5000000) return { level: "VIP", color: "gold" };
    if (totalSpent >= 2000000) return { level: "Premium", color: "purple" };
    if (totalSpent >= 1000000) return { level: "Loyal", color: "green" };
    return { level: "Thường", color: "blue" };
  };

  const handleSaveNotes = () => {
    onUpdateNotes(customer._id || customer.id, notes);
    setIsEditingNotes(false);
  };

  const customerLevel = getCustomerLevel(customer.totalSpent);

  return (
    <Modal isOpen={true} onClose={onClose} size="large" className="max-w-6xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
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
                className={`w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl ${
                  customer.avatar ? "hidden" : "flex"
                }`}
              >
                {customer.name.charAt(0)}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {customer.name}
              </h2>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseOutlined />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <UserOutlined className="mr-2" />
                Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Họ tên
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {customer.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Số điện thoại
                  </label>
                  <p className="text-gray-900 dark:text-white flex items-center">
                    <PhoneOutlined className="mr-1" />
                    {customer.phone}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white flex items-center">
                    <MailOutlined className="mr-1" />
                    {customer.email || "Chưa có email"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Tài khoản
                  </label>
                  <p className="text-gray-900 dark:text-white flex items-center">
                    <UserOutlined className="mr-1" />
                    {customer.userId ? "Đã có tài khoản" : "Chưa có tài khoản"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Ngày tham gia
                  </label>
                  <p className="text-gray-900 dark:text-white flex items-center">
                    <CalendarOutlined className="mr-1" />
                    {formatDate(customer.joinDate || customer.createdAt)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Statistics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <DollarOutlined className="mr-2" />
                Thống kê
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(customer.totalSpent || 0)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tổng chi tiêu
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {customer.totalAppointments || 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Số lịch hẹn
                  </p>
                </div>
              </div>
            </Card>

            {/* Appointment History */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CalendarOutlined className="mr-2" />
                Lịch sử đặt lịch ({customer.appointmentHistory?.length || 0})
              </h3>
              <div className="space-y-3">
                {customer.appointmentHistory &&
                customer.appointmentHistory.length > 0 ? (
                  customer.appointmentHistory.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {appointment.service}
                          </span>
                          <Badge
                            color={getStatusColor(appointment.status)}
                            text={getStatusText(appointment.status)}
                            icon={getStatusIcon(appointment.status)}
                          />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(appointment.date)} {appointment.time} •{" "}
                          {appointment.staff}
                        </div>
                        {appointment.servicePrice &&
                          appointment.servicePrice !==
                            appointment.totalAmount && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Giá gốc:{" "}
                              {formatCurrency(appointment.servicePrice)} • Giảm
                              giá: {formatCurrency(appointment.discount || 0)}
                            </div>
                          )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(appointment.totalAmount)}
                        </p>
                        {appointment.servicePrice &&
                          appointment.servicePrice !==
                            appointment.totalAmount && (
                            <p className="text-xs text-gray-500 line-through">
                              {formatCurrency(appointment.servicePrice)}
                            </p>
                          )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    Chưa có lịch hẹn nào
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notes */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ghi chú
              </h3>
              {isEditingNotes ? (
                <div className="space-y-3">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none"
                    rows={4}
                    placeholder="Thêm ghi chú về khách hàng..."
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSaveNotes}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Lưu
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingNotes(false);
                        setNotes(customer.notes || "");
                      }}
                      variant="outline"
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-900 dark:text-white mb-3">
                    {customer.notes || "Chưa có ghi chú"}
                  </p>
                  <Button
                    onClick={() => setIsEditingNotes(true)}
                    variant="outline"
                    size="small"
                  >
                    <EditOutlined className="mr-1" />
                    Chỉnh sửa
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerProfile;
