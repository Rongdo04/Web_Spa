// components/admin/AdminNotifications/components/NotificationTemplates.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, Input, Select, Badge, Pagination } from "../../../ui";
import { Switch, Spin, Modal, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  BellOutlined,
  MailOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const NotificationTemplates = ({
  templates,
  pagination,
  stats,
  loading,
  togglingTemplates = new Set(),
  onEdit,
  onDelete,
  onToggle,
  onSendTest,
  onPageChange,
  onPageSizeChange,
  onSearch,
  onFilterChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [testEmail, setTestEmail] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const templateTypes = [
    { value: "appointment_confirmation", label: "Xác nhận lịch hẹn" },
    { value: "appointment_reminder", label: "Nhắc lịch hẹn" },
    { value: "appointment_reschedule", label: "Thay đổi lịch hẹn" },
    { value: "post_service_thanks", label: "Cảm ơn sau dịch vụ" },
  ];

  // Handle search with debounce
  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);

      // Clear existing timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      // Set new timeout for debounced search
      const timeout = setTimeout(() => {
        if (onSearch) {
          onSearch(value);
        }
      }, 500); // 500ms delay

      setSearchTimeout(timeout);
    },
    [onSearch, searchTimeout]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  // Handle filter changes with immediate effect
  const handleTypeFilterChange = useCallback(
    (value) => {
      setTypeFilter(value);
      if (onFilterChange) {
        onFilterChange({ type: value, status: statusFilter });
      }
    },
    [onFilterChange, statusFilter]
  );

  const handleStatusFilterChange = useCallback(
    (value) => {
      setStatusFilter(value);
      if (onFilterChange) {
        onFilterChange({ type: typeFilter, status: value });
      }
    },
    [onFilterChange, typeFilter]
  );

  const getTypeLabel = (type) => {
    const typeObj = templateTypes.find((t) => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  const getTypeColor = (type) => {
    const colors = {
      appointment_confirmation: "blue",
      appointment_reminder: "orange",
      appointment_reschedule: "red",
      post_service_thanks: "green",
    };
    return colors[type] || "default";
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "sms":
        return <MessageOutlined />;
      case "email":
        return <MailOutlined />;
      default:
        return <BellOutlined />;
    }
  };

  // Use stats from server or calculate from current page data as fallback
  const totalTemplates = stats?.totalTemplates || templates.length;
  const activeTemplates =
    stats?.activeTemplates || templates.filter((t) => t.isActive).length;
  const inactiveTemplates =
    stats?.inactiveTemplates || templates.filter((t) => !t.isActive).length;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const handleSendTest = (template) => {
    setSelectedTemplate(template);
    setTestEmail("");
    setTestModalVisible(true);
  };

  const handleConfirmSendTest = async () => {
    if (!testEmail || !selectedTemplate) return;

    try {
      await onSendTest(selectedTemplate.id, testEmail);
      setTestModalVisible(false);
      setSelectedTemplate(null);
      setTestEmail("");
    } catch (error) {}
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
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
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tổng mẫu
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalTemplates}
              </p>
            </div>
            <BellOutlined className="text-2xl text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đang hoạt động
              </p>
              <p className="text-2xl font-bold text-green-600">
                {activeTemplates}
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tạm dừng
              </p>
              <p className="text-2xl font-bold text-red-600">
                {inactiveTemplates}
              </p>
            </div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm mẫu thông báo..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={typeFilter}
            onChange={handleTypeFilterChange}
            className="w-full"
          >
            <option value="all">Tất cả loại</option>
            {templateTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="w-full"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Tạm dừng</option>
          </Select>
        </div>
      </Card>

      {/* Templates List */}
      {templates.length === 0 ? (
        <Card className="p-12 text-center">
          <BellOutlined className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Không tìm thấy mẫu thông báo
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Thử thay đổi bộ lọc hoặc tìm kiếm khác
          </p>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {template.name}
                      </h3>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <SettingOutlined className="mr-2" />
                        <span className="font-medium">Trigger:</span>
                        <span className="ml-2">{template.trigger}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <BellOutlined className="mr-2" />
                        <span className="font-medium">Kênh:</span>
                        <div className="flex items-center space-x-2 ml-2">
                          {template.channels.map((channel, index) => (
                            <span
                              key={index}
                              className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                            >
                              {getChannelIcon(channel)}
                              <span className="ml-1 uppercase">{channel}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Subject:</span>
                        <span className="ml-2">{template.subject}</span>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {template.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div>
                        Tạo: {formatDate(template.createdAt)} • Cập nhật:{" "}
                        {formatDate(template.updatedAt)}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2"></div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Bật/Tắt:</span>
                          <div className="relative">
                            <Switch
                              checked={template.isActive}
                              onChange={() => onToggle(template.id)}
                              size="small"
                              checkedChildren="ON"
                              unCheckedChildren="OFF"
                              disabled={togglingTemplates.has(template.id)}
                            />
                            {togglingTemplates.has(template.id) && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Spin size="small" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      size="small"
                      variant="ghost"
                      onClick={() => onEdit(template)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Chỉnh sửa"
                    >
                      <EditOutlined />
                    </Button>
                    <Button
                      size="small"
                      variant="ghost"
                      onClick={() => handleSendTest(template)}
                      className="text-green-600 hover:text-green-700"
                      title="Gửi test"
                    >
                      <EyeOutlined />
                    </Button>
                    <Button
                      size="small"
                      variant="ghost"
                      onClick={() => onDelete(template.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Xóa"
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <Pagination
              current={pagination.currentPage}
              pageSize={pagination.itemsPerPage}
              total={pagination.totalItems}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              pageSizeOptions={[5, 10, 20, 50]}
              infoText="Hiển thị {start}-{end} của {total} mẫu thông báo"
            />
          )}
        </>
      )}

      {/* Test Modal */}
      <Modal
        title="Gửi thông báo test"
        open={testModalVisible}
        onOk={handleConfirmSendTest}
        onCancel={() => setTestModalVisible(false)}
        okText="Gửi test"
        cancelText="Hủy"
        okButtonProps={{ disabled: !testEmail }}
      >
        {selectedTemplate && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mẫu thông báo
              </label>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {selectedTemplate.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedTemplate.subject}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email nhận test
              </label>
              <Input
                type="email"
                placeholder="Nhập email để gửi test..."
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>📧 Email:</strong> Sẽ gửi email thông báo đến địa chỉ
                trên
              </p>
              <p className="text-sm text-orange-800 dark:text-orange-200 mt-1">
                <strong>📱 SMS:</strong> Đang phát triển
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotificationTemplates;
