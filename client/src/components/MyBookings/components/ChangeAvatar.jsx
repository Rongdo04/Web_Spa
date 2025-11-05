import React, { useState } from "react";
import { Card, Input, message, Avatar, Form } from "antd";
import { UserOutlined, LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "../../ui";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const ChangeAvatar = () => {
  const { user, loadUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { avatarUrl } = values;

    if (!avatarUrl || !avatarUrl.trim()) {
      message.error("Vui lòng nhập URL ảnh!");
      return;
    }

    // Validate URL
    try {
      new URL(avatarUrl);
    } catch {
      message.error("URL không hợp lệ!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/user/profile/avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ avatarUrl: avatarUrl.trim() }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Cập nhật avatar thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Reload user data
        await loadUser();
        form.resetFields();
      } else {
        toast.error(result.message || "Cập nhật avatar thất bại", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Có lỗi xảy ra khi cập nhật avatar", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/user/profile/avatar", {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Xóa avatar thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
        setPreviewImage(null);
        // Reload user data
        await loadUser();
      } else {
        toast.error(result.message || "Xóa avatar thất bại", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error removing avatar:", error);
      toast.error("Có lỗi xảy ra khi xóa avatar", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Thay đổi ảnh đại diện
          </h2>

          {/* Current Avatar */}
          <div className="mb-8">
            <Avatar
              size={120}
              src={user?.avatar}
              icon={<UserOutlined />}
              className="border-4 border-emerald-200"
            />
            <p className="text-sm text-gray-600 mt-4">
              {user?.name || "Người dùng"}
            </p>
          </div>

          {/* URL Input Form */}
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="max-w-md mx-auto"
          >
            <Form.Item
              name="avatarUrl"
              label="URL ảnh đại diện"
              rules={[
                { required: true, message: "Vui lòng nhập URL ảnh!" },
                { type: "url", message: "URL không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<LinkOutlined />}
                placeholder="https://example.com/avatar.jpg"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                variant="primary"
                loading={loading}
                size="lg"
                className="w-full"
                onClick={() => form.submit()}
              >
                {loading ? "Đang cập nhật..." : "Cập nhật avatar"}
              </Button>
            </Form.Item>
          </Form>

          {/* Remove Avatar Button */}
          {user?.avatar && (
            <div className="mt-4">
              <Button
                variant="danger"
                size="lg"
                icon={<DeleteOutlined />}
                onClick={handleRemoveAvatar}
                loading={loading}
              >
                Xóa ảnh hiện tại
              </Button>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">
              Hướng dẫn sử dụng
            </h3>
            <ul className="text-sm text-blue-800 space-y-2 text-left">
              <li>• Dán link URL ảnh từ internet</li>
              <li>• URL phải trỏ trực tiếp đến file ảnh</li>
              <li>• Hỗ trợ định dạng: JPG, PNG, GIF, WebP</li>
              <li>• Tỷ lệ khuyến nghị: 1:1 (vuông)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChangeAvatar;
