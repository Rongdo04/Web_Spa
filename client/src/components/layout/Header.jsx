// components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import {
  MenuOutlined,
  CloseOutlined,
  SunOutlined,
  MoonOutlined,
  UserOutlined,
  LogoutOutlined,
  CalendarOutlined,
  PhoneOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const Header = ({ className = "", ...props }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navigation = [
    { name: "Trang chủ", href: "/", icon: <HomeOutlined /> },
    { name: "Dịch vụ", href: "/services", icon: <CalendarOutlined /> },
    { name: "Về chúng tôi", href: "/about", icon: <InfoCircleOutlined /> },
    { name: "FAQ", href: "/faq", icon: <QuestionCircleOutlined /> },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Helper functions
  const isAdmin = () => {
    return user && user.role === "admin";
  };

  const isUser = () => {
    return user && user.role === "user";
  };

  const handleAdminAccess = () => {
    navigate("/admin");
    setIsUserDropdownOpen(false);
  };

  const handleUserDashboard = () => {
    navigate("/my-bookings");
    setIsUserDropdownOpen(false);
  };

  const handleMyBookings = () => {
    navigate("/my-bookings");
    setIsUserDropdownOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: clear localStorage if API call fails
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsUserDropdownOpen(false);
      navigate("/");
    }
  };

  return (
    <header
      className={`bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="bg-brand text-white px-4 py-2 rounded-lg font-bold text-xl">
                  Spa
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  isActive(item.href)
                    ? "text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
              icon={
                isDarkMode ? (
                  <SunOutlined className="w-5 h-5" />
                ) : (
                  <MoonOutlined className="w-5 h-5" />
                )
              }
            />

            {/* CTA Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/services")}
            >
              <CalendarOutlined className="mr-2" />
              Đặt lịch ngay
            </Button>

            {/* Authentication Section */}
            {!isAuthenticated ? (
              // Guest user - show login/register buttons
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={handleLogin}>
                  Đăng nhập
                </Button>
                <Button variant="primary" size="sm" onClick={handleRegister}>
                  Đăng ký
                </Button>
              </div>
            ) : isAdmin() ? (
              // Admin user - show admin access button
              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAdminAccess}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <UserOutlined className="mr-2" />
                  Truy cập quản trị
                </Button>
                <div className="relative user-dropdown">
                  <button
                    onClick={handleUserDropdownToggle}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-red-600 flex items-center justify-center">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user?.name || "Admin"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <span
                        className="text-white text-sm font-semibold"
                        style={{ display: user?.avatar ? "none" : "flex" }}
                      >
                        {user?.name?.charAt(0)?.toUpperCase() || "A"}
                      </span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 transition-transform ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Admin Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-50">
                      <div className="px-4 py-2 text-xs text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                        Admin: {user?.name || "Administrator"}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center space-x-2"
                      >
                        <LogoutOutlined className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Regular user - show user dashboard button
              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleUserDashboard}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserOutlined className="mr-2" />
                  Truy cập
                </Button>
                <div className="relative user-dropdown">
                  <button
                    onClick={handleUserDropdownToggle}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-green-600 flex items-center justify-center">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user?.name || "User"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <span
                        className="text-white text-sm font-semibold"
                        style={{ display: user?.avatar ? "none" : "flex" }}
                      >
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 transition-transform ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-50">
                      <div className="px-4 py-2 text-xs text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                        {user?.name || "User"}
                      </div>
                      <button
                        onClick={handleMyBookings}
                        className="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center space-x-2"
                      >
                        <CalendarOutlined className="w-4 h-4" />
                        <span>Lịch của tôi</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center space-x-2"
                      >
                        <LogoutOutlined className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              icon={
                isMobileMenuOpen ? (
                  <CloseOutlined className="w-6 h-6" />
                ) : (
                  <MenuOutlined className="w-6 h-6" />
                )
              }
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center space-x-3 ${
                    isActive(item.href)
                      ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 rounded-md"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Mobile Authentication Actions */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3 mt-3">
                {!isAuthenticated ? (
                  // Guest user - show login/register buttons
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleLogin();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors border border-neutral-300 dark:border-neutral-600 rounded-md"
                    >
                      <span>Đăng nhập</span>
                    </button>
                    <button
                      onClick={() => {
                        handleRegister();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-base font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors rounded-md"
                    >
                      <span>Đăng ký</span>
                    </button>
                  </div>
                ) : isAdmin() ? (
                  // Admin user - show admin access button
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleAdminAccess();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors rounded-md"
                    >
                      <UserOutlined className="w-5 h-5" />
                      <span>Truy cập quản trị</span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      <LogoutOutlined className="w-5 h-5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  // Regular user - show user dashboard button
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleUserDashboard();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors rounded-md"
                    >
                      <UserOutlined className="w-5 h-5" />
                      <span>Truy cập</span>
                    </button>
                    <button
                      onClick={() => {
                        handleMyBookings();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      <CalendarOutlined className="w-5 h-5" />
                      <span>Lịch của tôi</span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      <LogoutOutlined className="w-5 h-5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
