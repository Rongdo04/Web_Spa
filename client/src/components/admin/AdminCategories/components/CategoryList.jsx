// components/admin/AdminCategories/components/CategoryList.jsx
import React from "react";
import { Card } from "../../../ui";
import { EmptyState } from "../../../ui";
import { TagsOutlined } from "@ant-design/icons";
import CategoryItem from "./CategoryItem";
import { Pagination } from "../../../ui";

const CategoryList = ({
  categories,
  onEdit,
  onDelete,
  pagination,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Danh sách danh mục
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Hiển thị {categories.length} danh mục
        </div>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          icon={<TagsOutlined />}
          title="Không có danh mục"
          description="Không tìm thấy danh mục nào phù hợp với bộ lọc"
        />
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pageSizeOptions={[5, 10, 20, 50]}
        infoText="Hiển thị {start}-{end} của {total} danh mục"
      />
    </Card>
  );
};

export default CategoryList;
