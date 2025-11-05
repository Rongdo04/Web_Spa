import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "../../ui";
import { mockServices as allServices } from "../../ServicesList/data/servicesData";
const RelatedServices = ({ bookingData }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Get related services (exclude current service)
  const getRelatedServices = () => {
    if (!bookingData?.service) return allServices.slice(0, 3);
    return allServices
      .filter((service) => service.id !== bookingData.service.id)
      .slice(0, 3);
  };

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Dịch vụ liên quan
      </h2>
      <p className="text-gray-600 mb-6">
        Khám phá thêm các dịch vụ spa khác có thể bạn sẽ thích
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {getRelatedServices().map((service) => (
          <div
            key={service.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/services/${service.id}`)}
          >
            <div className="flex items-start gap-3">
              <img
                src={service.image}
                alt={service.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {service.name}
                  </h4>
                  {service.badge && (
                    <Badge
                      variant={service.badge === "Hot" ? "error" : "info"}
                      className="text-xs"
                    >
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {service.duration} phút
                  </span>
                  <span className="font-semibold text-emerald-600 text-sm">
                    {formatPrice(service.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Button
          onClick={() => navigate("/services")}
          variant="outline"
          size="sm"
        >
          Xem tất cả dịch vụ
        </Button>
      </div>
    </Card>
  );
};

export { RelatedServices };
