// components/admin/AdminProfile/components/ProfileForm.jsx
import React from "react";
import { Card } from "../../../ui";
import { Button } from "../../../ui";
import { Input } from "../../../ui";
import { LoadingSpinner } from "../../../ui";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

const ProfileForm = ({
  formData,
  isEditing,
  saving,
  onEdit,
  onCancel,
  onSave,
  onInputChange,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Thông tin chi tiết
        </h3>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={saving}
              >
                <CloseOutlined className="mr-1" />
                Hủy
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={onSave}
                disabled={saving}
              >
                {saving ? (
                  <LoadingSpinner size="sm" className="mr-1" />
                ) : (
                  <SaveOutlined className="mr-1" />
                )}
                Lưu
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <EditOutlined className="mr-1" />
              Chỉnh sửa
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              disabled={!isEditing}
              placeholder="Nhập họ và tên"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              disabled={!isEditing}
              placeholder="Nhập email"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileForm;
