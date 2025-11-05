# Sửa lỗi Hash Mật khẩu trong Quản lý Khách hàng

## 🐛 Vấn đề

Trong quản lý khách hàng, mật khẩu được lưu trực tiếp vào database mà không được hash, gây ra lỗi bảo mật nghiêm trọng.

## ✅ Giải pháp

Đã thêm hash mật khẩu bằng bcryptjs trong các function tạo và cập nhật khách hàng.

## 🔧 Thay đổi Code

### 1. Thêm import bcryptjs

```javascript
import bcrypt from "bcryptjs";
```

### 2. Sửa function `createCustomer`

**Trước:**

```javascript
const userData = {
  name,
  email: email && email.trim() !== "" ? email.toLowerCase() : undefined,
  phone,
  password: password || phone, // ❌ Lưu mật khẩu plain text
  role: "user",
  isActive: true,
};
```

**Sau:**

```javascript
// Hash password before saving
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password || phone, saltRounds);

const userData = {
  name,
  email: email && email.trim() !== "" ? email.toLowerCase() : undefined,
  phone,
  password: hashedPassword, // ✅ Lưu mật khẩu đã hash
  role: "user",
  isActive: true,
};
```

### 3. Sửa function `updateCustomer`

**Trước:**

```javascript
if (password && password.trim() !== "") {
  await User.findByIdAndUpdate(customer.userId._id, {
    password: password, // ❌ Lưu mật khẩu plain text
    name: name,
    email: email && email.trim() !== "" ? email : customer.userId.email,
    phone: phone,
  });
}
```

**Sau:**

```javascript
if (password && password.trim() !== "") {
  // Hash password before updating
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await User.findByIdAndUpdate(customer.userId._id, {
    password: hashedPassword, // ✅ Lưu mật khẩu đã hash
    name: name,
    email: email && email.trim() !== "" ? email : customer.userId.email,
    phone: phone,
  });
}
```

## 🔐 Cấu hình Bảo mật

### Salt Rounds

- **Giá trị**: 10 rounds
- **Lý do**: Cân bằng giữa bảo mật và hiệu suất
- **Thời gian hash**: ~100ms per password

### Hash Format

- **Algorithm**: bcrypt
- **Length**: ~60 characters
- **Format**: `$2a$10$[salt][hash]`

## 🧪 Cách Test

### Test Case 1: Tạo khách hàng mới

1. Vào Admin Panel → Quản lý khách hàng
2. Click "Tạo khách hàng mới"
3. Nhập thông tin và mật khẩu
4. Kiểm tra database: mật khẩu phải được hash

### Test Case 2: Cập nhật mật khẩu

1. Chỉnh sửa khách hàng có sẵn
2. Thay đổi mật khẩu
3. Kiểm tra database: mật khẩu mới phải được hash

### Test Case 3: Verify mật khẩu

```javascript
// Test script
import bcrypt from "bcryptjs";

const password = "123456";
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
console.log(isValid); // true
```

## 📊 So sánh Trước/Sau

| Aspect           | Trước                       | Sau                         |
| ---------------- | --------------------------- | --------------------------- |
| **Bảo mật**      | ❌ Mật khẩu plain text      | ✅ Mật khẩu đã hash         |
| **Database**     | ❌ Có thể đọc được mật khẩu | ✅ Không thể đọc được       |
| **Salt**         | ❌ Không có                 | ✅ Random salt mỗi lần      |
| **Verification** | ❌ So sánh trực tiếp        | ✅ Sử dụng bcrypt.compare() |

## 🚨 Lưu ý Quan trọng

1. **Không thể reverse hash**: Một khi đã hash, không thể lấy lại mật khẩu gốc
2. **Mỗi hash là unique**: Cùng một mật khẩu sẽ có hash khác nhau mỗi lần
3. **Sử dụng bcrypt.compare()**: Để verify mật khẩu, không so sánh trực tiếp
4. **Salt rounds**: Có thể tăng lên 12-15 cho bảo mật cao hơn (chậm hơn)

## 🔄 Migration

Nếu có dữ liệu cũ với mật khẩu plain text:

1. **Tạo script migration** để hash tất cả mật khẩu cũ
2. **Backup database** trước khi chạy migration
3. **Test kỹ** trên môi trường staging trước

## ✅ Kết quả

- ✅ Mật khẩu được hash an toàn
- ✅ Bảo mật database được cải thiện
- ✅ Tuân thủ best practices
- ✅ Tương thích với hệ thống authentication hiện tại
