import React from "react";

const AboutAwards = () => {
  const awards = [
    {
      year: "2024",
      title: "Spa tốt nhất TP.HCM",
      organization: "Vietnam Spa Awards",
      description: "Giải thưởng danh giá nhất trong ngành spa Việt Nam",
    },
    {
      year: "2023",
      title: "Dịch vụ khách hàng xuất sắc",
      organization: "Customer Service Excellence",
      description: "Ghi nhận sự tận tâm và chuyên nghiệp trong phục vụ",
    },
    {
      year: "2023",
      title: "Spa 5 sao quốc tế",
      organization: "International Spa Association",
      description: "Chứng nhận đạt tiêu chuẩn spa 5 sao quốc tế",
    },
    {
      year: "2022",
      title: "Thương hiệu spa uy tín",
      organization: "Vietnam Brand Awards",
      description: "Công nhận thương hiệu spa đáng tin cậy nhất",
    },
    {
      year: "2022",
      title: "Dịch vụ massage tốt nhất",
      organization: "Wellness & Beauty Awards",
      description: "Ghi nhận chất lượng dịch vụ massage hàng đầu",
    },
    {
      year: "2021",
      title: "Spa thân thiện môi trường",
      organization: "Green Spa Awards",
      description: "Cam kết sử dụng sản phẩm thân thiện môi trường",
    },
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Giải thưởng & Chứng nhận
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Những thành tựu và sự ghi nhận từ các tổ chức uy tín trong ngành
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {award.year}
                </div>
                <div className="text-2xl">🏆</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {award.title}
              </h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                {award.organization}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Trải nghiệm dịch vụ đẳng cấp
            </h3>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Hãy để chúng tôi mang đến cho bạn những phút giây thư giãn tuyệt
              vời với dịch vụ spa chuyên nghiệp và tận tâm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-center"
              >
                Đặt lịch ngay
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors text-center"
              >
                Xem dịch vụ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAwards;
