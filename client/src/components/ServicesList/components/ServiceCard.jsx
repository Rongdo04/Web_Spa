import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Badge } from "../../ui";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Card hover className="group">
      <div className="relative">
        <img
          src={
            service.images ||
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop"
          }
          alt={service.name}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
        />
        {service.badge && (
          <Badge
            variant={service.badge === "Hot" ? "error" : "info"}
            className="absolute top-3 right-3"
          >
            {service.badge}
          </Badge>
        )}
        {service.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{Math.round((1 - service.price / service.originalPrice) * 100)}%
          </div>
        )}
      </div>
      <Card.Content className="p-6">
        <div className="mb-3">
          <Badge variant="outline" className="mb-2">
            {service.category}
          </Badge>
          <Card.Title className="mb-2 line-clamp-2">{service.name}</Card.Title>
          <Card.Description className="text-sm line-clamp-2">
            {service.description}
          </Card.Description>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>⏱️ {service.duration} phút</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatPrice(service.price)}
            </span>
            {service.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(service.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Button
            size="sm"
            className="w-full"
            onClick={() =>
              navigate("/booking", {
                state: {
                  bookingData: {
                    service: service,
                  },
                },
              })
            }
          >
            Đặt ngay
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => navigate(`/services/${service.id}`)}
          >
            Xem chi tiết
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ServiceCard;
