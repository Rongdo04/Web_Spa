import React, { useState, useEffect } from "react";
import { Card, Button, DatePicker } from "../../ui";
import { availabilityAPI } from "../../../services";

const TimeSelection = ({
  service,
  staff,
  date,
  time,
  onDateChange,
  onTimeChange,
}) => {
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTime, setSelectedTime] = useState(time);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load availability from API
  useEffect(() => {
    const loadAvailability = async () => {
      if (!selectedDate || !service?.id) return;

      try {
        setLoading(true);
        setError(null);
        // For now, use mock data since availability API is not implemented
        // const response = await availabilityAPI.getAvailableTimeSlots({
        //   serviceId: service.id,
        //   staffId: staff,
        //   date: selectedDate,
        // });
        // setAvailableSlots(response.data || []);
        setAvailableSlots(getMockAvailability(selectedDate));
      } catch (err) {
        console.error("Error loading availability:", err);
        setError(err.message || "Không thể tải lịch trống");
        // Fallback to mock data
        setAvailableSlots(getMockAvailability(selectedDate));
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
  }, [selectedDate, service?.id, staff]);

  // Mock availability data as fallback
  const getMockAvailability = (dateString) => {
    if (!dateString) return [];

    const seed = dateString.split("-").join("");
    const timeSlots = [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:00", available: parseInt(seed) % 3 !== 0 },
      { time: "14:00", available: true },
      { time: "15:00", available: true },
      { time: "16:00", available: parseInt(seed) % 4 !== 0 },
      { time: "17:00", available: parseInt(seed) % 5 !== 0 },
      { time: "18:00", available: true },
    ];
    return timeSlots;
  };

  // Get available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split("T")[0];

      const dateAvailability = getMockAvailability(dateString);
      if (dateAvailability.length > 0) {
        const hasAvailableSlots = dateAvailability.some(
          (slot) => slot.available
        );
        if (hasAvailableSlots) {
          dates.push({
            value: dateString,
            label: date.toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            date: date,
          });
        }
      }
    }

    return dates;
  };

  const availableDates = getAvailableDates();
  const selectedDateSlots = selectedDate ? availableSlots : [];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
    onDateChange(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    onTimeChange(time);
  };

  const isToday = (dateString) => {
    const today = new Date().toISOString().split("T")[0];
    return dateString === today;
  };

  const isTomorrow = (dateString) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateString === tomorrow.toISOString().split("T")[0];
  };

  const getDateLabel = (dateString) => {
    if (isToday(dateString)) return "Hôm nay";
    if (isTomorrow(dateString)) return "Ngày mai";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Chọn thời gian
        </h2>
        <p className="text-gray-600">
          Chọn ngày và giờ phù hợp với lịch trình của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Time Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn giờ</h3>
          {selectedDate ? (
            loading ? (
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-10 bg-gray-300 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-4">
                <p className="text-red-500 mb-2">{error}</p>
                <p className="text-sm text-gray-500">Sử dụng dữ liệu mẫu</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {selectedDateSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeChange(slot.time)}
                    disabled={!slot.available}
                    className={`text-sm ${
                      selectedTime === slot.time
                        ? "bg-emerald-600 text-white"
                        : slot.available
                        ? "hover:bg-emerald-50"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Vui lòng chọn ngày để xem lịch trống</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Time Summary */}
      {selectedDate && selectedTime && (
        <Card className="p-4 bg-emerald-50">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium text-emerald-800">
              Đã chọn: {getDateLabel(selectedDate)} lúc {selectedTime}
            </span>
          </div>
        </Card>
      )}

      {/* Date Picker */}
      <DatePicker
        label="Chọn ngày"
        value={selectedDate}
        onChange={(date) => {
          handleDateChange(date);
        }}
        minDate={new Date()}
        maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
        placeholder="Chọn ngày hẹn"
      />
    </div>
  );
};

export { TimeSelection };
