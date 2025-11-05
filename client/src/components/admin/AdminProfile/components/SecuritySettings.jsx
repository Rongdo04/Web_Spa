// components/admin/AdminProfile/components/SecuritySettings.jsx
import React, { useState } from "react";
import { Card } from "../../../ui";
import { Button } from "../../../ui";
import { Input } from "../../../ui";
import { LoadingSpinner } from "../../../ui";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";

const SecuritySettings = ({ profileData, saving, onPasswordChange }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordInputChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      await onPasswordChange(passwordData);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (error) {
      }
  };

  const handleCancel = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordForm(false);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Bảo mật</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          <LockOutlined className="mr-1" />
          Đổi mật khẩu
        </Button>
      </div>

      {showPasswordForm && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Thay đổi mật khẩu
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu hiện tại *
              </label>
              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  handlePasswordInputChange("currentPassword", e.target.value)
                }
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu mới *
              </label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordInputChange("newPassword", e.target.value)
                }
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu mới *
              </label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handlePasswordInputChange("confirmPassword", e.target.value)
                }
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? (
                  <LoadingSpinner size="sm" className="mr-1" />
                ) : (
                  <KeyOutlined className="mr-1" />
                )}
                Đổi mật khẩu
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={saving}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="text-sm font-medium text-gray-700">
              Đăng nhập lần cuối
            </div>
            <div className="text-xs text-gray-500">
              {new Date(profileData.lastLogin).toLocaleString("vi-VN")}
            </div>
          </div>
          <div className="text-green-600 text-sm font-medium">Hoạt động</div>
        </div>
      </div>
    </Card>
  );
};

export default SecuritySettings;
