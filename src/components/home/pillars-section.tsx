import { ShieldCheck, Plug, Workflow } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "An toàn vật lý",
    subtitle: "Hardware Sandbox",
    desc: "AI chạy trên thiết bị riêng. Dữ liệu cá nhân, mật khẩu, tài chính trên máy chính hoàn toàn \"vô hình\" trước AI.",
  },
  {
    icon: Plug,
    title: "Cắm là chạy",
    subtitle: "Zero Config",
    desc: "Không cần cài Python, không cần Proxy, không cần mua tài khoản AI đắt đỏ. Mọi thứ nằm trong chiếc hộp nhỏ gọn.",
  },
  {
    icon: Workflow,
    title: "Workflow thông minh",
    subtitle: "Chính xác 100%",
    desc: "Thay vì chat vu vơ, Operisbot chạy theo quy trình. Tiết kiệm Token gấp 10 lần, đạt độ chính xác tuyệt đối.",
  },
];

export function PillarsSection() {
  return (
    <section className="bg-muted">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">TẠI SAO CHỌN OPERISBOT?</p>
          <h2 className="text-3xl font-semibold tracking-tight">BẢO MẬT — TIỆN LỢI — THÔNG MINH</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white p-8 text-center rounded-lg">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <p.icon size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <h4 className="text-base font-semibold mb-1">{p.title}</h4>
              <p className="text-xs text-primary tracking-widest mb-3">{p.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
