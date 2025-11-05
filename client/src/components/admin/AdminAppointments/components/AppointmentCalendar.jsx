// components/admin/AdminAppointments/components/AppointmentCalendar.jsx
import React, { useState } from "react";
import { Card } from "../../../ui";
import { Button } from "../../../ui";
import {
  CalendarOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  getVietnamTime,
  formatDateToVietnamString,
  formatVietnamDate,
  formatVietnamTime,
  formatVietnamDateTime,
  isTodayVietnam,
} from "../../../../utils/timezoneUtils.js";

const AppointmentCalendar = ({
  appointments = [],
  onAppointmentClick,
  onAppointmentDelete,
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = useState(getVietnamTime());
  const [view, setView] = useState("month"); // day, week, month

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 border-green-300 text-green-800";
      case "pending":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "completed":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "cancelled":
        return "bg-red-100 border-red-300 text-red-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xác nhận";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatTime = (time) => {
    return formatVietnamTime(time);
  };

  const formatDate = (date) => {
    return formatVietnamDate(date, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysInWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday start
    start.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = formatDateToVietnamString(date);
    return appointments.filter((apt) => apt.date === dateStr);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() + direction);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(currentDate);

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{formatDate(currentDate)}</h3>
        </div>
        <div className="space-y-2">
          {dayAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Không có lịch hẹn nào
            </div>
          ) : (
            dayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`p-3 rounded-lg border hover:shadow-md transition-shadow ${getStatusColor(
                  appointment.status
                )}`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => onAppointmentClick(appointment)}
                  >
                    <div className="font-medium">{appointment.customer}</div>
                    <div className="text-sm">{appointment.service}</div>
                    <div className="text-sm">{appointment.staff}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatTime(appointment.time)}
                    </div>
                    <div className="text-sm">{appointment.duration} phút</div>
                    <div className="text-xs">
                      {getStatusText(appointment.status)}
                    </div>
                  </div>
                  <div className="ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            "Bạn có chắc chắn muốn xóa lịch hẹn này?"
                          )
                        ) {
                          onAppointmentDelete(appointment.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getDaysInWeek(currentDate);

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            Tuần {Math.ceil(currentDate.getDate() / 7)} -{" "}
            {currentDate.getFullYear()}
          </h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const dayAppointments = getAppointmentsForDate(day);
            const isToday = isTodayVietnam(day);

            return (
              <div
                key={index}
                className={`p-2 rounded-lg border ${
                  isToday
                    ? "bg-blue-50 border-blue-300"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="text-center mb-2">
                  <div className="text-sm font-medium">
                    {day.toLocaleDateString("vi-VN", { weekday: "short" })}
                  </div>
                  <div className="text-lg font-bold">{day.getDate()}</div>
                </div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`p-1 rounded text-xs hover:shadow-sm ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      <div
                        className="cursor-pointer"
                        onClick={() => onAppointmentClick(appointment)}
                      >
                        <div className="font-medium truncate">
                          {appointment.customer}
                        </div>
                        <div className="text-xs">
                          {formatTime(appointment.time)}
                        </div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                "Bạn có chắc chắn muốn xóa lịch hẹn này?"
                              )
                            ) {
                              onAppointmentDelete(appointment.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-6 w-6"
                        >
                          <DeleteOutlined className="text-xs" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {dayAppointments.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayAppointments.length - 3} khác
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthDays = getDaysInMonth(currentDate);
    const monthName = currentDate.toLocaleDateString("vi-VN", {
      month: "long",
      year: "numeric",
    });

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{monthName}</h3>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* Header */}
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}

          {/* Days */}
          {monthDays.map((day, index) => {
            if (!day) {
              return <div key={index} className="h-20"></div>;
            }

            const dayAppointments = getAppointmentsForDate(day);
            const isToday = isTodayVietnam(day);

            return (
              <div
                key={index}
                className={`h-20 p-1 border rounded cursor-pointer hover:bg-gray-50 ${
                  isToday ? "bg-blue-50 border-blue-300" : "border-gray-200"
                }`}
                onClick={() => onDateSelect(day)}
              >
                <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 2).map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`p-1 rounded text-xs ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      <div
                        className="cursor-pointer truncate"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAppointmentClick(appointment);
                        }}
                      >
                        {appointment.customer}
                      </div>
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                "Bạn có chắc chắn muốn xóa lịch hẹn này?"
                              )
                            ) {
                              onAppointmentDelete(appointment.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0 h-4 w-4"
                        >
                          <DeleteOutlined className="text-xs" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {dayAppointments.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayAppointments.length - 2}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Lịch hẹn</h3>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={view === "day" ? "primary" : "outline"}
            onClick={() => setView("day")}
          >
            Ngày
          </Button>
          <Button
            size="sm"
            variant={view === "week" ? "primary" : "outline"}
            onClick={() => setView("week")}
          >
            Tuần
          </Button>
          <Button
            size="sm"
            variant={view === "month" ? "primary" : "outline"}
            onClick={() => setView("month")}
          >
            Tháng
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={() => navigateDate(-1)}>
            <LeftOutlined />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentDate(getVietnamTime())}
          >
            Hôm nay
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigateDate(1)}>
            <RightOutlined />
          </Button>
        </div>
      </div>

      <div className="min-h-96">
        {view === "day" && renderDayView()}
        {view === "week" && renderWeekView()}
        {view === "month" && renderMonthView()}
      </div>
    </Card>
  );
};

export default AppointmentCalendar;
