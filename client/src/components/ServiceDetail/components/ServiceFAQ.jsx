import React, { useState } from "react";
import { Card } from "../../ui";

const ServiceFAQ = ({ faqs }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Câu hỏi thường gặp
      </h3>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 pr-4">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedFAQ === faq.id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {expandedFAQ === faq.id && (
              <div className="px-4 pb-4 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed pt-4">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          Không tìm thấy câu trả lời?{" "}
          <button className="text-emerald-600 hover:text-emerald-700 font-medium">
            Liên hệ với chúng tôi
          </button>
        </p>
      </div>
    </Card>
  );
};

export default ServiceFAQ;
