// Mock data for FAQ
export const faqData = [
  // Booking FAQs
  {
    category: "booking",
    question: "Làm thế nào để đặt lịch spa?",
    answer:
      "Bạn có thể đặt lịch spa theo 3 cách: 1) Đặt online trên website, 2) Gọi hotline 1900 1234, 3) Đến trực tiếp chi nhánh. Chúng tôi khuyến khích đặt online để được ưu đãi tốt nhất.",
    tags: ["đặt lịch", "online", "hotline"],
  },
  {
    category: "booking",
    question: "Có thể đặt lịch trước bao lâu?",
    answer:
      "Bạn có thể đặt lịch trước tối đa 30 ngày. Đối với các dịch vụ cao cấp, chúng tôi khuyến khích đặt trước ít nhất 1 tuần để đảm bảo có slot trống.",
    tags: ["đặt trước", "30 ngày", "slot"],
  },
  {
    category: "booking",
    question: "Có thể thay đổi lịch hẹn không?",
    answer:
      "Có, bạn có thể thay đổi lịch hẹn tối thiểu 4 giờ trước giờ hẹn. Vui lòng liên hệ hotline hoặc chat Zalo để được hỗ trợ thay đổi lịch.",
    tags: ["thay đổi", "4 giờ", "hỗ trợ"],
  },
  {
    category: "booking",
    question: "Có cần đặt cọc khi đặt lịch không?",
    answer:
      "Đối với các dịch vụ có giá trị trên 1 triệu đồng, chúng tôi yêu cầu đặt cọc 30% giá trị dịch vụ. Các dịch vụ khác không cần đặt cọc.",
    tags: ["đặt cọc", "30%", "1 triệu"],
  },

  // Payment FAQs
  {
    category: "payment",
    question: "Các phương thức thanh toán nào được chấp nhận?",
    answer:
      "Chúng tôi chấp nhận thanh toán bằng: tiền mặt, thẻ ATM/Visa/Mastercard, chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay), và thanh toán trực tuyến qua website.",
    tags: ["thanh toán", "thẻ", "ví điện tử"],
  },
  {
    category: "payment",
    question: "Có được hoàn tiền không?",
    answer:
      "Chúng tôi có chính sách hoàn tiền 100% nếu hủy lịch trước 24 giờ. Nếu hủy trong vòng 24 giờ, sẽ hoàn 50% giá trị dịch vụ.",
    tags: ["hoàn tiền", "100%", "24 giờ"],
  },
  {
    category: "payment",
    question: "Có chấp nhận thanh toán trả góp không?",
    answer:
      "Hiện tại chúng tôi chưa hỗ trợ thanh toán trả góp. Tuy nhiên, chúng tôi có các gói combo với giá ưu đãi để phù hợp với ngân sách của bạn.",
    tags: ["trả góp", "combo", "ưu đãi"],
  },

  // Cancellation FAQs
  {
    category: "cancellation",
    question: "Chính sách hủy lịch như thế nào?",
    answer:
      "Hủy trước 24 giờ: hoàn tiền 100%. Hủy trong vòng 24 giờ: hoàn tiền 50%. Hủy trong vòng 4 giờ: không hoàn tiền. Trường hợp khẩn cấp sẽ được xem xét riêng.",
    tags: ["hủy lịch", "24 giờ", "khẩn cấp"],
  },
  {
    category: "cancellation",
    question: "Có thể hủy lịch online không?",
    answer:
      "Có, bạn có thể hủy lịch online thông qua tài khoản cá nhân trên website hoặc app. Nếu gặp khó khăn, vui lòng liên hệ hotline để được hỗ trợ.",
    tags: ["hủy online", "tài khoản", "app"],
  },
  {
    category: "cancellation",
    question: "Làm thế nào khi nhân viên không đến đúng giờ?",
    answer:
      "Nếu nhân viên không đến đúng giờ, chúng tôi sẽ bồi thường 20% giá trị dịch vụ và sắp xếp lại lịch hẹn mới. Vui lòng liên hệ ngay hotline để được hỗ trợ.",
    tags: ["trễ giờ", "bồi thường", "20%"],
  },

  // Services FAQs
  {
    category: "services",
    question: "Có những dịch vụ nào tại spa?",
    answer:
      "Chúng tôi cung cấp đầy đủ các dịch vụ: Massage (thư giãn, đá nóng, tinh dầu), Facial (chăm sóc da, trị mụn), Body Treatment (tẩy tế bào chết, wrap), Nail Art, Hair Care, và Wellness (yoga, thiền).",
    tags: ["dịch vụ", "massage", "facial", "wellness"],
  },
  {
    category: "services",
    question: "Có dịch vụ tại nhà không?",
    answer:
      "Có, chúng tôi cung cấp dịch vụ spa tại nhà cho các gói dịch vụ từ 2 triệu đồng trở lên. Phí dịch vụ tại nhà sẽ được tính thêm 200,000 VNĐ.",
    tags: ["tại nhà", "2 triệu", "phí dịch vụ"],
  },
  {
    category: "services",
    question: "Có dịch vụ cho nam giới không?",
    answer:
      "Có, chúng tôi có đầy đủ dịch vụ cho cả nam và nữ. Các dịch vụ phổ biến cho nam: massage thư giãn, facial chăm sóc da nam, body treatment, và nail care.",
    tags: ["nam giới", "massage", "facial nam"],
  },
  {
    category: "services",
    question: "Có dịch vụ cho trẻ em không?",
    answer:
      "Chúng tôi có dịch vụ chăm sóc da cho trẻ em từ 12 tuổi trở lên. Các dịch vụ bao gồm: facial nhẹ nhàng, nail art đơn giản, và massage thư giãn.",
    tags: ["trẻ em", "12 tuổi", "dịch vụ nhẹ"],
  },

  // General FAQs
  {
    category: "general",
    question: "Spa có mở cửa vào cuối tuần không?",
    answer:
      "Có, chúng tôi mở cửa 7 ngày/tuần từ 8:00 - 22:00. Cuối tuần thường đông khách nên chúng tôi khuyến khích đặt lịch trước.",
    tags: ["cuối tuần", "7 ngày", "8-22h"],
  },
  {
    category: "general",
    question: "Có chỗ để xe không?",
    answer:
      "Có, tất cả chi nhánh đều có bãi đỗ xe miễn phí cho khách hàng. Bãi đỗ xe có bảo vệ 24/7 và camera an ninh.",
    tags: ["đỗ xe", "miễn phí", "bảo vệ"],
  },
  {
    category: "general",
    question: "Có wifi miễn phí không?",
    answer:
      "Có, chúng tôi cung cấp wifi miễn phí tốc độ cao cho tất cả khách hàng. Mật khẩu wifi sẽ được cung cấp khi bạn đến spa.",
    tags: ["wifi", "miễn phí", "tốc độ cao"],
  },
  {
    category: "general",
    question: "Có thể mang theo người thân không?",
    answer:
      "Có, bạn có thể mang theo 1 người thân vào khu vực chờ. Tuy nhiên, khu vực massage và treatment chỉ dành cho khách hàng sử dụng dịch vụ.",
    tags: ["người thân", "khu vực chờ", "massage"],
  },
  {
    category: "general",
    question: "Có chương trình khách hàng thân thiết không?",
    answer:
      "Có, chúng tôi có chương trình VIP với nhiều ưu đãi: giảm giá 10-20%, ưu tiên đặt lịch, quà tặng sinh nhật, và các dịch vụ đặc biệt.",
    tags: ["VIP", "ưu đãi", "giảm giá", "sinh nhật"],
  },
];
