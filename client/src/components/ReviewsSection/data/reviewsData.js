// Mock data for reviews
export const mockReviews = [
  {
    id: "review001",
    serviceId: "service001",
    bookingId: "SPA12345678",
    user: {
      name: "Nguyễn Thị Lan",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    rating: 5,
    comment:
      "Dịch vụ massage rất tuyệt vời! Nhân viên chuyên nghiệp, không gian thư giãn. Tôi sẽ quay lại lần sau.",
    tags: ["Chất lượng tốt", "Nhân viên thân thiện", "Sẽ quay lại"],
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    ],
    isVerified: true,
    helpfulCount: 12,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "review002",
    serviceId: "service001",
    bookingId: "SPA12345679",
    user: {
      name: "Trần Văn Minh",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    rating: 4,
    comment:
      "Massage thư giãn rất tốt, nhân viên có kỹ thuật chuyên nghiệp. Chỉ có điều giá hơi cao một chút.",
    tags: ["Chất lượng tốt", "Dịch vụ chuyên nghiệp"],
    images: [],
    isVerified: true,
    helpfulCount: 8,
    createdAt: "2024-01-12T14:20:00Z",
  },
  {
    id: "review003",
    serviceId: "service002",
    bookingId: "SPA12345680",
    user: {
      name: "Lê Thị Hương",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    rating: 5,
    comment:
      "Facial treatment tuyệt vời! Da mặt mình sáng và mịn hơn rất nhiều sau khi làm. Chuyên viên tư vấn rất kỹ lưỡng.",
    tags: ["Chất lượng tốt", "Dịch vụ chuyên nghiệp", "Sẽ quay lại"],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    ],
    isVerified: true,
    helpfulCount: 15,
    createdAt: "2024-01-10T16:45:00Z",
  },
  {
    id: "review004",
    serviceId: "service003",
    bookingId: "SPA12345681",
    user: {
      name: "Phạm Văn Đức",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    rating: 3,
    comment:
      "Body treatment ổn, nhưng thời gian chờ hơi lâu. Nhân viên thân thiện nhưng có vẻ thiếu kinh nghiệm.",
    tags: ["Nhân viên thân thiện"],
    images: [],
    isVerified: false,
    helpfulCount: 3,
    createdAt: "2024-01-08T11:15:00Z",
  },
  {
    id: "review005",
    serviceId: "service001",
    bookingId: "SPA12345682",
    user: {
      name: "Hoàng Thị Mai",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    rating: 5,
    comment:
      "Massage đá nóng rất thư giãn! Cơ thể mình cảm thấy nhẹ nhàng và thoải mái hơn rất nhiều. Chắc chắn sẽ quay lại!",
    tags: ["Chất lượng tốt", "Sẽ quay lại", "Dịch vụ chuyên nghiệp"],
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
    ],
    isVerified: true,
    helpfulCount: 20,
    createdAt: "2024-01-05T09:30:00Z",
  },
  {
    id: "review006",
    serviceId: "service004",
    bookingId: "SPA12345683",
    user: {
      name: "Vũ Văn Nam",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    rating: 4,
    comment:
      "Nail art đẹp lắm! Chuyên viên có tay nghề cao, thiết kế theo đúng ý mình. Chỉ có điều thời gian làm hơi lâu.",
    tags: ["Chất lượng tốt", "Dịch vụ chuyên nghiệp"],
    images: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
    ],
    isVerified: true,
    helpfulCount: 7,
    createdAt: "2024-01-03T15:20:00Z",
  },
  {
    id: "review007",
    serviceId: "service002",
    bookingId: "SPA12345684",
    user: {
      name: "Đặng Thị Hương",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
    rating: 2,
    comment:
      "Facial treatment không như mong đợi. Da mặt mình bị kích ứng sau khi làm. Có lẽ không phù hợp với loại da của mình.",
    tags: [],
    images: [],
    isVerified: true,
    helpfulCount: 1,
    createdAt: "2024-01-01T13:45:00Z",
  },
  {
    id: "review008",
    serviceId: "service005",
    bookingId: "SPA12345685",
    user: {
      name: "Nguyễn Văn An",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    rating: 5,
    comment:
      "Spa package rất đáng giá! Được trải nghiệm nhiều dịch vụ trong một lần. Không gian spa rất đẹp và thư giãn.",
    tags: ["Chất lượng tốt", "Không gian đẹp", "Giá cả hợp lý", "Sẽ quay lại"],
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    ],
    isVerified: true,
    helpfulCount: 18,
    createdAt: "2023-12-28T16:30:00Z",
  },
  {
    id: "review009",
    serviceId: "service001",
    bookingId: "SPA12345686",
    user: {
      name: "Lê Thị Thu",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    rating: 4,
    comment:
      "Massage thư giãn tốt, nhân viên có kỹ thuật. Chỉ có điều âm thanh từ bên ngoài hơi ồn, ảnh hưởng đến sự thư giãn.",
    tags: ["Chất lượng tốt", "Dịch vụ chuyên nghiệp"],
    images: [],
    isVerified: true,
    helpfulCount: 5,
    createdAt: "2023-12-25T10:15:00Z",
  },
  {
    id: "review010",
    serviceId: "service003",
    bookingId: "SPA12345687",
    user: {
      name: "Trần Thị Nga",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    rating: 5,
    comment:
      "Body treatment với tinh dầu rất thư giãn! Mùi hương dễ chịu, da mình mịn màng hơn. Chuyên viên tư vấn rất nhiệt tình.",
    tags: ["Chất lượng tốt", "Nhân viên thân thiện", "Sẽ quay lại"],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    ],
    isVerified: true,
    helpfulCount: 11,
    createdAt: "2023-12-22T14:00:00Z",
  },
];
