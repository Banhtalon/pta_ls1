# Auth routing Phase 0–1 baseline — 2026-08-01

Trạng thái: `PHASE 0 CHECKPOINTED / PHASE 1 SOURCE AUDIT COMPLETE / LIVE CLASS AUDIT BLOCKED`

## Phase 0 — Git and rollback baseline

| Hạng mục | Kết quả |
|---|---|
| Repository root | `F:\MINDX_project test\Dự án Mẫu\PTA\ls1` |
| Branch | `main` |
| HEAD trước phase | `b4c56971f0d16e2eb82e723706d90dccc31cd42f` |
| Worktree trước phase | Đã có thay đổi từ các lượt trước: `css/style.css`, `index.html`, `js/auth.js`, `js/dashboard.js`, cùng các file plan/web-learning chưa commit |
| Backup | `.backups/auth-routing-phase0-20260801-172954.zip` |
| Backup bytes | `24,317,331` |
| Backup SHA-256 | `8042D352D24D7B8BE361258B9B6B7953D20CABB8A3B99BDBBFEA12EEB5A3B46E` |
| Production write | Không thực hiện |
| Firestore write | Không thực hiện |

Backup bao gồm source PyLearn, `web-learning/`, `cs-learning/` placeholder, scripts, tests và các plan hiện có. `node_modules` có thể xuất hiện trong archive do backup được tạo trước khi tinh lọc artifact; không được dùng archive này làm package release.

## Phase 1 — Source/schema audit

Đã xác nhận từ source:

- `js/auth.js` tải `classes`, dùng `doc.id` làm giá trị chọn lớp và `data.name` làm nhãn hiển thị.
- `handleStudentLogin()` đang lấy `classId`, `studentId`, password; session cũ chỉ có `id`, `name`, `classId`, `isVerified`.
- `students.password` được đọc trực tiếp ở client, fallback `123456`; đây là Track A dev/internal và chưa đủ điều kiện production.
- Chưa có export/fixture Firestore của `classes`, `students`, `progress` trong workspace để đối soát mã lớp thật.
- Chưa có Firebase Rules hoặc emulator fixture trong target hiện tại để chứng minh portal authorization.
- Computer Science hiện chỉ có `cs-learning/README.md` placeholder; chưa có portal runtime.

## Audit tool được tạo

`scripts/audit-class-codes.mjs` nhận JSON export/fixture và kiểm tra:

- `code`/`classCode`, fallback `name` với warning.
- Chuẩn hóa trim + uppercase.
- Regex 9 prefix: PTB/PTA/PTI, JSB/JSA/JSI, CSB/CSA/CSI.
- Duplicate code, unknown code, active flag và mapping `program/portal/courseId`.

Chạy khi có fixture:

```powershell
npm.cmd run audit:classes -- --input .\path\to\classes-export.json
```

Khi chưa có input, tool phải trả `CLASS_AUDIT_BLOCKED` và exit code `2`; không được coi là audit pass.

## Kết luận và bước kế tiếp

- Phase 0 đã có rollback artifact và hash.
- Phase 1 đã hoàn tất source audit nhưng chưa thể kết luận dữ liệu lớp production vì chưa có export.
- Bước tiếp theo là cung cấp Firestore dev export/fixture hoặc cho phép tạo fixture nhân tạo; sau đó chạy audit và chuyển sang Phase 2 tạo shared classifier.
- Không sửa Firestore production, không tạo portal CS thật và không thay đổi login UI trong checkpoint này.

## Kết quả chạy audit

Fixture kiểm thử nhân tạo tại `tests/fixtures/classes-routing-sample.json` được dùng để kiểm tra công cụ, không đại diện cho dữ liệu production:

```text
node --check scripts/audit-class-codes.mjs  -> PASS
npm.cmd run audit:classes -- --input tests/fixtures/classes-routing-sample.json
  sourceRows=10
  validRows=10
  errorCount=0
  warningCount=1
  status=PASS
```

Kết quả mapping đã bao phủ đủ 9 prefix PTB/PTA/PTI, JSB/JSA/JSI và CSB/CSA/CSI. Một warning có chủ đích xác nhận fallback `name` khi fixture không có trường `code`/`classCode`; dữ liệu thật vẫn phải chốt nguồn mã lớp trước khi migrate.

Chạy `npm.cmd run audit:classes` không có input trả `CLASS_AUDIT_BLOCKED`; đây là trạng thái đúng vì workspace chưa có Firestore export/fixture dữ liệu thật. Không được coi lần chạy này là audit production pass.

## Bằng chứng Firestore do người dùng cung cấp

Ảnh chụp Firestore Console cho collection `classes` cho thấy tối thiểu hai document `JSB15` và `PTA12`. Document `PTA12` có trường `name: "PTA12"`; tên document và `name` đang trùng mã lớp. Mẫu đã được ghi lại (không có dữ liệu học sinh) tại `tests/fixtures/classes-user-screenshot-partial.json`.

```text
npm.cmd run audit:classes -- --input tests/fixtures/classes-user-screenshot-partial.json
  sourceRows=2
  validRows=2
  errorCount=0
  warningCount=2 (code/classCode không xuất hiện trong ảnh; dùng name fallback)
  status=PASS (partial sample only)
```

Đây chưa phải export đầy đủ: ảnh không chứng minh toàn bộ collection, trạng thái `active`, duplicate hoặc các lớp CS. Vì vậy live class audit vẫn `BLOCKED` và cần owner xác nhận `document ID/name` là nguồn mã lớp chuẩn.

## Regression gate của repository

- `npm.cmd run check:syntax`: `PASS`.
- `npm.cmd run check`: dừng ở `check:data` với 5 lỗi đã tồn tại trong `js/data/advance/lesson-4.js` (các practice published có 0 test case); `test:unit` chưa được gọi do chuỗi npm dừng tại data gate.
- `npm.cmd run test:unit`: exit `0` nhưng phát hiện `0` test/suite; đây không phải bằng chứng hành vi auth-routing.
- `js/data/advance/lesson-4.js` không nằm trong phần thay đổi Phase 0–1; lỗi này được ghi nhận là blocker baseline riêng, chưa tự ý sửa trong checkpoint auth-routing.

Tại thời điểm kết thúc checkpoint, worktree còn các path ngoài phạm vi auth-routing (`js/data/basic/lesson-13.js`, `parse.py`, `raw_quiz_13.txt`) cùng các thay đổi đã có từ trước. Phase 0–1 không chỉnh sửa hoặc xóa các path này; chúng phải được giữ nguyên khi agent tiếp theo tiếp tục.
