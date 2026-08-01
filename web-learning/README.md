# CodeWave Web Learning

Website học Lập trình Web độc lập với PyLearn, dựng theo hướng static-first bằng Vite và Vanilla JavaScript.

## Phạm vi hiện tại

- 3 khóa: JSB Web Developer Basic, JSA Web Developer Advanced, JSI Web Developer Intensive.
- Mỗi khóa có đúng 14 lesson title, tổng 42 lesson.
- Toàn bộ lesson đang ở `draft` vì nội dung chi tiết sẽ được cung cấp sau.
- JSI lesson 13 giữ nguyên trạng thái cần xác nhận tiêu đề theo Teaching Guide.
- Hero và ba icon course là tài sản AI đã được copy vào `public/assets/ai/`.

## Chạy và kiểm tra

```powershell
npm install
npm run dev
```

Các cổng kiểm tra không cần backend:

```powershell
npm run check:data
npm test
npm run build
npm run test:e2e
```

Mở site qua HTTP (`npm run dev`), không mở trực tiếp bằng `file://`. Chi tiết lifecycle để đưa nội dung từ `draft` sang `published` nằm trong `docs/CONTENT_AUTHORING.md`.

## Auth routing

Baseline trước có link qua lại với PyLearn. Theo kế hoạch mới, link xuyên portal sẽ được gỡ; học sinh được phân tuyến sau khi đăng nhập dựa trên `classCode` (`JSB/JSA/JSI`). Xem contract tại `../AUTH_PROGRAM_ROUTING_MIGRATION_PLAN.md` và quyết định Track A dev/internal.

## Nguyên tắc nội dung

Không tự bịa mục tiêu, lý thuyết, quiz, đáp án, bài thực hành hay Code Lab. Khi có tài liệu chính thức, cập nhật data theo contract, chạy validator và bổ sung bằng chứng trước khi chuyển trạng thái.
