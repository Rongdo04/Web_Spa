// components/admin/AdminDashboard/components/UpcomingBookings.jsx
import React from "react";
import { Card } from "../../../ui";
import { Button } from "../../../ui";

const UpcomingBookings = ({ data, loading = false }) => {
  // Use API data for upcoming bookings
  const bookingsData = data || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Filter bookings to show only future appointments
  const filteredBookings = bookingsData.filter((booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    return bookingDate >= today;
  });

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
        <h3 className="text-lg font-semibold text-gray-800">Lịch sắp tới</h3>
        <div className="text-sm text-gray-600">
          {filteredBookings.length} lịch hẹn
        </div>
      </div>

      {/* Bookings list */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Không có lịch hẹn sắp tới
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {booking.customer}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusText(booking.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Dịch vụ:</span>{" "}
                      {booking.service}
                    </div>
                    <div>
                      <span className="font-medium">Nhân viên:</span>{" "}
                      {booking.staff}
                    </div>
                    <div>
                      <span className="font-medium">Thời gian:</span>{" "}
                      {booking.time}
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-500">
                    📅 {formatDate(booking.date)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">
              {filteredBookings.filter((b) => b.status === "confirmed").length}
            </div>
            <div className="text-sm text-gray-600">Đã xác nhận</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {filteredBookings.filter((b) => b.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Chờ xác nhận</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {filteredBookings.filter((b) => b.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Hoàn thành</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UpcomingBookings;
