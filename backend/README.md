# 🚀 Backend API Documentation

## 📁 Cấu trúc dự án

```
backend/
├── controllers/           # Controllers xử lý logic
│   └── admin/            # Admin controllers
├── seeders/              # Mock data và seeders
├── routes/               # API routes
│   └── admin/            # Admin routes
├── middleware/           # Middleware functions
├── models/               # Database models
├── services/             # Business logic services
├── utils/                # Utility functions
├── config/               # Configuration files
└── server.js             # Main server file
```

## 🔧 Admin API Endpoints

### **Dashboard**

- `GET /api/admin/dashboard` - Lấy dữ liệu dashboard

### **Services Management**

- `GET /api/admin/services` - Lấy danh sách dịch vụ
- `GET /api/admin/services/:id` - Lấy chi tiết dịch vụ
- `POST /api/admin/services` - Tạo dịch vụ mới
- `PUT /api/admin/services/:id` - Cập nhật dịch vụ
- `DELETE /api/admin/services/:id` - Xóa dịch vụ
- `PATCH /api/admin/services/:id/toggle` - Bật/tắt dịch vụ
- `PUT /api/admin/services/reorder` - Sắp xếp thứ tự dịch vụ

### **Staff Management**

- `GET /api/admin/staff` - Lấy danh sách nhân viên
- `GET /api/admin/staff/:id` - Lấy chi tiết nhân viên
- `POST /api/admin/staff` - Tạo nhân viên mới
- `PUT /api/admin/staff/:id` - Cập nhật nhân viên
- `DELETE /api/admin/staff/:id` - Xóa nhân viên
- `PATCH /api/admin/staff/:id/toggle` - Bật/tắt nhân viên
- `GET /api/admin/staff/:id/stats` - Lấy thống kê nhân viên

### **Customers Management**

- `GET /api/admin/customers` - Lấy danh sách khách hàng
- `GET /api/admin/customers/:id` - Lấy chi tiết khách hàng
- `POST /api/admin/customers` - Tạo khách hàng mới
- `PUT /api/admin/customers/:id` - Cập nhật khách hàng
- `DELETE /api/admin/customers/:id` - Xóa khách hàng
- `PATCH /api/admin/customers/:id/tags` - Cập nhật tags
- `PATCH /api/admin/customers/:id/notes` - Cập nhật ghi chú

### **Notifications Management**

- `GET /api/admin/notifications/templates` - Lấy danh sách mẫu thông báo
- `GET /api/admin/notifications/templates/:id` - Lấy chi tiết mẫu thông báo
- `POST /api/admin/notifications/templates` - Tạo mẫu thông báo mới
- `PUT /api/admin/notifications/templates/:id` - Cập nhật mẫu thông báo
- `DELETE /api/admin/notifications/templates/:id` - Xóa mẫu thông báo
- `PATCH /api/admin/notifications/templates/:id/toggle` - Bật/tắt mẫu thông báo
- `GET /api/admin/notifications/logs` - Lấy nhật ký gửi thông báo
- `POST /api/admin/notifications/send` - Gửi thông báo thử nghiệm

### **Appointments Management**

- `GET /api/admin/appointments` - Lấy danh sách lịch hẹn
- `GET /api/admin/appointments/calendar` - Lấy dữ liệu calendar
- `GET /api/admin/appointments/:id` - Lấy chi tiết lịch hẹn
- `POST /api/admin/appointments` - Tạo lịch hẹn mới
- `PUT /api/admin/appointments/:id` - Cập nhật lịch hẹn
- `DELETE /api/admin/appointments/:id` - Xóa lịch hẹn
- `PATCH /api/admin/appointments/:id/status` - Cập nhật trạng thái lịch hẹn
- `PATCH /api/admin/appointments/:id/reschedule` - Đổi lịch hẹn
- `PATCH /api/admin/appointments/:id/assign-staff` - Gán nhân viên

## 📊 Query Parameters

### **Pagination**

- `page` - Trang hiện tại (default: 1)
- `limit` - Số item per page (default: 10)

### **Filtering**

- `search` - Tìm kiếm theo tên
- `status` - Lọc theo trạng thái
- `category` - Lọc theo danh mục (services)
- `role` - Lọc theo vai trò (staff)
- `level` - Lọc theo cấp độ (customers)
- `type` - Lọc theo loại (notifications)
- `channel` - Lọc theo kênh (notifications)

### **Date Range**

- `startDate` - Ngày bắt đầu
- `endDate` - Ngày kết thúc

### **Sorting**

- `sortBy` - Sắp xếp theo field
- `sortOrder` - Thứ tự (asc/desc)

## 🎯 Response Format

### **Success Response**

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10
  }
}
```

### **Error Response**

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error message"
}
```

## 🚀 Getting Started

### **Installation**

```bash
npm install
```

### **Development**

```bash
npm run dev
```

### **Production**

```bash
npm start
```

## 📝 Features

- ✅ **ES6 Modules** - Sử dụng import/export
- ✅ **Controller Pattern** - Tách logic xử lý
- ✅ **Seeder Pattern** - Mock data có tổ chức
- ✅ **RESTful API** - Tuân thủ chuẩn REST
- ✅ **Error Handling** - Xử lý lỗi toàn diện
- ✅ **Validation** - Validate input data
- ✅ **Pagination** - Phân trang cho tất cả list
- ✅ **Filtering** - Lọc dữ liệu linh hoạt
- ✅ **Sorting** - Sắp xếp dữ liệu

## 🔧 Technical Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **ES6 Modules** - Module system
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Parse cookies
- **MongoDB** - Database (for auth)

## 📋 TODO

- [ ] Thêm authentication middleware
- [ ] Thêm database integration
- [ ] Thêm validation middleware
- [ ] Thêm logging system
- [ ] Thêm rate limiting
- [ ] Thêm API documentation (Swagger)
- [ ] Thêm unit tests
- [ ] Thêm integration tests

---

**Developed with ❤️ by Do Kim Ngoc Anh**
