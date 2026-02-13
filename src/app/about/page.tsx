import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Plug,
  Workflow,
  Check,
  X,
  ShoppingCart,
  Megaphone,
  TrendingUp,
  Building2,
  Sparkles,
  Zap,
  MessageSquare,
  Palette,
  Calculator,
} from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { ConcentricCircles, DotGrid } from "@/components/ui/decorative-pattern";

const stats = [
  { value: "20+", label: "Thiết bị AI sẵn có", color: "text-sky" },
  { value: "70%", label: "Tiết kiệm chi phí", color: "text-emerald" },
  { value: "24/7", label: "Hoạt động liên tục", color: "text-violet" },
  { value: "24 th", label: "Bảo hành chính hãng", color: "text-amber" },
];

/* "Tam trụ" giá trị cốt lõi của Operisbot */
const pillars = [
  {
    icon: ShieldCheck,
    title: "An toàn vật lý (Hardware Sandbox)",
    desc: 'Mọi thao tác của Bot diễn ra trên Mini PC riêng. Dữ liệu cá nhân, mật khẩu, tài chính trên máy tính chính của bạn hoàn toàn "vô hình" trước AI.',
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
  {
    icon: Plug,
    title: "Cắm là chạy (Zero Config)",
    desc: "Không cần cài đặt môi trường Python, không cần thuê Proxy phức tạp, không cần mua tài khoản AI 5-7 triệu/tháng. Mọi thứ đã nằm trong chiếc hộp nhỏ gọn.",
    color: "text-sky",
    bg: "bg-sky/10",
  },
  {
    icon: Workflow,
    title: "Workflow thông minh",
    desc: "Thay vì chat vu vơ, Operisbot chạy theo quy trình (Workflow). Điều này giúp tiết kiệm Token gấp 10 lần và đạt độ chính xác 100% trong công việc.",
    color: "text-violet",
    bg: "bg-violet/10",
  },
];

/* Bảng so sánh ROI: AI truyền thống vs Operisbot */
const comparisonRows = [
  {
    label: "Bảo mật",
    traditional: "Nguy cơ lộ Cookie/Data trên máy chính",
    operis: "Cách ly hoàn toàn trên Mini PC",
  },
  {
    label: "Chi phí hàng tháng",
    traditional: "20-50$/tháng cho nhiều loại tài khoản",
    operis: "Chỉ nạp Token theo nhu cầu (Rẻ hơn 70%)",
  },
  {
    label: "Sự tiện lợi",
    traditional: "Phải bật máy, tốn RAM, lag máy",
    operis: "Chạy độc lập, máy chính tắt bot vẫn làm",
  },
  {
    label: "Kỹ thuật",
    traditional: "Cần biết cài đặt, quản lý API",
    operis: "Plug & Play (Cắm là chạy)",
  },
];

/* Đối tượng khách hàng & kịch bản chi tiết */
const audiences = [
  {
    icon: ShoppingCart,
    title: "Kinh doanh Online & E-Commerce",
    color: "text-sky",
    bg: "bg-sky/10",
    arrow: "text-sky",
    scenarios: [
      "Bot quét giá 10 đối thủ mỗi giờ trên Shopee, TikTok Shop, Amazon — cảnh báo qua Zalo nếu đối thủ giảm giá quá 5%.",
      "AI đọc đánh giá 1-2 sao: lỗi vận chuyển → tự nhắn xin lỗi + tặng mã giảm giá; lỗi sản phẩm → báo cáo chủ shop ngay.",
      "Nạp 1 ảnh + mô tả → Bot đăng lên Facebook, Instagram, TikTok, Shopee Feed tuần tự như người thật.",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing & Xây dựng cộng đồng",
    color: "text-violet",
    bg: "bg-violet/10",
    arrow: "text-violet",
    scenarios: [
      'Bot vào hội nhóm, đọc bài có từ khóa "Cần tư vấn", bình luận chia sẻ rồi khéo léo nhắc đến sản phẩm — không spam, không bị khóa.',
      'Chạy 50-100 tài khoản Social cùng lúc, mỗi tài khoản một "vân tay trình duyệt" riêng, tự Like/Share tạo hiệu ứng đám đông.',
      "Quét Group đối thủ, lấy thông tin người hay tương tác — lưu danh sách tiềm năng cho Sale chăm sóc.",
    ],
  },
  {
    icon: TrendingUp,
    title: "Đầu tư & Tài chính",
    color: "text-emerald",
    bg: "bg-emerald/10",
    arrow: "text-emerald",
    scenarios: [
      "Bot quét hàng trăm trang tin (Bloomberg, Reuters, hội nhóm kín) — sáng 7h gửi bản tin tóm tắt qua Telegram.",
      "Canh nhà đất giá tốt trên Batdongsan, Chotot — thông báo ngay giây thứ 10 khi có tin mới phù hợp.",
    ],
  },
  {
    icon: Building2,
    title: "Quản trị Doanh nghiệp & Nhân sự",
    color: "text-amber",
    bg: "bg-amber/10",
    arrow: "text-amber",
    scenarios: [
      'Bot tải CV hàng loạt, AI so sánh với JD — xuất "Ứng viên A - 90% phù hợp", tự gửi email hẹn phỏng vấn.',
      "Mở PDF hóa đơn từ email, tự nhập liệu vào phần mềm kế toán hoặc Google Sheet — không sai sót, không nhầm lẫn.",
    ],
  },
  {
    icon: Sparkles,
    title: "Cá nhân & Power User",
    color: "text-rose",
    bg: "bg-rose/10",
    arrow: "text-rose",
    scenarios: [
      "Săn vé máy bay giá rẻ, đặt chỗ nhà hàng hot, săn giày Limited — Bot canh giờ, tự điền thông tin và thanh toán.",
      "Gửi Bot 1 video YouTube 2 tiếng hoặc PDF 100 trang — nhận bản ghi chú tóm tắt những ý chính.",
    ],
  },
];

/* Hệ sinh thái Mini-tools tương lai */
const miniTools = [
  {
    icon: MessageSquare,
    name: "Operis-Zalo",
    desc: "Tự động gửi tin nhắn chăm sóc khách hàng theo danh sách.",
    color: "text-violet",
    bg: "bg-violet/10",
  },
  {
    icon: Palette,
    name: "Operis-Canva",
    desc: "Tự động tạo hàng loạt ảnh quảng cáo dựa trên tên sản phẩm.",
    color: "text-rose",
    bg: "bg-rose/10",
  },
  {
    icon: Calculator,
    name: "Operis-Tax",
    desc: "Tự động tính toán thuế TNCN/TNDN từ lịch sử giao dịch.",
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
];

const timeline = [
  {
    year: "01/2026",
    title: "Khởi đầu",
    desc: "Operis ra đời từ ý tưởng của Lê Tiến Hùng: giúp mọi người tiếp cận tự động hóa AI dễ dàng hơn thông qua thiết bị chuyên dụng.",
    color: "bg-sky",
  },
  {
    year: "02/2026",
    title: "Ra mắt sản phẩm",
    desc: "Hoàn thiện 2 gói Operisbot Cá nhân, ra mắt gói Doanh nghiệp (Tùy biến), website và hệ thống Workflow đầu tiên.",
    color: "bg-violet",
  },
  {
    year: "Q2/2026",
    title: "Mở rộng",
    desc: "Phát triển kho Mini-tools ngành (BĐS, E-commerce, Tuyển dụng). Mở rộng hệ sinh thái đối tác.",
    color: "bg-emerald",
  },
];

const team = [
  {
    name: "Lê Tiến Hùng",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Trần Thị Lan",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
  },
  {
    name: "Lê Văn Hùng",
    role: "Trưởng phòng Kỹ thuật",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
  {
    name: "Phạm Ngọc Mai",
    role: "Trưởng phòng CSKH",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="GIỚI THIỆU"
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Giới thiệu" },
        ]}
      />

      {/* Câu chuyện */}
      <section className="max-w-7xl mx-auto px-4 py-16 relative overflow-hidden">
        <ConcentricCircles
          className="right-[-200px] top-[-100px]"
          size={500}
          color="#8b5cf6"
          opacity={0.04}
        />
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex-1 relative aspect-[4/3] w-full rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=500&fit=crop"
              alt="Về Operis"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              VỀ CHÚNG TÔI
            </p>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              OPERISBOT LÀ GÌ?
            </h2>
            <p className="text-base font-medium text-foreground leading-relaxed mb-4">
              Operisbot không phải là một chatbot. Đây là một{" "}
              <span className="text-primary font-semibold">
                Thiết bị Trợ lý Vật lý (AI Appliance)
              </span>
              .
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Chúng tôi tách rời bộ não AI ra khỏi máy tính cá nhân của bạn để
              tạo ra một môi trường làm việc chuyên dụng, an toàn và hoạt động
              bền bỉ 24/7. Mọi sản phẩm Operis đều được cài đặt sẵn phần mềm tự
              động hóa — bạn chỉ cần cắm điện và bắt đầu.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Từ cá nhân đến doanh nghiệp, Operisbot giúp bạn bảo mật tuyệt đối
              dữ liệu, đạt hiệu suất vô hạn và tối ưu chi phí — tất cả trong một
              chiếc hộp nhỏ gọn.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-primary text-white text-sm tracking-widest px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
            >
              XEM CỬA HÀNG
            </Link>
          </div>
        </div>
      </section>

      {/* Số liệu */}
      <section className="bg-gradient-testimonial relative overflow-hidden">
        <DotGrid
          className="right-0 bottom-0"
          color="#6b8fb5"
          opacity={0.06}
          cols={10}
          rows={6}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-14 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className={`text-3xl md:text-4xl font-semibold ${s.color}`}>
                  {s.value}
                </p>
                <p className="text-base text-muted-foreground mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sứ mệnh & Tầm nhìn */}
      <section className="max-w-7xl mx-auto px-4 py-16 relative overflow-hidden">
        <ConcentricCircles
          className="left-[-150px] bottom-[-150px]"
          size={400}
          color="#10b981"
          opacity={0.04}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex-1">
              <p className="text-sm tracking-widest text-primary font-medium mb-3">
                SỨ MỆNH
              </p>
              <h3 className="text-2xl font-semibold tracking-tight mb-3">
                Bảo vệ dữ liệu & Giải phóng thời gian
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Operisbot cách ly hoàn toàn bộ não AI ra khỏi máy tính cá nhân,
                tạo môi trường làm việc chuyên dụng và an toàn. Thay vì tốn 5-7
                triệu/tháng cho tài khoản AI lẻ, Operisbot giúp bạn tiết kiệm
                70% chi phí với hệ thống Cắm là Chạy.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex-1">
              <p className="text-sm tracking-widest text-primary font-medium mb-3">
                TẦM NHÌN
              </p>
              <h3 className="text-2xl font-semibold tracking-tight mb-3">
                Kho Mini-tools chuyên biệt
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Không dừng lại ở hệ thống tổng quát, Operisbot đang phát triển
                kho Mini-tools ngành: BĐS (quét tin, phân tích giá), E-commerce
                (theo dõi đối thủ, điều chỉnh giá), Tuyển dụng (tìm ứng viên
                LinkedIn, gửi thư mời cá nhân hóa) và hàng trăm công cụ khác.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "Tam trụ" giá trị cốt lõi */}
      <section className="bg-muted relative overflow-hidden">
        <DotGrid
          className="left-0 top-0"
          color="#8b5cf6"
          opacity={0.05}
          cols={12}
          rows={8}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              &ldquo;TAM TRỤ&rdquo; GIÁ TRỊ
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              BẢO MẬT — TIỆN LỢI — THÔNG MINH
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="bg-white p-8 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-full ${p.bg} flex items-center justify-center mx-auto mb-5`}
                >
                  <p.icon size={28} className={p.color} strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-semibold mb-3">{p.title}</h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* So sánh hiệu quả đầu tư */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            SO SÁNH
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            AI TRUYỀN THỐNG vs OPERISBOT
          </h2>
        </div>
        <div className="max-w-4xl mx-auto rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-1/4 text-left text-xs tracking-widest uppercase py-5 px-6 bg-muted text-muted-foreground border-b border-border">
                  Tiêu chí
                </th>
                <th className="w-[37.5%] text-left text-xs tracking-widest uppercase py-5 px-6 bg-muted text-muted-foreground border-b border-border">
                  AI truyền thống
                </th>
                <th className="w-[37.5%] text-left text-xs tracking-widest uppercase py-5 px-6 bg-primary text-white border-b border-primary">
                  Operisbot
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={
                    i < comparisonRows.length - 1
                      ? "border-b border-border"
                      : ""
                  }
                >
                  <td className="py-5 px-6 font-semibold text-sm">
                    {row.label}
                  </td>
                  <td className="py-5 px-6">
                    <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <X size={12} className="text-red-400" />
                      </span>
                      {row.traditional}
                    </span>
                  </td>
                  <td className="py-5 px-6 bg-primary/[0.03]">
                    <span className="flex items-center gap-2.5 text-sm font-semibold">
                      <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-green-600" />
                      </span>
                      {row.operis}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Kịch bản thực tế theo nhóm KH */}
      <section className="bg-muted relative overflow-hidden">
        <ConcentricCircles
          className="right-[-180px] top-[-100px]"
          size={450}
          color="#f59e0b"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              KỊCH BẢN THỰC TẾ
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              OPERISBOT LÀM GÌ CHO BẠN?
            </h2>
            <p className="text-base text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
              Không chỉ &ldquo;tự động hóa&rdquo; — đây là những hành động cụ
              thể mà Operisbot thực hiện thay bạn.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="bg-white p-6 rounded-lg flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${a.bg} flex items-center justify-center shrink-0`}>
                    <a.icon
                      size={20}
                      className={a.color}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h4 className="text-base font-semibold">{a.title}</h4>
                </div>
                <ul className="space-y-3 flex-1">
                  {a.scenarios.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed">
                      <span className={`${a.arrow} font-bold shrink-0`}>→</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Khả năng tự động hóa chi tiết */}
      <CapabilitiesSection />

      {/* Tại sao thuận tiện — Plug & Play */}
      <section className="max-w-7xl mx-auto px-4 py-16 relative overflow-hidden">
        <DotGrid
          className="right-0 top-0"
          color="#0ea5e9"
          opacity={0.06}
          cols={8}
          rows={8}
          gap={28}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-14 h-14 rounded-full bg-sky/10 flex items-center justify-center mx-auto mb-5">
            <Zap size={28} className="text-sky" strokeWidth={1.5} />
          </div>
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            CẮM LÀ CHẠY
          </p>
          <h2 className="text-3xl font-semibold tracking-tight mb-6">
            TẠI SAO LẠI THUẬN TIỆN ĐẾN VẬY?
          </h2>
          <div className="text-base text-muted-foreground leading-relaxed space-y-4 text-left">
            <p>
              <strong className="text-foreground">Trước đây:</strong> Bạn phải
              thuê nhân viên (lương 7-10 triệu) ngồi trực máy, hoặc tự làm thì
              mất cả ngày, lag máy tính cá nhân, sợ lộ mật khẩu khi cài tool
              linh tinh.
            </p>
            <p>
              <strong className="text-foreground">Với Operisbot:</strong> Mua
              máy 3.000.000₫, tặng sẵn 2.000.000 token. Cắm máy vào góc nhà, mở
              điện thoại chọn Workflow &ldquo;Quản lý kho &amp; đối thủ&rdquo;.
              Xong! Bạn đi uống cafe, Mini PC ở nhà tự làm mọi việc.
            </p>
            <p>
              <strong className="text-foreground">Tiết kiệm Token:</strong> Thay
              vì hỏi AI &ldquo;Hãy phân tích thị trường cho tôi&rdquo; (tốn hàng
              ngàn token), bạn dùng Workflow &ldquo;Quét giá → So sánh → Báo
              cáo&rdquo;. Quy trình cố định, AI chỉ can thiệp để so sánh con số
              — 1.000.000 token dùng cả tháng không hết.
            </p>
          </div>
        </div>
      </section>

      {/* Hệ sinh thái Mini-tools */}
      <section className="bg-muted relative overflow-hidden">
        <ConcentricCircles
          className="left-[-150px] bottom-[-100px]"
          size={400}
          color="#f43f5e"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              SẮP RA MẮT
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              HỆ SINH THÁI MINI-TOOLS
            </h2>
            <p className="text-base text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
              Chúng tôi không để bạn tự mày mò. Operisbot liên tục cập nhật kho
              công cụ chuyên biệt.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {miniTools.map((tool) => (
              <div
                key={tool.name}
                className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-full ${tool.bg} flex items-center justify-center mx-auto mb-4`}>
                  <tool.icon
                    size={24}
                    className={tool.color}
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="text-sm font-semibold mb-2">{tool.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8 italic">
            &ldquo;Operisbot không chỉ là cái máy — nó là Thời gian và Sự an tâm
            của bạn, được đóng gói trong một thiết bị nhỏ gọn.&rdquo;
          </p>
        </div>
      </section>

      {/* Hành trình */}
      <section className="max-w-7xl mx-auto px-4 py-16 relative overflow-hidden">
        <DotGrid
          className="left-0 bottom-0"
          color="#f59e0b"
          opacity={0.06}
          cols={10}
          rows={6}
          gap={28}
        />
        <div className="text-center mb-10 relative z-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">
            HÀNH TRÌNH
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            CỘT MỐC PHÁT TRIỂN
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {timeline.map((t, i) => (
            <div
              key={t.year}
              className="relative pl-6 border-l-2 border-border md:border-l-0 md:pl-0 md:border-t-2 md:pt-6"
            >
              <span className={`absolute left-[-9px] top-0 w-4 h-4 ${t.color} rounded-full md:left-0 md:top-[-9px]`} />
              <p className="text-2xl font-semibold text-primary mb-1">
                {t.year}
              </p>
              <h4 className="text-base font-semibold mb-2">{t.title}</h4>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Đội ngũ */}
      <section className="bg-muted relative overflow-hidden">
        <ConcentricCircles
          className="right-[-180px] bottom-[-100px]"
          size={400}
          color="#6b8fb5"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              ĐỘI NGŨ
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              NHỮNG NGƯỜI ĐỨNG SAU OPERIS
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/10">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <h4 className="text-base font-semibold">{m.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta text-white relative overflow-hidden">
        <div className="absolute top-1/2 right-[-100px] w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
        <ConcentricCircles
          className="left-[-150px] bottom-[-200px]"
          size={500}
          color="#ffffff"
          opacity={0.04}
        />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            SẴN SÀNG ĐỂ BOT LÀM VIỆC CHO BẠN?
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Chọn gói Operisbot phù hợp, cắm điện và bắt đầu ngay hôm nay. Tiết
            kiệm 70% chi phí, bảo mật tuyệt đối, hoạt động 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="bg-white text-foreground text-xs tracking-widest px-8 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              XEM SẢN PHẨM
            </Link>
            <Link
              href="/contact"
              className="border border-white/40 text-white text-xs tracking-widest px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              LIÊN HỆ TƯ VẤN
            </Link>
          </div>
        </div>
      </section>

      <SubscribeSection />
    </>
  );
}
