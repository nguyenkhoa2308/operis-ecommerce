import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowDown,
  DollarSign,
  AlertTriangle,
  TrendingDown,
  ShieldOff,
  Cpu,
  Coins,
  Workflow,
  Rocket,
  CheckCircle2,
  ShieldCheck,
  Database,
  Wrench,
  Phone,
  FileSearch,
  Settings,
  PackageCheck,
  X as XIcon,
} from "lucide-react";
import { JsonLdScript } from "@/components/json-ld-script";
import { enterprisePageJsonLd } from "@/lib/json-ld";
import { ConcentricCircles, DotGrid } from "@/components/ui/decorative-pattern";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { EnterpriseWorkflowTabs } from "@/components/enterprise/enterprise-workflow-tabs";
import { EnterpriseFaq } from "@/components/enterprise/enterprise-faq";
import { ConsultationForm } from "@/components/enterprise/consultation-form";
import { SubscribeSection } from "@/components/home/subscribe-section";

export const metadata: Metadata = {
  title: "Enterprise — Giải pháp tự động hóa cho Doanh nghiệp | Operisbot",
  description:
    "Tùy biến phần cứng, Token, Workflow theo nhu cầu doanh nghiệp. Giảm 80% chi phí vận hành, tăng năng suất gấp 10 lần với Operisbot Enterprise.",
  alternates: { canonical: "/enterprise" },
  openGraph: {
    title: "Enterprise — Giải pháp tự động hóa cho Doanh nghiệp | Operisbot",
    description:
      "Tùy biến phần cứng, Token, Workflow theo nhu cầu doanh nghiệp. Giảm 80% chi phí vận hành, tăng năng suất gấp 10 lần với Operisbot Enterprise.",
    url: "https://operis.vn/enterprise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise — Giải pháp tự động hóa cho Doanh nghiệp | Operisbot",
    description:
      "Tùy biến phần cứng, Token, Workflow theo nhu cầu doanh nghiệp. Giảm 80% chi phí vận hành, tăng năng suất gấp 10 lần với Operisbot Enterprise.",
  },
};

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */

const painPoints = [
  {
    icon: DollarSign,
    title: "Chi phí nhân sự cao",
    desc: "Thuê 5-10 nhân viên cho các tác vụ lặp lại: CSKH, nhập liệu, đăng bài, báo cáo. Lương + BHXH + office = hàng trăm triệu/tháng.",
    color: "text-rose",
    bg: "bg-rose/10",
  },
  {
    icon: AlertTriangle,
    title: "Sai sót thủ công",
    desc: "Nhập sai hóa đơn, quên follow-up khách, bỏ lọt CV ứng viên, copy-paste sai dữ liệu. Con người mệt mỏi = sai sót tích lũy.",
    color: "text-amber",
    bg: "bg-amber/10",
  },
  {
    icon: TrendingDown,
    title: "Không scale được",
    desc: "Tuyển thêm người → thêm quản lý → thêm chi phí. Doanh nghiệp tăng trưởng nhưng lợi nhuận thì không — vì nhân sự là bottleneck.",
    color: "text-violet",
    bg: "bg-violet/10",
  },
  {
    icon: ShieldOff,
    title: "Rủi ro bảo mật",
    desc: "Nhân viên truy cập dữ liệu nhạy cảm, dùng SaaS bên thứ ba, mật khẩu công ty trên cloud. Một lần rò rỉ = thiệt hại khổng lồ.",
    color: "text-sky",
    bg: "bg-sky/10",
  },
];

const configSteps = [
  {
    icon: Cpu,
    title: "Phần cứng",
    desc: "Chọn cấu hình Mini PC phù hợp quy mô: RAM, SSD, CPU theo số lượng Workflow chạy đồng thời.",
    gradient: "from-sky to-primary",
  },
  {
    icon: Coins,
    title: "Token",
    desc: "Gói Token linh hoạt — mua theo tháng hoặc theo năm, không giới hạn số lượng Workflow.",
    gradient: "from-violet to-primary",
  },
  {
    icon: Workflow,
    title: "Workflow",
    desc: "Chọn từ kho 100+ Workflow có sẵn hoặc yêu cầu xây dựng Workflow riêng theo quy trình doanh nghiệp.",
    gradient: "from-emerald to-teal",
  },
  {
    icon: Rocket,
    title: "Triển khai",
    desc: "Đội ngũ kỹ thuật cài đặt, testing và bàn giao tận nơi. Training nhân viên vận hành.",
    gradient: "from-rose to-violet",
  },
];

const comparisonRows = [
  {
    label: "Chi phí khởi tạo",
    hire: "Thấp",
    saas: "Thấp",
    operis: "Trung bình",
  },
  {
    label: "Chi phí vận hành/tháng",
    hire: "Rất cao",
    saas: "Trung bình",
    operis: "Rất thấp",
  },
  { label: "Tốc độ xử lý", hire: "Chậm", saas: "Nhanh", operis: "Rất nhanh" },
  { label: "Hoạt động 24/7", hire: false, saas: true, operis: true },
  {
    label: "Bảo mật dữ liệu",
    hire: "Rủi ro",
    saas: "Phụ thuộc vendor",
    operis: "Tuyệt đối",
  },
  {
    label: "Tùy biến quy trình",
    hire: "Cao",
    saas: "Hạn chế",
    operis: "Không giới hạn",
  },
  { label: "Scale không tăng chi phí", hire: false, saas: false, operis: true },
  { label: "Không phụ thuộc internet", hire: true, saas: false, operis: true },
];

const deploySteps = [
  {
    icon: Phone,
    number: "01",
    title: "Tư vấn & Khảo sát",
    desc: "Đội ngũ tư vấn phân tích quy trình hiện tại, xác định Workflow cần tự động hóa, đề xuất cấu hình phù hợp.",
    color: "from-sky to-primary",
  },
  {
    icon: FileSearch,
    number: "02",
    title: "Báo giá & Xác nhận",
    desc: "Gửi báo giá chi tiết trong 24h. Sau khi xác nhận, tiến hành đặt hàng phần cứng và chuẩn bị Workflow.",
    color: "from-violet to-primary",
  },
  {
    icon: Settings,
    number: "03",
    title: "Cài đặt & Testing",
    desc: "Cấu hình phần cứng, cài đặt Workflow, kết nối tài khoản, testing toàn bộ quy trình trước khi bàn giao.",
    color: "from-amber to-orange",
  },
  {
    icon: PackageCheck,
    number: "04",
    title: "Bàn giao & Training",
    desc: "Giao thiết bị tận nơi, training nhân viên vận hành, cung cấp tài liệu hướng dẫn và kênh hỗ trợ riêng.",
    color: "from-emerald to-teal",
  },
];

const trustCards = [
  {
    icon: ShieldCheck,
    title: "Hardware Sandbox",
    desc: 'AI chạy trên phần cứng riêng — hoàn toàn cách ly khỏi hệ thống nội bộ. Dữ liệu nhạy cảm trên máy chính "vô hình" trước AI.',
    color: "text-sky",
    bg: "bg-sky/10",
  },
  {
    icon: Database,
    title: "Dữ liệu không rời thiết bị",
    desc: "Không cloud, không server trung gian, không bên thứ ba. Mọi xử lý diễn ra local trên thiết bị đặt tại văn phòng bạn.",
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
  {
    icon: Wrench,
    title: "Bảo hành 24 tháng",
    desc: "Phần cứng bảo hành 24 tháng, hỗ trợ kỹ thuật 24/7 qua hotline riêng. Cam kết phản hồi trong 30 phút.",
    color: "text-violet",
    bg: "bg-violet/10",
  },
];

/* ================================================================== */
/*  HELPERS                                                            */
/* ================================================================== */

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckCircle2 size={18} className="text-emerald mx-auto" />
    ) : (
      <XIcon size={18} className="text-rose/60 mx-auto" />
    );
  }
  return <span>{value}</span>;
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function EnterprisePage() {
  return (
    <main>
      <JsonLdScript data={enterprisePageJsonLd()} />

      {/* ============================================================ */}
      {/* S1 — HERO                                                     */}
      {/* ============================================================ */}
      <section className="enterprise-hero relative overflow-hidden min-h-[620px] md:min-h-[720px] flex items-center">
        {/* Background image (blurred) */}
        <Image
          src="/images/enterprise-landing.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          aria-hidden="true"
        />
        {/* Dark overlay + color tint */}
        <div className="absolute inset-0 bg-[#0a0f1a]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/40 via-transparent to-[#0a0f1a]/60" />
        {/* Colored glows */}
        <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-violet/10 blur-[100px] animate-pulse [animation-delay:2s]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] enterprise-hero-grid" />

        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10 w-full">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span className="text-xs tracking-[0.2em] text-white/70 font-medium">
                OPERISBOT ENTERPRISE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              ĐỪNG THUÊ THÊM NGƯỜI.
              <br />
              <span className="bg-gradient-to-r from-sky via-primary to-violet bg-clip-text text-transparent">
                HÃY ĐỂ BOT LÀM.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-10">
              Thiết bị AI chạy 24/7 trên phần cứng riêng — tự động hóa tuyển
              dụng, thuế, CSKH, marketing, thiết kế, quản lý kho.
              <span className="text-white/70 font-medium">
                {" "}
                Tùy biến hoàn toàn theo quy trình doanh nghiệp.
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              <Link
                href="#lien-he"
                className="group inline-flex items-center gap-2 bg-accent text-white text-xs tracking-widest px-7 py-3.5 hover:bg-accent/90 transition-all rounded-full shadow-lg shadow-accent/20"
              >
                NHẬN TƯ VẤN MIỄN PHÍ
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href="#giai-phap"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 text-xs tracking-widest px-7 py-3.5 hover:bg-white/[0.06] hover:border-white/30 transition-all rounded-full backdrop-blur-sm"
              >
                XEM GIẢI PHÁP <ArrowDown size={14} />
              </Link>
            </div>
            {/* Stats bar */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-14 border-t border-white/[0.08] pt-8">
              {[
                {
                  value: "80%",
                  label: "Giảm chi phí vận hành",
                  color: "text-emerald",
                },
                { value: "10x", label: "Tăng năng suất", color: "text-sky" },
                {
                  value: "24/7",
                  label: "Hoạt động liên tục",
                  color: "text-violet",
                },
                {
                  value: "100%",
                  label: "Bảo mật dữ liệu",
                  color: "text-amber",
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/40 mt-1.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/* S2 — PAIN POINTS                                              */}
      {/* ============================================================ */}
      <section className="bg-white relative overflow-hidden">
        <ConcentricCircles
          className="left-[-100px] top-[-80px]"
          size={300}
          color="#6b8fb5"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              VẤN ĐỀ DOANH NGHIỆP GẶP PHẢI
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              ĐANG CHI BAO NHIÊU CHO TÁC VỤ LẶP LẠI?
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((p) => (
              <StaggerItem
                key={p.title}
                className="bg-muted/30 border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-full ${p.bg} flex items-center justify-center mb-4`}
                >
                  <p.icon size={24} className={p.color} strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-semibold mb-2">{p.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================================ */}
      {/* S3 — GIẢI PHÁP                                                */}
      {/* ============================================================ */}
      <section
        id="giai-phap"
        className="scroll-mt-20 bg-[#f8fafc] relative overflow-hidden"
      >
        <DotGrid
          className="right-0 top-0"
          color="#8b5cf6"
          opacity={0.04}
          cols={8}
          rows={8}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <FadeIn direction="left">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-1.png"
                  alt="Operisbot Enterprise giải pháp"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              </div>
            </FadeIn>
            {/* Text */}
            <FadeIn direction="right">
              <p className="text-sm tracking-widest text-primary font-medium mb-3">
                GIẢI PHÁP TOÀN DIỆN
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
                MỘT THIẾT BỊ.
                <br />
                THAY THẾ CẢ TEAM.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Operisbot Enterprise là thiết bị Mini PC AI chạy 24/7 trên phần
                cứng riêng — tự động hóa mọi tác vụ lặp lại trong doanh nghiệp.
                Không cần thuê thêm người, không lo bảo mật, không phụ thuộc
                SaaS.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Chạy trên phần cứng riêng — dữ liệu không rời văn phòng",
                  "Tùy biến Workflow theo quy trình riêng của doanh nghiệp",
                  "Hoạt động 24/7 — tắt máy tính, bot vẫn làm việc",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-emerald shrink-0 mt-0.5"
                    />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="#lien-he"
                className="inline-flex items-center gap-2 bg-foreground text-white text-xs tracking-widest px-6 py-3 hover:bg-primary transition-colors rounded-full"
              >
                TƯ VẤN NGAY <ArrowRight size={14} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* S4 — CẤU HÌNH TÙY BIẾN (4-step timeline)                     */}
      {/* ============================================================ */}
      <section className="bg-white relative overflow-hidden">
        <ConcentricCircles
          className="right-[-120px] bottom-[-80px]"
          size={350}
          color="#10b981"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              TÙY BIẾN HOÀN TOÀN
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              CẤU HÌNH THEO NHU CẦU DOANH NGHIỆP
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {configSteps.map((step, i) => (
              <StaggerItem key={step.title} className="relative">
                {/* Connector line (hidden on first and mobile) */}
                {i > 0 && (
                  <div className="hidden lg:block absolute -left-3 top-8 w-6 border-t-2 border-dashed border-border" />
                )}
                <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <step.icon
                      size={24}
                      className="text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-xs text-primary font-bold tracking-widest mb-2">
                    BƯỚC {i + 1}
                  </p>
                  <h4 className="text-base font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================================ */}
      {/* S5 — ENTERPRISE WORKFLOWS (6 tabs)                            */}
      {/* ============================================================ */}
      <section className="bg-[#f8fafc] relative overflow-hidden">
        <ConcentricCircles
          className="left-[-100px] bottom-[-80px]"
          size={300}
          color="#8b5cf6"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              WORKFLOW DOANH NGHIỆP
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              6 NHÓM TÁC VỤ TỰ ĐỘNG HÓA
            </h2>
          </FadeIn>
          <EnterpriseWorkflowTabs />
        </div>
      </section>

      {/* ============================================================ */}
      {/* S6 — SO SÁNH 3 CHIỀU                                         */}
      {/* ============================================================ */}
      <section className="bg-white relative overflow-hidden">
        <DotGrid
          className="right-0 bottom-0"
          color="#10b981"
          opacity={0.04}
          cols={8}
          rows={6}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              SO SÁNH GIẢI PHÁP
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              THUÊ NHÂN SỰ vs SAAS vs OPERISBOT
            </h2>
          </FadeIn>

          {/* Desktop table */}
          <FadeIn className="hidden md:block">
            <div className="bg-white rounded-2xl border border-border/50 overflow-hidden shadow-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left px-6 py-4 font-medium text-muted-foreground bg-muted/50">
                      Tiêu chí
                    </th>
                    <th className="text-center px-6 py-4 font-medium text-muted-foreground bg-muted/50">
                      Thuê nhân sự
                    </th>
                    <th className="text-center px-6 py-4 font-medium text-muted-foreground bg-muted/50">
                      SaaS tools
                    </th>
                    <th className="text-center px-6 py-4 font-semibold text-white bg-primary">
                      Operisbot
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i % 2 === 0 ? "bg-white" : "bg-muted/20"}
                    >
                      <td className="px-6 py-3.5 font-medium">{row.label}</td>
                      <td className="px-6 py-3.5 text-center text-muted-foreground">
                        <CellValue value={row.hire} />
                      </td>
                      <td className="px-6 py-3.5 text-center text-muted-foreground">
                        <CellValue value={row.saas} />
                      </td>
                      <td className="px-6 py-3.5 text-center font-semibold text-primary bg-primary/[0.03]">
                        <CellValue value={row.operis} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Mobile cards */}
          <StaggerContainer className="md:hidden space-y-4">
            {comparisonRows.map((row) => (
              <StaggerItem
                key={row.label}
                className="bg-white rounded-xl border border-border/50 p-4"
              >
                <p className="text-sm font-semibold mb-3">{row.label}</p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-muted/30 rounded-lg p-2">
                    <p className="text-muted-foreground mb-1">Nhân sự</p>
                    <p className="font-medium">
                      <CellValue value={row.hire} />
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-2">
                    <p className="text-muted-foreground mb-1">SaaS</p>
                    <p className="font-medium">
                      <CellValue value={row.saas} />
                    </p>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-2">
                    <p className="text-primary mb-1">Operisbot</p>
                    <p className="font-semibold text-primary">
                      <CellValue value={row.operis} />
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================================ */}
      {/* S7 — LỘ TRÌNH TRIỂN KHAI                                      */}
      {/* ============================================================ */}
      <section className="bg-[#f8fafc] relative overflow-hidden">
        <ConcentricCircles
          className="right-[-100px] top-[-80px]"
          size={300}
          color="#6b8fb5"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              LỘ TRÌNH TRIỂN KHAI
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              TỪ TƯ VẤN ĐẾN BÀN GIAO TRONG 7 NGÀY
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deploySteps.map((step, i) => (
              <StaggerItem key={step.number} className="relative">
                {/* Connector line on desktop */}
                {i > 0 && (
                  <div className="hidden lg:block absolute -left-3 top-6 w-6 border-t-2 border-dashed border-primary/20" />
                )}
                <div className="bg-white border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-shadow h-full">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-4`}
                  >
                    <span className="text-sm font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================================ */}
      {/* S8 — BẢO MẬT & UY TÍN                                        */}
      {/* ============================================================ */}
      <section className="bg-white relative overflow-hidden">
        <DotGrid
          className="left-0 bottom-0"
          color="#8b5cf6"
          opacity={0.04}
          cols={8}
          rows={6}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              BẢO MẬT & UY TÍN
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              AN TÂM TUYỆT ĐỐI VỚI DỮ LIỆU DOANH NGHIỆP
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustCards.map((card) => (
              <StaggerItem
                key={card.title}
                className="bg-white border border-border/50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-full ${card.bg} flex items-center justify-center mx-auto mb-5`}
                >
                  <card.icon
                    size={28}
                    className={card.color}
                    strokeWidth={1.5}
                  />
                </div>
                <h4 className="text-base font-semibold mb-2">{card.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================================ */}
      {/* S9 — FAQ                                                       */}
      {/* ============================================================ */}
      <section className="bg-[#f8fafc] relative overflow-hidden">
        <ConcentricCircles
          className="left-[-100px] top-[-80px]"
          size={300}
          color="#10b981"
          opacity={0.04}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-10">
            <p className="text-sm tracking-widest text-primary font-medium mb-3">
              CÂU HỎI THƯỜNG GẶP
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              FAQ ENTERPRISE
            </h2>
          </FadeIn>
          <EnterpriseFaq />
        </div>
      </section>

      {/* ============================================================ */}
      {/* S10 — CTA + FORM                                              */}
      {/* ============================================================ */}
      <section
        id="lien-he"
        className="scroll-mt-20 bg-gradient-cta relative overflow-hidden"
      >
        <ConcentricCircles
          className="right-[-150px] top-[-100px]"
          size={400}
          color="#ffffff"
          opacity={0.05}
        />
        <DotGrid
          className="left-0 bottom-0"
          color="#ffffff"
          opacity={0.03}
          cols={10}
          rows={8}
          gap={28}
        />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <FadeIn className="text-center mb-12">
            <p className="text-sm tracking-widest text-white/60 font-medium mb-3">
              BẮT ĐẦU NGAY HÔM NAY
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              NHẬN TƯ VẤN & BÁO GIÁ MIỄN PHÍ
            </h2>
            <p className="text-base text-white/50 mt-3 max-w-xl mx-auto">
              Điền thông tin bên dưới — đội ngũ Enterprise sẽ liên hệ trong 24h.
            </p>
          </FadeIn>
          <ConsultationForm />
        </div>
      </section>

      {/* ============================================================ */}
      {/* S11 — SUBSCRIBE                                               */}
      {/* ============================================================ */}
      <SubscribeSection />
    </main>
  );
}
