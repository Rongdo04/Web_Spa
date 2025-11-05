// Dashboard seeder - Mock data cho dashboard
export const getDashboardData = () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  // Mock data cho KPI cards
  const kpiData = {
    todayAppointments: 12,
    todayRevenue: 2500000,
    weekRevenue: 15000000,
    cancellationRate: 8.5,
    csatScore: 4.7,
  };

  // Mock data cho biểu đồ doanh thu 7 ngày gần nhất
  const revenueChart = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    revenueChart.push({
      date: date.toISOString().split("T")[0],
      revenue: Math.floor(Math.random() * 3000000) + 1000000,
    });
  }

  // Mock data cho top dịch vụ
  const topServices = [
    { name: "Massage thư giãn", bookings: 45, revenue: 6750000 },
    { name: "Facial chăm sóc da", bookings: 38, revenue: 5700000 },
    { name: "Cắt tóc & tạo kiểu", bookings: 32, revenue: 4800000 },
    { name: "Nail art", bookings: 28, revenue: 4200000 },
    { name: "Spa body treatment", bookings: 25, revenue: 3750000 },
  ];

  // Mock data cho khung giờ cao điểm
  const peakHours = [
    { hour: "9:00", intensity: 0.3 },
    { hour: "10:00", intensity: 0.5 },
    { hour: "11:00", intensity: 0.7 },
    { hour: "12:00", intensity: 0.4 },
    { hour: "13:00", intensity: 0.6 },
    { hour: "14:00", intensity: 0.8 },
    { hour: "15:00", intensity: 0.9 },
    { hour: "16:00", intensity: 0.8 },
    { hour: "17:00", intensity: 0.6 },
    { hour: "18:00", intensity: 0.4 },
  ];

  // Mock data cho danh sách lịch sắp tới
  const upcomingAppointments = [
    {
      id: 1,
      customerName: "Nguyễn Thị A",
      service: "Massage thư giãn",
      staff: "Nguyễn Văn B",
      time: "09:00",
      status: "confirmed",
      hasConflict: false,
    },
    {
      id: 2,
      customerName: "Trần Văn C",
      service: "Facial chăm sóc da",
      staff: "Lê Thị D",
      time: "10:30",
      status: "pending",
      hasConflict: true,
    },
    {
      id: 3,
      customerName: "Phạm Thị E",
      service: "Cắt tóc & tạo kiểu",
      staff: "Hoàng Văn F",
      time: "14:00",
      status: "confirmed",
      hasConflict: false,
    },
  ];

  return {
    kpi: kpiData,
    revenueChart,
    topServices,
    peakHours,
    upcomingAppointments,
  };
};
