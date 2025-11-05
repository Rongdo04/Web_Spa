// components/admin/AdminNotifications/components/TemplateEditor.jsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  Card,
} from "../../../ui";
import {
  SaveOutlined,
  CloseOutlined,
  BellOutlined,
  MailOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";

const TemplateEditor = ({ template, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    trigger: "",
    subject: "",
    content: "",
    channels: [],
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  const templateTypes = [
    { value: "appointment_confirmation", label: "Xác nhận lịch hẹn" },
    { value: "appointment_reminder", label: "Nhắc lịch hẹn" },
    { value: "appointment_reschedule", label: "Thay đổi lịch hẹn" },
    { value: "post_service_thanks", label: "Cảm ơn sau dịch vụ" },
  ];

  const channelOptions = [
    { value: "sms", label: "SMS", icon: <MessageOutlined /> },
    { value: "email", label: "Email", icon: <MailOutlined /> },
  ];

  const placeholders = [
    { key: "{{customer_name}}", description: "Tên khách hàng" },
    { key: "{{service_name}}", description: "Tên dịch vụ" },
    { key: "{{staff_name}}", description: "Tên nhân viên" },
    { key: "{{appointment_date}}", description: "Ngày hẹn" },
    { key: "{{start_time}}", description: "Giờ bắt đầu" },
    { key: "{{end_time}}", description: "Giờ kết thúc" },
    { key: "{{salon_name}}", description: "Tên salon" },
    { key: "{{salon_address}}", description: "Địa chỉ salon" },
    { key: "{{salon_phone}}", description: "Số điện thoại salon" },
    {
      key: "{{old_service_name}}",
      description: "Tên dịch vụ cũ (khi đổi lịch)",
    },
    { key: "{{old_start_time}}", description: "Giờ cũ (khi đổi lịch)" },
    { key: "{{old_appointment_date}}", description: "Ngày cũ (khi đổi lịch)" },
  ];

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || "",
        type: template.type || "",
        trigger: template.trigger || "",
        subject: template.subject || "",
        content: template.content || "",
        channels: template.channels || [],
        isActive: template.isActive !== undefined ? template.isActive : true,
      });
    }
  }, [template]);

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

  const handleChannelChange = (channel, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        channels: [...prev.channels, channel],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        channels: prev.channels.filter((c) => c !== channel),
      }));
    }
  };

  const insertPlaceholder = (placeholder) => {
    const textarea = document.getElementById("content");
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = formData.content;
      const newText =
        text.substring(0, start) + placeholder + text.substring(end);

      setFormData((prev) => ({
        ...prev,
        content: newText,
      }));

      // Focus back to textarea
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + placeholder.length,
          start + placeholder.length
        );
      }, 0);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên mẫu là bắt buộc";
    }

    if (!formData.type) {
      newErrors.type = "Loại mẫu là bắt buộc";
    }

    if (!formData.trigger.trim()) {
      newErrors.trigger = "Trigger là bắt buộc";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Tiêu đề là bắt buộc";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Nội dung là bắt buộc";
    }

    if (formData.channels.length === 0) {
      newErrors.channels = "Chọn ít nhất một kênh gửi";
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

  const getTypeLabel = (type) => {
    const typeObj = templateTypes.find((t) => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="large" className="max-w-5xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {template ? "Chỉnh sửa mẫu thông báo" : "Tạo mẫu thông báo mới"}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BellOutlined className="mr-2" />
                  Thông tin cơ bản
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tên mẫu *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Nhập tên mẫu thông báo"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Loại mẫu *
                    </label>
                    <Select
                      value={formData.type}
                      onChange={(value) => handleInputChange("type", value)}
                      placeholder="Chọn loại mẫu"
                      className={errors.type ? "border-red-500" : ""}
                    >
                      {templateTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Select>
                    {errors.type && (
                      <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Trigger (Khi nào gửi) *
                    </label>
                    <Input
                      value={formData.trigger}
                      onChange={(e) =>
                        handleInputChange("trigger", e.target.value)
                      }
                      placeholder="Ví dụ: Khi khách đặt lịch thành công"
                      className={errors.trigger ? "border-red-500" : ""}
                    />
                    {errors.trigger && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.trigger}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tiêu đề *
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      placeholder="Tiêu đề thông báo"
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Content Editor */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Nội dung thông báo *
                </h3>
                <div className="space-y-4">
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    placeholder="Nhập nội dung thông báo..."
                    rows={12}
                    className={errors.content ? "border-red-500" : ""}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.content}
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Placeholders */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <InfoCircleOutlined className="mr-2" />
                  Placeholders
                </h3>
                <div className="space-y-2">
                  {placeholders.map((placeholder) => (
                    <div
                      key={placeholder.key}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => insertPlaceholder(placeholder.key)}
                    >
                      <div>
                        <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                          {placeholder.key}
                        </code>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {placeholder.description}
                        </p>
                      </div>
                      <CopyOutlined className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Channels */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Kênh gửi *
                </h3>
                <div className="space-y-3">
                  {channelOptions.map((channel) => (
                    <div key={channel.value} className="flex items-center">
                      <Checkbox
                        checked={formData.channels.includes(channel.value)}
                        onChange={(e) =>
                          handleChannelChange(channel.value, e.target.checked)
                        }
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        {channel.icon}
                        <span className="ml-2 text-sm">{channel.label}</span>
                      </div>
                    </div>
                  ))}
                  {errors.channels && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.channels}
                    </p>
                  )}
                </div>
              </Card>

              {/* Settings */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Cài đặt
                </h3>
                <div className="flex items-center">
                  <Checkbox
                    checked={formData.isActive}
                    onChange={(e) =>
                      handleInputChange("isActive", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Kích hoạt mẫu
                  </label>
                </div>
              </Card>

              {/* Preview */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Xem trước
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {formData.subject || "Tiêu đề thông báo"}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {formData.content || "Nội dung thông báo..."}
                  </div>
                </div>
              </Card>
            </div>
          </div>

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
              {template ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TemplateEditor;
