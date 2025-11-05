import React from "react";
import { Button, Select } from "../../ui";

const BookingFilters = ({ selectedMonth, onMonthChange, onExport }) => {
  const months = [
    { value: "", label: "Tất cả tháng" },
    { value: "1", label: "Tháng 1" },
    { value: "2", label: "Tháng 2" },
    { value: "3", label: "Tháng 3" },
    { value: "4", label: "Tháng 4" },
    { value: "5", label: "Tháng 5" },
    { value: "6", label: "Tháng 6" },
    { value: "7", label: "Tháng 7" },
    { value: "8", label: "Tháng 8" },
    { value: "9", label: "Tháng 9" },
    { value: "10", label: "Tháng 10" },
    { value: "11", label: "Tháng 11" },
    { value: "12", label: "Tháng 12" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Lọc theo tháng:
          </label>
          <Select
            options={months}
            value={selectedMonth}
            onChange={onMonthChange}
            className="w-40"
          />
        </div>
      </div>
    </div>
  );
};

export { BookingFilters };
