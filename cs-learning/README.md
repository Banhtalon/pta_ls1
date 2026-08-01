# Computer Science Portal — Placeholder

Trạng thái: `PLACEHOLDER / NOT IMPLEMENTED`

Thư mục này được giữ chỗ theo quyết định ngày 2026-08-01. Chưa có repository, URL hoặc Teaching Guide chính thức cho portal Computer Science.

## Không được làm trong placeholder

- Không dùng project `mindx-coffee-management-JSI` làm portal học CS.
- Không tự bịa tên khóa, lesson, quiz, đáp án hoặc Code Lab.
- Không thêm thư mục này vào menu production hoặc route phân phối học sinh.
- Không đánh dấu CSB/CSA/CSI là `published` hay `RUNTIME PASSED`.

## Khi có target chính thức

1. Ghi repository/URL, owner và commit/tag baseline vào kế hoạch auth routing.
2. Tạo portal shell với shared auth contract, Track A auth adapter và portal guard.
3. Map `CSB → cs-basic`, `CSA → cs-advance`, `CSI → cs-intensive`.
4. Nhập curriculum từ Teaching Guide; giữ lesson chưa có nguồn ở `draft`.
5. Chạy unit, integration, E2E wrong-portal và identity/password checks trước khi mở route.

Placeholder này không phải ứng dụng chạy được và không chứa credentials, Firebase config hay dữ liệu học sinh.
