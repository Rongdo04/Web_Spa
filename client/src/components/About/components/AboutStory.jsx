import React from "react";

const AboutStory = () => {
  return (
    <div className="py-20 bg-white dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Câu chuyện của chúng tôi
            </h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Từ một ước mơ nhỏ bé về việc mang đến sự thư giãn và chăm sóc
                sức khỏe cho mọi người, chúng tôi đã xây dựng nên một hệ thống
                spa chuyên nghiệp với tiêu chuẩn quốc tế.
              </p>
              <p className="text-lg leading-relaxed">
                Với hơn 10 năm kinh nghiệm trong ngành làm đẹp và chăm sóc sức
                khỏe, chúng tôi hiểu rằng mỗi khách hàng đều có nhu cầu và mong
                muốn riêng. Đó là lý do chúng tôi luôn tận tâm trong từng dịch
                vụ.
              </p>
              <p className="text-lg leading-relaxed">
                Từ những ngày đầu với chỉ một chi nhánh nhỏ, đến nay chúng tôi
                đã mở rộng thành 3 chi nhánh tại TP.HCM, phục vụ hơn 50,000
                khách hàng mỗi năm với sự hài lòng tuyệt đối.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                alt="Spa interior"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  Không gian thư giãn
                </h3>
                <p className="text-sm opacity-90">
                  Thiết kế hiện đại, sang trọng
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-lime-100 dark:bg-lime-900/30 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
