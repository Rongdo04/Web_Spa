import React from "react";
import { Card, Badge } from "../../ui";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Review Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={review.user?.avatar || "/images/default-service.svg"}
              alt={review.user?.name || "Người dùng"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900">
                {review.user.name}
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="text-sm text-gray-600">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {review.isVerified && (
            <Badge variant="success" className="text-xs">
              Đã xác thực
            </Badge>
          )}
        </div>

        {/* Review Content */}
        <div>
          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        </div>

        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  // Mock image modal
                }}
              />
            ))}
          </div>
        )}

        {/* Review Tags */}
        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {review.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Review Actions */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
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
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            Hữu ích ({review.helpfulCount || 0})
          </button>

          <button className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
            Phản hồi
          </button>
        </div>
      </div>
    </Card>
  );
};

export { ReviewCard };
