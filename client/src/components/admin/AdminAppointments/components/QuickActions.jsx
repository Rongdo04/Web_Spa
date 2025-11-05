// components/admin/AdminAppointments/components/QuickActions.jsx
import React, { useState, useEffect } from "react";
import { Card } from "../../../ui";
import { Button } from "../../../ui";
import { Modal } from "../../../ui";
import { Select } from "../../../ui";
import { Input } from "../../../ui";
import { LoadingSpinner } from "../../../ui";
import { adminStaffAPI, adminAppointmentsAPI } from "../../../../services";
import {
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const QuickActions = ({
  selectedAppointments = [],
  onActionComplete,
  onBulkAction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionData, setActionData] = useState({});
  const [staffMembers, setStaffMembers] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ];

  // Load staff members when component mounts
  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    setLoadingStaff(true);
    try {
      const response = await adminStaffAPI.list({
        status: "active",
        limit: 100,
      });
      if (response.success) {
        const staffArray = response.data?.staff || response.data || [];
        const staffData = staffArray.map((staff) => ({
          value: staff._id || staff.id || staff.value,
          label: staff.name || staff.label,
        }));
        setStaffMembers(staffData);
      } else {
        // Fallback data
        setStaffMembers([
          { value: "staff1", label: "Nguyễn Văn A" },
          { value: "staff2", label: "Trần Thị B" },
        ]);
      }
    } catch (error) {
      // Fallback data on error
      setStaffMembers([
        { value: "staff1", label: "Nguyễn Văn A" },
        { value: "staff2", label: "Trần Thị B" },
      ]);
    } finally {
      setLoadingStaff(false);
    }
  };

  const handleQuickAction = (action, appointment) => {
    switch (action) {
      case "confirm":
        onActionComplete(appointment.id, { status: "confirmed" });
        break;
      case "cancel":
        onActionComplete(appointment.id, { status: "cancelled" });
        break;
      case "complete":
        onActionComplete(appointment.id, { status: "completed" });
        break;
      case "reschedule":
        setActionType("reschedule");
        setActionData({ appointment });
        setIsModalOpen(true);
        break;
      case "reassign":
        setActionType("reassign");
        setActionData({ appointment });
        setIsModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedAppointments.length === 0) {
      alert("Vui lòng chọn ít nhất một lịch hẹn!");
      return;
    }

    setIsProcessing(true);

    try {
      const appointmentIds = selectedAppointments.map((apt) => apt.id);
      let status;

      switch (action) {
        case "bulk_confirm":
          status = "confirmed";
          break;
        case "bulk_cancel":
          status = "cancelled";
          break;
        case "bulk_complete":
          status = "completed";
          break;
        default:
          setIsProcessing(false);
          return;
      }

      // Call API for each appointment
      const promises = appointmentIds.map((id) =>
        adminAppointmentsAPI.updateStatus(id, status)
      );

      const results = await Promise.allSettled(promises);

      // Check if all requests were successful
      const successful = results.filter(
        (result) => result.status === "fulfilled" && result.value.success
      );
      const failed = results.filter(
        (result) => result.status === "rejected" || !result.value?.success
      );

      if (successful.length === appointmentIds.length) {
        alert(`Đã cập nhật thành công ${successful.length} lịch hẹn!`);
        // Call onBulkAction to update UI
        onBulkAction(appointmentIds, { status });
      } else {
        alert(
          `Cập nhật thành công ${successful.length}/${appointmentIds.length} lịch hẹn. ${failed.length} lịch hẹn thất bại.`
        );
        // Still call onBulkAction for successful ones
        if (successful.length > 0) {
          const successfulIds = results
            .map((result, index) =>
              result.status === "fulfilled" && result.value.success
                ? appointmentIds[index]
                : null
            )
            .filter(Boolean);
          onBulkAction(successfulIds, { status });
        }
      }
    } catch (error) {
      alert("Lỗi khi thực hiện hành động hàng loạt: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModalSubmit = () => {
    if (actionType === "reschedule") {
      onActionComplete(actionData.appointment.id, {
        date: actionData.newDate,
        time: actionData.newTime,
      });
    } else if (actionType === "reassign") {
      onActionComplete(actionData.appointment.id, {
        staff: actionData.newStaff,
      });
    }
    setIsModalOpen(false);
    setActionData({});
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xác nhận";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Hành động nhanh
          </h3>
          <div className="text-sm text-gray-600">
            {selectedAppointments.length} lịch hẹn được chọn
          </div>
        </div>

        {/* Individual Actions */}
        {selectedAppointments.length === 1 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Lịch hẹn: {selectedAppointments[0].customer}
            </h4>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleQuickAction("confirm", selectedAppointments[0])
                }
                disabled={selectedAppointments[0].status === "confirmed"}
              >
                <CheckOutlined className="mr-1" />
                Xác nhận
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleQuickAction("cancel", selectedAppointments[0])
                }
                disabled={selectedAppointments[0].status === "cancelled"}
              >
                <CloseOutlined className="mr-1" />
                Hủy
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleQuickAction("complete", selectedAppointments[0])
                }
                disabled={selectedAppointments[0].status === "completed"}
              >
                <CheckOutlined className="mr-1" />
                Hoàn thành
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleQuickAction("reschedule", selectedAppointments[0])
                }
                disabled={selectedAppointments[0].status === "cancelled"}
              >
                <CalendarOutlined className="mr-1" />
                Đổi giờ
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleQuickAction("reassign", selectedAppointments[0])
                }
              >
                <UserOutlined className="mr-1" />
                Gán nhân viên
              </Button>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedAppointments.length > 1 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Hành động hàng loạt ({selectedAppointments.length} lịch hẹn)
            </h4>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkAction("bulk_confirm")}
                disabled={
                  isProcessing ||
                  selectedAppointments.every(
                    (apt) => apt.status === "confirmed"
                  )
                }
              >
                {isProcessing ? (
                  <LoadingSpinner size="sm" className="mr-1" />
                ) : (
                  <CheckOutlined className="mr-1" />
                )}
                Xác nhận tất cả
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkAction("bulk_cancel")}
                disabled={
                  isProcessing ||
                  selectedAppointments.every(
                    (apt) => apt.status === "cancelled"
                  )
                }
              >
                {isProcessing ? (
                  <LoadingSpinner size="sm" className="mr-1" />
                ) : (
                  <CloseOutlined className="mr-1" />
                )}
                Hủy tất cả
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkAction("bulk_complete")}
                disabled={
                  isProcessing ||
                  selectedAppointments.every(
                    (apt) => apt.status === "completed"
                  )
                }
              >
                {isProcessing ? (
                  <LoadingSpinner size="sm" className="mr-1" />
                ) : (
                  <CheckOutlined className="mr-1" />
                )}
                Hoàn thành tất cả
              </Button>
            </div>
          </div>
        )}

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {
                selectedAppointments.filter((apt) => apt.status === "pending")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600">Chờ xác nhận</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {
                selectedAppointments.filter((apt) => apt.status === "confirmed")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600">Đã xác nhận</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {
                selectedAppointments.filter((apt) => apt.status === "completed")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600">Hoàn thành</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {
                selectedAppointments.filter((apt) => apt.status === "cancelled")
                  .length
              }
            </div>
            <div className="text-sm text-gray-600">Đã hủy</div>
          </div>
        </div>

        {/* Selected Appointments List */}
        {selectedAppointments.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Lịch hẹn được chọn:
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {appointment.customer}
                    </div>
                    <div className="text-xs text-gray-600">
                      {appointment.service} - {appointment.time} -{" "}
                      {appointment.staff}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {getStatusText(appointment.status)}
                    </span>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleQuickAction("confirm", appointment)
                        }
                        disabled={appointment.status === "confirmed"}
                      >
                        <CheckOutlined />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuickAction("cancel", appointment)}
                        disabled={appointment.status === "cancelled"}
                      >
                        <CloseOutlined />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Action Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {actionType === "reschedule"
                ? "Đổi giờ lịch hẹn"
                : "Gán nhân viên"}
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {actionType === "reschedule" && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                Lịch hẹn: <strong>{actionData.appointment?.customer}</strong>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày mới
                  </label>
                  <Input
                    type="date"
                    value={actionData.newDate || ""}
                    onChange={(e) =>
                      setActionData((prev) => ({
                        ...prev,
                        newDate: e.target.value,
                      }))
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ mới
                  </label>
                  <Select
                    value={actionData.newTime || ""}
                    onChange={(value) =>
                      setActionData((prev) => ({
                        ...prev,
                        newTime: value,
                      }))
                    }
                    options={[
                      { value: "", label: "Chọn giờ" },
                      ...timeSlots.map((time) => ({
                        value: time,
                        label: time,
                      })),
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {actionType === "reassign" && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                Lịch hẹn: <strong>{actionData.appointment?.customer}</strong>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nhân viên mới
                </label>
                {loadingStaff ? (
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm text-gray-500">
                      Đang tải nhân viên...
                    </span>
                  </div>
                ) : (
                  <Select
                    value={actionData.newStaff || ""}
                    onChange={(value) =>
                      setActionData((prev) => ({
                        ...prev,
                        newStaff: value,
                      }))
                    }
                    options={[
                      { value: "", label: "Chọn nhân viên" },
                      ...staffMembers,
                    ]}
                  />
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={handleModalSubmit}
              disabled={
                (actionType === "reschedule" &&
                  (!actionData.newDate || !actionData.newTime)) ||
                (actionType === "reassign" && !actionData.newStaff)
              }
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuickActions;
