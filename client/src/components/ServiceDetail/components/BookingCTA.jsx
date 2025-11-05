import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../ui";

const BookingCTA = ({ service, selectedStaff }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleBooking = () => {
    // Navigate to booking flow with service and staff data
    navigate("/booking", {
      state: {
        bookingData: {
          service: {
            id: service.id || service._id,
            name: service.name,
            duration: service.duration,
            price: service.price,
            images: service.images || [],
            description: service.description,
          },
          staff: selectedStaff || null,
        },
      },
    });
  };

  return (
    <Card className="p-6 sticky top-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Tóm tắt đặt lịch
      </h3>

      <div className="space-y-4">
        {/* Service Info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            {service.images && service.images.length > 0 ? (
              <img
                src={service.images[0]}
                alt={service.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500 font-medium text-lg">
                {service.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{service.name}</h4>
            <p className="text-sm text-gray-600">{service.duration} phút</p>
          </div>
          <span className="font-semibold text-emerald-600">
            {formatPrice(service.price)}
          </span>
        </div>

        {/* Selected Options */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Nhân viên:</span>
            <span className="text-gray-900">
              {selectedStaff ? "Đã chọn" : "Tự động sắp xếp"}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Tổng cộng:</span>
            <span className="text-emerald-600">
              {formatPrice(service.price)}
            </span>
          </div>
        </div>

        {/* Booking Button */}
        <Button onClick={handleBooking} size="lg" className="w-full">
          Đặt lịch ngay
        </Button>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Có thể hủy/đổi lịch trước 24h</p>
          <p>• Thanh toán khi đến spa</p>
          <p>• Xác nhận qua SMS/Email</p>
        </div>
      </div>
    </Card>
  );
};

export default BookingCTA;
