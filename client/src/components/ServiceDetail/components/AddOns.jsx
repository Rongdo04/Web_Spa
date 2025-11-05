import React, { useState } from "react";
import { Card, Checkbox, Badge } from "../../ui";

const AddOns = ({ addOns, selectedAddOns, onAddOnsChange }) => {
  const [expandedAddOn, setExpandedAddOn] = useState(null);

  const handleAddOnChange = (addOnId, checked) => {
    if (checked) {
      onAddOnsChange([...selectedAddOns, addOnId]);
    } else {
      onAddOnsChange(selectedAddOns.filter((id) => id !== addOnId));
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getTotalAddOnPrice = () => {
    return selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
  };

  const getTotalAddOnDuration = () => {
    return selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return total + (addOn ? addOn.duration : 0);
    }, 0);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Dịch vụ bổ sung
      </h3>

      <div className="space-y-4">
        {addOns.map((addOn) => (
          <div
            key={addOn.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={selectedAddOns.includes(addOn.id)}
                onChange={(checked) => handleAddOnChange(addOn.id, checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{addOn.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-emerald-600">
                      {formatPrice(addOn.price)}
                    </span>
                    {addOn.duration > 0 && (
                      <Badge variant="outline">+{addOn.duration} phút</Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {addOn.description}
                </p>
                {addOn.duration > 0 && (
                  <p className="text-xs text-gray-500">
                    Thời gian thêm: {addOn.duration} phút
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {selectedAddOns.length > 0 && (
        <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Tóm tắt bổ sung</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Số dịch vụ bổ sung:</span>
              <span className="font-medium">{selectedAddOns.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Thời gian thêm:</span>
              <span className="font-medium">
                {getTotalAddOnDuration() > 0
                  ? `+${getTotalAddOnDuration()} phút`
                  : "Không thay đổi"}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-emerald-600">
              <span>Tổng phí bổ sung:</span>
              <span>{formatPrice(getTotalAddOnPrice())}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Lưu ý:</strong> Dịch vụ bổ sung sẽ được thực hiện cùng với
          dịch vụ chính
        </p>
      </div>
    </Card>
  );
};

export default AddOns;
