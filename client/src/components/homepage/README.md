# HomePage Components

HomePage đã được chia thành các component nhỏ hơn để dễ quản lý và tái sử dụng.

## Cấu trúc thư mục

```
src/components/homepage/
├── HomePage.jsx                 # Component chính, kết hợp tất cả sections
├── sections/                    # Thư mục chứa các section components
│   ├── index.js                # Export tất cả sections
│   ├── HeroSection.jsx         # Hero section với CTA buttons
│   ├── FeaturedServicesSection.jsx  # Dịch vụ nổi bật
│   ├── ComboPackagesSection.jsx     # Gói combo & khuyến mãi (có slider)
│   ├── ProcessStepsSection.jsx      # Quy trình đặt lịch 3 bước
│   ├── TestimonialsSection.jsx      # Đánh giá khách hàng
│   ├── ContactInfoSection.jsx       # Thông tin liên hệ
│   ├── FeaturesSection.jsx          # Tại sao chọn chúng tôi
│   └── FinalCTASection.jsx          # CTA cuối trang
└── README.md                   # File này
```

## Các Section Components

### 1. HeroSection

- **Chức năng**: Hero banner với slogan, CTA buttons và benefits
- **Tính năng**:
  - Background gradient với pattern
  - 2 CTA buttons (Đặt lịch ngay, Xem gói combo)
  - 3 benefits cards (Thư giãn, Chuyên gia, Đặt lịch nhanh)
- **Props**: Không có

### 2. FeaturedServicesSection

- **Chức năng**: Hiển thị danh sách dịch vụ nổi bật
- **Tính năng**:
  - Grid responsive với service cards
  - Badge "Hot"/"New" cho services
  - Thông tin: tên, mô tả, thời lượng, giá
  - Button "Đặt lịch ngay" cho mỗi service
- **Props**: Không có (sử dụng mock data)

### 3. ComboPackagesSection

- **Chức năng**: Slider hiển thị các gói combo
- **Tính năng**:
  - Auto-slide mỗi 5 giây
  - Navigation controls (prev/next buttons)
  - Dot indicators
  - Hiển thị: tên, mô tả, giá gốc, giá khuyến mãi, % giảm giá
  - Danh sách services trong gói
- **Props**: Không có (sử dụng mock data)

### 4. ProcessStepsSection

- **Chức năng**: Hiển thị quy trình đặt lịch 3 bước
- **Tính năng**:
  - 3 steps với icons và descriptions
  - Connecting lines giữa các steps
  - Responsive design
- **Props**: Không có

### 5. TestimonialsSection

- **Chức năng**: Hiển thị đánh giá khách hàng
- **Tính năng**:
  - 3 testimonial cards
  - Star ratings
  - Avatar và thông tin khách hàng
- **Props**: Không có (sử dụng mock data)

### 6. ContactInfoSection

- **Chức năng**: Thông tin liên hệ và bản đồ
- **Tính năng**:
  - Địa chỉ, giờ mở cửa, hotline/Zalo
  - Map placeholder (UI-only)
  - Button "Xem trên Google Maps"
- **Props**: Không có

### 7. FeaturesSection

- **Chức năng**: "Tại sao chọn chúng tôi"
- **Tính năng**:
  - 3 feature cards với icons
  - Dark mode support
  - Hover effects
- **Props**: Không có

### 8. FinalCTASection

- **Chức năng**: Call-to-action cuối trang
- **Tính năng**:
  - Background gradient
  - 2 CTA buttons
  - Responsive design
- **Props**: Không có

## Cách sử dụng

```jsx
import HomePage from './components/homepage/HomePage';

// Sử dụng toàn bộ HomePage
<HomePage />

// Hoặc sử dụng từng section riêng lẻ
import { HeroSection, FeaturedServicesSection } from './components/homepage/sections';

<HeroSection />
<FeaturedServicesSection />
```

## Lợi ích của việc chia component

1. **Dễ bảo trì**: Mỗi section có logic riêng, dễ sửa chữa
2. **Tái sử dụng**: Có thể sử dụng các section ở trang khác
3. **Tách biệt trách nhiệm**: Mỗi component chỉ lo một phần UI
4. **Dễ test**: Có thể test từng section riêng lẻ
5. **Performance**: Có thể lazy load các section nếu cần
6. **Code organization**: Code được tổ chức rõ ràng, dễ đọc

## Mock Data

Các section sử dụng mock data được định nghĩa trong từng component:

- `featuredServices`: Dịch vụ nổi bật
- `comboPackages`: Gói combo
- `testimonials`: Đánh giá khách hàng
- `processSteps`: Quy trình đặt lịch

Trong tương lai, có thể chuyển sang sử dụng API thực tế.
