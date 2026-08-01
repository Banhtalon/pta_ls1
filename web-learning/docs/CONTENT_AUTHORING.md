# Hướng dẫn bổ sung nội dung bài học

Tất cả 42 lesson title đã có trong `src/data/courses.js`, nhưng nội dung hiện là placeholder có chủ ý. Agent bổ sung nội dung phải giữ nguyên ID, thứ tự và course sở hữu.

## Checklist cho từng lesson

- [ ] Có nguồn nội dung được duyệt (Teaching Guide, tài liệu giáo viên hoặc nội dung do chủ dự án cung cấp).
- [ ] Viết `summary`, mục tiêu và các block bài học dựa đúng nguồn; không suy đoán phần còn thiếu.
- [ ] Thêm quiz/practice nếu nguồn có; ghi rõ đáp án và tiêu chí chấm.
- [ ] Nếu có HTML/CSS/JS preview, dùng Code Lab với iframe `sandbox="allow-scripts"`; không dùng `eval`, `new Function`, `allow-same-origin` hoặc truy cập DOM cha.
- [ ] Cập nhật trạng thái `published` chỉ khi content validator và kiểm tra hiển thị pass.
- [ ] Chạy `npm run check:data`, `npm test`, `npm run build` và E2E route của lesson.
- [ ] Ghi artifact/hash vào Evidence Log trước khi bàn giao.

## Riêng JSI lesson 13

Không tự đặt tên thay thế. Chỉ bỏ cờ `titleNeedsConfirmation` sau khi người dùng xác nhận tiêu đề độc lập trong Teaching Guide.
