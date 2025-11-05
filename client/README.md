# 📱 Client Application Documentation

## 🎯 Tổng quan

Ứng dụng client là giao diện người dùng cho hệ thống quản lý spa/beauty salon, được xây dựng bằng React.js với các tính năng đặt lịch, quản lý dịch vụ, và quản trị hệ thống.

## 🏗️ Cấu trúc dự án

```
client/
├── src/
│   ├── components/           # Components chính
│   │   ├── admin/           # Admin components
│   │   ├── BookingFlow/     # Quy trình đặt lịch
│   │   ├── ServicesList/    # Danh sách dịch vụ
│   │   ├── homepage/        # Trang chủ
│   │   ├── About/           # Trang giới thiệu
│   │   ├── FAQ/             # Câu hỏi thường gặp
│   │   ├── layout/          # Layout components
│   │   └── ui/              # UI components chung
│   ├── App.jsx              # Root component
│   └── index.js             # Entry point
```

## 🚀 Tính năng chính

### 1. 🏠 Trang chủ (Homepage)

#### **Hero Section**

- **Tiêu đề chính**: "Chào mừng đến với Spa Beauty"
- **Mô tả**: Giới thiệu dịch vụ chuyên nghiệp
- **CTA Button**: "Đặt lịch ngay" → Chuyển đến BookingFlow
- **Background**: Gradient đẹp mắt với animation

#### **Dịch vụ nổi bật**

- **Hiển thị**: 6 dịch vụ phổ biến nhất
- **Thông tin**: Tên, giá, thời lượng, mô tả
- **Action**: "Xem chi tiết" và "Đặt ngay"
- **Layout**: Grid responsive (3 cột desktop, 1 cột mobile)

#### **Tại sao chọn chúng tôi**

- **4 lý do chính**: Chuyên nghiệp, Chất lượng, Tiện lợi, Giá cả
- **Icons**: Ant Design icons
- **Layout**: Card layout với hover effects

#### **Thống kê**

- **Số liệu**: 1000+ khách hàng, 50+ dịch vụ, 5+ năm kinh nghiệm
- **Animation**: Counter animation khi scroll
- **Design**: Gradient background

### 2. 📅 Quy trình đặt lịch (BookingFlow)

#### **Step 1: Chọn dịch vụ (ServiceSelection)**

- **Danh sách dịch vụ**: Hiển thị tất cả dịch vụ có sẵn
- **Thông tin**: Tên, giá, thời lượng, mô tả
- **Add-ons**: Dịch vụ bổ sung (massage, facial, etc.)
- **Combo**: Gói dịch vụ combo với giá ưu đãi
- **Validation**: Bắt buộc chọn ít nhất 1 dịch vụ

#### **Step 2: Chọn ngày giờ (TimeSelection)**

- **DatePicker**: Chọn ngày với calendar
- **Time slots**: Khung giờ có sẵn (9:00-18:00)
- **Availability**: Kiểm tra lịch trống
- **Validation**: Không chọn ngày quá khứ
- **Mock data**: Tự động tạo availability cho ngày được chọn

#### **Step 3: Thông tin khách hàng (CustomerInfo)**

- **Form fields**: Họ tên, SĐT, Email, Ghi chú
- **Validation**: Required fields, email format
- **Auto-fill**: Lưu thông tin vào localStorage
- **Error handling**: Hiển thị lỗi validation

#### **Step 4: Xác nhận (Confirmation)**

- **Tóm tắt**: Dịch vụ, ngày giờ, thông tin khách
- **Tổng tiền**: Tính toán giá dịch vụ + add-ons
- **Actions**: "Chỉnh sửa", "Xác nhận đặt lịch"
- **Success**: Hiển thị thông báo thành công

### 3. 🛍️ Danh sách dịch vụ (ServicesList)

#### **ServiceCard Component**

- **Thông tin**: Tên, giá, thời lượng, mô tả
- **Actions**: "Xem chi tiết", "Đặt ngay"
- **Design**: Card layout với hover effects
- **Responsive**: Mobile-friendly

#### **Filtering & Sorting**

- **Theo danh mục**: Tóc, Chăm sóc da, Móng tay, Massage, Spa
- **Theo giá**: Tăng dần, giảm dần
- **Theo thời lượng**: Ngắn nhất, dài nhất
- **Search**: Tìm kiếm theo tên dịch vụ

### 4. ℹ️ Trang giới thiệu (About)

#### **Giới thiệu công ty**

- **Lịch sử**: 5+ năm kinh nghiệm
- **Tầm nhìn**: Trở thành spa hàng đầu
- **Sứ mệnh**: Mang đến vẻ đẹp tự nhiên

#### **Đội ngũ nhân viên**

- **Thông tin**: Tên, chức vụ, kinh nghiệm
- **Skills**: Chuyên môn, chứng chỉ
- **Photos**: Ảnh chuyên nghiệp

#### **Cơ sở vật chất**

- **Phòng massage**: Thiết bị hiện đại
- **Phòng facial**: Công nghệ cao
- **Khu vực chờ**: Không gian thoải mái

### 5. ❓ FAQ (Frequently Asked Questions)

#### **Danh mục câu hỏi**

- **Đặt lịch**: Cách đặt, hủy lịch, đổi lịch
- **Dịch vụ**: Loại dịch vụ, thời gian, giá cả
- **Thanh toán**: Phương thức, ưu đãi
- **Chính sách**: Hoàn tiền, bảo hành

#### **Accordion UI**

- **Click to expand**: Mở/đóng câu trả lời
- **Smooth animation**: Transition mượt mà
- **Search**: Tìm kiếm câu hỏi

## 🔧 Admin Panel

### 1. 📊 Dashboard (AdminDashboard)

#### **KPI Cards**

- **Lịch hôm nay**: Số lịch hẹn trong ngày
- **Doanh thu hôm nay/tuần**: Tổng doanh thu
- **Tỷ lệ hủy**: Phần trăm lịch bị hủy
- **CSAT**: Điểm hài lòng khách hàng

#### **Charts**

- **Doanh thu theo ngày**: Line chart 7 ngày gần nhất
- **Top dịch vụ**: Bar chart dịch vụ bán chạy
- **Khung giờ cao điểm**: Heatmap UI (mock)

#### **Danh sách lịch sắp tới**

- **Table**: Thông tin lịch hẹn
- **Actions**: Xem, chỉnh sửa, hủy
- **Cảnh báo**: Lịch trùng, xung đột

### 2. 📅 Quản lý lịch hẹn (AdminAppointments)

#### **Calendar View**

- **Day/Week/Month**: 3 chế độ xem
- **Navigation**: Chuyển ngày, tuần, tháng
- **Events**: Hiển thị lịch hẹn trên calendar
- **Click**: Tạo lịch mới hoặc xem chi tiết

#### **List View**

- **Table**: Danh sách lịch hẹn
- **Pagination**: Phân trang
- **Sorting**: Sắp xếp theo ngày, khách hàng
- **Actions**: Quick actions (xác nhận, hủy, đổi giờ)

#### **Filters**

- **Trạng thái**: Pending, Confirmed, Completed, Cancelled
- **Dịch vụ**: Lọc theo loại dịch vụ
- **Nhân viên**: Lọc theo nhân viên phụ trách
- **Chi nhánh**: Lọc theo chi nhánh

#### **Appointment Form**

- **Tạo mới/Chỉnh sửa**: Modal form
- **Fields**: Dịch vụ, khách hàng, nhân viên, ngày/giờ, ghi chú
- **Conflict checking**: Kiểm tra xung đột lịch (UI-only)
- **Validation**: Form validation

#### **Quick Actions**

- **Xác nhận**: Chuyển trạng thái pending → confirmed
- **Đổi giờ**: Reschedule appointment
- **Gán nhân viên**: Assign staff
- **Hủy**: Cancel appointment

### 3. 🛠️ Quản lý dịch vụ (AdminServices)

#### **Services List**

- **Table**: Danh sách dịch vụ với pagination
- **Columns**: Tên, danh mục, giá, thời lượng, trạng thái
- **Actions**: Xem, chỉnh sửa, xóa, bật/tắt
- **Search**: Tìm kiếm theo tên
- **Filter**: Lọc theo danh mục, trạng thái

#### **Service Form**

- **Fields**: Tên, danh mục, thời lượng, giá, mô tả
- **Add-ons**: Dịch vụ bổ sung
- **Combo**: Gói dịch vụ combo
- **Display order**: Thứ tự hiển thị
- **Active status**: Bật/tắt dịch vụ

#### **Service Details**

- **Thông tin chi tiết**: Tất cả thông tin dịch vụ
- **Add-ons list**: Danh sách dịch vụ bổ sung
- **Combo packages**: Gói combo
- **Quick actions**: Chỉnh sửa, xóa, bật/tắt

#### **Drag & Drop Reordering**

- **Up/Down buttons**: Sắp xếp thứ tự hiển thị
- **Visual feedback**: Animation khi di chuyển
- **Auto-save**: Tự động lưu thứ tự mới

### 4. 👥 Quản lý nhân viên (AdminStaff)

#### **Staff List**

- **Table**: Danh sách nhân viên
- **Columns**: Tên, vai trò, kỹ năng, ca làm việc, trạng thái
- **Actions**: Xem, chỉnh sửa, xóa
- **Search**: Tìm kiếm theo tên
- **Filter**: Lọc theo vai trò, trạng thái

#### **Staff Form**

- **Basic info**: Tên, ảnh, vai trò
- **Skills**: Dịch vụ đảm nhiệm (multi-select)
- **Work schedule**: Ca làm việc
- **Days off**: Ngày nghỉ
- **Revenue share**: Mức chia doanh thu (UI-only)

#### **Staff Statistics**

- **Appointments/month**: Số lịch/tháng
- **Average rating**: Điểm đánh giá trung bình
- **No-show rate**: Tỷ lệ khách không đến
- **Revenue**: Doanh thu cá nhân

### 5. 👤 Quản lý khách hàng (AdminCustomers)

#### **Customers List**

- **Table**: Danh sách khách hàng
- **Columns**: Tên, SĐT, email, tổng chi tiêu, số lịch, lần đặt gần nhất
- **Customer levels**: VIP, Premium, Loyal, Thường
- **Tags**: Phân loại khách hàng
- **Points**: Điểm thưởng (UI-only)
- **Actions**: Xem profile, chỉnh sửa, xóa

#### **Customer Profile**

- **Basic info**: Thông tin cơ bản
- **Statistics**: Tổng chi tiêu, số lịch, điểm thưởng
- **Appointment history**: Lịch sử đặt lịch
- **Notes**: Ghi chú có thể chỉnh sửa
- **Tags**: Quản lý tags phân loại

#### **Customer Form**

- **Fields**: Họ tên, SĐT, email, ghi chú
- **Validation**: Client-side validation
- **Preview**: Xem trước thông tin

### 6. 🔔 Quản lý thông báo (AdminNotifications)

#### **Notification Templates**

- **List**: Danh sách mẫu thông báo
- **Types**: Xác nhận lịch, nhắc lịch, thay đổi lịch, cảm ơn sau dịch vụ
- **Channels**: SMS, Email
- **Status**: Bật/tắt từng template
- **Actions**: Chỉnh sửa, xóa

#### **Template Editor**

- **Fields**: Tên, loại, trigger, subject, content
- **Placeholders**: {{customer_name}}, {{service_name}}, {{start_time}}
- **Content editor**: Textarea với placeholder insertion
- **Preview**: Xem trước nội dung
- **Channels**: Chọn kênh gửi (SMS/Email)

#### **Notification Logs**

- **Table**: Nhật ký gửi thông báo
- **Columns**: Template, khách hàng, kênh, trạng thái, thời gian
- **Status**: Thành công, thất bại, đang gửi
- **Preview**: Xem nội dung đã gửi
- **Summary**: Thống kê gửi thông báo

## 🎨 UI Components

### **Generic Components**

- **Button**: Primary, secondary, outline, ghost variants
- **Input**: Text, email, password, number inputs
- **Select**: Dropdown selection
- **Textarea**: Multi-line text input
- **Modal**: Popup modal với scroll
- **Card**: Content container
- **Badge**: Status indicators
- **DatePicker**: Date selection
- **Checkbox**: Boolean input
- **Switch/Toggle**: Toggle switch
- **Sheet**: Sidebar/drawer
- **Dropdown**: Dropdown menu

### **Layout Components**

- **Header**: Navigation header
- **Footer**: Page footer
- **Sidebar**: Admin sidebar với collapse
- **Container**: Content wrapper
- **Grid**: Responsive grid system


## 📱 Responsive Design

### **Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Mobile Features**

- **Touch-friendly**: Buttons và inputs lớn
- **Swipe gestures**: Navigation
- **Collapsible sidebar**: Admin panel
- **Stack layout**: Mobile-first design

## 🎯 State Management

### **Local State**

- **useState**: Component state
- **useEffect**: Side effects
- **useCallback**: Memoized callbacks

### **Mock Data**

- **Services**: Dịch vụ mẫu
- **Staff**: Nhân viên mẫu
- **Customers**: Khách hàng mẫu
- **Appointments**: Lịch hẹn mẫu
- **Notifications**: Thông báo mẫu

## 🚀 Performance

### **Optimizations**

- **Code splitting**: Lazy loading components
- **Memoization**: useCallback, useMemo
- **Image optimization**: Lazy loading
- **Bundle optimization**: Tree shaking

### **Loading States**

- **Skeleton loading**: Placeholder content
- **Spinner**: Loading indicators
- **Progressive loading**: Staged content loading

## 🧪 Testing

### **Component Testing**

- **Unit tests**: Individual component testing
- **Integration tests**: Component interaction
- **E2E tests**: Full user flow testing

## 📦 Dependencies

### **Core**

- **React**: 18.x
- **React Router**: 6.x
- **Ant Design Icons**: Icon library

### **Styling**

- **Tailwind CSS**: Utility-first CSS
- **Custom CSS**: Component-specific styles

### **Development**

- **Vite**: Build tool
- **ESLint**: Code linting
- **Prettier**: Code formatting





