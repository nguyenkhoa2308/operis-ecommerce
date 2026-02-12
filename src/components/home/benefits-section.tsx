import { Truck, Award, Tag, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    desc: "Miễn phí giao hàng toàn quốc cho đơn từ 2 triệu.",
  },
  {
    icon: Award,
    title: "BẢO HÀNH CHÍNH HÃNG",
    desc: "Bảo hành 24 tháng, hỗ trợ kỹ thuật trọn đời.",
  },
  {
    icon: Tag,
    title: "ƯU ĐÃI MỖI NGÀY",
    desc: "Khuyến mãi hấp dẫn, giá tốt nhất thị trường.",
  },
  {
    icon: ShieldCheck,
    title: "THANH TOÁN AN TOÀN",
    desc: "Hỗ trợ COD, chuyển khoản, ví điện tử.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <b.icon size={28} className="text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <h3 className="text-xs font-semibold tracking-widest mb-1">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
