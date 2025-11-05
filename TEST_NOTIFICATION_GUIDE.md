# Hướng dẫn Test Hệ thống Thông báo

## 🎯 Trigger đã được implement

### 1. `appointment_created` - Tạo lịch hẹn mới

- **Khi nào**: Khi admin tạo lịch hẹn thành công
- **Vị trí**: `createAppointment` function
- **Test**: Tạo lịch hẹn mới qua admin panel

### 2. `appointment_cancelled` - Hủy lịch hẹn

- **Khi nào**: Khi admin thay đổi trạng thái lịch hẹn thành "cancelled"
- **Vị trí**: `updateAppointment` function
- **Test**: Cập nhật lịch hẹn và đổi status thành "cancelled"

### 3. `appointment_completed` - Hoàn thành dịch vụ

- **Khi nào**: Khi admin thay đổi trạng thái lịch hẹn thành "completed"
- **Vị trí**: `updateAppointment` function
- **Test**: Cập nhật lịch hẹn và đổi status thành "completed"

### 4. `appointment_rescheduled` - Thay đổi lịch hẹn

- **Khi nào**: Khi admin thay đổi trạng thái lịch hẹn thành "confirmed"
- **Vị trí**: `updateAppointment` function
- **Test**: Cập nhật lịch hẹn và đổi status thành "confirmed"

## 🧪 Cách Test

### Bước 1: Kiểm tra Template trong Database

```sql
-- Kiểm tra có template cho appointment_created chưa
db.notificationtemplates.find({trigger: "appointment_created", isActive: true})

-- Kiểm tra tất cả template
db.notificationtemplates.find({isActive: true})
```

### Bước 2: Test qua Admin Panel

#### Test Tạo Lịch Hẹn (appointment_created)

1. Vào Admin Panel → Quản lý lịch hẹn
2. Click "Tạo lịch hẹn mới"
3. Điền đầy đủ thông tin:
   - Tên khách hàng: `Nguyễn Văn Test`
   - Số điện thoại: `0123456789`
   - Email: `test@example.com`
   - Chọn dịch vụ
   - Chọn nhân viên
   - Chọn ngày giờ
4. Click "Tạo lịch hẹn"
5. **Kiểm tra console log** để xem:
   ```
   🔔 Sending appointment_created notification...
   ✅ Notification sent successfully
   ```

#### Test Thay đổi Trạng thái (các trigger khác)

1. Vào danh sách lịch hẹn
2. Click "Chỉnh sửa" lịch hẹn vừa tạo
3. Thay đổi trạng thái:
   - `cancelled` → Trigger `appointment_cancelled`
   - `completed` → Trigger `appointment_completed`
   - `confirmed` → Trigger `appointment_rescheduled`
4. Click "Cập nhật"
5. **Kiểm tra console log** để xem notification

### Bước 3: Kiểm tra Logs

1. Vào Admin Panel → Quản lý thông báo → Logs
2. Xem danh sách thông báo đã gửi
3. Kiểm tra:
   - Status: `sent` hoặc `failed`
   - Channel: `email` hoặc `sms`
   - Nội dung thông báo

### Bước 4: Test Script (Tùy chọn)

```bash
cd backend
node test-notification-trigger.js
```

## 🔍 Debug và Troubleshooting

### Kiểm tra Console Logs

Khi tạo/cập nhật lịch hẹn, xem console có log:

```
🔔 Sending appointment_created notification...
📧 Using template: [Tên template]
📧 Sending email to: test@example.com
✅ Notification sent successfully
```

### Kiểm tra Database

```sql
-- Xem logs thông báo
db.notificationlogs.find().sort({createdAt: -1}).limit(10)

-- Xem template
db.notificationtemplates.find({trigger: "appointment_created"})
```

### Lỗi thường gặp

1. **Không có template**: Tạo template với trigger `appointment_created`
2. **Email service lỗi**: Kiểm tra cấu hình email service
3. **SMS service lỗi**: Kiểm tra cấu hình SMS service
4. **Template không active**: Bật template trong admin panel

## 📧 Kiểm tra Email

- Kiểm tra inbox của email test
- Kiểm tra spam folder
- Xem email có đúng nội dung template không

## 📱 Kiểm tra SMS

- Kiểm tra điện thoại có nhận SMS không
- Xem nội dung SMS có đúng template không

## 🎉 Kết quả mong đợi

- Khi tạo lịch hẹn → Nhận email/SMS xác nhận
- Khi hủy lịch hẹn → Nhận email/SMS thông báo hủy
- Khi hoàn thành → Nhận email/SMS cảm ơn
- Tất cả đều được ghi log trong database
