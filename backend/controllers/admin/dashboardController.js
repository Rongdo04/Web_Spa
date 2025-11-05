import Appointment from "../../models/Appointment.js";
import User from "../../models/User.js";
import Service from "../../models/Service.js";
import Staff from "../../models/Staff.js";

// GET /api/admin/dashboard
export const getDashboard = async (req, res) => {
  try {
    console.log("Getting dashboard data...");

    // Get all appointments (not just last 30 days for now)
    const appointments = await Appointment.find({})
      .populate("customerId", "name")
      .populate("serviceId", "name price")
      .populate("staffId", "name");

    console.log(`Found ${appointments.length} appointments`);

    // Log some sample data for debugging
    if (appointments.length > 0) {
      console.log("Sample appointment:", {
        id: appointments[0]._id,
        date: appointments[0].appointmentDate,
        status: appointments[0].status,
        customer: appointments[0].customerId?.name,
        service: appointments[0].serviceId?.name,
        staff: appointments[0].staffId?.name,
      });
    }

    // Calculate statistics
    const totalAppointments = appointments.length;
    const completedAppointments = appointments.filter(
      (apt) => apt.status === "completed"
    ).length;
    const pendingAppointments = appointments.filter(
      (apt) => apt.status === "pending"
    ).length;
    const confirmedAppointments = appointments.filter(
      (apt) => apt.status === "confirmed"
    ).length;

    // Calculate today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = appointments.filter((apt) => {
      const aptDate = new Date(apt.appointmentDate);
      return aptDate >= today && aptDate < tomorrow;
    }).length;

    // Calculate revenue
    const totalRevenue = appointments
      .filter((apt) => apt.status === "completed")
      .reduce(
        (sum, apt) => sum + (apt.totalAmount || apt.serviceId?.price || 0),
        0
      );

    // Calculate today's revenue
    const todayRevenue = appointments
      .filter((apt) => {
        const aptDate = new Date(apt.appointmentDate);
        return (
          aptDate >= today && aptDate < tomorrow && apt.status === "completed"
        );
      })
      .reduce(
        (sum, apt) => sum + (apt.totalAmount || apt.serviceId?.price || 0),
        0
      );

    // Get counts
    const totalCustomers = await User.countDocuments({
      isActive: true,
      role: "user",
    });
    const totalServices = await Service.countDocuments({ isActive: true });
    const totalStaff = await Staff.countDocuments({ isActive: true });

    // Get upcoming appointments (future appointments)
    const now = new Date();
    const upcomingAppointments = appointments
      .filter((apt) => {
        const aptDate = new Date(apt.appointmentDate);
        return aptDate >= now;
      })
      .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
      .slice(0, 5);

    // Get top services
    const serviceStats = await Appointment.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$serviceId",
          count: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Calculate cancellation rate
    const cancelledAppointments = appointments.filter(
      (apt) => apt.status === "cancelled"
    ).length;
    const cancellationRate =
      totalAppointments > 0
        ? (cancelledAppointments / totalAppointments) * 100
        : 0;

    const data = {
      kpis: {
        totalAppointments,
        todayAppointments,
        completedAppointments,
        pendingAppointments,
        confirmedAppointments,
        totalRevenue,
        todayRevenue,
        cancellationRate: Math.round(cancellationRate * 100) / 100,
        csatScore: 4.5, // Default value, can be calculated from ratings
        totalCustomers,
        totalServices,
        totalStaff,
      },
      revenue: {
        total: totalRevenue,
        thisMonth: totalRevenue,
        lastMonth: 0, // You can calculate this if needed
        growth: 0,
      },
      services: serviceStats.map((stat) => ({
        id: stat._id,
        name: stat.service.name,
        appointments: stat.count,
        revenue: stat.revenue,
      })),
      upcomingBookings: upcomingAppointments.map((apt) => ({
        id: apt._id,
        customer: apt.customerId?.name || "N/A",
        service: apt.serviceId?.name || "N/A",
        staff: apt.staffId?.name || "N/A",
        date: apt.appointmentDate,
        time: apt.startTime,
        status: apt.status,
      })),
    };

    console.log("Dashboard data calculated:", {
      totalAppointments,
      todayAppointments,
      completedAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalRevenue,
      todayRevenue,
      totalCustomers,
      totalServices,
      totalStaff,
      upcomingBookingsCount: upcomingAppointments.length,
      servicesCount: serviceStats.length,
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error getting dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy dữ liệu dashboard",
      error: error.message,
    });
  }
};
