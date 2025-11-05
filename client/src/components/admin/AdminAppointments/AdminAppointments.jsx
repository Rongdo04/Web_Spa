// components/admin/AdminAppointments/AdminAppointments.jsx
import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminAppointmentsAPI } from "../../../services";
import {
  AppointmentCalendar,
  AppointmentFilters,
  AppointmentForm,
  QuickActions,
  AppointmentList,
} from "./components";
import { Button } from "../../ui";
import {
  CalendarOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const AdminAppointments = () => {
  const [view, setView] = useState("calendar"); // calendar or list
  const [filters, setFilters] = useState({});
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  // Helper function to transform API data to component format
  const transformAppointmentData = (apt) => {
    const transformed = {
      id: apt._id || apt.id,
      customer: apt.customerName || apt.customer?.name,
      phone: apt.customerPhone || apt.customer?.phone,
      email: apt.customerEmail || apt.customer?.email,
      service: apt.serviceName || apt.service?.name,
      staff: apt.staffName || apt.staff?.name,
      date: apt.appointmentDate,
      time: apt.startTime,
      duration: apt.duration,
      status: apt.status,
      notes: apt.notes || "",
      totalAmount: apt.totalAmount,
      createdAt: apt.createdAt,
      updatedAt: apt.updatedAt,
    };
    return transformed;
  };

  useEffect(() => {
    loadAppointments();
  }, [pagination.current, pagination.pageSize, filters, sortBy, sortOrder]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters.search]);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const apiParams = {
        page: pagination.current,
        limit: pagination.pageSize,
        search: filters.search || "",
        status: filters.status || "",
        service: filters.service || "",
        staff: filters.staff || "",
        startDate: filters.dateFrom || "",
        endDate: filters.dateTo || "",
        sortBy: sortBy,
        sortOrder: sortOrder,
      };

      const response = await adminAppointmentsAPI.list(apiParams);

      if (response.success) {
        const transformedAppointments = (response.data.appointments || []).map(
          transformAppointmentData
        );

        setAppointments(transformedAppointments);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pagination?.totalItems || 0,
          totalPages: response.data.pagination?.totalPages || 0,
        }));
      } else {
        }
    } catch (error) {
      } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Reset to page 1 when filters change
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

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    // Reset to page 1 when sorting changes
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Reset to page 1 when filters change
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleAppointmentClick = (appointment) => {
    setEditingAppointment(appointment);
    setIsFormOpen(true);
  };

  const handleAppointmentSelect = (appointmentIds) => {
    setSelectedAppointments(appointmentIds);
  };

  const handleBulkSelect = (appointmentIds) => {
    setSelectedAppointments(appointmentIds);
  };

  const handleAppointmentSubmit = async (appointmentData) => {
    try {
      if (editingAppointment) {
        // Update existing appointment
        const response = await adminAppointmentsAPI.update(
          editingAppointment.id,
          appointmentData
        );
        if (response.success) {
          // Show success toast
          toast.success("Cập nhật lịch hẹn thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Close modal after successful update
          setIsFormOpen(false);
          setEditingAppointment(null);

          // Reload appointments to ensure UI is updated
          await loadAppointments();
        } else {
          // Show error toast with detailed error message
          const errorMessage =
            response.error || response.message || "Có lỗi xảy ra";
          toast.error(`Cập nhật lịch hẹn thất bại: ${errorMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return;
        }
      } else {
        // Create new appointment
        const response = await adminAppointmentsAPI.create(appointmentData);
        if (response.success) {
          // Show success toast
          toast.success("Tạo lịch hẹn thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Close modal after successful creation
          setIsFormOpen(false);
          setEditingAppointment(null);

          // Reload appointments to ensure UI is updated
          await loadAppointments();
        } else {
          // Show error toast with detailed error message
          const errorMessage =
            response.error || response.message || "Có lỗi xảy ra";
          toast.error(`Tạo lịch hẹn thất bại: ${errorMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return;
        }
      }
    } catch (error) {
      // Show error toast with detailed error message
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi lưu lịch hẹn";
      toast.error(`Lỗi: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleActionComplete = async (appointmentId, updates) => {
    try {
      // Handle different types of updates
      let response;
      if (updates.status) {
        response = await adminAppointmentsAPI.updateStatus(
          appointmentId,
          updates.status
        );
      } else if (updates.staffId) {
        response = await adminAppointmentsAPI.assignStaff(
          appointmentId,
          updates.staffId
        );
      } else if (updates.appointmentDate || updates.startTime) {
        response = await adminAppointmentsAPI.reschedule(
          appointmentId,
          updates
        );
      } else {
        response = await adminAppointmentsAPI.update(appointmentId, updates);
      }

      if (response.success) {
        // Show success toast
        toast.success("Cập nhật lịch hẹn thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Reload appointments to ensure UI is updated
        await loadAppointments();
      } else {
        // Show error toast with detailed error message
        const errorMessage =
          response.error || response.message || "Có lỗi xảy ra";
        toast.error(`Cập nhật lịch hẹn thất bại: ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      // Show error toast with detailed error message
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi cập nhật lịch hẹn";
      toast.error(`Lỗi: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleBulkAction = async (appointmentIds, updates) => {
    try {
      // Update local state immediately for better UX
      setAppointments((prev) =>
        prev.map((apt) =>
          appointmentIds.includes(apt.id)
            ? { ...apt, ...updates, updatedAt: new Date().toISOString() }
            : apt
        )
      );

      // Clear selection
      setSelectedAppointments([]);

      // Reload appointments to ensure data consistency
      await loadAppointments();
    } catch (error) {
      }
  };

  const handleCreateNew = () => {
    setEditingAppointment(null);
    setIsFormOpen(true);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await adminAppointmentsAPI.remove(appointmentId);
      if (response.success) {
        // Show success toast
        toast.success("Xóa lịch hẹn thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Reload appointments to ensure UI is updated
        await loadAppointments();
      } else {
        // Show error toast with detailed error message
        const errorMessage =
          response.error || response.message || "Có lỗi xảy ra";
        toast.error(`Xóa lịch hẹn thất bại: ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      // Show error toast with detailed error message
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi xóa lịch hẹn";
      toast.error(`Lỗi: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const selectedAppointmentsData = appointments.filter((apt) =>
    selectedAppointments.includes(apt.id)
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <CalendarOutlined className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Quản lý lịch hẹn
              </h1>
              <p className="text-sm text-gray-600">
                Quản lý và theo dõi lịch hẹn khách hàng
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={view === "calendar" ? "primary" : "outline"}
                onClick={() => setView("calendar")}
              >
                <CalendarOutlined className="mr-1" />
                Lịch
              </Button>
              <Button
                variant={view === "list" ? "primary" : "outline"}
                onClick={() => setView("list")}
              >
                <UnorderedListOutlined className="mr-1" />
                Danh sách
              </Button>
            </div>
            <Button variant="primary" onClick={handleCreateNew}>
              <PlusOutlined className="mr-1" />
              Tạo lịch hẹn
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <AppointmentFilters
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Quick Actions */}
      {selectedAppointments.length > 0 && (
        <div className="mb-6">
          <QuickActions
            selectedAppointments={selectedAppointmentsData}
            onActionComplete={handleActionComplete}
            onBulkAction={handleBulkAction}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {view === "calendar" ? (
          <div className="lg:col-span-2">
            <AppointmentCalendar
              appointments={appointments}
              onAppointmentClick={handleAppointmentClick}
              onAppointmentDelete={handleDeleteAppointment}
              onDateSelect={(date) => {
                // Handle date selection
                }}
              loading={loading}
            />
          </div>
        ) : (
          <div className="lg:col-span-3">
            <AppointmentList
              appointments={appointments}
              onAppointmentClick={handleAppointmentClick}
              onAppointmentDelete={handleDeleteAppointment}
              onAppointmentSelect={handleAppointmentSelect}
              onBulkSelect={handleBulkSelect}
              selectedAppointments={selectedAppointments}
              loading={loading}
              pagination={pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>
        )}

        {/* Sidebar for calendar view */}
        {view === "calendar" && (
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Today's Summary */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Hôm nay
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Tổng lịch hẹn:
                    </span>
                    <span className="font-medium">
                      {
                        appointments.filter(
                          (apt) =>
                            apt.date === new Date().toISOString().split("T")[0]
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Đã xác nhận:</span>
                    <span className="font-medium text-green-600">
                      {
                        appointments.filter(
                          (apt) =>
                            apt.date ===
                              new Date().toISOString().split("T")[0] &&
                            apt.status === "confirmed"
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Chờ xác nhận:</span>
                    <span className="font-medium text-yellow-600">
                      {
                        appointments.filter(
                          (apt) =>
                            apt.date ===
                              new Date().toISOString().split("T")[0] &&
                            apt.status === "pending"
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Appointment Form Modal */}
      <AppointmentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingAppointment(null);
        }}
        onSubmit={handleAppointmentSubmit}
        appointment={editingAppointment}
        mode={editingAppointment ? "edit" : "create"}
      />

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AdminAppointments;
