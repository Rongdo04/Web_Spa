import React from "react";

const AboutHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-lime-900 py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Về chúng tôi</h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed">
            Tạo nên không gian thư giãn hoàn hảo, mang đến trải nghiệm spa đẳng
            cấp với dịch vụ chuyên nghiệp và tận tâm
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-3xl font-bold text-emerald-200">10+</div>
              <div className="text-sm text-emerald-100">Năm kinh nghiệm</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-3xl font-bold text-emerald-200">50K+</div>
              <div className="text-sm text-emerald-100">
                Khách hàng hài lòng
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-3xl font-bold text-emerald-200">3</div>
              <div className="text-sm text-emerald-100">Chi nhánh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
