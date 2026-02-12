export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  source: string;
  sourceUrl: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "mini-pc-thay-the-desktop",
    title: "Mini PC có thể thay thế hoàn toàn máy tính để bàn?",
    excerpt: "Với sức mạnh xử lý ngày càng tăng, Mini PC đang trở thành lựa chọn hàng đầu cho văn phòng và gia đình.",
    image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=600&h=400&fit=crop",
    date: "2026-02-05",
    source: "TechViet",
    sourceUrl: "https://example.com/mini-pc-thay-the-desktop",
    category: "Công nghệ",
  },
  {
    slug: "huong-dan-chon-mini-pc-2026",
    title: "Hướng dẫn chọn Mini PC phù hợp năm 2026",
    excerpt: "Từ nhu cầu văn phòng đến lập trình, đây là cách chọn Mini PC phù hợp với ngân sách của bạn.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    date: "2026-01-28",
    source: "PCWorld VN",
    sourceUrl: "https://example.com/huong-dan-chon-mini-pc",
    category: "Hướng dẫn",
  },
  {
    slug: "mac-mini-m4-danh-gia",
    title: "Đánh giá Mac Mini M4: Hiệu năng vượt trội trong thân hình nhỏ gọn",
    excerpt: "Apple tiếp tục gây ấn tượng với chip M4, biến Mac Mini thành cỗ máy sáng tạo nội dung mạnh mẽ.",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=400&fit=crop",
    date: "2026-01-20",
    source: "Apple Insider VN",
    sourceUrl: "https://example.com/mac-mini-m4-review",
    category: "Đánh giá",
  },
  {
    slug: "linux-mini-pc-lap-trinh",
    title: "Tại sao lập trình viên nên dùng Mini PC Linux?",
    excerpt: "Mini PC chạy Linux mang lại môi trường phát triển linh hoạt, nhẹ nhàng và tùy biến cao.",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&h=400&fit=crop",
    date: "2026-01-15",
    source: "Dev.to VN",
    sourceUrl: "https://example.com/linux-mini-pc-dev",
    category: "Lập trình",
  },
  {
    slug: "tu-dong-hoa-voi-mini-pc",
    title: "Tự động hóa công việc với Mini PC: Bắt đầu từ đâu?",
    excerpt: "Khám phá cách sử dụng Mini PC để tự động hóa các tác vụ lặp đi lặp lại trong doanh nghiệp.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop",
    date: "2026-01-10",
    source: "Operis Blog",
    sourceUrl: "https://example.com/tu-dong-hoa-mini-pc",
    category: "Tự động hóa",
  },
  {
    slug: "so-sanh-mini-pc-vs-laptop",
    title: "Mini PC vs Laptop: Đâu là lựa chọn tốt hơn cho bạn?",
    excerpt: "So sánh chi tiết ưu nhược điểm của Mini PC và Laptop để giúp bạn đưa ra quyết định đúng đắn.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    date: "2026-01-05",
    source: "TechViet",
    sourceUrl: "https://example.com/mini-pc-vs-laptop",
    category: "So sánh",
  },
];
