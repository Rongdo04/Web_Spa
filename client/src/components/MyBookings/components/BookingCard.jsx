import React from "react";
import { Card, Badge } from "../../ui";
import { BookingReviews } from "./BookingReviews";

const BookingCard = ({ booking, activeTab }) => {
  // Debug log to check booking data
  console.log("BookingCard - booking data:", booking);
  console.log("BookingCard - serviceId:", booking.serviceId);

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

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "warning", label: "Chờ xác nhận" },
      confirmed: { variant: "info", label: "Đã xác nhận" },
      completed: { variant: "success", label: "Hoàn thành" },
      cancelled: { variant: "error", label: "Đã hủy" },
    };

    const config = statusConfig[status] || {
      variant: "outline",
      label: status,
    };
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Service Info */}
        <div className="flex items-start gap-4 flex-1">
          <img
            src={
              booking.serviceId?.images?.[0] || "/images/default-service.svg"
            }
            alt={booking.serviceId?.name || "Dịch vụ"}
            className="w-16 h-16 object-cover rounded-lg"
            onError={(e) => {
              // Use SVG placeholder to avoid infinite loop
              e.target.src = "/images/default-service.svg";
              e.target.onerror = null; // Prevent further error handling
            }}
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {booking.serviceId?.name || "Dịch vụ không xác định"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {booking.serviceId?.description || "Không có mô tả"}
                </p>
              </div>
              {getStatusBadge(booking.status)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium">Mã đặt lịch:</span>
                <span className="font-mono text-emerald-600">
                  {booking.appointmentNumber || booking._id || booking.id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Nhân viên:</span>
                <span>
                  {booking.staffId?.name || booking.staff || "Tự động sắp xếp"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Thời gian:</span>
                <span>
                  {formatDate(booking.appointmentDate || booking.date)} lúc{" "}
                  {booking.startTime || booking.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Thời lượng:</span>
                <span>
                  {booking.serviceId?.duration || booking.duration || 60} phút
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Tổng tiền:</span>
                <span className="font-semibold text-emerald-600">
                  {formatPrice(
                    booking.finalAmount ||
                      booking.totalPrice ||
                      booking.serviceId?.price ||
                      0
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section for completed bookings */}
      {activeTab === "completed" && (
        <div className="mt-4">
          <BookingReviews booking={booking} />
        </div>
      )}
    </Card>
  );
};

export { BookingCard };
