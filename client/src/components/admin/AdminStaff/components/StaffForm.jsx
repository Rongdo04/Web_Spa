import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const StaffForm = ({ staff, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    employeeId: "",
    image: "",
    workSchedule: {
      monday: { start: "09:00", end: "17:00", isWorking: true },
      tuesday: { start: "09:00", end: "17:00", isWorking: true },
      wednesday: { start: "09:00", end: "17:00", isWorking: true },
      thursday: { start: "09:00", end: "17:00", isWorking: true },
      friday: { start: "09:00", end: "17:00", isWorking: true },
      saturday: { start: "09:00", end: "17:00", isWorking: true },
      sunday: { start: "09:00", end: "17:00", isWorking: false },
    },
    daysOff: [],
    revenueShare: 0,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        phone: staff.phone || "",
        email: staff.email || "",
        employeeId: staff.employeeId || "",
        image: staff.image || "",
        workSchedule: staff.workSchedule || {
          monday: { start: "09:00", end: "17:00", isWorking: true },
          tuesday: { start: "09:00", end: "17:00", isWorking: true },
          wednesday: { start: "09:00", end: "17:00", isWorking: true },
          thursday: { start: "09:00", end: "17:00", isWorking: true },
          friday: { start: "09:00", end: "17:00", isWorking: true },
          saturday: { start: "09:00", end: "17:00", isWorking: true },
          sunday: { start: "09:00", end: "17:00", isWorking: false },
        },
        daysOff: staff.daysOff || [],
        revenueShare: staff.revenueShare
          ? Math.round(staff.revenueShare * 100)
          : 0,
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleWorkScheduleChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      workSchedule: {
        ...prev.workSchedule,
        [day]: {
          ...prev.workSchedule[day],
          [field]: value,
        },
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên nhân viên là bắt buộc";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Mã nhân viên là bắt buộc";
    }

    if (formData.revenueShare < 0 || formData.revenueShare > 100) {
      newErrors.revenueShare = "Tỷ lệ doanh thu phải từ 0-100%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Convert percentage to decimal for saving
      const dataToSave = {
        ...formData,
        revenueShare: formData.revenueShare / 100,
      };
      await onSave(dataToSave);
    } catch (error) {
      console.error("Error saving staff:", error);
    } finally {
      setLoading(false);
    }
  };

  const days = [
    { key: "monday", label: "Thứ 2" },
    { key: "tuesday", label: "Thứ 3" },
    { key: "wednesday", label: "Thứ 4" },
    { key: "thursday", label: "Thứ 5" },
    { key: "friday", label: "Thứ 6" },
    { key: "saturday", label: "Thứ 7" },
    { key: "sunday", label: "Chủ nhật" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {staff ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên nhân viên *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập tên nhân viên"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã nhân viên *
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.employeeId ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập mã nhân viên"
              />
              {errors.employeeId && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL ảnh đại diện
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tỷ lệ doanh thu (%)
              </label>
              <input
                type="number"
                name="revenueShare"
                value={formData.revenueShare}
                onChange={handleChange}
                min="0"
                max="100"
                step="1"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.revenueShare ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0"
              />
              {errors.revenueShare && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.revenueShare}
                </p>
              )}
            </div>
          </div>

          {/* Work Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Lịch làm việc
            </label>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day.key} className="flex items-center space-x-4">
                  <div className="w-20">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.workSchedule[day.key].isWorking}
                        onChange={(e) =>
                          handleWorkScheduleChange(
                            day.key,
                            "isWorking",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      {day.label}
                    </label>
                  </div>
                  {formData.workSchedule[day.key].isWorking && (
                    <>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Từ
                        </label>
                        <input
                          type="time"
                          value={formData.workSchedule[day.key].start}
                          onChange={(e) =>
                            handleWorkScheduleChange(
                              day.key,
                              "start",
                              e.target.value
                            )
                          }
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Đến
                        </label>
                        <input
                          type="time"
                          value={formData.workSchedule[day.key].end}
                          onChange={(e) =>
                            handleWorkScheduleChange(
                              day.key,
                              "end",
                              e.target.value
                            )
                          }
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Đang lưu..." : staff ? "Cập nhật" : "Tạo mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;
