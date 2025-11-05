# BookingSuccess Component

Trang xác nhận đặt lịch thành công với đầy đủ thông tin và các tính năng hỗ trợ.

## Cấu trúc thư mục

```
BookingSuccess/
├── BookingSuccess.jsx          # Component chính
├── components/                 # Các component con
│   ├── SuccessHeader.jsx      # Header với mã đặt lịch
│   ├── BookingSummary.jsx     # Tóm tắt thông tin đặt lịch
│   ├── NextSteps.jsx          # Hướng dẫn bước tiếp theo
│   ├── ContactInfo.jsx        # Thông tin liên hệ spa
│   ├── RelatedServices.jsx    # Gợi ý dịch vụ liên quan
│   ├── ActionButtons.jsx      # Các nút hành động
│   └── index.js               # Export các component
└── README.md                  # Tài liệu này
```

## Các component con

### SuccessHeader
- Hiển thị icon thành công
- Thông báo đặt lịch thành công
- Mã đặt lịch (booking ID)

### BookingSummary
- Thông tin dịch vụ đã đặt
- Chi tiết nhân viên, ngày giờ
- Dịch vụ bổ sung (nếu có)
- Tổng phí

### NextSteps
- Hướng dẫn 3 bước tiếp theo
- Xác nhận qua SMS/Email
- Đến spa đúng giờ
- Thanh toán tại spa

### ContactInfo
- Địa chỉ spa
- Hotline
- Email
- Giờ mở cửa

### RelatedServices
- Hiển thị 3 dịch vụ liên quan
- Loại trừ dịch vụ hiện tại
- Nút "Xem tất cả dịch vụ"

### ActionButtons
- Nút chính: "Về trang chủ", "Đặt lịch thêm"
- Nút phụ: "Thêm vào lịch", "Chia sẻ", "Xem lịch của tôi"
- Thông báo chia sẻ thành công

## Tính năng

### Mã đặt lịch
- Tự động tạo mã đặt lịch duy nhất
- Format: `SPA` + 8 số cuối timestamp

### Chia sẻ
- Copy link vào clipboard
- Fallback cho trình duyệt cũ
- Thông báo thành công

### Thêm vào lịch
- Mock function (UI-only)
- Có thể tích hợp với calendar API

### Dịch vụ liên quan
- Lọc bỏ dịch vụ hiện tại
- Hiển thị tối đa 3 dịch vụ
- Click để xem chi tiết

## Props

### BookingSuccess
- Không có props, sử dụng `useLocation` để lấy `bookingData`

### Các component con
- `bookingId`: Mã đặt lịch
- `bookingData`: Dữ liệu đặt lịch từ location state

## Sử dụng

```jsx
import BookingSuccess from "./components/BookingSuccess/BookingSuccess";

// Trong router
<Route path="/booking/success" element={<BookingSuccess />} />

// Navigate với data
navigate("/booking/success", { 
  state: { bookingData: bookingData } 
});
```

## Dependencies

- `react-router-dom`: Navigation
- `../layout/PublicLayout`: Layout chung
- `../ui/*`: UI components
- `../ServicesList/data/servicesData`: Mock data dịch vụ
