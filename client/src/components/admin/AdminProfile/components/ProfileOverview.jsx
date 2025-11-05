// components/admin/AdminProfile/components/ProfileOverview.jsx
import React from "react";
import { Card } from "../../../ui";
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AvatarUrlInput from "./AvatarUrlInput";

const ProfileOverview = ({ profileData, onAvatarChange, isEditing }) => {
  const getStatusColor = (isActive) => {
    return isActive
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-red-100 text-red-800 border-red-300";
  };

  const getStatusText = (isActive) => {
    return isActive ? "Hoạt động" : "Không hoạt động";
  };

  const getRoleText = (role) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "user":
        return "Người dùng";
      default:
        return role;
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center">
        <AvatarUrlInput
          avatar={profileData.avatar}
          onAvatarChange={onAvatarChange}
          disabled={!isEditing}
          size="large"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
          {profileData.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {getRoleText(profileData.role)}
        </p>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
            profileData.isActive
          )}`}
        >
          {getStatusText(profileData.isActive)}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-3">
          <MailOutlined className="text-gray-400" />
          <span className="text-sm text-gray-600">{profileData.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <CalendarOutlined className="text-gray-400" />
          <span className="text-sm text-gray-600">
            Tham gia:{" "}
            {new Date(profileData.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {profileData.isEmailVerified ? (
            <CheckCircleOutlined className="text-green-500" />
          ) : (
            <ExclamationCircleOutlined className="text-yellow-500" />
          )}
          <span className="text-sm text-gray-600">
            Email{" "}
            {profileData.isEmailVerified ? "đã xác thực" : "chưa xác thực"}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Thông tin tài khoản
        </h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">
              Vai trò: {getRoleText(profileData.role)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">
              Trạng thái: {getStatusText(profileData.isActive)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-xs text-gray-600">
              Cập nhật:{" "}
              {new Date(profileData.updatedAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileOverview;
