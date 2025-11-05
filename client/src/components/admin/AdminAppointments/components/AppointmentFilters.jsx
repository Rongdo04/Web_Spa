// components/admin/AdminAppointments/components/AppointmentFilters.jsx
import React, { useState, useEffect } from "react";
import { Card } from "../../../ui";
import { Button } from "../../../ui";
import { Select } from "../../../ui";
import { Input } from "../../../ui";
import adminServicesAPI from "../../../../services/admin/adminServicesAPI";
import adminStaffAPI from "../../../../services/admin/adminStaffAPI";

const AppointmentFilters = ({ onFiltersChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    status: "",
    service: "",
    staff: "",
    dateFrom: "",
    dateTo: "",
    search: "",
  });

  const [services, setServices] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load services and staff from API
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load services
        const servicesResponse = await adminServicesAPI.list();
        if (servicesResponse.success) {
          const servicesOptions = servicesResponse.data.services.map(
            (service) => ({
              value: service.id,
              label: service.name,
            })
          );
          setServices(servicesOptions);
        }

        // Load staff
        const staffResponse = await adminStaffAPI.list();
        if (staffResponse.success) {
          const staffOptions = staffResponse.data.staff.map((staff) => ({
            value: staff.id,
            label: staff.name,
          }));
          setStaffMembers(staffOptions);
        }
      } catch (error) {
        } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const statusOptions = [
    { value: "", label: "Tất cả trạng thái" },
    { value: "pending", label: "Chờ xác nhận" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: "",
      service: "",
      staff: "",
      dateFrom: "",
      dateTo: "",
      search: "",
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Bộ lọc</h3>
        {hasActiveFilters && (
          <Button size="sm" variant="outline" onClick={handleClearFilters}>
            Xóa bộ lọc
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tìm kiếm
          </label>
          <Input
            type="text"
            placeholder="Tên khách hàng, SĐT, ghi chú..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái
          </label>
          <Select
            value={filters.status}
            onChange={(value) => handleFilterChange("status", value)}
            options={statusOptions}
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dịch vụ
          </label>
          <Select
            value={filters.service}
            onChange={(value) => handleFilterChange("service", value)}
            options={[
              { value: "", label: loading ? "Đang tải..." : "Tất cả dịch vụ" },
              ...services,
            ]}
            disabled={loading}
          />
        </div>

        {/* Staff */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nhân viên
          </label>
          <Select
            value={filters.staff}
            onChange={(value) => handleFilterChange("staff", value)}
            options={[
              {
                value: "",
                label: loading ? "Đang tải..." : "Tất cả nhân viên",
              },
              ...staffMembers,
            ]}
            disabled={loading}
          />
        </div>

        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Từ ngày
          </label>
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Đến ngày
          </label>
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange("dateTo", e.target.value)}
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">
              Bộ lọc đang áp dụng:
            </span>
            {filters.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Trạng thái:{" "}
                {
                  statusOptions.find((opt) => opt.value === filters.status)
                    ?.label
                }
                <button
                  onClick={() => handleFilterChange("status", "")}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {filters.service && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Dịch vụ:{" "}
                {services.find((s) => s.value === filters.service)?.label}
                <button
                  onClick={() => handleFilterChange("service", "")}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {filters.staff && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                Nhân viên:{" "}
                {staffMembers.find((s) => s.value === filters.staff)?.label}
                <button
                  onClick={() => handleFilterChange("staff", "")}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
            {(filters.dateFrom || filters.dateTo) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                Ngày: {filters.dateFrom || "..."} - {filters.dateTo || "..."}
                <button
                  onClick={() => {
                    handleFilterChange("dateFrom", "");
                    handleFilterChange("dateTo", "");
                  }}
                  className="ml-1 text-yellow-600 hover:text-yellow-800"
                >
                  ×
                </button>
              </span>
            )}
            {filters.search && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                Tìm kiếm: {filters.search}
                <button
                  onClick={() => handleFilterChange("search", "")}
                  className="ml-1 text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default AppointmentFilters;
