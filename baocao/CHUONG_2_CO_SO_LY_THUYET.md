# CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

## 2.1. Lý thuyết về hệ thống quản lý Spa

### 2.1.1. Khái niệm hệ thống quản lý Spa

Hệ thống quản lý Spa là một hệ thống thông tin được thiết kế để hỗ trợ việc quản lý toàn diện các hoạt động kinh doanh của một cơ sở Spa, bao gồm quản lý khách hàng, nhân viên, dịch vụ, lịch hẹn và các hoạt động tài chính.

Hệ thống này giúp tự động hóa các quy trình nghiệp vụ, tăng hiệu quả quản lý và cải thiện chất lượng dịch vụ khách hàng.

### 2.1.2. Các thành phần chính của hệ thống

#### 2.1.2.1. Quản lý khách hàng

- Lưu trữ thông tin cá nhân và lịch sử dịch vụ
- Phân loại khách hàng theo mức độ VIP
- Theo dõi sở thích và nhu cầu cá nhân
- Quản lý điểm tích lũy và chương trình khuyến mãi

#### 2.1.2.2. Quản lý nhân viên

- Thông tin cá nhân và chuyên môn
- Lịch làm việc và ca trực
- Theo dõi hiệu suất và doanh thu
- Quản lý kỹ năng và chứng chỉ

#### 2.1.2.3. Quản lý dịch vụ

- Danh mục dịch vụ và giá cả
- Gói combo và dịch vụ bổ sung
- Quản lý thời gian và tài nguyên
- Theo dõi mức độ phổ biến

#### 2.1.2.4. Quản lý lịch hẹn

- Đặt lịch trực tuyến
- Kiểm tra xung đột thời gian
- Quản lý trạng thái lịch hẹn
- Thông báo nhắc nhở tự động

#### 2.1.2.5. Báo cáo và thống kê

- Dashboard tổng quan
- Báo cáo doanh thu
- Phân tích xu hướng khách hàng
- Thống kê hiệu suất nhân viên

### 2.1.3. Lợi ích của hệ thống quản lý Spa

#### 2.1.3.1. Đối với chủ cơ sở

- Tăng hiệu quả quản lý và giảm chi phí vận hành
- Theo dõi tình hình kinh doanh real-time
- Tự động hóa các quy trình nghiệp vụ
- Cải thiện chất lượng dịch vụ

#### 2.1.3.2. Đối với khách hàng

- Trải nghiệm đặt lịch thuận tiện
- Nhận thông báo nhắc nhở tự động
- Theo dõi lịch sử dịch vụ
- Hưởng các chương trình khuyến mãi

#### 2.1.3.3. Đối với nhân viên

- Quản lý lịch làm việc rõ ràng
- Theo dõi hiệu suất cá nhân
- Giao diện thân thiện, dễ sử dụng
- Tăng động lực làm việc

## 2.2. Công nghệ sử dụng

### 2.2.1. Công nghệ Backend

#### 2.2.1.1. Node.js

Node.js là một runtime environment cho JavaScript, cho phép chạy JavaScript trên server. Node.js được lựa chọn vì:

- **Hiệu suất cao:** Sử dụng event-driven, non-blocking I/O
- **JavaScript toàn stack:** Cùng ngôn ngữ cho frontend và backend
- **Ecosystem phong phú:** NPM với hàng triệu package
- **Scalability:** Dễ dàng mở rộng theo chiều ngang
- **Community lớn:** Hỗ trợ và tài liệu phong phú

#### 2.2.1.2. Express.js

Express.js là một web framework nhẹ và linh hoạt cho Node.js:

- **Minimalist:** Cung cấp các tính năng cơ bản cần thiết
- **Middleware support:** Hỗ trợ middleware để xử lý request
- **Routing:** Hệ thống routing mạnh mẽ và linh hoạt
- **Template engines:** Hỗ trợ nhiều template engine
- **Error handling:** Xử lý lỗi hiệu quả

#### 2.2.1.3. MongoDB

MongoDB là một NoSQL database document-oriented:

- **Flexible schema:** Không cần định nghĩa schema cố định
- **JSON-like documents:** Dữ liệu lưu trữ dạng BSON
- **Horizontal scaling:** Dễ dàng mở rộng theo chiều ngang
- **Rich queries:** Hỗ trợ queries phức tạp
- **Aggregation pipeline:** Xử lý dữ liệu mạnh mẽ

#### 2.2.1.4. Mongoose

Mongoose là một Object Document Mapper (ODM) cho MongoDB:

- **Schema definition:** Định nghĩa schema cho documents
- **Validation:** Validate dữ liệu trước khi lưu
- **Middleware:** Hooks trước và sau khi thao tác
- **Population:** Join dữ liệu giữa các collections
- **Type casting:** Tự động chuyển đổi kiểu dữ liệu

### 2.2.2. Công nghệ Frontend

#### 2.2.2.1. React.js

React.js là một JavaScript library để xây dựng user interface:

- **Component-based:** Xây dựng UI từ các component tái sử dụng
- **Virtual DOM:** Cải thiện hiệu suất rendering
- **One-way data flow:** Dữ liệu chảy một chiều, dễ debug
- **JSX:** Cú pháp mở rộng giống HTML trong JavaScript
- **Ecosystem:** Hỗ trợ phong phú từ Facebook và community

#### 2.2.2.2. Vite

Vite là một build tool hiện đại cho frontend:

- **Fast development:** Hot Module Replacement (HMR) nhanh
- **ES modules:** Sử dụng ES modules native
- **Optimized builds:** Tối ưu hóa bundle cho production
- **Plugin ecosystem:** Hỗ trợ nhiều plugin
- **TypeScript support:** Hỗ trợ TypeScript out-of-the-box

#### 2.2.2.3. Tailwind CSS

Tailwind CSS là một utility-first CSS framework:

- **Utility classes:** Sử dụng các class utility để styling
- **Responsive design:** Hỗ trợ responsive design dễ dàng
- **Customizable:** Có thể customize theme và colors
- **Small bundle:** Chỉ include CSS được sử dụng
- **Developer experience:** Tăng tốc độ phát triển

#### 2.2.2.4. Ant Design

Ant Design là một React UI library:

- **Enterprise-class:** Thiết kế cho ứng dụng enterprise
- **Rich components:** Nhiều component sẵn có
- **Consistent design:** Thiết kế nhất quán
- **Accessibility:** Hỗ trợ accessibility tốt
- **Internationalization:** Hỗ trợ đa ngôn ngữ

### 2.2.3. Công nghệ Authentication

#### 2.2.3.1. JWT (JSON Web Token)

JWT là một chuẩn mở để truyền thông tin an toàn:

- **Stateless:** Không cần lưu trữ session trên server
- **Self-contained:** Chứa tất cả thông tin cần thiết
- **Cross-domain:** Có thể sử dụng across domains
- **Compact:** Kích thước nhỏ, dễ truyền tải
- **Secure:** Được ký số để đảm bảo tính toàn vẹn

#### 2.2.3.2. bcrypt

bcrypt là một thuật toán hash mật khẩu:

- **Salt rounds:** Tự động thêm salt để tăng bảo mật
- **Adaptive:** Có thể điều chỉnh độ khó theo thời gian
- **Slow:** Cố ý chậm để chống brute force
- **Widely used:** Được sử dụng rộng rãi trong industry
- **Secure:** Được coi là an toàn cho việc hash password

## 2.3. Kiến trúc hệ thống

### 2.3.1. Kiến trúc Client-Server

Hệ thống sử dụng kiến trúc Client-Server với 3 tầng:

#### 2.3.1.1. Presentation Layer (Client)

- **React.js frontend:** Giao diện người dùng
- **Responsive design:** Hoạt động trên mọi thiết bị
- **State management:** Quản lý trạng thái ứng dụng
- **API integration:** Giao tiếp với backend qua REST API

#### 2.3.1.2. Business Logic Layer (Server)

- **Express.js server:** Xử lý business logic
- **Authentication middleware:** Xác thực và phân quyền
- **Data validation:** Validate dữ liệu đầu vào
- **Error handling:** Xử lý lỗi và trả về response phù hợp

#### 2.3.1.3. Data Layer (Database)

- **MongoDB database:** Lưu trữ dữ liệu
- **Mongoose ODM:** Mapping giữa objects và documents
- **Indexing:** Tối ưu hóa truy vấn
- **Data integrity:** Đảm bảo tính toàn vẹn dữ liệu

### 2.3.2. Kiến trúc MVC (Model-View-Controller)

#### 2.3.2.1. Model

- **Mongoose schemas:** Định nghĩa cấu trúc dữ liệu
- **Business logic:** Các quy tắc nghiệp vụ
- **Data validation:** Validate dữ liệu
- **Database operations:** CRUD operations

#### 2.3.2.2. View

- **React components:** Giao diện người dùng
- **JSX templates:** Cấu trúc HTML
- **CSS styling:** Tailwind CSS và Ant Design
- **Responsive layout:** Thiết kế responsive

#### 2.3.2.3. Controller

- **Express routes:** Định nghĩa API endpoints
- **Request handling:** Xử lý HTTP requests
- **Response formatting:** Format response data
- **Error handling:** Xử lý lỗi và exceptions

### 2.3.3. RESTful API Design

#### 2.3.3.1. Nguyên tắc REST

- **Stateless:** Mỗi request độc lập
- **Client-Server:** Tách biệt client và server
- **Cacheable:** Có thể cache responses
- **Uniform Interface:** Interface nhất quán
- **Layered System:** Hệ thống phân tầng

#### 2.3.3.2. HTTP Methods

- **GET:** Lấy dữ liệu
- **POST:** Tạo mới dữ liệu
- **PUT:** Cập nhật toàn bộ dữ liệu
- **PATCH:** Cập nhật một phần dữ liệu
- **DELETE:** Xóa dữ liệu

#### 2.3.3.3. Status Codes

- **2xx Success:** Thành công
- **4xx Client Error:** Lỗi từ phía client
- **5xx Server Error:** Lỗi từ phía server

## 2.4. Các mô hình thiết kế phần mềm

### 2.4.1. Repository Pattern

Repository Pattern tách biệt logic truy cập dữ liệu khỏi business logic:

#### 2.4.1.1. Lợi ích

- **Separation of concerns:** Tách biệt các mối quan tâm
- **Testability:** Dễ dàng unit test
- **Flexibility:** Có thể thay đổi data source
- **Maintainability:** Dễ bảo trì và mở rộng

#### 2.4.1.2. Implementation

- **Repository interface:** Định nghĩa các method cần thiết
- **Repository implementation:** Implement cụ thể cho MongoDB
- **Service layer:** Sử dụng repository để xử lý business logic

### 2.4.2. Service Layer Pattern

Service Layer Pattern tổ chức business logic thành các service:

#### 2.4.2.1. Lợi ích

- **Business logic centralization:** Tập trung business logic
- **Reusability:** Có thể tái sử dụng
- **Transaction management:** Quản lý transaction
- **Cross-cutting concerns:** Xử lý các mối quan tâm chung

#### 2.4.2.2. Implementation

- **Service classes:** Các class chứa business logic
- **Dependency injection:** Inject dependencies
- **Error handling:** Xử lý lỗi tập trung
- **Logging:** Ghi log các hoạt động

### 2.4.3. Middleware Pattern

Middleware Pattern xử lý các request/response trong pipeline:

#### 2.4.3.1. Lợi ích

- **Modularity:** Tách biệt các chức năng
- **Reusability:** Có thể tái sử dụng middleware
- **Order control:** Kiểm soát thứ tự xử lý
- **Cross-cutting concerns:** Xử lý các mối quan tâm chung

#### 2.4.3.2. Types of Middleware

- **Authentication middleware:** Xác thực người dùng
- **Authorization middleware:** Phân quyền truy cập
- **Validation middleware:** Validate dữ liệu
- **Logging middleware:** Ghi log requests
- **Error handling middleware:** Xử lý lỗi

### 2.4.4. Component Pattern (Frontend)

Component Pattern tổ chức UI thành các component tái sử dụng:

#### 2.4.4.1. Lợi ích

- **Reusability:** Tái sử dụng components
- **Maintainability:** Dễ bảo trì
- **Testability:** Dễ unit test
- **Separation of concerns:** Tách biệt UI logic

#### 2.4.4.2. Component Types

- **Presentational components:** Chỉ hiển thị UI
- **Container components:** Chứa business logic
- **Higher-order components:** Wrapper components
- **Custom hooks:** Tái sử dụng stateful logic

## 2.5. Database Design Patterns

### 2.5.1. Schema Design

#### 2.5.1.1. Document Structure

- **Embedded documents:** Lưu trữ dữ liệu liên quan trong cùng document
- **References:** Sử dụng ObjectId để reference
- **Hybrid approach:** Kết hợp cả hai phương pháp

#### 2.5.1.2. Data Modeling

- **One-to-many:** Sử dụng embedded arrays hoặc references
- **Many-to-many:** Sử dụng reference arrays
- **Self-referencing:** Reference đến chính document đó

### 2.5.2. Indexing Strategy

#### 2.5.2.1. Index Types

- **Single field index:** Index trên một field
- **Compound index:** Index trên nhiều fields
- **Text index:** Index cho full-text search
- **Sparse index:** Index chỉ cho documents có field

#### 2.5.2.2. Index Optimization

- **Query patterns:** Tối ưu theo query patterns
- **Write performance:** Cân bằng giữa read và write
- **Memory usage:** Quản lý memory usage
- **Index maintenance:** Bảo trì indexes

## 2.6. Security Patterns

### 2.6.1. Authentication Patterns

#### 2.6.1.1. JWT Authentication

- **Token generation:** Tạo JWT token
- **Token verification:** Verify token signature
- **Token expiration:** Xử lý token hết hạn
- **Refresh token:** Làm mới token

#### 2.6.1.2. Password Security

- **Hashing:** Hash password với bcrypt
- **Salt:** Sử dụng salt để tăng bảo mật
- **Password policies:** Quy định về password
- **Password reset:** Reset password an toàn

### 2.6.2. Authorization Patterns

#### 2.6.2.1. Role-based Access Control (RBAC)

- **Roles:** Định nghĩa các vai trò
- **Permissions:** Định nghĩa quyền hạn
- **Role assignment:** Gán vai trò cho user
- **Permission checking:** Kiểm tra quyền truy cập

#### 2.6.2.2. Resource-based Authorization

- **Ownership:** Kiểm tra quyền sở hữu
- **Resource permissions:** Quyền trên từng resource
- **Conditional access:** Truy cập có điều kiện
- **Audit trail:** Theo dõi truy cập

## 2.7. Performance Optimization Patterns

### 2.7.1. Caching Strategies

#### 2.7.1.1. Client-side Caching

- **Browser cache:** Cache static resources
- **Local storage:** Lưu trữ dữ liệu local
- **Session storage:** Lưu trữ session data
- **Memory cache:** Cache trong memory

#### 2.7.1.2. Server-side Caching

- **Application cache:** Cache trong application
- **Database cache:** Cache query results
- **CDN cache:** Cache static assets
- **Redis cache:** External cache server

### 2.7.2. Database Optimization

#### 2.7.2.1. Query Optimization

- **Index usage:** Sử dụng indexes hiệu quả
- **Query patterns:** Tối ưu query patterns
- **Aggregation:** Sử dụng aggregation pipeline
- **Pagination:** Phân trang kết quả

#### 2.7.2.2. Connection Management

- **Connection pooling:** Quản lý connection pool
- **Connection limits:** Giới hạn số connections
- **Timeout handling:** Xử lý timeout
- **Error recovery:** Khôi phục từ lỗi

## 2.8. Error Handling Patterns

### 2.8.1. Error Classification

#### 2.8.1.1. Error Types

- **Validation errors:** Lỗi validate dữ liệu
- **Authentication errors:** Lỗi xác thực
- **Authorization errors:** Lỗi phân quyền
- **Business logic errors:** Lỗi business logic
- **System errors:** Lỗi hệ thống

#### 2.8.1.2. Error Handling Strategy

- **Try-catch blocks:** Xử lý lỗi cục bộ
- **Global error handler:** Xử lý lỗi toàn cục
- **Error logging:** Ghi log lỗi
- **User-friendly messages:** Thông báo thân thiện

### 2.8.2. Logging Patterns

#### 2.8.2.1. Log Levels

- **Error:** Lỗi nghiêm trọng
- **Warn:** Cảnh báo
- **Info:** Thông tin
- **Debug:** Debug information

#### 2.8.2.2. Log Management

- **Structured logging:** Log có cấu trúc
- **Log aggregation:** Tập trung logs
- **Log rotation:** Xoay vòng logs
- **Log analysis:** Phân tích logs

## 2.9. Testing Patterns

### 2.9.1. Unit Testing

#### 2.9.1.1. Test Structure

- **Arrange:** Chuẩn bị dữ liệu test
- **Act:** Thực hiện action cần test
- **Assert:** Kiểm tra kết quả

#### 2.9.1.2. Test Types

- **Function tests:** Test các function
- **Component tests:** Test React components
- **Model tests:** Test Mongoose models
- **Service tests:** Test service layer

### 2.9.2. Integration Testing

#### 2.9.2.1. API Testing

- **Endpoint tests:** Test API endpoints
- **Authentication tests:** Test authentication flow
- **Authorization tests:** Test authorization
- **Data flow tests:** Test data flow

#### 2.9.2.2. Database Testing

- **CRUD operations:** Test CRUD operations
- **Relationships:** Test data relationships
- **Constraints:** Test data constraints
- **Performance:** Test database performance

## 2.10. Kết luận chương

Chương 2 đã trình bày cơ sở lý thuyết về hệ thống quản lý Spa và các công nghệ sử dụng trong dự án. Các nội dung chính bao gồm:

### 2.10.1. Tổng kết lý thuyết

1. **Hệ thống quản lý Spa:** Khái niệm, thành phần và lợi ích của hệ thống quản lý Spa hiện đại.

2. **Công nghệ Backend:** Node.js, Express.js, MongoDB và Mongoose - các công nghệ hiện đại cho phát triển web application.

3. **Công nghệ Frontend:** React.js, Vite, Tailwind CSS và Ant Design - tạo nên giao diện người dùng hiện đại và responsive.

4. **Authentication & Security:** JWT và bcrypt - đảm bảo bảo mật cho hệ thống.

5. **Kiến trúc hệ thống:** Client-Server 3-tier, MVC pattern và RESTful API design.

6. **Design Patterns:** Repository, Service Layer, Middleware và Component patterns.

7. **Database Design:** Schema design, indexing strategy và optimization.

8. **Security Patterns:** Authentication, authorization và data protection.

9. **Performance Optimization:** Caching strategies và database optimization.

10. **Error Handling & Testing:** Error handling patterns và testing strategies.

### 2.10.2. Lựa chọn công nghệ

Việc lựa chọn các công nghệ trong dự án dựa trên các tiêu chí:

- **Hiệu suất cao:** Node.js và MongoDB đảm bảo hiệu suất tốt
- **Dễ phát triển:** JavaScript toàn stack giảm complexity
- **Scalability:** Dễ dàng mở rộng hệ thống
- **Community support:** Hỗ trợ cộng đồng mạnh mẽ
- **Modern practices:** Sử dụng các best practices hiện đại

### 2.10.3. Kiến trúc tối ưu

Kiến trúc hệ thống được thiết kế với các nguyên tắc:

- **Separation of concerns:** Tách biệt các mối quan tâm
- **Modularity:** Thiết kế modular, dễ bảo trì
- **Scalability:** Có thể mở rộng theo nhu cầu
- **Security:** Bảo mật từ thiết kế
- **Performance:** Tối ưu hiệu suất

Cơ sở lý thuyết này sẽ là nền tảng cho việc thiết kế và phát triển hệ thống quản lý Spa trong các chương tiếp theo.
