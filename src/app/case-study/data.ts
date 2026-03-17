import { Building2, Megaphone, ShoppingBag, type LucideIcon } from "lucide-react";

export interface CaseStudy {
  slug: string;
  icon: LucideIcon;
  industry: string;
  company: string;
  size: string;
  location: string;
  accentColor: string;
  borderColor: string;
  gradientFrom: string;
  accentBg: string;    // solid bg for bold sections (e.g. "bg-violet")
  heroImage: string;
  sideImage: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  solutionStory: { intro: string; points: { title: string; desc: string }[] };
  quote: string;
  author: string;
  role: string;
  avatarInitials: string;
  before: { title: string; points: { title: string; desc: string; image?: string }[] };
  deployment: { steps: { title: string; desc: string }[]; duration: string };
  pilot: { duration: string; feedback: string; adjustments: string };
  workflow: { steps: { title: string; desc: string }[] };
  after: { title: string; points: { title: string; desc: string; image?: string }[] };
  metrics: { label: string; value: string; sub: string }[];
  timeline: string;
  results: string;
}

export const cases: CaseStudy[] = [
  {
    slug: "minh-hung",
    icon: Building2,
    industry: "Tư vấn pháp lý",
    company: "Công ty TNHH Tư vấn Minh Hưng",
    size: "8 nhân viên",
    location: "Hà Nội",
    accentColor: "text-violet",
    borderColor: "border-violet/20",
    gradientFrom: "from-violet/10 to-primary/5",
    accentBg: "bg-violet",
    heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&auto=format&fit=crop&q=80",
    sideImage: "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=800&auto=format&fit=crop&q=80",
    tagline: "Từ 6 giờ xử lý thủ công/ngày xuống còn 1 giờ",
    summary:
      "Công ty tư vấn pháp lý 8 người tại Hà Nội — chuyên hợp đồng thương mại, tư vấn doanh nghiệp. Trước khi dùng Operis, phần lớn thời gian làm việc bị tiêu tốn vào các tác vụ lặp lại: phân loại email, soạn thảo văn bản mẫu, nhắc lịch hẹn.",
    challenge:
      "Với 8 luật sư và chuyên viên tư vấn, mỗi ngày nhận 40–60 email từ khách hàng, đối tác và tòa án. Toàn bộ việc phân loại, phản hồi sơ bộ và giao việc nội bộ đều làm thủ công. Mỗi hợp đồng mới phải soạn từ đầu dù 70% nội dung giống nhau. Deadline bị bỏ sót do quản lý bằng Excel rời rạc.",
    solution:
      "Operis được triển khai để tự động phân loại email theo loại yêu cầu, soạn phản hồi sơ bộ, và routing đến đúng luật sư phụ trách. Hệ thống template hợp đồng thông minh được xây dựng trong 2 ngày, tích hợp trực tiếp với quy trình nội bộ. Nhắc lịch và deadline tự động theo workflow.",
    solutionStory: {
      intro: "Sau 3 năm chịu đựng quy trình thủ công, anh Hưng tình cờ biết đến Operis qua một buổi hội thảo về chuyển đổi số cho doanh nghiệp vừa và nhỏ. Ban đầu anh khá hoài nghi — 'AI xử lý email pháp lý? Nghe phi thực tế.' Nhưng sau buổi demo 30 phút, anh quyết định thử.",
      points: [
        { title: "Demo trực tiếp với dữ liệu thật", desc: "Đội ngũ Operis import 50 email mẫu của Minh Hưng vào hệ thống ngay trong buổi demo. AI phân loại chính xác 47/50 email — anh Hưng thừa nhận: 'Nhân viên mới của tôi chưa chắc làm tốt hơn.' Đây là lúc anh quyết định ký hợp đồng." },
        { title: "Cam kết rõ ràng: không hiệu quả, không thu phí", desc: "Operis đề xuất chạy thử 1 tuần hoàn toàn miễn phí. Nếu sau 1 tuần team không thấy cải thiện rõ rệt, sẽ dừng mà không mất bất kỳ chi phí nào. Đây là điều khiến anh Hưng hoàn toàn yên tâm để thử nghiệm." },
        { title: "Giải pháp được thiết kế riêng cho pháp lý", desc: "Không phải tool chung chung — Operis customize bộ phân loại email theo đặc thù ngành pháp lý: tư vấn mới, hồ sơ bổ sung, lịch tòa, deadline nộp hồ sơ. Template hợp đồng được xây dựng từ chính kho hợp đồng 200+ bản của Minh Hưng." },
      ],
    },
    quote:
      "Trước đây mỗi buổi sáng tôi mất 2 giờ chỉ để phân loại email và soạn thảo phản hồi sơ bộ. Giờ Operis xử lý hết, tôi chỉ cần duyệt và gửi. Tuần đầu tiên tôi còn không tin là mình đang thật sự tiết kiệm được nhiều thời gian đến vậy.",
    author: "Nguyễn Minh Hưng",
    role: "Giám đốc điều hành",
    avatarInitials: "MH",
    before: {
      title: "Trước khi dùng Operis",
      points: [
        {
          title: "5–6 giờ/ngày xử lý email, hợp đồng, văn bản thủ công",
          desc: "Mỗi sáng, đội ngũ 8 luật sư phải mở từng email trong số 40–60 email nhận mỗi ngày từ khách hàng, đối tác và tòa án. Phân loại thủ công theo loại yêu cầu, soạn phản hồi sơ bộ, rồi giao việc cho đúng người phụ trách — tất cả đều làm bằng tay, không có hệ thống hỗ trợ nào. Một luật sư senior chia sẻ: 'Buổi sáng tôi ngồi 2 tiếng chỉ để đọc email và forward cho đúng người. Đến trưa mới bắt đầu được công việc thực sự.' Đây là vấn đề dai dẳng nhất của công ty suốt 3 năm qua.",
          image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80",
        },
        {
          title: "Chỉ phục vụ được 12–15 khách/tháng với team 8 người",
          desc: "Phần lớn thời gian làm việc bị tiêu tốn vào tác vụ hành chính lặp lại. Luật sư giỏi nhất cũng chỉ còn 3–4 giờ/ngày cho công việc chuyên môn thực sự. Kết quả: công suất phục vụ thấp, nhiều khách hàng tiềm năng phải từ chối vì không đủ bandwidth. Trong quý trước, công ty đã phải từ chối ít nhất 8 khách hàng mới — mất đi cơ hội doanh thu ước tính 120 triệu đồng.",
        },
        {
          title: "Thường xuyên bỏ sót deadline do quản lý bằng Excel",
          desc: "Lịch hẹn, hạn nộp hồ sơ, thời hạn phản hồi tòa án — tất cả được theo dõi trên nhiều file Excel rời rạc, mỗi luật sư một file riêng. Không có hệ thống nhắc tự động, không ai chịu trách nhiệm tổng thể. Trung bình mỗi tháng bỏ lỡ 2–3 deadline quan trọng, ảnh hưởng trực tiếp đến uy tín với khách hàng. Đã có trường hợp bỏ lỡ hạn nộp hồ sơ tòa án, khiến khách hàng thiệt hại và suýt mất hợp đồng tư vấn dài hạn.",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=80",
        },
        {
          title: "Tốn 3–4 ngày soạn hợp đồng mới từ đầu cho mỗi khách",
          desc: "Dù 70% nội dung hợp đồng giống nhau giữa các khách hàng, mỗi lần vẫn phải soạn lại từ đầu. Copy-paste từ file cũ rồi chỉnh sửa dẫn đến sai sót — đã từng gửi hợp đồng còn sót tên khách hàng cũ, gây mất chuyên nghiệp nghiêm trọng. Quy trình review cũng kéo dài do không có version control. Một hợp đồng thương mại đơn giản phải qua 5–7 vòng chỉnh sửa trước khi gửi được cho khách.",
        },
        {
          title: "Chi phí thuê nhân sự hành chính: 18 triệu/tháng",
          desc: "Cần 1 nhân viên hành chính toàn thời gian chỉ để xử lý email, sắp xếp lịch, và quản lý giấy tờ. Chi phí lương + bảo hiểm + phúc lợi lên tới 18 triệu/tháng — một khoản chi đáng kể cho công ty 8 người mà phần lớn công việc này có thể tự động hóa. Tính ra chi phí hành chính chiếm tới 12% tổng chi phí vận hành, trong khi không tạo ra giá trị trực tiếp cho khách hàng.",
        },
      ],
    },
    deployment: {
      duration: "3 ngày",
      steps: [
        { title: "Khảo sát & thiết kế workflow", desc: "Đội ngũ Operis làm việc trực tiếp với anh Hưng và 2 luật sư senior để hiểu quy trình xử lý email, soạn hợp đồng, và quản lý deadline hiện tại. Mapping toàn bộ luồng công việc trong 4 giờ, xác định 5 điểm nghẽn chính cần tự động hóa." },
        { title: "Cài đặt & tích hợp hệ thống", desc: "Kết nối Operis với hệ thống email (Outlook), cấu hình bộ phân loại AI theo 4 loại yêu cầu chính, import kho 200+ template hợp đồng có sẵn. Thiết lập workflow nhắc deadline tự động theo từng loại vụ việc. Hoàn thành trong 1.5 ngày." },
        { title: "Training team & cấu hình cá nhân", desc: "Hướng dẫn từng luật sư cách duyệt email draft, customize template, và sử dụng dashboard deadline. Mỗi người được cấu hình phong cách phản hồi riêng để AI học theo. Session training kéo dài 2 giờ cho toàn team." },
      ],
    },
    pilot: {
      duration: "1 tuần",
      feedback: "Tuần đầu chạy song song: Operis xử lý tự động + luật sư kiểm tra lại 100% kết quả. Anh Hưng chia sẻ: 'Ngày đầu tôi còn không tin — AI phân loại đúng 92% email ngay từ đầu. Đến ngày thứ 3, tỷ lệ lên 97% vì hệ thống học từ các chỉnh sửa của team.'",
      adjustments: "Điều chỉnh bộ lọc email cho trường hợp khẩn cấp từ tòa án (ưu tiên cao nhất), bổ sung 15 template hợp đồng cho dịch vụ mới, và tinh chỉnh logic nhắc deadline theo múi giờ làm việc thực tế của đội ngũ.",
    },
    workflow: {
      steps: [
        { title: "Email đến", desc: "Hệ thống nhận email từ khách hàng, đối tác, tòa án qua kết nối Outlook API" },
        { title: "AI phân loại", desc: "Tự động phân loại theo 4 loại: tư vấn mới, hồ sơ bổ sung, lịch tòa, deadline" },
        { title: "Soạn phản hồi", desc: "AI draft phản hồi sơ bộ theo phong cách của từng luật sư phụ trách" },
        { title: "Route & giao việc", desc: "Tự động chuyển đến đúng luật sư phụ trách kèm brief tóm tắt" },
        { title: "Luật sư duyệt & gửi", desc: "Chỉ cần review, chỉnh sửa nhẹ và nhấn gửi — tiết kiệm 80% thời gian" },
      ],
    },
    after: {
      title: "Sau khi dùng Operis",
      points: [
        {
          title: "Tự động phân loại & soạn phản hồi email, giảm 80% thời gian",
          desc: "Operis AI đọc và phân loại email theo loại yêu cầu (tư vấn mới, hồ sơ bổ sung, lịch hẹn, thông báo tòa án), tự soạn phản hồi sơ bộ và route đến đúng luật sư phụ trách. Từ 6 giờ/ngày xử lý email giờ còn khoảng 1 giờ — chỉ cần duyệt và gửi. Hệ thống còn tự học từ phong cách phản hồi của từng luật sư, nên email draft ngày càng chính xác hơn sau mỗi tuần sử dụng.",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80",
        },
        {
          title: "Phục vụ 35+ khách/tháng với cùng quy mô team",
          desc: "Khi tác vụ hành chính được tự động hóa, mỗi luật sư có thêm 4–5 giờ/ngày cho công việc chuyên môn. Công suất phục vụ tăng gấp 2.5 lần mà không cần tuyển thêm người. Đội ngũ có thể nhận thêm khách hàng mới mà vẫn đảm bảo chất lượng dịch vụ. Quan trọng hơn, tỷ lệ hài lòng của khách hàng tăng từ 78% lên 94% do phản hồi nhanh hơn và ít sai sót hơn.",
        },
        {
          title: "Nhắc việc & deadline tự động theo workflow, không bỏ sót",
          desc: "Hệ thống tự động tracking mọi deadline theo từng vụ việc, gửi nhắc nhở qua email và notification trước 3 ngày, 1 ngày, và ngày đến hạn. Manager có dashboard tổng quan thấy được toàn bộ deadline của team theo real-time. Kể từ khi triển khai, chưa bỏ sót deadline nào — so với trước đó trung bình 2–3 lần/tháng.",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=80",
        },
        {
          title: "Template hợp đồng thông minh, soạn xong trong 30 phút",
          desc: "Hệ thống template được xây dựng từ kho hợp đồng có sẵn, tự động điền thông tin khách hàng, điều khoản phù hợp theo loại dịch vụ. Có version control và so sánh thay đổi giữa các bản. Thời gian soạn hợp đồng giảm từ 3–4 ngày xuống còn 30 phút. Đặc biệt, hệ thống flag tự động các điều khoản bất thường hoặc mâu thuẫn, giúp giảm rủi ro pháp lý cho cả công ty và khách hàng.",
        },
        {
          title: "Tiết kiệm 18 triệu/tháng chi phí nhân sự hành chính",
          desc: "Nhân viên hành chính được chuyển sang vị trí hỗ trợ pháp lý có giá trị cao hơn — giờ cô ấy hỗ trợ nghiên cứu case law và chuẩn bị hồ sơ, đóng góp trực tiếp vào chất lượng dịch vụ. Toàn bộ tác vụ phân loại email, nhắc lịch, quản lý deadline giờ do Operis xử lý tự động. Tiết kiệm trực tiếp 18 triệu/tháng, tương đương 216 triệu/năm — ROI đạt được ngay từ tháng đầu tiên.",
        },
      ],
    },
    metrics: [
      { label: "Thời gian xử lý email", value: "↓ 80%", sub: "từ 6h → 1h/ngày" },
      { label: "Khách hàng phục vụ", value: "↑ 2.5×", sub: "cùng quy mô team" },
      { label: "Tiết kiệm", value: "18 tr/th", sub: "chi phí nhân sự" },
    ],
    timeline: "Triển khai trong 3 ngày, thấy kết quả ngay tuần đầu",
    results:
      "Sau 3 tháng, Minh Hưng tăng doanh thu 40% mà không tuyển thêm nhân sự. Đội ngũ luật sư tập trung hoàn toàn vào công việc chuyên môn thay vì tác vụ hành chính.",
  },
  {
    slug: "pixel-studio",
    icon: Megaphone,
    industry: "Marketing Agency",
    company: "Pixel Studio Agency",
    size: "15 nhân viên",
    location: "TP. Hồ Chí Minh",
    accentColor: "text-sky",
    borderColor: "border-sky/20",
    gradientFrom: "from-sky/10 to-primary/5",
    accentBg: "bg-sky",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&auto=format&fit=crop&q=80",
    sideImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=80",
    tagline: "Báo cáo tháng từ 4 ngày → 4 giờ",
    summary:
      "Agency marketing full-service tại TP.HCM, phục vụ 20+ khách hàng SME. Vấn đề lớn nhất: mỗi cuối tháng, cả team bị cuốn vào việc tổng hợp báo cáo thủ công cho từng khách — không còn thời gian cho chiến lược và sáng tạo.",
    challenge:
      "Với 20 khách hàng đang chạy, mỗi tháng phải tổng hợp dữ liệu từ 5–6 nguồn khác nhau (Facebook Ads, Google Ads, analytics, fanpage...) cho mỗi khách. Team 3 người mất 3–4 ngày mỗi tháng chỉ cho việc này. Content brief cho mỗi campaign mất 4–6 giờ nghiên cứu thủ công.",
    solution:
      "Operis kết nối với các nguồn dữ liệu marketing, tự động pull và tổng hợp số liệu theo template báo cáo của từng khách hàng. AI viết phần nhận xét và insights sơ bộ, team chỉ cần review và customize. Content brief được hỗ trợ bởi AI research đa nguồn.",
    solutionStory: {
      intro: "Chị Lan Anh biết đến Operis qua lời giới thiệu từ một agency bạn đã dùng 2 tháng. 'Họ kể báo cáo tháng giờ chỉ mất nửa ngày thay vì cả tuần — tôi không tin, phải bay ra Hà Nội xem tận mắt.' Sau chuyến thăm đó, chị quyết định đưa Operis vào Pixel Studio.",
      points: [
        { title: "Phân tích workflow hiện tại cùng team", desc: "Operis cử 1 consultant ngồi cùng team Pixel Studio 1 ngày, quan sát cách họ tổng hợp báo cáo, viết content brief, và quản lý lịch đăng bài. Xác định rõ 4 điểm nghẽn lớn nhất đang ngốn thời gian của team." },
        { title: "Đề xuất giải pháp phù hợp agency model", desc: "Thay vì tool chung, Operis thiết kế flow riêng cho mô hình agency: mỗi khách hàng có dashboard riêng, template riêng, KPI riêng. Account manager quản lý nhiều khách mà không bị loạn data giữa các brand." },
        { title: "Pilot miễn phí với 5 khách hàng đầu tiên", desc: "Chị Lan Anh chọn 5 khách hàng lớn nhất để chạy thử trước. Nếu báo cáo AI-generated đạt chất lượng, sẽ roll out toàn bộ 20 khách. Cam kết: không ảnh hưởng đến deadline báo cáo đang có." },
      ],
    },
    quote:
      "Báo cáo tháng cho 20 khách hàng mà giờ chỉ mất nửa ngày. Trước đây cả team vật lộn cả tuần. Quan trọng hơn, khách hàng nhận báo cáo sớm hơn và họ thấy chúng tôi professional hơn hẳn. Đó là lý do tôi recommend Operis cho mọi agency.",
    author: "Trần Thị Lan Anh",
    role: "Founder & CEO",
    avatarInitials: "LA",
    before: {
      title: "Trước khi dùng Operis",
      points: [
        {
          title: "3–4 ngày/tháng tổng hợp báo cáo cho 20 khách hàng",
          desc: "Mỗi cuối tháng, team 3 account phải đăng nhập vào 5–6 nền tảng khác nhau (Facebook Ads, Google Ads, Google Analytics, fanpage insights, Shopee Ads...) cho từng khách hàng. Tải data về Excel, tổng hợp thủ công, format lại theo template riêng của mỗi khách. Thường xuyên sai số liệu do copy-paste nhầm giữa các file. Có tháng phải gửi lại báo cáo cho 3 khách vì số liệu không khớp — mất uy tín nghiêm trọng.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
        },
        {
          title: "Content brief mỗi campaign mất 4–6 giờ nghiên cứu & viết",
          desc: "Mỗi campaign mới cần research thị trường, phân tích đối thủ, tìm insight khách hàng, chọn tone of voice phù hợp. Content strategist phải đọc hàng chục bài viết, xem competitor ads, phân tích comments — tất cả bằng tay. Một brief chất lượng tốn ít nhất nửa ngày làm việc. Với 4–5 campaign mới mỗi tháng, riêng việc làm brief đã chiếm gần 30% thời gian của strategist.",
        },
        {
          title: "Quản lý lịch đăng bài qua Google Sheet, dễ nhầm lẫn",
          desc: "20 khách hàng × 3–5 bài/tuần = 60–100 bài cần schedule mỗi tuần. Tất cả quản lý trên Google Sheet chia sẻ chung, không có notification tự động. Đã nhiều lần đăng nhầm nội dung của khách A lên fanpage khách B, hoặc quên đăng bài vào giờ vàng đã cam kết.",
        },
        {
          title: "Phân tích đối thủ thủ công, tốn 1–2 ngày mỗi lần",
          desc: "Khách hàng yêu cầu báo cáo competitor analysis mỗi tháng. Team phải vào từng fanpage, website, ads library của đối thủ để thu thập dữ liệu. Không có công cụ tracking tự động nên dữ liệu thường không liên tục, thiếu insight có giá trị và chỉ phản ánh một thời điểm.",
        },
        {
          title: "Onboard khách hàng mới mất 2 tuần do quy trình rời rạc",
          desc: "Mỗi khách mới cần: tạo tài khoản các nền tảng, xin quyền truy cập ads, thu thập brand guidelines, setup tracking, lên kế hoạch content đầu tiên. Không có checklist chuẩn — mỗi account manager làm theo cách riêng, thường xuyên thiếu sót và phải hỏi lại khách nhiều lần.",
        },
      ],
    },
    deployment: {
      duration: "2 ngày",
      steps: [
        { title: "Audit quy trình & kết nối API", desc: "Phân tích workflow báo cáo hiện tại của 20 khách hàng, xác định 5–6 nguồn dữ liệu cần kết nối (Facebook Ads, Google Ads, Google Analytics, Shopee Ads, fanpage insights). Thiết lập kết nối API tự động với từng nền tảng trong 1 ngày." },
        { title: "Xây dựng template báo cáo", desc: "Tạo template báo cáo riêng cho từng khách hàng dựa trên format cũ, cấu hình AI để viết phần nhận xét và insights tự động. Import content calendar và lịch đăng bài cho tất cả 20 khách." },
        { title: "Setup workflow & training", desc: "Cấu hình workflow onboard khách mới với checklist tự động, training 3 account manager cách sử dụng dashboard và review báo cáo AI-generated. Thiết lập competitor tracking cho top 3 đối thủ của mỗi khách." },
      ],
    },
    pilot: {
      duration: "1 tuần",
      feedback: "Chạy thử báo cáo tháng cho 5 khách hàng đầu tiên. Chị Lan Anh kể: 'Báo cáo đầu tiên AI generate, tôi đọc mà không tin — insights sắc sảo hơn cả bản team viết tay. Khách hàng đầu tiên nhận được còn gọi lại hỏi có thuê thêm analyst mới không vì báo cáo professional quá.'",
      adjustments: "Tinh chỉnh tone of voice cho phần insights phù hợp từng ngành (F&B khác fashion khác tech), bổ sung template cho báo cáo Shopee Ads (ban đầu chưa có), và thêm biểu đồ so sánh month-over-month theo yêu cầu 3 khách hàng lớn.",
    },
    workflow: {
      steps: [
        { title: "Kết nối dữ liệu", desc: "API tự động pull data từ Facebook Ads, Google Ads, Analytics, Shopee mỗi ngày" },
        { title: "Tổng hợp & phân tích", desc: "AI tổng hợp số liệu theo template riêng của từng khách hàng" },
        { title: "Viết insights", desc: "AI phân tích trends, so sánh với tháng trước và đề xuất hành động" },
        { title: "Account review", desc: "Account manager review, customize insights và thêm nhận xét cá nhân" },
        { title: "Gửi khách hàng", desc: "Báo cáo chuyên nghiệp được gửi đúng hạn — sớm hơn 3–4 ngày so với trước" },
      ],
    },
    after: {
      title: "Sau khi dùng Operis",
      points: [
        {
          title: "Báo cáo tháng tự động tổng hợp trong 4 giờ thay vì 3–4 ngày",
          desc: "Operis kết nối API với tất cả nền tảng quảng cáo và analytics, tự động pull data và điền vào template báo cáo của từng khách hàng. AI viết phần nhận xét và insights sơ bộ dựa trên data trends. Account manager chỉ cần review, customize và gửi cho khách. Khách hàng nhận báo cáo sớm hơn 3–4 ngày so với trước, và format đẹp hơn hẳn — nhiều khách khen ngợi sự chuyên nghiệp.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
        },
        {
          title: "Content brief AI-assisted, hoàn thành trong 45 phút",
          desc: "AI research đa nguồn: phân tích trending topics, competitor content, audience insights từ data sẵn có. Tự động generate brief framework với key messages, visual direction, và CTA suggestions. Strategist tiết kiệm 80% thời gian research, tập trung vào creative thinking.",
        },
        {
          title: "Lịch đăng bài tự động theo kế hoạch, sync real-time",
          desc: "Content calendar tập trung cho tất cả khách hàng, tự động schedule bài theo kế hoạch đã duyệt. Notification nhắc nhở trước giờ đăng, alert nếu thiếu nội dung. Sync real-time giữa các thành viên team — không còn nhầm lẫn hay bỏ sót slot đăng bài.",
        },
        {
          title: "Phân tích đối thủ tự động weekly, team luôn cập nhật",
          desc: "Operis tự động theo dõi hoạt động của competitor trên social media, website, và quảng cáo. Báo cáo weekly highlight: bài viết nổi bật, thay đổi chiến lược, ads mới launch. Team luôn có data fresh để tư vấn khách hàng mà không tốn thời gian thu thập thủ công.",
        },
        {
          title: "Onboard khách mới trong 3 ngày với workflow chuẩn hóa",
          desc: "Workflow onboard tự động: checklist theo từng bước, assign task cho đúng người, nhắc nhở deadline. Template sẵn cho brand audit, content strategy, và KPI setup. Khách hàng nhận được onboarding kit chuyên nghiệp ngay ngày đầu — ấn tượng đầu tiên tốt hơn hẳn.",
        },
      ],
    },
    metrics: [
      { label: "Thời gian báo cáo", value: "↓ 85%", sub: "3–4 ngày → 4 giờ" },
      { label: "Capacity khách hàng", value: "↑ 3×", sub: "không tăng headcount" },
      { label: "Onboard mới", value: "3 ngày", sub: "thay vì 2 tuần" },
    ],
    timeline: "Triển khai trong 2 ngày, đầy đủ workflow sau 1 tuần",
    results:
      "Pixel Studio tăng từ 20 lên 35 khách hàng trong 6 tháng mà không tuyển thêm account manager. Tỷ lệ retention khách hàng tăng lên 94% do báo cáo nhanh và chất lượng hơn.",
  },
  {
    slug: "nova-fashion",
    icon: ShoppingBag,
    industry: "Bán lẻ thời trang",
    company: "Chuỗi NOVA Fashion",
    size: "5 cửa hàng · 40 nhân viên",
    location: "Đà Nẵng",
    accentColor: "text-emerald-500",
    borderColor: "border-emerald-500/20",
    gradientFrom: "from-emerald-500/10 to-primary/5",
    accentBg: "bg-emerald-500",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80",
    sideImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80",
    tagline: "Sai lệch tồn kho từ 8% xuống còn 0.3%",
    summary:
      "Chuỗi thời trang 5 cửa hàng tại Đà Nẵng, bán qua 3 kênh: cửa hàng, website và Shopee. Vấn đề kinh niên: tồn kho sai lệch giữa các kênh dẫn đến over-sell và mất hàng, CSKH quá tải với câu hỏi lặp đi lặp lại.",
    challenge:
      "Quản lý tồn kho thủ công qua Excel cho 3 kênh bán hàng. Cuối ngày mới cập nhật số liệu nên thường xuyên xảy ra over-sell trên Shopee trong khi hàng đã hết tại cửa hàng. Tỷ lệ sai lệch tồn kho lên tới 8%. CSKH nhận 80–100 tin nhắn/ngày, 70% là câu hỏi về size, màu sắc, thời gian giao hàng.",
    solution:
      "Operis kết nối real-time với cả 3 kênh bán hàng, tự động đồng bộ tồn kho khi có đơn hàng mới ở bất kỳ kênh nào. Chatbot CSKH được training với catalog sản phẩm và FAQ, xử lý tự động 70% câu hỏi thường gặp. Dashboard tồn kho và doanh thu cập nhật theo giờ.",
    solutionStory: {
      intro: "Anh Nam tìm đến Operis sau một 'sự cố đau thương': cuối tuần Black Friday, 23 đơn Shopee bị hủy vì over-sell — rating shop rớt từ 4.5 xuống 4.1 chỉ trong 2 ngày. 'Lúc đó tôi biết không thể tiếp tục quản lý bằng Excel được nữa,' anh chia sẻ.",
      points: [
        { title: "Khảo sát thực tế tại cửa hàng", desc: "Đội Operis đến trực tiếp 2 cửa hàng lớn nhất tại Đà Nẵng, quan sát quy trình bán hàng, kiểm kho, và trả lời chat khách. Phát hiện nhân viên mất trung bình 3 phút/tin nhắn CSKH — phần lớn là tra cứu tồn kho trên Excel rồi trả lời." },
        { title: "Demo đồng bộ real-time ngay tại chỗ", desc: "Trong buổi demo, Operis kết nối thử với Shopee và website, tạo 1 đơn test trên Shopee — tồn kho trên website tự giảm trong 2 giây. Anh Nam và nhân viên đều trầm trồ: 'Cái này mà có từ trước thì Black Friday đâu có mất 23 đơn.'" },
        { title: "Chatbot được training với catalog thật", desc: "Operis import toàn bộ 1,200+ SKU, bảng size theo từng mẫu, chính sách đổi trả, và bảng phí ship. Chatbot demo trả lời thử 20 câu hỏi thường gặp — chính xác 18/20, nhanh hơn nhân viên CSKH 10 lần." },
      ],
    },
    quote:
      "Sai sót tồn kho gần như biến mất hoàn toàn. Trước đây mỗi cuối tháng là cả đội stress vì chênh lệch số liệu giữa các kênh. Giờ mọi thứ tự đồng bộ, team bán hàng tập trung vào việc chốt đơn thay vì đi kiểm kho tay.",
    author: "Phạm Hoàng Nam",
    role: "Giám đốc vận hành",
    avatarInitials: "HN",
    before: {
      title: "Trước khi dùng Operis",
      points: [
        {
          title: "Quản lý 3 kênh bán hàng hoàn toàn thủ công, cập nhật cuối ngày",
          desc: "Cửa hàng, website, và Shopee — mỗi kênh có hệ thống quản lý riêng. Nhân viên phải nhập liệu thủ công vào 3 nơi khác nhau. Cuối ngày mới cập nhật số liệu chéo, nghĩa là trong ngày không ai biết chính xác còn bao nhiêu hàng. Đặc biệt mùa sale, sai sót xảy ra liên tục.",
        },
        {
          title: "Tồn kho sai lệch 8%, thường xuyên over-sell hoặc mất đơn",
          desc: "Khi khách đặt hàng trên Shopee nhưng sản phẩm đã hết tại cửa hàng — không ai biết cho đến cuối ngày. Trung bình mỗi tuần có 5–8 đơn phải hủy do over-sell, ảnh hưởng rating shop. Ngược lại, nhiều sản phẩm còn hàng nhưng website hiển thị hết — mất cơ hội bán.",
          image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&auto=format&fit=crop&q=80",
        },
        {
          title: "CSKH trả lời 80–100 tin nhắn/ngày, 70% câu hỏi giống nhau",
          desc: "\"Size M có còn không?\", \"Giao hàng mất bao lâu?\", \"Có màu đen không?\" — những câu hỏi lặp đi lặp lại chiếm phần lớn tin nhắn. 2 nhân viên CSKH làm full-time chỉ để trả lời chat, thường bỏ lỡ tin nhắn vào buổi tối và cuối tuần. Thời gian phản hồi trung bình: 45 phút.",
        },
        {
          title: "Báo cáo doanh thu cuối tháng mất 2–3 ngày tổng hợp",
          desc: "Doanh thu từ 3 kênh + 5 cửa hàng phải tổng hợp thủ công. Kế toán export data từ từng nguồn, đối chiếu chéo và xử lý sai lệch. Quản lý không có số liệu real-time nên quyết định nhập hàng, chạy promotion thường chậm 1–2 tuần so với thị trường.",
        },
        {
          title: "Không có dữ liệu real-time để ra quyết định nhập hàng",
          desc: "Mua hàng dựa vào kinh nghiệm và cảm tính của chủ shop. Không biết sản phẩm nào đang bán chạy ở kênh nào, mẫu nào sắp hết, mẫu nào tồn đọng. Kết quả: 15–20% hàng nhập về nằm tồn kho quá 90 ngày, chiếm dụng vốn và diện tích kho.",
        },
      ],
    },
    deployment: {
      duration: "3 ngày",
      steps: [
        { title: "Kết nối 3 kênh bán hàng", desc: "Tích hợp API với website (WooCommerce), Shopee, và hệ thống POS tại 5 cửa hàng. Mapping toàn bộ 1,200+ SKU sản phẩm giữa các kênh, đồng bộ tồn kho ban đầu và xử lý chênh lệch sẵn có. Hoàn thành trong 1 ngày." },
        { title: "Training chatbot CSKH", desc: "Import toàn bộ catalog sản phẩm (bảng size, màu sắc, chất liệu), chính sách đổi trả, bảng phí vận chuyển theo khu vực, và 500+ câu hỏi thường gặp. Cấu hình chatbot trả lời tự động trên cả Shopee chat, Facebook Messenger, và website live chat." },
        { title: "Setup dashboard & báo cáo", desc: "Thiết lập dashboard real-time hiển thị doanh thu theo kênh, tồn kho theo cửa hàng, và top sản phẩm bán chạy. Cấu hình AI gợi ý nhập hàng dựa trên lịch sử bán 6 tháng gần nhất. Training quản lý cửa hàng cách đọc dashboard và sử dụng gợi ý." },
      ],
    },
    pilot: {
      duration: "5 ngày",
      feedback: "Chạy thử tại 2 cửa hàng lớn nhất + kênh Shopee. Anh Nam kể: 'Ngày đầu tiên có đơn Shopee vào, tồn kho tự cập nhật trên website trong 2 giây — nhân viên cửa hàng thấy mà trầm trồ. Chatbot trả lời khách chính xác đến từng size còn hàng ở kênh nào, nhanh hơn nhân viên CSKH nhiều lần.'",
      adjustments: "Bổ sung logic xử lý trường hợp khách đổi size (giữ tồn kho tạm thời 24h), tinh chỉnh chatbot nhận diện tiếng lóng và viết tắt của khách (vd: 'sz' = size, 'ship' = giao hàng), và thêm cảnh báo khi tồn kho xuống dưới 3 sản phẩm.",
    },
    workflow: {
      steps: [
        { title: "Đơn hàng mới", desc: "Khách đặt hàng trên bất kỳ kênh nào — cửa hàng, website, hoặc Shopee" },
        { title: "Sync tồn kho", desc: "Hệ thống tự động cập nhật tồn kho trên tất cả kênh còn lại trong 2 giây" },
        { title: "Chatbot CSKH", desc: "AI tự động trả lời câu hỏi về size, màu, tồn kho, giao hàng 24/7" },
        { title: "Dashboard real-time", desc: "Quản lý theo dõi doanh thu, tồn kho, top sản phẩm theo giờ" },
        { title: "AI gợi ý nhập hàng", desc: "Phân tích xu hướng bán để đề xuất số lượng và thời điểm nhập hàng tối ưu" },
      ],
    },
    after: {
      title: "Sau khi dùng Operis",
      points: [
        {
          title: "Đồng bộ tồn kho real-time qua cả 3 kênh, tự động cập nhật tức thì",
          desc: "Khi có đơn hàng mới ở bất kỳ kênh nào — cửa hàng, website, hay Shopee — tồn kho tự động cập nhật tức thì trên tất cả kênh còn lại. Không cần nhập liệu thủ công, không sợ sai sót. Nhân viên cửa hàng scan barcode bán hàng, hệ thống tự sync trong 2 giây.",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
        },
        {
          title: "Tỷ lệ sai lệch tồn kho giảm từ 8% xuống còn 0.3%",
          desc: "Với đồng bộ real-time, over-sell gần như biến mất hoàn toàn. Mỗi cuối tháng kiểm kho chỉ chênh lệch 0.3% — chủ yếu do lỗi vận chuyển, không phải lỗi hệ thống. Không còn đơn hàng phải hủy vì hết hàng, rating Shopee tăng từ 4.2 lên 4.8 sao.",
        },
        {
          title: "Chatbot tự động xử lý 70% câu hỏi CSKH thường gặp 24/7",
          desc: "Chatbot được training với toàn bộ catalog sản phẩm, bảng size, chính sách đổi trả, và FAQ. Tự động trả lời chính xác về tồn kho theo size/màu, thời gian giao hàng theo khu vực, và gợi ý sản phẩm tương tự khi hết hàng. Hoạt động 24/7, kể cả ngày lễ và ngoài giờ.",
        },
        {
          title: "Dashboard doanh thu cập nhật theo giờ, quyết định nhanh hơn",
          desc: "Quản lý mở app là thấy ngay doanh thu từng cửa hàng, từng kênh, so sánh với tuần trước và tháng trước. Biết sản phẩm nào đang hot, kênh nào hiệu quả nhất, giờ nào bán nhiều nhất. Quyết định chạy flash sale hay đẩy hàng tồn giờ chỉ mất 5 phút thay vì chờ báo cáo cuối tháng.",
        },
        {
          title: "AI gợi ý nhập hàng theo xu hướng bán, giảm tồn đọng 35%",
          desc: "AI phân tích lịch sử bán hàng, xu hướng theo mùa, tốc độ tiêu thụ từng mẫu để gợi ý số lượng và thời điểm nhập hàng tối ưu. Cảnh báo sớm sản phẩm sắp hết và sản phẩm bán chậm cần giảm giá. Hàng tồn đọng trên 90 ngày giảm từ 18% xuống còn 11.7%.",
        },
      ],
    },
    metrics: [
      { label: "Sai lệch tồn kho", value: "↓ 96%", sub: "từ 8% → 0.3%" },
      { label: "CSKH tự động", value: "70%", sub: "câu hỏi xử lý bởi AI" },
      { label: "Hàng tồn đọng", value: "↓ 35%", sub: "nhờ AI dự báo nhu cầu" },
    ],
    timeline: "Triển khai đồng bộ kênh trong 1 ngày, chatbot trong 2 ngày",
    results:
      "Sau 2 tháng, NOVA giảm được 1 nhân sự CSKH (tái phân công sang bán hàng), doanh thu tăng 22% do không còn mất đơn vì over-sell và phản hồi khách nhanh hơn.",
  },
];
