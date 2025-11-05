import React from "react";
import { Card } from "../../ui";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Chị Minh Anh",
      rating: 5,
      comment:
        "Dịch vụ massage tuyệt vời! Nhân viên chuyên nghiệp, không gian thư giãn. Sẽ quay lại lần nữa.",
      avatar:
        "https://dongphucsaigon.vn/wp-content/uploads/2025/08/dong-phuc-nhan-vien-spa-tham-my-vien-chuyen-nghiep-1.jpg",
    },
    {
      id: 2,
      name: "Chị Thị Nga",
      rating: 5,
      comment:
        "Facial treatment rất hiệu quả. Da mặt cải thiện rõ rệt sau 1 lần điều trị. Rất hài lòng!",
      avatar:
        "https://vjvietnam.com.vn/wp-content/uploads/2023/05/tieu-chuan-sac-dep-nguoi-han-quoc-6.jpg",
    },
    {
      id: 3,
      name: "Chị Thu Hà",
      rating: 5,
      comment:
        "Không gian spa rất đẹp và yên tĩnh. Nhân viên tư vấn nhiệt tình, giá cả hợp lý. Recommend!",
      avatar:
        "https://vjvietnam.com.vn/wp-content/uploads/2023/05/tieu-chuan-sac-dep-nguoi-han-quoc-10.jpg",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Những đánh giá chân thực từ khách hàng
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="text-center">
              <Card.Content className="p-8">
                <div className="flex justify-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Khách hàng VIP
                    </p>
                  </div>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
