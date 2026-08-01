# CodeWave Web — Kế hoạch triển khai cho AI Agent

> **Mục tiêu:** xây dựng một website học Lập trình Web mới, độc lập với PyLearn hiện tại, gồm 3 khóa `Web Basic`, `Web Advance`, `Web Intensive` và 14 bài mỗi khóa.
>
> **Tổng quy mô:** 3 khóa, 42 lesson shell và 42 lesson record trong manifest dữ liệu. Nội dung học sẽ được người dùng cung cấp sau; AI agent không được tự bịa nội dung để chuyển bài sang trạng thái phát hành.
>
> **Trạng thái tài liệu:** `SOURCE READY / CONTENT BLOCKED` — baseline source/data/build/browser đã có bằng chứng; nội dung lesson vẫn chờ người dùng cung cấp.

## 0. Quyết định đã chốt và giả định

| Hạng mục | Quyết định |
|---|---|
| Tên tạm thời | CodeWave Web |
| Kiến trúc | Ứng dụng web tĩnh, static-first, chạy qua HTTP |
| Vị trí đề xuất | Thư mục độc lập `web-learning/` trong repository; không sửa luồng PyLearn khi chưa được duyệt |
| Số khóa | 3: Web Basic, Web Advance, Web Intensive |
| Số bài | 14 bài/khóa, tổng 42 bài, theo danh sách người dùng cung cấp |
| Nội dung | Chưa có; 42 bài khởi tạo `draft` và hiển thị “Sắp cập nhật” |
| Tài khoản/backend | Không thuộc V1 |
| Tiến độ | `localStorage`, chỉ là dữ liệu cục bộ, không phải điểm chính thức |
| Hình ảnh/icon | Tạo mới bằng AI, lưu trong dự án, không hotlink từ dịch vụ ngoài |
| Giao diện | Tham chiếu bố cục ảnh người dùng cung cấp, không pixel-copy và không dùng ảnh tham chiếu làm tài sản production |

Danh sách 14/14/14 trong yêu cầu mới là contract chính thức; không suy diễn theo số lượng hiển thị trong ảnh tham chiếu.

### 0.1. Tiêu đề lesson đã chốt

Các tiêu đề dưới đây là metadata đã được cung cấp. Phần nội dung, mục tiêu, quiz, bài thực hành và Code Lab vẫn giữ `draft` cho đến khi có tài liệu học chính thức.

| Khóa | 14 tiêu đề theo thứ tự |
|---|---|
| JSB — Web Developer Basic | Website hoạt động như thế nào; HTML bậc trung & Web nhiều trang; Trang trí cho website như thế nào; CSS bậc trung; CSS nâng cao & Checkpoint 1; Bootstrap & Web Design (P1); Bootstrap & Web Design (P2); Thu thập dữ liệu người dùng; Khám phá ý tưởng lập trình & Checkpoint 2; Thực hành xây dựng sản phẩm cuối khóa (Phần 1); Thực hành xây dựng sản phẩm cuối khóa (Phần 2); Thực hành xây dựng sản phẩm cuối khóa (Phần 3); Hoàn thiện sản phẩm cuối khóa; Thuyết trình dự án cuối khóa |
| JSA — Web Developer Advanced | Hệ thống lưới trong thiết kế giao diện; Sức mạnh của ngôn ngữ lập trình JavaScript; Toán tử, câu điều kiện & vòng lặp; Array, Object & DOM; Hàm & Checkpoint 1; MindX Cinema (Phần 1); MindX Cinema (Phần 2); MindX Cinema (Phần 3); Khám phá ý tưởng lập trình & Checkpoint 2; Thực hành xây dựng sản phẩm cuối khóa (Phần 1); Thực hành xây dựng sản phẩm cuối khóa (Phần 2); Thực hành xây dựng sản phẩm cuối khóa (Phần 3); Nghiệm thu sản phẩm; Thuyết trình dự án cuối khóa |
| JSI — Web Developer Intensive | Ôn tập kiến thức; JavaScript chuyên sâu; Firebase và thiết lập máy chủ; Firebase và xác thực người dùng; Firestore và Firebase Storage; Lên ý tưởng và mô hình phát triển; Thiết kế giao diện website (Phần 1); Thiết kế giao diện website (Phần 2); Thiết kế giao diện website (Phần 3); Xây dựng tính năng website (Phần 1); Xây dựng tính năng website (Phần 2); Xây dựng tính năng website (Phần 3); Chưa có tiêu đề độc lập được xác nhận trong bản Teaching Guide hiện có; Thuyết trình dự án cuối khóa |

Lesson JSI-13 phải hiển thị badge `Cần xác nhận tiêu đề` và không được suy đoán tên bài thay thế.

## 1. Execution contract cho AI agent

```xml
<gates label="hard-stop | priority: backup > scope > data > implementation > acceptance">

GATE-01 scope:
  target: web-learning/
  preserve: existing-PyLearn-source
  banned: rewrite-PyLearn | deploy-production | add-backend-without-approval

GATE-02 curriculum:
  course-count: 3
  lesson-count-per-course: 14
  total-lessons: 42
  initial-status: draft
  banned: invent-lesson-content | mark-placeholder-published

GATE-03 assets:
  source: AI-generated
  required: asset-manifest | prompt-log | alt-text | manual-review
  banned: watermark | embedded-text | copied-logo | unlicensed-third-party-asset

GATE-04 code-lab:
  trigger: lesson-content-requires-HTML-CSS-JS-preview
  action: sandboxed-iframe
  sandbox: allow-scripts-only
  banned: eval | new-Function | allow-same-origin | parent-DOM-execution

GATE-05 acceptance:
  action: check-only-with-fresh-evidence
  banned: claim-RELEASED-without-deploy-proof | claim-RUNTIME-PASSED-from-source-only

</gates>
```

## 2. Mục tiêu sản phẩm

Website phải cho học sinh:

- Nhìn thấy ngay ba lộ trình Web Basic, Web Advance và Web Intensive.
- Biết mỗi khóa có 14 bài và trạng thái tiến độ hiện tại.
- Mở danh sách bài của từng khóa.
- Phân biệt rõ bài đã phát hành và bài đang chờ nội dung.
- Khi nội dung được đưa vào sau, có thể đọc lý thuyết, làm quiz và thực hành trong Code Lab an toàn.
- Lưu tiến độ trên trình duyệt hiện tại và có thể reset/export/import sau khi tính năng này được triển khai.

## 3. Không thuộc phạm vi V1

- Không có Firebase/Supabase, tài khoản giáo viên, lớp học hoặc dữ liệu học sinh trên server.
- Không có bảng điểm chính thức, báo cáo giáo viên hoặc đồng bộ nhiều thiết bị.
- Không tự tạo curriculum chi tiết khi chưa nhận nguồn nội dung.
- Không tự triển khai production hoặc mua domain/dịch vụ.
- Không thêm React, Next.js hoặc backend chỉ để dựng trang giới thiệu.

## 4. Kiến trúc thông tin và route

| Route | Màn hình | Trạng thái V1 |
|---|---|---|
| `#/` | Trang chủ với hero và ba course card | Bắt buộc |
| `#/web-basic` | Danh sách 14 bài Web Basic | Bắt buộc |
| `#/web-advance` | Danh sách 14 bài Web Advance | Bắt buộc |
| `#/web-intensive` | Danh sách 14 bài Web Intensive | Bắt buộc |
| `#/web-basic/:lessonId` | Lesson shell hoặc trang “Sắp cập nhật” | Bắt buộc |
| `#/web-advance/:lessonId` | Lesson shell hoặc trang “Sắp cập nhật” | Bắt buộc |
| `#/web-intensive/:lessonId` | Lesson shell hoặc trang “Sắp cập nhật” | Bắt buộc |
| `#/progress` | Tiến độ cục bộ | Có thể hoàn thiện ở Phase 7 |
| route sai | Trang 404 và nút quay lại | Bắt buộc |

## 5. Bố cục giao diện theo ảnh tham chiếu

### 5.1 Header

- Logo CodeWave bên trái; chữ thương hiệu là HTML text, không nằm trong hình AI.
- Điều hướng: Trang chủ, Web Basic, Web Advance, Web Intensive.
- Header nền xanh navy/blue gradient, cao khoảng 64–72 px trên desktop.
- Mobile dùng menu button có accessible name, quản lý focus và đóng bằng `Escape`.
- Link active có cả màu, border/underline hoặc `aria-current="page"`; không chỉ dựa vào màu.

### 5.2 Hero

- Ảnh AI về không gian học lập trình web, màn hình máy tính và môi trường sáng hiện đại.
- Text HTML phủ lên vùng tối: “Học Lập Trình Web” và mô tả ngắn.
- Có overlay gradient để text đạt contrast.
- Không yêu cầu AI sinh chữ, logo hoặc giao diện web đọc được bên trong ảnh.
- Desktop tỷ lệ gần `16:7`; mobile dùng crop có chủ đích, không che nội dung chính.

### 5.3 Course cards

Ba card nằm cùng hàng trên desktop và xếp dọc trên mobile:

| Course | Màu nhận diện đề xuất | Icon AI | Dòng mô tả ban đầu |
|---|---|---|---|
| Web Basic | Green `#2E9F62` | Code brackets / browser window | “Nền tảng lập trình web — nội dung đang cập nhật” |
| Web Advance | Blue `#2563B8` | Connected components / interactive UI | “Phát triển ứng dụng web — nội dung đang cập nhật” |
| Web Intensive | Teal `#19778A` | Server / database / full-stack layers | “Dự án web chuyên sâu — nội dung đang cập nhật” |

Mỗi card phải có:

- Tên khóa, icon, mô tả, ba lesson preview hoặc thông báo “Nội dung đang chuẩn bị”.
- Progress `0/14 bài` lúc chưa có bài published.
- Thanh tiến độ có accessible label.
- Nút “Xem lộ trình” hoặc “Bắt đầu ngay”.
- Toàn bộ card không được là một `<div onclick>`; dùng link/button semantic.

### 5.4 Footer

- Logo/text thương hiệu, copyright, Tài liệu học tập, Cộng đồng, Hỗ trợ.
- Các link chưa có đích dùng trạng thái disabled/coming-soon; không dùng `href="#"` gây nhảy trang.

### 5.5 Responsive

| Viewport | Yêu cầu |
|---:|---|
| 375×812 | Menu mobile, hero crop đúng, card xếp một cột, không horizontal scroll |
| 768×1024 | Card có thể 1–2 cột, khoảng cách cân đối |
| 1280×900 | Ba card cùng hàng, nội dung không tràn |
| 1440×900 | Max-width hợp lý, không kéo card quá rộng |

## 6. Công nghệ đề xuất

| Thành phần | Công nghệ | Quy tắc |
|---|---|---|
| Dev/build | Vite + Vanilla JavaScript ES modules | Không cần framework UI trong V1 |
| HTML | Semantic HTML5 | Landmark, heading, form label đúng |
| CSS | CSS custom properties + component CSS | Mobile-first, design tokens, reduced motion |
| Router | Hash router | Dễ deploy static, route invalid an toàn |
| Data | JSON hoặc ES module thuần dữ liệu | Validate bằng script trước build |
| Editor tương lai | CodeMirror 6 | Lazy-load chỉ tại lesson có lab |
| Preview | `iframe srcdoc` sandbox | `sandbox="allow-scripts"`, không `allow-same-origin` |
| Progress | Versioned `localStorage` schema | Parse/validate/migrate, không tính draft |
| Tests | Node test + Playwright | Unit/data/E2E tách riêng |
| Deploy | Static HTTPS hosting | Chỉ sau human approval |

Tài liệu chính thức cần dùng khi triển khai: [Vite](https://vite.dev/guide/), [CodeMirror](https://codemirror.net/docs/), [MDN iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe), [Playwright](https://playwright.dev/docs/running-tests).

## 7. Cấu trúc tệp đề xuất

```text
web-learning/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── playwright.config.js
├── README.md
├── public/
│   └── assets/
│       ├── ai/
│       │   ├── hero-web-learning.webp
│       │   ├── icon-web-basic.webp
│       │   ├── icon-web-advance.webp
│       │   └── icon-web-intensive.webp
│       └── fallback/
├── src/
│   ├── main.js
│   ├── router.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   └── components.css
│   ├── components/
│   │   ├── header.js
│   │   ├── hero.js
│   │   ├── course-card.js
│   │   ├── lesson-card.js
│   │   ├── progress-bar.js
│   │   └── footer.js
│   ├── pages/
│   │   ├── home-page.js
│   │   ├── course-page.js
│   │   ├── lesson-page.js
│   │   ├── progress-page.js
│   │   └── not-found-page.js
│   ├── features/
│   │   ├── lab/
│   │   └── progress/
│   ├── lib/
│   │   ├── safe-dom.js
│   │   ├── storage.js
│   │   ├── schema.js
│   │   └── ids.js
│   └── data/
│       ├── courses.json
│       ├── asset-manifest.json
│       └── lessons/
│           ├── web-basic/
│           ├── web-advance/
│           └── web-intensive/
├── solutions/                 # không đưa vào public build
├── scripts/
│   ├── validate-course-data.mjs
│   └── validate-assets.mjs
├── tests/
│   ├── unit/
│   ├── e2e/
│   └── fixtures/
└── docs/
    ├── CONTENT_AUTHORING.md
    ├── AI_ASSET_PROMPTS.md
    ├── AI_ASSET_EVIDENCE.md
    ├── RELEASE_CHECKLIST.md
    └── evidence/
```

## 8. Course và lesson contract

### 8.1 Course manifest

```json
{
  "id": "web-basic",
  "title": "Web Basic",
  "status": "draft",
  "colorToken": "course-basic",
  "iconAssetId": "icon-web-basic",
  "lessonIds": [
    "web-basic-01",
    "web-basic-02",
    "web-basic-03",
    "web-basic-04",
    "web-basic-05",
    "web-basic-06",
    "web-basic-07",
    "web-basic-08",
    "web-basic-09",
    "web-basic-10",
    "web-basic-11",
    "web-basic-12",
    "web-basic-13",
    "web-basic-14"
  ],
  "contentVersion": 1
}
```

AI agent phải tạo tương tự cho `web-advance` và `web-intensive`, mỗi course đúng 14 ID liên tục từ `01` đến `14`.

### 8.2 Lesson placeholder

```json
{
  "id": "web-basic-01",
  "courseId": "web-basic",
  "order": 1,
  "status": "draft",
  "title": "Bài 01 — Sắp cập nhật",
  "summary": "Nội dung bài học sẽ được bổ sung sau.",
  "contentVersion": 1,
  "objectives": [],
  "blocks": [],
  "quiz": [],
  "practice": [],
  "assets": []
}
```

### 8.3 Lifecycle nội dung

| Status | Có trong danh sách | Mở lesson | Tính progress | Điều kiện |
|---|---|---|---|---|
| `draft` | Có badge “Sắp cập nhật” | Chỉ trang coming-soon | Không | Được phép placeholder |
| `published` | Có nút học | Có nội dung/quiz/lab | Có | Validator pass toàn bộ |
| `archived` | Ẩn với người mới | Read-only nếu có tiến độ cũ | Không tăng tổng | Có lý do archive |

Điều kiện chuyển `draft` sang `published`:

- Có title, summary, objectives và nội dung nguồn đã được người dùng cung cấp.
- Có ít nhất một hoạt động kiểm tra hoặc practice có tiêu chí chấm hợp lệ.
- Không có asset path hỏng hoặc placeholder text.
- Content review, accessibility review và data validator đều pass.

## 9. Kế hoạch tạo ảnh và icon bằng AI

### 9.1 Asset bắt buộc

| Asset ID | Mục đích | Kích thước nguồn | Output production |
|---|---|---:|---|
| `hero-web-learning` | Hero trang chủ | 1920×1080 hoặc lớn hơn | WebP/AVIF, responsive variants |
| `icon-web-basic` | Course Basic | 1024×1024, nền trong suốt | WebP/PNG 256×256 |
| `icon-web-advance` | Course Advance | 1024×1024, nền trong suốt | WebP/PNG 256×256 |
| `icon-web-intensive` | Course Intensive | 1024×1024, nền trong suốt | WebP/PNG 256×256 |
| `hero-fallback` | Fallback khi ảnh lỗi | CSS/SVG nội bộ | Nhẹ, không phụ thuộc mạng |

### 9.2 Art direction

- Phong cách hiện đại, thân thiện với học sinh, ánh sáng tự nhiên, xanh navy/blue làm nền.
- Hero có không gian trống bên trái để đặt text HTML.
- Icon cùng một bộ: hình khối đơn giản, đường nét và góc bo đồng nhất.
- Không có chữ, logo, watermark, khuôn mặt nhận diện được hoặc mã nguồn đọc được trong ảnh.
- Không sao chép icon/logo CodeWave từ ảnh tham chiếu; tạo nhận diện mới.

### 9.3 Prompt mẫu

```text
Hero: Modern web programming learning desk in a bright classroom, two monitors showing abstract code and web layout shapes, navy and blue color harmony, soft natural daylight, realistic but clean educational atmosphere, generous dark negative space on the left for HTML headline overlay, no text, no logos, no watermark, no recognizable people, 16:9.

Icon set: A cohesive set of three friendly educational technology icons for Web Basic, Web Advance, and Web Intensive; simple rounded geometry, consistent lighting and stroke weight, transparent background, green/blue/teal variants, no text, no logos, no watermark.
```

### 9.4 Asset evidence

Mỗi asset phải ghi trong `docs/AI_ASSET_EVIDENCE.md`:

- Tool/model tạo ảnh, ngày tạo, prompt cuối cùng và asset ID.
- File nguồn, file optimized, kích thước pixel, dung lượng và SHA-256.
- Alt text hoặc `alt=""` nếu chỉ trang trí.
- Kết quả kiểm tra watermark, chữ méo, logo lạ, crop mobile/desktop và contrast overlay.

## 10. Code Lab an toàn cho nội dung tương lai

Không cần bật Code Lab khi tất cả lesson còn `draft`, nhưng kiến trúc phải chừa module riêng.

- HTML/CSS/JS của học sinh chạy trong iframe `srcdoc` có `sandbox="allow-scripts"`.
- Không thêm `allow-same-origin`, `allow-top-navigation`, popup, download hoặc form permission trong V1.
- Không dùng `eval` hay `new Function` trong cửa sổ chính.
- Kết quả, lỗi và console output được render bằng `textContent`/DOM API an toàn.
- Parent chỉ nhận `postMessage` từ đúng `iframe.contentWindow`, đúng message type và đúng nonce phiên chạy.
- Nút Stop thay iframe hiện tại để dừng timer/listener cũ.
- Lời giải nằm ngoài public build.

## 11. Progress contract

```json
{
  "schemaVersion": 1,
  "updatedAt": "2026-08-01T00:00:00.000Z",
  "courses": {
    "web-basic": {
      "lessons": {}
    }
  }
}
```

- Tổng bài của course hiển thị `14`; tổng bài có thể học dùng số lesson `published`.
- Draft không được tăng completed hoặc phần trăm.
- Không coi sự tồn tại của key, score `0` hoặc object rỗng là hoàn thành.
- Một lesson chỉ hoàn thành theo contract do nội dung lesson xác định sau này.
- JSON lỗi phải fallback an toàn, không crash trang.

## 12. Implementation checklist

### Phase 0 — Preflight và bảo vệ dữ liệu

- [ ] Đọc toàn bộ tài liệu này.
- [ ] Chạy `git status --short --branch` và lưu baseline.
- [ ] Xác nhận target là `web-learning/`.
- [ ] Xác nhận không ghi đè PyLearn.
- [ ] Tạo backup trước khi sửa file có sẵn.
- [ ] Tính và ghi SHA-256 backup.
- [ ] Ghi Evidence Log Phase 0.

### Phase 1 — Scaffold và quality scripts

- [ ] Tạo Vite Vanilla JavaScript project trong `web-learning/`.
- [ ] Tạo `package-lock.json`.
- [ ] Thêm script `dev`, `build`, `preview`.
- [ ] Thêm `check:syntax`, `check:data`, `check:assets`.
- [ ] Thêm `test:unit`, `test:e2e`, `check`.
- [ ] Cấu hình Playwright test đúng thư mục thực tế.
- [ ] Thêm `.gitignore` cho reports/cache nhưng không ẩn evidence cần giữ.

### Phase 2 — Design system và layout shell

- [ ] Tạo color, spacing, radius, shadow và typography tokens.
- [ ] Tạo header desktop/mobile.
- [ ] Tạo hero có fallback và overlay contrast.
- [ ] Tạo course card, progress bar và footer.
- [ ] Tạo skip link, focus-visible và reduced-motion.
- [ ] Test 375/768/1280/1440 px.

### Phase 3 — Home page

- [ ] Render đúng ba course card.
- [ ] Mỗi course card hiển thị `0/14` khi chưa có bài hoàn thành.
- [ ] Card có màu và icon riêng nhưng vẫn đọc được khi mất màu.
- [ ] Navigation đến đúng ba course route.
- [ ] Hero text là HTML, không dính trong ảnh.
- [ ] Không có broken link hoặc placeholder URL giả.

### Phase 4 — Tạo 42 lesson shell

- [ ] Tạo course manifest Web Basic với 14 lesson ID.
- [ ] Tạo course manifest Web Advance với 14 lesson ID.
- [ ] Tạo course manifest Web Intensive với 14 lesson ID.
- [ ] Tạo đủ 42 lesson record trong manifest dữ liệu.
- [ ] Tất cả lesson ban đầu có `status: draft`.
- [ ] ID, courseId và order khớp file path.
- [ ] Không tự tạo nội dung chuyên môn.
- [ ] Validator xác nhận `COURSES=3`, `LESSONS=42`, `DRAFT=42`.

### Phase 5 — Course list và lesson route

- [ ] Mỗi course page hiển thị đúng 14 card.
- [ ] Draft card có badge “Sắp cập nhật”.
- [ ] Draft card không hiện điểm hoặc trạng thái hoàn thành.
- [ ] Direct route draft mở coming-soon an toàn.
- [ ] Draft không khởi tạo quiz, practice hoặc Code Lab.
- [ ] Route course/lesson sai mở 404, không phát sinh console error.

### Phase 6 — Data validator và content authoring

- [ ] Validator đọc manifest thay vì hard-code số file rời rạc.
- [ ] Validator kiểm tra ID, order, status, contentVersion và file path.
- [ ] Validator kiểm tra duplicate/missing/unknown course.
- [ ] Published lesson thiếu content/activity phải fail.
- [ ] Draft được phép có mảng nội dung rỗng.
- [ ] Viết negative fixtures và xác nhận exit code `1`.
- [ ] Viết `docs/CONTENT_AUTHORING.md` hướng dẫn upload nội dung sau này.

### Phase 7 — Local progress

- [ ] Tạo một progress store có schema version.
- [ ] Parse và validate dữ liệu khi đọc.
- [ ] Draft không ghi progress.
- [ ] Tính tổng theo lesson published.
- [ ] Có reset với confirm rõ ràng.
- [ ] Nếu thêm import/export: preview thay đổi trước khi ghi.
- [ ] Unit test score 0, empty object, corrupted JSON và draft.

### Phase 8 — AI images và icons

- [ ] Tạo `AI_ASSET_PROMPTS.md` trước khi generate.
- [ ] Tạo hero bằng AI đúng art direction.
- [ ] Tạo bộ ba icon cùng phong cách.
- [ ] Không có chữ/logo/watermark lạ.
- [ ] Optimize WebP/AVIF và tạo responsive sizes.
- [ ] Tạo fallback cho từng asset quan trọng.
- [ ] Cập nhật asset manifest, alt text, hash và Evidence Log.
- [ ] Kiểm tra crop hero ở mobile/desktop.

### Phase 9 — Code Lab shell

- [ ] Tạo module Lab độc lập, mặc định không mount cho draft.
- [ ] Cấu hình iframe sandbox `allow-scripts` only.
- [ ] Tạo message protocol có source/type/nonce validation.
- [ ] Không có `eval` hoặc `new Function`.
- [ ] Output/error không tạo HTML element.
- [ ] Viết test XSS, forged message, runtime error và Stop/recovery.
- [ ] Xác nhận solutions không nằm trong production bundle.

### Phase 10 — Accessibility và security review

- [ ] Heading hierarchy đúng.
- [ ] Header, main, nav, footer landmark đầy đủ.
- [ ] Tất cả thao tác dùng được bằng keyboard.
- [ ] Focus không bị mất khi mở/đóng menu mobile.
- [ ] Contrast text/controls đạt WCAG AA.
- [ ] Target tương tác tối thiểu gần 44×44 px.
- [ ] Dynamic status có live region khi cần.
- [ ] Không có unsafe `innerHTML` sink cho dữ liệu lesson/asset/user.
- [ ] Không gửi dữ liệu người học ra dịch vụ ngoài.

### Phase 11 — Automated QA

- [ ] `npm run check:syntax` pass.
- [ ] `npm run check:data` pass.
- [ ] `npm run check:assets` pass.
- [ ] `npm test` có số test lớn hơn 0 và pass.
- [ ] `npm run test:e2e` pass trên Chromium.
- [ ] E2E test home, ba course route, 42 draft route sample, 404 và progress reload.
- [ ] Negative fixtures thực sự bị validator từ chối.
- [ ] `npm run build` pass.
- [ ] `git diff --check` pass cho file thay đổi.

### Phase 12 — Manual QA và handoff

- [ ] Kiểm tra Chrome và Edge.
- [ ] Kiểm tra 375×812, 768×1024, 1280×900, 1440×900.
- [ ] Kiểm tra keyboard-only và screen-reader smoke.
- [ ] Kiểm tra khi ảnh AI lỗi tải.
- [ ] Kiểm tra reload/direct route.
- [ ] Ghi screenshot desktop/mobile vào `docs/evidence/`.
- [ ] Cập nhật README với lệnh chạy và giới hạn V1.
- [ ] Cập nhật toàn bộ Evidence Log.
- [ ] Không claim `RELEASED` nếu chưa deploy và read-back qua HTTPS.

## 13. Acceptance criteria

### Product

- [ ] Có đúng 3 khóa và 42 lesson shell.
- [ ] Trang chủ khớp cấu trúc tham chiếu: header, hero, ba card, footer.
- [ ] Ba course route và 42 lesson route không lỗi.
- [ ] Tất cả lesson chưa có nội dung vẫn là `draft`.
- [ ] Có quy trình rõ để đưa nội dung vào sau mà không sửa renderer.

### Visual assets

- [ ] Hero và ba icon được tạo bằng AI, không phải ảnh tham chiếu hoặc asset tải tùy ý.
- [ ] Không có watermark, logo lạ hoặc chữ sinh trong ảnh.
- [ ] Asset naming, manifest, alt text, prompts và hash đầy đủ.
- [ ] Fallback và responsive image hoạt động.

### Quality

- [ ] Data validator chứng minh `3 courses / 42 lessons / 42 draft` ở baseline.
- [ ] Unit test có test thật, không phải `0 tests`.
- [ ] Browser tests chạy đúng source root và đúng test directory.
- [ ] Không có console error trên critical routes.
- [ ] Accessibility và responsive checklist pass.

### Safety

- [ ] Không thay đổi luồng PyLearn ngoài một link tích hợp đã được duyệt.
- [ ] Không có backend/auth giả bằng localStorage.
- [ ] Code học sinh không chạy trong parent page.
- [ ] Không có unsafe rendering sink cho dữ liệu động.

## 14. Evidence Log

| Phase/Gate | Lệnh hoặc thao tác | Kết quả | Artifact/path | Trạng thái |
|---|---|---|---|---|
| Preflight | Git status + backup + SHA-256 | 76 entries; SHA-256 recorded | `.backups/web-learning-implementation-precreate-20260801-132542.zip` | `CHECKPOINTED` |
| Scaffold | install/build scripts | npm install + Vite build pass | `web-learning/package.json`, `web-learning/dist/` | `PASS` |
| Data | 3 courses / 42 lessons / status counts | `COURSES=3 LESSONS=42 DRAFT=42` | `web-learning/scripts/validate-course-data.mjs` | `PASS` |
| Unit | test count/pass/fail | 2 passed / 0 failed | `web-learning/tests/course-data.test.mjs` | `PASS` |
| Browser | Chromium flows | 7 passed / 0 failed | `web-learning/tests/e2e/home.spec.js` | `PASS` |
| Accessibility | keyboard/contrast/AX smoke | `TBD` | `TBD` | `PENDING` |
| AI assets | prompts/hash/manual review | 4 asset hashes + prompt log recorded | `web-learning/docs/AI_ASSET_EVIDENCE.md` | `PASS` |
| Build | production build + preview | Vite build pass; preview not deployed | `web-learning/dist/` | `PASS` |
| Release | HTTPS deploy/read-back | ngoài phạm vi tự động | `TBD` | `PENDING` |

Trạng thái được phép:

- `PLANNED`: chỉ có kế hoạch.
- `SOURCE READY`: source/data/unit/build gates có bằng chứng mới.
- `RUNTIME PASSED`: browser/manual critical flows đã chạy trên môi trường ghi rõ.
- `LIVE ACCEPTED`: chỉ sau deploy HTTPS và read-back.
- `RELEASED`: chỉ sau người có thẩm quyền phê duyệt.
- `BLOCKED`: ghi blocker cụ thể; không tự đánh dấu pass.

## 15. Stop và escalation rules

- Dừng nếu target không phải `web-learning/` hoặc việc triển khai sẽ ghi đè PyLearn.
- Dừng nếu yêu cầu số bài khác `14/14/14` mà chưa có xác nhận.
- Dừng nếu agent được yêu cầu tự bịa curriculum và publish khi chưa có nguồn nội dung.
- Dừng nếu cần backend, tài khoản, dữ liệu thật hoặc deploy production.
- Dừng phát hành khi AI asset có watermark/logo lạ, chữ méo hoặc chưa có evidence.
- Dừng Code Lab khi sandbox isolation chưa có test; không thay bằng `eval`.

## 16. Definition of Done

AI agent chỉ được báo hoàn thành khi:

- [ ] Phase 0–12 có checklist và evidence tương ứng.
- [ ] 3 course manifest và 42 lesson record pass validator.
- [ ] 42 lesson chưa có nội dung vẫn được giữ `draft`.
- [ ] Hero và bộ icon AI được kiểm tra, tối ưu và ghi evidence.
- [ ] Build, unit, data, asset và E2E gates pass.
- [ ] Responsive, keyboard và fallback asset được kiểm tra thực tế.
- [ ] Không còn P1/P2 mở trong phạm vi V1.
- [ ] README và Evidence Log phản ánh đúng trạng thái.

## 17. Prompt bàn giao ngắn cho AI agent

```text
Đọc toàn bộ CODEWAVE_WEB_IMPLEMENTATION_PLAN.md trước khi sửa. Xây dựng một ứng dụng độc lập trong web-learning/ cho môn Lập trình Web, gồm đúng 3 khóa Web Basic/Web Advance/Web Intensive và 14 lesson mỗi khóa.

Tất cả 42 lesson ban đầu phải là draft vì nội dung sẽ được cung cấp sau. Không tự bịa nội dung, không đánh dấu placeholder là published, không ghi đè PyLearn và không thêm backend/auth/deploy nếu chưa được duyệt.

Thực hiện lần lượt Phase 0–12. Trước sửa phải ghi Git baseline và tạo backup có SHA-256. Xuất file tree trước khi viết code. Dựng giao diện theo mô tả header + hero + ba course card + footer. Tạo hero và ba icon bằng AI theo art direction, lưu prompt/hash/alt text/evidence; ảnh không có chữ, logo hay watermark.

Nếu triển khai Code Lab, chỉ chạy mã học sinh trong iframe sandbox allow-scripts-only, không eval/new Function và không allow-same-origin. Sau mỗi phase cập nhật checklist bằng bằng chứng thật. Chỉ báo SOURCE READY/RUNTIME PASSED/LIVE ACCEPTED theo định nghĩa trong kế hoạch.
```

## 18. Planning backup

Backup nguồn trước khi tạo tài liệu này:

- File: `.backups/codewave-web-plan-source-precreate-20260801-131728.zip`
- Entries: `75`
- Bytes: `1,934,276`
- SHA-256: `068153A952EBB6C4BC36137B2C696B0404F7721788C5D7E5D97401DFEBCD900E`

## 19. Implementation checkpoint — 2026-08-01

Phần baseline đã triển khai trong `web-learning/`. PyLearn hiện hữu không bị sửa.

| Gate | Lệnh / bằng chứng | Kết quả | Trạng thái |
|---|---|---|---|
| Preflight | `.backups/web-learning-implementation-precreate-20260801-132542.zip` + SHA-256 | 76 entries; `B45C74BC44EF125681F67D8B72E04574B9B0758A04F111A7D43219CD7693F812` | `CHECKPOINTED` |
| Data | `npm run check:data` trong `web-learning/` | `COURSES=3 LESSONS=42 DRAFT=42`, JSI-13 cần xác nhận tiêu đề | `PASS` |
| Unit | `npm test` | 2 tests passed, 0 failed | `PASS` |
| Build | `npm run build` | Vite production build thành công | `PASS` |
| Browser | `npm run test:e2e` | 7 tests passed, 0 failed trên Chrome cài local | `PASS` |
| Assets | `docs/AI_ASSET_EVIDENCE.md` | hero + 3 icon AI, hash và prompt log đầy đủ | `PASS` |
| Content | `docs/CONTENT_AUTHORING.md` | 42 lesson title có sẵn; blocks/quiz/practice còn rỗng | `BLOCKED — chờ nội dung` |
| Release | HTTPS deploy/read-back | Chưa thực hiện theo phạm vi V1 | `OUT OF SCOPE` |

Các checkbox Phase 0–12 chỉ được đánh dấu khi bổ sung được artifact tương ứng; bảng này là bằng chứng thực thi mới nhất và không tự nhận `LIVE ACCEPTED` hay `RELEASED`.

## 20. Cross-app navigation checkpoint — 2026-08-01

| Nhóm mã | Đích điều hướng | Triển khai |
|---|---|---|
| PTB / PTA / PTI | PyLearn `#/basic`, `#/advance`, `#/intensive` | Course picker trong `js/dashboard.js` |
| JSB / JSA / JSI | CodeWave Web `#/web-basic`, `#/web-advance`, `#/web-intensive` | Course picker, link ở login PyLearn và `web-learning/dist/` |
| CodeWave Web → PyLearn | Quay về root PyLearn | Link `Học Python` trong header CodeWave Web |

- [x] CodeWave build dùng `base: './'`, nên bundle/asset có đường dẫn tương đối khi phục vụ dưới `web-learning/dist/`.
- [x] Có cấu hình URL tường minh cho trường hợp deploy hai domain: `window.LEARNING_APP_LINKS.webBaseUrl` và `window.CODEWAVE_PYTHON_URL`.
- [x] `node --check js/dashboard.js`, `node --check js/auth.js`, `npm run check` và `npm run test:e2e` (8 passed) đã pass.
- [ ] Kiểm tra chấp nhận thủ công sau khi deploy trên URL production vẫn chưa thực hiện.
