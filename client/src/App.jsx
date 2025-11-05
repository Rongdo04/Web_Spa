import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthLayout from "./components/auth/AuthLayout";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import {
  AdminDashboard,
  AdminAppointments,
  AdminStaff,
  AdminServices,
  AdminCustomers,
  AdminNotifications,
  AdminCategories,
  AdminProfile,
  AdminReviews,
} from "./components/admin";
import AdminAppointmentHistory from "./components/admin/AdminAppointmentHistory";
import AdminSettings from "./components/admin/AdminSettings/AdminSettings";
import AdminLayout from "./components/admin/AdminLayout";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import HomePage from "./components/homepage/HomePage";
import ServicesList from "./components/ServicesList/ServicesList";
import ServiceDetail from "./components/ServiceDetail/ServiceDetail";
import BookingFlow from "./components/BookingFlow/BookingFlow";
import BookingSuccess from "./components/BookingSuccess/BookingSuccess";
import MyBookings from "./components/MyBookings/MyBookings";
import About from "./components/About/About";
import FAQ from "./components/FAQ/FAQ";
import MongoDBSchemaDiagram from "./components/MongoDBSchemaDiagram";
// Protected Route Component
const ProtectedRoute = ({
  children,
  requiredRole = null,
  allowedRoles = null,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra role được phép truy cập
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect về trang phù hợp với role
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Kiểm tra requiredRole nếu có yêu cầu cụ thể
  if (requiredRole && user?.role !== requiredRole) {
    // Nếu không đúng role, redirect về trang phù hợp
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

// Main App Content
function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes - cho tất cả user */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
      </Route>
      <Route path="/register" element={<AuthLayout />}>
        <Route index element={<RegisterForm />} />
      </Route>
      <Route path="/forgot-password" element={<AuthLayout />}>
        <Route index element={<ForgotPasswordForm />} />
      </Route>
      <Route path="/reset-password" element={<AuthLayout />}>
        <Route index element={<ResetPasswordForm />} />
      </Route>

      <Route path="/services" element={<ServicesList />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/booking" element={<BookingFlow />} />
      <Route path="/booking/success" element={<BookingSuccess />} />
      <Route
        path="/booking/success/:appointmentNumber"
        element={<BookingSuccess />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/database-schema" element={<MongoDBSchemaDiagram />} />
      {/* Protected Routes - chỉ cho user đã đăng nhập */}
      {isAuthenticated && (
        <>
          {/* Admin Routes - chỉ cho admin */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route
                      path="/appointments"
                      element={<AdminAppointments />}
                    />
                    <Route path="/categories" element={<AdminCategories />} />
                    <Route path="/services" element={<AdminServices />} />
                    <Route path="/customers" element={<AdminCustomers />} />
                    <Route path="/staff" element={<AdminStaff />} />
                    <Route
                      path="/notifications"
                      element={<AdminNotifications />}
                    />
                    <Route
                      path="/appointment-history"
                      element={<AdminAppointmentHistory />}
                    />
                    <Route path="/profile" element={<AdminProfile />} />
                    <Route path="/reviews" element={<AdminReviews />} />
                    <Route
                      path="/reports"
                      element={
                        <div className="p-6">
                          <h1>Báo cáo</h1>
                        </div>
                      }
                    />
                    <Route path="/settings" element={<AdminSettings />} />
                    <Route
                      path="/database-schema"
                      element={<MongoDBSchemaDiagram />}
                    />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* User Routes - chỉ cho user thường */}
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MyBookings />
              </ProtectedRoute>
            }
          />
        </>
      )}

      {/* Catch all - redirect về trang chủ */}
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Root App Component
function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <AppContent />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="shadow-lg"
            className="z-50"
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
