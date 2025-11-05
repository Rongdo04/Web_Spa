import React, { useState } from "react";
import { Button, Modal } from "../../ui";

const BookingActions = ({
  booking,
  activeTab,
  onCancelBooking,
  onRescheduleBooking,
}) => {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const handleReschedule = () => {
    setShowRescheduleModal(true);
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleRate = () => {
    setShowRatingModal(true);
  };

  const confirmReschedule = (newDate, newTime) => {
    if (onRescheduleBooking) {
      onRescheduleBooking(booking._id || booking.id, newDate, newTime);
    }
    setShowRescheduleModal(false);
  };

  const confirmCancel = (reason) => {
    if (onCancelBooking) {
      onCancelBooking(booking._id || booking.id, reason);
    }
    setShowCancelModal(false);
  };

  const submitRating = () => {
    // Mock rating function
    alert("Cảm ơn bạn đã đánh giá!");
    setShowRatingModal(false);
  };

  const renderActions = () => {
    switch (activeTab) {
      case "upcoming":
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReschedule}
              className="text-blue-600 hover:text-blue-700"
            >
              Đổi giờ
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="text-red-600 hover:text-red-700"
            >
              Hủy
            </Button>
          </>
        );
      case "completed":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRate}
            className="text-emerald-600 hover:text-emerald-700"
          >
            Đánh giá
          </Button>
        );
      case "cancelled":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReschedule}
            className="text-blue-600 hover:text-blue-700"
          >
            Đặt lại
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderActions()}

      {/* Reschedule Modal */}
      <Modal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        title="Yêu cầu đổi giờ"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn yêu cầu đổi giờ cho lịch đặt này không?
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Dịch vụ:</strong>{" "}
              {booking.serviceId?.name || "Dịch vụ không xác định"}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Thời gian hiện tại:</strong>{" "}
              {booking.appointmentDate || booking.date} lúc{" "}
              {booking.startTime || booking.time}
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowRescheduleModal(false)}
            >
              Hủy
            </Button>
            <Button onClick={confirmReschedule}>Xác nhận</Button>
          </div>
        </div>
      </Modal>

      {/* Cancel Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Hủy lịch đặt"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Bạn có chắc chắn muốn hủy lịch đặt này không?
          </p>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-700">
              <strong>Lưu ý:</strong> Hủy trong vòng 24 giờ sẽ tính 50% phí dịch
              vụ.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowCancelModal(false)}>
              Hủy
            </Button>
            <Button variant="error" onClick={confirmCancel}>
              Xác nhận hủy
            </Button>
          </div>
        </div>
      </Modal>

      {/* Rating Modal */}
      <Modal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Đánh giá dịch vụ"
      >
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Bạn hài lòng với dịch vụ này như thế nào?
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-3xl text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhận xét (tùy chọn)
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
              placeholder="Chia sẻ trải nghiệm của bạn..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowRatingModal(false)}>
              Hủy
            </Button>
            <Button onClick={submitRating}>Gửi đánh giá</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export { BookingActions };
