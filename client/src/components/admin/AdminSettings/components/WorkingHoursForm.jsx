import React, { useState, useEffect } from "react";
import { Button, Input } from "../../../ui";

const WorkingHoursForm = ({ contactInfo, onSave, saving }) => {
  const [workingHours, setWorkingHours] = useState({
    monday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
    tuesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
    wednesday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
    thursday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
    friday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
    saturday: { isOpen: true, openTime: "08:00", closeTime: "20:00" },
    sunday: { isOpen: false, openTime: "08:00", closeTime: "20:00" },
  });

  useEffect(() => {
    if (contactInfo?.workingHours) {
      setWorkingHours(contactInfo.workingHours);
    }
  }, [contactInfo]);

  const days = [
    { key: "monday", name: "Thứ 2" },
    { key: "tuesday", name: "Thứ 3" },
    { key: "wednesday", name: "Thứ 4" },
    { key: "thursday", name: "Thứ 5" },
    { key: "friday", name: "Thứ 6" },
    { key: "saturday", name: "Thứ 7" },
    { key: "sunday", name: "Chủ nhật" },
  ];

  const handleDayChange = (day, field, value) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ workingHours });
  };

  const setAllDays = (isOpen) => {
    const newHours = { ...workingHours };
    days.forEach((day) => {
      newHours[day.key] = { ...newHours[day.key], isOpen };
    });
    setWorkingHours(newHours);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Giờ làm việc
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Cài đặt giờ mở cửa cho từng ngày trong tuần
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quick Actions */}
        <div className="flex gap-4 mb-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setAllDays(true)}
            className="text-sm"
          >
            Mở tất cả
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setAllDays(false)}
            className="text-sm"
          >
            Đóng tất cả
          </Button>
        </div>

        {/* Working Hours for each day */}
        <div className="space-y-4">
          {days.map((day) => (
            <div
              key={day.key}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {day.name}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${day.key}-open`}
                    checked={workingHours[day.key].isOpen}
                    onChange={(e) =>
                      handleDayChange(day.key, "isOpen", e.target.checked)
                    }
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`${day.key}-open`}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Mở cửa
                  </label>
                </div>
              </div>

              {workingHours[day.key].isOpen && (
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Từ
                    </label>
                    <Input
                      type="time"
                      value={workingHours[day.key].openTime}
                      onChange={(e) =>
                        handleDayChange(day.key, "openTime", e.target.value)
                      }
                      className="w-24"
                    />
                  </div>

                  <span className="text-gray-400">-</span>

                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Đến
                    </label>
                    <Input
                      type="time"
                      value={workingHours[day.key].closeTime}
                      onChange={(e) =>
                        handleDayChange(day.key, "closeTime", e.target.value)
                      }
                      className="w-24"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
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

export default WorkingHoursForm;
