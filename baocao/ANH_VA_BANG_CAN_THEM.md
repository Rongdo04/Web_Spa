# DANH SÁCH ẢNH VÀ BẢNG CẦN THÊM VÀO BÁO CÁO

## CHƯƠNG 1: TỔNG QUAN

### 1.1. Bảng cần thêm

#### Bảng 1.1: So sánh phương pháp quản lý truyền thống và hiện đại

**Vị trí:** Sau phần 1.1.2 (Bối cảnh và lý do chọn đề tài)
**Nội dung:**
| Tiêu chí | Phương pháp truyền thống | Phương pháp hiện đại |
|----------|-------------------------|---------------------|
| Ghi chép lịch hẹn | Sổ sách thủ công | Hệ thống điện tử |
| Quản lý khách hàng | Thông tin rời rạc | Database tập trung |
| Thống kê doanh thu | Tính toán thủ công | Tự động hóa |
| Thông báo | Gọi điện/Email thủ công | Tự động hóa |
| Báo cáo | Lập báo cáo thủ công | Dashboard real-time |

#### Bảng 1.2: Phân tích lợi ích của hệ thống

**Vị trí:** Sau phần 1.1.3 (Ý nghĩa thực tiễn)
**Nội dung:**
| Đối tượng | Lợi ích chính | Mô tả chi tiết |
|-----------|---------------|----------------|
| Chủ cơ sở Spa | Tăng hiệu quả quản lý | Giảm 70% thời gian quản lý |
| Khách hàng | Trải nghiệm tốt hơn | Đặt lịch 24/7, nhận thông báo tự động |
| Nhân viên | Quản lý lịch rõ ràng | Theo dõi hiệu suất, giao diện thân thiện |

### 1.2. Ảnh cần thêm

#### Hình 1.1: Sơ đồ tổng quan hệ thống

**Vị trí:** Sau phần 1.5.1 (Sản phẩm chính)
**Mô tả:** Sơ đồ khối tổng quan hệ thống quản lý Spa
**Nội dung:** Hiển thị các module chính và mối quan hệ giữa chúng

---

## CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

### 2.1. Bảng cần thêm

#### Bảng 2.1: So sánh các công nghệ Backend

**Vị trí:** Sau phần 2.2.1 (Công nghệ Backend)
**Nội dung:**
| Công nghệ | Ưu điểm | Nhược điểm | Ứng dụng |
|-----------|---------|------------|----------|
| Node.js | Hiệu suất cao, JavaScript toàn stack | Single-threaded | Web applications |
| Express.js | Nhẹ, linh hoạt | Ít tính năng built-in | Web framework |
| MongoDB | Flexible schema, Scalable | Không ACID | NoSQL database |
| Mongoose | Schema validation, Middleware | Overhead | ODM cho MongoDB |

#### Bảng 2.2: So sánh các công nghệ Frontend

**Vị trí:** Sau phần 2.2.2 (Công nghệ Frontend)
**Nội dung:**
| Công nghệ | Ưu điểm | Nhược điểm | Ứng dụng |
|-----------|---------|------------|----------|
| React.js | Component-based, Virtual DOM | Learning curve | UI library |
| Vite | Fast development, ES modules | Mới, ít ecosystem | Build tool |
| Tailwind CSS | Utility-first, Responsive | Bundle size | CSS framework |
| Ant Design | Enterprise-class, Rich components | Heavy | UI component library |

#### Bảng 2.3: So sánh các phương pháp Authentication

**Vị trí:** Sau phần 2.2.3 (Công nghệ Authentication)
**Nội dung:**
| Phương pháp | Ưu điểm | Nhược điểm | Bảo mật |
|-------------|---------|------------|---------|
| JWT | Stateless, Scalable | Không revoke được | Trung bình |
| Session | Có thể revoke | Stateful | Cao |
| OAuth | Standard, Secure | Phức tạp | Rất cao |

### 2.2. Ảnh cần thêm

#### Hình 2.1: Kiến trúc Client-Server 3-tier

**Vị trí:** Sau phần 2.3.1 (Kiến trúc Client-Server)
**Mô tả:** Sơ đồ kiến trúc 3 tầng của hệ thống
**Nội dung:** Presentation Layer, Business Logic Layer, Data Layer

#### Hình 2.2: Mô hình MVC

**Vị trí:** Sau phần 2.3.2 (Kiến trúc MVC)
**Mô tả:** Sơ đồ mô hình Model-View-Controller
**Nội dung:** Luồng dữ liệu giữa Model, View và Controller

#### Hình 2.3: RESTful API Design

**Vị trí:** Sau phần 2.3.3 (RESTful API Design)
**Mô tả:** Sơ đồ thiết kế RESTful API
**Nội dung:** HTTP methods, endpoints, status codes

#### Hình 2.4: JWT Authentication Flow

**Vị trí:** Sau phần 2.6.1 (Authentication Patterns)
**Mô tả:** Luồng xác thực JWT
**Nội dung:** Login → Generate Token → Verify Token → Access Resource

---

## CHƯƠNG 3: THIẾT KẾ HỆ THỐNG

### 3.1. Bảng cần thêm

#### Bảng 3.1: Chi tiết các Model trong Database

**Vị trí:** Sau phần 3.2.1 (Thiết kế Database)
**Nội dung:**
| Model | Số fields | Relationships | Indexes |
|-------|-----------|---------------|---------|
| User | 25+ | One-to-many với Appointment | email, phone |
| Service | 15+ | Many-to-one với Category | name, category |
| Staff | 20+ | One-to-many với Appointment | employeeId, role |
| Appointment | 30+ | Many-to-one với User, Service, Staff | appointmentNumber, date |
| Category | 12+ | Self-referencing | name, slug |

#### Bảng 3.2: API Endpoints Summary

**Vị trí:** Sau phần 3.3.1 (API Endpoints)
**Nội dung:**
| Module | Endpoint | Method | Description | Auth Required |
|--------|----------|--------|-------------|---------------|
| Auth | /api/auth/login | POST | Đăng nhập | No |
| Auth | /api/auth/register | POST | Đăng ký | No |
| Admin | /api/admin/dashboard | GET | Lấy dashboard data | Yes (Admin) |
| Admin | /api/admin/services | GET/POST | CRUD services | Yes (Admin) |
| User | /api/user/bookings | GET | Lấy lịch hẹn của user | Yes (User) |
| Public | /api/public/services | GET | Lấy danh sách dịch vụ | No |

#### Bảng 3.3: Component Architecture

**Vị trí:** Sau phần 3.4.2 (Component Architecture)
**Nội dung:**
| Component Type | Số lượng | Mô tả | Reusability |
|----------------|----------|-------|-------------|
| Layout Components | 5 | Header, Footer, Sidebar | Cao |
| UI Components | 20+ | Button, Input, Modal | Rất cao |
| Feature Components | 15+ | BookingForm, ServiceCard | Trung bình |
| Page Components | 10+ | HomePage, AdminDashboard | Thấp |

### 3.2. Ảnh cần thêm

#### Hình 3.1: Sơ đồ kiến trúc tổng thể hệ thống

**Vị trí:** Sau phần 3.1.1 (Kiến trúc tổng thể)
**Mô tả:** Sơ đồ kiến trúc tổng thể của hệ thống
**Nội dung:** Client, Server, Database và các kết nối

#### Hình 3.2: Sơ đồ Database Schema

**Vị trí:** Sau phần 3.2.1 (Thiết kế Database)
**Mô tả:** ERD (Entity Relationship Diagram) của database
**Nội dung:** Các bảng và mối quan hệ giữa chúng

#### Hình 3.3: Sơ đồ API Architecture

**Vị trí:** Sau phần 3.3.1 (API Endpoints)
**Mô tả:** Sơ đồ kiến trúc API
**Nội dung:** RESTful endpoints, middleware, controllers

#### Hình 3.4: Wireframe giao diện chính

**Vị trí:** Sau phần 3.4.1 (UI/UX Design)
**Mô tả:** Wireframe của các trang chính
**Nội dung:** Homepage, Admin Dashboard, Booking Page

#### Hình 3.5: Sơ đồ luồng đặt lịch hẹn

**Vị trí:** Sau phần 3.5.1 (Business Flow Diagrams)
**Mô tả:** Luồng nghiệp vụ đặt lịch hẹn
**Nội dung:** Từ chọn dịch vụ đến xác nhận lịch hẹn

#### Hình 3.6: Use Case Diagram tổng thể

**Vị trí:** Sau phần 3.6.1 (Use Case Diagrams)
**Mô tả:** Use case diagram của toàn bộ hệ thống
**Nội dung:** Actors và các use cases chính

---

## CHƯƠNG 4: PHÂN TÍCH HỆ THỐNG

### 4.1. Bảng cần thêm

#### Bảng 4.1: Yêu cầu chức năng chi tiết

**Vị trí:** Sau phần 4.1.1 (Yêu cầu chức năng tổng quan)
**Nội dung:**
| Module | Chức năng | Mô tả | Độ ưu tiên |
|--------|-----------|-------|------------|
| Authentication | Đăng ký/Đăng nhập | Xác thực người dùng | Cao |
| User Management | Quản lý profile | CRUD thông tin cá nhân | Cao |
| Service Management | CRUD dịch vụ | Quản lý dịch vụ và danh mục | Cao |
| Appointment | Đặt lịch hẹn | Đặt lịch trực tuyến | Cao |
| Notification | Gửi thông báo | Email/SMS tự động | Trung bình |
| Dashboard | Báo cáo thống kê | Hiển thị KPI | Trung bình |

#### Bảng 4.2: Yêu cầu phi chức năng

**Vị trí:** Sau phần 4.2 (Phân tích yêu cầu phi chức năng)
**Nội dung:**
| Loại yêu cầu | Tiêu chí | Giá trị mục tiêu | Phương pháp đo |
|---------------|----------|------------------|----------------|
| Hiệu suất | Response time | < 200ms | Load testing |
| Bảo mật | Authentication | JWT + bcrypt | Security audit |
| Khả dụng | Uptime | 99.5% | Monitoring |
| Khả năng sử dụng | User experience | Intuitive UI | Usability testing |
| Tương thích | Browser support | Modern browsers | Compatibility testing |

#### Bảng 4.3: Kết quả kiểm thử

**Vị trí:** Sau phần 4.5 (Đánh giá và kiểm thử)
**Nội dung:**
| Loại test | Số test cases | Pass rate | Coverage |
|-----------|---------------|-----------|----------|
| Unit Tests | 50+ | 95% | 80% |
| Integration Tests | 30+ | 90% | 70% |
| E2E Tests | 20+ | 85% | 60% |
| Performance Tests | 10+ | 100% | N/A |

### 4.2. Ảnh cần thêm

#### Hình 4.1: Sơ đồ luồng xử lý đặt lịch hẹn

**Vị trí:** Sau phần 4.4.1 (Luồng xử lý đặt lịch hẹn)
**Mô tả:** Sequence diagram của luồng đặt lịch hẹn
**Nội dung:** Tương tác giữa Client, Server và Database

#### Hình 4.2: Sơ đồ luồng xác thực

**Vị trí:** Sau phần 4.4.2 (Luồng xử lý xác thực)
**Mô tả:** Authentication flow diagram
**Nội dung:** Login process và token management

#### Hình 4.3: Dashboard Screenshot

**Vị trí:** Sau phần 4.4.3 (Luồng xử lý dashboard)
**Mô tả:** Screenshot của admin dashboard
**Nội dung:** KPI cards, charts, tables

#### Hình 4.4: Performance Test Results

**Vị trí:** Sau phần 4.5.1 (Đánh giá hiệu suất)
**Mô tả:** Biểu đồ kết quả performance testing
**Nội dung:** Response time, throughput, memory usage

#### Hình 4.5: Security Test Results

**Vị trí:** Sau phần 4.5.2 (Đánh giá bảo mật)
**Mô tả:** Kết quả security testing
**Nội dung:** Vulnerability scan, penetration test results

---

## GHI CHÚ CHUNG

### Về ảnh:

- **Định dạng:** PNG hoặc JPG, độ phân giải tối thiểu 300 DPI
- **Kích thước:** Phù hợp với khổ giấy A4
- **Chất lượng:** Rõ nét, dễ đọc
- **Màu sắc:** Sử dụng màu sắc phù hợp, tránh quá nhiều màu

### Về bảng:

- **Định dạng:** Sử dụng Markdown table format
- **Nội dung:** Ngắn gọn, súc tích
- **Sắp xếp:** Theo logic và dễ hiểu
- **Tham chiếu:** Đánh số bảng và tham chiếu trong text

### Vị trí chèn:

- **Ảnh:** Chèn ngay sau phần mô tả liên quan
- **Bảng:** Chèn ngay sau phần nội dung liên quan
- **Caption:** Thêm caption cho mỗi ảnh và bảng
- **Tham chiếu:** Tham chiếu đến ảnh/bảng trong text

### Công cụ tạo:

- **Sơ đồ:** Draw.io, Lucidchart, Visio
- **Wireframe:** Figma, Adobe XD, Sketch
- **Screenshot:** Chụp trực tiếp từ ứng dụng
- **Biểu đồ:** Excel, Google Charts, Chart.js

---

**Tổng cộng cần tạo:**

- **Bảng:** 9 bảng
- **Ảnh:** 11 ảnh
- **Tổng:** 20 elements cần thêm vào báo cáo
