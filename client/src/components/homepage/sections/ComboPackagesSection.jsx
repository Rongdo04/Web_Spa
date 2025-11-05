import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Badge } from "../../ui";

const ComboPackagesSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const comboPackages = [
    {
      id: 1,
      name: "Gói Thư Giãn Cơ Bản",
      originalPrice: "1.200.000đ",
      price: "999.000đ",
      discount: "17%",
      services: ["Massage 60p", "Facial 90p"],
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=300&fit=crop",
      description: "Gói combo hoàn hảo cho người mới bắt đầu",
    },
    {
      id: 2,
      name: "Gói Premium Luxury",
      originalPrice: "2.500.000đ",
      price: "1.999.000đ",
      discount: "20%",
      services: ["Body Treatment", "Facial", "Foot Massage"],
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      description: "Trải nghiệm spa cao cấp nhất",
    },
    {
      id: 3,
      name: "Gói Cặp Đôi",
      originalPrice: "1.800.000đ",
      price: "1.499.000đ",
      discount: "17%",
      services: ["Massage cho 2 người", "Facial cho 2 người"],
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&h=300&fit=crop",
      description: "Dành cho cặp đôi muốn thư giãn cùng nhau",
    },
  ];

  // Auto-slide for combo packages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % comboPackages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [comboPackages.length]);

  return (
    <section id="packages" className="py-20 bg-white dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            Gói combo & khuyến mãi
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tiết kiệm hơn với các gói combo đặc biệt
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {comboPackages.map((pkg) => (
                <div key={pkg.id} className="w-full flex-shrink-0 px-4">
                  <Card variant="brand" className="overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="relative">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                        <Badge
                          variant="error"
                          className="absolute top-4 left-4"
                        >
                          -{pkg.discount}
                        </Badge>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
                          {pkg.name}
                        </h3>
                        <p className="text-gray-600 mb-6 dark:text-gray-300">
                          {pkg.description}
                        </p>
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3 dark:text-white">
                            Bao gồm:
                          </h4>
                          <ul className="space-y-2">
                            {pkg.services.map((service, index) => (
                              <li
                                key={index}
                                className="flex items-center text-gray-600 dark:text-gray-300"
                              >
                                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-3xl font-bold text-emerald-600">
                            {pkg.price}
                          </span>
                          <span className="text-xl text-gray-500 line-through">
                            {pkg.originalPrice}
                          </span>
                        </div>
                        <Button
                          size="lg"
                          className="w-full"
                          onClick={() => navigate("/services")}
                        >
                          Đặt gói combo
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? comboPackages.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-800 rounded-full p-3 shadow-lg transition-all"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === comboPackages.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-800 rounded-full p-3 shadow-lg transition-all"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {comboPackages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-emerald-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComboPackagesSection;
