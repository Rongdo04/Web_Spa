// components/admin/AdminDashboard/components/KPICards.jsx
import React from "react";
import { Card } from "../../../ui";

const KPICards = ({ data, loading = false }) => {
  const kpiData = [
    {
      title: "Tổng lịch hẹn",
      value: data?.totalAppointments || 0,
      icon: "📅",
      color: "bg-blue-500",
      description: "Cuộc hẹn",
    },
    {
      title: "Lịch hôm nay",
      value: data?.todayAppointments || 0,
      icon: "📅",
      color: "bg-blue-600",
      description: "Cuộc hẹn hôm nay",
    },
    {
      title: "Doanh thu hôm nay",
      value: data?.todayRevenue || 0,
      icon: "💰",
      color: "bg-green-500",
      description: "VNĐ",
      format: "currency",
    },
    {
      title: "Doanh thu tổng",
      value: data?.totalRevenue || 0,
      icon: "💰",
      color: "bg-purple-500",
      description: "VNĐ",
      format: "currency",
    },
    {
      title: "Tỷ lệ hủy",
      value: data?.cancellationRate || 0,
      icon: "❌",
      color: "bg-red-500",
      description: "%",
      format: "percentage",
    },
    {
      title: "CSAT",
      value: data?.csatScore || 0,
      icon: "⭐",
      color: "bg-yellow-500",
      description: "/5.0",
      format: "rating",
    },
    {
      title: "Khách hàng",
      value: data?.totalCustomers || 0,
      icon: "👥",
      color: "bg-indigo-500",
      description: "Khách hàng",
    },
    {
      title: "Dịch vụ",
      value: data?.totalServices || 0,
      icon: "🛍️",
      color: "bg-pink-500",
      description: "Dịch vụ",
    },
    {
      title: "Nhân viên",
      value: data?.totalStaff || 0,
      icon: "👨‍💼",
      color: "bg-teal-500",
      description: "Nhân viên",
    },
  ];

  const formatValue = (value, format) => {
    if (loading) return "...";

    switch (format) {
      case "currency":
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value);
      case "percentage":
        return `${value}%`;
      case "rating":
        return value.toFixed(1);
      default:
        return value.toLocaleString("vi-VN");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {kpiData.map((kpi, index) => (
        <Card
          key={index}
          className="p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}
            >
              <span className="text-white text-xl">{kpi.icon}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatValue(kpi.value, kpi.format)}
              </span>
              <span className="text-sm text-gray-500">{kpi.description}</span>
            </div>
          </div>

          {loading && (
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default KPICards;
