import React from "react";
import { Badge, Card } from "../../ui";

const ServiceInfo = ({
  name,
  category,
  description,
  duration,
  price,
  requirements,
  notes,
  tags,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline">{category}</Badge>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{name}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Price and Duration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-emerald-600">
              {formatPrice(price)}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Thời lượng</div>
            <div className="text-xl font-semibold text-gray-900">
              {duration} phút
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">* Giá đã bao gồm thuế VAT</div>
      </Card>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Thẻ dịch vụ
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Requirements */}
      {requirements && requirements.trim() && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Yêu cầu</h3>
          <p className="text-gray-700">{requirements}</p>
        </Card>
      )}

      {/* Notes */}
      {notes && notes.trim() && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Ghi chú</h3>
          <p className="text-gray-700">{notes}</p>
        </Card>
      )}
    </div>
  );
};

export default ServiceInfo;
