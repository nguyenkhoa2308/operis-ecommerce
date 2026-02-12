const steps = [
  {
    number: "01",
    title: "Cắm điện & Kết nối mạng",
    desc: "Mở hộp, cắm nguồn, kết nối WiFi hoặc cáp mạng. Thiết bị tự khởi động và sẵn sàng trong 30 giây.",
  },
  {
    number: "02",
    title: "Chọn Workflow phù hợp",
    desc: "Duyệt kho Workflow có sẵn: quản lý MXH, scraping dữ liệu, theo dõi đối thủ, gửi email tự động và hàng trăm tác vụ khác.",
  },
  {
    number: "03",
    title: "Để Bot làm việc 24/7",
    desc: "Operisbot chạy liên tục trên thiết bị riêng. Tắt máy tính, đi ngủ — bot vẫn hoàn thành công việc cho bạn.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">BẮT ĐẦU TRONG 30 GIÂY</p>
          <h2 className="text-3xl font-semibold tracking-tight">CÁCH HOẠT ĐỘNG</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border" />
              )}
              <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-5">
                <span className="text-lg font-semibold text-primary">{step.number}</span>
              </div>
              <h4 className="text-base font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
