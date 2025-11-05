import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Checkbox } from "../../ui";
import { adminAppointmentsAPI } from "../../../services";

const BookingConfirmation = ({ bookingData, onConfirm }) => {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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
    return bookingData.service ? bookingData.service.price : 0;
  };

  const getTotalDuration = () => {
    return bookingData.service ? bookingData.service.duration : 0;
  };

  const getStaffName = () => {
    if (!bookingData.staff) return "Tự động sắp xếp";
    // In real app, you'd fetch staff name from staff ID
    return "Nhân viên đã chọn";
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const appointmentData = {
        customer: bookingData.customer.name,
        phone: bookingData.customer.phone,
        email: bookingData.customer.email,
        service: bookingData.service.id,
        staff: bookingData.staff,
        date: bookingData.date,
        time: bookingData.time,
        duration: bookingData.service.duration,
        notes: bookingData.customer.notes || "",
        serviceName: bookingData.service.name,
        staffName: getStaffName(),
      };

      console.log("Submitting appointment:", appointmentData);
      const response = await adminAppointmentsAPI.create(appointmentData);
      console.log("Appointment created:", response);

      // Navigate to success page with appointmentNumber
      if (response.data?.appointmentNumber) {
        navigate(`/booking/success/${response.data.appointmentNumber}`);
      } else {
        // Fallback to original behavior
        onConfirm();
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      setSubmitError(
        error.response?.data?.message ||
          "Không thể tạo lịch hẹn. Vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Xác nhận đặt lịch
        </h2>
        <p className="text-gray-600">
          Vui lòng kiểm tra lại thông tin trước khi xác nhận
        </p>
      </div>

      {/* Service Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Thông tin dịch vụ
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <img
              src={bookingData.service?.image}
              alt={bookingData.service?.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">
                {bookingData.service?.name}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {bookingData.service?.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>⏱️ {getTotalDuration()} phút</span>
                <span>💰 {formatPrice(getTotalPrice())}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Booking Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Chi tiết đặt lịch
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Nhân viên</label>
            <p className="font-medium text-gray-900">{getStaffName()}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Ngày</label>
            <p className="font-medium text-gray-900">
              {bookingData.date ? formatDate(bookingData.date) : "Chưa chọn"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Giờ</label>
            <p className="font-medium text-gray-900">
              {bookingData.time || "Chưa chọn"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Thời lượng</label>
            <p className="font-medium text-gray-900">
              {getTotalDuration()} phút
            </p>
          </div>
        </div>
      </Card>

      {/* Customer Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Thông tin khách hàng
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Họ và tên</label>
            <p className="font-medium text-gray-900">
              {bookingData.customer.name || "Chưa nhập"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Số điện thoại</label>
            <p className="font-medium text-gray-900">
              {bookingData.customer.phone || "Chưa nhập"}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium text-gray-900">
              {bookingData.customer.email || "Không có"}
            </p>
          </div>
          {bookingData.customer.notes && (
            <div className="md:col-span-2">
              <label className="text-sm text-gray-500">Ghi chú</label>
              <p className="font-medium text-gray-900">
                {bookingData.customer.notes}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Price Summary */}
      <Card className="p-6 bg-emerald-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tóm tắt thanh toán
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Dịch vụ:</span>
            <span className="font-medium">
              {formatPrice(bookingData.service?.price || 0)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-emerald-600 border-t pt-2">
            <span>Tổng cộng:</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
        </div>
      </Card>

      {/* Terms and Conditions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Điều khoản và điều kiện
        </h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-emerald-600">•</span>
            <span>
              Bạn có thể hủy hoặc đổi lịch trước 24 giờ mà không mất phí
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-600">•</span>
            <span>Hủy trong vòng 24 giờ sẽ tính 50% phí dịch vụ</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-600">•</span>
            <span>
              Thanh toán khi đến spa, chúng tôi chấp nhận tiền mặt và thẻ
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-600">•</span>
            <span>Xác nhận lịch hẹn sẽ được gửi qua SMS và email</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-600">•</span>
            <span>
              Vui lòng đến đúng giờ hẹn, trễ quá 15 phút có thể bị hủy lịch
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <Checkbox
            checked={agreedToTerms}
            onChange={(checked) => setAgreedToTerms(checked)}
            className="mt-1"
          />
          <div>
            <p className="text-sm text-gray-700">
              Tôi đã đọc và đồng ý với{" "}
              <button className="text-emerald-600 hover:text-emerald-700 underline">
                điều khoản sử dụng
              </button>{" "}
              và{" "}
              <button className="text-emerald-600 hover:text-emerald-700 underline">
                chính sách bảo mật
              </button>
            </p>
          </div>
        </div>
      </Card>

      {/* Error Message */}
      {submitError && (
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{submitError}</p>
          </div>
        </div>
      )}

      {/* Confirmation Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!agreedToTerms || isSubmitting}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
            agreedToTerms && !isSubmitting
              ? "bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Đang tạo lịch hẹn..." : "Xác nhận đặt lịch"}
        </button>
        {!agreedToTerms && (
          <p className="text-sm text-gray-500 mt-2">
            Vui lòng đồng ý với điều khoản để tiếp tục
          </p>
        )}
      </div>
    </div>
  );
};

export { BookingConfirmation };
