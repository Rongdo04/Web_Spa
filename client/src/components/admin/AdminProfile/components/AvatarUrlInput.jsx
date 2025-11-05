// components/admin/AdminProfile/components/AvatarUrlInput.jsx
import React, { useState } from "react";
import { Button } from "../../../ui";
import { Input } from "../../../ui";
import { UserOutlined, LinkOutlined, DeleteOutlined } from "@ant-design/icons";

const AvatarUrlInput = ({
  avatar,
  onAvatarChange,
  disabled = false,
  size = "large", // small, medium, large
}) => {
  const [urlInput, setUrlInput] = useState("");
  const [showInput, setShowInput] = useState(false);

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

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onAvatarChange(urlInput.trim());
      setUrlInput("");
      setShowInput(false);
    }
  };

  const handleUrlCancel = () => {
    setUrlInput("");
    setShowInput(false);
  };

  const handleRemoveAvatar = () => {
    onAvatarChange(null);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <div className="relative flex justify-center">
        <div
          className={`${
            sizeClasses[size]
          } rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden ${
            disabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:opacity-80"
          }`}
        >
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`w-full h-full flex items-center justify-center ${
              avatar ? "hidden" : "flex"
            }`}
          >
            <UserOutlined className={`text-white ${iconSizes[size]}`} />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 w-full max-w-xs items-center">
        {!showInput ? (
          <div className="flex space-x-2 justify-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowInput(true)}
              disabled={disabled}
            >
              <LinkOutlined className="mr-1" />
              Nhập URL
            </Button>

            {avatar && !disabled && (
              <Button size="sm" variant="outline" onClick={handleRemoveAvatar}>
                <DeleteOutlined className="mr-1" />
                Xóa
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-2 w-full">
            <Input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Nhập URL ảnh đại diện..."
              disabled={disabled}
              className="w-full"
            />
            <div className="flex space-x-2 justify-center">
              <Button
                size="sm"
                variant="primary"
                onClick={handleUrlSubmit}
                disabled={!urlInput.trim() || disabled}
              >
                OK
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleUrlCancel}
                disabled={disabled}
              >
                Hủy
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 text-center w-full">
        <div>Nhập URL ảnh từ internet</div>
        <div>Hỗ trợ: JPG, PNG, GIF, WebP</div>
      </div>
    </div>
  );
};

export default AvatarUrlInput;
