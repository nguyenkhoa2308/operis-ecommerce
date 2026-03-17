import { mapPost } from "@/lib/api/blog";
import type { BlogPost } from "@/types/blog";

export type MockBlogPost = BlogPost & { gradient: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RAW_MOCK_POSTS: Array<Record<string, any> & { _gradient: string }> = [
  {
    id: "mock-1",
    slug: "tu-dong-hoa-quy-trinh-kinh-doanh-voi-ai-workflow",
    title: "Tự động hóa quy trình kinh doanh với AI Workflow",
    excerpt:
      "Khám phá cách Operisbot giúp doanh nghiệp tiết kiệm hàng chục giờ làm việc mỗi tuần thông qua các workflow AI thông minh, không cần lập trình.",
    content: `
      <h2>Tại sao tự động hóa quan trọng hơn bao giờ hết?</h2>
      <p>Trong bối cảnh cạnh tranh ngày càng khốc liệt, doanh nghiệp nào tiết kiệm được thời gian cho các tác vụ lặp đi lặp lại sẽ có lợi thế rõ rệt. Nghiên cứu cho thấy trung bình một nhân viên văn phòng dành tới <strong>2,5 giờ mỗi ngày</strong> cho các công việc có thể tự động hóa.</p>
      <figure>
        <img src="https://picsum.photos/seed/automation-stats/800/420" alt="Thống kê tự động hóa doanh nghiệp" />
        <figcaption>Tỷ lệ thời gian nhân viên dành cho tác vụ có thể tự động hóa — Nguồn: McKinsey 2024</figcaption>
      </figure>
      <h2>AI Workflow là gì?</h2>
      <p>AI Workflow là chuỗi các bước được lập trình sẵn để AI thực hiện theo một quy trình cụ thể — thay vì chỉ "hỏi đáp" ngẫu nhiên như chatbot thông thường. Mỗi bước trong workflow có đầu vào và đầu ra rõ ràng, giúp kết quả nhất quán và có thể kiểm soát được.</p>
      <figure>
        <img src="https://picsum.photos/seed/workflow-diagram/800/420" alt="Sơ đồ AI Workflow" />
        <figcaption>Một workflow điển hình gồm: Trigger → Xử lý AI → Hành động → Thông báo</figcaption>
      </figure>
      <h2>3 workflow phổ biến nhất</h2>
      <ul>
        <li><strong>Phân loại &amp; phản hồi email tự động</strong> — AI đọc email, phân loại theo chủ đề, soạn phản hồi sơ bộ và chuyển đến đúng người phụ trách.</li>
        <li><strong>Thu thập &amp; tổng hợp dữ liệu đa nguồn</strong> — Kéo dữ liệu từ nhiều nền tảng (Shopee, Facebook Ads, Google Analytics) và tạo báo cáo tự động.</li>
        <li><strong>Chăm sóc khách hàng 24/7</strong> — Trả lời câu hỏi thường gặp, tra cứu tồn kho, gửi thông tin đơn hàng mà không cần nhân viên trực.</li>
      </ul>
      <h2>Bắt đầu như thế nào?</h2>
      <p>Đăng ký tài khoản Operisbot miễn phí, chọn workflow template phù hợp với ngành của bạn, cấu hình theo nhu cầu cụ thể và kích hoạt. Toàn bộ quá trình không cần biết lập trình.</p>
      <blockquote><p>"Tuần đầu tiên tôi tiết kiệm được 12 tiếng làm việc. Giờ tôi dùng thời gian đó để gặp khách hàng mới." — Nguyễn Văn A, Founder ShopTech</p></blockquote>
    `,
    content_blocks: null,
    cover_image: "https://picsum.photos/seed/ai-business/1200/630",
    category: { id: "cat-1", name: "Hướng dẫn", slug: "huong-dan" },
    tags: ["workflow", "tự động hóa", "AI", "doanh nghiệp"],
    author: null,
    author_info: { name: "Team Operisbot" },
    reading_time: 5,
    published_at: "2025-03-10T07:00:00Z",
    created_at: "2025-03-10T07:00:00Z",
    _gradient: "from-sky-500/80 via-blue-600/70 to-violet-500/60",
  },
  {
    id: "mock-2",
    slug: "5-workflow-ai-pho-bien-nhat-cho-doanh-nghiep-sme",
    title: "5 Workflow AI phổ biến nhất cho doanh nghiệp SME",
    excerpt:
      "Từ quản lý MXH, báo cáo thuế đến chăm sóc khách hàng tự động — đây là những workflow được hàng trăm doanh nghiệp Việt dùng nhiều nhất.",
    content: `
      <h2>SME cần gì từ AI?</h2>
      <p>Doanh nghiệp vừa và nhỏ thường không có ngân sách lớn để thuê nhiều nhân sự. AI workflow giúp một người có thể làm việc bằng ba — với chi phí hợp lý và không cần kỹ thuật phức tạp.</p>
      <figure>
        <img src="https://picsum.photos/seed/sme-team/800/420" alt="Team doanh nghiệp SME sử dụng AI" />
        <figcaption>Doanh nghiệp SME ngày càng ứng dụng AI vào quy trình vận hành</figcaption>
      </figure>
      <h2>Top 5 workflow được dùng nhiều nhất</h2>
      <h3>1. Tự động đăng bài đa kênh MXH</h3>
      <p>Viết nội dung một lần, AI tự định dạng và đăng lên Facebook, Instagram, TikTok, Zalo OA cùng lúc theo lịch đã lên kế hoạch. Tiết kiệm 3–4 giờ mỗi ngày cho content team.</p>
      <figure>
        <img src="https://picsum.photos/seed/social-media/800/420" alt="Quản lý đa kênh mạng xã hội" />
        <figcaption>Một workflow có thể đồng thời đăng bài lên nhiều nền tảng MXH</figcaption>
      </figure>
      <h3>2. Báo cáo doanh thu tự động hàng ngày/tuần/tháng</h3>
      <p>Kéo dữ liệu từ Shopee, Lazada, website, cửa hàng offline — tổng hợp và gửi báo cáo tóm tắt qua Zalo/email vào đúng giờ bạn muốn.</p>
      <h3>3. Chăm sóc khách hàng sau mua</h3>
      <p>Tự động gửi tin nhắn cảm ơn, hướng dẫn sử dụng sản phẩm, nhắc nhở đánh giá và offer ưu đãi cho lần mua tiếp theo.</p>
      <h3>4. Thu thập lead từ quảng cáo</h3>
      <p>Khi khách để lại thông tin trên form quảng cáo, AI tự động gọi điện hoặc nhắn tin trong vòng 5 phút — tỷ lệ chốt đơn tăng gấp 2–3 lần so với liên hệ thủ công sau vài giờ.</p>
      <h3>5. Quét giá đối thủ &amp; cảnh báo</h3>
      <p>Bot tự động kiểm tra giá sản phẩm tương tự trên Shopee, Lazada, website đối thủ mỗi giờ — gửi cảnh báo ngay khi đối thủ giảm giá hoặc ra sản phẩm mới.</p>
    `,
    content_blocks: null,
    cover_image: "https://picsum.photos/seed/sme-office/1200/630",
    category: { id: "cat-2", name: "Kiến thức", slug: "kien-thuc" },
    tags: ["SME", "workflow", "MXH", "báo cáo", "lead"],
    author: null,
    author_info: { name: "Team Operisbot" },
    reading_time: 7,
    published_at: "2025-03-05T07:00:00Z",
    created_at: "2025-03-05T07:00:00Z",
    _gradient: "from-violet-500/80 via-rose-500/60 to-amber-500/60",
  },
  {
    id: "mock-3",
    slug: "token-ai-la-gi-cach-toi-uu-chi-phi",
    title: "Token AI là gì? Cách tối ưu chi phí khi dùng AI",
    excerpt:
      "Giải thích rõ ràng về token trong các mô hình AI và các chiến lược giúp bạn tiết kiệm token gấp 10 lần mà không giảm hiệu quả công việc.",
    content: `
      <h2>Token là gì?</h2>
      <p>Token là đơn vị cơ bản mà mô hình AI dùng để xử lý văn bản. Mỗi từ trong tiếng Anh thường tương đương 1–2 token; tiếng Việt thường tốn nhiều hơn do cấu trúc ngôn ngữ khác biệt. Khi bạn gửi 1 câu hỏi và nhận 1 câu trả lời, tổng số token được tính là <em>đầu vào + đầu ra</em>.</p>
      <figure>
        <img src="https://picsum.photos/seed/token-data/800/420" alt="Minh họa token AI" />
        <figcaption>Văn bản được chia thành các token trước khi đưa vào mô hình AI xử lý</figcaption>
      </figure>
      <h2>Tại sao cần quan tâm đến token?</h2>
      <p>Chi phí dùng AI tỷ lệ trực tiếp với số token tiêu thụ. Nhiều doanh nghiệp lãng phí 60–80% token vì cách hỏi không hiệu quả — gửi quá nhiều context thừa, không tái sử dụng kết quả, hoặc hỏi lại nhiều lần điều đã biết.</p>
      <h2>5 cách tiết kiệm token hiệu quả</h2>
      <ol>
        <li><strong>Dùng workflow thay vì chat tự do</strong> — Workflow có prompt chuẩn hóa, không lãng phí token vào context thừa.</li>
        <li><strong>Chia nhỏ task</strong> — Thay vì hỏi "làm hết tất cả", chia thành các bước nhỏ, rõ ràng.</li>
        <li><strong>Tái sử dụng output</strong> — Lưu kết quả AI vào database, dùng lại thay vì gọi AI lần thứ hai.</li>
        <li><strong>Chọn model phù hợp</strong> — Không phải lúc nào cũng cần model mạnh nhất. Task đơn giản dùng model nhẹ hơn tiết kiệm đến 10× chi phí.</li>
        <li><strong>Batching request</strong> — Gộp nhiều câu hỏi tương tự vào 1 lần gọi thay vì gọi riêng lẻ từng cái.</li>
      </ol>
      <h2>Operisbot tối ưu token như thế nào?</h2>
      <p>Mỗi workflow trong Operisbot được thiết kế để tối thiểu hóa token tiêu thụ — prompt được chuẩn hóa, kết quả được cache khi có thể, và chỉ gọi AI cho những bước thực sự cần suy luận. Người dùng trung bình tiết kiệm được 60–70% token so với dùng ChatGPT thủ công cho cùng một tác vụ.</p>
      <figure>
        <img src="https://picsum.photos/seed/cost-savings/800/420" alt="So sánh chi phí token" />
        <figcaption>So sánh chi phí token khi dùng trực tiếp vs. qua Operisbot Workflow</figcaption>
      </figure>
    `,
    content_blocks: null,
    cover_image: "https://picsum.photos/seed/data-tech/1200/630",
    category: { id: "cat-2", name: "Kiến thức", slug: "kien-thuc" },
    tags: ["token", "chi phí AI", "tối ưu", "LLM"],
    author: null,
    author_info: { name: "Team Operisbot" },
    reading_time: 4,
    published_at: "2025-02-28T07:00:00Z",
    created_at: "2025-02-28T07:00:00Z",
    _gradient: "from-emerald-500/80 via-teal-500/60 to-sky-500/60",
  },
  {
    id: "mock-4",
    slug: "huong-dan-xay-dung-workflow-dau-tien",
    title: "Hướng dẫn từng bước: Xây dựng workflow AI đầu tiên của bạn",
    excerpt:
      "Từ ý tưởng đến workflow hoạt động thực tế — hướng dẫn chi tiết dành cho người chưa có kinh nghiệm kỹ thuật.",
    content: `
      <h2>Bạn không cần biết lập trình</h2>
      <p>Operisbot được thiết kế để bất kỳ ai cũng có thể xây dựng workflow AI trong vòng 30 phút mà không cần viết một dòng code nào.</p>
      <figure>
        <img src="https://picsum.photos/seed/no-code/800/420" alt="No-code workflow builder" />
        <figcaption>Giao diện kéo-thả trực quan — không cần biết lập trình</figcaption>
      </figure>
      <h2>Bước 1: Xác định tác vụ muốn tự động hóa</h2>
      <p>Hãy chọn một công việc bạn đang làm thủ công mỗi ngày, tốn ít nhất 30 phút, và có kết quả có thể mô tả rõ ràng. Ví dụ: "Mỗi sáng tôi đọc 20 email và trả lời những email hỏi về giá."</p>
      <h2>Bước 2: Chọn template workflow</h2>
      <p>Operisbot cung cấp hơn 50 template workflow theo từng ngành. Chọn template gần nhất với nhu cầu của bạn — sẽ nhanh hơn nhiều so với xây từ đầu.</p>
      <figure>
        <img src="https://picsum.photos/seed/template-gallery/800/420" alt="Thư viện template workflow" />
        <figcaption>Hơn 50 template được phân loại theo ngành nghề và tác vụ</figcaption>
      </figure>
      <h2>Bước 3: Cấu hình đầu vào &amp; đầu ra</h2>
      <p>Chỉ định workflow lấy dữ liệu từ đâu (email, form, sheet...) và xuất kết quả đến đâu (Zalo, email, Google Sheet, Slack...). Kết nối các ứng dụng bằng cách authorize OAuth — không cần API key phức tạp.</p>
      <h2>Bước 4: Test với dữ liệu thật</h2>
      <p>Chạy thử với 5–10 mẫu dữ liệu thực tế. Xem kết quả, điều chỉnh prompt nếu cần, và chạy lại cho đến khi hài lòng.</p>
      <h2>Bước 5: Kích hoạt &amp; theo dõi</h2>
      <p>Bật workflow — từ giây này trở đi AI sẽ tự động xử lý theo lịch hoặc trigger bạn đã cài. Dashboard hiển thị log hoạt động và kết quả theo thời gian thực.</p>
      <figure>
        <img src="https://picsum.photos/seed/dashboard-analytics/800/420" alt="Dashboard theo dõi workflow" />
        <figcaption>Dashboard real-time hiển thị tình trạng và kết quả của mọi workflow</figcaption>
      </figure>
    `,
    content_blocks: null,
    cover_image: "https://picsum.photos/seed/tutorial-workspace/1200/630",
    category: { id: "cat-1", name: "Hướng dẫn", slug: "huong-dan" },
    tags: ["hướng dẫn", "workflow", "bắt đầu", "template"],
    author: null,
    author_info: { name: "Team Operisbot" },
    reading_time: 6,
    published_at: "2025-02-20T07:00:00Z",
    created_at: "2025-02-20T07:00:00Z",
    _gradient: "from-amber-500/80 via-orange-500/60 to-rose-500/60",
  },
  {
    id: "mock-5",
    slug: "so-sanh-goi-subscription-operisbot-2025",
    title: "So sánh các gói Operisbot 2025: Chọn gói nào cho doanh nghiệp bạn?",
    excerpt:
      "Phân tích chi tiết từng gói Starter, Team, Enterprise và Corporate — kèm gợi ý chọn gói phù hợp theo quy mô và ngành nghề.",
    content: `
      <h2>Tổng quan 4 gói Operisbot</h2>
      <p>Operisbot cung cấp 4 gói subscription theo số lượng người dùng và nhu cầu token, phù hợp với mọi quy mô doanh nghiệp.</p>
      <figure>
        <img src="https://picsum.photos/seed/pricing-plans/800/420" alt="Bảng so sánh gói Operisbot" />
        <figcaption>Tổng quan 4 gói subscription Operisbot — từ cá nhân đến doanh nghiệp lớn</figcaption>
      </figure>
      <h2>Gói Starter — Dưới 5 người</h2>
      <p><strong>Giá: 1.500.000đ/tháng · 100M token</strong></p>
      <p>Phù hợp cho: freelancer, startup giai đoạn đầu, shop online nhỏ. Đủ token để chạy 3–5 workflow cơ bản mỗi ngày. Hỗ trợ qua email.</p>
      <h2>Gói Team — 5–10 người</h2>
      <p><strong>Giá: 5.500.000đ/tháng · 100M token</strong></p>
      <p>Phù hợp cho: SME đang tăng trưởng, agency nhỏ, team marketing. Nhiều người cùng dùng chung workspace, quản lý workflow tập trung. <em>Gói được khuyến nghị nhất.</em></p>
      <h2>Gói Enterprise — 10–20 người</h2>
      <p><strong>Giá: 15.000.000đ/tháng · 200M token</strong></p>
      <p>Phù hợp cho: doanh nghiệp vừa, chuỗi cửa hàng, agency lớn. Token gấp đôi, SLA bảo mật nâng cao, onboarding 1-1 cùng chuyên gia Operisbot.</p>
      <h2>Gói Corporate — Trên 20 người</h2>
      <p><strong>Liên hệ để được báo giá</strong></p>
      <p>Giải pháp enterprise custom theo nhu cầu: số lượng người dùng không giới hạn, tích hợp hệ thống nội bộ (ERP, CRM), SLA 99.9%, dedicated account manager.</p>
      <h2>Nên chọn gói nào?</h2>
      <p>Nếu bạn mới bắt đầu: Starter. Nếu team 5+ người và muốn cộng tác: Team. Nếu cần bảo mật cao và nhiều token hơn: Enterprise. Nếu quy mô lớn với yêu cầu đặc biệt: Corporate.</p>
      <figure>
        <img src="https://picsum.photos/seed/decision-chart/800/420" alt="Sơ đồ chọn gói" />
        <figcaption>Sơ đồ hỗ trợ quyết định chọn gói phù hợp với nhu cầu của bạn</figcaption>
      </figure>
    `,
    content_blocks: null,
    cover_image: "https://picsum.photos/seed/product-plans/1200/630",
    category: { id: "cat-3", name: "Sản phẩm", slug: "san-pham" },
    tags: ["pricing", "gói cước", "so sánh", "subscription"],
    author: null,
    author_info: { name: "Team Operisbot" },
    reading_time: 4,
    published_at: "2025-02-15T07:00:00Z",
    created_at: "2025-02-15T07:00:00Z",
    _gradient: "from-blue-600/80 via-sky-500/60 to-emerald-500/60",
  },
  {
    id: "mock-6",
    slug: "case-study-agency-marketing-tu-dong-bao-cao",
    title: "Case Study: Agency marketing tiết kiệm 80% thời gian báo cáo nhờ AI",
    excerpt:
      "Câu chuyện thực tế của Pixel Studio Agency — từ 3–4 ngày tổng hợp báo cáo thủ công mỗi tháng xuống còn 4 giờ với Operisbot.",
    content: `
      <h2>Bối cảnh</h2>
      <p>Pixel Studio Agency (TP.HCM) phục vụ 20 khách hàng SME với dịch vụ digital marketing toàn diện. Vấn đề lớn nhất: mỗi cuối tháng, team 3 account phải mất 3–4 ngày tổng hợp báo cáo thủ công từ 5–6 nền tảng khác nhau cho từng khách.</p>
      <figure>
        <img src="https://picsum.photos/seed/agency-office/800/420" alt="Agency marketing làm việc" />
        <figcaption>Team account của Pixel Studio trước đây dành phần lớn thời gian cho báo cáo thủ công</figcaption>
      </figure>
      <h2>Vấn đề cụ thể</h2>
      <ul>
        <li>Pull data từ Facebook Ads, Google Ads, Google Analytics, Shopee Ads cho 20 khách</li>
        <li>Copy-paste vào Excel, format lại theo template riêng của từng khách</li>
        <li>Thường xuyên sai số liệu, phải gửi lại báo cáo</li>
        <li>Team bị "chôn vùi" trong báo cáo, không còn thời gian cho chiến lược</li>
      </ul>
      <h2>Giải pháp với Operisbot</h2>
      <p>Triển khai trong 2 ngày: kết nối API với tất cả nền tảng, xây template báo cáo riêng cho từng khách, cài AI viết phần insights tự động. Account manager chỉ cần review và customize trước khi gửi khách.</p>
      <figure>
        <img src="https://picsum.photos/seed/automation-setup/800/420" alt="Thiết lập workflow tự động hóa" />
        <figcaption>Workflow tự động kéo dữ liệu từ 6 nền tảng và tổng hợp thành báo cáo hoàn chỉnh</figcaption>
      </figure>
      <h2>Kết quả sau 1 tháng</h2>
      <p>Báo cáo từ 3–4 ngày → 4 giờ. Khách hàng nhận báo cáo sớm hơn 3 ngày và đánh giá chất lượng cao hơn. Agency tiếp nhận thêm 15 khách mới mà không cần tuyển thêm account manager.</p>
      <blockquote><p>"Báo cáo AI generate ra, khách hàng hỏi lại tôi có thuê analyst mới không vì professional quá." — Trần Thị Lan Anh, Founder Pixel Studio</p></blockquote>
      <figure>
        <img src="https://picsum.photos/seed/results-growth/800/420" alt="Kết quả tăng trưởng" />
        <figcaption>So sánh trước và sau khi triển khai Operisbot tại Pixel Studio Agency</figcaption>
      </figure>
    `,
    content_blocks: null,
    cover_image: "https://picsum.photos/seed/marketing-agency/1200/630",
    category: { id: "cat-4", name: "Case Study", slug: "case-study" },
    tags: ["case study", "agency", "báo cáo", "tự động hóa"],
    author: null,
    author_info: { name: "Team Operisbot" },
    reading_time: 5,
    published_at: "2025-02-10T07:00:00Z",
    created_at: "2025-02-10T07:00:00Z",
    _gradient: "from-rose-500/80 via-violet-500/60 to-sky-500/60",
  },
];

export const MOCK_BLOG_POSTS: MockBlogPost[] = RAW_MOCK_POSTS.map(
  ({ _gradient, ...raw }) => ({
    ...mapPost(raw),
    gradient: _gradient,
  }),
);
