import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PublicLayout } from "../layout";
import { adminAppointmentsAPI } from "../../services";
import {
  SuccessHeader,
  BookingSummary,
  NextSteps,
  ContactInfo,
  ActionButtons,
} from "./components";

const BookingSuccess = () => {
  const { appointmentNumber } = useParams();
  const location = useLocation();
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback to location state if no appointmentNumber in URL
  const fallbackData = location.state?.bookingData;

  useEffect(() => {
    const fetchAppointmentData = async () => {
      if (appointmentNumber) {
        try {
          setLoading(true);
          const response = await adminAppointmentsAPI.getByNumber(
            appointmentNumber
          );
          setAppointmentData(response.data);
        } catch (err) {
          console.error("Error fetching appointment:", err);
          setError(err.message || "Không thể tải thông tin lịch hẹn");
        } finally {
          setLoading(false);
        }
      } else {
        // Use fallback data if no appointmentNumber
        setAppointmentData(fallbackData);
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, [appointmentNumber, fallbackData]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <span className="ml-3 text-gray-600">
                Đang tải thông tin lịch hẹn...
              </span>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Không thể tải thông tin lịch hẹn
              </h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  // Use appointmentNumber from API or fallback to generated ID
  const bookingId =
    appointmentData?.appointmentNumber ||
    (appointmentData?.id
      ? `APT${appointmentData.id.slice(-6).toUpperCase()}`
      : `APT${Date.now().toString().slice(-8)}`);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SuccessHeader bookingId={bookingId} />

          <BookingSummary appointmentData={appointmentData} />

          <NextSteps />

          <ContactInfo appointmentData={appointmentData} />

          <ActionButtons />
        </div>
      </div>
    </PublicLayout>
  );
};

export default BookingSuccess;
