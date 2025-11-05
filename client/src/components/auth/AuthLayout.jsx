// components/auth/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="h-screen w-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-300/10 rounded-full translate-y-40 -translate-x-40"></div>

      <div className="relative w-full max-w-sm space-y-5">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-emerald-600 text-lg font-bold">S</span>
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-white">
            Spa Luxury
          </h2>
          <p className="mt-1 text-xs text-emerald-200">
            Hệ thống đặt lịch spa chuyên nghiệp
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 p-6">
          <div className="bg-white rounded-lg p-4 shadow-inner">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
