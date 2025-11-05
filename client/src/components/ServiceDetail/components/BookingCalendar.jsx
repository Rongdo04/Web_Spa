import React, { useState } from "react";
import { Card, Button, DatePicker } from "../../ui";
import {
  getVietnamTime,
  formatDateToVietnamString,
  parseVietnamDate,
  isTodayVietnam,
  isTomorrowVietnam,
  getAvailableDatesVietnam,
  formatVietnamDate,
  getTodayVietnamString,
  getTomorrowVietnamString,
} from "/src/utils";

const BookingCalendar = ({
  availability,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Get available dates (next 30 days) using Vietnam timezone
  const availableDates = getAvailableDatesVietnam(availability);
  const selectedDateSlots = selectedDate ? availability[selectedDate] : [];

  const formatTime = (time) => {
    return time;
  };

  const isToday = (dateString) => {
    return dateString === getTodayVietnamString();
  };

  const isTomorrow = (dateString) => {
    return dateString === getTomorrowVietnamString();
  };

  const getDateLabel = (dateString) => {
    if (isToday(dateString)) return "Hôm nay";
    if (isTomorrow(dateString)) return "Ngày mai";
    return formatVietnamDate(dateString, {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Chọn thời gian
      </h3>

      <div className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Chọn ngày
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {availableDates.slice(0, 8).map((date) => (
              <Button
                key={date.value}
                variant={selectedDate === date.value ? "default" : "outline"}
                size="sm"
                onClick={() => onDateChange(date.value)}
                className={`text-xs ${
                  selectedDate === date.value
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-emerald-50"
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">{getDateLabel(date.value)}</div>
                  <div className="text-xs opacity-75">
                    {date.date.getDate()}/{date.date.getMonth() + 1}
                  </div>
                </div>
              </Button>
            ))}
          </div>
          {availableDates.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDatePickerOpen(true)}
              className="mt-2 text-emerald-600 hover:text-emerald-700"
            >
              Xem thêm ngày khác
            </Button>
          )}
        </div>

        {/* Time Slots */}
        {selectedDate && selectedDateSlots && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Chọn giờ
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {selectedDateSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedTime === slot.time ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTimeChange(slot.time)}
                  disabled={!slot.available}
                  className={`text-sm ${
                    selectedTime === slot.time
                      ? "bg-emerald-600 text-white"
                      : slot.available
                      ? "hover:bg-emerald-50"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {formatTime(slot.time)}
                </Button>
              ))}
            </div>
            {selectedDateSlots.every((slot) => !slot.available) && (
              <p className="text-sm text-gray-500 mt-2">
                Ngày này đã hết lịch trống. Vui lòng chọn ngày khác.
              </p>
            )}
          </div>
        )}

        {!selectedDate && (
          <div className="text-center py-8 text-gray-500">
            <p>Vui lòng chọn ngày để xem lịch trống</p>
          </div>
        )}
      </div>

      {/* Date Picker Modal */}
      <DatePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSelect={(date) => {
          onDateChange(date);
          setIsDatePickerOpen(false);
        }}
        minDate={getVietnamTime()}
        maxDate={
          new Date(getVietnamTime().getTime() + 30 * 24 * 60 * 60 * 1000)
        }
      />
    </Card>
  );
};

export default BookingCalendar;
