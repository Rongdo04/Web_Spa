# MyBookings Component

## Tổng quan

Component MyBookings cho phép người dùng xem và quản lý các lịch đặt spa của họ.

## Cấu trúc thư mục

```
MyBookings/
├── MyBookings.jsx              # Component chính
├── components/                 # Các component con
│   ├── BookingTabs.jsx        # Tabs: Sắp diễn ra, Đã hoàn thành, Đã hủy
│   ├── BookingFilters.jsx     # Filter theo tháng và export
│   ├── BookingCard.jsx        # Card hiển thị thông tin đặt lịch
│   ├── BookingActions.jsx     # Các hành động: đổi giờ, hủy, đánh giá
│   ├── BookingList.jsx        # Danh sách các booking cards
│   └── index.js               # Export các component
├── data/
│   └── bookingsData.js        # Mock data cho bookings
└── README.md                  # Tài liệu này
```

## Các tính năng chính

### 1. BookingTabs

- **Sắp diễn ra**: Hiển thị các lịch đặt đã xác nhận và đang chờ
- **Đã hoàn thành**: Hiển thị các lịch đặt đã hoàn thành
- **Đã hủy**: Hiển thị các lịch đặt đã bị hủy
- Hiển thị số lượng booking cho mỗi tab

### 2. BookingFilters

- Filter theo tháng (1-12)
- Nút export Excel (UI-only)
- Responsive design

### 3. BookingCard

- Hiển thị thông tin chi tiết: mã đặt lịch, dịch vụ, nhân viên, thời gian, tổng tiền
- Badge trạng thái với màu sắc phù hợp
- Nút "Chi tiết" và các hành động khác

### 4. BookingActions

- **Sắp diễn ra**: Đổi giờ, Hủy
- **Đã hoàn thành**: Đánh giá
- **Đã hủy**: Đặt lại
- Modal xác nhận cho mỗi hành động

### 5. BookingList

- Hiển thị danh sách các booking cards
- Empty state cho từng tab
- Responsive grid layout

## Trạng thái booking

- `pending`: Chờ xác nhận (màu vàng)
- `confirmed`: Đã xác nhận (màu xanh dương)
- `completed`: Hoàn thành (màu xanh lá)
- `cancelled`: Đã hủy (màu đỏ)

## Mock Data

File `bookingsData.js` chứa dữ liệu mẫu với 8 booking records bao gồm:

- Thông tin dịch vụ
- Nhân viên phụ trách
- Thời gian đặt lịch
- Trạng thái
- Giá tiền

## Sử dụng

```jsx
import MyBookings from "./components/MyBookings/MyBookings";

// Trong App.jsx
<Route path="/my-bookings" element={<MyBookings />} />;
```

## Responsive Design

- Mobile-first approach
- Grid layout tự động điều chỉnh
- Buttons stack trên mobile
- Modal responsive

## Accessibility

- Keyboard navigation
- ARIA labels
- Focus management
- Screen reader friendly
