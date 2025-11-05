import { Review } from "../../models/index.js";
import Service from "../../models/Service.js";
import Appointment from "../../models/Appointment.js";

// Get all reviews with filtering and pagination
export const getReviews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      serviceId,
      rating,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build filter query
    const filter = {};

    if (serviceId) {
      filter.service = serviceId;
    }

    if (rating) {
      filter.rating = parseInt(rating);
    }

    // Note: Search will be handled after population since we need to search in user name

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    // Get all reviews with populated data first (for search functionality)
    const allReviews = await Review.find(filter)
      .populate("user", "name email avatar")
      .populate("service", "name")
      .populate("booking", "appointmentNumber")
      .sort(sort)
      .lean();

    // If search is provided, filter by user name in populated data
    let filteredReviews = allReviews;
    if (search) {
      filteredReviews = allReviews.filter((review) => {
        const userName = review.user?.name || "";
        const comment = review.comment || "";
        return (
          userName.toLowerCase().includes(search.toLowerCase()) ||
          comment.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    // Get total count for pagination
    const totalCount = filteredReviews.length;
    const totalPages = Math.ceil(totalCount / parseInt(limit));

    // Apply pagination to filtered results
    const reviews = filteredReviews.slice(skip, skip + parseInt(limit));

    // Get services for filter dropdown
    const services = await Service.find({}, "name").lean();

    return res.json({
      success: true,
      data: {
        reviews: filteredReviews,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1,
        },
        filters: {
          services,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể tải danh sách đánh giá",
      error: error.message,
    });
  }
};

// Get single review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id)
      .populate("user", "name email phone avatar")
      .populate("service", "name description images")
      .populate("booking", "appointmentNumber appointmentDate startTime")
      .lean();

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đánh giá",
      });
    }

    return res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error("Error fetching review:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể tải chi tiết đánh giá",
      error: error.message,
    });
  }
};

// Get review statistics
export const getReviewStats = async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: "$rating" },
          ratingDistribution: {
            $push: "$rating",
          },
        },
      },
    ]);

    const ratingCounts = await Review.aggregate([
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    const serviceStats = await Review.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "serviceInfo",
        },
      },
      {
        $unwind: "$serviceInfo",
      },
      {
        $group: {
          _id: "$service",
          serviceName: { $first: "$serviceInfo.name" },
          reviewCount: { $sum: 1 },
          averageRating: { $avg: "$rating" },
        },
      },
      {
        $sort: { reviewCount: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return res.json({
      success: true,
      data: {
        overview: stats[0] || {
          totalReviews: 0,
          averageRating: 0,
        },
        ratingDistribution: ratingCounts,
        topServices: serviceStats,
      },
    });
  } catch (error) {
    console.error("Error fetching review stats:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể tải thống kê đánh giá",
      error: error.message,
    });
  }
};

export default {
  getReviews,
  getReviewById,
  getReviewStats,
};
