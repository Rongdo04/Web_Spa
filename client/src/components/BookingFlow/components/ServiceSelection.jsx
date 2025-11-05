import React, { useState, useEffect, useCallback } from "react";
import { Card, Badge } from "../../ui";

const ServiceSelection = ({ service, onServiceChange }) => {
  const [selectedService, setSelectedService] = useState(service);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize component
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Sync state when props change
  useEffect(() => {
    if (service && service.id !== selectedService?.id) {
      setSelectedService(service);
    }
  }, [service?.id]);

  // Only call callbacks after initialization
  useEffect(() => {
    if (isInitialized && selectedService) {
      onServiceChange(selectedService);
    }
  }, [selectedService?.id, onServiceChange, isInitialized]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Dịch vụ đã chọn
        </h2>
        <p className="text-gray-600">Xác nhận dịch vụ spa bạn muốn đặt lịch</p>
      </div>

      {/* Selected Service Display */}
      {selectedService ? (
        <Card className="p-6 bg-emerald-50 border border-emerald-200">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
              {selectedService.images && selectedService.images.length > 0 ? (
                <img
                  src={selectedService.images[0]}
                  alt={selectedService.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500 font-medium text-2xl">
                  {selectedService.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedService.name}
                </h3>
                {selectedService.isFeatured && (
                  <Badge variant="error">Hot</Badge>
                )}
              </div>
              <p className="text-gray-600 mb-3">
                {selectedService.description}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>⏱️ {selectedService.duration} phút</span>
                <span className="text-lg font-semibold text-emerald-600">
                  {formatPrice(selectedService.price)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Chưa có dịch vụ nào được chọn</p>
          <p className="text-sm mt-2">
            Vui lòng quay lại bước trước để chọn dịch vụ
          </p>
        </div>
      )}
    </div>
  );
};

export { ServiceSelection };
