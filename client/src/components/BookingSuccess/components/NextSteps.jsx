import React from "react";
import { Card } from "../../ui";

const NextSteps = () => {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Bước tiếp theo
      </h2>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-semibold text-emerald-600">1</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">Xác nhận qua SMS/Email</p>
            <p className="text-sm text-gray-600">
              Chúng tôi sẽ gửi thông tin xác nhận chi tiết trong vòng 5 phút
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-semibold text-emerald-600">2</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">Đến spa đúng giờ</p>
            <p className="text-sm text-gray-600">
              Vui lòng đến trước 10 phút để chuẩn bị. Trễ quá 15 phút có thể bị
              hủy lịch
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-semibold text-emerald-600">3</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">Thanh toán tại spa</p>
            <p className="text-sm text-gray-600">
              Chúng tôi chấp nhận thanh toán bằng tiền mặt hoặc thẻ
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export { NextSteps };
