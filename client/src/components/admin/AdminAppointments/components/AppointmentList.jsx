// components/admin/AdminAppointments/components/AppointmentList.jsx
import React, { useState } from "react";
import { Card, Button, Checkbox, Pagination } from "../../../ui";
import {
  EyeOutlined,
  DeleteOutlined,
  UpOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  formatVietnamDate,
  formatVietnamTime,
  formatVietnamDateTime,
} from "../../../../utils/timezoneUtils.js";

const AppointmentList = ({
  appointments = [],
  onAppointmentClick,
  onAppointmentDelete,
  onAppointmentSelect,
  onBulkSelect,
  selectedAppointments = [],
  loading = false,
  pagination = null,
  onPageChange = null,
  onPageSizeChange = null,
  sortBy = "date",
  sortOrder = "desc",
  onSortChange = null,
}) => {
  const [localSortBy, setLocalSortBy] = useState("date");
  const [localSortOrder, setLocalSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Use server-side sorting if available, otherwise use local sorting
  const isServerSideSorting = onSortChange !== null;
  const currentSortBy = isServerSideSorting ? sortBy : localSortBy;
  const currentSortOrder = isServerSideSorting ? sortOrder : localSortOrder;

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xác nhận";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return formatVietnamDate(dateString, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    return formatVietnamTime(time);
  };

  const handleSort = (field) => {
    if (isServerSideSorting) {
      // Use server-side sorting
      if (currentSortBy === field) {
        onSortChange(field, currentSortOrder === "asc" ? "desc" : "asc");
      } else {
        onSortChange(field, "asc");
      }
    } else {
      // Use client-side sorting
      if (localSortBy === field) {
        setLocalSortOrder(localSortOrder === "asc" ? "desc" : "asc");
      } else {
        setLocalSortBy(field);
        setLocalSortOrder("asc");
      }
    }
  };

  // Only use client-side sorting if not using server-side sorting
  const sortedAppointments = isServerSideSorting
    ? appointments
    : [...appointments].sort((a, b) => {
        let aValue, bValue;

        switch (localSortBy) {
          case "date":
            aValue = new Date(a.date + " " + a.time);
            bValue = new Date(b.date + " " + b.time);
            break;
          case "customer":
            aValue = a.customer.toLowerCase();
            bValue = b.customer.toLowerCase();
            break;
          case "status":
            aValue = a.status;
            bValue = b.status;
            break;
          case "service":
            aValue = a.service.toLowerCase();
            bValue = b.service.toLowerCase();
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return localSortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return localSortOrder === "asc" ? 1 : -1;
        return 0;
      });

  // Pagination logic - use server-side if pagination props provided
  const isServerSidePagination = pagination && onPageChange && onPageSizeChange;

  const totalItems = isServerSidePagination
    ? pagination.total
    : sortedAppointments.length;
  const totalPages = isServerSidePagination
    ? pagination.totalPages
    : Math.ceil(totalItems / pageSize);
  const currentPageNum = isServerSidePagination
    ? pagination.current
    : currentPage;
  const pageSizeNum = isServerSidePagination ? pagination.pageSize : pageSize;

  const paginatedAppointments = isServerSidePagination
    ? appointments // Use appointments directly for server-side pagination
    : sortedAppointments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );

  const handlePageChange = (page) => {
    if (isServerSidePagination) {
      onPageChange(page, pageSizeNum);
    } else {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (current, size) => {
    if (isServerSidePagination) {
      onPageSizeChange(current, size);
    } else {
      setPageSize(size);
      setCurrentPage(1);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onBulkSelect(sortedAppointments.map((apt) => apt.id));
    } else {
      onBulkSelect([]);
    }
  };

  const handleSelectAppointment = (appointmentId, checked) => {
    if (checked) {
      onAppointmentSelect([...selectedAppointments, appointmentId]);
    } else {
      onAppointmentSelect(
        selectedAppointments.filter((id) => id !== appointmentId)
      );
    }
  };

  const isAllSelected =
    selectedAppointments.length === appointments.length &&
    appointments.length > 0;
  const isIndeterminate =
    selectedAppointments.length > 0 &&
    selectedAppointments.length < appointments.length;

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Danh sách lịch hẹn
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sắp xếp:</span>
            <select
              value={currentSortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="date">Ngày giờ</option>
              <option value="customer">Khách hàng</option>
              <option value="status">Trạng thái</option>
              <option value="service">Dịch vụ</option>
            </select>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSort(currentSortBy)}
            >
              {currentSortOrder === "asc" ? <UpOutlined /> : <DownOutlined />}
            </Button>
          </div>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Không có lịch hẹn nào
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 rounded-lg font-medium text-sm text-gray-700">
            <div className="col-span-1">
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </div>
            <div
              className="col-span-2 cursor-pointer"
              onClick={() => handleSort("customer")}
            >
              Khách hàng{" "}
              {currentSortBy === "customer" &&
                (currentSortOrder === "asc" ? (
                  <UpOutlined />
                ) : (
                  <DownOutlined />
                ))}
            </div>
            <div
              className="col-span-2 cursor-pointer"
              onClick={() => handleSort("service")}
            >
              Dịch vụ{" "}
              {currentSortBy === "service" &&
                (currentSortOrder === "asc" ? (
                  <UpOutlined />
                ) : (
                  <DownOutlined />
                ))}
            </div>
            <div className="col-span-2">Nhân viên</div>
            <div
              className="col-span-2 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Ngày giờ{" "}
              {currentSortBy === "date" &&
                (currentSortOrder === "asc" ? (
                  <UpOutlined />
                ) : (
                  <DownOutlined />
                ))}
            </div>
            <div
              className="col-span-2 cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Trạng thái{" "}
              {currentSortBy === "status" &&
                (currentSortOrder === "asc" ? (
                  <UpOutlined />
                ) : (
                  <DownOutlined />
                ))}
            </div>
            <div className="col-span-1">Thao tác</div>
          </div>

          {/* Appointments */}
          {paginatedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`grid grid-cols-12 gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                selectedAppointments.includes(appointment.id)
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white border-gray-200"
              }`}
              onClick={() => onAppointmentClick(appointment)}
            >
              <div className="col-span-1 flex items-center">
                <Checkbox
                  checked={selectedAppointments.includes(appointment.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelectAppointment(appointment.id, e.target.checked);
                  }}
                />
              </div>

              <div className="col-span-2">
                <div className="font-medium text-gray-900">
                  {appointment.customer}
                </div>
                <div className="text-sm text-gray-600">{appointment.phone}</div>
              </div>

              <div className="col-span-2">
                <div className="text-sm text-gray-900">
                  {appointment.service}
                </div>
                <div className="text-xs text-gray-600">
                  {appointment.duration} phút
                </div>
              </div>

              <div className="col-span-2">
                <div className="text-sm text-gray-900">{appointment.staff}</div>
              </div>

              <div className="col-span-2">
                <div className="text-sm text-gray-900">
                  {formatDate(appointment.date)}
                </div>
                <div className="text-sm font-medium text-blue-600">
                  {formatTime(appointment.time)}
                </div>
              </div>

              <div className="col-span-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {getStatusText(appointment.status)}
                </span>
              </div>

              <div className="col-span-1 flex items-center justify-end space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAppointmentClick(appointment);
                  }}
                >
                  <EyeOutlined className="mr-1" />
                  Xem
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm("Bạn có chắc chắn muốn xóa lịch hẹn này?")
                    ) {
                      onAppointmentDelete(appointment.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <DeleteOutlined className="mr-1" />
                  Xóa
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {appointments.length > 0 && (
        <Pagination
          current={currentPageNum}
          pageSize={pageSizeNum}
          total={totalItems}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 50]}
          infoText="Hiển thị {start}-{end} của {total} lịch hẹn"
        />
      )}
    </Card>
  );
};

export default AppointmentList;
