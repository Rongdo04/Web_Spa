import React from "react";
import { Button } from "../../ui";

const ContactInfoSection = ({ contactInfo }) => {
  // Default values if contactInfo is not available
  const defaultContactInfo = {
    businessName: "Spa & Beauty Center",
    phone: "0123456789",
    email: "info@spa.com",
    address: {
      street: "123 Đường ABC",
      city: "Hồ Chí Minh",
      state: "TP.HCM",
      zipCode: "70000",
      country: "Việt Nam",
    },
    workingHours: {
      monday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
      tuesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
      wednesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
      thursday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
      friday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
      saturday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
      sunday: { isOpen: false, openTime: "08:00", closeTime: "20:00" },
    },
    socialMedia: {
      zalo: "",
    },
  };

  const info = contactInfo || defaultContactInfo;

  // Format working hours
  const formatWorkingHours = () => {
    const days = [
      { key: "monday", name: "Thứ 2" },
      { key: "tuesday", name: "Thứ 3" },
      { key: "wednesday", name: "Thứ 4" },
      { key: "thursday", name: "Thứ 5" },
      { key: "friday", name: "Thứ 6" },
      { key: "saturday", name: "Thứ 7" },
      { key: "sunday", name: "Chủ nhật" },
    ];

    const weekdays = days
      .slice(0, 5)
      .filter((day) => info.workingHours[day.key]?.isOpen);
    const weekends = days
      .slice(5)
      .filter((day) => info.workingHours[day.key]?.isOpen);

    let result = "";

    if (weekdays.length > 0) {
      const firstDay = weekdays[0];
      const lastDay = weekdays[weekdays.length - 1];
      const time = `${firstDay.name} - ${lastDay.name}: ${
        info.workingHours[firstDay.key].openTime
      } - ${info.workingHours[firstDay.key].closeTime}`;
      result += time;
    }

    if (weekends.length > 0) {
      if (result) result += "\n";
      const firstWeekend = weekends[0];
      const lastWeekend = weekends[weekends.length - 1];
      const time = `${firstWeekend.name} - ${lastWeekend.name}: ${
        info.workingHours[firstWeekend.key].openTime
      } - ${info.workingHours[firstWeekend.key].closeTime}`;
      result += time;
    }

    return result || "Liên hệ để biết giờ mở cửa";
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Thông tin liên hệ
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Liên hệ với chúng tôi để được tư vấn miễn phí
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Địa chỉ
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {info.address.street}
                  <br />
                  {info.address.city}, {info.address.state}{" "}
                  {info.address.zipCode}
                  <br />
                  {info.address.country}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🕒</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Giờ mở cửa
                </h3>
                <div className="text-gray-600 dark:text-gray-300 space-y-1">
                  <pre className="whitespace-pre-line font-sans">
                    {formatWorkingHours()}
                  </pre>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    *Đặt lịch trước 24h để đảm bảo có chỗ
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Hotline & Zalo
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    Hotline:{" "}
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {info.phone}
                    </span>
                  </p>
                  {info.socialMedia.zalo && (
                    <p className="text-gray-600 dark:text-gray-300">
                      Zalo:{" "}
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {info.socialMedia.zalo}
                      </span>
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hỗ trợ 24/7, tư vấn miễn phí
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Bản đồ vị trí
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {info.address.street}, {info.address.city}
              </p>
              <Button variant="outline" className="mt-4">
                Xem trên Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
