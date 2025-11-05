import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const BookingTabs = ({ activeTab, onTabChange, bookingCounts }) => {
  const tabs = [
    {
      id: "upcoming",
      label: "Sắp diễn ra",
      count: bookingCounts.upcoming,
    },
    {
      id: "completed",
      label: "Đã hoàn thành",
      count: bookingCounts.completed,
    },
    {
      id: "cancelled",
      label: "Đã hủy",
      count: bookingCounts.cancelled,
    },
    {
      id: "change-password",
      label: "Đổi mật khẩu",
      count: null,
      icon: LockOutlined,
    },
    {
      id: "change-avatar",
      label: "Thay avatar",
      count: null,
      icon: UserOutlined,
    },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <tab.icon style={{ fontSize: "16px" }} />}
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    activeTab === tab.id
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export { BookingTabs };
