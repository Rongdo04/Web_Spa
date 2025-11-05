// components/admin/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../ui";
import { adminUserAPI } from "../../services/admin";
import { useAuth } from "../../contexts/AuthContext";
import {
  DashboardOutlined,
  CalendarOutlined,
  ToolOutlined,
  TeamOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  HistoryOutlined,
  LogoutOutlined,
  TagsOutlined,
  StarOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminInfo, setAdminInfo] = useState({
    name: "Administrator",
    avatar: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    loadAdminInfo();
  }, []);

  const loadAdminInfo = async () => {
    try {
      const response = await adminUserAPI.getProfile();
      if (response.success) {
        setAdminInfo({
          name: response.data.name || "Administrator",
          avatar: response.data.avatar || "",
        });
      }
    } catch (error) {
      // Keep default values if API fails
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Tổng quan",
      icon: <DashboardOutlined />,
      path: "/admin",
    },
    {
      id: "appointments",
      label: "Quản lý lịch hẹn",
      icon: <CalendarOutlined />,
      path: "/admin/appointments",
    },
    {
      id: "categories",
      label: "Danh mục",
      icon: <TagsOutlined />,
      path: "/admin/categories",
    },
    {
      id: "services",
      label: "Dịch vụ",
      icon: <ToolOutlined />,
      path: "/admin/services",
    },
    {
      id: "staff",
      label: "Nhân viên",
      icon: <TeamOutlined />,
      path: "/admin/staff",
    },
    {
      id: "customers",
      label: "Khách hàng",
      icon: <UserOutlined />,
      path: "/admin/customers",
    },
    {
      id: "notifications",
      label: "Thông báo",
      icon: <BellOutlined />,
      path: "/admin/notifications",
    },
    {
      id: "reviews",
      label: "Quản lý đánh giá",
      icon: <StarOutlined />,
      path: "/admin/reviews",
    },
    {
      id: "appointment-history",
      label: "Lịch sử lịch hẹn",
      icon: <HistoryOutlined />,
      path: "/admin/appointment-history",
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: <SettingOutlined />,
      path: "/admin/settings",
    },
    {
      id: "database-schema",
      label: "Database Schema",
      icon: <DatabaseOutlined />,
      path: "/admin/database-schema",
    },
    {
      id: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      path: "/admin/logout",
    },
  ];

  const handleMenuClick = async (path) => {
    if (path === "/admin/logout") {
      try {
        await logout();
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
        // Fallback: clear localStorage if API call fails
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate(path);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {adminInfo.avatar ? (
                    <img
                      src={adminInfo.avatar}
                      alt="Admin Avatar"
                      className="w-8 h-8 rounded-lg object-cover border border-white shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center ${
                      adminInfo.avatar ? "hidden" : "flex"
                    }`}
                  >
                    <span className="text-white text-sm font-bold">
                      {adminInfo.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    Admin Panel
                  </h1>
                  <p className="text-xs text-gray-500">{adminInfo.name}</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              {sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                item.id === "logout"
                  ? "text-red-600 hover:bg-red-50 border border-red-200"
                  : isActive(item.path)
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">A</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {menuItems.find((item) => isActive(item.path))?.label ||
                  "Admin Panel"}
              </h2>
              <p className="text-sm text-gray-600">
                {menuItems.find((item) => isActive(item.path))?.path ||
                  "/admin"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Link to="/admin/notifications">
                  <BellOutlined className="mr-1" />
                  Thông báo
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Link to="/admin/profile">
                  <UserOutlined className="mr-1" />
                  Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
