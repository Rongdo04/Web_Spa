// components/admin/AdminProfile/components/AvatarUpload.jsx
import React, { useState, useRef } from "react";
import { Button } from "../../../ui";
import { LoadingSpinner } from "../../../ui";
import {
  UserOutlined,
  CameraOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const AvatarUpload = ({
  avatar,
  onAvatarChange,
  disabled = false,
  size = "large", // small, medium, large
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(avatar);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef(null);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  const iconSizes = {
    small: "text-xl",
    medium: "text-3xl",
    large: "text-4xl",
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file ảnh!");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB!");
        return;
      }

      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    setUploading(true);
    try {
      // Create preview using FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        // Use the data URL directly instead of createObjectURL
        onAvatarChange(e.target.result);
      };
      reader.readAsDataURL(file);

      // Simulate API upload
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      alert("Lỗi khi tải lên ảnh đại diện!");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAvatar = () => {
    setPreview(null);
    onAvatarChange(null);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setPreview(urlInput);
      onAvatarChange(urlInput);
      setShowUrlInput(false);
      setUrlInput("");
    }
  };

  const handleUrlCancel = () => {
    setShowUrlInput(false);
    setUrlInput("");
  };

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div
          className={`${
            sizeClasses[size]
          } rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleClick}
        >
          {uploading ? (
            <LoadingSpinner size="sm" />
          ) : preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <UserOutlined className={`text-white ${iconSizes[size]}`} />
          )}
        </div>

        {!disabled && !uploading && (
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm">
            <CameraOutlined className="text-gray-600 text-sm" />
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleClick}
            disabled={disabled || uploading}
          >
            {uploading ? (
              <LoadingSpinner size="sm" className="mr-1" />
            ) : (
              <CameraOutlined className="mr-1" />
            )}
            {preview ? "Đổi ảnh" : "Tải lên"}
          </Button>

          {!disabled && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              URL
            </Button>
          )}

          {preview && !disabled && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleRemoveAvatar}
              disabled={uploading}
            >
              <DeleteOutlined className="mr-1" />
              Xóa
            </Button>
          )}
        </div>

        {showUrlInput && (
          <div className="flex space-x-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Nhập URL ảnh..."
              className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              size="sm"
              variant="primary"
              onClick={handleUrlSubmit}
              disabled={!urlInput.trim()}
            >
              OK
            </Button>
            <Button size="sm" variant="outline" onClick={handleUrlCancel}>
              Hủy
            </Button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="text-xs text-gray-500 text-center">
        <div>JPG, PNG, GIF tối đa 5MB hoặc nhập URL</div>
        <div>Kích thước khuyến nghị: 400x400px</div>
      </div>
    </div>
  );
};

export default AvatarUpload;
