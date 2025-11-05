// components/ui/Pagination.jsx
import React from "react";

const Pagination = ({
  current = 1,
  pageSize = 10,
  total = 0,
  totalPages = 1,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  showInfo = true,
  infoText = "Hiển thị {start}-{end} của {total} kết quả",
  className = "",
  ...props
}) => {
  // Always show pagination if there are items, even if only one page
  if (total === 0) {
    return null;
  }

  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  return (
    <div
      className={`mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        {showInfo && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {infoText
              .replace("{start}", startItem)
              .replace("{end}", endItem)
              .replace("{total}", total)}
          </div>
        )}
        <div className="flex items-center space-x-2">
          {onPageSizeChange && (
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(1, parseInt(e.target.value))}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} / trang
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center space-x-1">
            <button
              onClick={() => onPageChange(current - 1, pageSize)}
              disabled={current === 1}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Trước
            </button>

            <div className="flex items-center space-x-1">
              {Array.from(
                { length: Math.min(5, Math.max(1, totalPages)) },
                (_, i) => {
                  let pageNum;
                  const maxPages = Math.max(1, totalPages);

                  if (maxPages <= 5) {
                    pageNum = i + 1;
                  } else if (current <= 3) {
                    pageNum = i + 1;
                  } else if (current >= maxPages - 2) {
                    pageNum = maxPages - 4 + i;
                  } else {
                    pageNum = current - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum, pageSize)}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        current === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
            </div>

            <button
              onClick={() => onPageChange(current + 1, pageSize)}
              disabled={current >= Math.max(1, totalPages)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pagination with info (legacy support)
const PaginationWithInfo = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onPageSizeChange,
  className = "",
  ...props
}) => {
  return (
    <Pagination
      current={currentPage}
      totalPages={totalPages}
      total={totalItems}
      pageSize={itemsPerPage}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      className={className}
      {...props}
    />
  );
};

// Legacy support - keep old API working
const LegacyPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = "",
  ...props
}) => {
  return (
    <Pagination
      current={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      showInfo={false}
      className={className}
      {...props}
    />
  );
};

Pagination.WithInfo = PaginationWithInfo;
Pagination.Legacy = LegacyPagination;

export default Pagination;
