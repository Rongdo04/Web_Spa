import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui";
import {
  CalendarOutlined,
  EyeOutlined,
  StarOutlined,
  PhoneOutlined,
  HeartOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const HeroSection = ({ contactInfo }) => {
  const navigate = useNavigate();

  // Default values if contactInfo is not available
  const defaultContactInfo = {
    businessName: "Spa Luxury",
    businessDescription:
      "Khám phá không gian thư giãn tuyệt vời với các dịch vụ spa chuyên nghiệp, chuyên viên giàu kinh nghiệm và môi trường sang trọng.",
  };

  const info = contactInfo || defaultContactInfo;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-300/10 rounded-full translate-y-40 -translate-x-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Thư giãn hoàn hảo,
              <span className="block text-emerald-200">
                Tại {info.businessName}
              </span>
            </h1>
            <p className="text-xl mb-8 text-emerald-100 leading-relaxed">
              {info.businessDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg"
                onClick={() => navigate("/services")}
              >
                <CalendarOutlined className="mr-2" />
                Đặt lịch ngay
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white  hover:text-emerald-700"
                onClick={() => navigate("/services")}
              >
                <EyeOutlined className="mr-2" />
                Xem dịch vụ
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=600&fit=crop"
                alt="Spa Relaxation"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-300 rounded-full opacity-30"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-200 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartOutlined className="text-2xl text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Thư giãn tuyệt đối</h3>
            <p className="text-emerald-100">
              Không gian yên tĩnh, âm nhạc nhẹ nhàng giúp bạn thư giãn hoàn toàn
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserOutlined className="text-2xl text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Chuyên gia giàu kinh nghiệm
            </h3>
            <p className="text-emerald-100">
              Đội ngũ chuyên viên được đào tạo chuyên nghiệp, tay nghề cao
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <EnvironmentOutlined className="text-2xl text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Đặt lịch nhanh chóng</h3>
            <p className="text-emerald-100">
              Hệ thống đặt lịch online tiện lợi, xác nhận ngay lập tức
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
