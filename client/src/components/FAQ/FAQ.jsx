import React, { useState } from "react";
import { PublicLayout } from "../layout";
import { FAQCategories, FAQList } from "./components";
import { faqData } from "./data/faqData";

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on category and search
  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", name: "Tất cả", count: faqData.length },
    {
      id: "booking",
      name: "Đặt lịch",
      count: faqData.filter((f) => f.category === "booking").length,
    },
    {
      id: "payment",
      name: "Thanh toán",
      count: faqData.filter((f) => f.category === "payment").length,
    },
    {
      id: "cancellation",
      name: "Chính sách hủy",
      count: faqData.filter((f) => f.category === "cancellation").length,
    },
    {
      id: "services",
      name: "Dịch vụ",
      count: faqData.filter((f) => f.category === "services").length,
    },
    {
      id: "general",
      name: "Chung",
      count: faqData.filter((f) => f.category === "general").length,
    },
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Câu hỏi thường gặp
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ spa của
              chúng tôi
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 dark:text-white bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories Sidebar */}
            <div className="lg:w-80">
              <FAQCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* FAQ List */}
            <div className="flex-1">
              <FAQList faqs={filteredFAQs} searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default FAQ;
