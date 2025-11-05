import React from "react";
import { EmptyState } from "../../ui";
import { ReviewCard } from "./ReviewCard";

const ReviewsList = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <EmptyState.Data
        title="Chưa có đánh giá nào"
        description="Hãy là người đầu tiên đánh giá dịch vụ này."
        className="py-8"
      />
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id || review._id} review={review} />
      ))}
    </div>
  );
};

export { ReviewsList };
