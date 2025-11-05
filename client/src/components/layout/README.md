# Layout Components

Bộ sưu tập các component layout để xây dựng cấu trúc trang web nhất quán.

## Components

### 🏠 **PublicLayout**

Layout chuẩn cho các trang public với Header và Footer đầy đủ.

```jsx
import { PublicLayout } from "../layout";

<PublicLayout>
  <YourPageContent />
</PublicLayout>;
```

### 🏢 **AdminLayout**

Layout dành cho admin panel với sidebar và topbar.

```jsx
import { AdminLayout } from "../layout";

<AdminLayout>
  <AdminDashboard />
</AdminLayout>;
```

### 📱 **Header**

Component header độc lập với navigation, dark mode toggle và mobile menu.

```jsx
import { Header } from "../layout";

<Header />;
```

**Features:**

- ✅ Responsive navigation
- ✅ Dark mode toggle
- ✅ Mobile hamburger menu
- ✅ Active link highlighting
- ✅ Logo với link về trang chủ
- ✅ CTA button "Đặt lịch ngay"

### 🦶 **Footer**

Component footer độc lập với thông tin liên hệ và links.

```jsx
import { Footer } from "../layout";

<Footer />;
```

**Features:**

- ✅ Company info với logo
- ✅ Social media links
- ✅ Service links với filters
- ✅ Contact information
- ✅ Opening hours
- ✅ Copyright và legal links

### 🔧 **LayoutWrapper**

Wrapper linh hoạt cho phép tùy chỉnh hiển thị Header/Footer.

```jsx
import { LayoutWrapper } from "../layout";

// Chỉ Header
<LayoutWrapper showFooter={false}>
  <DashboardContent />
</LayoutWrapper>

// Chỉ Footer
<LayoutWrapper showHeader={false}>
  <LandingPageContent />
</LayoutWrapper>

// Cả hai
<LayoutWrapper>
  <FullPageContent />
</LayoutWrapper>

// Với className tùy chỉnh
<LayoutWrapper className="bg-gray-50">
  <CustomPageContent />
</LayoutWrapper>
```

## Sử dụng trong App.jsx

```jsx
import { PublicLayout, AdminLayout, Header, Footer, LayoutWrapper } from "./components/layout";

// Route với PublicLayout
<Route path="/services" element={
  <PublicLayout>
    <ServicesList />
  </PublicLayout>
} />

// Route với LayoutWrapper tùy chỉnh
<Route path="/dashboard" element={
  <LayoutWrapper showFooter={false}>
    <UserDashboard />
  </LayoutWrapper>
} />

// Route chỉ với Header
<Route path="/admin" element={
  <div>
    <Header />
    <AdminPanel />
  </div>
} />
```

## Tùy chỉnh

### Header Customization

```jsx
// Thêm className tùy chỉnh
<Header className="shadow-lg" />

// Thêm props khác
<Header data-testid="main-header" />
```

### Footer Customization

```jsx
// Thêm className tùy chỉnh
<Footer className="bg-gray-900" />

// Thêm props khác
<Footer data-testid="main-footer" />
```

### LayoutWrapper Customization

```jsx
// Tùy chỉnh hoàn toàn
<LayoutWrapper
  showHeader={true}
  showFooter={false}
  className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
>
  <CustomContent />
</LayoutWrapper>
```

## Responsive Design

Tất cả layout components đều responsive:

- **Mobile**: Navigation collapse thành hamburger menu
- **Tablet**: Full navigation với spacing phù hợp
- **Desktop**: Full layout với sidebar (AdminLayout)

## Dark Mode

Header và Footer tự động hỗ trợ dark mode:

- Toggle button trong Header
- Theme persistence với localStorage
- System preference detection
- Smooth transitions

## Accessibility

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels
- ✅ Focus management
- ✅ Color contrast compliance

## Examples

Xem `HeaderFooterDemo.jsx` để có ví dụ chi tiết về cách sử dụng các component layout.
