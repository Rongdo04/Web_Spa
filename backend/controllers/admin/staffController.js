import Staff from "../../models/Staff.js";
import User from "../../models/User.js";
import Appointment from "../../models/Appointment.js";
import { validationResult } from "express-validator";

// GET /api/admin/staff - Lấy danh sách nhân viên
export const getStaffList = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      role = "",
      status = "",
    } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      filter.role = role;
    }

    if (status) {
      filter.isActive = status === "active";
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const staff = await Staff.find(filter)
      .populate({
        path: "userId",
        select: "name email",
        options: { strictPopulate: false },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalItems = await Staff.countDocuments(filter);

    // Get overall stats (not filtered by pagination)
    const totalStaff = await Staff.countDocuments();
    const activeStaff = await Staff.countDocuments({ isActive: true });
    const inactiveStaff = await Staff.countDocuments({ isActive: false });

    // Get stats for each staff member
    const staffWithStats = await Promise.all(
      staff.map(async (member) => {
        const appointments = await Appointment.find({ staffId: member._id });
        const completedAppointments = appointments.filter(
          (apt) => apt.status === "completed"
        );

        const stats = {
          totalAppointments: appointments.length,
          completedAppointments: completedAppointments.length,
          averageRating: 4.5, // You can calculate this from reviews if you have them
          appointmentsThisMonth: appointments.filter((apt) => {
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            return apt.appointmentDate >= monthStart;
          }).length,
        };

        return {
          id: member._id,
          name: member.name,
          phone: member.phone || "",
          email: member.email || member.userId?.email || "N/A",
          employeeId: member.employeeId,
          image: member.image,
          skills: member.skills || [],
          workSchedule: member.workSchedule || {},
          daysOff: member.daysOff || [],
          revenueShare: member.revenueShare || 0,
          isActive: member.isActive,
          stats,
          createdAt: member.createdAt,
          updatedAt: member.updatedAt,
        };
      })
    );

    res.json({
      success: true,
      data: {
        staff: staffWithStats,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
          itemsPerPage: parseInt(limit),
        },
        stats: {
          total: totalStaff,
          active: activeStaff,
          inactive: inactiveStaff,
        },
      },
    });
  } catch (error) {
    console.error("Error getting staff:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách nhân viên",
      error: error.message,
    });
  }
};

// GET /api/admin/staff/:id - Lấy chi tiết nhân viên
export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Staff.findById(id).populate({
      path: "userId",
      select: "name email",
      options: { strictPopulate: false },
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy nhân viên",
      });
    }

    // Get stats
    const appointments = await Appointment.find({ staffId: member._id });
    const completedAppointments = appointments.filter(
      (apt) => apt.status === "completed"
    );

    const stats = {
      totalAppointments: appointments.length,
      completedAppointments: completedAppointments.length,
      averageRating: 4.5,
      appointmentsThisMonth: appointments.filter((apt) => {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return apt.appointmentDate >= monthStart;
      }).length,
    };

    const transformedStaff = {
      id: member._id,
      name: member.name,
      phone: member.phone || "",
      email: member.email || member.userId?.email || "N/A",
      employeeId: member.employeeId,
      role: member.role,
      image: member.image,
      skills: member.skills || [],
      workSchedule: member.workSchedule || {},
      daysOff: member.daysOff || [],
      revenueShare: member.revenueShare || 0,
      isActive: member.isActive,
      stats,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    };

    res.json({
      success: true,
      data: transformedStaff,
    });
  } catch (error) {
    console.error("Error getting staff member:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết nhân viên",
      error: error.message,
    });
  }
};

// POST /api/admin/staff - Tạo nhân viên mới
export const createStaff = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: errors.array(),
      });
    }

    const staffData = req.body;
    const staff = new Staff(staffData);
    await staff.save();

    const populatedStaff = await Staff.findById(staff._id).populate({
      path: "userId",
      select: "name email",
      options: { strictPopulate: false },
    });

    const transformedStaff = {
      id: populatedStaff._id,
      name: populatedStaff.name,
      phone: populatedStaff.phone || "",
      email: populatedStaff.email || populatedStaff.userId?.email || "N/A",
      employeeId: populatedStaff.employeeId,
      role: populatedStaff.role,
      image: populatedStaff.image,
      skills: populatedStaff.skills || [],
      workSchedule: populatedStaff.workSchedule || {},
      daysOff: populatedStaff.daysOff || [],
      revenueShare: populatedStaff.revenueShare || 0,
      isActive: populatedStaff.isActive,
      stats: {
        totalAppointments: 0,
        completedAppointments: 0,
        averageRating: 0,
        appointmentsThisMonth: 0,
      },
      createdAt: populatedStaff.createdAt,
      updatedAt: populatedStaff.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: "Tạo nhân viên thành công",
      data: transformedStaff,
    });
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo nhân viên",
      error: error.message,
    });
  }
};

// PUT /api/admin/staff/:id - Cập nhật nhân viên
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const staff = await Staff.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate({
      path: "userId",
      select: "name email",
      options: { strictPopulate: false },
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy nhân viên",
      });
    }

    // Get stats
    const appointments = await Appointment.find({ staffId: staff._id });
    const completedAppointments = appointments.filter(
      (apt) => apt.status === "completed"
    );

    const stats = {
      totalAppointments: appointments.length,
      completedAppointments: completedAppointments.length,
      averageRating: 4.5,
      appointmentsThisMonth: appointments.filter((apt) => {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return apt.appointmentDate >= monthStart;
      }).length,
    };

    const transformedStaff = {
      id: staff._id,
      name: staff.name,
      phone: staff.phone || "",
      email: staff.email || staff.userId?.email || "N/A",
      employeeId: staff.employeeId,
      role: staff.role,
      image: staff.image,
      skills: staff.skills || [],
      workSchedule: staff.workSchedule || {},
      daysOff: staff.daysOff || [],
      revenueShare: staff.revenueShare || 0,
      isActive: staff.isActive,
      stats,
      createdAt: staff.createdAt,
      updatedAt: staff.updatedAt,
    };

    res.json({
      success: true,
      message: "Cập nhật nhân viên thành công",
      data: transformedStaff,
    });
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật nhân viên",
      error: error.message,
    });
  }
};

// DELETE /api/admin/staff/:id - Xóa nhân viên
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy nhân viên",
      });
    }

    res.json({
      success: true,
      message: "Xóa nhân viên thành công",
    });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa nhân viên",
      error: error.message,
    });
  }
};

// PATCH /api/admin/staff/:id/toggle - Bật/tắt nhân viên
export const toggleStaffStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const staff = await Staff.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    ).populate("userId", "name email");

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy nhân viên",
      });
    }

    const transformedStaff = {
      id: staff._id,
      name: staff.name,
      email: staff.userId?.email || "N/A",
      employeeId: staff.employeeId,
      role: staff.role,
      image: staff.image,
      skills: staff.skills || [],
      workSchedule: staff.workSchedule || {},
      daysOff: staff.daysOff || [],
      revenueShare: staff.revenueShare || 0,
      isActive: staff.isActive,
      createdAt: staff.createdAt,
      updatedAt: staff.updatedAt,
    };

    res.json({
      success: true,
      message: `${isActive ? "Kích hoạt" : "Vô hiệu hóa"} nhân viên thành công`,
      data: transformedStaff,
    });
  } catch (error) {
    console.error("Error toggling staff status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật trạng thái nhân viên",
      error: error.message,
    });
  }
};
