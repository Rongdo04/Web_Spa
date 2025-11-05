// components/admin/AdminAppointments/components/AppointmentForm.jsx
import React, { useState, useEffect } from "react";
import { Modal } from "../../../ui";
import { Button } from "../../../ui";
import { Input } from "../../../ui";
import { Select } from "../../../ui";
import { Textarea } from "../../../ui";
import { LoadingSpinner } from "../../../ui";
import {
  adminServicesAPI,
  adminStaffAPI,
  adminAppointmentsAPI,
  adminUsersAPI,
} from "../../../../services";

const AppointmentForm = ({
  isOpen,
  onClose,
  onSubmit,
  appointment = null,
  mode = "create", // create or edit
}) => {
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    email: "",
    service: "",
    staff: "",
    date: "",
    time: "",
    duration: 60,
    notes: "",
    status: "pending",
  });

  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  const [conflicts, setConflicts] = useState([]);
  const [isCheckingConflicts, setIsCheckingConflicts] = useState(false);
  const [services, setServices] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingStaff, setLoadingStaff] = useState(false);

  const statusOptions = [
    { value: "pending", label: "Chờ xác nhận" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  // Load services, staff, and customers when component mounts or modal opens
  useEffect(() => {
    if (isOpen) {
      loadServices();
      loadStaff();
      loadCustomers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (appointment) {
      // Find service and staff IDs from names
      const serviceId =
        services.find((s) => s.label === appointment.service)?.value || "";
      const staffId =
        staffMembers.find((s) => s.label === appointment.staff)?.value || "";

      setFormData({
        customer: appointment.customer || "",
        phone: appointment.phone || "",
        email: appointment.email || "",
        service: serviceId,
        staff: staffId,
        date: appointment.date || "",
        time: appointment.time || "",
        duration: appointment.duration || 60,
        notes: appointment.notes || "",
        status: appointment.status || "pending",
      });
    } else {
      // Reset form for new appointment
      setFormData({
        customer: "",
        phone: "",
        email: "",
        service: "",
        staff: "",
        date: "",
        time: "",
        duration: 60,
        notes: "",
        status: "pending",
      });
      setSelectedCustomerId("");
    }
    setConflicts([]);
  }, [appointment, isOpen, services, staffMembers]);

  const loadServices = async () => {
    setLoadingServices(true);
    try {
      const response = await adminServicesAPI.list({
        status: "active",
        limit: 100,
      });
      if (response.success) {
        const servicesArray = response.data?.services || response.data || [];
        const servicesData = servicesArray.map((service) => ({
          value: service._id || service.id || service.value,
          label: service.name || service.label,
          duration: service.duration || 60,
          price: service.price || 0,
          description: service.description,
        }));
        setServices(servicesData);
      } else {
        // Fallback data for testing
        setServices([
          {
            value: "service1",
            label: "Massage thư giãn",
            duration: 60,
            price: 300000,
            description: "Massage toàn thân",
          },
          {
            value: "service2",
            label: "Chăm sóc da mặt",
            duration: 90,
            price: 500000,
            description: "Chăm sóc da chuyên nghiệp",
          },
        ]);
      }
    } catch (error) {
      // Fallback data on error
      setServices([
        {
          value: "service1",
          label: "Massage thư giãn",
          duration: 60,
          price: 300000,
          description: "Massage toàn thân",
        },
        {
          value: "service2",
          label: "Chăm sóc da mặt",
          duration: 90,
          price: 500000,
          description: "Chăm sóc da chuyên nghiệp",
        },
      ]);
    } finally {
      setLoadingServices(false);
    }
  };

  const loadStaff = async () => {
    setLoadingStaff(true);
    try {
      const response = await adminStaffAPI.list({
        status: "active",
        limit: 100,
      });
      if (response.success) {
        const staffArray = response.data?.staff || response.data || [];
        const staffData = staffArray.map((staff) => ({
          value: staff._id || staff.id || staff.value,
          label: staff.name || staff.label,
          specialties: staff.specialties || [],
          phone: staff.phone,
          email: staff.email,
        }));
        setStaffMembers(staffData);
      } else {
        // Fallback data for testing
        setStaffMembers([
          {
            value: "staff1",
            label: "Nguyễn Văn A",
            specialties: ["service1"],
            phone: "0123456789",
            email: "nguyenvana@email.com",
          },
          {
            value: "staff2",
            label: "Trần Thị B",
            specialties: ["service2"],
            phone: "0987654321",
            email: "tranthib@email.com",
          },
        ]);
      }
    } catch (error) {
      // Fallback data on error
      setStaffMembers([
        {
          value: "staff1",
          label: "Nguyễn Văn A",
          specialties: ["service1"],
          phone: "0123456789",
          email: "nguyenvana@email.com",
        },
        {
          value: "staff2",
          label: "Trần Thị B",
          specialties: ["service2"],
          phone: "0987654321",
          email: "tranthib@email.com",
        },
      ]);
    } finally {
      setLoadingStaff(false);
    }
  };

  const loadCustomers = async () => {
    setLoadingCustomers(true);
    try {
      const response = await adminUsersAPI.list({
        limit: 100,
        search: "",
        role: "user", // Only get users with role "user"
      });
      if (response.success) {
        const customersArray = response.data?.users || response.data || [];
        const customersData = customersArray.map((customer) => ({
          value: customer._id || customer.id || customer.value,
          label: `${customer.name || customer.label} - ${customer.phone || ""}`,
          name: customer.name || customer.label,
          phone: customer.phone || "",
          email: customer.email || "",
        }));
        setCustomers(customersData);
      } else {
        // Fallback data for testing
        setCustomers([
          {
            value: "customer1",
            label: "Nguyễn Văn A - 0123456789",
            name: "Nguyễn Văn A",
            phone: "0123456789",
            email: "nguyenvana@email.com",
          },
          {
            value: "customer2",
            label: "Trần Thị B - 0987654321",
            name: "Trần Thị B",
            phone: "0987654321",
            email: "tranthib@email.com",
          },
        ]);
      }
    } catch (error) {
      // Fallback data on error
      setCustomers([
        {
          value: "customer1",
          label: "Nguyễn Văn A - 0123456789",
          name: "Nguyễn Văn A",
          phone: "0123456789",
          email: "nguyenvana@email.com",
        },
        {
          value: "customer2",
          label: "Trần Thị B - 0987654321",
          name: "Trần Thị B",
          phone: "0987654321",
          email: "tranthib@email.com",
        },
      ]);
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-set duration when service changes
    if (field === "service") {
      const selectedService = services.find((s) => s.value === value);
      if (selectedService) {
        setFormData((prev) => ({
          ...prev,
          duration: selectedService.duration,
        }));
      }
    }

    // Clear conflicts when important fields change
    if (["staff", "date", "time", "duration"].includes(field)) {
      setConflicts([]);
    }
  };

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId);

    if (customerId) {
      const selectedCustomer = customers.find((c) => c.value === customerId);
      if (selectedCustomer) {
        setFormData((prev) => ({
          ...prev,
          customer: selectedCustomer.name,
          phone: selectedCustomer.phone,
          email: selectedCustomer.email,
        }));
      }
    } else {
      // Clear customer info when "Chọn khách hàng" is selected
      setFormData((prev) => ({
        ...prev,
        customer: "",
        phone: "",
        email: "",
      }));
    }
  };

  const checkConflicts = async () => {
    if (!formData.staff || !formData.date || !formData.time) {
      alert(
        "Vui lòng chọn nhân viên, ngày và giờ trước khi kiểm tra xung đột!"
      );
      return;
    }

    setIsCheckingConflicts(true);
    setConflicts([]); // Clear previous conflicts

    try {
      const params = {
        staffId: formData.staff,
        appointmentDate: formData.date,
        startTime: formData.time,
        duration: formData.duration || 60,
      };

      // Include appointment ID for edit mode to exclude current appointment
      if (mode === "edit" && appointment?.id) {
        params.excludeAppointmentId = appointment.id;
      }

      const response = await adminAppointmentsAPI.checkConflicts(params);

      if (response.success) {
        setConflicts(response.data.conflicts || []);
      } else {
        alert("Lỗi khi kiểm tra xung đột: " + response.message);
      }
    } catch (error) {
      alert("Lỗi khi kiểm tra xung đột: " + error.message);
    } finally {
      setIsCheckingConflicts(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.customer ||
      !formData.phone ||
      !formData.email ||
      !formData.service ||
      !formData.staff ||
      !formData.date ||
      !formData.time
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    if (conflicts.length > 0) {
      alert("Vui lòng giải quyết các xung đột trước khi lưu!");
      return;
    }

    // Get service and staff names from IDs
    const selectedService = services.find((s) => s.value === formData.service);
    const selectedStaff = staffMembers.find((s) => s.value === formData.staff);

    const appointmentData = {
      ...formData,
      serviceName: selectedService?.label || "",
      staffName: selectedStaff?.label || "",
      id: appointment?.id || Date.now(),
      createdAt: appointment?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(appointmentData);
    onClose();
  };

  const selectedService = services.find((s) => s.value === formData.service);
  const selectedStaff = staffMembers.find((s) => s.value === formData.staff);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === "create" ? "Tạo lịch hẹn mới" : "Chỉnh sửa lịch hẹn"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-800 mb-3">
              Chọn khách hàng (Tùy chọn)
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Khách hàng có sẵn
              </label>
              {loadingCustomers ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm text-gray-500">
                    Đang tải danh sách khách hàng...
                  </span>
                </div>
              ) : (
                <Select
                  value={selectedCustomerId}
                  onChange={handleCustomerSelect}
                  options={[
                    { value: "", label: "Chọn khách hàng hoặc để trống" },
                    ...customers,
                  ]}
                />
              )}
              <p className="text-xs text-gray-500 mt-1">
                Chọn khách hàng để tự động điền thông tin, hoặc để trống để nhập
                thông tin mới
              </p>
              {selectedCustomerId && (
                <div className="mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCustomerSelect("")}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    ✕ Xóa lựa chọn khách hàng
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên khách hàng *
              </label>
              <Input
                type="text"
                value={formData.customer}
                onChange={(e) => handleInputChange("customer", e.target.value)}
                required
                placeholder="Nhập tên khách hàng"
                disabled={selectedCustomerId !== ""}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại *
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                placeholder="Nhập số điện thoại"
                disabled={selectedCustomerId !== ""}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              placeholder="Nhập email"
              disabled={selectedCustomerId !== ""}
            />
          </div>

          {/* Service and Staff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dịch vụ *
              </label>
              {loadingServices ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm text-gray-500">
                    Đang tải dịch vụ...
                  </span>
                </div>
              ) : (
                <Select
                  value={formData.service}
                  onChange={(value) => handleInputChange("service", value)}
                  required
                  options={[{ value: "", label: "Chọn dịch vụ" }, ...services]}
                />
              )}
              {selectedService && (
                <div className="mt-2 text-sm text-gray-600">
                  <div>Thời gian: {selectedService.duration} phút</div>
                  <div>
                    Giá: {selectedService.price.toLocaleString("vi-VN")} VNĐ
                  </div>
                  {selectedService.description && (
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedService.description}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhân viên *
              </label>
              {loadingStaff ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm text-gray-500">
                    Đang tải nhân viên...
                  </span>
                </div>
              ) : (
                <Select
                  value={formData.staff}
                  onChange={(value) => handleInputChange("staff", value)}
                  required
                  options={[
                    { value: "", label: "Chọn nhân viên" },
                    ...staffMembers,
                  ]}
                />
              )}
              {selectedStaff && (
                <div className="mt-2 text-sm text-gray-600">
                  <div>Liên hệ: {selectedStaff.phone}</div>
                  {selectedStaff.email && (
                    <div>Email: {selectedStaff.email}</div>
                  )}
                  {selectedStaff.specialties &&
                    selectedStaff.specialties.length > 0 && (
                      <div>
                        Chuyên môn:{" "}
                        {selectedStaff.specialties
                          .map(
                            (s) =>
                              services.find((service) => service.value === s)
                                ?.label || s
                          )
                          .join(", ")}
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày *
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giờ *
              </label>
              <Select
                value={formData.time}
                onChange={(value) => handleInputChange("time", value)}
                required
                options={[
                  { value: "", label: "Chọn giờ" },
                  ...timeSlots.map((time) => ({ value: time, label: time })),
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời lượng (phút) *
              </label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  handleInputChange("duration", parseInt(e.target.value))
                }
                required
                min="15"
                max="300"
                step="15"
              />
            </div>
          </div>

          {/* Status and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <Select
                value={formData.status}
                onChange={(value) => handleInputChange("status", value)}
                options={statusOptions}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghi chú
              </label>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Ghi chú thêm (tùy chọn)"
                rows={3}
              />
            </div>
          </div>

          {/* Conflict Check */}
          {formData.staff && formData.date && formData.time && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Kiểm tra xung đột
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={checkConflicts}
                  disabled={isCheckingConflicts}
                >
                  {isCheckingConflicts
                    ? "Đang kiểm tra..."
                    : "Kiểm tra xung đột"}
                </Button>
              </div>

              {conflicts.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="text-sm font-medium text-red-600">
                      Phát hiện {conflicts.length} xung đột:
                    </div>
                  </div>
                  <div className="space-y-2">
                    {conflicts.map((conflict) => (
                      <div
                        key={conflict.id}
                        className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-red-800">
                              {conflict.customer}
                            </div>
                            <div className="text-xs text-red-600 mt-1">
                              {conflict.time} - {conflict.duration} phút
                            </div>
                            <div className="text-xs text-red-600 mt-1">
                              Dịch vụ: {conflict.service}
                            </div>
                            <div className="text-xs text-red-500 mt-2">
                              {conflict.message}
                            </div>
                          </div>
                          <div className="text-xs text-red-400">
                            ID:{" "}
                            {conflict.appointmentId?.slice(-6) ||
                              conflict.id?.slice(-6)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {conflicts.length === 0 && !isCheckingConflicts && (
                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="text-sm text-green-600">
                    ✅ Không có xung đột nào được phát hiện - Có thể tạo lịch
                    hẹn
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={conflicts.length > 0}
            >
              {mode === "create" ? "Tạo lịch hẹn" : "Cập nhật"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentForm;
