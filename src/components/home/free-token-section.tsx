import {
  Shield,
  Clock,
  Zap,
  Settings,
  Coins,
  RefreshCw,
  Check,
  X,
  Gift,
  Monitor,
  Cpu,
} from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const rows = [
  {
    label: "Bảo mật dữ liệu",
    icon: Shield,
    direct: { text: "Phụ thuộc máy cá nhân", good: false },
    minipc: { text: "Cách ly hoàn toàn, chuyên dụng", good: true },
  },
  {
    label: "Hoạt động 24/7",
    icon: Clock,
    direct: { text: "Phải bật máy liên tục", good: false },
    minipc: { text: "Luôn hoạt động, tiết kiệm điện", good: true },
  },
  {
    label: "Hiệu suất",
    icon: Zap,
    direct: { text: "Chia sẻ tài nguyên với ứng dụng khác", good: false },
    minipc: { text: "Tối ưu riêng cho AI", good: true },
  },
  {
    label: "Cài đặt",
    icon: Settings,
    direct: { text: "Tự cấu hình thủ công", good: false },
    minipc: { text: "Cắm là chạy", good: true },
  },
  {
    label: "Token miễn phí",
    icon: Coins,
    direct: { text: "Có", good: true },
    minipc: { text: "Có (nhiều hơn)", good: true },
  },
  {
    label: "Cập nhật",
    icon: RefreshCw,
    direct: { text: "Thủ công", good: false },
    minipc: { text: "Tự động OTA", good: true },
  },
];

function StatusIcon({ good }: { good: boolean }) {
  return good ? (
    <Check size={14} className="text-emerald shrink-0" strokeWidth={2.5} />
  ) : (
    <X size={14} className="text-rose shrink-0" strokeWidth={2.5} />
  );
}

export function FreeTokenSection() {
  return (
    <section className="py-16 md:py-20 bg-muted relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/20 rounded-full px-4 py-1.5 mb-4">
            <Gift size={14} className="text-amber" />
            <span className="text-xs tracking-widest text-amber font-medium">
              ƯU ĐÃI
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Chương trình miễn phí token sử dụng
          </h2>
          <p className="text-sm text-muted-foreground mb-2">
            Áp dụng cho tất cả khách hàng — mua Mini PC hoặc tải trực tiếp ứng
            dụng
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Để giúp khách hàng có thể tiếp cận đơn giản nhất, tiết kiệm và hiệu
            quả cao, chúng mình cung cấp ưu đãi miễn phí token để bạn có thể sử
            dụng và phát triển các luồng công việc hiệu quả nhất có thể.
          </p>
        </FadeIn>

        {/* Desktop table */}
        <FadeIn delay={0.2} className="hidden md:block">
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] text-sm font-semibold">
              <div className="px-6 py-4 bg-muted/50 border-b border-border">
                Tiêu chí
              </div>
              <div className="px-6 py-4 border-b border-border text-center">
                <div className="inline-flex items-center gap-2">
                  <Monitor size={16} className="text-muted-foreground" />
                  Tải & chạy trực tiếp
                </div>
              </div>
              <div className="px-6 py-4 border-b-2 border-primary bg-primary/5 text-center">
                <div className="inline-flex items-center gap-2">
                  <Cpu size={16} className="text-primary" />
                  <span className="text-primary">Mini PC Operisbot</span>
                  <span className="text-[10px] tracking-wider bg-primary text-white rounded-full px-2 py-0.5 font-medium">
                    KHUYẾN NGHỊ
                  </span>
                </div>
              </div>
            </div>

            {/* Table body */}
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr] text-sm ${
                  i < rows.length - 1 ? "border-b border-border/50" : ""
                } hover:bg-muted/30 transition-colors`}
              >
                <div className="px-6 py-4 flex items-center gap-3 font-medium">
                  <row.icon
                    size={16}
                    className="text-muted-foreground shrink-0"
                    strokeWidth={1.5}
                  />
                  {row.label}
                </div>
                <div className="px-6 py-4 flex items-center justify-center gap-2 text-muted-foreground">
                  <StatusIcon good={row.direct.good} />
                  {row.direct.text}
                </div>
                <div className="px-6 py-4 flex items-center justify-center gap-2 bg-primary/[0.02]">
                  <StatusIcon good={row.minipc.good} />
                  <span className="font-medium">{row.minipc.text}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Mobile: 2 cards */}
        <div className="md:hidden space-y-4">
          {/* Card: Tải trực tiếp */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Monitor size={18} className="text-muted-foreground" />
                <h3 className="font-semibold text-sm">
                  Tải & chạy trực tiếp
                </h3>
              </div>
              <ul className="space-y-3">
                {rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-2.5">
                    <StatusIcon good={row.direct.good} />
                    <div>
                      <span className="text-xs font-medium text-foreground">
                        {row.label}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {row.direct.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Card: Mini PC — highlighted */}
          <FadeIn delay={0.35}>
            <div className="bg-white rounded-xl border-2 border-primary p-5 relative">
              <span className="absolute -top-3 left-4 text-[10px] tracking-wider bg-primary text-white rounded-full px-3 py-1 font-medium">
                KHUYẾN NGHỊ
              </span>
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={18} className="text-primary" />
                <h3 className="font-semibold text-sm text-primary">
                  Mini PC Operisbot
                </h3>
              </div>
              <ul className="space-y-3">
                {rows.map((row) => (
                  <li key={row.label} className="flex items-start gap-2.5">
                    <StatusIcon good={row.minipc.good} />
                    <div>
                      <span className="text-xs font-medium text-foreground">
                        {row.label}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {row.minipc.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
