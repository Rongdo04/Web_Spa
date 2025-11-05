import React, { useEffect, useMemo, useState } from "react";
import {
  ReviewsHeader,
  ReviewsFilters,
  ReviewsList,
  ReviewForm,
} from "./components";
import { reviewsAPI } from "../../services";

const ReviewsSection = ({
  serviceId = null,
  bookingId = null,
  showReviewForm = false,
  onReviewSubmit = null,
}) => {
  const [filter, setFilter] = useState("newest");
  const [reviews, setReviews] = useState([]);
  const [myBookingReview, setMyBookingReview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // Load public reviews by service if provided
        if (serviceId) {
          const res = await reviewsAPI.getByService(serviceId);
          if (res.success) setReviews(res.data || []);
          else setReviews([]);
        } else {
          setReviews([]);
        }

        // Load my review for the booking to decide form visibility
        if (bookingId) {
          try {
            const mine = await reviewsAPI.getByBooking(bookingId);
            if (mine.success) setMyBookingReview(mine.data || null);
            else setMyBookingReview(null);
          } catch {
            setMyBookingReview(null);
          }
        } else {
          setMyBookingReview(null);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [serviceId, bookingId]);

  const getFilteredReviews = () => {
    let filtered = [...reviews];

    // Filter by service if provided
    if (serviceId) {
      filtered = filtered.filter(
        (review) => String(review.service) === String(serviceId)
      );
    }

    // Filter by booking if provided
    if (bookingId) {
      filtered = filtered.filter(
        (review) => String(review.booking) === String(bookingId)
      );
    }

    // Apply sorting filter
    switch (filter) {
      case "newest":
        filtered = filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "highest":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        filtered = filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "withImages":
        filtered = filtered.filter(
          (review) => review.images && review.images.length > 0
        );
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      const res = await reviewsAPI.create({
        serviceId,
        bookingId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        images: reviewData.images || [],
      });

      if (res.success) {
        // prepend new review and set myBookingReview
        setReviews((prev) => [res.data, ...prev]);
        setMyBookingReview(res.data);
        if (onReviewSubmit) onReviewSubmit(res.data);
        alert("Cảm ơn bạn đã đánh giá!");
      }
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Không thể gửi đánh giá. Vui lòng thử lại."
      );
    }
  };

  const filteredReviews = getFilteredReviews();
  const serviceReviews = useMemo(() => {
    return serviceId
      ? reviews.filter((r) => String(r.service) === String(serviceId))
      : reviews;
  }, [reviews, serviceId]);

  // Calculate overall rating and distribution
  const overallRating =
    serviceReviews.length > 0
      ? serviceReviews.reduce((sum, review) => sum + review.rating, 0) /
        serviceReviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    stars: star,
    count: serviceReviews.filter((review) => review.rating === star).length,
    percentage:
      serviceReviews.length > 0
        ? (serviceReviews.filter((review) => review.rating === star).length /
            serviceReviews.length) *
          100
        : 0,
  }));

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <ReviewsHeader
        overallRating={overallRating}
        totalReviews={serviceReviews.length}
        ratingDistribution={ratingDistribution}
      />

      {/* Reviews Filters */}
      <ReviewsFilters
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        totalReviews={filteredReviews.length}
      />

      {/* Review Form (if enabled) */}
      {showReviewForm && !myBookingReview && (
        <ReviewForm
          serviceId={serviceId}
          bookingId={bookingId}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* Reviews List */}
      <ReviewsList reviews={filteredReviews} />
    </div>
  );
};

export default ReviewsSection;
