import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PublicLayout } from "../layout";
import { Card, Button } from "../ui";
import {
  ServiceSelection,
  StaffSelection,
  TimeSelection,
  CustomerInfo,
  BookingConfirmation,
} from "./components";
import { BookingStepper } from "./components/BookingStepper";

const BookingFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize booking data from location state or localStorage
  const [bookingData, setBookingData] = useState(() => {
    const savedData = localStorage.getItem("bookingDraft");
    const locationData = location.state?.bookingData;

    if (locationData) {
      return {
        service: locationData.service || null,
        staff: locationData.staff || null,
        date: locationData.date || "",
        time: locationData.time || "",
        customer: {
          name: "",
          phone: "",
          email: "",
          notes: "",
        },
        step: 1,
      };
    }

    if (savedData) {
      return JSON.parse(savedData);
    }

    return {
      service: null,
      staff: null,
      date: "",
      time: "",
      customer: {
        name: "",
        phone: "",
        email: "",
        notes: "",
      },
      step: 1,
    };
  });

  const [currentStep, setCurrentStep] = useState(bookingData.step);

  // Safe serialization function to avoid circular references
  const safeStringify = (obj) => {
    try {
      return JSON.stringify(obj, (key, value) => {
        // Skip functions, DOM elements, and React components
        if (
          typeof value === "function" ||
          value instanceof HTMLElement ||
          value?.$$typeof
        ) {
          return undefined;
        }
        return value;
      });
    } catch (error) {
      return "{}";
    }
  };

  // Save to localStorage whenever bookingData changes
  useEffect(() => {
    const serializedData = safeStringify(bookingData);
    if (serializedData !== "{}") {
      localStorage.setItem("bookingDraft", serializedData);
    }
  }, [bookingData]);

  const updateBookingData = useCallback((updates) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  }, []);

  // Callback functions for child components
  const handleServiceChange = useCallback(
    (service) => {
      updateBookingData({ service });
    },
    [updateBookingData]
  );

  const handleStaffChange = useCallback(
    (staff) => {
      updateBookingData({ staff });
    },
    [updateBookingData]
  );

  const handleDateChange = useCallback(
    (date) => {
      updateBookingData({ date });
    },
    [updateBookingData]
  );

  const handleTimeChange = useCallback(
    (time) => {
      updateBookingData({ time });
    },
    [updateBookingData]
  );

  const handleCustomerChange = useCallback(
    (customer) => {
      updateBookingData({ customer });
    },
    [updateBookingData]
  );

  const nextStep = () => {
    if (currentStep < 5) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      updateBookingData({ step: newStep });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      updateBookingData({ step: newStep });
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    updateBookingData({ step });
  };

  const handleBookingSuccess = () => {
    // Clear localStorage
    localStorage.removeItem("bookingDraft");
    // Navigate to success page
    navigate("/booking/success", { state: { bookingData } });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            service={bookingData.service}
            onServiceChange={handleServiceChange}
          />
        );
      case 2:
        return (
          <StaffSelection
            service={bookingData.service}
            staff={bookingData.staff}
            onStaffChange={handleStaffChange}
          />
        );
      case 3:
        return (
          <TimeSelection
            service={bookingData.service}
            staff={bookingData.staff}
            date={bookingData.date}
            time={bookingData.time}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
          />
        );
      case 4:
        return (
          <CustomerInfo
            customer={bookingData.customer}
            onCustomerChange={handleCustomerChange}
          />
        );
      case 5:
        return (
          <BookingConfirmation
            bookingData={bookingData}
            onConfirm={handleBookingSuccess}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return bookingData.service !== null;
      case 2:
        return true; // Staff selection is optional
      case 3:
        return bookingData.date && bookingData.time;
      case 4:
        return bookingData.customer.name && bookingData.customer.phone;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Đặt lịch spa
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Hoàn thành các bước sau để đặt lịch dịch vụ spa của bạn
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-8">
            <BookingStepper currentStep={currentStep} onStepClick={goToStep} />
          </div>

          {/* Step Content */}
          <Card className="p-8">{renderStep()}</Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Quay lại
            </Button>

            {currentStep < 5 ? (
              <Button onClick={nextStep} disabled={!canProceed()}>
                Tiếp tục
              </Button>
            ) : (
              <Button onClick={handleBookingSuccess} disabled={!canProceed()}>
                Xác nhận đặt lịch
              </Button>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default BookingFlow;
