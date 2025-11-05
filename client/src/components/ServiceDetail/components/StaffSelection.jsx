import React, { useState, useEffect, useRef } from "react";
import { Card, Radio, Badge } from "../../ui";

const StaffSelection = ({ staff, selectedStaff, onStaffChange }) => {
  const [autoAssign, setAutoAssign] = useState(!selectedStaff);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleStaffChange = (staffId) => {
    setAutoAssign(false);
    onStaffChange(staffId);
    setIsDropdownOpen(false);
  };

  const handleAutoAssign = () => {
    setAutoAssign(true);
    onStaffChange(null);
    setIsDropdownOpen(false);
  };

  const getSelectedStaffName = () => {
    if (autoAssign) return "Tự động sắp xếp";
    if (selectedStaff) {
      const staffMember = staff.find((s) => s.id === selectedStaff);
      return staffMember ? staffMember.name : "Chọn nhân viên";
    }
    return "Chọn nhân viên";
  };

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

  if (!staff || staff.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Chọn nhân viên
        </h3>
        <div className="text-center py-8 text-gray-500">
          <p>Hiện tại không có nhân viên nào khả dụng</p>
          <p className="text-sm mt-2">Vui lòng liên hệ để được hỗ trợ</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Chọn nhân viên
      </h3>

      <div className="space-y-4">
        {/* Auto Assign Option */}
        <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <Radio
            checked={autoAssign}
            onChange={handleAutoAssign}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-gray-900">Tự động sắp xếp</h4>
              <Badge variant="info">Khuyến nghị</Badge>
            </div>
            <p className="text-sm text-gray-600">
              Chúng tôi sẽ tự động chọn nhân viên phù hợp nhất dựa trên lịch
              trống và chuyên môn
            </p>
          </div>
        </div>

        {/* Staff Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {!autoAssign && selectedStaff ? (
                  (() => {
                    const staffMember = staff.find(
                      (s) => s.id === selectedStaff
                    );
                    return staffMember?.image ? (
                      <img
                        src={staffMember.image}
                        alt={staffMember.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 font-medium">
                        {staffMember?.name?.charAt(0) || "?"}
                      </span>
                    );
                  })()
                ) : (
                  <span className="text-gray-500 font-medium">🤖</span>
                )}
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  {getSelectedStaffName()}
                </div>
                {!autoAssign && selectedStaff && (
                  <div className="text-sm text-gray-500">
                    {staff.find((s) => s.id === selectedStaff)?.email || ""}
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

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {staff.map((member) => (
                <button
                  key={member.id}
                  onClick={() => handleStaffChange(member.id)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 font-medium">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {member.name}
                    </div>
                    {member.email && (
                      <div className="text-sm text-gray-500">
                        {member.email}
                      </div>
                    )}
                    {member.phone && (
                      <div className="text-sm text-gray-500">
                        {member.phone}
                      </div>
                    )}
                  </div>
                  {selectedStaff === member.id && (
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Mẹo:</strong> Chọn "Tự động sắp xếp" để có cơ hội đặt lịch
          cao nhất
        </p>
      </div>
    </Card>
  );
};

export default StaffSelection;
