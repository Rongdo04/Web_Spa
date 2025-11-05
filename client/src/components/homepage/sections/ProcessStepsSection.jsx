import React from "react";
import {
  ToolOutlined,
  CalendarOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const ProcessStepsSection = () => {
  const processSteps = [
    {
      step: 1,
      title: "Chọn dịch vụ",
      description: "Lựa chọn dịch vụ spa phù hợp với nhu cầu của bạn",
      icon: <ToolOutlined className="text-4xl text-emerald-600" />,
    },
    {
      step: 2,
      title: "Chọn thời gian & nhân viên",
      description: "Đặt lịch hẹn và chọn chuyên viên massage yêu thích",
      icon: <CalendarOutlined className="text-4xl text-emerald-600" />,
    },
    {
      step: 3,
      title: "Xác nhận & thanh toán",
      description: "Xác nhận thông tin và thanh toán để hoàn tất đặt lịch",
      icon: <CheckOutlined className="text-4xl text-emerald-600" />,
    },
  ];

  return (
    <section id="process" className="py-20 bg-gray-50 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quy trình đặt lịch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Chỉ 3 bước đơn giản để có trải nghiệm spa tuyệt vời
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.step} className="text-center relative">
              {/* Connecting Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-emerald-200 -z-10"></div>
              )}

              <div className="relative">
                <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  {step.icon}
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepsSection;
