import React, { useState, useEffect } from "react";
import { adminContactAPI } from "../../../services";
import { LoadingSpinner, ErrorState, Button, Input, Textarea } from "../../ui";

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
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
    socialMedia: {
      facebook: "",
      instagram: "",
      tiktok: "",
      youtube: "",
      zalo: "",
    },
  });

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminContactAPI.getContactInfo();
      setContactInfo(response.data);

      // Set form data
      setFormData({
        businessName: response.data.businessName || "",
        businessDescription: response.data.businessDescription || "",
        phone: response.data.phone || "",
        email: response.data.email || "",
        address: {
          street: response.data.address?.street || "",
          city: response.data.address?.city || "",
          state: response.data.address?.state || "",
          zipCode: response.data.address?.zipCode || "",
          country: response.data.address?.country || "Việt Nam",
        },
        socialMedia: {
          facebook: response.data.socialMedia?.facebook || "",
          instagram: response.data.socialMedia?.instagram || "",
          tiktok: response.data.socialMedia?.tiktok || "",
          youtube: response.data.socialMedia?.youtube || "",
          zalo: response.data.socialMedia?.zalo || "",
        },
      });
    } catch (err) {
      console.error("Error loading contact info:", err);
      setError(err.message || "Không thể tải thông tin liên hệ");
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      const response = await adminContactAPI.updateContactInfo(formData);
      setContactInfo(response.data);

      alert("Cập nhật thành công!");
    } catch (err) {
      console.error("Error updating contact info:", err);
      setError(err.message || "Không thể cập nhật thông tin liên hệ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorState
          title="Không thể tải thông tin cài đặt"
          description={error}
          onRetry={loadContactInfo}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Cài đặt thông tin liên hệ
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Quản lý thông tin liên hệ hiển thị trên website
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Thông tin cơ bản
            </h2>

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

            <div className="mt-4">
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

            <div className="mt-4">
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
          </div>

          {/* Address */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Địa chỉ
            </h2>

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
    </div>
  );
};

export default AdminSettings;
