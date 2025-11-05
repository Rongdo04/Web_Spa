import React from "react";
import { Card } from "../../ui";

const ReviewsHeader = ({ overallRating, totalReviews, ratingDistribution }) => {
  const renderStars = (rating, size = "text-lg") => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${size} ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="text-center lg:text-left">
          <div className="mb-4">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {overallRating.toFixed(1)}
            </div>
            <div className="flex justify-center lg:justify-start items-center gap-2 mb-2">
              {renderStars(overallRating, "text-2xl")}
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Dựa trên {totalReviews} đánh giá
            </p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Phân bố đánh giá
          </h3>
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {stars} sao
                  </span>
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-right">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export { ReviewsHeader };
