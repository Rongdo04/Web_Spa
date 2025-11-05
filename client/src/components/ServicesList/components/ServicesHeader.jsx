import React, { useState, useEffect } from "react";
import { Input, Button } from "../../ui";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

const ServicesHeader = ({ onSearch, searchQuery = "" }) => {
  const [search, setSearch] = useState(searchQuery);

  // Update local state when searchQuery prop changes
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    // Real-time search with debounce
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dịch vụ spa
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Khám phá các dịch vụ spa chuyên nghiệp và tìm kiếm dịch vụ phù hợp với
          bạn
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Tìm kiếm dịch vụ spa..."
            value={search}
            onChange={handleSearchChange}
            className="pr-20"
            icon={<SearchOutlined className="w-5 h-5 text-gray-400" />}
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <SearchOutlined className="mr-1" />
            Tìm kiếm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServicesHeader;
