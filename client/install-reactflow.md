# Hướng dẫn cài đặt React Flow

## Cài đặt dependency

```bash
cd client
npm install reactflow
```

## Hoặc sử dụng yarn

```bash
cd client
yarn add reactflow
```

## Kiểm tra cài đặt

Sau khi cài đặt, bạn có thể truy cập MongoDB Schema Diagram tại:

- **Public route**: `http://localhost:3000/database-schema`
- **Admin route**: `http://localhost:3000/admin/database-schema`

## Tính năng của MongoDB Schema Diagram

### 🎯 **8 Collections được hiển thị:**

1. **USER** - Quản lý người dùng và khách hàng
2. **STAFF** - Quản lý nhân viên spa
3. **CATEGORY** - Danh mục dịch vụ (hierarchical)
4. **SERVICE** - Dịch vụ spa với add-ons và combo
5. **APPOINTMENT** - Lịch hẹn với thanh toán và đánh giá
6. **NOTIFICATION_TEMPLATE** - Mẫu thông báo
7. **NOTIFICATION_LOG** - Lịch sử gửi thông báo
8. **CONTACT** - Thông tin liên hệ doanh nghiệp

### 🎨 **Tính năng tương tác:**

- **Zoom & Pan**: Phóng to/thu nhỏ và di chuyển
- **MiniMap**: Bản đồ thu nhỏ để điều hướng
- **Controls**: Nút điều khiển zoom, fit view
- **Background**: Lưới nền để dễ nhìn
- **Responsive**: Tự động điều chỉnh kích thước

### 🔗 **Mối quan hệ được hiển thị:**

- **Primary Keys** (đỏ): \_id fields
- **Foreign Keys** (xanh dương): Liên kết giữa collections
- **Unique Keys** (xanh lá): Email, phone, appointmentNumber
- **Regular Fields** (xám): Các trường thông thường

### 🎯 **Cách sử dụng:**

1. **Di chuyển**: Kéo thả các node
2. **Zoom**: Sử dụng scroll chuột hoặc nút +/-
3. **Fit View**: Nhấn nút "Fit View" để xem toàn bộ
4. **MiniMap**: Sử dụng bản đồ thu nhỏ để điều hướng nhanh

## Lưu ý

- Component sử dụng Tailwind CSS cho styling
- Tương thích với React 18+
- Responsive design cho mobile và desktop
- Tối ưu hiệu suất với useMemo và useCallback
