import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Không tìm thấy sản phẩm</h1>
      <Link href="/shop" className="text-primary mt-4 inline-block">
        Quay lại cửa hàng
      </Link>
    </div>
  );
}
