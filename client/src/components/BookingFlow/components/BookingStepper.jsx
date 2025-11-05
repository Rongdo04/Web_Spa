import React from "react";
import {
  CheckOutlined,
  ToolOutlined,
  UserOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const BookingStepper = ({ currentStep, onStepClick }) => {
  const steps = [
    {
      id: 1,
      title: "Chọn dịch vụ",
      description: "Dịch vụ & bổ sung",
      icon: <ToolOutlined />,
    },
    {
      id: 2,
      title: "Chọn nhân viên",
      description: "Nhân viên phù hợp",
      icon: <UserOutlined />,
    },
    {
      id: 3,
      title: "Chọn thời gian",
      description: "Ngày & giờ",
      icon: <CalendarOutlined />,
    },
    {
      id: 4,
      title: "Thông tin khách",
      description: "Thông tin liên hệ",
      icon: <InfoCircleOutlined />,
    },
    {
      id: 5,
      title: "Xác nhận",
      description: "Kiểm tra & xác nhận",
      icon: <CheckCircleOutlined />,
    },
  ];

  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
        <div
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isClickable = currentStep > step.id || step.id === 1;

          return (
            <div key={step.id} className="flex flex-col items-center group">
              {/* Step Circle */}
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : isCurrent
                    ? "bg-emerald-100 text-emerald-600 border-2 border-emerald-600"
                    : "bg-gray-200 text-gray-400"
                } ${
                  isClickable
                    ? "hover:scale-110 cursor-pointer"
                    : "cursor-not-allowed"
                }`}
              >
                {isCompleted ? (
                  <CheckOutlined className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </button>

              {/* Step Info */}
              <div className="mt-3 text-center">
                <h3
                  className={`text-sm font-medium ${
                    isCurrent || isCompleted ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-xs ${
                    isCurrent || isCompleted ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { BookingStepper };
