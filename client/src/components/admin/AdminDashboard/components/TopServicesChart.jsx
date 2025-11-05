// components/admin/AdminDashboard/components/TopServicesChart.jsx
import React from "react";
import { Card } from "../../../ui";

const TopServicesChart = ({ data, loading = false }) => {
  // Use API data for services
  const servicesData = data || [];

  const maxAppointments =
    servicesData.length > 0
      ? Math.max(...servicesData.map((item) => item.appointments))
      : 0;

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
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Top dịch vụ</h3>
        <div className="text-sm text-gray-600">
          {servicesData.length} dịch vụ
        </div>
      </div>

      <div className="space-y-4">
        {servicesData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Không có dữ liệu dịch vụ
          </div>
        ) : (
          servicesData.map((service, index) => {
            const percentage =
              maxAppointments > 0
                ? (service.appointments / maxAppointments) * 100
                : 0;
            const isTopThree = index < 3;

            return (
              <div key={service.id || index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isTopThree
                          ? index === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : index === 1
                            ? "bg-gray-100 text-gray-800"
                            : "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-800 truncate max-w-48">
                      {service.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {service.appointments} lịch
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatCurrency(service.revenue)}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isTopThree
                        ? index === 0
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                          : index === 1
                          ? "bg-gradient-to-r from-gray-400 to-gray-500"
                          : "bg-gradient-to-r from-orange-400 to-orange-500"
                        : "bg-gradient-to-r from-blue-400 to-blue-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">
              {servicesData.reduce((sum, item) => sum + item.appointments, 0)}
            </div>
            <div className="text-sm text-gray-600">Tổng lịch hẹn</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(
                servicesData.reduce((sum, item) => sum + item.revenue, 0)
              )}
            </div>
            <div className="text-sm text-gray-600">Tổng doanh thu</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TopServicesChart;
