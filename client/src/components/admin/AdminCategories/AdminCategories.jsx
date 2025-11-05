// components/admin/AdminCategories/AdminCategories.jsx
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../ui";
import { LoadingSpinner } from "../../ui";
import { ErrorState } from "../../ui";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import adminCategoriesAPI from "../../../services/admin/adminCategoriesAPI";
import { CategoryForm, CategoryFilters, CategoryList } from "./components";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    level: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: null, // Sử dụng null thay vì ""
    displayOrder: 0,
    isActive: true,
  });

  // Load categories from API
  useEffect(() => {
    loadCategories();
  }, [pagination.current, pagination.pageSize, filters]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      // Map status values to backend format
      let isActiveValue = null;
      if (filters.status === "active") {
        isActiveValue = true;
      } else if (filters.status === "inactive") {
        isActiveValue = false;
      }

      const apiParams = {
        page: pagination.current,
        limit: pagination.pageSize,
        ...(filters.search &&
          filters.search.trim() && { search: filters.search.trim() }), // Trim search term
        ...(isActiveValue !== null && { isActive: isActiveValue }), // Map status to isActive
        ...(filters.level && { level: filters.level }), // Chỉ gửi level khi có giá trị
      };

      const response = await adminCategoriesAPI.list(apiParams);

      if (response.success) {
        const transformedCategories = (response.data.categories || []).map(
          (cat) => ({
            id: cat._id || cat.id,
            name: cat.name,
            description: cat.description,
            parentCategory: cat.parentCategory, // Giữ nguyên để xử lý trong handleEdit
            displayOrder: cat.displayOrder,
            isActive: cat.isActive,
            level: cat.level,
            serviceCount: cat.serviceCount || 0,
            slug: cat.slug,
            createdAt: cat.createdAt,
            updatedAt: cat.updatedAt,
          })
        );

        // Debug: Kiểm tra parent categories
        const parentCategories = transformedCategories.filter(
          (cat) => cat.level === 0
        );
        setCategories(transformedCategories);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pagination?.total || 0,
          totalPages: response.data.pagination?.pages || 0,
        }));
      } else {
        setError(response.message || "Không thể tải dữ liệu");
      }
    } catch (err) {
      setError("Lỗi khi tải dữ liệu danh mục");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Reset to page 1 when filters change
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      search: "",
      status: "",
      level: "",
    });
    // Reset to page 1 when clearing filters
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize,
    }));
  };

  const handlePageSizeChange = (current, size) => {
    setPagination((prev) => ({
      ...prev,
      current: 1, // Reset to first page when changing page size
      pageSize: size,
    }));
  };

  const handleAdd = async () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      parentCategory: null, // Sử dụng null thay vì ""
      displayOrder: 0,
      isActive: true,
    });

    // Load tất cả danh mục cấp 0 để hiển thị trong dropdown parent
    try {
      const parentResponse = await adminCategoriesAPI.list({
        level: "0",
        limit: 100,
      });

      if (parentResponse.success) {
        const parentCategories = (parentResponse.data.categories || []).map(
          (cat) => ({
            id: cat._id || cat.id,
            name: cat.name,
            description: cat.description,
            parentCategory: cat.parentCategory,
            displayOrder: cat.displayOrder,
            isActive: cat.isActive,
            level: cat.level,
            serviceCount: cat.serviceCount || 0,
            slug: cat.slug,
            createdAt: cat.createdAt,
            updatedAt: cat.updatedAt,
          })
        );

        setParentCategories(parentCategories);
      }
    } catch (error) {
      console.error("Error loading parent categories:", error);
    }

    setIsFormOpen(true);
  };

  const handleEdit = async (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      parentCategory:
        category.parentCategory?.id || category.parentCategory || null,
      displayOrder: category.displayOrder,
      isActive: category.isActive,
    });

    // Load tất cả danh mục cấp 0 để hiển thị trong dropdown parent
    try {
      const parentResponse = await adminCategoriesAPI.list({
        level: "0",
        limit: 100, // Load nhiều để đảm bảo có đủ
      });

      if (parentResponse.success) {
        const parentCategories = (parentResponse.data.categories || []).map(
          (cat) => ({
            id: cat._id || cat.id,
            name: cat.name,
            description: cat.description,
            parentCategory: cat.parentCategory,
            displayOrder: cat.displayOrder,
            isActive: cat.isActive,
            level: cat.level,
            serviceCount: cat.serviceCount || 0,
            slug: cat.slug,
            createdAt: cat.createdAt,
            updatedAt: cat.updatedAt,
          })
        );

        // Set parent categories vào state riêng
        setParentCategories(parentCategories);
      }
    } catch (error) {
      console.error("Error loading parent categories:", error);
    }

    setIsFormOpen(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await adminCategoriesAPI.delete(categoryId);
      if (response.success) {
        toast.success("Xóa danh mục thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        loadCategories();
      } else {
        const errorMessage =
          response.error || response.message || "Có lỗi xảy ra";
        toast.error(`Xóa danh mục thất bại: ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi xóa danh mục";
      toast.error(`Lỗi: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validation cơ bản
      if (!formData.name || formData.name.trim() === "") {
        toast.error("Tên danh mục không được để trống!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      // Tạo slug từ tên danh mục
      const slug = generateSlug(formData.name);

      if (!slug) {
        toast.error("Không thể tạo slug từ tên danh mục!", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      // Tạo dataToSubmit với slug, loại bỏ parentCategory rỗng
      const dataToSubmit = {
        name: formData.name,
        description: formData.description,
        displayOrder: formData.displayOrder,
        isActive: formData.isActive,
        slug: slug,
      };

      // Debug: Kiểm tra formData.parentCategory
      // Xử lý parentCategory: chỉ gửi khi có giá trị
      if (
        formData.parentCategory &&
        formData.parentCategory !== null &&
        formData.parentCategory !== "" &&
        formData.parentCategory.trim() !== ""
      ) {
        dataToSubmit.parentCategory = formData.parentCategory;
      } else {
      }
      // Không gửi trường parentCategory nếu rỗng (để tạo danh mục cha)

      let response;
      if (editingCategory) {
        response = await adminCategoriesAPI.update(
          editingCategory.id,
          dataToSubmit
        );
      } else {
        response = await adminCategoriesAPI.create(dataToSubmit);
      }

      if (response.success) {
        toast.success(
          editingCategory
            ? "Cập nhật danh mục thành công!"
            : "Tạo danh mục thành công!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setIsFormOpen(false);
        setEditingCategory(null);
        loadCategories();
      } else {
        const errorMessage =
          response.error || response.message || "Có lỗi xảy ra";
        toast.error(`Lưu danh mục thất bại: ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error saving category:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra khi lưu danh mục";
      toast.error(`Lỗi: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Hàm tạo slug từ tên danh mục
  const generateSlug = (name) => {
    if (!name) return "";

    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
      .replace(/[^a-z0-9\s-]/g, "") // Chỉ giữ chữ cái, số, khoảng trắng và dấu gạch ngang
      .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, "-") // Loại bỏ dấu gạch ngang liên tiếp
      .replace(/^-+|-+$/g, "") // Loại bỏ dấu gạch ngang ở đầu và cuối
      .trim();

    return slug;
  };

  // Test cases cho generateSlug (chỉ chạy trong development)
  if (process.env.NODE_ENV === "development") {
    // cham-soc-toc
    // facial-co-ban
    // massage-thu-gian
    // spa-wellness
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadCategories}
        retryText="Thử lại"
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quản lý danh mục
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý danh mục dịch vụ và cấu trúc phân cấp
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            disabled={loading}
          >
            <ReloadOutlined className="mr-1" />
            Làm mới
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            <PlusOutlined className="mr-1" />
            Thêm danh mục
          </Button>
        </div>
      </div>

      {/* Filters */}
      <CategoryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Categories List */}
      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Category Form Modal */}
      <CategoryForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        editingCategory={editingCategory}
        categories={parentCategories}
        loading={loading}
      />

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AdminCategories;
