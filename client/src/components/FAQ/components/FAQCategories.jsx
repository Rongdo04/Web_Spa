import React from "react";
import { Card } from "../../ui";
import {
  AppstoreOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  CloseCircleOutlined,
  ToolOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const FAQCategories = ({ categories, selectedCategory, onCategoryChange }) => {
  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case "all":
        return <AppstoreOutlined className="w-4 h-4" />;
      case "booking":
        return <CalendarOutlined className="w-4 h-4" />;
      case "payment":
        return <CreditCardOutlined className="w-4 h-4" />;
      case "cancellation":
        return <CloseCircleOutlined className="w-4 h-4" />;
      case "services":
        return <ToolOutlined className="w-4 h-4" />;
      case "general":
        return <QuestionCircleOutlined className="w-4 h-4" />;
      default:
        return <QuestionCircleOutlined className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Danh mục</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getCategoryIcon(category.id)}
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {category.count}
              </span>
            </div>
          </button>
        ))}
      </Card.Content>
    </Card>
  );
};

export default FAQCategories;
