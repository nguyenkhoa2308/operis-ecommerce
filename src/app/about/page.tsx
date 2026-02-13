import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Plug,
  Workflow,
  Check,
  X,
  User,
  Building2,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";

const stats = [
  { value: "2+", label: "Thiết bị AI sẵn có" },
  { value: "70%", label: "Tiết kiệm chi phí" },
  { value: "24/7", label: "Hoạt động liên tục" },
  { value: "24 th", label: "Bảo hành chính hãng" },
];

/* "Tam trụ" giá trị cốt lõi của Operisbot */
const pillars = [
  {
    icon: ShieldCheck,
    title: "An toàn vật lý (Hardware Sandbox)",
    desc: "Mọi thao tác của Bot diễn ra trên Mini PC riêng. Dữ liệu cá nhân, mật khẩu, tài chính trên máy tính chính của bạn hoàn toàn \"vô hình\" trước AI.",
  },
  {
    icon: Plug,
    title: "Cắm là chạy (Zero Config)",
    desc: "Không cần cài đặt môi trường Python, không cần thuê Proxy phức tạp, không cần mua tài khoản AI 5-7 triệu/tháng. Mọi thứ đã nằm trong chiếc hộp nhỏ gọn.",
  },
  {
    icon: Workflow,
    title: "Workflow thông minh",
    desc: "Thay vì chat vu vơ, Operisbot chạy theo quy trình (Workflow). Điều này giúp tiết kiệm Token gấp 10 lần và đạt độ chính xác 100% trong công việc.",
  },
];

/* Bảng so sánh ROI: AI truyền thống vs Operisbot */
const comparisonRows = [
  { label: "Bảo mật", traditional: "Nguy cơ lộ Cookie/Data trên máy chính", operis: "Cách ly hoàn toàn trên Mini PC" },
  { label: "Chi phí hàng tháng", traditional: "20-50$/tháng cho nhiều loại tài khoản", operis: "Chỉ nạp Token theo nhu cầu (Rẻ hơn 70%)" },
  { label: "Sự tiện lợi", traditional: "Phải bật máy, tốn RAM, lag máy", operis: "Chạy độc lập, máy chính tắt bot vẫn làm" },
  { label: "Kỹ thuật", traditional: "Cần biết cài đặt, quản lý API", operis: "Plug & Play (Cắm là chạy)" },
];

/* Đối tượng khách hàng mục tiêu */
const audiences = [
  {
    icon: User,
    title: "Cá nhân / Freelancer",
    desc: "Quản lý MXH, scraping dữ liệu, gửi email tự động — để bot làm việc nhàm chán, bạn tập trung sáng tạo.",
  },
  {
    icon: Briefcase,
    title: "Chủ kinh doanh nhỏ",
    desc: "Theo dõi đối thủ, chăm sóc khách hàng, quản lý đơn hàng 24/7 mà không cần thuê thêm nhân sự.",
  },
  {
    icon: Building2,
    title: "Doanh nghiệp",
    desc: "Triển khai hàng loạt Operisbot cho từng phòng ban: marketing, sales, HR, kế toán — mỗi bot một nhiệm vụ.",
  },
  {
    icon: GraduationCap,
    title: "Người mới bắt đầu với AI",
    desc: "Không cần biết code, không cần cài đặt phức tạp. Cắm điện, chọn Workflow và để bot chạy.",
  },
];

const timeline = [
  { year: "01/2026", title: "Khởi đầu", desc: "Operis ra đời từ ý tưởng của Lê Tiến Hùng: giúp mọi người tiếp cận tự động hóa AI dễ dàng hơn thông qua thiết bị chuyên dụng." },
  { year: "02/2026", title: "Ra mắt sản phẩm", desc: "Hoàn thiện 2 gói Operisbot Cá nhân, ra mắt gói Doanh nghiệp (Tùy biến), website và hệ thống Workflow đầu tiên." },
  { year: "Q2/2026", title: "Mở rộng", desc: "Phát triển kho Mini-tools ngành (BĐS, E-commerce, Tuyển dụng). Mở rộng hệ sinh thái đối tác." },
];

const team = [
  { name: "Lê Tiến Hùng", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
  { name: "Trần Thị Lan", role: "CTO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop" },
  { name: "Lê Văn Hùng", role: "Trưởng phòng Kỹ thuật", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop" },
  { name: "Phạm Ngọc Mai", role: "Trưởng phòng CSKH", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop" },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="GIỚI THIỆU"
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }]}
      />

      {/* Câu chuyện */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 relative aspect-[4/3] w-full">
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=500&fit=crop"
              alt="Về Operis"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">VỀ CHÚNG TÔI</p>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">OPERISBOT LÀ GÌ?</h2>
            <p className="text-base font-medium text-foreground leading-relaxed mb-4">
              Operisbot không phải là một chatbot. Đây là một <span className="text-primary font-semibold">Thiết bị Trợ lý Vật lý (AI Appliance)</span>.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              Chúng tôi tách rời bộ não AI ra khỏi máy tính cá nhân của bạn để tạo ra một môi trường
              làm việc chuyên dụng, an toàn và hoạt động bền bỉ 24/7. Mọi sản phẩm Operis đều được
              cài đặt sẵn phần mềm tự động hóa — bạn chỉ cần cắm điện và bắt đầu.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Từ cá nhân đến doanh nghiệp, Operisbot giúp bạn bảo mật tuyệt đối dữ liệu,
              đạt hiệu suất vô hạn và tối ưu chi phí — tất cả trong một chiếc hộp nhỏ gọn.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-foreground text-white text-sm tracking-widest px-8 py-3 hover:bg-foreground/90 transition-colors"
            >
              XEM CỬA HÀNG
            </Link>
          </div>
        </div>
      </section>

      {/* Số liệu */}
      <section className="bg-muted">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-semibold text-primary">{s.value}</p>
                <p className="text-base text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sứ mệnh & Tầm nhìn */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <p className="text-sm tracking-widest text-primary font-medium mb-3">SỨ MỆNH</p>
              <h3 className="text-2xl font-semibold tracking-tight mb-3">Bảo vệ dữ liệu & Giải phóng thời gian</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Operisbot cách ly hoàn toàn bộ não AI ra khỏi máy tính cá nhân, tạo môi trường
                làm việc chuyên dụng và an toàn. Thay vì tốn 5-7 triệu/tháng cho tài khoản AI lẻ,
                Operisbot giúp bạn tiết kiệm 70% chi phí với hệ thống Cắm là Chạy.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <p className="text-sm tracking-widest text-primary font-medium mb-3">TẦM NHÌN</p>
              <h3 className="text-2xl font-semibold tracking-tight mb-3">Kho Mini-tools chuyên biệt</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Không dừng lại ở hệ thống tổng quát, Operisbot đang phát triển kho Mini-tools ngành:
                BĐS (quét tin, phân tích giá), E-commerce (theo dõi đối thủ, điều chỉnh giá),
                Tuyển dụng (tìm ứng viên LinkedIn, gửi thư mời cá nhân hóa) và hàng trăm công cụ khác.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "Tam trụ" giá trị cốt lõi */}
      <section className="bg-muted">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">&ldquo;TAM TRỤ&rdquo; GIÁ TRỊ</p>
            <h2 className="text-3xl font-semibold tracking-tight">BẢO MẬT — TIỆN LỢI — THÔNG MINH</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <p.icon size={28} className="text-primary" strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-semibold mb-3">{p.title}</h4>
                <p className="text-base text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* So sánh hiệu quả đầu tư */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">SO SÁNH</p>
          <h2 className="text-3xl font-semibold tracking-tight">AI TRUYỀN THỐNG vs OPERISBOT</h2>
        </div>
        <div className="max-w-4xl mx-auto rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-1/4 text-left text-xs tracking-widest uppercase py-5 px-6 bg-muted text-muted-foreground border-b border-border">Tiêu chí</th>
                <th className="w-[37.5%] text-left text-xs tracking-widest uppercase py-5 px-6 bg-muted text-muted-foreground border-b border-border">AI truyền thống</th>
                <th className="w-[37.5%] text-left text-xs tracking-widest uppercase py-5 px-6 bg-primary text-white border-b border-primary">Operisbot</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className={i < comparisonRows.length - 1 ? "border-b border-border" : ""}>
                  <td className="py-5 px-6 font-semibold text-sm">{row.label}</td>
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

      {/* Dành cho ai? */}
      <section className="bg-muted">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">DÀNH CHO AI?</p>
            <h2 className="text-3xl font-semibold tracking-tight">OPERISBOT PHÙ HỢP VỚI BẠN</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="bg-white p-6 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <a.icon size={24} className="text-primary" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm font-semibold mb-2">{a.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hành trình */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">HÀNH TRÌNH</p>
          <h2 className="text-3xl font-semibold tracking-tight">CỘT MỐC PHÁT TRIỂN</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {timeline.map((t, i) => (
            <div key={t.year} className="relative pl-6 border-l-2 border-border md:border-l-0 md:pl-0 md:border-t-2 md:pt-6">
              <span className="absolute left-[-9px] top-0 w-4 h-4 bg-primary rounded-full md:left-0 md:top-[-9px]" />
              <p className="text-2xl font-semibold text-primary mb-1">{t.year}</p>
              <h4 className="text-base font-semibold mb-2">{t.title}</h4>
              <p className="text-base text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Đội ngũ */}
      <section className="bg-muted">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">ĐỘI NGŨ</p>
            <h2 className="text-3xl font-semibold tracking-tight">NHỮNG NGƯỜI ĐỨNG SAU OPERIS</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={m.image} alt={m.name} fill sizes="128px" className="object-cover" />
                </div>
                <h4 className="text-base font-semibold">{m.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            SẴN SÀNG ĐỂ BOT LÀM VIỆC CHO BẠN?
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Chọn gói Operisbot phù hợp, cắm điện và bắt đầu ngay hôm nay.
            Tiết kiệm 70% chi phí, bảo mật tuyệt đối, hoạt động 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="bg-white text-foreground text-xs tracking-widest px-8 py-3 hover:bg-white/90 transition-colors"
            >
              XEM SẢN PHẨM
            </Link>
            <Link
              href="/contact"
              className="border border-white/40 text-white text-xs tracking-widest px-8 py-3 hover:bg-white/10 transition-colors"
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
