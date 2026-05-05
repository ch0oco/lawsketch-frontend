import { useState, useEffect, useCallback, useMemo } from "react";

// ── ADMIN SECRET KEY ─────────────────────────────────────────────────
// Đổi chuỗi này thành mật khẩu bí mật của bạn.
// Để vào admin: truy cập  yoursite.com/?admin=MẬT_KHẨU_CỦA_BẠN
const ADMIN_SECRET = "lilian-secret-2025";

const CATEGORIES = ["Phân tích án lệ", "Lặt vặt linh tinh", "Nghiên cứu khoa học"];
const CAT_COLORS = {
  "Phân tích án lệ": { bg: "#1a2744", text: "#fff" },
  "Lặt vặt linh tinh": "#5a6e5a",
  "Nghiên cứu khoa học": "#6b1f2a",
};

const INITIAL_POSTS = [
  {
    id: 1,
    title: "Án lệ Lotus v. Borland: Khi giao diện phần mềm trở thành đối tượng bảo hộ bản quyền",
    category: "Phân tích án lệ",
    excerpt: "Tòa án Tối cao Hoa Kỳ trong vụ Lotus Development Corp. v. Borland International, Inc. đã phải đối mặt với câu hỏi căn bản: liệu menu lệnh của phần mềm có thể được bảo hộ bản quyền không?",
    body: "<h2>Bối cảnh tranh chấp</h2><p>Vào đầu thập niên 1990, <em>Lotus 1-2-3</em> là phần mềm bảng tính thống trị thị trường. Borland International — một đối thủ cạnh tranh — đã tích hợp vào phần mềm của mình một \"emulation mode\" cho phép người dùng sử dụng chính xác các chuỗi phím lệnh của Lotus. Lotus kiện, cho rằng đây là hành vi vi phạm bản quyền đối với menu lệnh của họ.</p><p>Câu hỏi pháp lý đặt ra là: liệu một menu lệnh — vốn có tính chức năng — có thể được bảo hộ theo Đạo luật Bản quyền Hoa Kỳ, hay nó thuộc về \"phương pháp thao tác\" không được bảo hộ theo Điều 102(b)?</p><blockquote>\"Ranh giới giữa ý tưởng và biểu đạt — nguyên tắc idea/expression dichotomy — chưa bao giờ rõ ràng trong lĩnh vực phần mềm.\"</blockquote><h2>Lập luận của các bên</h2><p>Lotus lập luận rằng menu lệnh là một tác phẩm sáng tạo độc đáo, phản ánh sự lựa chọn thẩm mỹ và trí tuệ của người thiết kế. Borland, ngược lại, cho rằng đây đơn thuần là một <strong>\"phương pháp thao tác\"</strong> — người dùng cần học thuộc chúng như học ngôn ngữ, do đó không thể bị độc quyền hóa.</p><h2>Phán quyết và lý luận</h2><p>Khi vụ việc lên đến Tối cao Pháp viện Hoa Kỳ, Tòa chia thành 4-4. Sự phân chia này có nghĩa là phán quyết của Tòa phúc thẩm được giữ nguyên — nhưng không có phán quyết đa số nào được tạo ra, và do đó không có tiền lệ pháp lý ràng buộc toàn quốc.</p><h2>Ảnh hưởng</h2><p>Lotus v. Borland đặt ra vấn đề chưa được giải quyết dứt điểm: đến mức độ nào thì một giao diện phần mềm trở thành \"phương pháp thao tác\" miễn nhiễm với bảo hộ bản quyền? Câu hỏi này tiếp tục xuất hiện trong vụ Oracle America, Inc. v. Google LLC (2021).</p>",
    tags: ["bản quyền", "phần mềm", "sở hữu trí tuệ", "Hoa Kỳ"],
    read_time: "12 phút đọc",
    created_at: "2025-05-28T00:00:00Z",
    published: 1,
  },
  {
    id: 2,
    title: "Về việc đọc luật và cảm giác không hiểu gì cả — và tại sao điều đó có thể là tốt",
    category: "Lặt vặt linh tinh",
    excerpt: "Tôi đã mất gần cả học kỳ đầu tiên chỉ để quen với việc đọc một trang giáo trình mà không hiểu một nửa những gì đang được viết.",
    body: "<h2>Giai đoạn không hiểu gì cả</h2><p>Học kỳ đầu tiên của tôi ở Đại học Luật Hà Nội là một chuỗi dài những buổi chiều ngồi với cuốn giáo trình. Các khái niệm như \"quan hệ pháp luật\", \"năng lực chủ thể\", \"hành vi pháp lý\" — chúng nghe có vẻ quen thuộc nhưng lại hoàn toàn xa lạ khi áp dụng vào bối cảnh cụ thể.</p><p>Điều tệ nhất không phải là không hiểu. Điều tệ nhất là <strong>không biết mình đang không hiểu ở chỗ nào</strong>.</p><blockquote>\"Khả năng xác định chính xác điều mình không hiểu — đó mới là bước đầu tiên của việc hiểu.\"</blockquote><h2>Khi confusion trở thành công cụ</h2><p>Có một điều tôi nhận ra sau gần hai năm: cảm giác confusion — sự bối rối, cảm giác \"chưa chắc\" — không phải lúc nào cũng là dấu hiệu của sự thất bại trong việc học. Đôi khi, nó là dấu hiệu của một tư duy đang làm việc thực sự.</p><h2>Những gì thực sự đang xảy ra</h2><p>Khi chúng ta không hiểu một khái niệm pháp lý, thường là vì chúng ta đang thiếu một trong ba thứ: bối cảnh lịch sử của khái niệm đó, ví dụ cụ thể để neo giữ nó vào thực tế, hoặc sự kết nối với những gì chúng ta đã biết trước đó.</p>",
    tags: ["học luật", "suy ngẫm", "kinh nghiệm"],
    read_time: "6 phút đọc",
    created_at: "2025-05-14T00:00:00Z",
    published: 1,
  },
  {
    id: 3,
    title: "Học thuyết \"Passing Off\" trong pháp luật thương hiệu: So sánh giữa Common Law và TRIPS",
    category: "Nghiên cứu khoa học",
    excerpt: "Học thuyết \"passing off\" — vốn có nguồn gốc từ án lệ Common Law của Anh — đặt ra những câu hỏi thú vị khi đặt cạnh khung pháp lý của Hiệp định TRIPS.",
    body: "<h2>Giới thiệu</h2><p>Học thuyết \"passing off\" (giả mạo nguồn gốc thương mại) ra đời từ hệ thống Common Law của Anh, ban đầu như một biện pháp bảo hộ ngoài hệ thống đăng ký thương hiệu chính thức. Án lệ nền tảng là <em>Erven Warnink BV v. J. Townend & Sons (Hull) Ltd</em> (1979) — hay còn gọi là vụ \"Advocaat\".</p><h2>Các yếu tố cấu thành</h2><p>Theo học thuyết \"classical trinity\", passing off đòi hỏi ba yếu tố: <strong>Goodwill</strong> — nguyên đơn phải chứng minh có uy tín thương mại gắn liền với hàng hóa; <strong>Misrepresentation</strong> — bị đơn đã thực hiện hành vi trình bày sai lệch; <strong>Damage</strong> — sự trình bày sai lệch đó gây ra thiệt hại.</p><h2>TRIPS và cơ chế bảo hộ</h2><p>Hiệp định TRIPS thiết lập một tiêu chuẩn tối thiểu bảo hộ nhãn hiệu. Khác với passing off, TRIPS chủ yếu dựa trên hệ thống đăng ký và xác định rõ các tiêu chí để một dấu hiệu đủ điều kiện đăng ký.</p><blockquote>\"TRIPS không loại trừ khả năng bảo hộ nhãn hiệu chưa đăng ký, nhưng cũng không bắt buộc các thành viên phải cung cấp sự bảo hộ đó.\"</blockquote><h2>Kết luận</h2><p>Passing off và cơ chế bảo hộ của TRIPS không đối lập nhau — chúng bổ sung cho nhau. Trong bối cảnh thương mại quốc tế ngày càng phức tạp, sự hiểu biết về cả hai cơ chế là điều cần thiết.</p>",
    tags: ["thương hiệu", "TRIPS", "common law", "sở hữu trí tuệ"],
    read_time: "18 phút đọc",
    created_at: "2025-05-02T00:00:00Z",
    published: 1,
  },
  {
    id: 4,
    title: "Điều khoản force majeure trong hợp đồng thương mại quốc tế: Bài học từ COVID-19",
    category: "Phân tích án lệ",
    excerpt: "Đại dịch COVID-19 đã biến force majeure từ một điều khoản \"boilerplate\" được đọc lướt qua thành tâm điểm của vô số tranh chấp thương mại.",
    body: "<h2>Force Majeure là gì?</h2><p>Force majeure — từ tiếng Pháp nghĩa là \"lực lượng vượt trội\" — là học thuyết miễn trách nhiệm hợp đồng khi một sự kiện nằm ngoài tầm kiểm soát của các bên khiến việc thực hiện nghĩa vụ trở nên bất khả thi.</p><h2>Cách tòa án diễn giải</h2><p>Các tòa án ở nhiều quốc gia đã tiếp cận theo những hướng khác nhau. Ở Anh, nguyên tắc frustration có tiêu chuẩn rất cao: sự kiện không chỉ phải làm cho việc thực hiện trở nên khó khăn hơn, mà phải làm thay đổi căn bản bản chất của nghĩa vụ hợp đồng.</p><blockquote>\"Khó khăn trong thực hiện hợp đồng là không đủ. Câu hỏi là liệu bản chất của nghĩa vụ đã thay đổi căn bản chưa.\"</blockquote><h2>So sánh: CISG và Common Law</h2><p>Điều 79 CISG quy định về miễn trách nhiệm do \"trở ngại nằm ngoài tầm kiểm soát\" của bên vi phạm. Khác với force majeure trong Common Law, Điều 79 không yêu cầu sự kiện phải là \"bất khả kháng\".</p><h2>Hàm ý thực tiễn</h2><p>Bài học quan trọng nhất từ đại dịch: đừng để điều khoản force majeure của bạn mơ hồ. Hãy liệt kê cụ thể các sự kiện được coi là force majeure, quy trình thông báo, và hậu quả pháp lý.</p>",
    tags: ["hợp đồng", "force majeure", "CISG", "covid-19"],
    read_time: "10 phút đọc",
    created_at: "2025-04-18T00:00:00Z",
    published: 1,
  },
  {
    id: 5,
    title: "Một buổi chiều với Kelsen và cảm giác như đang đọc triết học",
    category: "Lặt vặt linh tinh",
    excerpt: "Hôm nay tôi đọc Hans Kelsen — nhà lý luận pháp luật người Áo và lý thuyết \"Thuần Túy Luật Học\" của ông. Và tôi không chắc mình hiểu hay không hiểu.",
    body: "<h2>Kelsen là ai?</h2><p>Hans Kelsen (1881–1973) là một trong những nhà lý luận pháp luật có ảnh hưởng nhất thế kỷ 20. Lý thuyết của ông — <em>Reine Rechtslehre</em> (Thuần Túy Luật Học) — cố gắng tách pháp luật ra khỏi mọi yếu tố đạo đức, chính trị, hay xã hội học.</p><h2>Grundnorm</h2><p>Điều thú vị nhất trong lý thuyết của Kelsen là khái niệm <strong>Grundnorm</strong> (quy phạm cơ bản). Toàn bộ hệ thống pháp luật đứng trên một quy phạm cơ bản — nhưng bản thân quy phạm cơ bản đó không được \"trao ra\" bởi bất kỳ quy phạm nào khác. Nó là một tiền đề được giả định.</p><blockquote>\"Nếu bạn tiếp tục hỏi 'tại sao quy phạm này hợp lệ?', bạn sẽ đến một điểm mà câu trả lời chỉ là: vì chúng ta giả định như vậy.\"</blockquote><h2>Tại sao điều này quan trọng</h2><p>Đọc Kelsen khiến tôi nhận ra rằng pháp luật — dù tôi đang học nó theo hướng rất thực tiễn — có nền tảng triết học sâu sắc hơn tôi nghĩ. Và những câu hỏi mà Kelsen đặt ra từ hơn 100 năm trước vẫn còn đó, chưa được trả lời thỏa đáng.</p>",
    tags: ["lý luận luật", "triết học pháp luật", "kelsen"],
    read_time: "5 phút đọc",
    created_at: "2025-04-05T00:00:00Z",
    published: 1,
  },
];

// ── DB Layer (localStorage — mirrors SQL API) ──────────────────────
const DB = {
  init() {
    if (!localStorage.getItem("ls_posts")) {
      localStorage.setItem("ls_posts", JSON.stringify(INITIAL_POSTS));
      localStorage.setItem("ls_next_id", "6");
    }
  },
  getAll(filters = {}) {
    let posts = JSON.parse(localStorage.getItem("ls_posts") || "[]");
    if (filters.category) posts = posts.filter(p => p.category === filters.category);
    if (filters.tag) posts = posts.filter(p => p.tags.includes(filters.tag));
    if (filters.q) {
      const q = filters.q.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (!filters.includeUnpublished) posts = posts.filter(p => p.published);
    return posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
  getById(id) {
    return JSON.parse(localStorage.getItem("ls_posts") || "[]").find(p => p.id === id);
  },
  create(data) {
    const posts = JSON.parse(localStorage.getItem("ls_posts") || "[]");
    const id = parseInt(localStorage.getItem("ls_next_id") || "1");
    const post = { ...data, id, created_at: new Date().toISOString(), published: 1 };
    posts.push(post);
    localStorage.setItem("ls_posts", JSON.stringify(posts));
    localStorage.setItem("ls_next_id", String(id + 1));
    return post;
  },
  update(id, data) {
    const posts = JSON.parse(localStorage.getItem("ls_posts") || "[]");
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return null;
    posts[idx] = { ...posts[idx], ...data };
    localStorage.setItem("ls_posts", JSON.stringify(posts));
    return posts[idx];
  },
  delete(id) {
    const posts = JSON.parse(localStorage.getItem("ls_posts") || "[]").filter(p => p.id !== id);
    localStorage.setItem("ls_posts", JSON.stringify(posts));
  },
  categories() {
    const posts = JSON.parse(localStorage.getItem("ls_posts") || "[]").filter(p => p.published);
    const cats = {};
    posts.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
    return Object.entries(cats).map(([category, count]) => ({ category, count }));
  },
  tags() {
    const posts = JSON.parse(localStorage.getItem("ls_posts") || "[]").filter(p => p.published);
    return [...new Set(posts.flatMap(p => p.tags))];
  },
};

// ── Styles ──────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #faf9f7; color: #1c1c1e; }

  .serif { font-family: 'Playfair Display', Georgia, serif; }
  .garamond { font-family: 'EB Garamond', Georgia, serif; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #e0ddd8; border-radius: 4px; }

  /* HEADER */
  .hdr {
    position: sticky; top: 0; z-index: 100;
    background: rgba(250,249,247,0.96);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #e0ddd8;
  }
  .hdr-inner {
    max-width: 1180px; margin: 0 auto;
    padding: 0 1.5rem; height: 62px;
    display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
  }
  .logo { display: flex; flex-direction: column; line-height: 1.15; cursor: pointer; }
  .logo-name { font-family: 'Playfair Display',serif; font-size: 1.15rem; font-weight: 700; color: #1a2744; }
  .logo-sub { font-size: 0.6rem; color: #6e6e73; letter-spacing: .16em; text-transform: uppercase; }
  .nav { display: flex; gap: 0; }
  .nav-btn {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans',sans-serif; font-size: 0.75rem; font-weight: 500;
    color: #3a3a3c; padding: .35rem .8rem; letter-spacing: .05em; text-transform: uppercase;
    transition: color .2s; border-radius: 4px;
  }
  .nav-btn:hover, .nav-btn.active { color: #1a2744; }
  .hdr-right { display: flex; gap: .5rem; align-items: center; }
  .icon-btn {
    background: none; border: 1px solid #e0ddd8; border-radius: 4px;
    padding: .35rem .7rem; cursor: pointer; font-size: .75rem; color: #6e6e73;
    font-family: 'DM Sans',sans-serif; display: flex; align-items: center; gap: .35rem;
    transition: all .2s;
  }
  .icon-btn:hover { border-color: #1a2744; color: #1a2744; }
  .icon-btn.admin-btn { background: #1a2744; color: white; border-color: #1a2744; }
  .icon-btn.admin-btn:hover { background: #2c3e6b; }

  /* HERO */
  .hero {
    background: #1a2744; color: white;
    padding: 3.5rem 1.5rem 3rem; text-align: center; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,.025) 39px, rgba(255,255,255,.025) 40px),
                repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,.025) 39px, rgba(255,255,255,.025) 40px);
  }
  .hero-inner { position: relative; max-width: 640px; margin: 0 auto; }
  .hero-label { font-size: .65rem; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.45); margin-bottom: 1rem; }
  .hero h1 { font-family: 'Playfair Display',serif; font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 700; letter-spacing: -.02em; margin-bottom: 1.2rem; }
  .hero h1 em { font-style: italic; color: rgba(255,255,255,.7); }
  .hero-div { width: 36px; height: 2px; background: rgba(255,255,255,.25); margin: 1.4rem auto; }
  .hero-bio { font-family: 'EB Garamond',serif; font-size: 1.05rem; line-height: 1.85; color: rgba(255,255,255,.78); }

  /* LAYOUT */
  .layout {
    max-width: 1180px; margin: 0 auto; padding: 2.5rem 1.5rem;
    display: grid; grid-template-columns: 1fr 268px; gap: 3.5rem; align-items: start;
  }
  .sidebar { position: sticky; top: 74px; }

  /* SECTION LABEL */
  .sec-label {
    font-size: .65rem; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
    color: #6e6e73; margin-bottom: 1.4rem;
    display: flex; align-items: center; gap: .7rem;
  }
  .sec-label::after { content: ''; flex: 1; height: 1px; background: #e0ddd8; }

  /* POST CARDS */
  .post-list { display: flex; flex-direction: column; }
  .post-card {
    padding: 2rem 0; border-bottom: 1px solid #f0ede8; cursor: pointer;
    transition: all .2s;
  }
  .post-card:first-child { padding-top: 0; }
  .post-card:last-child { border-bottom: none; }
  .post-meta { display: flex; align-items: center; gap: .65rem; margin-bottom: .65rem; flex-wrap: wrap; }
  .cat-badge {
    font-size: .6rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
    padding: .18rem .55rem; border-radius: 2px; color: white;
  }
  .cat-anlean { background: #1a2744; }
  .cat-lvlt { background: #5a6e5a; }
  .cat-nckhoa { background: #6b1f2a; }
  .post-date, .post-rt { font-size: .72rem; color: #6e6e73; }
  .post-rt::before { content: '·'; margin-right: .45rem; color: #e0ddd8; }
  .post-card h2 {
    font-family: 'Playfair Display',serif; font-size: clamp(1.1rem,2.2vw,1.45rem);
    font-weight: 700; line-height: 1.35; letter-spacing: -.02em; margin-bottom: .65rem;
    transition: color .2s; color: #1c1c1e;
  }
  .post-card:hover h2 { color: #1a2744; }
  .post-excerpt {
    font-family: 'EB Garamond',serif; font-size: .98rem; color: #3a3a3c;
    line-height: 1.75; margin-bottom: .9rem;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }
  .post-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .tags-row { display: flex; flex-wrap: wrap; gap: .35rem; }
  .tag-pill {
    font-size: .65rem; color: #6e6e73; background: #f5f3ef;
    border: 1px solid #e0ddd8; padding: .12rem .45rem; border-radius: 2px;
    cursor: pointer; transition: all .2s;
  }
  .tag-pill:hover { border-color: #1a2744; color: #1a2744; }
  .read-more {
    font-size: .75rem; font-weight: 500; color: #1a2744;
    letter-spacing: .04em; white-space: nowrap; display: flex; align-items: center; gap: .25rem;
    transition: gap .2s;
  }
  .post-card:hover .read-more { gap: .5rem; }

  /* SIDEBAR BLOCKS */
  .sb-block { margin-bottom: 2.2rem; padding-bottom: 2.2rem; border-bottom: 1px solid #f0ede8; }
  .sb-block:last-child { border-bottom: none; margin-bottom: 0; }
  .sb-title { font-size: .62rem; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; color: #6e6e73; margin-bottom: .9rem; padding-bottom: .5rem; border-bottom: 1px solid #e0ddd8; }
  .avatar { width: 64px; height: 64px; border-radius: 50%; background: #1a2744; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display',serif; font-size: 1.5rem; color: white; font-weight: 700; margin: 0 auto .8rem; }
  .about-mini { text-align: center; }
  .about-mini h3 { font-family: 'Playfair Display',serif; font-size: .95rem; font-weight: 600; margin-bottom: .3rem; }
  .about-mini p { font-size: .75rem; color: #6e6e73; line-height: 1.65; }
  .pop-item { display: flex; gap: .7rem; padding: .6rem 0; border-bottom: 1px solid #f0ede8; cursor: pointer; }
  .pop-item:last-child { border-bottom: none; }
  .pop-num { font-family: 'Playfair Display',serif; font-size: 1.3rem; color: #e0ddd8; font-weight: 700; line-height: 1; flex-shrink: 0; width: 1.6rem; }
  .pop-info h4 { font-family: 'Playfair Display',serif; font-size: .82rem; font-weight: 600; line-height: 1.4; color: #3a3a3c; transition: color .2s; margin-bottom: .15rem; }
  .pop-item:hover h4 { color: #1a2744; }
  .pop-info span { font-size: .67rem; color: #6e6e73; }
  .cat-list-item { display: flex; justify-content: space-between; align-items: center; padding: .5rem 0; border-bottom: 1px solid #f0ede8; font-size: .82rem; cursor: pointer; transition: color .2s; color: #3a3a3c; }
  .cat-list-item:last-child { border-bottom: none; }
  .cat-list-item:hover { color: #1a2744; }
  .cat-count { font-size: .67rem; background: #f5f3ef; border: 1px solid #e0ddd8; padding: .1rem .4rem; border-radius: 10px; color: #6e6e73; }
  .tag-cloud { display: flex; flex-wrap: wrap; gap: .35rem; }

  /* ARTICLE VIEW */
  .art-header { margin-bottom: 2.2rem; padding-bottom: 1.8rem; border-bottom: 1px solid #e0ddd8; }
  .art-header h1 { font-family: 'Playfair Display',serif; font-size: clamp(1.5rem,3vw,2.2rem); font-weight: 700; letter-spacing: -.025em; line-height: 1.25; margin-bottom: .9rem; }
  .art-intro { font-family: 'EB Garamond',serif; font-size: 1.1rem; color: #3a3a3c; line-height: 1.8; font-style: italic; }
  .toc { background: #f5f3ef; border: 1px solid #e0ddd8; border-left: 3px solid #1a2744; padding: 1.1rem 1.3rem; margin-bottom: 2rem; border-radius: 0 4px 4px 0; }
  .toc-ttl { font-size: .65rem; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: #6e6e73; margin-bottom: .7rem; }
  .toc ol { padding-left: 1.2rem; }
  .toc li { font-size: .82rem; color: #3a3a3c; padding: .2rem 0; cursor: pointer; transition: color .2s; }
  .toc li:hover { color: #1a2744; }
  .art-body { font-family: 'EB Garamond',serif; font-size: 1.08rem; line-height: 1.9; color: #3a3a3c; }
  .art-body h2 { font-family: 'Playfair Display',serif; font-size: 1.3rem; font-weight: 700; color: #1c1c1e; margin: 2.3rem 0 .9rem; letter-spacing: -.02em; }
  .art-body h3 { font-family: 'Playfair Display',serif; font-size: 1.05rem; font-weight: 600; color: #1c1c1e; margin: 1.8rem 0 .7rem; font-style: italic; }
  .art-body p { margin-bottom: 1.2rem; }
  .art-body blockquote { border-left: 3px solid #1a2744; margin: 1.8rem 0; padding: .9rem 1.3rem; background: #f5f3ef; font-style: italic; color: #3a3a3c; border-radius: 0 4px 4px 0; }
  .art-body strong { color: #1c1c1e; font-weight: 600; }
  .art-footer { margin-top: 2.5rem; padding-top: 1.8rem; border-top: 1px solid #e0ddd8; }
  .back-btn {
    display: inline-flex; align-items: center; gap: .35rem;
    font-size: .75rem; font-weight: 500; color: #1a2744;
    letter-spacing: .04em; text-transform: uppercase; cursor: pointer;
    background: none; border: none; font-family: 'DM Sans',sans-serif;
    padding: 0; transition: gap .2s; margin-bottom: 1.5rem;
  }
  .back-btn:hover { gap: .6rem; }

  /* SEARCH OVERLAY */
  .search-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(26,39,68,.55); backdrop-filter: blur(4px);
    display: flex; align-items: flex-start; justify-content: center; padding-top: 5rem;
  }
  .search-box {
    background: white; border-radius: 8px; padding: 1.4rem;
    width: 100%; max-width: 540px; margin: 0 1rem;
    box-shadow: 0 16px 48px rgba(0,0,0,.18);
  }
  .search-input {
    width: 100%; border: none; border-bottom: 2px solid #1a2744;
    padding: .5rem 0; font-size: 1.15rem; font-family: 'Playfair Display',serif;
    background: transparent; outline: none; color: #1c1c1e;
  }
  .search-input::placeholder { color: #aaa; }
  .search-hint { font-size: .72rem; color: #6e6e73; margin-top: .65rem; }
  .search-result-item {
    padding: .65rem 0; border-bottom: 1px solid #f0ede8;
    cursor: pointer; transition: opacity .15s;
  }
  .search-result-item:last-child { border-bottom: none; }
  .search-result-item:hover { opacity: .75; }
  .search-result-cat { font-size: .62rem; color: #6e6e73; letter-spacing: .1em; text-transform: uppercase; margin-bottom: .25rem; }
  .search-result-title { font-family: 'Playfair Display',serif; font-size: .92rem; font-weight: 600; color: #1c1c1e; }

  /* ADMIN PANEL */
  .admin-overlay {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(0,0,0,.5); display: flex; align-items: flex-start; justify-content: center;
    padding: 1.5rem; overflow-y: auto;
  }
  .admin-panel {
    background: #faf9f7; border-radius: 8px; width: 100%; max-width: 820px;
    box-shadow: 0 20px 60px rgba(0,0,0,.25); overflow: hidden;
  }
  .admin-header {
    background: #1a2744; color: white; padding: 1rem 1.4rem;
    display: flex; align-items: center; justify-content: space-between;
  }
  .admin-header h2 { font-family: 'Playfair Display',serif; font-size: 1.1rem; font-weight: 600; }
  .admin-close { background: none; border: none; color: rgba(255,255,255,.7); cursor: pointer; font-size: 1.3rem; line-height: 1; }
  .admin-body { padding: 1.4rem; }
  .admin-tabs { display: flex; gap: 0; border-bottom: 1px solid #e0ddd8; margin-bottom: 1.4rem; }
  .admin-tab { background: none; border: none; padding: .5rem 1rem; font-family: 'DM Sans',sans-serif; font-size: .8rem; font-weight: 500; color: #6e6e73; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all .2s; }
  .admin-tab.active { color: #1a2744; border-bottom-color: #1a2744; }
  .form-row { margin-bottom: 1rem; }
  .form-label { display: block; font-size: .72rem; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: #6e6e73; margin-bottom: .35rem; }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: .55rem .75rem; border: 1px solid #e0ddd8; border-radius: 4px;
    font-family: 'DM Sans',sans-serif; font-size: .88rem; color: #1c1c1e; background: white;
    transition: border-color .2s; outline: none;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: #1a2744; }
  .form-textarea { min-height: 160px; resize: vertical; font-family: 'EB Garamond',serif; font-size: .95rem; line-height: 1.7; }
  .form-hint { font-size: .7rem; color: #6e6e73; margin-top: .3rem; }
  .btn-row { display: flex; gap: .6rem; justify-content: flex-end; margin-top: 1.2rem; }
  .btn-primary { background: #1a2744; color: white; border: none; padding: .55rem 1.2rem; border-radius: 4px; font-family: 'DM Sans',sans-serif; font-size: .82rem; font-weight: 500; cursor: pointer; transition: background .2s; }
  .btn-primary:hover { background: #2c3e6b; }
  .btn-secondary { background: none; color: #3a3a3c; border: 1px solid #e0ddd8; padding: .55rem 1.2rem; border-radius: 4px; font-family: 'DM Sans',sans-serif; font-size: .82rem; cursor: pointer; transition: all .2s; }
  .btn-secondary:hover { border-color: #1a2744; color: #1a2744; }
  .btn-danger { background: #c0392b; color: white; border: none; padding: .4rem .8rem; border-radius: 4px; font-size: .75rem; cursor: pointer; font-family: 'DM Sans',sans-serif; }
  .btn-edit { background: #1a2744; color: white; border: none; padding: .4rem .8rem; border-radius: 4px; font-size: .75rem; cursor: pointer; font-family: 'DM Sans',sans-serif; margin-right: .35rem; }
  .admin-post-row { display: flex; align-items: center; justify-content: space-between; padding: .75rem 0; border-bottom: 1px solid #f0ede8; gap: 1rem; }
  .admin-post-row:last-child { border-bottom: none; }
  .admin-post-title { font-family: 'Playfair Display',serif; font-size: .9rem; font-weight: 600; color: #1c1c1e; flex: 1; }
  .admin-post-cat { font-size: .65rem; color: #6e6e73; margin-top: .15rem; }
  .unpublished { opacity: .5; }
  .status-badge { font-size: .6rem; padding: .1rem .4rem; border-radius: 2px; font-weight: 500; }
  .status-pub { background: #d4edda; color: #155724; }
  .status-draft { background: #fff3cd; color: #856404; }
  .success-msg { background: #d4edda; color: #155724; padding: .6rem .9rem; border-radius: 4px; font-size: .82rem; margin-bottom: 1rem; }
  .empty-state { text-align: center; padding: 3rem 0; color: #6e6e73; font-family: 'Playfair Display',serif; font-style: italic; }

  @media (max-width: 860px) {
    .layout { grid-template-columns: 1fr; gap: 2rem; }
    .sidebar { position: static; }
    .nav { display: none; }
  }
`;

function getCatClass(cat) {
  if (cat === "Phân tích án lệ") return "cat-anlean";
  if (cat === "Lặt vặt linh tinh") return "cat-lvlt";
  if (cat === "Nghiên cứu khoa học") return "cat-nckhoa";
  return "";
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" });
}

function extractHeadings(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return [...tmp.querySelectorAll("h2")].map(h => h.textContent);
}

// ── ADMIN FORM ──────────────────────────────────────────────────────
function PostForm({ post, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: post?.title || "",
    category: post?.category || CATEGORIES[0],
    excerpt: post?.excerpt || "",
    body: post?.body || "",
    tags: post?.tags?.join(", ") || "",
    read_time: post?.read_time || "5 phút đọc",
    published: post?.published ?? 1,
  });
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    const data = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      published: form.published ? 1 : 0,
    };
    onSave(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      {saved && <div className="success-msg">✓ Đã lưu thành công!</div>}
      <div className="form-row">
        <label className="form-label">Tiêu đề *</label>
        <input className="form-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Tiêu đề bài viết..." />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div className="form-row">
          <label className="form-label">Danh mục</label>
          <select className="form-select" value={form.category} onChange={e => set("category", e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label className="form-label">Thời gian đọc</label>
          <input className="form-input" value={form.read_time} onChange={e => set("read_time", e.target.value)} placeholder="5 phút đọc" />
        </div>
      </div>
      <div className="form-row">
        <label className="form-label">Tóm tắt</label>
        <textarea className="form-textarea" style={{ minHeight: 80 }} value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Một đoạn giới thiệu ngắn..." />
      </div>
      <div className="form-row">
        <label className="form-label">Nội dung (HTML) *</label>
        <textarea className="form-textarea" value={form.body} onChange={e => set("body", e.target.value)} placeholder={`<h2>Phần 1</h2>\n<p>Nội dung...</p>\n<blockquote>Trích dẫn...</blockquote>`} />
        <p className="form-hint">Hỗ trợ HTML: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;blockquote&gt;</p>
      </div>
      <div className="form-row">
        <label className="form-label">Từ khóa (cách nhau bởi dấu phẩy)</label>
        <input className="form-input" value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="bản quyền, phần mềm, sở hữu trí tuệ" />
      </div>
      <div className="form-row" style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
        <input type="checkbox" id="pub" checked={!!form.published} onChange={e => set("published", e.target.checked ? 1 : 0)} />
        <label htmlFor="pub" style={{ fontSize: ".82rem", cursor: "pointer" }}>Xuất bản (công khai)</label>
      </div>
      <div className="btn-row">
        <button className="btn-secondary" onClick={onCancel}>Hủy</button>
        <button className="btn-primary" onClick={handleSave}>
          {post ? "Cập nhật bài viết" : "Tạo bài viết"}
        </button>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ─────────────────────────────────────────────────────
function AdminPanel({ onClose, onRefresh }) {
  const [tab, setTab] = useState("list");
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = useCallback(() => {
    setPosts(DB.getAll({ includeUnpublished: true }));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = (data) => {
    if (editing === "new") {
      DB.create(data);
    } else {
      DB.update(editing.id, data);
    }
    load();
    onRefresh();
    setTab("list");
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (!confirm("Xóa bài viết này?")) return;
    DB.delete(id);
    load();
    onRefresh();
  };

  const handleToggle = (post) => {
    DB.update(post.id, { ...post, published: post.published ? 0 : 1 });
    load();
    onRefresh();
  };

  return (
    <div className="admin-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="admin-panel">
        <div className="admin-header">
          <h2>✦ Quản lý bài viết</h2>
          <button className="admin-close" onClick={onClose}>×</button>
        </div>
        <div className="admin-body">
          <div className="admin-tabs">
            <button className={`admin-tab ${tab === "list" ? "active" : ""}`} onClick={() => { setTab("list"); setEditing(null); }}>Danh sách bài viết ({posts.length})</button>
            <button className={`admin-tab ${tab === "new" ? "active" : ""}`} onClick={() => { setTab("new"); setEditing("new"); }}>+ Bài viết mới</button>
          </div>

          {tab === "list" && (
            <div>
              {posts.length === 0 && <div className="empty-state">Chưa có bài viết nào.</div>}
              {posts.map(p => (
                <div key={p.id} className={`admin-post-row ${!p.published ? "unpublished" : ""}`}>
                  <div style={{ flex: 1 }}>
                    <div className="admin-post-title">{p.title}</div>
                    <div className="admin-post-cat">{p.category} · {formatDate(p.created_at)}</div>
                  </div>
                  <span className={`status-badge ${p.published ? "status-pub" : "status-draft"}`}>
                    {p.published ? "Xuất bản" : "Nháp"}
                  </span>
                  <div>
                    <button className="btn-edit" onClick={() => { setEditing(p); setTab("edit"); }}>Sửa</button>
                    <button className="btn-secondary" style={{ fontSize: ".72rem", padding: ".35rem .65rem", marginRight: ".35rem" }} onClick={() => handleToggle(p)}>
                      {p.published ? "Ẩn" : "Đăng"}
                    </button>
                    <button className="btn-danger" onClick={() => handleDelete(p.id)}>Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(tab === "new" || tab === "edit") && (
            <PostForm
              post={editing === "new" ? null : editing}
              onSave={handleSave}
              onCancel={() => { setTab("list"); setEditing(null); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ────────────────────────────────────────────────────────
export default function App() {
  // Kiểm tra URL param: ?admin=MẬT_KHẨU → mới cho phép vào admin
  const isAdmin = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("admin") === ADMIN_SECRET;
  }, []);

  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("home"); // home | article
  const [currentPost, setCurrentPost] = useState(null);
  const [filterCat, setFilterCat] = useState(null);
  const [filterTag, setFilterTag] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [sectionLabel, setSectionLabel] = useState("Bài viết mới nhất");

  const loadPosts = useCallback(() => {
    setPosts(DB.getAll());
  }, []);

  useEffect(() => {
    DB.init();
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") { setSearchOpen(false); setAdminOpen(false); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const displayPosts = useMemo(() => {
    let list = posts;
    if (filterCat) list = list.filter(p => p.category === filterCat);
    if (filterTag) list = list.filter(p => p.tags.includes(filterTag));
    return list;
  }, [posts, filterCat, filterTag]);

  const searchResults = useMemo(() => {
    if (!searchQ.trim()) return [];
    const q = searchQ.toLowerCase();
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [posts, searchQ]);

  const categories = useMemo(() => DB.categories(), [posts]);
  const allTags = useMemo(() => DB.tags(), [posts]);

  const openArticle = (post) => {
    setCurrentPost(post);
    setView("article");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setView("home");
    setCurrentPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyFilter = (cat, tag) => {
    setFilterCat(cat);
    setFilterTag(tag);
    setView("home");
    setCurrentPost(null);
    if (cat) setSectionLabel(cat);
    else if (tag) setSectionLabel(`#${tag}`);
    else setSectionLabel("Bài viết mới nhất");
  };

  const headings = currentPost ? extractHeadings(currentPost.body || "") : [];

  return (
    <>
      <style>{css}</style>

      {/* HEADER */}
      <header className="hdr">
        <div className="hdr-inner">
          <div className="logo" onClick={() => { applyFilter(null, null); goHome(); }}>
            <span className="logo-name">Lilian LawSketch</span>
            <span className="logo-sub">Phác thảo pháp lý</span>
          </div>
          <nav className="nav">
            <button className="nav-btn" onClick={() => { applyFilter(null, null); goHome(); }}>Trang chủ</button>
            {CATEGORIES.map(c => (
              <button key={c} className={`nav-btn ${filterCat === c && view === "home" ? "active" : ""}`}
                onClick={() => applyFilter(c, null)}>{c.split(" ").slice(0, 2).join(" ")}</button>
            ))}
          </nav>
          <div className="hdr-right">
            <button className="icon-btn" onClick={() => setSearchOpen(true)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Tìm kiếm
            </button>
            {isAdmin && (
              <button className="icon-btn admin-btn" onClick={() => setAdminOpen(true)}>
                ✦ Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {/* SEARCH */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-box" onClick={e => e.stopPropagation()}>
            <input
              className="search-input" autoFocus placeholder="Tìm bài viết..."
              value={searchQ} onChange={e => setSearchQ(e.target.value)}
            />
            <p className="search-hint">Nhấn Esc để đóng</p>
            <div style={{ marginTop: "1rem" }}>
              {searchQ && searchResults.length === 0 && (
                <p style={{ fontSize: ".82rem", color: "#6e6e73" }}>Không tìm thấy kết quả nào.</p>
              )}
              {searchResults.map(p => (
                <div key={p.id} className="search-result-item" onClick={() => { setSearchOpen(false); setSearchQ(""); openArticle(p); }}>
                  <div className="search-result-cat">{p.category}</div>
                  <div className="search-result-title">{p.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADMIN */}
      {adminOpen && isAdmin && (
        <AdminPanel onClose={() => setAdminOpen(false)} onRefresh={loadPosts} />
      )}

      {/* HERO */}
      {view === "home" && (
        <section className="hero">
          <div className="hero-inner">
            <p className="hero-label">Nhật ký học thuật · K49 · ĐH Luật Hà Nội</p>
            <h1 className="serif">Lilian <em>LawSketch</em></h1>
            <div className="hero-div" />
            <p className="hero-bio">Một blog không nhằm giải thích luật — mà là nơi tôi làm việc với nó. Chậm rãi, cá nhân, và đôi khi chưa hoàn chỉnh.</p>
          </div>
        </section>
      )}

      {/* HOME */}
      {view === "home" && (
        <div className="layout">
          <main>
            <p className="sec-label">{sectionLabel}</p>
            {displayPosts.length === 0 ? (
              <div className="empty-state">Không có bài viết nào trong danh mục này.</div>
            ) : (
              <div className="post-list">
                {displayPosts.map(p => (
                  <article key={p.id} className="post-card" onClick={() => openArticle(p)}>
                    <div className="post-meta">
                      <span className={`cat-badge ${getCatClass(p.category)}`}>{p.category}</span>
                      <span className="post-date">{formatDate(p.created_at)}</span>
                      <span className="post-rt">{p.read_time}</span>
                    </div>
                    <h2>{p.title}</h2>
                    <p className="post-excerpt">{p.excerpt}</p>
                    <div className="post-footer">
                      <div className="tags-row">
                        {p.tags.slice(0, 3).map(t => (
                          <span key={t} className="tag-pill" onClick={e => { e.stopPropagation(); applyFilter(null, t); }}>#{t}</span>
                        ))}
                      </div>
                      <span className="read-more">
                        Đọc thêm
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>

          <aside className="sidebar">
            <div className="sb-block">
              <div className="about-mini">
                <div className="avatar">L</div>
                <h3 className="serif">Lilian</h3>
                <p>Sinh viên Luật năm 2, chuyên ngành Luật thương mại quốc tế — ĐH Luật Hà Nội. Viết để hiểu, không phải để giải thích.</p>
              </div>
            </div>
            <div className="sb-block">
              <p className="sb-title">Đọc nhiều nhất</p>
              {posts.slice(0, 4).map((p, i) => (
                <div key={p.id} className="pop-item" onClick={() => openArticle(p)}>
                  <span className="pop-num">0{i + 1}</span>
                  <div className="pop-info">
                    <h4>{p.title}</h4>
                    <span>{formatDate(p.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="sb-block">
              <p className="sb-title">Danh mục</p>
              {categories.map(({ category, count }) => (
                <div key={category} className="cat-list-item" onClick={() => applyFilter(category, null)}>
                  <span>{category}</span>
                  <span className="cat-count">{count}</span>
                </div>
              ))}
            </div>
            <div className="sb-block">
              <p className="sb-title">Từ khóa</p>
              <div className="tag-cloud">
                {allTags.map(t => (
                  <span key={t} className="tag-pill" onClick={() => applyFilter(null, t)}>#{t}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ARTICLE */}
      {view === "article" && currentPost && (
        <div className="layout">
          <article>
            <button className="back-btn" onClick={goHome}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              Quay lại
            </button>
            <header className="art-header">
              <div className="post-meta">
                <span className={`cat-badge ${getCatClass(currentPost.category)}`}>{currentPost.category}</span>
                <span className="post-date">{formatDate(currentPost.created_at)}</span>
                <span className="post-rt">{currentPost.read_time}</span>
              </div>
              <h1>{currentPost.title}</h1>
              <p className="art-intro">{currentPost.excerpt}</p>
            </header>

            {headings.length > 0 && (
              <div className="toc">
                <p className="toc-ttl">Mục lục</p>
                <ol>
                  {headings.map((h, i) => (
                    <li key={i} onClick={() => {
                      const el = document.querySelectorAll(".art-body h2")[i];
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}>{h}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="art-body" dangerouslySetInnerHTML={{ __html: currentPost.body }} />

            <footer className="art-footer">
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: ".75rem", color: "#6e6e73" }}>Từ khóa:</span>
                {currentPost.tags.map(t => (
                  <span key={t} className="tag-pill" onClick={() => applyFilter(null, t)}>#{t}</span>
                ))}
              </div>
            </footer>
          </article>

          <aside className="sidebar">
            <div className="sb-block">
              <div className="about-mini">
                <div className="avatar">L</div>
                <h3 className="serif">Lilian</h3>
                <p>Sinh viên Luật năm 2, K49 — ĐH Luật Hà Nội. Chuyên ngành Luật thương mại quốc tế.</p>
              </div>
            </div>
            <div className="sb-block">
              <p className="sb-title">Danh mục</p>
              {categories.map(({ category, count }) => (
                <div key={category} className="cat-list-item" onClick={() => applyFilter(category, null)}>
                  <span>{category}</span>
                  <span className="cat-count">{count}</span>
                </div>
              ))}
            </div>
            <div className="sb-block">
              <p className="sb-title">Bài viết khác</p>
              {posts.filter(p => p.id !== currentPost.id).slice(0, 3).map((p, i) => (
                <div key={p.id} className="pop-item" onClick={() => openArticle(p)}>
                  <span className="pop-num">0{i + 1}</span>
                  <div className="pop-info">
                    <h4>{p.title}</h4>
                    <span>{p.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      <footer style={{ background: "#1a2744", color: "rgba(255,255,255,.6)", textAlign: "center", padding: "2.2rem 1.5rem", marginTop: "3rem" }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "white", marginBottom: ".35rem" }}>Lilian LawSketch</p>
        <p style={{ fontSize: ".75rem", lineHeight: 1.8 }}>
          © 2025 · Viết bởi Lilian — Sinh viên Luật K49, ĐH Luật Hà Nội<br />
          Mọi nội dung mang tính học thuật cá nhân. Không phải tư vấn pháp lý.<br />
          <a href="mailto:lilian@example.com" style={{ color: "rgba(255,255,255,.8)", textDecoration: "underline", textUnderlineOffset: 3 }}>lilian@example.com</a>
        </p>
      </footer>
    </>
  );
}
