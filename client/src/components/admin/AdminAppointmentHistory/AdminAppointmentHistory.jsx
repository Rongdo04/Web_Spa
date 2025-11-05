// components/admin/AdminAppointmentHistory/AdminAppointmentHistory.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  Badge,
  LoadingSpinner,
  EmptyState,
  ErrorState,
  Pagination,
} from "../../ui";
import {
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import adminAppointmentsAPI from "../../../services/admin/adminAppointmentsAPI";

const AdminAppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    service: "",
    staff: "",
    dateFrom: "",
    dateTo: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  // Load appointments from API
  useEffect(() => {
    loadAppointments();
  }, [pagination.current, pagination.pageSize, filters]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminAppointmentsAPI.list({
        page: pagination.current,
        limit: pagination.pageSize,
        search: filters.search,
        status: filters.status,
        service: filters.service,
        staff: filters.staff,
        startDate: filters.dateFrom,
        endDate: filters.dateTo,
      });

      if (response.success) {
        const transformedAppointments = (response.data.appointments || []).map(
          (apt) => ({
            id: apt.id,
            customer: apt.customerName,
            phone: apt.customerPhone,
            email: apt.customerEmail,
            service: apt.serviceName,
            staff: apt.staffName,
            date: apt.appointmentDate,
            time: apt.startTime,
            duration: apt.duration,
            status: apt.status,
            notes: apt.notes || "",
            totalAmount: apt.totalAmount,
            createdAt: apt.createdAt,
            updatedAt: apt.updatedAt,
          })
        );

        setAppointments(transformedAppointments);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pagination?.totalItems || 0,
          totalPages: response.data.pagination?.totalPages || 0,
        }));
      } else {
        setError(response.message || "Không thể tải dữ liệu");
      }
    } catch (err) {
      setError("Lỗi khi tải dữ liệu lịch hẹn");
      } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Reset to page 1 when filters change
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      search: "",
      status: "",
      service: "",
      staff: "",
      dateFrom: "",
      dateTo: "",
    });
    // Reset to page 1 when clearing filters
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize,
    }));
  };

  const handlePageSizeChange = (current, size) => {
    setPagination((prev) => ({
      ...prev,
      current: 1, // Reset to first page when changing page size
      pageSize: size,
    }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "yellow", text: "Chờ xác nhận" },
      confirmed: { color: "blue", text: "Đã xác nhận" },
      "in-progress": { color: "purple", text: "Đang thực hiện" },
      completed: { color: "green", text: "Hoàn thành" },
      cancelled: { color: "red", text: "Đã hủy" },
      "no-show": { color: "gray", text: "Không đến" },
    };

    const config = statusConfig[status] || { color: "gray", text: status };
    return (
      <Badge color={config.color} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  if (loading && appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadAppointments}
        retryText="Thử lại"
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Lịch sử lịch hẹn
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Xem tất cả lịch hẹn đã được tạo trong hệ thống
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={loadAppointments}
            disabled={loading}
          >
            <ReloadOutlined className="mr-1" />
            Làm mới
          </Button>
          
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Bộ lọc
          </h3>
          {hasActiveFilters && (
            <Button size="sm" variant="outline" onClick={handleClearFilters}>
              Xóa bộ lọc
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tìm kiếm
            </label>
            <Input
              type="text"
              placeholder="Tên khách hàng, SĐT, ghi chú..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Trạng thái
            </label>
            <Select
              value={filters.status}
              onChange={(value) => handleFilterChange("status", value)}
              options={[
                { value: "", label: "Tất cả trạng thái" },
                { value: "pending", label: "Chờ xác nhận" },
                { value: "confirmed", label: "Đã xác nhận" },
                { value: "in-progress", label: "Đang thực hiện" },
                { value: "completed", label: "Hoàn thành" },
                { value: "cancelled", label: "Đã hủy" },
                { value: "no-show", label: "Không đến" },
              ]}
            />
          </div>

          {/* Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Từ ngày
            </label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Đến ngày
            </label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Danh sách lịch hẹn
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Hiển thị {appointments.length} lịch hẹn
          </div>
        </div>

        {appointments.length === 0 ? (
          <EmptyState
            icon={<CalendarOutlined />}
            title="Không có lịch hẹn"
            description="Không tìm thấy lịch hẹn nào phù hợp với bộ lọc"
          />
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {appointment.customer}
                      </h4>
                      {getStatusBadge(appointment.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CalendarOutlined className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {appointment.date}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <ClockCircleOutlined className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {appointment.time}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <UserOutlined className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {appointment.staff}
                        </span>
                      </div>

                      <div className="text-gray-600 dark:text-gray-400">
                        {appointment.service}
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <strong>Ghi chú:</strong> {appointment.notes}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(appointment.totalAmount)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Tạo:{" "}
                      {new Date(appointment.createdAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 50]}
          infoText="Hiển thị {start}-{end} của {total} lịch hẹn"
        />
      </Card>
    </div>
  );
};

export default AdminAppointmentHistory;
