import React, { useState, useEffect } from "react";
import { Card, Button, Input, Select, Pagination } from "../../ui";
import { adminReviewsAPI } from "../../../services";
import { ReviewDetailModal } from "./components/ReviewDetailModal";
import { toast } from "react-toastify";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filters and pagination
  const [filters, setFilters] = useState({
    search: "",
    serviceId: "",
    rating: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [services, setServices] = useState([]);

  // Load reviews
  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        ...(filters.search && { search: filters.search }),
        ...(filters.serviceId && { serviceId: filters.serviceId }),
        ...(filters.rating && { rating: filters.rating }),
      };

      const response = await adminReviewsAPI.getReviews(params);
      console.log("AdminReviews - Full response:", response);
      console.log("AdminReviews - Response type:", typeof response);
      console.log("AdminReviews - Response keys:", Object.keys(response || {}));

      // Check if response has the expected structure
      if (response) {
        console.log("AdminReviews - response.success:", response.success);
        console.log("AdminReviews - response.data:", response.data);

        if (response.data) {
          const {
            reviews,
            pagination: paginationData,
            filters,
          } = response.data;
          console.log("AdminReviews - reviews:", reviews);
          console.log("AdminReviews - paginationData:", paginationData);
          console.log("AdminReviews - filters:", filters);

          setReviews(reviews || []);
          setPagination((prev) => ({
            ...prev,
            current: paginationData.currentPage,
            total: paginationData.totalCount,
            totalPages: paginationData.totalPages,
          }));
          setServices(filters?.services || []);
          console.log("AdminReviews - Services loaded:", filters?.services);
        } else {
          console.log("AdminReviews - No data in response");
          setError("Không có dữ liệu trong response");
        }
      } else {
        console.log("AdminReviews - No response received");
        setError("Không nhận được response từ server");
      }
    } catch (err) {
      console.error("Error loading reviews:", err);
      setError("Có lỗi xảy ra khi tải danh sách đánh giá");
      toast.error("Có lỗi xảy ra khi tải danh sách đánh giá");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [
    pagination.current,
    pagination.pageSize,
    filters.search,
    filters.serviceId,
    filters.rating,
  ]);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Reset to first page when filtering
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize,
    }));
  };

  const handlePageSizeChange = (current, size) => {
    setPagination((prev) => ({
      ...prev,
      current: 1, // Reset to first page when changing page size
      pageSize: size,
    }));
  };

  const handleReviewClick = async (review) => {
    try {
      const response = await adminReviewsAPI.getReviewById(review._id);
      if (response.success) {
        setSelectedReview(response.data);
        setShowModal(true);
      }
    } catch (err) {
      toast.error("Không thể tải chi tiết đánh giá");
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
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
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý đánh giá</h1>
          <p className="text-gray-600">
            Xem và quản lý tất cả đánh giá từ khách hàng
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {filters.search || filters.serviceId || filters.rating ? (
            <span>
              Tìm thấy {pagination.total} đánh giá
              {filters.search && ` cho "${filters.search}"`}
            </span>
          ) : (
            <span>Tổng cộng: {pagination.total} đánh giá</span>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {(filters.search || filters.serviceId || filters.rating) && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-blue-800">
                Bộ lọc đang áp dụng:
              </span>
              {filters.search && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Tìm kiếm: "{filters.search}"
                </span>
              )}
              {filters.serviceId && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Dịch vụ:{" "}
                  {services.find((s) => s._id === filters.serviceId)?.name ||
                    "Đã chọn"}
                </span>
              )}
              {filters.rating && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Đánh giá: {filters.rating} sao
                </span>
              )}
            </div>
            <Button
              onClick={() => {
                setFilters({ search: "", serviceId: "", rating: "" });
                setSearchInput("");
              }}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              Xóa tất cả
            </Button>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <Input
              type="text"
              placeholder="Tên khách hàng, nội dung..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {/* Service Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dịch vụ
            </label>
            <select
              value={filters.serviceId}
              onChange={(e) => handleFilterChange("serviceId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Tất cả dịch vụ ({services.length})</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá
            </label>
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange("rating", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Tất cả đánh giá</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
            </select>
          </div>

          {/* Page Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hiển thị
            </label>
            <select
              value={pagination.pageSize}
              onChange={(e) =>
                handlePageSizeChange(
                  pagination.current,
                  parseInt(e.target.value)
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="5">5 / trang</option>
              <option value="10">10 / trang</option>
              <option value="20">20 / trang</option>
              <option value="50">50 / trang</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Reviews Table */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">
              {filters.search || filters.serviceId || filters.rating
                ? "Đang tìm kiếm..."
                : "Đang tải đánh giá..."}
            </p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600">{error}</p>
            <Button onClick={loadReviews} variant="outline" className="mt-4">
              Thử lại
            </Button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">
              {filters.search || filters.serviceId || filters.rating
                ? "Không tìm thấy đánh giá phù hợp"
                : "Chưa có đánh giá nào"}
            </p>
            {(filters.search || filters.serviceId || filters.rating) && (
              <p className="text-gray-400 text-sm mb-4">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            )}
            {(filters.search || filters.serviceId || filters.rating) && (
              <Button
                onClick={() => {
                  setFilters({ search: "", serviceId: "", rating: "" });
                  setSearchInput("");
                }}
                variant="outline"
                className="mt-2"
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khách hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dịch vụ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Đánh giá
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nội dung
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <tr
                      key={review._id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleReviewClick(review)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                review.user?.avatar ||
                                "/images/default-service.svg"
                              }
                              alt={review.user?.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {review.user?.name || "Khách hàng"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {review.service?.name || "Dịch vụ không xác định"}
                        </div>
                        <div className="text-sm text-gray-500">
                          Mã lịch: {review.booking?.appointmentNumber || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                          <span className="ml-2 text-sm text-gray-600">
                            ({review.rating}/5)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {truncateText(review.comment)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {reviews.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                  pageSizeOptions={[5, 10, 20, 50]}
                  infoText="Hiển thị {start}-{end} của {total} đánh giá"
                />
              </div>
            )}
          </>
        )}
      </Card>

      {/* Review Detail Modal */}
      {showModal && selectedReview && (
        <ReviewDetailModal
          review={selectedReview}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedReview(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminReviews;
