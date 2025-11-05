import React from "react";
import { XMarkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const StaffDetails = ({ staff, onClose, onEdit, onDelete }) => {
  const days = [
    { key: "monday", label: "Thứ 2" },
    { key: "tuesday", label: "Thứ 3" },
    { key: "wednesday", label: "Thứ 4" },
    { key: "thursday", label: "Thứ 5" },
    { key: "friday", label: "Thứ 6" },
    { key: "saturday", label: "Thứ 7" },
    { key: "sunday", label: "Chủ nhật" },
  ];

  const formatTime = (time) => {
    if (!time) return "N/A";
    return time;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Chi tiết nhân viên
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(staff)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              title="Chỉnh sửa"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(staff)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              title="Xóa"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Thông tin cơ bản
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Tên nhân viên
                  </label>
                  <p className="text-sm text-gray-900">{staff.name || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Mã nhân viên
                  </label>
                  <p className="text-sm text-gray-900">
                    {staff.employeeId || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Số điện thoại
                  </label>
                  <p className="text-sm text-gray-900">
                    {staff.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">
                    {staff.email || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Tỷ lệ doanh thu
                  </label>
                  <p className="text-sm text-gray-900">
                    {staff.revenueShare || 0}%
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Trạng thái
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      staff.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {staff.isActive ? "Hoạt động" : "Không hoạt động"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Thống kê
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Tổng lịch hẹn
                  </label>
                  <p className="text-sm text-gray-900">
                    {staff.stats?.totalAppointments || 0}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Lịch hẹn hoàn thành
                  </label>
                  <p className="text-sm text-gray-900">
                    {staff.stats?.completedAppointments || 0}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Lịch hẹn tháng này
                  </label>
                  <p className="text-sm text-gray-900">
                    {staff.stats?.appointmentsThisMonth || 0}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Ngày tạo
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatDate(staff.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Cập nhật lần cuối
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatDate(staff.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          {staff.skills && staff.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Kỹ năng
              </h3>
              <div className="flex flex-wrap gap-2">
                {staff.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Work Schedule */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Lịch làm việc
            </h3>
            <div className="space-y-2">
              {days.map((day) => (
                <div
                  key={day.key}
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {day.label}
                  </span>
                  <div className="flex items-center space-x-4">
                    {staff.workSchedule?.[day.key]?.isWorking ? (
                      <>
                        <span className="text-sm text-gray-600">
                          {formatTime(staff.workSchedule[day.key].start)} -{" "}
                          {formatTime(staff.workSchedule[day.key].end)}
                        </span>
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Làm việc
                        </span>
                      </>
                    ) : (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        Nghỉ
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Days Off */}
          {staff.daysOff && staff.daysOff.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Ngày nghỉ
              </h3>
              <div className="flex flex-wrap gap-2">
                {staff.daysOff.map((day, index) => (
                  <span
                    key={index}
                    className="inline-flex px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full"
                  >
                    {formatDate(day)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
