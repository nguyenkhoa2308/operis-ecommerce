export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    title: "Operisbot",
    items: [
      {
        q: "Máy Mini PC có tốn điện không?",
        a: "Rất ít. Mini PC Operisbot tiêu thụ điện chỉ bằng 1/10 so với máy tính bàn thông thường, thiết kế để chạy 24/7 cực kỳ bền bỉ.",
      },
      {
        q: "Tôi có thể điều khiển Operisbot từ xa không?",
        a: 'Hoàn toàn được. Bạn có thể dùng điện thoại hoặc máy tính chính để điều khiển "bộ não" Operisbot đang đặt tại nhà hoặc văn phòng.',
      },
      {
        q: "Nếu tôi dùng hết Token tặng kèm thì sao?",
        a: "Bạn chỉ cần mua thêm các gói nạp linh hoạt (chỉ từ 200k). Không có phí duy trì hàng tháng bắt buộc trừ khi bạn dùng gói Không giới hạn.",
      },
      {
        q: "Hệ thống có bị khóa tài khoản Facebook/Shopee khi chạy bot không?",
        a: "Operisbot thao tác như người thật (Visual Automation), không can thiệp vào API ngầm nên độ an toàn cho tài khoản cao hơn hẳn các loại tool thông thường.",
      },
    ],
  },
  {
    title: "Sản phẩm & Đặt hàng",
    items: [
      {
        q: "Operisbot có gì khác biệt so với các giải pháp AI khác?",
        a: "Operisbot là Thiết bị Trợ lý AI Vật lý (AI Appliance) — tách rời bộ não AI ra khỏi máy tính cá nhân, tạo môi trường chuyên dụng và an toàn. Cắm là Chạy, không cần cài đặt phức tạp, tiết kiệm 70% chi phí so với thuê tài khoản AI lẻ.",
      },
      {
        q: "Tôi có thể đặt hàng online không?",
        a: "Có, bạn có thể đặt hàng trực tiếp trên website operis.vn. Chỉ cần chọn sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán.",
      },
      {
        q: "Có thể mua trả góp không?",
        a: "Hiện tại chúng tôi chưa hỗ trợ mua trả góp. Bạn có thể thanh toán bằng chuyển khoản ngân hàng hoặc COD.",
      },
      {
        q: "Sản phẩm có bảo hành không?",
        a: "Tất cả thiết bị Operisbot đều được bảo hành 24 tháng phần cứng. Phụ kiện đi kèm bảo hành 3 tháng. Hỗ trợ kỹ thuật phần mềm trọn đời.",
      },
    ],
  },
  {
    title: "Thanh toán",
    items: [
      {
        q: "Operis hỗ trợ những phương thức thanh toán nào?",
        a: "Chúng tôi hỗ trợ: chuyển khoản ngân hàng (VietQR), thanh toán khi nhận hàng (COD), và nạp token qua cổng thanh toán.",
      },
      {
        q: "Thanh toán chuyển khoản bao lâu thì được xác nhận?",
        a: "Giao dịch chuyển khoản thường được xác nhận trong vòng 5-15 phút. Nếu quá 30 phút chưa được xác nhận, vui lòng liên hệ hotline.",
      },
      {
        q: "Token là gì? Mua token để làm gì?",
        a: "Token là đơn vị năng lượng để Operisbot thực hiện các Workflow tự động hóa. Bạn nạp token theo nhu cầu — không có phí duy trì hàng tháng bắt buộc, tiết kiệm hơn 70% so với thuê tài khoản AI lẻ.",
      },
    ],
  },
  {
    title: "Vận chuyển & Giao hàng",
    items: [
      {
        q: "Thời gian giao hàng mất bao lâu?",
        a: "Nội thành TP.HCM và Hà Nội: 1-2 ngày. Các tỉnh thành khác: 3-5 ngày. Vùng sâu, vùng xa: 5-7 ngày.",
      },
      {
        q: "Phí vận chuyển là bao nhiêu?",
        a: "Giao tiêu chuẩn: 30.000đ (miễn phí cho đơn trên 2.000.000đ). Giao nhanh: 60.000đ (nội thành TP.HCM, Hà Nội).",
      },
      {
        q: "Tôi có thể theo dõi đơn hàng không?",
        a: "Có, bạn có thể theo dõi trạng thái đơn hàng tại trang Theo dõi đơn hàng hoặc trong mục Đơn hàng của tài khoản.",
      },
    ],
  },
  {
    title: "Đổi trả & Bảo hành",
    items: [
      {
        q: "Chính sách đổi trả như thế nào?",
        a: "Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên hộp, phụ kiện đầy đủ và có hóa đơn.",
      },
      {
        q: "Bảo hành tại đâu?",
        a: "Bảo hành tại cửa hàng Operis hoặc gửi qua đường bưu điện. Chi phí vận chuyển bảo hành do Operis chịu nếu lỗi từ nhà sản xuất.",
      },
      {
        q: "Hoàn tiền mất bao lâu?",
        a: "Sau khi yêu cầu hoàn tiền được duyệt, tiền sẽ được chuyển lại trong vòng 3-5 ngày làm việc.",
      },
    ],
  },
  {
    title: "Tài khoản & API",
    items: [
      {
        q: "Làm sao để tạo tài khoản?",
        a: "Truy cập trang Đăng ký, điền thông tin cá nhân và xác nhận email. Tài khoản sẽ được kích hoạt ngay lập tức.",
      },
      {
        q: "Quên mật khẩu thì làm sao?",
        a: "Nhấn 'Quên mật khẩu' tại trang đăng nhập, nhập email và làm theo hướng dẫn trong email để đặt lại mật khẩu.",
      },
      {
        q: "Operisbot hoạt động như thế nào?",
        a: "Operisbot chạy theo quy trình Workflow thông minh trên thiết bị Mini PC riêng biệt. Bạn chỉ cần cắm điện, kết nối mạng và chọn Workflow phù hợp. Mọi thao tác diễn ra trên thiết bị, máy tính cá nhân hoàn toàn không bị ảnh hưởng.",
      },
    ],
  },
];
