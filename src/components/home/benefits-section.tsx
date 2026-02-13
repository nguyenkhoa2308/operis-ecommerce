import { Truck, Award, Tag, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    desc: "Miễn phí giao hàng toàn quốc cho đơn từ 2 triệu.",
    color: "text-sky",
    bg: "bg-sky/10",
  },
  {
    icon: Award,
    title: "BẢO HÀNH CHÍNH HÃNG",
    desc: "Bảo hành 24 tháng, hỗ trợ kỹ thuật trọn đời.",
    color: "text-amber",
    bg: "bg-amber/10",
  },
  {
    icon: Tag,
    title: "ƯU ĐÃI MỖI NGÀY",
    desc: "Khuyến mãi hấp dẫn, giá tốt nhất thị trường.",
    color: "text-rose",
    bg: "bg-rose/10",
  },
  {
    icon: ShieldCheck,
    title: "THANH TOÁN AN TOÀN",
    desc: "Hỗ trợ COD, chuyển khoản, ví điện tử.",
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
];

export default function BenefitsSection() {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg ${b.bg} flex items-center justify-center shrink-0`}>
              <b.icon size={20} className={b.color} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-widest mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
