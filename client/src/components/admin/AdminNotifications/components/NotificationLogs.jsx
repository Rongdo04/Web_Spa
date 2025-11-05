// components/admin/AdminNotifications/components/NotificationLogs.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Card, Input, Select, Badge, Pagination } from "../../../ui";
import {
  SearchOutlined,
  FilterOutlined,
  HistoryOutlined,
  MailOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const NotificationLogs = ({
  logs,
  pagination,
  stats,
  loading,
  onPageChange,
  onPageSizeChange,
  onSearch,
  onFilterChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [searchTimeout, setSearchTimeout] = useState(null);

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
  const handleStatusFilterChange = useCallback(
    (value) => {
      setStatusFilter(value);
      if (onFilterChange) {
        onFilterChange({ status: value, channel: channelFilter });
      }
    },
    [onFilterChange, channelFilter]
  );

  const handleChannelFilterChange = useCallback(
    (value) => {
      setChannelFilter(value);
      if (onFilterChange) {
        onFilterChange({ status: statusFilter, channel: value });
      }
    },
    [onFilterChange, statusFilter]
  );

  const getStatusColor = (status) => {
    const colors = {
      sent: "green",
      failed: "red",
      pending: "orange",
      delivered: "blue",
    };
    return colors[status] || "default";
  };

  const getStatusText = (status) => {
    const texts = {
      sent: "Đã gửi",
      failed: "Thất bại",
      pending: "Đang chờ",
      delivered: "Đã nhận",
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      sent: <CheckCircleOutlined />,
      failed: <CloseCircleOutlined />,
      pending: <ClockCircleOutlined />,
      delivered: <ExclamationCircleOutlined />,
    };
    return icons[status] || <ClockCircleOutlined />;
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "sms":
        return <MessageOutlined />;
      case "email":
        return <MailOutlined />;
      default:
        return <HistoryOutlined />;
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm nhật ký..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="w-full"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="sent">Đã gửi</option>
            <option value="delivered">Đã nhận</option>
            <option value="failed">Thất bại</option>
            <option value="pending">Đang chờ</option>
          </Select>
          <Select
            value={channelFilter}
            onChange={handleChannelFilterChange}
            className="w-full"
          >
            <option value="all">Tất cả kênh</option>
            <option value="sms">SMS</option>
            <option value="email">Email</option>
          </Select>
        </div>
      </Card>

      {/* Logs List */}
      {logs.length === 0 ? (
        <Card className="p-12 text-center">
          <HistoryOutlined className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Không tìm thấy nhật ký
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Thử thay đổi bộ lọc hoặc tìm kiếm khác
          </p>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {logs.map((log) => (
              <Card
                key={log.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {log.templateName}
                      </h3>
                      <Badge
                        color={getStatusColor(log.status)}
                        text={getStatusText(log.status)}
                        icon={getStatusIcon(log.status)}
                      />
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        {getChannelIcon(log.channel)}
                        <span className="ml-1 uppercase">{log.channel}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Khách hàng
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {log.customerName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {log.customerPhone} • {log.customerEmail}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Thời gian gửi
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {formatDateTime(log.sentAt)}
                        </p>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Nội dung đã gửi
                      </label>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {log.content}
                      </p>
                    </div>

                    {/* Error Message */}
                    {log.error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                        <p className="text-sm text-red-600 dark:text-red-400">
                          <strong>Lỗi:</strong> {log.error}
                        </p>
                      </div>
                    )}
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
              infoText="Hiển thị {start}-{end} của {total} nhật ký"
            />
          )}
        </>
      )}

      {/* Summary Stats */}
      <Card className="p-4 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Thống kê tổng quan
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats?.sentCount ||
                logs.filter((log) => log.status === "sent").length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Đã gửi</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {stats?.failedCount ||
                logs.filter((log) => log.status === "failed").length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Thất bại</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats?.smsCount ||
                logs.filter((log) => log.channel === "sms").length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">SMS</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats?.emailCount ||
                logs.filter((log) => log.channel === "email").length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotificationLogs;
