import type { Metadata } from "next";
import {
  Download,
  Monitor,
  Shield,
  Clock,
  Zap,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tải ứng dụng Operisbot",
  description:
    "Tải và cài đặt ứng dụng Operisbot trên máy tính Windows. Trợ lý AI vật lý — cắm là chạy, bảo mật tuyệt đối.",
};

const DOWNLOAD_URL =
  "https://drive.google.com/file/d/1wRcQrrEy5HJeMgw25CNLLmRtsmNGzNwt/view?usp=drive_link";

const features = [
  {
    icon: Shield,
    title: "Bảo mật tuyệt đối",
    desc: "Dữ liệu được xử lý cục bộ, không qua cloud bên thứ ba.",
  },
  {
    icon: Clock,
    title: "Hoạt động 24/7",
    desc: "Luôn sẵn sàng phục vụ, không cần bật máy tính chính.",
  },
  {
    icon: Zap,
    title: "Hiệu suất cao",
    desc: "Tối ưu riêng cho tác vụ AI, không chia sẻ tài nguyên.",
  },
  {
    icon: RefreshCw,
    title: "Tự động cập nhật",
    desc: "Nhận bản cập nhật mới nhất qua OTA, không cần thao tác.",
  },
];

const steps = [
  { title: "Tải về", desc: "Nhấn nút tải và lưu file cài đặt về máy" },
  { title: "Cài đặt", desc: "Mở file .exe vừa tải, làm theo hướng dẫn trên màn hình" },
  { title: "Đăng nhập", desc: "Dùng tài khoản Operisbot hoặc tạo mới miễn phí" },
  { title: "Sử dụng ngay", desc: "Hệ thống tự cấu hình — bạn chỉ cần bắt đầu làm việc" },
];

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-muted to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <Monitor size={14} className="text-primary" />
            <span className="text-xs tracking-widest text-primary font-medium">
              WINDOWS
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Tải ứng dụng <span className="text-primary">Operisbot</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            Cài đặt Operisbot trên máy tính để trải nghiệm trợ lý AI ngay trên
            thiết bị của bạn. Miễn phí token khi đăng ký.
          </p>

          <Link
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-white text-sm tracking-widest px-8 py-3.5 rounded-full hover:bg-primary transition-colors shadow-lg shadow-foreground/10"
          >
            <Download size={18} />
            TẢI VỀ MÁY TÍNH
          </Link>

          <p className="text-xs text-muted-foreground mt-3">
            Hỗ trợ Windows 10 trở lên
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-center mb-10">
            Tại sao chọn Operisbot?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="text-center p-6 rounded-xl border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon
                    size={22}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-muted">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-center mb-10">
            Hướng dẫn cài đặt
          </h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-border"
              >
                <div className="w-8 h-8 rounded-full bg-foreground text-white text-sm font-semibold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
                {i === steps.length - 1 && (
                  <CheckCircle2
                    size={20}
                    className="text-emerald shrink-0 mt-0.5"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white text-sm tracking-widest px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
            >
              <Download size={16} />
              TẢI NGAY
            </Link>
          </div>
        </div>
      </section>

      {/* Support note */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Gặp vấn đề khi cài đặt? Liên hệ hỗ trợ qua{" "}
            <a
              href="https://zalo.me/0853336668"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Zalo
            </a>{" "}
            hoặc email{" "}
            <a
              href="mailto:hungle@hagency.vn"
              className="text-primary hover:underline"
            >
              hungle@hagency.vn
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
