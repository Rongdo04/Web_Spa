# ReviewsSection Component

## Tổng quan

Component ReviewsSection cho phép hiển thị và quản lý đánh giá dịch vụ. Có thể được embed vào ServiceDetail và MyBookings.

## Cấu trúc thư mục

```
ReviewsSection/
├── ReviewsSection.jsx          # Component chính
├── components/                 # Các component con
│   ├── ReviewsHeader.jsx      # Header với rating tổng và biểu đồ phân bố
│   ├── ReviewsFilters.jsx     # Bộ lọc đánh giá
│   ├── ReviewCard.jsx         # Card hiển thị từng review
│   ├── ReviewsList.jsx        # Danh sách các review cards
│   ├── ReviewForm.jsx         # Form gửi review
│   └── index.js               # Export các component
├── data/
│   └── reviewsData.js         # Mock data cho reviews
└── README.md                  # Tài liệu này
```

## Các tính năng chính

### 1. ReviewsHeader

- **Rating tổng**: Hiển thị điểm đánh giá trung bình và số lượng review
- **Biểu đồ phân bố sao**: Hiển thị phân bố đánh giá từ 1-5 sao với thanh tiến trình
- **Responsive design**: Tự động điều chỉnh layout trên mobile

### 2. ReviewsFilters

- **Bộ lọc**: Mới nhất, Cao nhất, Thấp nhất, Có ảnh
- **Số lượng kết quả**: Hiển thị tổng số review sau khi lọc
- **UI buttons**: Dễ sử dụng với trạng thái active/inactive

### 3. ReviewCard

- **Thông tin user**: Avatar, tên, ngày đánh giá
- **Rating**: Hiển thị số sao và điểm số
- **Nội dung**: Comment, hình ảnh, tags
- **Verification badge**: Hiển thị review đã xác thực
- **Actions**: Nút hữu ích, phản hồi

### 4. ReviewForm

- **Rating input**: Chọn sao với hover effect
- **Comment textarea**: Nhập nhận xét chi tiết
- **Tags system**: Chọn tags có sẵn hoặc tự tạo
- **Image upload**: Upload nhiều hình ảnh
- **Validation**: Kiểm tra rating và comment bắt buộc

### 5. ReviewsList

- **Empty state**: Hiển thị khi chưa có review
- **Responsive grid**: Tự động điều chỉnh layout
- **Loading states**: Skeleton loading cho UX tốt hơn

## Props

### ReviewsSection

```jsx
<ReviewsSection
  serviceId="service001" // ID dịch vụ (optional)
  bookingId="SPA12345678" // ID booking (optional)
  showReviewForm={true} // Hiển thị form review
  onReviewSubmit={handleSubmit} // Callback khi submit review
/>
```

## Mock Data

File `reviewsData.js` chứa 10 review records với:

- Thông tin user (tên, avatar)
- Rating (1-5 sao)
- Comment và tags
- Hình ảnh (optional)
- Trạng thái xác thực
- Số lượt hữu ích
- Ngày tạo

## Sử dụng

### Trong ServiceDetail

```jsx
import ReviewsSection from "../ReviewsSection/ReviewsSection";

// Trong component
<ReviewsSection serviceId={serviceId} />;
```

### Trong MyBookings

```jsx
import { BookingReviews } from "./components";

// Trong BookingCard
<BookingReviews booking={booking} />;
```

## Tính năng nâng cao

### 1. Filtering & Sorting

- **Mới nhất**: Sắp xếp theo ngày tạo (mới nhất trước)
- **Cao nhất**: Sắp xếp theo rating (cao nhất trước)
- **Thấp nhất**: Sắp xếp theo rating (thấp nhất trước)
- **Có ảnh**: Chỉ hiển thị review có hình ảnh

### 2. Review Form Features

- **Star rating**: Interactive star selection
- **Predefined tags**: Tags có sẵn để chọn nhanh
- **Image upload**: Multiple image upload với preview
- **Form validation**: Kiểm tra dữ liệu trước khi submit

### 3. Responsive Design

- **Mobile-first**: Tối ưu cho mobile
- **Grid layout**: Tự động điều chỉnh số cột
- **Touch-friendly**: Buttons và inputs dễ sử dụng trên mobile

## Accessibility

- **Keyboard navigation**: Hỗ trợ điều hướng bằng bàn phím
- **Screen reader**: ARIA labels và descriptions
- **Focus management**: Focus visible và logical tab order
- **Color contrast**: Đảm bảo độ tương phản màu sắc

## Integration

Component được thiết kế để dễ dàng tích hợp vào các trang khác:

- **ServiceDetail**: Hiển thị reviews cho dịch vụ cụ thể
- **MyBookings**: Cho phép review sau khi hoàn thành dịch vụ
- **Standalone**: Có thể sử dụng độc lập với props phù hợp
