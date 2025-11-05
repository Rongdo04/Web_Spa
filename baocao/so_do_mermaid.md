# SƠ ĐỒ MERMAID CHO HỆ THỐNG QUẢN LÝ SPA

## Hình 1.1: Sơ đồ tổng quan hệ thống

```mermaid
graph TB
    subgraph "CLIENT LAYER"
        A[React Frontend]
        A1[Homepage]
        A2[Services List]
        A3[Booking Flow]
        A4[Admin Dashboard]
        A5[User Profile]
    end

    subgraph "SERVER LAYER"
        B[Node.js + Express]
        B1[Authentication API]
        B2[Public API]
        B3[Admin API]
        B4[User API]
    end

    subgraph "DATABASE LAYER"
        C[MongoDB]
        C1[Users Collection]
        C2[Services Collection]
        C3[Appointments Collection]
        C4[Staff Collection]
        C5[Categories Collection]
    end

    subgraph "EXTERNAL SERVICES"
        D[Email Service]
        E[SMS Service]
        F[Notification Service]
    end

    A --> B
    A1 --> B2
    A2 --> B2
    A3 --> B1
    A4 --> B3
    A5 --> B4

    B --> C
    B1 --> C1
    B2 --> C2
    B2 --> C3
    B3 --> C1
    B3 --> C2
    B3 --> C3
    B3 --> C4
    B3 --> C5
    B4 --> C1
    B4 --> C3

    B --> D
    B --> E
    B --> F
```

## Hình 2.1: Kiến trúc Client-Server 3-tier

```mermaid
graph TB
    subgraph "PRESENTATION LAYER"
        A[React Components]
        A1[UI Components]
        A2[Layout Components]
        A3[Feature Components]
        A4[Page Components]
    end

    subgraph "BUSINESS LOGIC LAYER"
        B[Express.js Controllers]
        B1[Auth Controller]
        B2[Admin Controllers]
        B3[User Controllers]
        B4[Public Controllers]
        B5[Middleware]
    end

    subgraph "DATA LAYER"
        C[MongoDB Database]
        C1[Models]
        C2[Collections]
        C3[Indexes]
    end

    A --> B
    A1 --> B1
    A2 --> B2
    A3 --> B3
    A4 --> B4

    B --> C
    B1 --> C1
    B2 --> C1
    B3 --> C1
    B4 --> C1
    B5 --> C1
```

## Hình 3.2: Sơ đồ Database Schema (MongoDB)

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String name
        String email UK
        String phone
        String password
        String avatar
        String role
        Boolean isEmailVerified
        String resetPasswordToken
        Date resetPasswordExpires
        String emailVerificationToken
        Date emailVerificationExpires
        Date lastLogin
        Boolean isActive
        Date dateOfBirth
        String gender
        Number totalSpent
        Number totalAppointments
        Date lastBooking
        String level
        Array tags
        Number points
        String notes
        Object preferences
        Object address
        Object emergencyContact
        Date lastVisit
        String source
        String referralCode
        Date createdAt
        Date updatedAt
    }

    STAFF {
        ObjectId _id PK
        ObjectId userId FK
        String employeeId UK
        String name
        String phone
        String email
        String image
        String role
        Array skills
        Object workSchedule
        Array daysOff
        Number revenueShare
        Number hourlyRate
        Number commission
        Boolean isActive
        Date hireDate
        Date terminationDate
        Object emergencyContact
        Object address
        String notes
        Date createdAt
        Date updatedAt
    }

    CATEGORY {
        ObjectId _id PK
        String name
        String description
        String slug UK
        String icon
        String color
        Number displayOrder
        Boolean isActive
        ObjectId parentCategory FK
        Number level
        String path
        Number serviceCount
        String seoTitle
        String seoDescription
        ObjectId createdBy FK
        ObjectId updatedBy FK
        Date createdAt
        Date updatedAt
    }

    SERVICE {
        ObjectId _id PK
        String name
        ObjectId category FK
        Number duration
        Number price
        String description
        Array addOns
        Array combo
        Number displayOrder
        Boolean isActive
        Boolean isFeatured
        Array images
        Array tags
        String requirements
        String notes
        Date createdAt
        Date updatedAt
    }

    APPOINTMENT {
        ObjectId _id PK
        String appointmentNumber UK
        ObjectId customerId FK
        ObjectId serviceId FK
        ObjectId staffId FK
        Date appointmentDate
        String startTime
        String endTime
        Number duration
        String status
        Number totalAmount
        Number discount
        Number finalAmount
        String paymentStatus
        String paymentMethod
        String notes
        String specialRequests
        Array addOns
        Array combo
        Array reminders
        String cancellationReason
        String cancelledBy
        Date cancelledAt
        Date completedAt
        Object rating
        Object followUp
        Date createdAt
        Date updatedAt
    }

    NOTIFICATION_TEMPLATE {
        ObjectId _id PK
        String name
        String type
        String trigger
        String subject
        String content
        Array channels
        Array variables
        Object timing
        Object conditions
        Boolean isActive
        Number priority
        String language
        Array tags
        String notes
        ObjectId createdBy FK
        Date lastUsed
        Number usageCount
        Date createdAt
        Date updatedAt
    }

    NOTIFICATION_LOG {
        ObjectId _id PK
        ObjectId templateId FK
        ObjectId userId FK
        ObjectId appointmentId FK
        String channel
        Object recipient
        Object content
        String status
        String statusMessage
        Date sentAt
        Date deliveredAt
        Date openedAt
        Date clickedAt
        Date failedAt
        Number retryCount
        Number maxRetries
        Object provider
        Number cost
        Object variables
        Object metadata
        Object error
        Date scheduledFor
        Number priority
        Array tags
        String notes
        Date createdAt
        Date updatedAt
    }

    CONTACT {
        ObjectId _id PK
        String businessName
        String businessDescription
        String phone
        String email
        Object address
        Object socialMedia
        Object workingHours
        String logo
        String favicon
        Boolean isActive
        Object seo
        Date createdAt
        Date updatedAt
    }

    USER ||--o{ APPOINTMENT : "customerId"
    STAFF ||--o{ APPOINTMENT : "staffId"
    SERVICE ||--o{ APPOINTMENT : "serviceId"
    CATEGORY ||--o{ SERVICE : "category"
    CATEGORY ||--o{ CATEGORY : "parentCategory"
    USER ||--o{ STAFF : "userId"
    USER ||--o{ CATEGORY : "createdBy"
    USER ||--o{ CATEGORY : "updatedBy"
    USER ||--o{ NOTIFICATION_TEMPLATE : "createdBy"
    NOTIFICATION_TEMPLATE ||--o{ NOTIFICATION_LOG : "templateId"
    USER ||--o{ NOTIFICATION_LOG : "userId"
    APPOINTMENT ||--o{ NOTIFICATION_LOG : "appointmentId"
```

## Hình 3.5: Sơ đồ luồng đặt lịch hẹn

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Auth API
    participant S as Services API
    participant AP as Appointments API
    participant DB as Database
    participant N as Notification Service

    C->>A: POST /api/auth/login
    A->>DB: Verify credentials
    DB-->>A: User data
    A-->>C: JWT token

    C->>S: GET /api/public/services
    S->>DB: Query services
    DB-->>S: Services list
    S-->>C: Services data

    C->>S: GET /api/public/services/:id
    S->>DB: Query service details
    DB-->>S: Service details
    S-->>C: Service details

    C->>AP: POST /api/user/bookings
    Note over C,AP: With JWT token
    AP->>DB: Check availability
    DB-->>AP: Availability status

    alt Available
        AP->>DB: Create appointment
        DB-->>AP: Appointment created
        AP->>N: Trigger notification
        N-->>C: Send confirmation email/SMS
        AP-->>C: Success response
    else Not Available
        AP-->>C: Error response
    end
```

## Hình 3.6: Use Case Diagram tổng thể

```mermaid
graph TB
    subgraph "ACTORS"
        A1[Khách hàng]
        A2[Admin]
        A3[Nhân viên]
        A4[Hệ thống]
    end

    subgraph "USE CASES"
        subgraph "Authentication"
            UC1[Đăng ký tài khoản]
            UC2[Đăng nhập]
            UC3[Quên mật khẩu]
            UC4[Đổi mật khẩu]
        end

        subgraph "Service Management"
            UC5[Xem danh sách dịch vụ]
            UC6[Xem chi tiết dịch vụ]
            UC7[Quản lý dịch vụ]
            UC8[Quản lý danh mục]
        end

        subgraph "Appointment Management"
            UC9[Đặt lịch hẹn]
            UC10[Xem lịch hẹn]
            UC11[Hủy lịch hẹn]
            UC12[Quản lý lịch hẹn]
            UC13[Cập nhật trạng thái]
        end

        subgraph "User Management"
            UC14[Quản lý profile]
            UC15[Quản lý khách hàng]
            UC16[Quản lý nhân viên]
        end

        subgraph "Dashboard & Reports"
            UC17[Xem dashboard]
            UC18[Xem báo cáo]
            UC19[Thống kê doanh thu]
        end

        subgraph "Notification"
            UC20[Gửi thông báo]
            UC21[Nhận thông báo]
            UC22[Quản lý template]
        end
    end

    A1 --> UC1
    A1 --> UC2
    A1 --> UC3
    A1 --> UC5
    A1 --> UC6
    A1 --> UC9
    A1 --> UC10
    A1 --> UC11
    A1 --> UC14
    A1 --> UC21

    A2 --> UC2
    A2 --> UC4
    A2 --> UC7
    A2 --> UC8
    A2 --> UC12
    A2 --> UC13
    A2 --> UC15
    A2 --> UC16
    A2 --> UC17
    A2 --> UC18
    A2 --> UC19
    A2 --> UC20
    A2 --> UC22

    A3 --> UC2
    A3 --> UC4
    A3 --> UC10
    A3 --> UC12
    A3 --> UC13
    A3 --> UC14
    A3 --> UC21

    A4 --> UC20
    A4 --> UC21
```

## Hình 4.1: Sơ đồ luồng xử lý đặt lịch hẹn

```mermaid
flowchart TD
    A[Khách hàng truy cập website] --> B{Đã đăng nhập?}
    B -->|Không| C[Đăng nhập/Đăng ký]
    B -->|Có| D[Chọn dịch vụ]
    C --> D

    D --> E[Xem chi tiết dịch vụ]
    E --> F[Chọn nhân viên]
    F --> G[Chọn ngày giờ]
    G --> H{Kiểm tra khả dụng}

    H -->|Không khả dụng| I[Hiển thị lỗi]
    I --> G

    H -->|Khả dụng| J[Tạo lịch hẹn]
    J --> K[Gửi thông báo xác nhận]
    K --> L[Hiển thị thành công]

    L --> M[Gửi email/SMS]
    M --> N[Lưu vào database]
    N --> O[Hoàn thành]
```

## Hình 4.2: Sơ đồ luồng xác thực

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Auth API
    participant DB as Database
    participant J as JWT Service

    Note over C,J: Login Flow
    C->>A: POST /api/auth/login
    Note over C,A: {email, password}

    A->>DB: Find user by email
    DB-->>A: User data

    A->>A: Verify password (bcrypt)

    alt Valid credentials
        A->>J: Generate JWT token
        J-->>A: JWT token
        A-->>C: {token, user}
    else Invalid credentials
        A-->>C: Error response
    end

    Note over C,J: Protected Route Access
    C->>A: GET /api/protected-route
    Note over C,A: Authorization: Bearer <token>

    A->>J: Verify JWT token
    J-->>A: Token valid/invalid

    alt Token valid
        A->>DB: Process request
        DB-->>A: Data
        A-->>C: Success response
    else Token invalid
        A-->>C: 401 Unauthorized
    end
```

## Hình 4.3: Sơ đồ kiến trúc API

```mermaid
graph TB
    subgraph "API LAYERS"
        A[Client Request]
        B[Express Router]
        C[Middleware]
        D[Controller]
        E[Service Layer]
        F[Model/Database]
    end

    subgraph "MIDDLEWARE STACK"
        C1[Authentication]
        C2[Authorization]
        C3[Validation]
        C4[Error Handling]
        C5[Logging]
    end

    subgraph "CONTROLLERS"
        D1[Auth Controller]
        D2[Admin Controllers]
        D3[User Controllers]
        D4[Public Controllers]
    end

    subgraph "SERVICES"
        E1[Email Service]
        E2[SMS Service]
        E3[Notification Service]
        E4[File Upload Service]
    end

    A --> B
    B --> C
    C --> C1
    C1 --> C2
    C2 --> C3
    C3 --> C4
    C4 --> C5
    C5 --> D

    D --> D1
    D --> D2
    D --> D3
    D --> D4

    D --> E
    E --> E1
    E --> E2
    E --> E3
    E --> E4

    E --> F
```

## Hình 4.4: Sơ đồ component architecture

```mermaid
graph TB
    subgraph "REACT COMPONENT TREE"
        A[App.jsx]

        subgraph "Layout Components"
            B[AdminLayout]
            C[AuthLayout]
            D[PublicLayout]
        end

        subgraph "Page Components"
            E[HomePage]
            F[AdminDashboard]
            G[ServicesList]
            H[BookingFlow]
            I[MyBookings]
        end

        subgraph "Feature Components"
            J[ServiceCard]
            K[BookingForm]
            L[AppointmentTable]
            M[UserProfile]
        end

        subgraph "UI Components"
            N[Button]
            O[Input]
            P[Modal]
            Q[LoadingSpinner]
            R[Toast]
        end
    end

    A --> B
    A --> C
    A --> D

    B --> F
    C --> E
    D --> E
    D --> G
    D --> H
    D --> I

    E --> J
    F --> L
    G --> J
    H --> K
    I --> L

    J --> N
    K --> O
    L --> P
    M --> O

    N --> Q
    O --> Q
    P --> Q
    L --> R
```

## Hình 4.5: Sơ đồ notification system

```mermaid
graph TB
    subgraph "NOTIFICATION TRIGGERS"
        A[Appointment Created]
        B[Appointment Updated]
        C[Appointment Cancelled]
        D[Reminder Scheduled]
    end

    subgraph "NOTIFICATION SERVICE"
        E[Notification Controller]
        F[Template Engine]
        G[Delivery Service]
    end

    subgraph "DELIVERY CHANNELS"
        H[Email Service]
        I[SMS Service]
        J[In-app Notification]
    end

    subgraph "EXTERNAL SERVICES"
        K[Nodemailer]
        L[Twilio SMS]
        M[Database Log]
    end

    A --> E
    B --> E
    C --> E
    D --> E

    E --> F
    F --> G

    G --> H
    G --> I
    G --> J

    H --> K
    I --> L
    J --> M

    K --> M
    L --> M
```

---

## HƯỚNG DẪN SỬ DỤNG

### Cách chèn sơ đồ vào báo cáo:

1. **Copy code Mermaid** từ file này
2. **Paste vào báo cáo** tại vị trí tương ứng
3. **Thêm caption** cho mỗi sơ đồ
4. **Tham chiếu** trong text

### Ví dụ chèn vào báo cáo:

````markdown
#### Hình 1.1: Sơ đồ tổng quan hệ thống

```mermaid
[code mermaid ở đây]
```
````

**Hình 1.1: Sơ đồ tổng quan hệ thống quản lý Spa**

Sơ đồ trên thể hiện kiến trúc tổng thể của hệ thống với 3 tầng chính: Client Layer (React Frontend), Server Layer (Node.js + Express), và Database Layer (MongoDB). Hệ thống cũng tích hợp với các dịch vụ bên ngoài như Email, SMS và Notification Service.

```

### Lưu ý:

- Tất cả sơ đồ đã được tối ưu cho báo cáo
- Có thể điều chỉnh màu sắc và style theo yêu cầu
- Sơ đồ responsive và dễ đọc trên mọi thiết bị
- Tương thích với các công cụ hỗ trợ Mermaid
```
