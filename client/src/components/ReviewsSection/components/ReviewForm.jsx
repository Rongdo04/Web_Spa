import React, { useState } from "react";
import { Card, Button, Input, Textarea } from "../../ui";

const ReviewForm = ({ serviceId, bookingId, onSubmit }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    tags: [],
    images: [],
  });
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleCommentChange = (e) => {
    setFormData({ ...formData, comment: e.target.value });
  };

  const handleTagAdd = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Mock image upload - in real app, upload to server
    const mockImages = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...mockImages] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }
    if (!formData.comment.trim()) {
      alert("Vui lòng nhập nhận xét!");
      return;
    }

    onSubmit({
      rating: formData.rating,
      comment: formData.comment,
      images: formData.images,
      serviceId,
      bookingId,
    });

    // Reset form
    setFormData({
      rating: 0,
      comment: "",
      tags: [],
      images: [],
    });
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        className={`text-2xl transition-colors ${
          index < (hoveredStar || formData.rating)
            ? "text-yellow-400"
            : "text-gray-300"
        }`}
        onClick={() => handleRatingChange(index + 1)}
        onMouseEnter={() => setHoveredStar(index + 1)}
        onMouseLeave={() => setHoveredStar(0)}
      >
        ★
      </button>
    ));
  };

  const predefinedTags = [
    "Chất lượng tốt",
    "Nhân viên thân thiện",
    "Không gian đẹp",
    "Giá cả hợp lý",
    "Sẽ quay lại",
    "Dịch vụ chuyên nghiệp",
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Viết đánh giá của bạn
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đánh giá của bạn *
          </label>
          <div className="flex items-center gap-1">
            {renderStars()}
            <span className="ml-2 text-sm text-gray-600">
              {formData.rating > 0 && `${formData.rating} sao`}
            </span>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhận xét *
          </label>
          <Textarea
            value={formData.comment}
            onChange={handleCommentChange}
            placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
            rows={4}
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thẻ đánh giá
          </label>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagAdd(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.tags.includes(tag)
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-1 text-emerald-600 hover:text-emerald-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh (tùy chọn)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
          />
          {formData.images.length > 0 && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        images: formData.images.filter((_, i) => i !== index),
                      });
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={formData.rating === 0 || !formData.comment.trim()}
          >
            Gửi đánh giá
          </Button>
        </div>
      </form>
    </Card>
  );
};

export { ReviewForm };
