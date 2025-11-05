// components/admin/AdminCustomers/components/CustomerForm.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Textarea, Card } from "../../../ui";
import {
  SaveOutlined,
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

const CustomerForm = ({ customer, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    notes: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        phone: customer.phone || "",
        email: customer.email || "",
        password: "",
        notes: customer.notes || "",
        avatar: customer.avatar || "",
      });
    }
  }, [customer]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên khách hàng là bắt buộc";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Email không hợp lệ";
    }

    if (formData.password.trim() && formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="medium" className="max-w-2xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {customer ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseOutlined />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <UserOutlined className="mr-2" />
              Thông tin cơ bản
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Họ tên *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Nhập họ tên khách hàng"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Số điện thoại *
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="0901234567"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="customer@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avatar URL
                </label>
                <Input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => handleInputChange("avatar", e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
                {formData.avatar && (
                  <div className="mt-2">
                    <img
                      src={formData.avatar}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mật khẩu {!customer && "(Tùy chọn)"}
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder={
                    customer
                      ? "Nhập mật khẩu mới để cập nhật"
                      : "Để trống sẽ dùng số điện thoại làm mật khẩu"
                  }
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {customer
                    ? "Chỉ nhập nếu muốn thay đổi mật khẩu"
                    : "Nếu không nhập, hệ thống sẽ dùng số điện thoại làm mật khẩu mặc định"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ghi chú
                </label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Thêm ghi chú về khách hàng..."
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Xem trước
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {formData.name.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {formData.name || "Tên khách hàng"}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <PhoneOutlined className="mr-1" />
                      {formData.phone || "Số điện thoại"}
                    </span>
                    <span className="flex items-center">
                      <MailOutlined className="mr-1" />
                      {formData.email || "Email"}
                    </span>
                    {formData.avatar && (
                      <div className="flex items-center">
                        <img
                          src={formData.avatar}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full object-cover mr-2"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <span className="text-sm text-gray-600">Avatar</span>
                      </div>
                    )}
                  </div>
                  {!customer && (
                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                      ✓ Sẽ tạo tài khoản đăng nhập cho khách hàng
                    </div>
                  )}
                </div>
              </div>
              {formData.notes && (
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <strong>Ghi chú:</strong> {formData.notes}
                </div>
              )}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <SaveOutlined className="mr-2" />
              {customer ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CustomerForm;
