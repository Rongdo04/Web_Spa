import React from "react";

const AboutStats = () => {
  const stats = [
    {
      number: "10+",
      label: "Năm kinh nghiệm",
      description: "Phục vụ khách hàng từ 2014",
    },
    {
      number: "50K+",
      label: "Khách hàng hài lòng",
      description: "Đánh giá 5 sao từ khách hàng",
    },
    {
      number: "3",
      label: "Chi nhánh",
      description: "Tại các quận trung tâm TP.HCM",
    },
    {
      number: "100+",
      label: "Nhân viên chuyên nghiệp",
      description: "Được đào tạo bài bản",
    },
    {
      number: "15+",
      label: "Dịch vụ đa dạng",
      description: "Từ massage đến chăm sóc da",
    },
    {
      number: "24/7",
      label: "Hỗ trợ khách hàng",
      description: "Hotline luôn sẵn sàng",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Thành tựu của chúng tôi
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Những con số ấn tượng phản ánh sự tin tưởng và hài lòng của khách
            hàng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-emerald-100 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-emerald-200">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutStats;
