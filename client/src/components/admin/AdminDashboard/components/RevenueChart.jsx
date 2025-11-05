// components/admin/AdminDashboard/components/RevenueChart.jsx
import React from "react";
import { Card } from "../../../ui";

const RevenueChart = ({ data, loading = false }) => {
  // Use API data for revenue information
  const revenueData = data || {
    total: 0,
    thisMonth: 0,
    lastMonth: 0,
    growth: 0,
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
    }).format(value);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Tổng quan doanh thu
        </h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Doanh thu</span>
          </div>
        </div>
      </div>

      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">
            Biểu đồ doanh thu
          </h4>
          <p className="text-gray-500">
            Dữ liệu biểu đồ sẽ được cập nhật trong phiên bản tiếp theo
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(revenueData.total)}
          </div>
          <div className="text-sm text-gray-600">Tổng doanh thu</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(revenueData.thisMonth)}
          </div>
          <div className="text-sm text-gray-600">Tháng này</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(revenueData.lastMonth)}
          </div>
          <div className="text-sm text-gray-600">Tháng trước</div>
        </div>
        <div>
          <div
            className={`text-2xl font-bold ${
              revenueData.growth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {revenueData.growth >= 0 ? "+" : ""}
            {revenueData.growth}%
          </div>
          <div className="text-sm text-gray-600">Tăng trưởng</div>
        </div>
      </div>
    </Card>
  );
};

export default RevenueChart;
