# Tính năng Chọn Khách hàng trong Form Tạo Lịch hẹn

## 🎯 Mô tả tính năng

Đã thêm tính năng chọn khách hàng có sẵn trong form tạo lịch hẹn mới, giúp admin có thể:

- Chọn khách hàng từ danh sách có sẵn
- Tự động điền thông tin khách hàng (tên, SĐT, email)
- Chỉ cần chọn dịch vụ, nhân viên, ngày giờ
- Hoặc để trống để nhập thông tin khách hàng mới

## ✨ Các tính năng đã thêm

### 1. Dropdown chọn khách hàng

- Hiển thị danh sách khách hàng dạng: "Tên - SĐT"
- Option đầu tiên: "Chọn khách hàng hoặc để trống"
- Loading state khi tải danh sách

### 2. Tự động điền thông tin

- Khi chọn khách hàng → Tự động điền tên, SĐT, email
- Các field thông tin khách hàng bị disable khi đã chọn
- Có thể xóa lựa chọn để nhập thông tin mới

### 3. UI/UX cải thiện

- Section riêng biệt với background xanh nhạt
- Hướng dẫn rõ ràng cho người dùng
- Nút "Xóa lựa chọn khách hàng" khi đã chọn

## 🔧 Cách hoạt động

### Luồng sử dụng:

1. **Mở form tạo lịch hẹn**
2. **Chọn khách hàng** (tùy chọn):
   - Click dropdown "Khách hàng có sẵn"
   - Chọn khách hàng từ danh sách
   - Thông tin tự động điền vào các field
3. **Chọn dịch vụ, nhân viên, ngày giờ**
4. **Tạo lịch hẹn**

### Luồng nhập thông tin mới:

1. **Mở form tạo lịch hẹn**
2. **Để trống dropdown khách hàng**
3. **Nhập thông tin khách hàng mới**
4. **Chọn dịch vụ, nhân viên, ngày giờ**
5. **Tạo lịch hẹn**

## 📝 Code Changes

### 1. Thêm state mới:

```javascript
const [selectedCustomerId, setSelectedCustomerId] = useState("");
const [customers, setCustomers] = useState([]);
const [loadingCustomers, setLoadingCustomers] = useState(false);
```

### 2. Thêm function loadCustomers:

```javascript
const loadCustomers = async () => {
  // Load danh sách khách hàng từ API
  // Format: { value: id, label: "Tên - SĐT", name, phone, email }
};
```

### 3. Thêm function handleCustomerSelect:

```javascript
const handleCustomerSelect = (customerId) => {
  // Tự động điền thông tin khi chọn khách hàng
  // Clear thông tin khi bỏ chọn
};
```

### 4. Cập nhật UI:

- Thêm section chọn khách hàng với background xanh
- Disable các field thông tin khi đã chọn khách hàng
- Thêm nút xóa lựa chọn

## 🧪 Cách test

### Test Case 1: Chọn khách hàng có sẵn

1. Vào Admin Panel → Quản lý lịch hẹn
2. Click "Tạo lịch hẹn mới"
3. Chọn khách hàng từ dropdown
4. Kiểm tra thông tin tự động điền
5. Chọn dịch vụ, nhân viên, ngày giờ
6. Tạo lịch hẹn

### Test Case 2: Nhập thông tin khách hàng mới

1. Vào Admin Panel → Quản lý lịch hẹn
2. Click "Tạo lịch hẹn mới"
3. Để trống dropdown khách hàng
4. Nhập thông tin khách hàng mới
5. Chọn dịch vụ, nhân viên, ngày giờ
6. Tạo lịch hẹn

### Test Case 3: Thay đổi lựa chọn

1. Chọn khách hàng từ dropdown
2. Click "Xóa lựa chọn khách hàng"
3. Kiểm tra các field được enable lại
4. Nhập thông tin mới

## 🎨 UI Preview

```
┌─────────────────────────────────────────┐
│ Chọn khách hàng (Tùy chọn)              │
├─────────────────────────────────────────┤
│ Khách hàng có sẵn: [Dropdown ▼]        │
│ Chọn khách hàng hoặc để trống           │
│ [✕ Xóa lựa chọn khách hàng] (nếu chọn) │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Tên khách hàng * [Auto-filled] [🔒]    │
│ Số điện thoại * [Auto-filled] [🔒]     │
│ Email * [Auto-filled] [🔒]             │
└─────────────────────────────────────────┘
```

## 🔄 Tương thích

- ✅ Hoạt động với form tạo lịch hẹn mới
- ✅ Hoạt động với form chỉnh sửa lịch hẹn
- ✅ Tương thích với trigger notification
- ✅ Không ảnh hưởng đến logic hiện tại

## 🚀 Lợi ích

1. **Tiết kiệm thời gian**: Không cần nhập lại thông tin khách hàng
2. **Giảm lỗi**: Thông tin khách hàng chính xác từ database
3. **UX tốt hơn**: Workflow mượt mà cho admin
4. **Linh hoạt**: Vẫn có thể nhập thông tin khách hàng mới
5. **Tương thích**: Không ảnh hưởng đến tính năng hiện tại
