import React from "react";
import {
  HeartOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  StarOutlined,
  SafetyOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const AboutValues = () => {
  const values = [
    {
      icon: <HeartOutlined className="w-8 h-8 text-emerald-600" />,
      title: "Tận tâm phục vụ",
      description:
        "Chúng tôi luôn đặt khách hàng làm trung tâm, mang đến trải nghiệm dịch vụ tốt nhất với sự tận tâm và chu đáo trong từng chi tiết nhỏ.",
    },
    {
      icon: <CheckCircleOutlined className="w-8 h-8 text-emerald-600" />,
      title: "Chất lượng cao",
      description:
        "Sử dụng các sản phẩm và công nghệ tiên tiến nhất, đảm bảo mọi dịch vụ đều đạt tiêu chuẩn quốc tế và mang lại hiệu quả tối ưu.",
    },
    {
      icon: <TeamOutlined className="w-8 h-8 text-emerald-600" />,
      title: "Đội ngũ chuyên nghiệp",
      description:
        "Đội ngũ nhân viên được đào tạo bài bản, có chứng chỉ chuyên môn và kinh nghiệm lâu năm trong lĩnh vực làm đẹp và chăm sóc sức khỏe.",
    },
    {
      icon: <StarOutlined className="w-8 h-8 text-emerald-600" />,
      title: "Đổi mới liên tục",
      description:
        "Luôn cập nhật và áp dụng những công nghệ, phương pháp mới nhất trong ngành để mang đến trải nghiệm tốt nhất cho khách hàng.",
    },
    {
      icon: <CustomerServiceOutlined className="w-8 h-8 text-emerald-600" />,
      title: "Môi trường thân thiện",
      description:
        "Tạo dựng một không gian ấm áp, thân thiện nơi khách hàng có thể thư giãn hoàn toàn và cảm nhận được sự chăm sóc tận tình.",
    },
    {
      icon: <SafetyOutlined className="w-8 h-8 text-emerald-600" />,
      title: "An toàn tuyệt đối",
      description:
        "Đảm bảo mọi quy trình và sản phẩm đều an toàn, được kiểm định kỹ lưỡng và tuân thủ nghiêm ngặt các tiêu chuẩn vệ sinh, an toàn.",
    },
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Giá trị cốt lõi
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Những nguyên tắc và giá trị định hướng mọi hoạt động của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-emerald-600 dark:text-emerald-400 mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutValues;
