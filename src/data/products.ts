export type { Product, ProductSpec, ProductFullSpec } from "@/lib/api/products";

// import type { Product } from "@/lib/api/products";

/** Fallback hardcoded products for dev / offline usage */
// export const products: Product[] = [
//   {
//     id: "prod-001",
//     slug: "operisbot-ca-nhan-1",
//     name: "OPERISBOT CÁ NHÂN 1",
//     price: 3000000,
//     image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400&h=500&fit=crop",
//     category: "Mini PC Windows",
//     tags: ["Người mới", "Cá nhân"],
//     brand: "Operis",
//     specs: [
//       { id: "spec-cpu-1", value: "Intel N100", sort_order: 1 },
//       { id: "spec-ram-1", value: "8GB RAM", sort_order: 2 },
//       { id: "spec-ssd-1", value: "256GB SSD", sort_order: 3 },
//     ],
//     fullSpecs: [
//       { id: "fs-01", group_name: "Hiệu năng", label: "Bộ xử lý (CPU)", value: "Intel N100, 4 nhân 4 luồng, xung nhịp tối đa 3.4GHz", sort_order: 1 },
//       { id: "fs-02", group_name: "Hiệu năng", label: "Đồ họa (GPU)", value: "Intel UHD Graphics 24EUs", sort_order: 2 },
//       { id: "fs-03", group_name: "Hiệu năng", label: "Bộ nhớ (RAM)", value: "8GB DDR4 3200MHz", sort_order: 3 },
//       { id: "fs-04", group_name: "Hiệu năng", label: "Lưu trữ (SSD)", value: "256GB NVMe M.2 2280", sort_order: 4 },
//       { id: "fs-05", group_name: "Hiệu năng", label: "Hệ điều hành", value: "Windows 11 Pro (bản quyền, cài sẵn)", sort_order: 5 },
//       { id: "fs-06", group_name: "Kết nối & Cổng", label: "Kết nối WiFi", value: "WiFi 6 (802.11ax)", sort_order: 1 },
//       { id: "fs-07", group_name: "Kết nối & Cổng", label: "Bluetooth", value: "Bluetooth 5.2", sort_order: 2 },
//       { id: "fs-08", group_name: "Kết nối & Cổng", label: "Cổng mạng LAN", value: "Gigabit Ethernet RJ45", sort_order: 3 },
//       { id: "fs-09", group_name: "Kết nối & Cổng", label: "Cổng USB", value: "2x USB 3.2 (Type-A), 1x USB-C, 2x USB 2.0", sort_order: 4 },
//       { id: "fs-10", group_name: "Kết nối & Cổng", label: "Xuất hình ảnh", value: "1x HDMI 2.0 (4K@60Hz)", sort_order: 5 },
//       { id: "fs-11", group_name: "Thiết kế & Vật lý", label: "Công suất nguồn", value: "Adapter 36W (12V/3A)", sort_order: 1 },
//       { id: "fs-12", group_name: "Thiết kế & Vật lý", label: "Kích thước", value: "115 × 106 × 42 mm", sort_order: 2 },
//       { id: "fs-13", group_name: "Thiết kế & Vật lý", label: "Trọng lượng", value: "0.35 kg", sort_order: 3 },
//       { id: "fs-14", group_name: "Phần mềm & Bảo hành", label: "Token tặng kèm", value: "2.000.000 Token", sort_order: 1 },
//       { id: "fs-15", group_name: "Phần mềm & Bảo hành", label: "Phần mềm đi kèm", value: "Operisbot Suite — cài sẵn Workflow tự động hóa", sort_order: 2 },
//       { id: "fs-16", group_name: "Phần mềm & Bảo hành", label: "Bảo hành", value: "24 tháng chính hãng Operis", sort_order: 3 },
//     ],
//     stock: 20,
//     sku: "OPB-001",
//     description: "Thiết bị Trợ lý AI Vật lý dành cho người mới bắt đầu. Cắm điện là chạy, tặng sẵn 2.000.000 Token. Bảo mật tuyệt đối — AI chạy riêng trên thiết bị, không ảnh hưởng máy tính cá nhân.",
//     rating: 4.8,
//     tokenBonus: 2000000,
//   },
//   {
//     id: "prod-002",
//     slug: "operisbot-ca-nhan-2",
//     name: "OPERISBOT CÁ NHÂN 2",
//     price: 5500000,
//     image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=500&fit=crop",
//     category: "Mini PC Windows",
//     tags: ["Cường độ cao", "Cá nhân"],
//     brand: "Operis",
//     specs: [
//       { id: "spec-cpu-2", value: "Intel i5-12450H", sort_order: 1 },
//       { id: "spec-ram-2", value: "16GB RAM", sort_order: 2 },
//       { id: "spec-ssd-2", value: "512GB SSD", sort_order: 3 },
//     ],
//     fullSpecs: [
//       { id: "fs-21", group_name: "Hiệu năng", label: "Bộ xử lý (CPU)", value: "Intel Core i5-12450H, 8 nhân 12 luồng, xung nhịp tối đa 4.4GHz", sort_order: 1 },
//       { id: "fs-22", group_name: "Hiệu năng", label: "Đồ họa (GPU)", value: "Intel UHD Graphics 48EUs", sort_order: 2 },
//       { id: "fs-23", group_name: "Hiệu năng", label: "Bộ nhớ (RAM)", value: "16GB DDR5 4800MHz", sort_order: 3 },
//       { id: "fs-24", group_name: "Hiệu năng", label: "Lưu trữ (SSD)", value: "512GB NVMe M.2 2280 PCIe 4.0", sort_order: 4 },
//       { id: "fs-25", group_name: "Hiệu năng", label: "Hệ điều hành", value: "Windows 11 Pro (bản quyền, cài sẵn)", sort_order: 5 },
//       { id: "fs-26", group_name: "Kết nối & Cổng", label: "Kết nối WiFi", value: "WiFi 6E (802.11ax)", sort_order: 1 },
//       { id: "fs-27", group_name: "Kết nối & Cổng", label: "Bluetooth", value: "Bluetooth 5.3", sort_order: 2 },
//       { id: "fs-28", group_name: "Kết nối & Cổng", label: "Cổng mạng LAN", value: "2.5 Gigabit Ethernet RJ45", sort_order: 3 },
//       { id: "fs-29", group_name: "Kết nối & Cổng", label: "Cổng USB", value: "2x USB 3.2 (Type-A), 2x USB-C 3.2, 2x USB 2.0", sort_order: 4 },
//       { id: "fs-30", group_name: "Kết nối & Cổng", label: "Xuất hình ảnh", value: "1x HDMI 2.1 (4K@120Hz), 1x DisplayPort 1.4", sort_order: 5 },
//       { id: "fs-31", group_name: "Thiết kế & Vật lý", label: "Tản nhiệt", value: "Quạt kép + ống dẫn nhiệt đồng", sort_order: 1 },
//       { id: "fs-32", group_name: "Thiết kế & Vật lý", label: "Công suất nguồn", value: "Adapter 65W (19V/3.42A)", sort_order: 2 },
//       { id: "fs-33", group_name: "Thiết kế & Vật lý", label: "Kích thước", value: "127 × 127 × 50 mm", sort_order: 3 },
//       { id: "fs-34", group_name: "Thiết kế & Vật lý", label: "Trọng lượng", value: "0.52 kg", sort_order: 4 },
//       { id: "fs-35", group_name: "Phần mềm & Bảo hành", label: "Token tặng kèm", value: "5.000.000 Token", sort_order: 1 },
//       { id: "fs-36", group_name: "Phần mềm & Bảo hành", label: "Phần mềm đi kèm", value: "Operisbot Suite Pro — Workflow nâng cao + AI Assistant", sort_order: 2 },
//       { id: "fs-37", group_name: "Phần mềm & Bảo hành", label: "Bảo hành", value: "24 tháng chính hãng Operis", sort_order: 3 },
//     ],
//     stock: 10,
//     sku: "OPB-002",
//     description: "Thiết bị Trợ lý AI Vật lý dành cho công việc cường độ cao. Cắm điện là chạy, tặng sẵn 5.000.000 Token. Hiệu năng mạnh mẽ, chạy 24/7 bền bỉ, bảo mật tuyệt đối.",
//     rating: 4.9,
//     tokenBonus: 5000000,
//   },
// ];

export const categories = ["Tất cả", "Mini PC Windows"];
export const tags = ["Người mới", "Cường độ cao", "Cá nhân"];
export const brands = ["Operis"];

/** Format VND price */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}
