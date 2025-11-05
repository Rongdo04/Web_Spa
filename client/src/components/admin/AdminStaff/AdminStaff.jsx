import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import staffAPI from "../../../services/admin/staffAPI";
import StaffForm from "./components/StaffForm";
import StaffDetails from "./components/StaffDetails";
import StaffList from "./components/StaffList";
import StaffFilters from "./components/StaffFilters";
import StaffStats from "./components/StaffStats";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { toast } from "react-toastify";

const AdminStaff = () => {
  const [staff, setStaff] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  // Load staff data
  const loadStaff = async () => {
    setLoading(true);
    try {
      const response = await staffAPI.getStaffList(filters);
      if (response.success) {
        setStaff(response.data.staff);
        setPagination(response.data.pagination);
        setStats(response.data.stats);
      } else {
        toast.error(response.message || "Lỗi khi tải danh sách nhân viên");
      }
    } catch (error) {
      console.error("Error loading staff:", error);
      toast.error("Lỗi khi tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, [filters]);

  // Handle create staff
  const handleCreateStaff = async (staffData) => {
    try {
      const response = await staffAPI.createStaff(staffData);
      if (response.success) {
        toast.success("Tạo nhân viên thành công");
        setShowForm(false);
        loadStaff();
      } else {
        toast.error(response.message || "Lỗi khi tạo nhân viên");
      }
    } catch (error) {
      console.error("Error creating staff:", error);
      toast.error("Lỗi khi tạo nhân viên");
    }
  };

  // Handle update staff
  const handleUpdateStaff = async (staffData) => {
    try {
      const response = await staffAPI.updateStaff(editingStaff.id, staffData);
      if (response.success) {
        toast.success("Cập nhật nhân viên thành công");
        setShowForm(false);
        setEditingStaff(null);
        loadStaff();
      } else {
        toast.error(response.message || "Lỗi khi cập nhật nhân viên");
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error("Lỗi khi cập nhật nhân viên");
    }
  };

  // Handle delete staff
  const handleDeleteStaff = async () => {
    try {
      const response = await staffAPI.deleteStaff(selectedStaff.id);
      if (response.success) {
        toast.success("Xóa nhân viên thành công");
        setShowDeleteModal(false);
        setSelectedStaff(null);
        loadStaff();
      } else {
        toast.error(response.message || "Lỗi khi xóa nhân viên");
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error("Lỗi khi xóa nhân viên");
    }
  };

  // Handle toggle staff status
  const handleToggleStatus = async (staffId, isActive) => {
    try {
      const response = await staffAPI.toggleStaffStatus(staffId, { isActive });
      if (response.success) {
        toast.success(
          `${isActive ? "Kích hoạt" : "Vô hiệu hóa"} nhân viên thành công`
        );
        loadStaff();
      } else {
        toast.error(
          response.message || "Lỗi khi cập nhật trạng thái nhân viên"
        );
      }
    } catch (error) {
      console.error("Error toggling staff status:", error);
      toast.error("Lỗi khi cập nhật trạng thái nhân viên");
    }
  };

  // Handle edit staff
  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
    setShowForm(true);
  };

  // Handle view staff details
  const handleViewStaff = (staff) => {
    setSelectedStaff(staff);
    setShowDetails(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (staff) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý nhân viên
          </h1>
          <p className="text-gray-600">
            Quản lý thông tin và lịch làm việc của nhân viên
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Thêm nhân viên
        </button>
      </div>

      {/* Stats */}
      <StaffStats stats={stats} />

      {/* Filters */}
      <StaffFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Staff List */}
      <StaffList
        staff={staff}
        loading={loading}
        pagination={pagination}
        onEdit={handleEditStaff}
        onView={handleViewStaff}
        onDelete={handleDeleteClick}
        onToggleStatus={handleToggleStatus}
        onPageChange={handlePageChange}
      />

      {/* Staff Form Modal */}
      {showForm && (
        <StaffForm
          staff={editingStaff}
          onSave={editingStaff ? handleUpdateStaff : handleCreateStaff}
          onClose={() => {
            setShowForm(false);
            setEditingStaff(null);
          }}
        />
      )}

      {/* Staff Details Modal */}
      {showDetails && selectedStaff && (
        <StaffDetails
          staff={selectedStaff}
          onClose={() => {
            setShowDetails(false);
            setSelectedStaff(null);
          }}
          onEdit={handleEditStaff}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedStaff && (
        <DeleteConfirmModal
          staff={selectedStaff}
          onConfirm={handleDeleteStaff}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedStaff(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminStaff;
