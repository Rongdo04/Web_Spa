import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui";

const ActionButtons = () => {
  const navigate = useNavigate();
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  const handleAddToCalendar = () => {
    // Mock function - in real app, this would generate calendar file
    alert("Đã thêm vào lịch của bạn!");
  };

  const handleShare = async () => {
    const bookingId = `SPA${Date.now().toString().slice(-8)}`;
    const shareUrl = `${window.location.origin}/booking/${bookingId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => navigate("/")} variant="outline" size="lg">
          Về trang chủ
        </Button>
        <Button onClick={() => navigate("/services")} size="lg">
          Đặt lịch thêm
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={handleAddToCalendar}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Thêm vào lịch
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          Chia sẻ
        </Button>

        <Button
          onClick={() => navigate("/my-bookings")}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Xem lịch của tôi
        </Button>
      </div>

      {/* Share Success Message */}
      {showShareSuccess && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm">
            <svg
              className="w-4 h-4"
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
            Đã sao chép link vào clipboard!
          </div>
        </div>
      )}
    </div>
  );
};

export { ActionButtons };
