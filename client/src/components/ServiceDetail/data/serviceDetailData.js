// Mock data for service detail
export const serviceDetailData = {
  id: 1,
  name: "Massage Thư Giãn Toàn Thân",
  category: "Massage",
  description:
    "Massage toàn thân giúp thư giãn cơ bắp và tinh thần, giảm stress hiệu quả. Sử dụng kỹ thuật massage chuyên nghiệp kết hợp với tinh dầu thiên nhiên cao cấp.",
  longDescription: `
    <p>Dịch vụ massage toàn thân của chúng tôi được thiết kế để mang lại trải nghiệm thư giãn tuyệt vời nhất cho bạn. Với kỹ thuật massage chuyên nghiệp được đào tạo bài bản, chúng tôi sẽ giúp bạn:</p>
    <ul>
      <li>Giảm căng thẳng và stress hiệu quả</li>
      <li>Cải thiện tuần hoàn máu và trao đổi chất</li>
      <li>Thư giãn cơ bắp, giảm đau nhức</li>
      <li>Tăng cường hệ miễn dịch</li>
      <li>Cải thiện chất lượng giấc ngủ</li>
    </ul>
    <p>Chúng tôi sử dụng tinh dầu thiên nhiên cao cấp được nhập khẩu từ các thương hiệu uy tín, đảm bảo an toàn và hiệu quả tối đa.</p>
  `,
  duration: 60,
  price: 450000,
  originalPrice: 550000,
  rating: 4.8,
  reviewCount: 124,
  images: [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
  ],
  benefits: [
    "Giảm stress và căng thẳng",
    "Cải thiện tuần hoàn máu",
    "Thư giãn cơ bắp toàn thân",
    "Tăng cường hệ miễn dịch",
    "Cải thiện chất lượng giấc ngủ",
  ],
  tags: ["Relaxing", "Stress Relief", "Full Body", "Aromatherapy"],
  staff: [
    {
      id: 1,
      name: "Nguyễn Thị Minh Anh",
      specialty: "Massage Thư Giãn",
      experience: "5 năm",
      rating: 4.9,
      reviewCount: 89,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      isAvailable: true,
    },
    {
      id: 2,
      name: "Trần Văn Hùng",
      specialty: "Massage Thể Thao",
      experience: "7 năm",
      rating: 4.8,
      reviewCount: 156,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      isAvailable: true,
    },
    {
      id: 3,
      name: "Lê Thị Thu Hà",
      specialty: "Massage Aromatherapy",
      experience: "4 năm",
      rating: 4.7,
      reviewCount: 67,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      isAvailable: false,
    },
  ],
  addOns: [
    {
      id: 1,
      name: "Tinh dầu Lavender",
      description: "Tinh dầu lavender giúp thư giãn sâu",
      price: 50000,
      duration: 0,
    },
    {
      id: 2,
      name: "Tinh dầu Eucalyptus",
      description: "Tinh dầu bạch đàn giúp thông mũi, dễ thở",
      price: 50000,
      duration: 0,
    },
    {
      id: 3,
      name: "Mặt nạ dưỡng da",
      description: "Mặt nạ dưỡng da cao cấp sau massage",
      price: 100000,
      duration: 15,
    },
    {
      id: 4,
      name: "Massage đầu và vai",
      description: "Thêm 15 phút massage đầu và vai",
      price: 80000,
      duration: 15,
    },
  ],
  faqs: [
    {
      id: 1,
      question: "Massage có phù hợp với phụ nữ mang thai không?",
      answer:
        "Chúng tôi có dịch vụ massage đặc biệt dành cho phụ nữ mang thai với kỹ thuật nhẹ nhàng và an toàn. Vui lòng thông báo trước khi đặt lịch.",
    },
    {
      id: 2,
      question: "Có cần chuẩn bị gì trước khi massage không?",
      answer:
        "Bạn nên tắm sạch trước khi massage và tránh ăn no trong vòng 2 giờ. Chúng tôi sẽ cung cấp khăn tắm và đồ lót dùng một lần.",
    },
    {
      id: 3,
      question: "Massage có đau không?",
      answer:
        "Massage của chúng tôi được thiết kế để thư giãn, không gây đau. Chuyên viên sẽ điều chỉnh lực massage theo yêu cầu của bạn.",
    },
    {
      id: 4,
      question: "Có thể hủy hoặc đổi lịch không?",
      answer:
        "Bạn có thể hủy hoặc đổi lịch trước 24 giờ mà không mất phí. Hủy trong vòng 24 giờ sẽ tính 50% phí dịch vụ.",
    },
  ],
  availability: {
    "2024-01-15": [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:00", available: false },
      { time: "14:00", available: true },
      { time: "15:00", available: true },
      { time: "16:00", available: true },
      { time: "17:00", available: false },
      { time: "18:00", available: true },
    ],
    "2024-01-16": [
      { time: "09:00", available: false },
      { time: "10:00", available: true },
      { time: "11:00", available: true },
      { time: "14:00", available: true },
      { time: "15:00", available: false },
      { time: "16:00", available: true },
      { time: "17:00", available: true },
      { time: "18:00", available: true },
    ],
    "2024-01-17": [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:00", available: true },
      { time: "14:00", available: false },
      { time: "15:00", available: true },
      { time: "16:00", available: true },
      { time: "17:00", available: true },
      { time: "18:00", available: false },
    ],
  },
};
