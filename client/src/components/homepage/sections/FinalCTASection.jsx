import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui";

const FinalCTASection = ({ contactInfo }) => {
  const navigate = useNavigate();

  // Default values if contactInfo is not available
  const defaultContactInfo = {
    businessName: "Spa Luxury",
    phone: "0123456789",
    email: "info@spa.com",
  };

  const info = contactInfo || defaultContactInfo;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CTA Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-6">
              Sẵn sàng trải nghiệm spa tuyệt vời?
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Đặt lịch ngay hôm nay để được tận hưởng dịch vụ spa chuyên nghiệp
              tại {info.businessName}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg"
                onClick={() => navigate("/services")}
              >
                Đặt lịch ngay
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-emerald-700"
                onClick={() => navigate("/about")}
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Liên hệ ngay
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <p className="text-sm text-emerald-200">Hotline</p>
                  <p className="text-lg font-semibold">{info.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <p className="text-sm text-emerald-200">Email</p>
                  <p className="text-lg font-semibold">{info.email}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white text-white hover:bg-white hover:text-emerald-700"
                  onClick={() => scrollToSection("contact")}
                >
                  Xem thông tin liên hệ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
