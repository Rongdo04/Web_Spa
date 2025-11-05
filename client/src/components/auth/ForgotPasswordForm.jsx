// components/auth/ForgotPasswordForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authAPI from "../../services/authAPI";
import LoadingSpinner from "../ui/LoadingSpinner";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Vui lòng nhập email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    try {
      setIsLoading(true);
      await authAPI.forgotPassword(email);
      setIsEmailSent(true);
      toast.success("Email khôi phục đã được gửi!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi khi gửi email khôi phục"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="text-center">
        <div className="text-green-500 text-6xl mb-4">📧</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Email đã được gửi!
        </h3>
        <p className="text-gray-600 mb-6">
          Chúng tôi đã gửi link khôi phục mật khẩu đến email{" "}
          <span className="font-medium text-gray-900">{email}</span>. Vui lòng
          kiểm tra hộp thư và làm theo hướng dẫn.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => {
              setIsEmailSent(false);
              setEmail("");
            }}
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Gửi lại email
          </button>

          <Link
            to="/login"
            className="block w-full text-center text-sm text-emerald-600 hover:text-blue-600 transition-colors"
          >
            ← Quay lại đăng nhập
          </Link>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <span className="font-medium">Lưu ý:</span> Link khôi phục có hiệu
            lực trong 15 phút. Nếu không thấy email, vui lòng kiểm tra thư mục
            spam.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="text-blue-500 text-6xl mb-4">🔑</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Quên mật khẩu?
        </h3>
        <p className="text-gray-600">
          Nhập email của bạn và chúng tôi sẽ gửi link khôi phục mật khẩu
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Nhập email của bạn"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Đang gửi...</span>
            </div>
          ) : (
            "Gửi email khôi phục"
          )}
        </button>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-emerald-600 hover:text-blue-600 transition-colors"
          >
            ← Quay lại đăng nhập
          </Link>
        </div>
      </form>

      {/* Help Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Gợi ý:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Kiểm tra chính xác email đã đăng ký</li>
            <li>• Link khôi phục có hiệu lực trong 15 phút</li>
            <li>• Kiểm tra cả thư mục spam/rác</li>
            <li>• Liên hệ admin nếu vẫn gặp vấn đề</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
