# Operisbot E-Commerce

Frontend cho nền tảng bán thiết bị Operisbot & gói token AI API. Xây dựng bằng Next.js 16, React 19, Tailwind CSS 4 và Zustand.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React Compiler)
- **UI**: Tailwind CSS 4, Lucide Icons, Motion
- **State**: Zustand (auth, cart, toast)
- **HTTP**: Axios (interceptors, auto-refresh token)
- **Charts**: Recharts
- **Date**: Day.js, Ant Design RangePicker

## Cấu trúc thư mục

```
src/
├── app/                    # Pages (App Router)
│   ├── about/              # Giới thiệu
│   ├── account/            # Tài khoản (orders, token, api-usage, transactions)
│   ├── cart/               # Giỏ hàng
│   ├── checkout/           # Thanh toán (QR chuyển khoản)
│   ├── contact/            # Liên hệ
│   ├── login/              # Đăng nhập
│   ├── register/           # Đăng ký
│   ├── shop/               # Cửa hàng & chi tiết sản phẩm
│   └── support/            # Hỗ trợ (FAQ, shipping, return policy, tracking)
├── components/
│   ├── account/            # Sidebar, deposit QR modal
│   ├── home/               # Hero, featured products, CTA, subscribe...
│   ├── layout/             # Header, Footer, Cart sidebar
│   ├── product/            # Reviews
│   └── ui/                 # Toast, Confirm modal, Product card, Page banner...
├── data/                   # Static data (products, blogs, token plans)
├── hooks/                  # Custom hooks (useProvinces)
├── lib/
│   ├── api/                # API modules (auth, products, orders, deposits, analytics, reviews)
│   ├── axios.ts            # Axios instance + interceptors
│   └── auth-tokens.ts      # Token management (access/refresh)
└── store/                  # Zustand stores (auth, cart, toast)
```

## Tính năng chính

- Đăng ký / Đăng nhập (JWT + refresh token)
- Cửa hàng sản phẩm (filter, search, pagination)
- Giỏ hàng (persist localStorage)
- Checkout với QR thanh toán chuyển khoản
- Quản lý đơn hàng (infinite scroll, cancel, payment check)
- Mua token AI API + lịch sử giao dịch
- Dashboard API Usage (biểu đồ, thống kê theo period)
- Đánh giá sản phẩm
- Skeleton loading toàn bộ trang
- Toast notifications
- Responsive design

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Biến môi trường

Tạo file `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Build

```bash
npm run build
npm start
```
