// Services seeder - Mock data cho services
export let services = [
  {
    id: 1,
    name: "Massage thư giãn",
    category: 12, // Massage toàn thân
    duration: 60,
    price: 150000,
    description: "Massage toàn thân giúp thư giãn và giảm căng thẳng",
    addOns: [
      { id: 1, name: "Tinh dầu thơm", price: 50000 },
      { id: 2, name: "Đá nóng", price: 30000 },
    ],
    combo: [
      { id: 1, name: "Massage + Facial", price: 250000, originalPrice: 300000 },
    ],
    displayOrder: 1,
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: 2,
    name: "Facial chăm sóc da",
    category: 9, // Facial cơ bản
    duration: 90,
    price: 200000,
    description: "Chăm sóc da mặt chuyên sâu với công nghệ hiện đại",
    addOns: [
      { id: 3, name: "Mặt nạ collagen", price: 80000 },
      { id: 4, name: "Xông hơi mặt", price: 40000 },
    ],
    combo: [
      { id: 2, name: "Facial + Massage", price: 300000, originalPrice: 350000 },
    ],
    displayOrder: 2,
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-16T08:00:00Z",
    updatedAt: "2024-01-16T08:00:00Z",
  },
  {
    id: 3,
    name: "Cắt tóc & tạo kiểu",
    category: 6, // Cắt tóc
    duration: 45,
    price: 120000,
    description: "Cắt tóc và tạo kiểu theo yêu cầu",
    addOns: [
      { id: 5, name: "Gội đầu", price: 30000 },
      { id: 6, name: "Uốn/duỗi", price: 150000 },
    ],
    combo: [],
    displayOrder: 3,
    isActive: true,
    createdAt: "2024-01-17T08:00:00Z",
    updatedAt: "2024-01-17T08:00:00Z",
  },
  {
    id: 4,
    name: "Nhuộm tóc cao cấp",
    category: 7, // Nhuộm tóc
    duration: 120,
    price: 350000,
    description: "Nhuộm tóc với công nghệ cao cấp và màu sắc đa dạng",
    addOns: [
      { id: 7, name: "Tẩy tóc", price: 100000 },
      { id: 8, name: "Dưỡng tóc", price: 50000 },
    ],
    combo: [
      { id: 3, name: "Nhuộm + Cắt", price: 400000, originalPrice: 470000 },
    ],
    displayOrder: 4,
    isActive: true,
    createdAt: "2024-01-18T08:00:00Z",
    updatedAt: "2024-01-18T08:00:00Z",
  },
  {
    id: 5,
    name: "Uốn tóc tạo sóng",
    category: 8, // Uốn tóc
    duration: 180,
    price: 450000,
    description: "Uốn tóc tạo sóng tự nhiên và bền đẹp",
    addOns: [
      { id: 9, name: "Dưỡng tóc", price: 80000 },
      { id: 10, name: "Tạo kiểu", price: 60000 },
    ],
    combo: [],
    displayOrder: 5,
    isActive: true,
    createdAt: "2024-01-19T08:00:00Z",
    updatedAt: "2024-01-19T08:00:00Z",
  },
  {
    id: 6,
    name: "Facial cao cấp",
    category: 10, // Facial cao cấp
    duration: 120,
    price: 500000,
    description: "Facial cao cấp với công nghệ laser và serum đặc biệt",
    addOns: [
      { id: 11, name: "Laser trị mụn", price: 200000 },
      { id: 12, name: "Serum vitamin C", price: 150000 },
    ],
    combo: [
      { id: 4, name: "Facial + Massage", price: 600000, originalPrice: 650000 },
    ],
    displayOrder: 6,
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T08:00:00Z",
  },
  {
    id: 7,
    name: "Trị mụn chuyên sâu",
    category: 11, // Trị mụn
    duration: 90,
    price: 300000,
    description: "Trị mụn chuyên sâu với công nghệ hiện đại",
    addOns: [
      { id: 13, name: "Lột da hóa học", price: 100000 },
      { id: 14, name: "Mặt nạ đất sét", price: 50000 },
    ],
    combo: [],
    displayOrder: 7,
    isActive: true,
    createdAt: "2024-01-21T08:00:00Z",
    updatedAt: "2024-01-21T08:00:00Z",
  },
  {
    id: 8,
    name: "Massage chân thư giãn",
    category: 13, // Massage chân
    duration: 45,
    price: 100000,
    description: "Massage chân chuyên nghiệp giúp lưu thông máu",
    addOns: [
      { id: 15, name: "Ngâm chân thảo dược", price: 50000 },
      { id: 16, name: "Đá nóng chân", price: 30000 },
    ],
    combo: [
      {
        id: 5,
        name: "Massage chân + toàn thân",
        price: 200000,
        originalPrice: 250000,
      },
    ],
    displayOrder: 8,
    isActive: true,
    createdAt: "2024-01-22T08:00:00Z",
    updatedAt: "2024-01-22T08:00:00Z",
  },
  {
    id: 9,
    name: "Massage đá nóng",
    category: 14, // Massage đá nóng
    duration: 90,
    price: 250000,
    description: "Massage với đá nóng giúp thư giãn sâu",
    addOns: [
      { id: 17, name: "Tinh dầu thơm", price: 50000 },
      { id: 18, name: "Mặt nạ thư giãn", price: 80000 },
    ],
    combo: [],
    displayOrder: 9,
    isActive: true,
    createdAt: "2024-01-23T08:00:00Z",
    updatedAt: "2024-01-23T08:00:00Z",
  },
  {
    id: 10,
    name: "Manicure cơ bản",
    category: 15, // Manicure
    duration: 60,
    price: 80000,
    description: "Chăm sóc móng tay cơ bản",
    addOns: [
      { id: 19, name: "Sơn gel", price: 50000 },
      { id: 20, name: "Vẽ nail art", price: 100000 },
    ],
    combo: [
      {
        id: 6,
        name: "Manicure + Pedicure",
        price: 150000,
        originalPrice: 180000,
      },
    ],
    displayOrder: 10,
    isActive: true,
    createdAt: "2024-01-24T08:00:00Z",
    updatedAt: "2024-01-24T08:00:00Z",
  },
  {
    id: 11,
    name: "Pedicure spa",
    category: 16, // Pedicure
    duration: 75,
    price: 120000,
    description: "Chăm sóc móng chân spa cao cấp",
    addOns: [
      { id: 21, name: "Tẩy da chết", price: 40000 },
      { id: 22, name: "Massage chân", price: 60000 },
    ],
    combo: [],
    displayOrder: 11,
    isActive: true,
    createdAt: "2024-01-25T08:00:00Z",
    updatedAt: "2024-01-25T08:00:00Z",
  },
  {
    id: 12,
    name: "Nail art sáng tạo",
    category: 17, // Nail Art
    duration: 90,
    price: 150000,
    description: "Vẽ nail art sáng tạo và độc đáo",
    addOns: [
      { id: 23, name: "Đính đá", price: 80000 },
      { id: 24, name: "Vẽ 3D", price: 120000 },
    ],
    combo: [],
    displayOrder: 12,
    isActive: true,
    createdAt: "2024-01-26T08:00:00Z",
    updatedAt: "2024-01-26T08:00:00Z",
  },
  {
    id: 13,
    name: "Gói spa cơ bản",
    category: 18, // Gói spa cơ bản
    duration: 180,
    price: 600000,
    description: "Gói spa cơ bản bao gồm facial và massage",
    addOns: [
      { id: 25, name: "Tắm bùn", price: 100000 },
      { id: 26, name: "Xông hơi", price: 80000 },
    ],
    combo: [],
    displayOrder: 13,
    isActive: true,
    createdAt: "2024-01-27T08:00:00Z",
    updatedAt: "2024-01-27T08:00:00Z",
  },
  {
    id: 14,
    name: "Gói spa cao cấp",
    category: 19, // Gói spa cao cấp
    duration: 240,
    price: 1000000,
    description: "Gói spa cao cấp với nhiều dịch vụ chuyên sâu",
    addOns: [
      { id: 27, name: "Trị liệu bằng đá quý", price: 200000 },
      { id: 28, name: "Massage 4 tay", price: 300000 },
    ],
    combo: [],
    displayOrder: 14,
    isActive: true,
    createdAt: "2024-01-28T08:00:00Z",
    updatedAt: "2024-01-28T08:00:00Z",
  },
  {
    id: 15,
    name: "Detox & Thải độc",
    category: 20, // Detox & Thải độc
    duration: 120,
    price: 400000,
    description: "Liệu pháp detox và thải độc cơ thể",
    addOns: [
      { id: 29, name: "Uống nước detox", price: 50000 },
      { id: 30, name: "Massage detox", price: 150000 },
    ],
    combo: [],
    displayOrder: 15,
    isActive: true,
    createdAt: "2024-01-29T08:00:00Z",
    updatedAt: "2024-01-29T08:00:00Z",
  },
];

export const getServices = () => services;
export const setServices = (newServices) => {
  services = newServices;
};
