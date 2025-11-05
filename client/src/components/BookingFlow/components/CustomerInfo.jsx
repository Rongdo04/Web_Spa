import React, { useState, useEffect } from "react";
import { Card, Input, Textarea, Button } from "../../ui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const CustomerInfo = ({ customer, onCustomerChange }) => {
  const navigate = useNavigate();
  const {
    user,
    customer: authCustomer,
    isAuthenticated,
    isLoading,
    logout,
  } = useAuth();
  const [formData, setFormData] = useState(
    customer || {
      name: "",
      phone: "",
      email: "",
      notes: "",
    }
  );

  // Auto-fill form when user is authenticated
  useEffect(() => {
    if (isAuthenticated && (user || authCustomer)) {
      console.log("Auto-filling form with:", {
        user: user,
        authCustomer: authCustomer,
        isAuthenticated: isAuthenticated,
      });

      setFormData((prev) => ({
        ...prev,
        name: authCustomer?.name || user?.name || prev.name,
        phone:
          authCustomer?.phone && authCustomer.phone.trim() !== ""
            ? authCustomer.phone
            : prev.phone,
        email: authCustomer?.email || user?.email || prev.email,
      }));
    }
  }, [isAuthenticated, user, authCustomer]);

  useEffect(() => {
    onCustomerChange(formData);
  }, [formData, onCustomerChange]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Check if field should be disabled (has data from auth)
  const isFieldDisabled = (field) => {
    if (!isAuthenticated) return true;

    switch (field) {
      case "name":
        return !!(authCustomer?.name || user?.name);
      case "phone":
        return !!(authCustomer?.phone && authCustomer.phone.trim() !== "");
      case "email":
        return !!(authCustomer?.email || user?.email);
      default:
        return false;
    }
  };

  const handleLogin = () => {
    // Navigate to login page with return URL
    const currentPath = window.location.pathname + window.location.search;
    navigate(`/login?returnUrl=${encodeURIComponent(currentPath)}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setFormData({
        name: "",
        phone: "",
        email: "",
        notes: "",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thông tin khách hàng
          </h2>
          <p className="text-gray-600">
            Vui lòng cung cấp thông tin liên hệ để chúng tôi xác nhận lịch hẹn
          </p>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="ml-3 text-gray-600">Đang kiểm tra đăng nhập...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Thông tin khách hàng
        </h2>
        <p className="text-gray-600">
          Vui lòng cung cấp thông tin liên hệ để chúng tôi xác nhận lịch hẹn
        </p>
      </div>

      {/* Login Status */}
      <Card
        className={`p-4 ${
          !isAuthenticated
            ? "border-red-200 bg-red-50"
            : "border-green-200 bg-green-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isAuthenticated ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <div>
              <span className="text-sm font-medium text-gray-700">
                {isAuthenticated
                  ? `Đã đăng nhập - ${
                      authCustomer?.name || user?.name || "Khách hàng"
                    }`
                  : "Chưa đăng nhập"}
              </span>
              {!isAuthenticated && (
                <p className="text-xs text-red-600 mt-1">
                  Vui lòng đăng nhập để tiếp tục đặt lịch
                </p>
              )}
            </div>
          </div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Đăng xuất
            </button>
          ) : (
            <Button onClick={handleLogin} variant="primary" size="sm">
              Đăng nhập ngay
            </Button>
          )}
        </div>
      </Card>

      {/* Login Required Notice */}
      {!isAuthenticated && (
        <Card className="p-6 bg-yellow-50 border border-yellow-200">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-yellow-600 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                Yêu cầu đăng nhập
              </h4>
              <p className="text-yellow-700 mb-4">
                Để đặt lịch spa, bạn cần đăng nhập vào tài khoản. Thông tin của
                bạn sẽ được tự động điền vào form sau khi đăng nhập.
              </p>
              <Button onClick={handleLogin} variant="primary" size="md">
                Đăng nhập để tiếp tục
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Form */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
          !isAuthenticated ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên *
            {isFieldDisabled("name") && (
              <span className="text-xs text-blue-600 ml-2">
                (Tự động điền từ tài khoản)
              </span>
            )}
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder={
              isAuthenticated ? "Nhập họ và tên" : "Vui lòng đăng nhập trước"
            }
            required
            disabled={!isAuthenticated || isFieldDisabled("name")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại *
            {isFieldDisabled("phone") && (
              <span className="text-xs text-blue-600 ml-2">
                (Tự động điền từ tài khoản)
              </span>
            )}
          </label>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder={
              isAuthenticated
                ? "Nhập số điện thoại"
                : "Vui lòng đăng nhập trước"
            }
            type="tel"
            required
            disabled={!isAuthenticated || isFieldDisabled("phone")}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
            {isFieldDisabled("email") && (
              <span className="text-xs text-blue-600 ml-2">
                (Tự động điền từ tài khoản)
              </span>
            )}
          </label>
          <Input
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder={
              isAuthenticated
                ? "Nhập email (tùy chọn)"
                : "Vui lòng đăng nhập trước"
            }
            type="email"
            disabled={!isAuthenticated || isFieldDisabled("email")}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ghi chú thêm
          </label>
          <Textarea
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder={
              isAuthenticated
                ? "Ghi chú thêm về yêu cầu đặc biệt (nếu có)"
                : "Vui lòng đăng nhập trước"
            }
            rows={3}
            disabled={!isAuthenticated}
          />
        </div>
      </div>

      {/* Information Notice */}
      {isAuthenticated && (
        <Card className="p-4 bg-blue-50">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">
                Thông tin bảo mật
              </h4>
              <p className="text-sm text-blue-700">
                Thông tin của bạn sẽ được bảo mật và chỉ sử dụng để xác nhận
                lịch hẹn. Chúng tôi sẽ gửi thông tin xác nhận qua SMS và email.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Required Fields Notice */}
      {isAuthenticated && (
        <div className="text-sm text-gray-500">
          <p>* Thông tin bắt buộc</p>
        </div>
      )}
    </div>
  );
};

export { CustomerInfo };
