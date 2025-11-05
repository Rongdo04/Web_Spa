import React, { useState, useEffect } from "react";
import { Button, Input, Textarea } from "../../../ui";

const ContactInfoForm = ({ contactInfo, onSave, saving }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessDescription: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Việt Nam",
    },
  });

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        businessName: contactInfo.businessName || "",
        businessDescription: contactInfo.businessDescription || "",
        phone: contactInfo.phone || "",
        email: contactInfo.email || "",
        address: {
          street: contactInfo.address?.street || "",
          city: contactInfo.address?.city || "",
          state: contactInfo.address?.state || "",
          zipCode: contactInfo.address?.zipCode || "",
          country: contactInfo.address?.country || "Việt Nam",
        },
      });
    }
  }, [contactInfo]);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Thông tin cơ bản
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Cập nhật thông tin doanh nghiệp và liên hệ
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tên doanh nghiệp *
            </label>
            <Input
              type="text"
              value={formData.businessName}
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
              placeholder="Nhập tên doanh nghiệp"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Số điện thoại *
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Nhập email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mô tả doanh nghiệp
          </label>
          <Textarea
            value={formData.businessDescription}
            onChange={(e) =>
              handleInputChange("businessDescription", e.target.value)
            }
            placeholder="Nhập mô tả doanh nghiệp"
            rows={3}
          />
        </div>

        {/* Address Information */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Địa chỉ
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Địa chỉ đường *
              </label>
              <Input
                type="text"
                value={formData.address.street}
                onChange={(e) =>
                  handleInputChange("address.street", e.target.value)
                }
                placeholder="Nhập địa chỉ đường"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thành phố *
                </label>
                <Input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) =>
                    handleInputChange("address.city", e.target.value)
                  }
                  placeholder="Nhập thành phố"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tỉnh/Thành
                </label>
                <Input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) =>
                    handleInputChange("address.state", e.target.value)
                  }
                  placeholder="Nhập tỉnh/thành"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mã bưu điện
                </label>
                <Input
                  type="text"
                  value={formData.address.zipCode}
                  onChange={(e) =>
                    handleInputChange("address.zipCode", e.target.value)
                  }
                  placeholder="Nhập mã bưu điện"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quốc gia
              </label>
              <Input
                type="text"
                value={formData.address.country}
                onChange={(e) =>
                  handleInputChange("address.country", e.target.value)
                }
                placeholder="Nhập quốc gia"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button type="submit" disabled={saving} className="min-w-32">
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfoForm;
