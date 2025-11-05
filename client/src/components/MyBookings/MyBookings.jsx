import React, { useState, useEffect, useCallback } from "react";
import { PublicLayout } from "../layout";
import { BookingTabs, BookingFilters, BookingList } from "./components";
import ChangePassword from "./components/ChangePassword";
import ChangeAvatar from "./components/ChangeAvatar";
import userBookingsAPI from "../../services/userBookingsAPI";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load bookings from API
  const loadBookings = useCallback(async () => {
    try {
      console.log("Loading bookings...");
      setLoading(true);
      setError(null);
      const response = await userBookingsAPI.getMyBookings();
      console.log("Bookings response:", response);

      if (response.success) {
        setBookings(response.data.bookings || []);
        console.log("Bookings loaded:", response.data.bookings?.length || 0);
      } else {
        setError(response.message || "Không thể tải danh sách đặt lịch");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
      setError("Có lỗi xảy ra khi tải danh sách đặt lịch");
      toast.error("Có lỗi xảy ra khi tải danh sách đặt lịch", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const getFilteredBookings = () => {
    let filtered = bookings;

    // Filter by status
    switch (activeTab) {
      case "upcoming":
        filtered = filtered.filter(
          (booking) =>
            booking.status === "confirmed" || booking.status === "pending"
        );
        break;
      case "completed":
        filtered = filtered.filter((booking) => booking.status === "completed");
        break;
      case "cancelled":
        filtered = filtered.filter((booking) => booking.status === "cancelled");
        break;
      default:
        break;
    }

    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter((booking) => {
        const bookingDate = new Date(booking.date);
        const bookingMonth = bookingDate.getMonth() + 1;
        const selectedMonthNum = parseInt(selectedMonth);
        return bookingMonth === selectedMonthNum;
      });
    }

    return filtered;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleExport = () => {
    // Mock export function
    alert("Đã xuất danh sách đặt lịch!");
  };

  const filteredBookings = getFilteredBookings();

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Lịch đặt của tôi
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Quản lý và theo dõi các lịch đặt spa của bạn
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <BookingFilters
              selectedMonth={selectedMonth}
              onMonthChange={handleMonthChange}
              onExport={handleExport}
            />
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <BookingTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              bookingCounts={{
                upcoming: bookings.filter(
                  (b) => b.status === "confirmed" || b.status === "pending"
                ).length,
                completed: bookings.filter((b) => b.status === "completed")
                  .length,
                cancelled: bookings.filter((b) => b.status === "cancelled")
                  .length,
              }}
            />
          </div>

          {/* Content based on active tab */}
          {activeTab === "change-password" ? (
            <ChangePassword />
          ) : activeTab === "change-avatar" ? (
            <ChangeAvatar />
          ) : (
            <BookingList
              bookings={filteredBookings}
              activeTab={activeTab}
              loading={loading}
              error={error}
              onRetry={loadBookings}
            />
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default MyBookings;
