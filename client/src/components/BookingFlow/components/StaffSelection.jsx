import React, { useState, useEffect, useRef } from "react";
import { Card, Radio, Badge } from "../../ui";
import { servicesAPI } from "../../../services";

const StaffSelection = ({ service, staff, onStaffChange }) => {
  const [selectedStaff, setSelectedStaff] = useState(staff);
  const [autoAssign, setAutoAssign] = useState(!staff);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load staff from API
  useEffect(() => {
    const loadStaff = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Loading staff for service:", service?.id);

        if (service?.id) {
          const response = await servicesAPI.getServiceById(service.id);
          console.log("Service API response:", response);
          console.log("Service staff:", response?.staff);
          setStaffList(response?.staff || []);
        } else {
          // No service selected, show empty staff list
          console.log("No service selected, showing empty staff list");
          setStaffList([]);
        }
      } catch (err) {
        console.error("Error loading staff:", err);
        setError(err.message || "Không thể tải danh sách nhân viên");
        setStaffList([]);
      } finally {
        setLoading(false);
      }
    };

    loadStaff();
  }, [service?.id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStaffChange = (staffId) => {
    setAutoAssign(false);
    setSelectedStaff(staffId);
    onStaffChange(staffId);
  };

  const handleAutoAssign = () => {
    setAutoAssign(true);
    setSelectedStaff(null);
    onStaffChange(null);
  };

  const getSelectedStaffName = () => {
    if (autoAssign) return "Tự động sắp xếp";
    if (selectedStaff) {
      const staff = staffList.find((s) => s.id === selectedStaff);
      return staff ? staff.name : "Chọn nhân viên";
    }
    return "Chọn nhân viên";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Chọn nhân viên
        </h2>
        <p className="text-gray-600">
          Chọn nhân viên phù hợp hoặc để chúng tôi tự động sắp xếp
        </p>
      </div>

      {/* Service Information */}
      {service && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Dịch vụ đã chọn
          </h3>
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              {service.images && service.images.length > 0 ? (
                <img
                  src={service.images[0]}
                  alt={service.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500 font-medium text-lg">
                  {service.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{service.name}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {service.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>⏱️ {service.duration} phút</span>
                <span>
                  💰{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(service.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No service selected */}
      {!service && (
        <div className="text-center py-8 text-gray-500">
          <p>Vui lòng chọn dịch vụ trước khi chọn nhân viên</p>
          <p className="text-sm mt-2">Quay lại bước trước để chọn dịch vụ</p>
        </div>
      )}

      {/* No staff available */}
      {service && (!staffList || staffList.length === 0) && !loading && (
        <div className="text-center py-8 text-gray-500">
          <p>Hiện tại không có nhân viên nào khả dụng cho dịch vụ này</p>
          <p className="text-sm mt-2">Vui lòng liên hệ để được hỗ trợ</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Auto Assign Option */}
        <Card
          className={`cursor-pointer transition-all ${
            autoAssign
              ? "ring-2 ring-emerald-500 bg-emerald-50"
              : "hover:shadow-md"
          }`}
          onClick={() => {
            handleAutoAssign();
            setIsDropdownOpen(false);
          }}
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <Radio
                checked={autoAssign}
                onChange={() => {
                  handleAutoAssign();
                  setIsDropdownOpen(false);
                }}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Tự động sắp xếp
                  </h3>
                  <Badge variant="info">Khuyến nghị</Badge>
                </div>
                <p className="text-gray-600 mb-3">
                  Chúng tôi sẽ tự động chọn nhân viên phù hợp nhất dựa trên lịch
                  trống và chuyên môn
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>✓ Cơ hội đặt lịch cao nhất</span>
                  <span>✓ Nhân viên có kinh nghiệm</span>
                  <span>✓ Lịch linh hoạt</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Staff Dropdown */}
        {staffList.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {autoAssign ? (
                    <span className="text-gray-500 font-medium text-sm">
                      🤖
                    </span>
                  ) : selectedStaff ? (
                    (() => {
                      const staff = staffList.find(
                        (s) => s.id === selectedStaff
                      );
                      return staff?.image ? (
                        <img
                          src={staff.image}
                          alt={staff.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 font-medium text-sm">
                          {staff?.name?.charAt(0) || "?"}
                        </span>
                      );
                    })()
                  ) : (
                    <span className="text-gray-500 font-medium text-sm">
                      👤
                    </span>
                  )}
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">
                    {getSelectedStaffName()}
                  </div>
                  {!autoAssign && selectedStaff && (
                    <div className="text-sm text-gray-500">
                      {staffList.find((s) => s.id === selectedStaff)?.email}
                    </div>
                  )}
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {staffList.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => {
                      handleStaffChange(member.id);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 font-medium text-sm">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.email}
                      </div>
                      {member.phone && (
                        <div className="text-xs text-gray-400">
                          {member.phone}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Mẹo:</strong> Chọn "Tự động sắp xếp" để có cơ hội đặt lịch
          cao nhất và lịch linh hoạt hơn
        </p>
      </div>
    </div>
  );
};

export { StaffSelection };
