import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Badge, ResponsiveGrid, LoadingSkeleton } from "../../ui";
import { servicesAPI } from "../../../services";

const FeaturedServicesSection = () => {
  const navigate = useNavigate();
  const [featuredServices, setFeaturedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load featured services from API
  useEffect(() => {
    const loadFeaturedServices = async () => {
      try {
        const response = await servicesAPI.getFeaturedServices(4);

        if (Array.isArray(response) && response.length > 0) {
          setFeaturedServices(response);
        } else {
          setFeaturedServices([]);
        }
      } catch (err) {
        console.error("❌ Error loading featured services:", err);
        setError(err.message);
        setFeaturedServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedServices();
  }, []);

  // Format price to Vietnamese currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format duration
  const formatDuration = (duration) => {
    return `${duration} phút`;
  };

  // Get service image
  const getServiceImage = (service) => {
    if (service.images && service.images.length > 0) {
      return service.images[0];
    }
    return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop";
  };

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <LoadingSkeleton variant="title" className="mx-auto mb-4 w-1/3" />
            <LoadingSkeleton variant="text" className="mx-auto w-1/2" />
          </div>
          <ResponsiveGrid.Card>
            {Array.from({ length: 4 }).map((_, index) => (
              <LoadingSkeleton.Card key={index} />
            ))}
          </ResponsiveGrid.Card>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-20 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dịch vụ nổi bật
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Các dịch vụ spa được yêu thích nhất
            </p>
          </div>
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Không thể tải dịch vụ
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Có lỗi xảy ra khi tải danh sách dịch vụ nổi bật. Vui lòng thử
                lại sau!
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
              >
                Thử lại
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dịch vụ nổi bật
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Các dịch vụ spa được yêu thích nhất
          </p>
        </div>
        <ResponsiveGrid.Card>
          {featuredServices && featuredServices.length > 0 ? (
            featuredServices.map((service) => (
              <Card key={service.id} hover className="group">
                <div className="relative">
                  <img
                    src={getServiceImage(service)}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  {service.isFeatured && (
                    <Badge variant="error" className="absolute top-3 right-3">
                      Nổi bật
                    </Badge>
                  )}
                </div>
                <Card.Content className="p-6">
                  <Card.Title className="mb-2">{service.name}</Card.Title>
                  <Card.Description className="mb-4">
                    {service.description}
                  </Card.Description>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ⏱️ {formatDuration(service.duration)}
                    </span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => navigate("/services")}
                  >
                    Đặt lịch ngay
                  </Button>
                </Card.Content>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Chưa có dịch vụ nổi bật
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Hiện tại chưa có dịch vụ nào được đánh dấu là nổi bật. Vui
                  lòng quay lại sau!
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/services")}
                  className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                >
                  Xem tất cả dịch vụ
                </Button>
              </div>
            </div>
          )}
        </ResponsiveGrid.Card>
      </div>
    </section>
  );
};

export default FeaturedServicesSection;
