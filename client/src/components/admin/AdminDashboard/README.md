# AdminDashboard Component

## Cấu trúc thư mục

```
AdminDashboard/
├── AdminDashboard.jsx          # Component chính
├── components/                 # Các component con
│   ├── KPICards.jsx           # KPI cards (lịch hôm nay, doanh thu, tỷ lệ hủy, CSAT)
│   ├── RevenueChart.jsx       # Biểu đồ doanh thu theo ngày
│   ├── TopServicesChart.jsx   # Biểu đồ top dịch vụ
│   ├── PeakHoursHeatmap.jsx   # Heatmap khung giờ cao điểm
│   ├── UpcomingBookings.jsx   # Danh sách lịch sắp tới và cảnh báo trùng lịch
│   └── index.js               # Export tất cả components
├── index.js                   # Export AdminDashboard
└── README.md                  # Tài liệu này
```

## Tính năng chính

### 1. KPI Cards

- **Lịch hôm nay**: Số lượng cuộc hẹn trong ngày
- **Doanh thu hôm nay**: Tổng doanh thu trong ngày
- **Doanh thu tuần**: Tổng doanh thu trong tuần
- **Tỷ lệ hủy**: Phần trăm lịch hẹn bị hủy
- **CSAT**: Điểm đánh giá khách hàng

### 2. Biểu đồ

- **Doanh thu theo ngày**: Biểu đồ cột hiển thị doanh thu 7 ngày gần nhất
- **Top dịch vụ**: Biểu đồ thanh ngang hiển thị dịch vụ được đặt nhiều nhất
- **Khung giờ cao điểm**: Heatmap 7x12 hiển thị mật độ đặt lịch theo giờ và ngày

### 3. Danh sách lịch sắp tới

- Hiển thị danh sách lịch hẹn sắp tới
- Lọc theo: tất cả, hôm nay, ngày mai, tuần này
- Cảnh báo xung đột lịch hẹn
- Thao tác: xem, sửa, giải quyết xung đột

## Cách sử dụng

```jsx
import { AdminDashboard } from "../components/admin";

function App() {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
```

## Props

AdminDashboard không nhận props, dữ liệu được load từ API hoặc mock data.

## Dependencies

- React
- Tailwind CSS
- UI Components (Card, Button)
- AuthContext

## Mock Data

Component sử dụng mock data để demo. Trong production, cần thay thế bằng API calls thực tế.

## Responsive Design

- Mobile: 1 cột
- Tablet: 2 cột
- Desktop: 3-5 cột tùy component
