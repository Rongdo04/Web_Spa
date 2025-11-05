// components/admin/AdminCustomers/AdminCustomers.jsx
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Button } from "../../ui";
import { LoadingSpinner } from "../../ui";
import { ErrorState } from "../../ui";
import { adminUsersAPI } from "../../../services";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import CustomersList from "./components/CustomersList";
import CustomerProfile from "./components/CustomerProfile";
import CustomerForm from "./components/CustomerForm";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    level: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    vipUsers: 0,
    premiumUsers: 0,
    loyalUsers: 0,
    regularUsers: 0,
    // Fallback for old format
    totalCustomers: 0,
    vipCustomers: 0,
    regularCustomers: 0,
  });

  useEffect(() => {
    loadCustomers();
    loadStats();
  }, [pagination.current, pagination.pageSize, filters]);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const loadCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiParams = {
        page: pagination.current,
        limit: pagination.pageSize,
        ...(filters.search &&
          filters.search.trim() && { search: filters.search.trim() }),
        ...(filters.level && { level: filters.level }),
      };

      const response = await adminUsersAPI.list({
        ...apiParams,
        // Remove role filter to get all users (admin + user)
      });
      console.log("Load customers response:", response);
      // Handle both response formats: {success: true, data: {...}} and {users: [...], pagination: {...}}
      if (response.success) {
        setCustomers(response.data.users || []);

        // Use API pagination
        const apiTotalItems = response.data.pagination?.totalItems || 0;
        const apiTotalPages = response.data.pagination?.totalPages || 0;

        setPagination((prev) => ({
          ...prev,
          total: apiTotalItems,
          totalPages: apiTotalPages,
        }));
      } else if (response.users) {
        // Handle direct response format: {users: [...], pagination: {...}}
        setCustomers(response.users || []);

        // Use API pagination
        const apiTotalItems = response.pagination?.totalItems || 0;
        const apiTotalPages = response.pagination?.totalPages || 0;

        setPagination((prev) => ({
          ...prev,
          total: apiTotalItems,
          totalPages: apiTotalPages,
        }));
      } else {
        setError(response?.message || "Không thể tải dữ liệu khách hàng");
        console.error("Failed to load customers:", response?.message);
      }
    } catch (error) {
      setError("Lỗi khi tải dữ liệu khách hàng");
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await adminUsersAPI.getStats();

      // Handle both response formats
      if (response.success) {
        setStats(response.data);
      } else if (response.totalUsers !== undefined) {
        // Direct format: {totalUsers: 5, vipUsers: 2, ...}
        setStats(response);
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleCreateNew = () => {
    setEditingCustomer(null);
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
      level: "",
    });
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDelete = async (customerId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      try {
        const response = await adminUsersAPI.remove(customerId);
        console.log("Delete response:", response);

        // Check if response exists and has success property
        if (response && response.success) {
          // Reload customers to get fresh data
          await loadCustomers();
          toast.success("Xóa khách hàng thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(
            `Xóa khách hàng thất bại: ${
              response?.message || "Không xác định được lỗi"
            }`,
            {
              position: "top-right",
              autoClose: 5000,
            }
          );
        }
      } catch (error) {
        toast.error("Lỗi khi xóa khách hàng", {
          position: "top-right",
          autoClose: 5000,
        });
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleSave = async (customerData) => {
    try {
      if (editingCustomer) {
        // Update existing customer
        const response = await adminUsersAPI.update(
          editingCustomer._id || editingCustomer.id,
          customerData
        );
        console.log("Update response:", response);

        // Handle both response formats
        if (response.success || response._id || response.id) {
          // Reload customers to get fresh data with calculated fields
          await loadCustomers();
          toast.success("Cập nhật khách hàng thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(
            `Cập nhật khách hàng thất bại: ${
              response?.message || "Không xác định được lỗi"
            }`,
            {
              position: "top-right",
              autoClose: 5000,
            }
          );
          return;
        }
      } else {
        // Create new customer
        const response = await adminUsersAPI.create(customerData);
        console.log("Create response:", response);

        // Handle both response formats
        if (response.success || response._id || response.id) {
          // Reload customers to get fresh data with calculated fields
          await loadCustomers();
          toast.success("Tạo khách hàng thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error(
            `Tạo khách hàng thất bại: ${
              response?.message || "Không xác định được lỗi"
            }`,
            {
              position: "top-right",
              autoClose: 5000,
            }
          );
          return;
        }
      }
      setShowForm(false);
      setEditingCustomer(null);
    } catch (error) {
      toast.error("Lỗi khi lưu khách hàng", {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error saving customer:", error);
    }
  };

  const handleViewProfile = (customer) => {
    setSelectedCustomer(customer);
    setShowProfile(true);
  };

  const handleUpdateNotes = async (customerId, notes) => {
    try {
      const response = await adminUsersAPI.update(customerId, { notes });

      // Handle both response formats
      if (response.success || response._id || response.id) {
        setCustomers(
          customers.map((c) =>
            (c._id || c.id) === customerId ? response.data || response : c
          )
        );
      }
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };

  if (loading && customers.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadCustomers} />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <UserOutlined className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Quản lý khách hàng
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Quản lý thông tin và hồ sơ khách hàng
            </p>
          </div>
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
          <Button variant="primary" onClick={handleCreateNew}>
            <PlusOutlined className="mr-2" />
            Thêm khách hàng
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tổng khách hàng
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalUsers || stats.totalCustomers || 0}
              </p>
            </div>
            <UserOutlined className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Khách VIP
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.vipUsers || stats.vipCustomers || 0}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 font-bold">👑</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Customers List */}
      <CustomersList
        customers={customers}
        loading={loading}
        pagination={pagination}
        filters={filters}
        searchInput={searchInput}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewProfile={handleViewProfile}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onClearFilters={handleClearFilters}
      />

      {showForm && (
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingCustomer(null);
          }}
        />
      )}

      {showProfile && selectedCustomer && (
        <CustomerProfile
          customer={selectedCustomer}
          onClose={() => {
            setShowProfile(false);
            setSelectedCustomer(null);
          }}
          onUpdateNotes={handleUpdateNotes}
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

export default AdminCustomers;
