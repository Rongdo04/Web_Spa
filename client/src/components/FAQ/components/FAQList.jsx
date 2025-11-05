import React, { useState } from "react";
import { Card } from "../../ui";
import {
  QuestionCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";

const FAQList = ({ faqs, searchQuery }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  if (faqs.length === 0) {
    return (
      <Card>
        <Card.Content className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            <QuestionCircleOutlined className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Không tìm thấy câu hỏi nào
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {searchQuery
              ? "Hãy thử tìm kiếm với từ khóa khác"
              : "Chưa có câu hỏi nào trong danh mục này"}
          </p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Card key={index} className="overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full text-left hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 pr-4">
                <QuestionCircleOutlined className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
              </div>
              <div className="flex-shrink-0">
                {openItems.has(index) ? (
                  <MinusOutlined className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <PlusOutlined className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </div>
            </div>
          </button>

          {openItems.has(index) && (
            <div className="px-6 pb-6">
              <div className="border-t border-gray-200 dark:border-neutral-700 pt-4">
                <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
                {faq.tags && faq.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {faq.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default FAQList;
