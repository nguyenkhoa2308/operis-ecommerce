import Image from "next/image";

const images = [
  { src: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400&h=400&fit=crop", alt: "Operisbot Cá Nhân 1" },
  { src: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop", alt: "Operisbot Cá Nhân 2" },
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop", alt: "Operisbot Workflow" },
  { src: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=400&fit=crop", alt: "Operisbot Setup" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop", alt: "Operisbot Hardware" },
];

export function InstagramSection() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-semibold tracking-widest text-center mb-8">SẢN PHẨM NỔI BẬT</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((img) => (
            <div key={img.alt} className="relative aspect-square overflow-hidden group cursor-pointer">
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 16vw" className="object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
