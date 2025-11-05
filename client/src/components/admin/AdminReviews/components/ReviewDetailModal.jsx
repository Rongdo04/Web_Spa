import React from "react";
import { Modal, Button, Card } from "../../../ui";

const ReviewDetailModal = ({ review, isOpen, onClose }) => {
  if (!review) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Chi tiết đánh giá
          </h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* Review Content */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Thông tin khách hàng
            </h3>
            <div className="flex items-start gap-4">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={review.user?.avatar || "/images/default-service.svg"}
                alt={review.user?.name}
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">
                  {review.user?.name || "Khách hàng"}
                </h4>
                <p className="text-gray-600">{review.user?.email}</p>
                {review.user?.phone && (
                  <p className="text-gray-600">{review.user.phone}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Service & Booking Info */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Thông tin dịch vụ & lịch đặt
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Dịch vụ</h4>
                <p className="text-gray-600">
                  {review.service?.name || "Dịch vụ không xác định"}
                </p>
                {review.service?.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {review.service.description}
                  </p>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Lịch đặt</h4>
                <p className="text-gray-600">
                  Mã: {review.booking?.appointmentNumber || "N/A"}
                </p>
                {review.booking?.appointmentDate && (
                  <p className="text-sm text-gray-500">
                    Ngày:{" "}
                    {new Date(
                      review.booking.appointmentDate
                    ).toLocaleDateString("vi-VN")}
                  </p>
                )}
                {review.booking?.startTime && (
                  <p className="text-sm text-gray-500">
                    Giờ: {review.booking.startTime}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Rating & Comment */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Đánh giá & Nhận xét
            </h3>

            {/* Rating */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Đánh giá</h4>
              <div className="flex items-center gap-2">
                {renderStars(review.rating)}
                <span className="text-lg font-semibold text-gray-700">
                  {review.rating}/5 sao
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Nhận xét</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {review.comment || "Không có nhận xét"}
                </p>
              </div>
            </div>

            {/* Images */}
            {review.images && review.images.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Hình ảnh</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => {
                        // Open image in new tab
                        window.open(image, "_blank");
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Timestamps */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Thông tin thời gian
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Ngày tạo:</span>
                <p className="text-gray-600">{formatDate(review.createdAt)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Cập nhật lần cuối:
                </span>
                <p className="text-gray-600">{formatDate(review.updatedAt)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { ReviewDetailModal };
