# Liên kết PyLearn và CodeWave Web — tài liệu cũ

> `SUPERSEDED`: tài liệu này mô tả link xuyên portal của baseline trước. Theo yêu cầu auth routing mới, học sinh không được chuyển qua lại giữa Python, Web và Computer Science. Dùng [AUTH_PROGRAM_ROUTING_MIGRATION_PLAN.md](../../AUTH_PROGRAM_ROUTING_MIGRATION_PLAN.md) làm contract chính thức.

## Luồng chọn khóa

| Mã khóa | Nền tảng đích | Route |
|---|---|---|
| PTB | PyLearn | `#/basic` |
| PTA | PyLearn | `#/advance` |
| PTI | PyLearn | `#/intensive` |
| JSB | CodeWave Web | `#/web-basic` |
| JSA | CodeWave Web | `#/web-advance` |
| JSI | CodeWave Web | `#/web-intensive` |

Các link xuyên portal trong baseline phải được gỡ trong migration. Việc phân tuyến mới xảy ra sau khi login bằng `classCode`; không dùng menu chuyển portal.

## Ghi chú baseline cũ

1. Build CodeWave Web: `cd web-learning; npm run build`.
2. Ở thư mục gốc `ls1`, chạy một HTTP server, ví dụ `python -m http.server 8080`.
3. Mở `http://127.0.0.1:8080/`.

Phần chạy chung dưới đây chỉ giữ để rollback/đối chiếu baseline, không phải acceptance của auth routing mới.

## Deploy tách domain

Trước khi tải PyLearn, đặt `window.LEARNING_APP_LINKS.webBaseUrl` bằng URL gốc của CodeWave Web. Trước khi tải CodeWave Web, đặt `window.CODEWAVE_PYTHON_URL` bằng URL gốc PyLearn. Không đặt các URL này từ dữ liệu học sinh hoặc query string.
