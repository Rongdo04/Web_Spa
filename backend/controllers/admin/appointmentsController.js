import Appointment from "../../models/Appointment.js";
import Service from "../../models/Service.js";
import Staff from "../../models/Staff.js";
import User from "../../models/User.js";
import { validationResult } from "express-validator";
import {
  getVietnamTime,
  formatDateToVietnamString,
  parseVietnamDate,
  isTodayVietnam,
  getTodayVietnamString,
  formatVietnamDate,
  formatVietnamTime,
  formatVietnamDateTime,
  createDateRangeFilter,
} from "../../utils/timezoneUtils.js";
import { sendNotification } from "../../services/notificationService.js";

// GET /api/admin/appointments - Lấy danh sách lịch hẹn
export const getAppointmentsList = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "",
      service = "",
      staff = "",
      branch = "",
      startDate = "",
      endDate = "",
      sortBy = "appointmentDate",
      sortOrder = "desc",
      view = "list", // list, calendar
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (service) {
      filter.serviceId = service;
    }

    if (staff) {
      filter.staffId = staff;
    }

    if (startDate && endDate) {
      const dateFilter = createDateRangeFilter(startDate, endDate);
      filter.appointmentDate = dateFilter.date;
    }

    // Handle search in customer information
    if (search) {
      // Find users that match the search term
      const userFilter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
        role: "user", // Only search users, not admins
      };

      const matchingUsers = await User.find(userFilter).select("_id");
      const userIds = matchingUsers.map((u) => u._id);

      // Add customer search to filter
      filter.$or = [
        { appointmentNumber: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
        ...(userIds.length > 0 ? [{ customerId: { $in: userIds } }] : []),
      ];
    }

    // Build sort object
    const sortObj = {};
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    // Map frontend sort fields to backend fields
    switch (sortBy) {
      case "date":
        sortObj.appointmentDate = sortDirection;
        sortObj.startTime = sortDirection;
        break;
      case "customer":
        // For customer sorting, we'll sort by customer name after populate
        sortObj.appointmentDate = -1; // Default fallback
        break;
      case "status":
        sortObj.status = sortDirection;
        sortObj.appointmentDate = -1; // Secondary sort
        break;
      case "service":
        // For service sorting, we'll sort by service name after populate
        sortObj.appointmentDate = -1; // Default fallback
        break;
      default:
        sortObj.appointmentDate = sortDirection;
        sortObj.startTime = sortDirection;
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let appointments = await Appointment.find(filter)
      .populate("customerId", "name phone email level totalSpent")
      .populate("serviceId", "name price duration")
      .populate("staffId", "name employeeId")
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    // Handle client-side sorting for fields that need populated data
    if (sortBy === "customer" || sortBy === "service") {
      appointments = appointments.sort((a, b) => {
        let aValue, bValue;

        if (sortBy === "customer") {
          aValue = (a.customerId?.name || "").toLowerCase();
          bValue = (b.customerId?.name || "").toLowerCase();
        } else if (sortBy === "service") {
          aValue = (a.serviceId?.name || "").toLowerCase();
          bValue = (b.serviceId?.name || "").toLowerCase();
        }

        if (aValue < bValue) return sortDirection === 1 ? -1 : 1;
        if (aValue > bValue) return sortDirection === 1 ? 1 : -1;
        return 0;
      });
    }

    const totalItems = await Appointment.countDocuments(filter);

    // Transform data to match frontend expectations
    const transformedAppointments = appointments.map((apt) => ({
      id: apt._id,
      customerId: apt.customerId?._id,
      customerName: apt.customerId?.name || "N/A",
      customerPhone: apt.customerId?.phone || "N/A",
      customerEmail: apt.customerId?.email || "N/A",
      serviceId: apt.serviceId?._id,
      serviceName: apt.serviceId?.name || "N/A",
      staffId: apt.staffId?._id,
      staffName: apt.staffId?.name || "N/A",
      appointmentDate: formatDateToVietnamString(apt.appointmentDate),
      startTime: apt.startTime,
      endTime: apt.endTime,
      duration: apt.duration,
      status: apt.status,
      notes: apt.notes || "",
      totalAmount: apt.totalAmount,
      createdAt: apt.createdAt,
      updatedAt: apt.updatedAt,
    }));

    res.json({
      success: true,
      data: {
        appointments: transformedAppointments,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách lịch hẹn",
      error: error.message,
    });
  }
};

// GET /api/admin/appointments/calendar - Lấy dữ liệu calendar
export const getAppointmentsCalendar = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      view = "month", // day, week, month
    } = req.query;

    // Build filter for date range
    const filter = {};
    if (startDate && endDate) {
      const dateFilter = createDateRangeFilter(startDate, endDate);
      filter.appointmentDate = dateFilter.date;
    }

    const appointments = await Appointment.find(filter)
      .populate("customerId", "name phone email level totalSpent")
      .populate("serviceId", "name price duration")
      .populate("staffId", "name employeeId")
      .sort({ appointmentDate: 1, startTime: 1 });

    // Format cho calendar
    const calendarEvents = appointments.map((apt) => ({
      id: apt._id,
      title: `${apt.customerId?.name || "N/A"} - ${
        apt.serviceId?.name || "N/A"
      }`,
      start: `${formatDateToVietnamString(apt.appointmentDate)}T${
        apt.startTime
      }`,
      end: `${formatDateToVietnamString(apt.appointmentDate)}T${apt.endTime}`,
      status: apt.status,
      customerName: apt.customerId?.name || "N/A",
      serviceName: apt.serviceId?.name || "N/A",
      staffName: apt.staffId?.name || "N/A",
      notes: apt.notes,
      totalAmount: apt.totalAmount,
    }));

    res.json({
      success: true,
      data: {
        events: calendarEvents,
        branches: [], // TODO: Implement branches if needed
      },
    });
  } catch (error) {
    console.error("Error getting calendar data:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy dữ liệu calendar",
      error: error.message,
    });
  }
};

// GET /api/admin/appointments/:id - Lấy chi tiết lịch hẹn
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate("customerId", "name phone email level totalSpent")
      .populate("serviceId", "name price duration")
      .populate("staffId", "name employeeId");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch hẹn",
      });
    }

    // Transform response data
    const responseData = {
      id: appointment._id,
      customer: appointment.customerId?.name || "N/A",
      phone: appointment.customerId?.phone || "N/A",
      email: appointment.customerId?.email || "N/A",
      service: appointment.serviceId?.name || "N/A",
      staff: appointment.staffId?.name || "N/A",
      date: formatDateToVietnamString(appointment.appointmentDate),
      time: appointment.startTime,
      duration: appointment.duration,
      status: appointment.status,
      notes: appointment.notes,
      totalAmount: appointment.totalAmount,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    };

    res.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error getting appointment by ID:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết lịch hẹn",
      error: error.message,
    });
  }
};

// GET /api/admin/appointments/number/:appointmentNumber - Lấy chi tiết lịch hẹn bằng mã đặt lịch
export const getAppointmentByNumber = async (req, res) => {
  try {
    const { appointmentNumber } = req.params;

    const appointment = await Appointment.findOne({ appointmentNumber })
      .populate("customerId", "name phone email level totalSpent")
      .populate("serviceId", "name price duration")
      .populate("staffId", "name employeeId");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch hẹn với mã này",
      });
    }

    // Transform response data
    const responseData = {
      id: appointment._id,
      appointmentNumber: appointment.appointmentNumber,
      customer: appointment.customerId?.name || "N/A",
      phone: appointment.customerId?.phone || "N/A",
      email: appointment.customerId?.email || "N/A",
      service: appointment.serviceId?.name || "N/A",
      staff: appointment.staffId?.name || "Tự động sắp xếp",
      date: formatDateToVietnamString(appointment.appointmentDate),
      time: appointment.startTime,
      duration: appointment.duration,
      status: appointment.status,
      notes: appointment.notes,
      totalAmount: appointment.totalAmount,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    };

    res.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error getting appointment by number:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết lịch hẹn",
      error: error.message,
    });
  }
};

// POST /api/admin/appointments - Tạo lịch hẹn mới
export const createAppointment = async (req, res) => {
  try {
    const {
      customer,
      phone,
      email,
      service,
      staff,
      date,
      time,
      duration,
      notes = "",
      status = "pending",
      serviceName,
      staffName,
    } = req.body;

    // Validation
    if (!customer || !phone || !email || !service || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin bắt buộc (bao gồm email)",
      });
    }

    // Find or create user
    let userDoc = await User.findOne({ phone, role: "user" });
    if (!userDoc) {
      // Find or create a default admin user for appointments
      let defaultUser = await User.findOne({ email: "admin@spa.com" });
      if (!defaultUser) {
        defaultUser = new User({
          name: "Admin System",
          email: "admin@spa.com",
          password: "admin123456", // Default password
          role: "admin",
        });
        await defaultUser.save();
      }

      // Create new user for this customer
      userDoc = new User({
        name: customer,
        phone,
        email: email.toLowerCase(),
        password: "temp123", // Temporary password
        role: "user",
        isActive: true,
        preferences: {
          communication: {
            email: true,
            sms: true,
            phone: false,
          },
        },
      });
      await userDoc.save();
    }

    // Calculate end time
    const startTimeMinutes =
      parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
    const endTimeMinutes = startTimeMinutes + (duration || 60);
    const endTime = `${Math.floor(endTimeMinutes / 60)
      .toString()
      .padStart(2, "0")}:${(endTimeMinutes % 60).toString().padStart(2, "0")}`;

    // Handle staff assignment - if staff is null, we'll auto-assign later
    let assignedStaffId = staff;

    // If staff is provided, check for conflicts
    if (staff) {
      const conflictFilter = {
        staffId: staff,
        appointmentDate: parseVietnamDate(date),
        status: { $ne: "cancelled" },
        $or: [
          {
            startTime: { $lte: time },
            endTime: { $gt: time },
          },
        ],
      };

      const conflict = await Appointment.findOne(conflictFilter);
      if (conflict) {
        return res.status(400).json({
          success: false,
          message: "Nhân viên đã có lịch hẹn trong khung giờ này",
        });
      }
    } else {
      // Auto-assign staff - find available staff for the time slot
      const availableStaff = await Staff.findOne({
        isActive: true,
        _id: {
          $nin: await Appointment.find({
            appointmentDate: parseVietnamDate(date),
            status: { $ne: "cancelled" },
            $or: [
              {
                startTime: { $lte: time },
                endTime: { $gt: time },
              },
            ],
          }).distinct("staffId"),
        },
      });

      if (availableStaff) {
        assignedStaffId = availableStaff._id;
      } else {
        // If no staff available, create appointment without staff assignment
        // Admin can assign later
        assignedStaffId = null;
      }
    }

    // Get service price
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(400).json({
        success: false,
        message: "Dịch vụ không tồn tại",
      });
    }

    // Generate appointment number manually
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const appointmentNumber = `APT${year}${month}${day}${random}`;

    // Calculate final amount
    const totalAmount = serviceDoc.price || 0;
    const discount = 0;
    const finalAmount = totalAmount - discount;

    console.log("🔄 Creating appointment with:", {
      appointmentNumber,
      totalAmount,
      discount,
      finalAmount,
      servicePrice: serviceDoc.price,
    });

    // Create new appointment
    const newAppointment = new Appointment({
      appointmentNumber: appointmentNumber,
      customerId: userDoc._id,
      serviceId: service,
      staffId: assignedStaffId,
      appointmentDate: parseVietnamDate(date),
      startTime: time,
      endTime: endTime,
      duration: duration || 60,
      status: status,
      notes: notes || "",
      totalAmount: totalAmount,
      discount: discount,
      finalAmount: finalAmount,
    });

    await newAppointment.save();

    // Populate the appointment with related data
    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate("customerId", "name phone email")
      .populate("serviceId", "name price duration")
      .populate("staffId", "name employeeId");

    // Transform response data
    const responseData = {
      id: populatedAppointment._id,
      appointmentNumber: populatedAppointment.appointmentNumber,
      customer: populatedAppointment.customerId?.name || customer,
      phone: populatedAppointment.customerId?.phone || phone,
      email: populatedAppointment.customerId?.email || email,
      service: populatedAppointment.serviceId?.name || serviceName,
      staff:
        populatedAppointment.staffId?.name || staffName || "Tự động sắp xếp",
      date: formatDateToVietnamString(populatedAppointment.appointmentDate),
      time: populatedAppointment.startTime,
      duration: populatedAppointment.duration,
      status: populatedAppointment.status,
      notes: populatedAppointment.notes,
      totalAmount: populatedAppointment.totalAmount,
      createdAt: populatedAppointment.createdAt,
      updatedAt: populatedAppointment.updatedAt,
    };

    // Gửi thông báo xác nhận tạo lịch hẹn
    try {
      console.log("🔔 Sending appointment_created notification...");
      await sendNotification(
        "appointment_created",
        {
          id: userDoc._id,
          name: userDoc.name,
          phone: userDoc.phone,
          email: userDoc.email,
        },
        {
          serviceName: serviceDoc.name,
          appointmentDate: formatDateToVietnamString(
            populatedAppointment.appointmentDate
          ),
          startTime: populatedAppointment.startTime,
          endTime: populatedAppointment.endTime,
          staffName: populatedAppointment.staffId?.name || staffName,
          totalAmount: populatedAppointment.totalAmount,
          appointmentNumber: populatedAppointment.appointmentNumber,
          branchName: "Chi nhánh chính", // Có thể lấy từ branch data nếu có
        }
      );
      console.log("✅ Notification sent successfully");
    } catch (notificationError) {
      console.error("❌ Error sending notification:", notificationError);
      // Không throw error để không ảnh hưởng đến việc tạo appointment
    }

    res.status(201).json({
      success: true,
      message: "Tạo lịch hẹn thành công",
      data: responseData,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo lịch hẹn",
      error: error.message,
    });
  }
};

// PUT /api/admin/appointments/:id - Cập nhật lịch hẹn
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customer,
      phone,
      email,
      service,
      staff,
      date,
      time,
      duration,
      notes,
      status,
      serviceName,
      staffName,
    } = req.body;

    // Validation
    if (!customer || !phone || !service || !staff || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin bắt buộc",
      });
    }

    // Find existing appointment
    const existingAppointment = await Appointment.findById(id);
    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch hẹn",
      });
    }

    // Check for conflicts (exclude current appointment)
    const conflictFilter = {
      _id: { $ne: id },
      staffId: staff,
      appointmentDate: parseVietnamDate(date),
      status: { $ne: "cancelled" },
      $or: [
        {
          startTime: { $lte: time },
          endTime: { $gt: time },
        },
      ],
    };

    const conflict = await Appointment.findOne(conflictFilter);
    if (conflict) {
      return res.status(400).json({
        success: false,
        message: "Nhân viên đã có lịch hẹn trong khung giờ này",
      });
    }

    // Update customer information if provided
    if (customer || phone || email) {
      try {
        // Check if email already exists (if email is being updated)
        if (email) {
          const existingUserWithEmail = await User.findOne({
            email: email.toLowerCase(),
            _id: { $ne: existingAppointment.customerId },
            role: "user",
          });
          if (existingUserWithEmail) {
            return res.status(400).json({
              success: false,
              message: "Email này đã được sử dụng bởi khách hàng khác",
            });
          }
        }

        await User.findByIdAndUpdate(
          existingAppointment.customerId,
          {
            ...(customer && { name: customer }),
            ...(phone && { phone: phone }),
            ...(email && email.trim() !== "" && { email: email.toLowerCase() }),
            updatedAt: new Date(),
          },
          { new: true }
        );
      } catch (error) {
        console.error("Error updating customer:", error);
        return res.status(500).json({
          success: false,
          message: "Lỗi khi cập nhật thông tin khách hàng",
          error: error.message,
        });
      }
    }

    // Calculate end time
    const startTimeMinutes =
      parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
    const endTimeMinutes = startTimeMinutes + (duration || 60);
    const endTime = `${Math.floor(endTimeMinutes / 60)
      .toString()
      .padStart(2, "0")}:${(endTimeMinutes % 60).toString().padStart(2, "0")}`;

    // Update appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        customerId: existingAppointment.customerId, // Keep existing customer reference
        serviceId: service,
        staffId: staff,
        appointmentDate: parseVietnamDate(date),
        startTime: time,
        endTime: endTime,
        duration: duration || 60,
        notes: notes || "",
        status: status || existingAppointment.status,
        updatedAt: new Date(),
      },
      { new: true }
    )
      .populate("customerId", "name phone email")
      .populate("serviceId", "name price duration")
      .populate("staffId", "name employeeId");

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch hẹn",
      });
    }

    // Transform response data
    const responseData = {
      id: updatedAppointment._id,
      customer: updatedAppointment.customerId?.name || customer,
      phone: updatedAppointment.customerId?.phone || phone,
      email: updatedAppointment.customerId?.email || email,
      service: updatedAppointment.serviceId?.name || serviceName,
      staff: updatedAppointment.staffId?.name || staffName,
      date: formatDateToVietnamString(updatedAppointment.appointmentDate),
      time: updatedAppointment.startTime,
      duration: updatedAppointment.duration,
      status: updatedAppointment.status,
      notes: updatedAppointment.notes,
      totalAmount: updatedAppointment.totalAmount,
      createdAt: updatedAppointment.createdAt,
      updatedAt: updatedAppointment.updatedAt,
    };

    // Gửi thông báo khi thay đổi trạng thái lịch hẹn
    if (existingAppointment.status !== updatedAppointment.status) {
      try {
        let trigger = "";
        switch (updatedAppointment.status) {
          case "cancelled":
            trigger = "appointment_cancelled";
            break;
          case "completed":
            trigger = "appointment_completed";
            break;
          case "confirmed":
            trigger = "appointment_rescheduled";
            break;
        }

        if (trigger) {
          console.log(`🔔 Sending ${trigger} notification...`);
          await sendNotification(
            trigger,
            {
              id: updatedAppointment.customerId._id,
              name: updatedAppointment.customerId.name,
              phone: updatedAppointment.customerId.phone,
              email: updatedAppointment.customerId.email,
            },
            {
              serviceName: updatedAppointment.serviceId.name,
              appointmentDate: formatDateToVietnamString(
                updatedAppointment.appointmentDate
              ),
              startTime: updatedAppointment.startTime,
              endTime: updatedAppointment.endTime,
              staffName: updatedAppointment.staffId.name,
              totalAmount: updatedAppointment.totalAmount,
              appointmentNumber: updatedAppointment.appointmentNumber,
              branchName: "Chi nhánh chính",
            }
          );
          console.log(`✅ ${trigger} notification sent successfully`);
        }
      } catch (notificationError) {
        console.error("❌ Error sending notification:", notificationError);
        // Không throw error để không ảnh hưởng đến việc cập nhật appointment
      }
    }

    res.json({
      success: true,
      message: "Cập nhật lịch hẹn thành công",
      data: responseData,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật lịch hẹn",
      error: error.message,
    });
  }
};

// DELETE /api/admin/appointments/:id - Xóa lịch hẹn
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch hẹn",
      });
    }

    res.json({
      success: true,
      message: "Xóa lịch hẹn thành công",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa lịch hẹn",
      error: error.message,
    });
  }
};

// PATCH /api/admin/appointments/:id/status - Cập nhật trạng thái lịch hẹn
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái không hợp lệ",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    )
      .populate("customerId", "name phone email")
      .populate("serviceId", "name price duration")
      .populate("staffId", "name employeeId");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch hẹn",
      });
    }

    // Transform response data
    const responseData = {
      id: appointment._id,
      customer: appointment.customerId?.name || "N/A",
      phone: appointment.customerId?.phone || "N/A",
      email: appointment.customerId?.email || "N/A",
      service: appointment.serviceId?.name || "N/A",
      staff: appointment.staffId?.name || "N/A",
      date: formatDateToVietnamString(appointment.appointmentDate),
      time: appointment.startTime,
      duration: appointment.duration,
      status: appointment.status,
      notes: appointment.notes,
      totalAmount: appointment.totalAmount,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    };

    res.json({
      success: true,
      message: "Cập nhật trạng thái lịch hẹn thành công",
      data: responseData,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật trạng thái lịch hẹn",
      error: error.message,
    });
  }
};

// PATCH /api/admin/appointments/:id/reschedule - Đổi lịch hẹn
export const rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentDate, startTime, endTime, notes } = req.body;

    const existingAppointment = await Appointment.findById(id);
    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch hẹn",
      });
    }

    // Check conflict
    const conflictFilter = {
      _id: { $ne: id },
      staffId: existingAppointment.staffId,
      appointmentDate: parseVietnamDate(appointmentDate),
      status: { $ne: "cancelled" },
      $or: [
        {
          startTime: { $lte: startTime },
          endTime: { $gt: startTime },
        },
      ],
    };

    const conflict = await Appointment.findOne(conflictFilter);
    if (conflict) {
      return res.status(400).json({
        success: false,
        message: "Nhân viên đã có lịch hẹn trong khung giờ này",
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        appointmentDate: parseVietnamDate(appointmentDate),
        startTime,
        endTime: endTime || startTime,
        notes: notes || existingAppointment.notes,
        updatedAt: new Date(),
      },
      { new: true }
    )
      .populate("customerId", "name phone email")
      .populate("serviceId", "name price duration")
      .populate("staffId", "name employeeId");

    // Transform response data
    const responseData = {
      id: updatedAppointment._id,
      customer: updatedAppointment.customerId?.name || "N/A",
      phone: updatedAppointment.customerId?.phone || "N/A",
      email: updatedAppointment.customerId?.email || "N/A",
      service: updatedAppointment.serviceId?.name || "N/A",
      staff: updatedAppointment.staffId?.name || "N/A",
      date: formatDateToVietnamString(updatedAppointment.appointmentDate),
      time: updatedAppointment.startTime,
      duration: updatedAppointment.duration,
      status: updatedAppointment.status,
      notes: updatedAppointment.notes,
      totalAmount: updatedAppointment.totalAmount,
      createdAt: updatedAppointment.createdAt,
      updatedAt: updatedAppointment.updatedAt,
    };

    res.json({
      success: true,
      message: "Đổi lịch hẹn thành công",
      data: responseData,
    });
  } catch (error) {
    console.error("Error rescheduling appointment:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi đổi lịch hẹn",
      error: error.message,
    });
  }
};

// GET /api/admin/appointments/check-conflicts - Kiểm tra xung đột
export const checkConflicts = async (req, res) => {
  try {
    const {
      staffId,
      appointmentDate,
      startTime,
      duration,
      excludeAppointmentId, // For edit mode
    } = req.query;

    if (!staffId || !appointmentDate || !startTime) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin cần thiết để kiểm tra xung đột",
      });
    }

    // Calculate end time
    const startTimeMinutes =
      parseInt(startTime.split(":")[0]) * 60 +
      parseInt(startTime.split(":")[1]);
    const endTimeMinutes = startTimeMinutes + (parseInt(duration) || 60);
    const endTime = `${Math.floor(endTimeMinutes / 60)
      .toString()
      .padStart(2, "0")}:${(endTimeMinutes % 60).toString().padStart(2, "0")}`;

    // Build conflict filter
    const conflictFilter = {
      staffId: staffId,
      appointmentDate: parseVietnamDate(appointmentDate),
      status: { $ne: "cancelled" },
      $or: [
        {
          startTime: { $lte: startTime },
          endTime: { $gt: startTime },
        },
        {
          startTime: { $lt: endTime },
          endTime: { $gte: endTime },
        },
        {
          startTime: { $gte: startTime },
          endTime: { $lte: endTime },
        },
      ],
    };

    // Exclude current appointment if editing
    if (excludeAppointmentId) {
      conflictFilter._id = { $ne: excludeAppointmentId };
    }

    // Find conflicting appointments
    const conflictingAppointments = await Appointment.find(conflictFilter)
      .populate("customerId", "name phone email")
      .populate("serviceId", "name duration")
      .populate("staffId", "name employeeId")
      .sort({ startTime: 1 });

    // Transform conflicts data
    const conflicts = conflictingAppointments.map((apt) => ({
      id: apt._id,
      customer: apt.customerId?.name || "N/A",
      time: apt.startTime,
      duration: apt.duration,
      service: apt.serviceId?.name || "N/A",
      staff: apt.staffId?.name || "N/A",
      conflictType: "staff_time",
      message: `Nhân viên ${apt.staffId?.name || "N/A"} đã có lịch hẹn với ${
        apt.customerId?.name || "N/A"
      } vào thời gian này`,
      appointmentId: apt._id,
    }));

    res.json({
      success: true,
      data: {
        conflicts,
        hasConflicts: conflicts.length > 0,
        conflictCount: conflicts.length,
      },
    });
  } catch (error) {
    console.error("Error checking conflicts:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi kiểm tra xung đột",
      error: error.message,
    });
  }
};

// PATCH /api/admin/appointments/:id/assign-staff - Gán nhân viên
export const assignStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { staffId } = req.body;

    const existingAppointment = await Appointment.findById(id);
    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch hẹn",
      });
    }

    // Check conflict with new staff
    const conflictFilter = {
      _id: { $ne: id },
      staffId: staffId,
      appointmentDate: existingAppointment.appointmentDate,
      status: { $ne: "cancelled" },
      $or: [
        {
          startTime: { $lte: existingAppointment.startTime },
          endTime: { $gt: existingAppointment.startTime },
        },
      ],
    };

    const conflict = await Appointment.findOne(conflictFilter);
    if (conflict) {
      return res.status(400).json({
        success: false,
        message: "Nhân viên đã có lịch hẹn trong khung giờ này",
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { staffId, updatedAt: new Date() },
      { new: true }
    )
      .populate("customerId", "name phone email")
      .populate("serviceId", "name price duration")
      .populate("staffId", "name employeeId");

    // Transform response data
    const responseData = {
      id: updatedAppointment._id,
      customer: updatedAppointment.customerId?.name || "N/A",
      phone: updatedAppointment.customerId?.phone || "N/A",
      email: updatedAppointment.customerId?.email || "N/A",
      service: updatedAppointment.serviceId?.name || "N/A",
      staff: updatedAppointment.staffId?.name || "N/A",
      date: formatDateToVietnamString(updatedAppointment.appointmentDate),
      time: updatedAppointment.startTime,
      duration: updatedAppointment.duration,
      status: updatedAppointment.status,
      notes: updatedAppointment.notes,
      totalAmount: updatedAppointment.totalAmount,
      createdAt: updatedAppointment.createdAt,
      updatedAt: updatedAppointment.updatedAt,
    };

    res.json({
      success: true,
      message: "Gán nhân viên thành công",
      data: responseData,
    });
  } catch (error) {
    console.error("Error assigning staff:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi gán nhân viên",
      error: error.message,
    });
  }
};
