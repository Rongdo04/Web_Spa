// components/admin/AdminDashboard/components/PeakHoursHeatmap.jsx
import React from "react";
import { Card } from "../../../ui";

const PeakHoursHeatmap = ({ data, loading = false }) => {
  // Mock data for demonstration - 7 days x 12 hours (8AM to 8PM)
  const heatmapData = data || [
    // Monday to Sunday, 8AM to 8PM
    [2, 4, 6, 8, 12, 15, 18, 20, 16, 12, 8, 4], // Monday
    [1, 3, 5, 7, 10, 14, 17, 19, 15, 11, 7, 3], // Tuesday
    [3, 5, 7, 9, 13, 16, 19, 21, 17, 13, 9, 5], // Wednesday
    [2, 4, 6, 8, 11, 15, 18, 20, 16, 12, 8, 4], // Thursday
    [4, 6, 8, 10, 14, 17, 20, 22, 18, 14, 10, 6], // Friday
    [6, 8, 10, 12, 16, 19, 22, 24, 20, 16, 12, 8], // Saturday
    [5, 7, 9, 11, 15, 18, 21, 23, 19, 15, 11, 7], // Sunday
  ];

  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const hours = [
    "8h",
    "9h",
    "10h",
    "11h",
    "12h",
    "13h",
    "14h",
    "15h",
    "16h",
    "17h",
    "18h",
    "19h",
  ];

  const maxBookings = Math.max(...heatmapData.flat());
  const minBookings = Math.min(...heatmapData.flat());

  const getIntensity = (value) => {
    if (maxBookings === minBookings) return 0;
    return (value - minBookings) / (maxBookings - minBookings);
  };

  const getColorClass = (intensity) => {
    if (intensity === 0) return "bg-gray-100";
    if (intensity < 0.2) return "bg-green-100";
    if (intensity < 0.4) return "bg-green-200";
    if (intensity < 0.6) return "bg-yellow-200";
    if (intensity < 0.8) return "bg-orange-200";
    return "bg-red-200";
  };

  const getTextColor = (intensity) => {
    if (intensity < 0.5) return "text-gray-600";
    return "text-gray-800";
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 84 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Khung giờ cao điểm
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <span className="text-gray-600">Thấp</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-200 rounded"></div>
            <span className="text-gray-600">Cao</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Hours header */}
        <div className="flex">
          <div className="w-8"></div>
          <div className="flex-1 grid grid-cols-12 gap-1">
            {hours.map((hour, index) => (
              <div
                key={index}
                className="text-xs text-center text-gray-600 font-medium"
              >
                {hour}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="space-y-1">
          {heatmapData.map((dayData, dayIndex) => (
            <div key={dayIndex} className="flex items-center space-x-2">
              <div className="w-8 text-xs font-medium text-gray-600">
                {days[dayIndex]}
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1">
                {dayData.map((bookings, hourIndex) => {
                  const intensity = getIntensity(bookings);
                  return (
                    <div
                      key={hourIndex}
                      className={`h-8 rounded flex items-center justify-center text-xs font-medium transition-all duration-200 hover:scale-105 ${getColorClass(
                        intensity
                      )} ${getTextColor(intensity)}`}
                      title={`${days[dayIndex]} ${hours[hourIndex]}: ${bookings} lịch hẹn`}
                    >
                      {bookings}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-red-600">{maxBookings}</div>
            <div className="text-sm text-gray-600">Cao nhất</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {Math.round(
                heatmapData.flat().reduce((sum, val) => sum + val, 0) /
                  heatmapData.flat().length
              )}
            </div>
            <div className="text-sm text-gray-600">Trung bình</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {minBookings}
            </div>
            <div className="text-sm text-gray-600">Thấp nhất</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PeakHoursHeatmap;
