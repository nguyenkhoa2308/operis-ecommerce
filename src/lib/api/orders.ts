import api from "@/lib/axios";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface OrderItem {
  productSlug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingNote?: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
}

export interface CreateOrderPayload {
  items: { product_slug: string; quantity: number }[];
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_note?: string;
}

export interface OrderPaymentInfo {
  depositOrderId: string;
  orderCode: string;
  amountVnd: number;
  paymentInfo: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    transferContent: string;
    qrCodeUrl: string;
  };
  expiresAt: string;
}

export interface CreateOrderResponse {
  order: Order;
  payment: OrderPaymentInfo;
}

export interface OrderFilters {
  status?: string;
  limit?: number;
  offset?: number;
}

/* ------------------------------------------------------------------ */
/*  Mappers                                                            */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOrderItem(raw: any): OrderItem {
  return {
    productSlug: raw.product_slug ?? raw.productSlug ?? raw.slug ?? "",
    name: raw.name ?? raw.product_name ?? raw.productName ?? "",
    price: raw.price ?? raw.unit_price ?? raw.unitPrice ?? 0,
    quantity: raw.quantity ?? raw.qty ?? 1,
    image: raw.image ?? raw.image_url ?? raw.imageUrl,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOrder(raw: any): Order {
  const items = raw.items ?? raw.order_items ?? raw.orderItems ?? [];
  return {
    id: raw.id ?? raw._id ?? "",
    orderCode: raw.orderCode ?? raw.order_code ?? "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: items.map((i: any) => mapOrderItem(i)),
    totalAmount: raw.totalAmount ?? raw.total_amount ?? raw.total ?? 0,
    status: raw.status ?? "pending",
    shippingName: raw.shipping_name ?? raw.shippingName ?? "",
    shippingPhone: raw.shipping_phone ?? raw.shippingPhone ?? "",
    shippingAddress: raw.shipping_address ?? raw.shippingAddress ?? "",
    shippingNote: raw.shipping_note ?? raw.shippingNote,
    paymentMethod: raw.payment_method ?? raw.paymentMethod ?? "",
    createdAt: raw.createdAt ?? raw.created_at ?? "",
    updatedAt: raw.updatedAt ?? raw.updated_at ?? "",
  };
}

/* ------------------------------------------------------------------ */
/*  API calls                                                          */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPaymentInfo(raw: any): OrderPaymentInfo {
  const pi = raw.payment_info ?? raw.paymentInfo ?? {};
  return {
    depositOrderId: raw.deposit_order_id ?? raw.depositOrderId ?? "",
    orderCode: raw.order_code ?? raw.orderCode ?? "",
    amountVnd: raw.amount_vnd ?? raw.amountVnd ?? 0,
    paymentInfo: {
      bankName: pi.bank_name ?? pi.bankName ?? "",
      accountNumber: pi.account_number ?? pi.accountNumber ?? "",
      accountName: pi.account_name ?? pi.accountName ?? "",
      transferContent: pi.transfer_content ?? pi.transferContent ?? "",
      qrCodeUrl: pi.qr_code_url ?? pi.qrCodeUrl ?? "",
    },
    expiresAt: raw.expires_at ?? raw.expiresAt ?? "",
  };
}

/** POST /orders — create order + get QR payment info */
export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const { data } = await api.post("/orders", payload);
  const orderRaw = data.order ?? data;
  const paymentRaw = data.payment ?? {};
  return {
    order: mapOrder(orderRaw),
    payment: mapPaymentInfo(paymentRaw),
  };
}

/** GET /orders — get current user's order history */
export async function getOrders(filters?: OrderFilters): Promise<OrderListResponse> {
  const { data } = await api.get("/orders", { params: filters });
  const raw = data.orders ?? data.data ?? (Array.isArray(data) ? data : []);
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orders: raw.map((o: any) => mapOrder(o)),
    total: data.total ?? raw.length,
  };
}

/** GET /orders/:id — get order detail */
export async function getOrder(id: string): Promise<Order> {
  const { data } = await api.get(`/orders/${id}`);
  return mapOrder(data.order ?? data);
}

/** GET /orders/:id — get order with payment info (for pending orders) */
export async function getOrderWithPayment(id: string): Promise<{ order: Order; payment: OrderPaymentInfo | null }> {
  const { data } = await api.get(`/orders/${id}`);
  const paymentRaw = data.payment ?? null;
  return {
    order: mapOrder(data.order ?? data),
    payment: paymentRaw ? mapPaymentInfo(paymentRaw) : null,
  };
}

/** GET /orders/:id/track — track order status */
export async function trackOrder(orderId: string): Promise<Order> {
  const { data } = await api.get(`/orders/${orderId}/track`);
  return mapOrder(data);
}

/** DELETE /orders/:id — cancel an order (only when pending) */
export async function cancelOrder(id: string): Promise<void> {
  await api.delete(`/orders/${id}`);
}
