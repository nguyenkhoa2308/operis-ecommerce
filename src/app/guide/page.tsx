"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  UserPlus,
  LogIn,
  Coins,
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  BarChart3,
  ScrollText,
  Workflow,
  FileText,
  MessageCircle,
  Settings,
  HelpCircle,
  Globe,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface Section {
  id: string;
  icon: LucideIcon;
  title: string;
}

const sections: Section[] = [
  { id: "intro", icon: BookOpen, title: "Giới thiệu về Operis" },
  { id: "website", icon: Globe, title: "Truy cập trang web" },
  { id: "register", icon: UserPlus, title: "Đăng ký tài khoản" },
  { id: "login", icon: LogIn, title: "Đăng nhập" },
  { id: "token", icon: Coins, title: "Nạp token" },
  { id: "client", icon: LayoutDashboard, title: "Cổng quản lý" },
  { id: "chat", icon: MessageSquare, title: "Chat" },
  { id: "payment", icon: CreditCard, title: "Thanh toán" },
  { id: "analytics", icon: BarChart3, title: "Phân tích" },
  { id: "logs", icon: ScrollText, title: "Nhật ký" },
  { id: "workflow", icon: Workflow, title: "Workflow" },
  { id: "docs", icon: FileText, title: "Tài liệu" },
  { id: "feedback", icon: MessageCircle, title: "Góp ý" },
  { id: "settings", icon: Settings, title: "Cài đặt" },
  { id: "faq", icon: HelpCircle, title: "Câu hỏi thường gặp" },
];

const faqs = [
  {
    q: "Trợ lý có hiểu tiếng Việt không?",
    a: "Có. Bạn cứ nhắn tin bằng tiếng Việt bình thường, như nhắn tin Zalo vậy.",
  },
  {
    q: "Tôi dùng hết token thì sao?",
    a: "Bạn sẽ không gửi được tin nhắn mới. Hãy vào trang Thanh toán để nạp thêm. Ngoài ra, hệ thống cấp miễn phí một lượng token nhỏ mỗi 5 giờ.",
  },
  {
    q: "Dữ liệu của tôi có an toàn không?",
    a: "Có. Hệ thống chạy trên máy chủ riêng, dữ liệu không bị chia sẻ ra ngoài.",
  },
  {
    q: "Trợ lý có sai không?",
    a: "Có thể. Giống như hỏi một người, đôi khi câu trả lời chưa chính xác 100%. Nên kiểm tra lại thông tin quan trọng.",
  },
  {
    q: "Tôi có thể dùng trên điện thoại không?",
    a: "Có. Mở trình duyệt trên điện thoại, vào đường dẫn do quản trị viên cung cấp. Giao diện tự động điều chỉnh cho màn hình nhỏ.",
  },
  {
    q: "Kết nối WhatsApp/Telegram/Zalo có mất phí không?",
    a: "Không. Kết nối miễn phí. Bạn chỉ tốn token khi gửi tin nhắn (dù qua kênh nào).",
  },
  {
    q: "Workflow là gì, có cần biết lập trình không?",
    a: "Không cần. Workflow giống như đặt hẹn giờ cho trợ lý. Bạn chỉ cần gõ nội dung yêu cầu bằng tiếng Việt bình thường.",
  },
  {
    q: "Liên hệ hỗ trợ ở đâu?",
    a: 'Vào trang "Góp ý" để gửi báo lỗi, hoặc liên hệ qua trang "Liên hệ" tại operis.vn.',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function SectionHeading({ num, title }: { num: number; title: string }) {
  return (
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 flex items-center gap-3">
      <span className="w-9 h-9 rounded-full bg-foreground text-white text-sm font-semibold flex items-center justify-center shrink-0">
        {num}
      </span>
      {title}
    </h2>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2 mb-6">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed">
          <span className="font-semibold text-primary shrink-0">{i + 1}.</span>
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 text-sm text-muted-foreground mb-6">
      <span className="font-semibold text-primary">Lưu ý: </span>
      {children}
    </div>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-base text-muted-foreground">
      <ChevronRight size={16} className="text-primary shrink-0 mt-1" />
      <span>{children}</span>
    </li>
  );
}

function GuideImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-6 flex flex-col items-center">
      <div className="rounded-xl border border-border overflow-hidden w-full sm:w-[70%]">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={500}
          className="w-full h-auto"
          quality={90}
        />
      </div>
      {caption && (
        <figcaption className="text-xs text-muted-foreground text-center mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={faq.q}
            className="border border-border rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-muted text-xs font-semibold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="flex-1 font-medium text-base">{faq.q}</span>
              <ChevronRight
                size={16}
                className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 pl-[3.25rem]">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section content                                                    */
/* ------------------------------------------------------------------ */

function sectionContent(idx: number): ReactNode {
  switch (idx) {
    /* 1 — Giới thiệu */
    case 0:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Operis là trợ lý AI cá nhân, được thiết kế để hỗ trợ bạn trong công
            việc hàng ngày như trả lời câu hỏi, soạn văn bản, tìm kiếm thông
            tin, dịch thuật và nhiều tác vụ khác. Bạn có thể trò chuyện với
            Operis qua trang web hoặc qua các ứng dụng nhắn tin như Zalo,
            Telegram, WhatsApp.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Để bắt đầu sử dụng, bạn cần thực hiện các bước sau theo thứ tự:
          </p>
          <Steps
            items={[
              "Truy cập trang web operis.vn để tìm hiểu về sản phẩm.",
              "Đăng ký tài khoản.",
              "Đăng nhập.",
              "Nạp token (nạp tiền) để sử dụng dịch vụ.",
              "Truy cập Cổng quản lý để bắt đầu trò chuyện với trợ lý AI.",
            ]}
          />
        </>
      );

    /* 2 — Truy cập trang web */
    case 1:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Mở trình duyệt web (Chrome, Safari, Firefox, ...) và truy cập địa
            chỉ:{" "}
            <Link
              href="https://operis.vn"
              target="_blank"
              className="text-primary hover:underline font-medium"
            >
              https://operis.vn
            </Link>
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Đây là trang chủ của Operis. Tại đây, bạn có thể xem thông tin giới
            thiệu về sản phẩm, các gói dịch vụ, và truy cập các trang quan trọng
            khác.
          </p>
          <GuideImage
            src="/images/guide/2.png"
            alt="Trang chủ Operis"
            caption="Giao diện trang chủ operis.vn"
          />
          <div className="space-y-3 mb-4">
            <h3 className="text-lg font-semibold">Cửa hàng</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Nhấn vào mục &quot;Cửa hàng&quot; trên thanh menu để xem danh sách
              các sản phẩm Operis. Tại đây bạn có thể xem các gói sản phẩm với
              mức giá khác nhau. Nhấn vào từng sản phẩm để xem thông tin chi
              tiết.
            </p>
            <GuideImage
              src="/images/guide/2.1-1.png"
              alt="Trang cửa hàng"
              caption="Danh sách sản phẩm tại Cửa hàng"
            />
            <GuideImage
              src="/images/guide/2.1-2.png"
              alt="Chi tiết sản phẩm"
              caption="Trang chi tiết sản phẩm"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Giới thiệu và Liên hệ</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Bạn có thể nhấn vào &quot;Giới thiệu&quot; để tìm hiểu thêm về
              Operis, hoặc &quot;Liên hệ&quot; nếu cần hỗ trợ.
            </p>
            <GuideImage
              src="/images/guide/2.2-1.png"
              alt="Trang giới thiệu"
              caption="Trang Giới thiệu Operis"
            />
            <GuideImage
              src="/images/guide/2.2-2.png"
              alt="Trang liên hệ"
              caption="Trang Liên hệ"
            />
          </div>
        </>
      );

    /* 3 — Đăng ký */
    case 2:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Để sử dụng Operis, bạn cần có tài khoản. Các bước đăng ký như sau:
          </p>
          <Steps
            items={[
              "Truy cập trang operis.vn.",
              'Nhấn nút "Đăng nhập" ở góc trên bên phải.',
              'Tại trang đăng nhập, nhấn vào liên kết "Đăng ký".',
              "Điền đầy đủ thông tin: Họ và tên, Email, Mật khẩu (tối thiểu 8 ký tự), Xác nhận mật khẩu.",
              'Nhấn nút "Đăng ký".',
              "Hệ thống sẽ gửi email xác nhận. Vui lòng kiểm tra hộp thư và xác nhận tài khoản.",
            ]}
          />
          <GuideImage
            src="/images/guide/3.png"
            alt="Trang đăng ký tài khoản"
            caption="Form đăng ký tài khoản"
          />
          <Note>
            Vui lòng nhớ kỹ email và mật khẩu đã đăng ký để đăng nhập sau này.
          </Note>
        </>
      );

    /* 4 — Đăng nhập */
    case 3:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Sau khi đã có tài khoản, bạn đăng nhập để sử dụng dịch vụ.
          </p>
          <Steps
            items={[
              'Truy cập operis.vn và nhấn nút "Đăng nhập" ở góc trên bên phải.',
              "Nhập Email đã đăng ký.",
              "Nhập Mật khẩu.",
              'Nhấn nút "Đăng nhập".',
            ]}
          />
          <GuideImage
            src="/images/guide/4-1.png"
            alt="Trang đăng nhập"
            caption="Nút Đăng nhập trên header"
          />
          <GuideImage
            src="/images/guide/4-2.png"
            alt="Nhập thông tin đăng nhập"
            caption="Form đăng nhập"
          />
          <p className="text-base text-muted-foreground leading-relaxed">
            Sau khi đăng nhập thành công, bạn sẽ được chuyển đến trang quản lý
            tài khoản. Tại đây bạn có thể quản lý: Hồ sơ cá nhân, Token và Gói
            dịch vụ, Lịch sử sử dụng API, Đơn hàng, Lịch sử giao dịch.
          </p>
          <GuideImage
            src="/images/guide/4-3.png"
            alt="Trang quản lý tài khoản"
            caption="Trang quản lý tài khoản sau khi đăng nhập"
          />
        </>
      );

    /* 5 — Nạp token */
    case 4:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Token là đơn vị sử dụng dịch vụ Operis. Mỗi khi bạn gửi tin nhắn cho
            trợ lý AI, hệ thống sẽ trừ một số token tương ứng.
          </p>
          <h3 className="text-lg font-semibold mb-3">Các gói nạp token</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                name: "Gói Thuê bao",
                desc: "Chi phí hợp lý, phù hợp cho người dùng cá nhân có nhu cầu vừa phải.",
              },
              {
                name: "Gói Tháng 1",
                desc: "Lượng token lớn hơn, phù hợp cho người dùng thường xuyên.",
              },
              {
                name: "Gói VIP",
                desc: "Lượng token lớn nhất, dành cho người dùng chuyên nghiệp hoặc doanh nghiệp nhỏ.",
              },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className="border border-border rounded-xl p-4"
              >
                <p className="font-semibold text-base mb-1">{pkg.name}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pkg.desc}
                </p>
              </div>
            ))}
          </div>
          <GuideImage
            src="/images/guide/5.1-1.png"
            alt="Các gói token"
            caption="Danh sách các gói nạp token"
          />
          <GuideImage
            src="/images/guide/5.1-2.png"
            alt="Chi tiết gói token"
            caption="Chi tiết gói token & thanh toán"
          />
          <h3 className="text-lg font-semibold mb-3">Cách nạp token</h3>
          <Steps
            items={[
              "Đăng nhập tài khoản tại operis.vn.",
              'Vào phần "Token & Gói dịch vụ" trong trang tài khoản.',
              "Chọn gói nạp phù hợp với nhu cầu.",
              'Nhấn nút "Mua" hoặc "Nạp token".',
              "Hệ thống sẽ hiển thị mã QR thanh toán.",
              "Mở ứng dụng ngân hàng trên điện thoại, quét mã QR và xác nhận thanh toán.",
              "Sau khi thanh toán thành công, token sẽ được cộng vào tài khoản tự động.",
            ]}
          />
          <GuideImage
            src="/images/guide/5.2-3.png"
            alt="Mã QR thanh toán"
            caption="Quét mã QR để thanh toán"
          />
          <Note>
            Token đã nạp không có thời hạn sử dụng. Ngoài ra, hệ thống cũng cấp
            miễn phí một lượng token nhỏ định kỳ mỗi 5 giờ.
          </Note>
        </>
      );

    /* 6 — Cổng quản lý */
    case 5:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Cổng quản lý Operis Client là nơi bạn sử dụng trực tiếp trợ lý AI và
            quản lý tài khoản. Sau khi mua sản phẩm Operis, quản trị viên sẽ
            cung cấp cho bạn đường dẫn truy cập.
          </p>
          <h3 className="text-lg font-semibold mb-3">Đăng nhập Cổng quản lý</h3>
          <Steps
            items={[
              "Mở trình duyệt và truy cập đường dẫn do quản trị viên cung cấp.",
              "Nhập Email và Mật khẩu.",
              'Nhấn nút "Đăng nhập".',
            ]}
          />
          <GuideImage
            src="/images/guide/11-client-register.png"
            alt="Đăng nhập Cổng quản lý"
            caption="Giao diện đăng nhập Cổng quản lý"
          />
          <h3 className="text-lg font-semibold mb-3">Giao diện chính</h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Sau khi đăng nhập, giao diện gồm{" "}
            <strong>thanh menu bên trái</strong> (các mục chức năng) và{" "}
            <strong>vùng nội dung bên phải</strong>. Các mục trong menu:
          </p>
          <ul className="space-y-1.5 mb-4">
            {[
              "Chat — Trò chuyện trực tiếp với trợ lý AI",
              "Phân tích — Xem thống kê sử dụng",
              "Thanh toán — Nạp tiền, xem số dư",
              "Nhật ký — Xem lại lịch sử hội thoại",
              "Workflow — Đặt lịch tự động hoá công việc",
              "Tài liệu — Đọc tài liệu hướng dẫn chi tiết",
              "Góp ý — Báo lỗi hoặc gửi đề xuất",
              "Cài đặt — Cài đặt tài khoản, kết nối ứng dụng nhắn tin",
            ].map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </>
      );

    /* 7 — Chat */
    case 6:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Đây là chức năng chính của Operis. Bạn gõ tin nhắn và trợ lý AI sẽ
            trả lời.
          </p>
          <GuideImage
            src="/images/guide/7.png"
            alt="Giao diện Chat"
            caption="Giao diện trò chuyện với trợ lý AI"
          />
          <h3 className="text-lg font-semibold mb-3">Cách sử dụng</h3>
          <Steps
            items={[
              'Nhấn vào "Chat" trên menu.',
              "Gõ tin nhắn vào ô ở cuối trang.",
              "Nhấn Enter hoặc nút Gửi.",
              "Đợi vài giây, trợ lý sẽ trả lời.",
            ]}
          />
          <h3 className="text-lg font-semibold mb-3">Bạn có thể hỏi gì?</h3>
          <ul className="space-y-1.5 mb-6">
            {[
              'Hỏi đáp: "Thời tiết hôm nay thế nào?", "GDP Việt Nam năm 2024?"',
              'Nhờ viết: "Viết email xin nghỉ phép ngày mai"',
              'Dịch thuật: "Dịch đoạn này sang tiếng Anh: ..."',
              'Tính toán: "100 USD bằng bao nhiêu VND?"',
              'Tìm kiếm: "Tìm 5 nhà hàng ngon ở Quận 1"',
              'Tóm tắt: "Tóm tắt bài viết này trong 3 dòng"',
            ].map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-3">Quản lý cuộc hội thoại</h3>
          <ul className="space-y-1.5 mb-6">
            {[
              "Tạo hội thoại mới: Nhấn nút + để bắt đầu chủ đề mới.",
              "Chuyển đổi: Nhấn vào cuộc hội thoại cũ trong danh sách bên trái để xem lại.",
              "Xoá: Nhấn biểu tượng thùng rác để xoá cuộc hội thoại không cần nữa.",
            ].map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
          <Note>
            Nói càng cụ thể càng tốt. Trợ lý nhớ nội dung cuộc hội thoại, bạn có
            thể hỏi tiếp mà không cần nhắc lại. Nếu kết quả chưa đúng ý, hãy nói
            lại cụ thể hơn.
          </Note>
        </>
      );

    /* 8 — Thanh toán */
    case 7:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Trang này giúp bạn xem số dư, nạp tiền và theo dõi lịch sử thanh
            toán.
          </p>
          <GuideImage
            src="/images/guide/8.png"
            alt="Trang Thanh toán"
            caption="Giao diện trang Thanh toán"
          />
          <h3 className="text-lg font-semibold mb-3">Xem số dư</h3>
          <ul className="space-y-1.5 mb-6">
            <Bullet>
              <strong>Số dư chính</strong> (token trả phí): Số tiền bạn đã nạp,
              trừ dần khi sử dụng.
            </Bullet>
            <Bullet>
              <strong>Số dư miễn phí</strong>: Token miễn phí được cấp định kỳ
              mỗi 5 giờ.
            </Bullet>
          </ul>
          <h3 className="text-lg font-semibold mb-3">Nạp tiền</h3>
          <Steps
            items={[
              "Chọn gói nạp phù hợp (hoặc nhập số tiền tuỳ chỉnh).",
              'Nhấn nút "Mua Tokens".',
              "Màn hình hiện mã QR để thanh toán.",
              "Mở ứng dụng ngân hàng trên điện thoại.",
              "Quét mã QR và xác nhận thanh toán.",
              "Đợi vài giây, hệ thống sẽ tự xác nhận và cộng token vào tài khoản.",
            ]}
          />
          <Note>
            Nếu hệ thống chưa tự nhận, vui lòng nhấn nút &quot;Kiểm tra giao
            dịch&quot; để kiểm tra lại.
          </Note>
          <h3 className="text-lg font-semibold mb-3">Lịch sử giao dịch</h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Cuộn xuống dưới để xem danh sách các giao dịch:
          </p>
          <ul className="space-y-1.5 mb-4">
            {[
              "Chờ thanh toán: Giao dịch đang đợi bạn thanh toán.",
              "Hoàn thành: Đã thanh toán thành công.",
              "Đã huỷ: Giao dịch bị huỷ.",
              "Hết hạn: Quá thời gian thanh toán.",
            ].map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </>
      );

    /* 9 — Phân tích */
    case 8:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Trang này cho bạn biết bạn đã dùng trợ lý bao nhiêu: số token đã
            dùng, số lượt sử dụng, và biểu đồ theo ngày.
          </p>
          <GuideImage
            src="/images/guide/9.png"
            alt="Trang Phân tích"
            caption="Giao diện trang Phân tích & thống kê"
          />
          <h3 className="text-lg font-semibold mb-3">Chọn khoảng thời gian</h3>
          <ul className="space-y-1.5 mb-4">
            {[
              "1 ngày: Chỉ xem hôm nay.",
              "7 ngày: Tuần vừa qua.",
              "30 ngày: Tháng vừa qua.",
              "90 ngày: 3 tháng gần nhất.",
              "Tuỳ chỉnh: Chọn ngày bắt đầu và kết thúc theo ý bạn.",
            ].map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </>
      );

    /* 10 — Nhật ký */
    case 9:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Xem lại tất cả các cuộc hội thoại trước đó.
          </p>
          <GuideImage
            src="/images/guide/10.png"
            alt="Trang Nhật ký"
            caption="Giao diện trang Nhật ký hội thoại"
          />
          <Steps
            items={[
              'Nhấn "Nhật ký" trên menu.',
              "Danh sách hiện ra với các cuộc hội thoại gần nhất.",
              "Nhấn vào cuộc hội thoại để xem chi tiết.",
            ]}
          />
          <Note>
            Gõ từ khoá vào ô tìm kiếm ở trên cùng để tìm cuộc hội thoại cụ thể.
            Ví dụ: gõ &quot;báo cáo&quot; để tìm các cuộc hội thoại liên quan.
          </Note>
        </>
      );

    /* 11 — Workflow */
    case 10:
      return (
        <>
          <GuideImage
            src="/images/guide/11.png"
            alt="Trang Workflow"
            caption="Giao diện trang Workflow"
          />
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Workflow giúp bạn đặt lịch cho trợ lý tự động làm việc vào thời gian
            cố định. Hãy tưởng tượng bạn đặt hẹn giờ: &quot;Mỗi sáng 8h, tìm
            thời tiết và gửi cho tôi&quot;. Trợ lý sẽ tự động làm điều đó.
          </p>
          <h3 className="text-lg font-semibold mb-3">Tạo Workflow mới</h3>
          <Steps
            items={[
              'Điền tên cho workflow (ví dụ: "Thời tiết buổi sáng").',
              "Chọn lịch chạy: mỗi ngày, mỗi tuần, hoặc mỗi bao nhiêu phút/giờ.",
              'Nhập nội dung yêu cầu (ví dụ: "Tìm thời tiết TP.HCM hôm nay").',
              'Nhấn "Lưu".',
            ]}
          />
          <h3 className="text-lg font-semibold mb-3">Quản lý Workflow</h3>
          <ul className="space-y-1.5 mb-6">
            {[
              "Bật/Tắt: Nhấn công tắc để tạm dừng hoặc kích hoạt lại.",
              "Chạy ngay: Nhấn nút chạy để thực hiện ngay mà không đợi đến lịch.",
              "Xoá: Nhấn nút xoá để loại bỏ workflow không cần.",
            ].map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-3">Ví dụ thực tế</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              "Mỗi sáng 7h tìm thời tiết và gửi cho tôi",
              "Mỗi 10 phút kiểm tra trang web có hoạt động không",
              "Mỗi tối 8h tổng hợp tin tức công nghệ",
              "Mỗi thứ 2 lúc 9h nhắc tôi gửi báo cáo tuần",
            ].map((ex) => (
              <div
                key={ex}
                className="bg-muted rounded-lg px-4 py-3 text-sm text-muted-foreground italic"
              >
                &quot;{ex}&quot;
              </div>
            ))}
          </div>
        </>
      );

    /* 12 — Tài liệu */
    case 11:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Trang này chứa các bài hướng dẫn chi tiết về cách sử dụng từng tính
            năng.
          </p>
          <GuideImage
            src="/images/guide/12.png"
            alt="Trang Tài liệu"
            caption="Giao diện trang Tài liệu hướng dẫn"
          />
          <Steps
            items={[
              'Nhấn "Tài liệu" trên menu.',
              'Chọn danh mục bạn quan tâm (ví dụ: "Khả Năng Cơ Bản").',
              "Nhấn vào bài viết cụ thể để đọc.",
            ]}
          />
          <h3 className="text-lg font-semibold mb-3">Các danh mục</h3>
          <ul className="space-y-1.5 mb-4">
            {[
              "Giới thiệu: Bắt đầu nhanh, tổng quan hệ thống.",
              "Khả năng cơ bản: Chat, kiểm tra máy tính, quản lý file, tìm kiếm web.",
              "Trình duyệt web: Điều khiển trình duyệt, cài Chrome Extension.",
              "Tự động hoá: Hẹn giờ, nhắc nhở, kiểm tra định kỳ.",
            ].map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </>
      );

    /* 13 — Góp ý */
    case 12:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Khi gặp lỗi hoặc có ý tưởng cải thiện, bạn gửi phản hồi tại đây.
          </p>
          <GuideImage
            src="/images/guide/13.png"
            alt="Trang Góp ý"
            caption="Giao diện trang Góp ý & phản hồi"
          />
          <h3 className="text-lg font-semibold mb-3">Gửi góp ý</h3>
          <Steps
            items={[
              'Chọn loại phản hồi: "Báo lỗi", "Góp ý", hoặc "Ý tưởng".',
              "Nhập tiêu đề ngắn gọn.",
              "Mô tả chi tiết vấn đề hoặc đề xuất.",
              'Nhấn "Gửi".',
            ]}
          />
          <h3 className="text-lg font-semibold mb-3">Theo dõi trạng thái</h3>
          <ul className="space-y-1.5 mb-4">
            {[
              "Mở: Đã nhận, đang chờ xem xét.",
              "Đang xử lý: Đội ngũ đang giải quyết.",
              "Đã giải quyết: Vấn đề đã được khắc phục.",
              "Đóng: Phản hồi đã được đóng.",
            ].map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </>
      );

    /* 14 — Cài đặt */
    case 13:
      return (
        <>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Quản lý thông tin cá nhân, bảo mật và kết nối ứng dụng nhắn tin.
          </p>
          <GuideImage
            src="/images/guide/14.png"
            alt="Trang Cài đặt"
            caption="Giao diện trang Cài đặt"
          />
          <h3 className="text-lg font-semibold mb-3">Thông tin cá nhân</h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Xem và sửa tên hiển thị: Nhấn nút sửa bên cạnh tên, gõ tên mới, nhấn
            Lưu.
          </p>
          <h3 className="text-lg font-semibold mb-3">
            Kết nối ứng dụng nhắn tin
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Bạn có thể kết nối trợ lý với WhatsApp, Telegram, hoặc Zalo để trò
            chuyện trực tiếp trên đó.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            <strong>Ví dụ với Zalo:</strong>
          </p>
          <Steps
            items={[
              'Nhấn nút "Kết nối" bên cạnh Zalo.',
              "Màn hình hiện mã QR.",
              "Mở Zalo trên điện thoại, quét mã QR.",
              "Xác nhận trên điện thoại.",
              'Khi kết nối thành công, trạng thái chuyển sang "Đã kết nối".',
            ]}
          />
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Sau khi kết nối, bạn mở Zalo và nhắn tin trực tiếp — trợ lý sẽ trả
            lời ngay trên đó. Nhấn &quot;Ngắt kết nối&quot; nếu không muốn dùng
            nữa.
          </p>
          <h3 className="text-lg font-semibold mb-3">Bảo mật — Đổi mật khẩu</h3>
          <Steps
            items={[
              'Nhấn vào "Đổi mật khẩu".',
              "Nhập Mật khẩu hiện tại.",
              "Nhập Mật khẩu mới.",
              'Nhấn "Xác nhận".',
            ]}
          />
        </>
      );

    /* 15 — FAQ */
    case 14:
      return <FaqAccordion />;

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GuidePage() {
  const [active, setActive] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const goTo = (idx: number) => {
    setActive(idx);
    setSidebarOpen(false);
    window.scrollTo({ top: 0 });
  };

  const current = sections[active];
  const prev = active > 0 ? sections[active - 1] : null;
  const next = active < sections.length - 1 ? sections[active + 1] : null;

  return (
    <div className="flex min-h-screen bg-white">
      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-border
          flex flex-col transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Back + title */}
        <div className="px-5 pt-5 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              Trang chủ
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors lg:hidden"
              aria-label="Đóng mục lục"
            >
              <X size={18} />
            </button>
          </div>
          <h2 className="text-lg font-semibold tracking-tight">
            Hướng dẫn sử dụng
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Operis — Trợ lý AI cá nhân
          </p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {sections.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <s.icon size={14} className="shrink-0" />
                <span className="truncate">
                  {i + 1}. {s.title}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-5 py-4 border-t border-border text-xs text-muted-foreground">
          Cập nhật: Tháng 2/2026
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 lg:ml-72 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 -ml-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Mở mục lục"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold truncate">
            {active + 1}. {current.title}
          </span>
        </div>

        {/* Content area */}
        <div className="flex-1 w-full mx-auto px-5 md:px-8 py-10 md:py-14">
          <FadeIn key={active}>
            <article>
              <SectionHeading num={active + 1} title={current.title} />
              {sectionContent(active)}
            </article>
          </FadeIn>
        </div>

        {/* ── Prev / Next navigation ── */}
        <div className="border-t border-border">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Prev */}
            {prev ? (
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-4 text-left hover:bg-muted transition-colors group"
              >
                <ArrowLeft
                  size={18}
                  className="text-muted-foreground group-hover:text-primary shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Phần trước
                  </p>
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {prev.title}
                  </p>
                </div>
              </button>
            ) : (
              <div />
            )}

            {/* Next */}
            {next ? (
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                className="flex items-center justify-end gap-3 rounded-xl border border-border px-4 py-4 text-right hover:bg-muted transition-colors group sm:col-start-2"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Phần tiếp theo
                  </p>
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {next.title}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary shrink-0"
                />
              </button>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
