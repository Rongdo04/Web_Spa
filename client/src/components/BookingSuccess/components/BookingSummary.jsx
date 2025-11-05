import React from "react";
import { Card } from "../../ui";

const BookingSummary = ({ appointmentData }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTotalPrice = () => {
    // If appointmentData has totalAmount (from API), use it
    if (appointmentData?.totalAmount !== undefined) {
      return appointmentData.totalAmount;
    }
    // Otherwise, calculate from service object (fallback data)
    if (typeof appointmentData?.service === "object") {
      return appointmentData?.service?.price || 0;
    }
    return 0;
  };

  const getTotalDuration = () => {
    // If appointmentData has duration (from API), use it
    if (appointmentData?.duration !== undefined) {
      return appointmentData.duration;
    }
    // Otherwise, calculate from service object (fallback data)
    if (typeof appointmentData?.service === "object") {
      return appointmentData?.service?.duration || 0;
    }
    return 0;
  };

  const getStaffName = () => {
    return appointmentData?.staff || "Tự động sắp xếp";
  };

  return (
    <Card className="p-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Thông tin đặt lịch
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Info */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Dịch vụ</h3>
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {typeof appointmentData?.service === "object"
                  ? appointmentData?.service?.name
                  : appointmentData?.service || "N/A"}
              </h4>
              <p className="text-sm text-gray-600">
                {getTotalDuration()} phút • {formatPrice(getTotalPrice())}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Chi tiết</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Mã đặt lịch:</span>
              <span className="font-medium font-mono text-emerald-600">
                {appointmentData?.appointmentNumber 
                  }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nhân viên:</span>
              <span className="font-medium">{getStaffName()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ngày:</span>
              <span className="font-medium">
                {appointmentData?.date
                  ? formatDate(appointmentData.date)
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Giờ:</span>
              <span className="font-medium">
                {appointmentData?.time || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Khách hàng:</span>
              <span className="font-medium">
                {typeof appointmentData?.customer === "object"
                  ? appointmentData?.customer?.name
                  : appointmentData?.customer || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trạng thái:</span>
              <span
                className={`font-medium px-2 py-1 rounded-full text-xs ${
                  appointmentData?.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : appointmentData?.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : appointmentData?.status === "completed"
                    ? "bg-blue-100 text-blue-800"
                    : appointmentData?.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {appointmentData?.status === "confirmed"
                  ? "Đã xác nhận"
                  : appointmentData?.status === "pending"
                  ? "Chờ xác nhận"
                  : appointmentData?.status === "completed"
                  ? "Hoàn thành"
                  : appointmentData?.status === "cancelled"
                  ? "Đã hủy"
                  : appointmentData?.status || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {appointmentData?.notes && (
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-3">Ghi chú</h3>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            {appointmentData.notes}
          </p>
        </div>
      )}
    </Card>
  );
};

export { BookingSummary };
