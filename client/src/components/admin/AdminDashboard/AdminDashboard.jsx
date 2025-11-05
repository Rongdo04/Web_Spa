// components/admin/AdminDashboard/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { adminDashboardAPI } from "../../../services";
import { KPICards, UpcomingBookings } from "./components";
import { DashboardOutlined, ReloadOutlined } from "@ant-design/icons";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    // KPI Data
    totalAppointments: 0,
    todayAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    weekRevenue: 0,
    cancellationRate: 0,
    csatScore: 0,
    totalCustomers: 0,
    totalServices: 0,
    totalStaff: 0,
    totalBranches: 0,

    // Revenue Data
    revenue: {
      total: 0,
      thisMonth: 0,
      lastMonth: 0,
      growth: 0,
    },

    // Services Data
    servicesData: [],

    // Bookings Data
    bookingsData: [],
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch real data from API
      const response = await adminDashboardAPI.getDashboard();

      if (response.success) {
        const data = response.data;

        // Transform API data to match component expectations
        setDashboardData({
          // KPI Data
          totalAppointments: data.kpis?.totalAppointments || 0,
          todayAppointments: data.kpis?.todayAppointments || 0,
          completedAppointments: data.kpis?.completedAppointments || 0,
          pendingAppointments: data.kpis?.pendingAppointments || 0,
          confirmedAppointments: data.kpis?.confirmedAppointments || 0,
          totalRevenue: data.kpis?.totalRevenue || 0,
          todayRevenue: data.kpis?.todayRevenue || 0,
          weekRevenue: data.kpis?.weekRevenue || 0,
          cancellationRate: data.kpis?.cancellationRate || 0,
          csatScore: data.kpis?.csatScore || 0,
          totalCustomers: data.kpis?.totalCustomers || 0,
          totalServices: data.kpis?.totalServices || 0,
          totalStaff: data.kpis?.totalStaff || 0,
          totalBranches: data.kpis?.totalBranches || 0,

          // Revenue Data
          revenue: data.revenue || {
            total: 0,
            thisMonth: 0,
            lastMonth: 0,
            growth: 0,
          },

          // Services Data
          servicesData: data.services || [],

          // Bookings Data
          bookingsData: data.upcomingBookings || [],
        });
      } else {
        // Keep existing empty state
      }
    } catch (error) {
      // Keep existing empty state for graceful degradation
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <DashboardOutlined className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Tổng quan hệ thống
              </h1>
              <p className="text-sm text-gray-600">
                Chào mừng, {user?.name}! - Cập nhật lần cuối:{" "}
                {new Date().toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
          >
            <ReloadOutlined className={loading ? "animate-spin" : ""} />
            <span>{loading ? "Đang tải..." : "Làm mới"}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards data={dashboardData} loading={loading} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"></div>

      {/* Upcoming Bookings */}
      <UpcomingBookings data={dashboardData.bookingsData} loading={loading} />
    </div>
  );
};

export default AdminDashboard;
