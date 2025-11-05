import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PublicLayout } from "../layout";
import {
  ServiceGallery,
  ServiceInfo,
  StaffSelection,
  BookingCTA,
} from "./components";
import ReviewsSection from "../ReviewsSection/ReviewsSection";
import { servicesAPI } from "../../services";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);

  // Booking state
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Load service data from API
  useEffect(() => {
    const loadService = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Loading service with ID:", id);
        console.log("Service ID type:", typeof id);
        const serviceData = await servicesAPI.getServiceById(id);
        console.log("Service data received:", serviceData);
        console.log("Service data type:", typeof serviceData);
        console.log(
          "Service data keys:",
          serviceData ? Object.keys(serviceData) : "No keys"
        );
        setService(serviceData);
      } catch (err) {
        console.error("Error loading service:", err);
        setError(err.message || "Không thể tải thông tin dịch vụ");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadService();
    }
  }, [id]);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-96 bg-gray-300 rounded-2xl"></div>
                  <div className="h-32 bg-gray-300 rounded"></div>
                </div>
                <div className="h-96 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (error || !service) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {error ? "Lỗi tải dữ liệu" : "Không tìm thấy dịch vụ"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {error || "Dịch vụ bạn tìm kiếm không tồn tại hoặc đã bị xóa."}
              </p>
              <button
                onClick={() => navigate("/services")}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
              >
                Quay lại danh sách
              </button>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Trang chủ
                </button>
              </li>
              <li>/</li>
              <li>
                <button
                  onClick={() => navigate("/services")}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Dịch vụ
                </button>
              </li>
              <li>/</li>
              <li className="text-gray-900 dark:text-white">{service.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ServiceGallery
                images={service.images}
                name={service.name}
                tags={service.tags}
              />

              <ServiceInfo
                name={service.name}
                category={service.category}
                description={service.description}
                duration={service.duration}
                price={service.price}
                requirements={service.requirements}
                notes={service.notes}
                tags={service.tags}
              />

              <StaffSelection
                staff={service.staff}
                selectedStaff={selectedStaff}
                onStaffChange={setSelectedStaff}
              />

              {/* Reviews Section for this service */}
              <div className="pt-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Đánh giá dịch vụ
                </h2>
                <ReviewsSection serviceId={service.id || service._id} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BookingCTA service={service} selectedStaff={selectedStaff} />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ServiceDetail;
