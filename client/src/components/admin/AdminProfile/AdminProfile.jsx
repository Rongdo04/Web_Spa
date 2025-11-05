// components/admin/AdminProfile/AdminProfile.jsx
import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "../../ui";
import { UserOutlined } from "@ant-design/icons";
import { adminUserAPI } from "../../../services/admin";
import {
  ProfileOverview,
  AvatarUrlInput,
  ProfileForm,
  SecuritySettings,
} from "./components";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [profileData, setProfileData] = useState({
    _id: "",
    name: "",
    email: "",
    avatar: "",
    role: "",
    isEmailVerified: false,
    lastLogin: "",
    isActive: true,
    createdAt: "",
    updatedAt: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const response = await adminUserAPI.getProfile();

      if (response.success) {
        setProfileData(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
        });
      } else {
        throw new Error(response.message || "Lỗi khi tải thông tin profile");
      }
    } catch (error) {
      alert(
        "Lỗi khi tải thông tin profile: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: profileData.name,
      email: profileData.email,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profileData.name,
      email: profileData.email,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await adminUserAPI.updateProfile(formData);

      if (response.success) {
        setProfileData(response.data);
        setIsEditing(false);
        alert("Cập nhật thông tin thành công!");
      } else {
        throw new Error(response.message || "Lỗi khi cập nhật thông tin");
      }
    } catch (error) {
      alert(
        "Lỗi khi cập nhật thông tin: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (passwordData) => {
    setSaving(true);
    try {
      const response = await adminUserAPI.changePassword(passwordData);

      if (response.success) {
        alert("Đổi mật khẩu thành công!");
      } else {
        throw new Error(response.message || "Lỗi khi đổi mật khẩu");
      }
    } catch (error) {
      alert(
        "Lỗi khi đổi mật khẩu: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = async (avatarUrl) => {
    // Cập nhật state ngay lập tức để hiển thị preview
    setProfileData((prev) => ({ ...prev, avatar: avatarUrl }));

    // Nếu có avatarUrl, gọi API để lưu
    if (avatarUrl) {
      try {
        const response = await adminUserAPI.uploadAvatar(avatarUrl);

        if (response.success) {
          setProfileData(response.data);
          alert("Cập nhật ảnh đại diện thành công!");
        } else {
          throw new Error(response.message || "Lỗi khi cập nhật ảnh đại diện");
        }
      } catch (error) {
        alert(
          "Lỗi khi cập nhật ảnh đại diện: " +
            (error.response?.data?.message || error.message)
        );
        // Revert state nếu có lỗi
        setProfileData((prev) => ({ ...prev, avatar: "" }));
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {profileData.avatar ? (
              <img
                src={profileData.avatar}
                alt="Admin Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ${
                profileData.avatar ? "hidden" : "flex"
              }`}
            >
              <UserOutlined className="text-white text-xl" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-600">
              Quản trị hệ thống - {profileData.name || "Administrator"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <ProfileOverview
            profileData={profileData}
            onAvatarChange={handleAvatarChange}
            isEditing={isEditing}
          />
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <ProfileForm
            formData={formData}
            isEditing={isEditing}
            saving={saving}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />

          {/* Security Settings */}
          <SecuritySettings
            profileData={profileData}
            saving={saving}
            onPasswordChange={handlePasswordChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
