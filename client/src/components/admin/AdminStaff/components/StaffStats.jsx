import React from "react";
import {
  UserGroupIcon,
  UserPlusIcon,
  UserMinusIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const StaffStats = ({ stats }) => {
  const statCards = [
    {
      name: "Tổng nhân viên",
      value: stats?.total || 0,
      icon: UserGroupIcon,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Đang hoạt động",
      value: stats?.active || 0,
      icon: UserPlusIcon,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "Không hoạt động",
      value: stats?.inactive || 0,
      icon: UserMinusIcon,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`flex-shrink-0 p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffStats;
