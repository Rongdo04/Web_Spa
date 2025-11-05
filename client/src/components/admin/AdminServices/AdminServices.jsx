// components/admin/AdminServices/AdminServices.jsx
import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Button } from "../../ui";
import { LoadingSpinner } from "../../ui";
import { ErrorState } from "../../ui";
import { adminServicesAPI } from "../../../services";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SettingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ServicesList from "./components/ServicesList";
import ServiceForm from "./components/ServiceForm";
import ServiceDetails from "./components/ServiceDetails";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    loadServices();
  }, [pagination.current, pagination.pageSize, filters]);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const loadServices = async () => {
    setLoading(true);
    setError(null);
    try {
      // Map status values to backend format
      let isActiveValue = null;
      if (filters.status === "active") {
        isActiveValue = true;
      } else if (filters.status === "inactive") {
        isActiveValue = false;
      }

      const apiParams = {
        currentPage: pagination.current,
        itemsPerPage: pagination.pageSize,
        ...(filters.search &&
          filters.search.trim() && { search: filters.search.trim() }),
        ...(filters.category && { category: filters.category }),
        ...(isActiveValue !== null && { isActive: isActiveValue }),
      };

      const response = await adminServicesAPI.list(apiParams);

      if (response.success) {
        // Transform API data to component format
        const transformedServices = (response.data.services || []).map(
          (service) => ({
            id: service._id || service.id,
            name: service.name,
            description: service.description,
            category: service.category,
            categoryId: service.categoryId,
            duration: service.duration,
            price: service.price,
            images: service.images || [],
            addOns: service.addOns || [],
            combo: service.combo || [],
            displayOrder: service.displayOrder,
            isActive: service.isActive,
            isFeatured: service.isFeatured || false,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt,
          })
        );

        // Use API pagination
        const apiTotalItems = response.data.pagination?.totalItems || 0;
        const apiItemsPerPage =
          response.data.pagination?.itemsPerPage || pagination.pageSize;
        const apiTotalPages = response.data.pagination?.totalPages || 0;

        setServices(transformedServices);
        setPagination((prev) => ({
          ...prev,
          total: apiTotalItems,
          totalPages: apiTotalPages,
        }));
      } else {
        setError(response.message || "Không thể tải dữ liệu dịch vụ");
        console.error("Failed to load services:", response.message);
      }
    } catch (error) {
      setError("Lỗi khi tải dữ liệu dịch vụ");
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingService(null);
    setShowForm(true);
  };

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize,
    }));
  };

  const handlePageSizeChange = (current, size) => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
      pageSize: size,
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setFilters({
      search: "",
      category: "",
      status: "",
    });
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      try {
        const response = await adminServicesAPI.remove(serviceId);
        if (response.success) {
          setServices(services.filter((s) => s.id !== serviceId));
          toast.success("Xóa dịch vụ thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(`Xóa dịch vụ thất bại: ${response.message}`, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error("Lỗi khi xóa dịch vụ", {
          position: "top-right",
          autoClose: 5000,
        });
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleSave = async (serviceData) => {
    try {
      if (editingService) {
        // Update existing service
        const response = await adminServicesAPI.update(
          editingService.id,
          serviceData
        );
        if (response.success) {
          setServices(
            services.map((s) =>
              s.id === editingService.id ? response.data : s
            )
          );
          toast.success("Cập nhật dịch vụ thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(`Cập nhật dịch vụ thất bại: ${response.message}`, {
            position: "top-right",
            autoClose: 5000,
          });
          return;
        }
      } else {
        // Create new service
        const response = await adminServicesAPI.create(serviceData);
        if (response.success) {
          setServices([...services, response.data]);
          toast.success("Tạo dịch vụ thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(`Tạo dịch vụ thất bại: ${response.message}`, {
            position: "top-right",
            autoClose: 5000,
          });
          return;
        }
      }
      setShowForm(false);
      setEditingService(null);
    } catch (error) {
      toast.error("Lỗi khi lưu dịch vụ", {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error saving service:", error);
    }
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowDetails(true);
  };

  const handleToggleActive = async (serviceId) => {
    try {
      const response = await adminServicesAPI.toggle(serviceId);
      if (response.success) {
        setServices(
          services.map((s) => (s.id === serviceId ? response.data : s))
        );
        toast.success(
          response.message || "Cập nhật trạng thái dịch vụ thành công!",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        toast.error(`Cập nhật trạng thái thất bại: ${response.message}`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái dịch vụ", {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error toggling service status:", error);
    }
  };

  const handleReorder = async (fromIndex, toIndex) => {
    const newServices = [...services];
    const [movedService] = newServices.splice(fromIndex, 1);
    newServices.splice(toIndex, 0, movedService);

    // Update display order
    const updatedServices = newServices.map((service, index) => ({
      ...service,
      displayOrder: index + 1,
    }));

    setServices(updatedServices);

    try {
      // Send new order to API
      const orderedIds = updatedServices.map((service) => service.id);
      await adminServicesAPI.reorder(orderedIds);
    } catch (error) {
      console.error("Error reordering services:", error);
      // Revert on error
      loadServices();
    }
  };

  if (loading && services.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState message={error} onRetry={loadServices} retryText="Thử lại" />
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quản lý dịch vụ
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý danh sách dịch vụ và cấu hình
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            disabled={loading}
          >
            <ReloadOutlined className="mr-1" />
            Làm mới
          </Button>
          <Button
            onClick={handleCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PlusOutlined className="mr-2" />
            Thêm dịch vụ mới
          </Button>
        </div>
      </div>

      <ServicesList
        services={services}
        loading={loading}
        pagination={pagination}
        filters={filters}
        searchInput={searchInput}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleViewDetails}
        onToggleActive={handleToggleActive}
        onReorder={handleReorder}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onClearFilters={handleClearFilters}
      />

      {showForm && (
        <ServiceForm
          service={editingService}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingService(null);
          }}
        />
      )}

      {showDetails && selectedService && (
        <ServiceDetails
          service={selectedService}
          onClose={() => {
            setShowDetails(false);
            setSelectedService(null);
          }}
        />
      )}

      {/* Toast Container */}
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
      />
    </div>
  );
};

export default AdminServices;
