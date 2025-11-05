# Pagination Component Usage Guide

## Basic Usage

```jsx
import { Pagination } from "../ui";

// Basic pagination
<Pagination
  current={1}
  pageSize={10}
  total={100}
  totalPages={10}
  onPageChange={(page, pageSize) => console.log("Page:", page)}
  onPageSizeChange={(current, size) => console.log("Size:", size)}
/>;
```

## Advanced Usage

```jsx
// With custom page size options
<Pagination
  current={pagination.current}
  pageSize={pagination.pageSize}
  total={pagination.total}
  totalPages={pagination.totalPages}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
  pageSizeOptions={[5, 10, 20, 50]}
  infoText="Hiển thị {start}-{end} của {total} danh mục"
  showInfo={true}
/>

// Without page size selector
<Pagination
  current={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  onPageSizeChange={null} // Hide page size selector
  showInfo={false} // Hide info text
/>

// Custom styling
<Pagination
  current={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  className="my-custom-pagination"
/>
```

## Props

| Prop               | Type     | Default                                      | Description                                               |
| ------------------ | -------- | -------------------------------------------- | --------------------------------------------------------- |
| `current`          | number   | 1                                            | Current page number                                       |
| `pageSize`         | number   | 10                                           | Items per page                                            |
| `total`            | number   | 0                                            | Total number of items                                     |
| `totalPages`       | number   | 1                                            | Total number of pages                                     |
| `onPageChange`     | function | -                                            | Callback when page changes `(page, pageSize) => void`     |
| `onPageSizeChange` | function | -                                            | Callback when page size changes `(current, size) => void` |
| `pageSizeOptions`  | array    | [5, 10, 20, 50]                              | Available page size options                               |
| `showInfo`         | boolean  | true                                         | Show info text                                            |
| `infoText`         | string   | "Hiển thị {start}-{end} của {total} kết quả" | Info text template                                        |
| `className`        | string   | ""                                           | Additional CSS classes                                    |

## Legacy Support

For backward compatibility, you can still use the old API:

```jsx
// Old API (still works)
<Pagination.Legacy
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange}
/>

// With info (old API)
<Pagination.WithInfo
  currentPage={1}
  totalPages={10}
  totalItems={100}
  itemsPerPage={10}
  onPageChange={handlePageChange}
/>
```

## Examples for Different Use Cases

### Admin Categories

```jsx
<Pagination
  current={pagination.current}
  pageSize={pagination.pageSize}
  total={pagination.total}
  totalPages={pagination.totalPages}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
  pageSizeOptions={[5, 10, 20, 50]}
  infoText="Hiển thị {start}-{end} của {total} danh mục"
/>
```

### Admin Services

```jsx
<Pagination
  current={pagination.current}
  pageSize={pagination.pageSize}
  total={pagination.total}
  totalPages={pagination.totalPages}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
  pageSizeOptions={[6, 9, 12, 18]}
  infoText="Hiển thị {start}-{end} của {total} dịch vụ"
/>
```

### Simple Pagination (no page size selector)

```jsx
<Pagination
  current={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  onPageSizeChange={null}
  showInfo={false}
/>
```
