import React, { useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Input, Form, Progress, Alert } from "antd";
import { Button } from "../../ui";
import authAPI from "../../../services/authAPI";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await authAPI.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (response.success) {
        toast.success("Đổi mật khẩu thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Reset form
        form.resetFields();
      } else {
        toast.error(response.message || "Đổi mật khẩu thất bại", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.message || "Có lỗi xảy ra khi đổi mật khẩu", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", status: "exception" };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ["Rất yếu", "Yếu", "Trung bình", "Khá", "Mạnh", "Rất mạnh"];
    const statuses = [
      "exception",
      "exception",
      "normal",
      "normal",
      "success",
      "success",
    ];

    return {
      strength: (strength / 6) * 100,
      label: labels[strength] || "",
      status: statuses[strength] || "exception",
    };
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Đổi mật khẩu
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Để bảo mật tài khoản, hãy sử dụng mật khẩu mạnh và không chia sẻ với
          ai khác.
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="currentPassword"
          label="Mật khẩu hiện tại"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu hiện tại"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("currentPassword") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới phải khác mật khẩu hiện tại")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu mới"
            size="large"
            onChange={(e) => {
              const strength = getPasswordStrength(e.target.value);
              // You can add a state to show password strength if needed
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập lại mật khẩu mới"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            variant="primary"
            loading={isLoading}
            size="lg"
            className="w-full"
            onClick={() => form.submit()}
          >
            {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
