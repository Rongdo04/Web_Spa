# 📋 Staff API Documentation

## 🎯 Tổng quan

API Staff cho phép frontend lấy thông tin nhân viên để hiển thị trên trang About. API này được thiết kế để chỉ trả về thông tin công khai của nhân viên đang hoạt động.

## 🔗 Endpoints

### 1. Lấy danh sách nhân viên

**GET** `/api/public/staff`

#### Query Parameters:
- `role` (optional): Lọc theo vai trò nhân viên
- `limit` (optional): Giới hạn số lượng kết quả (mặc định: 20)

#### Ví dụ:
```bash
# Lấy tất cả nhân viên
GET /api/public/staff

# Lấy nhân viên theo vai trò
GET /api/public/staff?role=Manager

# Giới hạn kết quả
GET /api/public/staff?limit=10

# Kết hợp các tham số
GET /api/public/staff?role=Massage Therapist&limit=5
```

#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "staff_id",
      "name": "Nguyễn Thị Lan Anh",
      "position": "Manager",
      "experience": "6 năm kinh nghiệm",
      "specialty": "Quản lý spa, Chăm sóc da, Massage",
      "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      "description": "Chuyên gia manager với 6 năm kinh nghiệm, mang đến dịch vụ chăm sóc chất lượng cao cho khách hàng."
    }
  ],
  "total": 15
}
```

### 2. Lấy chi tiết nhân viên

**GET** `/api/public/staff/:id`

#### Response:
```json
{
  "success": true,
  "data": {
    "id": "staff_id",
    "name": "Nguyễn Thị Lan Anh",
    "position": "Manager",
    "experience": "6 năm kinh nghiệm",
    "specialty": "Quản lý spa, Chăm sóc da, Massage",
    "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    "description": "Chuyên gia manager với 6 năm kinh nghiệm, mang đến dịch vụ chăm sóc chất lượng cao cho khách hàng."
  }
}
```

## 🎨 Frontend Integration

### 1. Service API

File: `client/src/services/public/staffAPI.js`

```javascript
import { httpClient } from "../httpClient";

// Lấy danh sách nhân viên công khai
export const getPublicStaff = async (params = {}) => {
  try {
    const { role = "", limit = 20 } = params;
    const queryParams = new URLSearchParams();
    
    if (role) queryParams.append("role", role);
    if (limit) queryParams.append("limit", limit);
    
    const url = `/api/public/staff${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await httpClient.get(url);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching public staff:", error);
    throw error;
  }
};
```

### 2. Component Usage

File: `client/src/components/About/components/AboutTeam.jsx`

```javascript
import React, { useState, useEffect } from "react";
import { staffAPI } from "../../../services/public";

const AboutTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await staffAPI.getPublicStaff({ limit: 12 });
        if (response.success) {
          setTeamMembers(response.data);
        } else {
          setError("Không thể tải danh sách nhân viên");
        }
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError("Có lỗi xảy ra khi tải danh sách nhân viên");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Component render logic...
};
```

## 🗄️ Database Schema

### Staff Model

```javascript
{
  name: String,           // Tên nhân viên
  role: String,           // Vai trò (Manager, Massage Therapist, etc.)
  image: String,          // URL hình ảnh
  skills: [String],       // Danh sách kỹ năng
  hireDate: Date,         // Ngày bắt đầu làm việc
  isActive: Boolean,      // Trạng thái hoạt động
  // ... các trường khác
}
```

## 🔧 Backend Implementation

### 1. Controller

File: `backend/controllers/public/staffController.js`

- `getPublicStaff`: Lấy danh sách nhân viên với filter và pagination
- `getPublicStaffById`: Lấy chi tiết nhân viên theo ID

### 2. Routes

File: `backend/routes/public/staff.js`

```javascript
// GET /api/public/staff - Lấy danh sách nhân viên công khai
router.get("/", getPublicStaff);

// GET /api/public/staff/:id - Lấy chi tiết nhân viên công khai
router.get("/:id", getPublicStaffById);
```

### 3. Server Registration

File: `backend/server.js`

```javascript
import publicStaffRoutes from "./routes/public/staff.js";

app.use("/api/public/staff", publicStaffRoutes);
```

## 📊 Data Transformation

API tự động tính toán và chuyển đổi dữ liệu:

1. **Kinh nghiệm**: Tính từ `hireDate` đến hiện tại
2. **Chuyên môn**: Kết hợp từ mảng `skills`
3. **Mô tả**: Tự động tạo từ thông tin vai trò và kinh nghiệm
4. **Hình ảnh**: Fallback về ảnh mặc định nếu không có

## 🎯 Features

- ✅ Chỉ trả về nhân viên đang hoạt động (`isActive: true`)
- ✅ Tính toán kinh nghiệm tự động
- ✅ Hỗ trợ filter theo vai trò
- ✅ Pagination với limit
- ✅ Error handling và loading states
- ✅ Fallback images
- ✅ Responsive design

## 🚀 Usage Examples

### Lấy tất cả nhân viên
```javascript
const response = await staffAPI.getPublicStaff();
```

### Lấy nhân viên quản lý
```javascript
const response = await staffAPI.getPublicStaff({ role: "Manager" });
```

### Lấy 6 nhân viên đầu tiên
```javascript
const response = await staffAPI.getPublicStaff({ limit: 6 });
```

### Lấy chi tiết nhân viên
```javascript
const response = await staffAPI.getPublicStaffById("staff_id");
```

## 🔒 Security

- API chỉ trả về thông tin công khai
- Không expose thông tin nhạy cảm (lương, thông tin cá nhân)
- Chỉ hiển thị nhân viên đang hoạt động
- Rate limiting được áp dụng thông qua middleware

## 📝 Notes

- API được thiết kế cho trang About, không phải cho admin panel
- Dữ liệu được cache ở frontend level
- Hỗ trợ dark mode và responsive design
- Tương thích với existing UI components
