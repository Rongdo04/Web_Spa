import React, { useState } from "react";
import { Card, Button } from "../../ui";
import ReviewsSection from "../../ReviewsSection/ReviewsSection";

const BookingReviews = ({ booking }) => {
  const [showReviews, setShowReviews] = useState(false);

  if (!showReviews) {
    return (
      <Card className="p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Đánh giá dịch vụ
          </h3>
          <p className="text-gray-600 mb-4">
            Chia sẻ trải nghiệm của bạn về dịch vụ này
          </p>
          <Button
            onClick={() => setShowReviews(true)}
            variant="outline"
            size="sm"
          >
            Xem đánh giá
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Đánh giá dịch vụ
        </h3>
        <Button
          onClick={() => setShowReviews(false)}
          variant="outline"
          size="sm"
        >
          Thu gọn
        </Button>
      </div>

      <ReviewsSection
        serviceId={
          booking?.serviceId?._id ||
          booking?.serviceId?.id ||
          booking?.service?.id ||
          booking?.serviceId ||
          null
        }
        bookingId={booking?._id || booking?.id || null}
        showReviewForm={booking?.status === "completed"}
      />
    </div>
  );
};

export { BookingReviews };
