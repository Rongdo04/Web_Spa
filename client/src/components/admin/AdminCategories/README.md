# AdminCategories Component Structure

## Tổng quan

Component `AdminCategories` đã được chia thành các component con nhỏ hơn để dễ quản lý và tái sử dụng.

## Cấu trúc Component

### 1. AdminCategories.jsx (Component chính)

- Quản lý state và logic chính
- Xử lý API calls
- Điều phối các component con

### 2. Components con

#### CategoryForm.jsx

- Form thêm/sửa danh mục
- Modal với các trường input
- Validation và submit handling

#### CategoryFilters.jsx

- Bộ lọc tìm kiếm
- Filter theo trạng thái và cấp độ
- Clear filters functionality

#### CategoryList.jsx

- Hiển thị danh sách danh mục
- Empty state khi không có dữ liệu
- Tích hợp pagination

#### CategoryItem.jsx

- Component cho từng item danh mục
- Hiển thị thông tin chi tiết
- Actions (edit, delete)

#### Pagination.jsx

- Component phân trang riêng biệt
- Page size selector
- Navigation buttons

## Lợi ích

1. **Tách biệt trách nhiệm**: Mỗi component có một nhiệm vụ cụ thể
2. **Tái sử dụng**: Các component có thể được sử dụng ở nơi khác
3. **Dễ bảo trì**: Code ngắn gọn, dễ đọc và sửa chữa
4. **Testing**: Dễ dàng test từng component riêng biệt
5. **Performance**: Có thể optimize từng component độc lập

## Props Interface

### CategoryForm

```jsx
{
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (e) => void,
  formData: object,
  onInputChange: (field, value) => void,
  editingCategory: object | null,
  categories: array,
  loading: boolean
}
```

### CategoryFilters

```jsx
{
  searchTerm: string,
  onSearchChange: (value) => void,
  filters: object,
  onFilterChange: (key, value) => void,
  onClearFilters: () => void,
  hasActiveFilters: boolean
}
```

### CategoryList

```jsx
{
  categories: array,
  onEdit: (category) => void,
  onDelete: (id) => void,
  pagination: object,
  onPageChange: (page, pageSize) => void,
  onPageSizeChange: (current, size) => void
}
```

### CategoryItem

```jsx
{
  category: object,
  onEdit: (category) => void,
  onDelete: (id) => void
}
```

### Pagination

```jsx
{
  current: number,
  pageSize: number,
  total: number,
  totalPages: number,
  onPageChange: (page, pageSize) => void,
  onPageSizeChange: (current, size) => void
}
```
