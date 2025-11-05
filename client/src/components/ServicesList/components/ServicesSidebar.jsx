import React from "react";
import { Card, Button } from "../../ui";
import { Tree } from "antd";

const ServicesSidebar = ({
  filters,
  categories = [],
  onFilterChange,
  onClearFilters,
  onSearch,
}) => {
  // Build tree structure from flat categories array
  const buildCategoryTree = (flatCategories) => {
    const categoryMap = new Map();
    const rootCategories = [];

    // First pass: create map of all categories
    flatCategories.forEach((cat) => {
      categoryMap.set(cat.id, {
        ...cat,
        children: [],
        title: cat.name,
        key: cat.id,
        value: cat.name,
      });
    });

    // Second pass: build tree structure
    flatCategories.forEach((cat) => {
      if (cat.parentCategory) {
        const parent = categoryMap.get(cat.parentCategory);
        if (parent) {
          parent.children.push(categoryMap.get(cat.id));
        }
      } else {
        rootCategories.push(categoryMap.get(cat.id));
      }
    });

    // Sort by level and displayOrder
    const sortCategories = (categories) => {
      return categories.sort((a, b) => {
        if (a.level !== b.level) {
          return a.level - b.level;
        }
        return (a.displayOrder || 0) - (b.displayOrder || 0);
      });
    };

    // Sort root categories
    sortCategories(rootCategories);

    // Sort children recursively
    const sortChildren = (categories) => {
      categories.forEach((cat) => {
        if (cat.children && cat.children.length > 0) {
          sortCategories(cat.children);
          sortChildren(cat.children);
        }
      });
    };

    sortChildren(rootCategories);

    return rootCategories;
  };

  // Prepare tree data
  const treeData = [
    {
      title: "Tất cả",
      key: "all",
      value: "",
      children: buildCategoryTree(categories),
    },
  ];

  // Find key by category ID
  const findKeyByCategoryId = (nodes, categoryId) => {
    for (const node of nodes) {
      if (node.id === categoryId) {
        return node.key;
      }
      if (node.children) {
        const found = findKeyByCategoryId(node.children, categoryId);
        if (found) return found;
      }
    }
    return null;
  };

  // Get selected key based on current category filter
  const getSelectedKey = () => {
    if (!filters.category) return "all";
    return findKeyByCategoryId(treeData, filters.category) || "all";
  };

  const priceRanges = [
    { label: "Tất cả", value: "all" },
    { label: "Dưới 500k", value: "0-500000" },
    { label: "500k - 1M", value: "500000-1000000" },
    { label: "1M - 2M", value: "1000000-2000000" },
    { label: "Trên 2M", value: "2000000-9999999" },
  ];

  const durations = [
    { label: "Tất cả", value: "all" },
    { label: "Dưới 60 phút", value: "0-60" },
    { label: "60 - 90 phút", value: "60-90" },
    { label: "90 - 120 phút", value: "90-120" },
    { label: "Trên 120 phút", value: "120-999" },
  ];

  const handleCategoryChange = (category) => {
    onFilterChange("category", category === "Tất cả" ? "" : category);
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange("priceRange", priceRange);
  };

  const handleDurationChange = (duration) => {
    onFilterChange("duration", duration);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.priceRange !== "all") count++;
    if (filters.duration !== "all") count++;
    return count;
  };

  return (
    <div className="lg:w-80 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Bộ lọc
        </h3>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-emerald-600 dark:text-emerald-400"
          >
            Xóa tất cả
          </Button>
        )}
      </div>

      {/* Categories */}
      <Card>
        <Card.Header>
          <Card.Title>Danh mục</Card.Title>
        </Card.Header>
        <Card.Content>
          <Tree
            treeData={treeData}
            selectedKeys={[getSelectedKey()]}
            onSelect={(selectedKeys, info) => {
              if (selectedKeys.length > 0) {
                const selectedKey = selectedKeys[0];
                if (selectedKey === "all") {
                  handleCategoryChange("");
                } else {
                  // Find the category ID by key
                  const findCategoryId = (nodes, key) => {
                    for (const node of nodes) {
                      if (node.key === key) {
                        return node.id;
                      }
                      if (node.children) {
                        const found = findCategoryId(node.children, key);
                        if (found) return found;
                      }
                    }
                    return null;
                  };
                  const categoryId = findCategoryId(treeData, selectedKey);
                  if (categoryId) {
                    handleCategoryChange(categoryId);
                  }
                }
              }
            }}
            showLine={true}
            showIcon={false}
            className="max-h-64 overflow-y-auto"
            style={{
              background: "transparent",
              fontSize: "14px",
            }}
            titleRender={(nodeData) => (
              <span
                className={`text-sm ${
                  filters.category === nodeData.id ||
                  (nodeData.key === "all" && !filters.category)
                    ? "text-emerald-600 font-medium"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {nodeData.title}
              </span>
            )}
          />
        </Card.Content>
      </Card>

      {/* Price Range */}
      <Card>
        <Card.Header>
          <Card.Title>Khoảng giá</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === range.value}
                onChange={() => handlePriceChange(range.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {range.label}
              </span>
            </label>
          ))}
        </Card.Content>
      </Card>

      {/* Duration */}
      <Card>
        <Card.Header>
          <Card.Title>Thời lượng</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-2">
          {durations.map((duration) => (
            <label
              key={duration.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="duration"
                checked={filters.duration === duration.value}
                onChange={() => handleDurationChange(duration.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {duration.label}
              </span>
            </label>
          ))}
        </Card.Content>
      </Card>

      {/* Rating */}
    </div>
  );
};

export default ServicesSidebar;
