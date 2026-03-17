import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Plug,
  Workflow,
  Check,
  X,
  Zap,
  MessageSquare,
  Palette,
  Calculator,
  Home,
  ShoppingBag,
  Users,
  ArrowRight,
} from "lucide-react";
import { PageBanner } from "@/components/ui/page-banner";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { aboutPageJsonLd } from "@/lib/json-ld";
import { JsonLdScript } from "@/components/json-ld-script";
import { ConcentricCircles, DotGrid } from "@/components/ui/decorative-pattern";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/ui/motion";

import { WorkflowTabs } from "@/components/about/workflow-tabs";

export const metadata: Metadata = {
  title: "Giới thiệu Operisbot — Thiết bị tự động hóa AI | Operis",
  description:
    "Operisbot là thiết bị tự động hóa và tối ưu hóa quy trình xử lý công việc cho cá nhân và doanh nghiệp, vận hành hoàn toàn bởi AI. Phát triển từ nền tảng OpenClaw, giúp giảm 80% chi phí doanh nghiệp.",
  openGraph: {
    title: "Giới thiệu Operisbot — Thiết bị tự động hóa AI | Operis",
    description:
      "Hệ thống tự động hóa AI: tuyển dụng, báo cáo thuế, marketing SEO, chăm sóc khách hàng — tất cả chạy trên Mini PC chuyên dụng 24/7.",
    url: "https://operis.vn/about",
    type: "website",
  },
  keywords: [
    "Operisbot",
    "thiết bị AI",
    "tự động hóa",
    "Mini PC",
    "workflow AI",
    "giảm chi phí doanh nghiệp",
    "tuyển dụng tự động",
    "báo cáo thuế tự động",
    "marketing SEO tự động",
    "OpenClaw",
  ],
  alternates: {
    canonical: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giới thiệu Operisbot — Thiết bị tự động hóa AI | Operis",
    description:
      "Hệ thống tự động hóa AI: tuyển dụng, báo cáo thuế, marketing SEO, chăm sóc khách hàng — tất cả chạy trên Mini PC chuyên dụng 24/7.",
  },
};

/* ── Data ────────────────────────────────────────────────────────── */

const stats = [
  { value: "80%", label: "Tiết kiệm chi phí", color: "text-emerald" },
  { value: "24/7", label: "Hoạt động liên tục", color: "text-violet" },
  { value: "10x", label: "Tiết kiệm Token", color: "text-sky" },
  { value: "24 th", label: "Bảo hành chính hãng", color: "text-amber" },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "An toàn vật lý",
    subtitle: "Hardware Sandbox",
    desc: 'Mọi thao tác diễn ra trên Mini PC riêng. Dữ liệu, mật khẩu, tài chính trên máy chính hoàn toàn "vô hình" trước AI.',
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-emerald/20",
  },
  {
    icon: Plug,
    title: "Cắm là chạy",
    subtitle: "Zero Config",
    desc: "Không cần cài Python, không thuê Proxy, không mua tài khoản AI 5-7 triệu/tháng. Mọi thứ nằm trong chiếc hộp nhỏ gọn.",
    color: "text-sky",
    bg: "bg-sky/10",
    border: "border-sky/20",
  },
  {
    icon: Workflow,
    title: "Workflow thông minh",
    subtitle: "Chính xác 100%",
    desc: "Thay vì chat vu vơ, Operisbot chạy theo quy trình cố định. Tiết kiệm Token gấp 10 lần, chính xác 100%.",
    color: "text-violet",
    bg: "bg-violet/10",
    border: "border-violet/20",
  },
];

const comparisonRows = [
  {
    label: "Bảo mật",
    traditional: "Nguy cơ lộ Cookie/Data trên máy chính",
    operis: "Cách ly hoàn toàn trên Mini PC",
  },
  {
    label: "Chi phí hàng tháng",
    traditional: "20-50$/tháng cho nhiều loại tài khoản",
    operis: "Chỉ nạp Token theo nhu cầu (Rẻ hơn 80%)",
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

const ecosystemTools = [
  {
    icon: MessageSquare,
    name: "Operis-Zalo",
    tagline: "Chăm sóc khách hàng tự động",
    desc: "Bot gửi tin nhắn cá nhân hóa theo danh sách, tự trả lời câu hỏi thường gặp, nhắc lịch hẹn và theo dõi đơn hàng qua Zalo.",
    color: "text-violet",
    bg: "bg-violet/10",
    status: "Sắp ra mắt",
  },
  {
    icon: Palette,
    name: "Operis-Canva",
    tagline: "Thiết kế hàng loạt bằng AI",
    desc: "Nạp tên sản phẩm + giá → Bot tự tạo hàng trăm ảnh quảng cáo theo template, xuất file sẵn sàng đăng lên mọi nền tảng.",
    color: "text-rose",
    bg: "bg-rose/10",
    status: "Sắp ra mắt",
  },
  {
    icon: Calculator,
    name: "Operis-Tax",
    tagline: "Kế toán & thuế thông minh",
    desc: "Tự động tính thuế TNCN/TNDN từ lịch sử giao dịch, xuất báo cáo theo chuẩn, cảnh báo hạn nộp và sai lệch số liệu.",
    color: "text-emerald",
    bg: "bg-emerald/10",
    status: "Sắp ra mắt",
  },
  {
    icon: Home,
    name: "Operis-BĐS",
    tagline: "Săn tin bất động sản 24/7",
    desc: "Bot quét Batdongsan, Chotot, hội nhóm kín — lọc theo tiêu chí giá, diện tích, vị trí. Thông báo ngay khi có tin mới phù hợp.",
    color: "text-sky",
    bg: "bg-sky/10",
    status: "Q2/2026",
  },
  {
    icon: ShoppingBag,
    name: "Operis-Shop",
    tagline: "Quản lý đa sàn TMĐT",
    desc: "Đồng bộ tồn kho, giá bán, đơn hàng trên Shopee, Lazada, TikTok Shop. Tự điều chỉnh giá theo biến động đối thủ.",
    color: "text-amber",
    bg: "bg-amber/10",
    status: "Q2/2026",
  },
  {
    icon: Users,
    name: "Operis-HR",
    tagline: "Tuyển dụng & sàng lọc CV",
    desc: "Tải CV hàng loạt từ TopCV, LinkedIn — AI so sánh với JD, xếp hạng ứng viên và tự gửi email mời phỏng vấn.",
    color: "text-teal",
    bg: "bg-teal/10",
    status: "Q3/2026",
  },
];

const timeline = [
  {
    year: "01/2026",
    title: "Khởi đầu",
    desc: "Operis ra đời từ ý tưởng giúp mọi người tiếp cận tự động hóa AI dễ dàng qua thiết bị chuyên dụng.",
    color: "bg-sky",
  },
  {
    year: "02/2026",
    title: "Ra mắt sản phẩm",
    desc: "Hoàn thiện 2 gói Operisbot Cá nhân, ra mắt gói Doanh nghiệp, website và Workflow đầu tiên.",
    color: "bg-violet",
  },
  {
    year: "Q2/2026",
    title: "Mở rộng",
    desc: "Phát triển kho Mini-tools ngành: BĐS, E-commerce, Tuyển dụng. Mở rộng hệ sinh thái đối tác.",
    color: "bg-emerald",
  },
];


/* ── Page ─────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <JsonLdScript data={aboutPageJsonLd()} />
      <PageBanner
        title="GIỚI THIỆU"
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Giới thiệu" },
        ]}
      />

      {/* ── 1. Hero — Operisbot là gì? ────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-80px] w-[300px] h-[300px] rounded-full bg-violet/5 blur-3xl" />
        <ConcentricCircles
          className="right-[-120px] top-[-80px]"
          size={500}
          color="#8b5cf6"
          opacity={0.04}
        />

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            <FadeIn direction="left" className="flex-1 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <Image
                  src="/images/about-1.webp"
                  alt="Về Operis"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </FadeIn>

            <FadeIn direction="right" className="flex-1">
              <p className="text-sm tracking-widest text-primary font-medium mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-primary/60" />
                VỀ CHÚNG TÔI
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
                OPERISBOT LÀ GÌ?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-3">
                Operisbot là{" "}
                <span className="text-primary font-semibold">
                  thiết bị tự động hóa quy trình công việc
                </span>{" "}
                cho cá nhân và doanh nghiệp, vận hành hoàn toàn bởi AI — phát
                triển từ nền tảng OpenClaw, nâng cấp hoàn toàn về bảo mật và
                tối thiểu chi phí.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-3">
                Hệ thống phục vụ{" "}
                <span className="text-foreground font-medium">
                  tất cả các tác vụ
                </span>{" "}
                có tính chất lặp lại: suy luận, tổng hợp báo cáo, phân tích
                nhân sự, tài chính, báo cáo thuế, tư vấn tự động, chăm sóc
                khách hàng qua Zalo.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Giúp doanh nghiệp{" "}
                <span className="text-primary font-semibold">
                  giảm 80% chi phí
                </span>
                , tăng tốc phát triển và có cái nhìn toàn diện để ra quyết định
                chính xác.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary text-white text-sm tracking-widest px-8 py-3 rounded-full hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                XEM CỬA HÀNG
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 2. Số liệu nổi bật ───────────────────────────────── */}
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
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <p className={`text-3xl md:text-4xl font-bold ${s.color}`}>
                  {s.value}
                </p>
                <p className="text-base text-muted-foreground mt-1">
                  {s.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 3. Hệ thống gồm gì + 2 phiên bản ────────────────── */}
      <section className="relative overflow-hidden">
        <ConcentricCircles
          className="left-[-150px] bottom-[-150px]"
          size={400}
          color="#10b981"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              CẤU TRÚC HỆ THỐNG
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              HỆ THỐNG GỒM NHỮNG GÌ?
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Mini PC */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden h-full hover:shadow-lg transition-all">
                <div className="h-52 relative overflow-hidden">
                  <Image
                    src="/images/about-2.png"
                    alt="Operisbot Mini PC"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <DotGrid
                    className="right-0 top-0"
                    color="#ffffff"
                    opacity={0.1}
                    cols={8}
                    rows={5}
                    gap={20}
                  />
                  <div className="absolute bottom-3 left-4">
                    <span className="inline-block bg-sky/90 text-white text-xs tracking-wider px-3 py-1 rounded-full">
                      PHẦN CỨNG
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Mini PC / PC</h3>
                  <p className="text-sm text-sky font-medium mb-3">
                    Nền tảng phần cứng
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Cấu hình tối thiểu:{" "}
                    <span className="text-foreground font-semibold">
                      Core i5, RAM 8GB, SSD 120GB
                    </span>
                    . Mini PC như{" "}
                    <span className="text-primary font-semibold">
                      một nhân viên riêng
                    </span>{" "}
                    — hoạt động 24/7, không nghỉ phép, không cần giám sát.
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Token */}
            <StaggerItem>
              <div className="group bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden h-full hover:shadow-lg transition-all">
                <div className="h-52 relative overflow-hidden">
                  <Image
                    src="/images/about-3.webp"
                    alt="Operisbot Token hệ thống AI"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <ConcentricCircles
                    className="left-[-40px] top-[-40px]"
                    size={200}
                    color="#ffffff"
                    opacity={0.08}
                  />
                  <div className="absolute bottom-3 left-4">
                    <span className="inline-block bg-violet/90 text-white text-xs tracking-wider px-3 py-1 rounded-full">
                      PHẦN MỀM
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    Token hệ thống
                  </h3>
                  <p className="text-sm text-violet font-medium mb-3">
                    Bộ não & cánh tay AI
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Token = bộ não & cánh tay điều khiển Mini PC. Sử dụng bởi{" "}
                    <span className="text-foreground font-semibold">
                      GPT-5, Gemini 3.1 Pro, Claude AI
                    </span>{" "}
                    và nhiều nhà cung cấp AI hàng đầu thế giới.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* 2 phiên bản */}
          <FadeIn>
            <div className="bg-gradient-to-r from-primary/5 via-violet/5 to-sky/5 rounded-2xl p-6 md:p-8 border border-primary/10">
              <h3 className="text-lg font-semibold text-center mb-6">
                HỆ THỐNG CÓ 2 PHIÊN BẢN
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      Bản kèm Mini PC
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Trọn bộ phần cứng + phần mềm + token. Cắm điện, kết nối
                      mạng, bắt đầu ngay — không cần chuẩn bị gì thêm.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
                  <span className="w-10 h-10 rounded-full bg-violet/10 flex items-center justify-center text-violet font-bold text-base shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      Bản phần mềm hệ thống
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Chỉ phần mềm + token. Bạn chuẩn bị sẵn PC/Mini PC (tối
                      thiểu Core i5, 8GB RAM, SSD 120GB).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 4. Full-width visual break — Plug & Play ──────────── */}
      <section className="relative h-[400px] md:h-[450px] overflow-hidden">
        <Image
          src="/images/cta.png"
          alt="Operisbot thiết bị AI"
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <FadeIn direction="left">
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-sky/20 flex items-center justify-center">
                    <Zap size={20} className="text-sky" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm tracking-widest text-sky/80 font-medium">
                    CẮM LÀ CHẠY
                  </p>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">
                  TẠI SAO LẠI THUẬN TIỆN ĐẾN VẬY?
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-3">
                  <strong className="text-white">Trước đây:</strong> Thuê nhân
                  viên 7-10 triệu/tháng ngồi trực, hoặc tự làm — lag máy, sợ
                  lộ mật khẩu.
                </p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-3">
                  <strong className="text-white">Với Operisbot:</strong> Mua máy
                  3.000.000₫, tặng sẵn 2.000.000 token. Cắm vào góc nhà, chọn
                  Workflow — Mini PC tự làm mọi việc.
                </p>
                <p className="text-sky/90 text-base font-medium">
                  1.000.000 token dùng cả tháng không hết.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 5. Workflow Tabs ───────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <DotGrid
          className="right-0 top-0"
          color="#10b981"
          opacity={0.05}
          cols={12}
          rows={8}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              VÍ DỤ CỤ THỂ
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              HỆ THỐNG LÀM GÌ CHO BẠN?
            </h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Làm{" "}
              <span className="text-primary font-semibold">
                bất kỳ việc gì
              </span>{" "}
              — miễn là bạn có workflow chi tiết.{" "}
              <span className="text-foreground font-medium">
                Xây 1 lần, chạy mãi mãi.
              </span>
            </p>
          </FadeIn>

          <FadeIn>
            <WorkflowTabs />
          </FadeIn>
        </div>
      </section>

      {/* ── 5b. Full-width image break — Assistance ─────────── */}
      <section className="relative h-[360px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/about-4.png"
          alt="Operisbot hỗ trợ doanh nghiệp"
          fill
          sizes="100vw"
          className="object-cover"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
        <ConcentricCircles
          className="right-[-100px] bottom-[-80px]"
          size={350}
          color="#ffffff"
          opacity={0.06}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <FadeIn direction="left">
              <div className="max-w-lg">
                <p className="text-xs tracking-widest text-sky/80 font-medium mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-sky/60" />
                  XÂY 1 LẦN — CHẠY MÃI MÃI
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4 leading-tight">
                  KHÔNG CẦN GIÁM SÁT.
                  <br />
                  <span className="text-sky">BOT TỰ LÀM ĐÚNG QUY TRÌNH.</span>
                </h2>
                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                  Mỗi Workflow được thiết kế chính xác từng bước. Bot không
                  &quot;sáng tạo&quot; lung tung — chạy đúng kịch bản, tiết kiệm
                  Token gấp 10 lần so với chat AI thông thường.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 6. Tam trụ giá trị ────────────────────────────────── */}
      <section className="bg-muted/50 relative overflow-hidden">
        <ConcentricCircles
          className="left-[-100px] top-[-100px]"
          size={400}
          color="#8b5cf6"
          opacity={0.04}
        />
        <DotGrid
          className="right-0 bottom-0"
          color="#8b5cf6"
          opacity={0.05}
          cols={12}
          rows={8}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              &ldquo;TAM TRỤ&rdquo; GIÁ TRỊ CỐT LÕI
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              BẢO MẬT — TIỆN LỢI — THÔNG MINH
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all h-full text-center group">
                  <ScaleIn>
                    <div
                      className={`w-16 h-16 rounded-2xl ${p.bg} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}
                    >
                      <p.icon
                        size={32}
                        className={p.color}
                        strokeWidth={1.5}
                      />
                    </div>
                  </ScaleIn>
                  <h4 className="text-lg font-semibold mb-1">{p.title}</h4>
                  <p className="text-sm text-primary/60 font-medium mb-3 tracking-wide">
                    {p.subtitle}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 7. Bảng so sánh ──────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] rounded-full bg-emerald/5 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              SO SÁNH HIỆU QUẢ ĐẦU TƯ
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              AI TRUYỀN THỐNG vs OPERISBOT
            </h2>
          </FadeIn>

          {/* Desktop table */}
          <FadeIn>
            <div className="hidden md:block max-w-4xl mx-auto rounded-2xl border border-border overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-1/4 text-left text-sm tracking-widest uppercase py-5 px-6 bg-muted text-muted-foreground border-b border-border">
                      Tiêu chí
                    </th>
                    <th className="w-[37.5%] text-left text-sm tracking-widest uppercase py-5 px-6 bg-muted text-muted-foreground border-b border-border">
                      AI truyền thống
                    </th>
                    <th className="w-[37.5%] text-left text-sm tracking-widest uppercase py-5 px-6 bg-primary text-white border-b border-primary">
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
                      <td className="py-5 px-6 font-semibold text-base">
                        {row.label}
                      </td>
                      <td className="py-5 px-6">
                        <span className="flex items-center gap-2.5 text-base text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                            <X size={12} className="text-red-400" />
                          </span>
                          {row.traditional}
                        </span>
                      </td>
                      <td className="py-5 px-6 bg-primary/[0.03]">
                        <span className="flex items-center gap-2.5 text-base font-semibold">
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
          </FadeIn>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {comparisonRows.map((row) => (
              <FadeIn key={row.label}>
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="bg-muted px-4 py-3">
                    <h4 className="text-base font-semibold">{row.label}</h4>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="px-4 py-3 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                        <X size={12} className="text-red-400" />
                      </span>
                      <div>
                        <p className="text-xs tracking-wider text-muted-foreground mb-0.5">
                          AI TRUYỀN THỐNG
                        </p>
                        <p className="text-base text-muted-foreground">
                          {row.traditional}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-primary/[0.03] flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </span>
                      <div>
                        <p className="text-xs tracking-wider text-primary font-medium mb-0.5">
                          OPERISBOT
                        </p>
                        <p className="text-base font-semibold">{row.operis}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Hệ sinh thái Mini-tools ─────────────────────────── */}
      <section id="he-sinh-thai" className="bg-muted/50 relative overflow-hidden scroll-mt-20">
        <DotGrid
          className="right-0 top-0"
          color="#8b5cf6"
          opacity={0.05}
          cols={12}
          rows={8}
          gap={28}
        />
        <ConcentricCircles
          className="left-[-180px] bottom-[-120px]"
          size={400}
          color="#10b981"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              HỆ SINH THÁI ĐANG MỞ RỘNG
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              MINI-TOOLS CHUYÊN BIỆT TỪNG NGÀNH
            </h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
              Không chỉ dừng lại ở Workflow tổng quát — Operisbot đang phát
              triển kho công cụ chuyên sâu cho từng lĩnh vực, giúp bạn tự động
              hóa chính xác hơn, tiết kiệm hơn.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemTools.map((tool) => (
              <StaggerItem
                key={tool.name}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-11 h-11 rounded-full ${tool.bg} flex items-center justify-center shrink-0`}
                  >
                    <tool.icon
                      size={22}
                      className={tool.color}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold">{tool.name}</h4>
                    <p className={`text-sm ${tool.color} font-medium`}>
                      {tool.tagline}
                    </p>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed flex-1">
                  {tool.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-border">
                  <span className="text-xs tracking-widest text-muted-foreground font-medium">
                    {tool.status}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn>
            <div className="text-center mt-10">
              <p className="text-base text-muted-foreground italic mb-4">
                Mua thiết bị hôm nay — tất cả Mini-tools sẽ được cập nhật miễn
                phí khi ra mắt.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
              >
                XEM THIẾT BỊ <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 9. Hành trình phát triển ──────────────────────────── */}
      <section className="relative overflow-hidden">
        <DotGrid
          className="left-0 bottom-0"
          color="#f59e0b"
          opacity={0.06}
          cols={10}
          rows={6}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              HÀNH TRÌNH
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              QUÁ TRÌNH HÌNH THÀNH
            </h2>
          </FadeIn>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            {/* Image */}
            <FadeIn direction="left" className="flex-shrink-0">
              <div className="relative w-[280px] h-[320px] md:w-[320px] md:h-[360px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about-5.webp"
                  alt="Hành trình phát triển Operis"
                  fill
                  sizes="320px"
                  className="object-cover"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">
                    Từ ý tưởng đến sản phẩm
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Operis — khởi đầu từ 01/2026
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Timeline */}
            <div className="flex-1">
              <StaggerContainer className="space-y-8">
                {timeline.map((t) => (
                  <StaggerItem key={t.year}>
                    <div className="relative pl-8 border-l-2 border-border">
                      <span
                        className={`absolute left-[-9px] top-1 w-4 h-4 ${t.color} rounded-full`}
                      />
                      <p className="text-2xl font-bold text-primary mb-1">
                        {t.year}
                      </p>
                      <h4 className="text-base font-semibold mb-2">
                        {t.title}
                      </h4>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. CTA with image ────────────────────────────────── */}
      <section className="relative bg-gradient-cta text-white overflow-hidden">
        <div className="absolute top-1/2 right-[-100px] w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full bg-violet/10 blur-3xl" />
        <ConcentricCircles
          className="left-[-150px] bottom-[-200px]"
          size={600}
          color="#ffffff"
          opacity={0.04}
        />

        <div className="max-w-7xl mx-auto px-4 py-20 md:py-24 flex flex-col md:flex-row items-center relative z-10">
          <FadeIn direction="left" className="flex-1">
            <p className="text-sm tracking-[0.3em] text-sky/80 mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-sky/60" />
              SẴN SÀNG BẮT ĐẦU?
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4">
              ĐỂ BOT LÀM VIỆC
              <br />
              CHO BẠN.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
              Chọn gói Operisbot phù hợp, cắm điện và bắt đầu ngay hôm nay.
              Tiết kiệm 80% chi phí, bảo mật tuyệt đối, hoạt động 24/7.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-white text-foreground text-sm tracking-widest px-8 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                XEM SẢN PHẨM
              </Link>
              <Link
                href="/contact"
                className="border border-white/40 text-white text-sm tracking-widest px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                LIÊN HỆ TƯ VẤN
              </Link>
            </div>
          </FadeIn>

          <FadeIn
            direction="right"
            className="flex-1 mt-10 md:mt-0 flex justify-center"
          >
            <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[340px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/images/about-6.webp"
                  alt="Operisbot thiết bị AI"
                  fill
                  sizes="(max-width: 768px) 300px, 420px"
                  className="object-cover"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-10 bg-sky/20 rounded-full blur-2xl" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 12. Subscribe ─────────────────────────────────────── */}
      <SubscribeSection />
    </>
  );
}
