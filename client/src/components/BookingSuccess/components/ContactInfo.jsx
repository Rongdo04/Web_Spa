import React, { useState, useEffect } from "react";
import { Card } from "../../ui";
import { contactAPI, authAPI } from "../../../services";

const ContactInfo = ({ appointmentData }) => {
  const [contactData, setContactData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both contact info and customer data in parallel
        const [contactResponse, customerResponse] = await Promise.allSettled([
          contactAPI.getContactInfo(),
          authAPI.getProfile(),
        ]);

        // Handle contact data
        if (contactResponse.status === "fulfilled") {
          setContactData(contactResponse.value.data);
        } else {
          console.error("Error fetching contact info:", contactResponse.reason);
          // Fallback to default contact data
          setContactData({
            businessName: "Spa & Beauty Center",
            phone: "0123456789",
            email: "info@spa.com",
            address: {
              street: "123 Đường ABC",
              city: "TP.HCM",
              state: "Quận 1",
              zipCode: "700000",
              country: "Việt Nam",
            },
            workingHours: {
              monday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
              tuesday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
              wednesday: {
                isOpen: true,
                openTime: "08:00",
                closeTime: "22:00",
              },
              thursday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
              friday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
              saturday: { isOpen: true, openTime: "08:00", closeTime: "22:00" },
              sunday: { isOpen: false, openTime: "08:00", closeTime: "20:00" },
            },
          });
        }

        // Handle customer data
        if (customerResponse.status === "fulfilled") {
          setCustomerData(customerResponse.value.data);
        } else {
          console.error(
            "Error fetching customer data:",
            customerResponse.reason
          );
          // Customer data will be null, will use appointment data as fallback
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatWorkingHours = () => {
    if (!contactData?.workingHours) return "8:00 - 22:00 (Hàng ngày)";

    const dayNames = {
      monday: "Thứ 2",
      tuesday: "Thứ 3",
      wednesday: "Thứ 4",
      thursday: "Thứ 5",
      friday: "Thứ 6",
      saturday: "Thứ 7",
      sunday: "Chủ nhật",
    };

    const days = Object.keys(contactData.workingHours);
    const openDays = days.filter((day) => contactData.workingHours[day].isOpen);

    if (openDays.length === 0) return "Đóng cửa";

    if (openDays.length === 7) {
      const firstDay = contactData.workingHours[openDays[0]];
      return `${firstDay.openTime} - ${firstDay.closeTime} (Hàng ngày)`;
    }

    if (openDays.length === 6 && !contactData.workingHours.sunday.isOpen) {
      const firstDay = contactData.workingHours[openDays[0]];
      return `${firstDay.openTime} - ${firstDay.closeTime} (Thứ 2 - Thứ 7)`;
    }

    // Custom schedule
    const schedule = openDays
      .map((day) => {
        const dayData = contactData.workingHours[day];
        return `${dayNames[day]}: ${dayData.openTime} - ${dayData.closeTime}`;
      })
      .join(", ");

    return schedule;
  };

  const formatAddress = () => {
    if (!contactData?.address) return "123 Đường ABC, Quận 1, TP.HCM";

    const { street, city, state, zipCode, country } = contactData.address;
    return `${street}, ${state}, ${city} ${zipCode}, ${country}`;
  };

  if (loading) {
    return (
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
          <span className="ml-3 text-gray-600">
            Đang tải thông tin liên hệ...
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Thông tin liên hệ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Contact Info */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">
            Thông tin khách hàng
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-gray-600">Tên:</span>
              <span className="font-medium">
                {customerData?.customer?.name ||
                  (typeof appointmentData?.customer === "object"
                    ? appointmentData?.customer?.name
                    : appointmentData?.customer) ||
                  "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-gray-600">SĐT:</span>
              <span className="font-medium">
                {customerData?.customer?.phone ||
                  appointmentData?.phone ||
                  (typeof appointmentData?.customer === "object"
                    ? appointmentData?.customer?.phone
                    : "N/A") ||
                  "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">
                {customerData?.customer?.email ||
                  appointmentData?.email ||
                  (typeof appointmentData?.customer === "object"
                    ? appointmentData?.customer?.email
                    : "N/A") ||
                  "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Spa Contact Info */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">
            {contactData?.businessName || "Thông tin spa"}
          </h3>
          {contactData?.businessDescription && (
            <p className="text-sm text-gray-600 mb-3">
              {contactData.businessDescription}
            </p>
          )}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-600">Địa chỉ:</span>
              <span className="font-medium">{formatAddress()}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-gray-600">Hotline:</span>
              <span className="font-medium">
                {contactData?.phone || "0123 456 789"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">
                {contactData?.email || "info@spa.com"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-600">Giờ mở cửa:</span>
              <span className="font-medium">{formatWorkingHours()}</span>
            </div>
          </div>

          {/* Social Media Links */}
          {contactData?.socialMedia && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Kết nối với chúng tôi
              </h4>
              <div className="flex gap-3">
                {contactData.socialMedia.facebook && (
                  <a
                    href={contactData.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {contactData.socialMedia.instagram && (
                  <a
                    href={contactData.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-800 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281h-1.297v1.297h1.297V7.707zm-3.323 1.297c.718 0 1.297.579 1.297 1.297s-.579 1.297-1.297 1.297-1.297-.579-1.297-1.297.579-1.297 1.297-1.297z" />
                    </svg>
                  </a>
                )}
                {contactData.socialMedia.zalo && (
                  <a
                    href={contactData.socialMedia.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.461-2.136 4.671-1.24 1.21-2.813 1.936-4.671 2.136-.169.015-.338.023-.507.023-.169 0-.338-.008-.507-.023-1.858-.2-3.431-.926-4.671-2.136-1.24-1.21-1.967-2.813-2.136-4.671-.015-.169-.023-.338-.023-.507 0-.169.008-.338.023-.507.169-1.858.896-3.461 2.136-4.671 1.24-1.21 2.813-1.936 4.671-2.136.169-.015.338-.023.507-.023.169 0 .338.008.507.023 1.858.2 3.431.926 4.671 2.136 1.24 1.21 1.967 2.813 2.136 4.671.015.169.023.338.023.507 0 .169-.008.338-.023.507z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export { ContactInfo };
