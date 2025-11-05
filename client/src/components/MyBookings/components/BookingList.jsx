import React from "react";
import { Empty, Spin, Alert } from "antd";
import { BookingCard } from "./BookingCard";

const BookingList = ({
  bookings,
  activeTab,
  loading = false,
  error = null,
  onRetry,
}) => {
  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert
        message="Không thể tải danh sách đặt lịch"
        description={error}
        type="error"
        showIcon
        action={
          <button
            onClick={onRetry}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Thử lại
          </button>
        }
        className="mb-4"
      />
    );
  }
  if (bookings.length === 0) {
    const getEmptyMessage = () => {
      switch (activeTab) {
        case "upcoming":
          return {
            title: "Không có lịch sắp diễn ra",
            description:
              "Bạn chưa có lịch đặt nào sắp diễn ra. Hãy đặt lịch để trải nghiệm dịch vụ spa của chúng tôi.",
            actionText: "Đặt lịch ngay",
            actionLink: "/services",
          };
        case "completed":
          return {
            title: "Chưa có lịch hoàn thành",
            description:
              "Bạn chưa có lịch đặt nào đã hoàn thành. Hãy đặt lịch để trải nghiệm dịch vụ spa của chúng tôi.",
            actionText: "Đặt lịch ngay",
            actionLink: "/services",
          };
        case "cancelled":
          return {
            title: "Không có lịch đã hủy",
            description: "Bạn chưa có lịch đặt nào đã hủy. Đây là điều tốt!",
            actionText: "Đặt lịch ngay",
            actionLink: "/services",
          };
        default:
          return {
            title: "Không có lịch đặt",
            description: "Bạn chưa có lịch đặt nào.",
            actionText: "Đặt lịch ngay",
            actionLink: "/services",
          };
      }
    };

    const emptyMessage = getEmptyMessage();

    return (
      <Empty
        description={
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {emptyMessage.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {emptyMessage.description}
            </p>
            {emptyMessage.actionText && (
              <a
                href={emptyMessage.actionLink}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {emptyMessage.actionText}
              </a>
            )}
          </div>
        }
        className="py-12"
      />
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id || booking.id}
          booking={booking}
          activeTab={activeTab}
        />
      ))}
    </div>
  );
};

export { BookingList };
