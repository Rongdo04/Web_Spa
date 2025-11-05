import React from "react";

const SuccessHeader = ({ bookingId }) => {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-10 h-10 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Đặt lịch thành công!
      </h1>
      <p className="text-gray-600 mb-4">
        Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi
      </p>

      {/* Booking ID */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
        <span className="text-sm text-gray-600">Mã đặt lịch:</span>
        <span className="font-mono font-semibold text-emerald-700 text-lg">
          {bookingId}
        </span>
      </div>
    </div>
  );
};

export { SuccessHeader };
