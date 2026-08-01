# Kế hoạch chuyển đổi đăng nhập và phân tuyến theo mã lớp

> Trạng thái: `PLAN READY / TRACK A SELECTED / CS PLACEHOLDER RESERVED`
>
> Mục tiêu: sau khi học sinh chọn lớp và đăng nhập, hệ thống tự đưa học sinh vào đúng portal theo tiền tố mã lớp; học sinh không có điều hướng qua portal khác. Mỗi portal hiển thị danh tính học sinh, đổi mật khẩu và đăng xuất giống PyLearn hiện tại.
>
> Quyết định ngày 2026-08-01: Computer Science dùng target placeholder `cs-learning/` đến khi có repository chính thức; auth chọn `Track A` — tạm tương thích Firestore hiện tại, chỉ dev/internal, không được claim production security.

## 1. Quyết định sản phẩm

### 1.1. Ma trận phân tuyến bắt buộc

| Tiền tố lớp | Ví dụ | Portal | Khóa mặc định | Quyền truy cập V1 |
|---|---|---|---|---|
| `PTB` | `PTB12` | Python | Python Basic | Chỉ Python Basic |
| `PTA` | `PTA12` | Python | Python Advance | Chỉ Python Advance |
| `PTI` | `PTI12` | Python | Python Intensive | Chỉ Python Intensive |
| `JSB` | `JSB15` | Web | Web Basic | Chỉ Web Basic |
| `JSA` | `JSA15` | Web | Web Advance | Chỉ Web Advance |
| `JSI` | `JSI15` | Web | Web Intensive | Chỉ Web Intensive |
| `CSB` | `CSB13` | Computer Science | CS Basic | Chỉ CS Basic |
| `CSA` | `CSA13` | Computer Science | CS Advance | Chỉ CS Advance |
| `CSI` | `CSI13` | Computer Science | CS Intensive | Chỉ CS Intensive |

Quy tắc chuẩn hóa mã lớp:

1. Trim khoảng trắng và chuyển sang chữ hoa.
2. Chấp nhận định dạng `^(PTB|PTA|PTI|JSB|JSA|JSI|CSB|CSA|CSI)[0-9]{1,3}$`.
3. Không suy luận portal từ `studentId`, tên học sinh hoặc ID document của Firestore.
4. Mã không hợp lệ, thiếu tiền tố hoặc có nhiều lớp mâu thuẫn phải bị từ chối với thông báo rõ ràng; tuyệt đối không mặc định sang Python.

### 1.2. Ý nghĩa “không thể qua lại các trang”

- Không hiển thị link, menu hoặc nút chuyển từ Python sang Web/CS, từ Web sang Python/CS, hoặc từ CS sang Python/Web.
- Truy cập URL trực tiếp của portal khác phải bị chặn bởi portal guard.
- Nếu phiên hợp lệ nhưng thuộc portal khác, hiển thị trang `Không có quyền truy cập` và đưa về đúng portal của học sinh; không xóa phiên hợp lệ.
- Nếu chưa có phiên, đưa về màn hình đăng nhập trung tâm với lý do `Bạn cần đăng nhập để vào portal này`.
- Quy tắc trên là kiểm soát luồng giao diện. Không được tuyên bố đây là cách ly bảo mật tuyệt đối nếu dữ liệu vẫn được đọc trực tiếp từ client; phần bảo mật thật nằm ở Firebase Rules/API.

## 2. Minh chứng source hiện tại và khoảng cách

### 2.1. PyLearn hiện tại

- Entry point: `index.html`.
- Đăng nhập và session: `js/auth.js`.
- Điều hướng/guard hiện tại: `js/router.js`.
- Dashboard: `js/dashboard.js`.
- Cấu trúc khóa Python: `js/data/course-structure.js`.
- Backend client: `js/firebase-config.js`, Firestore collections `classes`, `students`, `progress`.
- Session hiện tại `pylearn_student_session` gồm `id`, `name`, `classId`, `isVerified`; chưa có `classCode`, `program`, `portal` hay khóa được phép.
- Dropdown lớp dùng `doc.id` làm `option.value` và `data.name` làm text. `handleStudentLogin()` hiện kiểm tra `students.password` và sau đó luôn `navigateTo('#/')`.
- `showChangePasswordModal()`/`handleChangePassword()` đã có nhưng đang cập nhật trực tiếp trường mật khẩu trong Firestore.

### 2.2. CodeWave Web hiện tại

- Source: `web-learning/`, Vite + Vanilla JavaScript.
- Dữ liệu 3 khóa/42 lesson: `web-learning/src/data/courses.js`.
- Router hiện tại là hash route trong `web-learning/src/main.js`; chưa có auth bootstrap, session guard, học sinh identity hoặc đổi mật khẩu.
- Các link tích hợp Python đã được thêm ở `web-learning/src/main.js`, `index.html`, `js/dashboard.js`, `js/auth.js`. Theo yêu cầu mới, các link xuyên portal này phải được loại bỏ hoặc vô hiệu hóa trong phase migration.

### 2.3. Computer Science

- Chưa tìm thấy portal học Computer Science trong workspace hiện tại.
- `mindx-coffee-management-JSI` là project coffee management, không phải portal CS; không được tái sử dụng như trang học CS.
- Đã tạo placeholder `cs-learning/README.md`; placeholder không phải portal chạy được và không được đưa vào menu production.
- Khi có repository/URL chính thức, thay placeholder bằng target được owner xác nhận. Chưa được tự bịa curriculum CS.

## 3. Kiến trúc đích được đề xuất

### 3.1. Topology V1

Ưu tiên phục vụ cùng một origin để phiên đăng nhập có thể dùng chung:

```text
/                         entry/login gate (PyLearn hiện tại hoặc shell mới)
/python/                  PyLearn portal
/web/                     CodeWave Web portal
/cs/                      Computer Science portal mới
/shared/                  auth contract + portal policy + UI adapter
```

Nếu chưa thể đổi URL PyLearn hiện tại, dùng bảng cấu hình `PORTAL_URLS` và map tạm thời:

```js
{
  python: '/',
  web: '/web-learning/dist/',
  cs: '/cs-learning/dist/'
}
```

Không hard-code nhiều URL rải rác trong renderer. Mỗi môi trường chỉ thay một file cấu hình public, không đưa URL vào query string từ dữ liệu học sinh.

### 3.2. Shared auth contract

Tạo `shared/student-auth-contract.js` (hoặc package tương đương) với các API thuần và dễ test:

```js
normalizeClassCode(raw)
resolveClassProgram(classCode)
getExpectedCourse(classCode)
validateStudentSession(session, expectedPortal)
getPortalUrl(program)
```

Kết quả `resolveClassProgram()` phải có dạng:

```js
{
  classCode: 'PTA12',
  prefix: 'PTA',
  level: 'advance',
  program: 'python',
  portal: 'python',
  courseId: 'advance'
}
```

Không cho renderer tự phân tích prefix bằng nhiều regex khác nhau.

### 3.3. Session schema v2

Đổi sang một key dùng chung, ví dụ `learning_student_session_v2`:

```json
{
  "schemaVersion": 2,
  "id": "student-document-id",
  "name": "Tên học sinh",
  "classId": "firestore-class-document-id",
  "classCode": "PTA12",
  "prefix": "PTA",
  "program": "python",
  "portal": "python",
  "courseId": "advance",
  "isVerified": true,
  "issuedAt": "2026-08-01T00:00:00.000Z"
}
```

Không lưu `password`, mật khẩu cũ, mật khẩu mới hoặc token nhạy cảm trong `localStorage`. Session local chỉ là cache điều hướng; mỗi portal phải kiểm tra lại quyền ở backend/rules khi đọc dữ liệu.

### 3.4. Auth service và UI adapter

Tách phần gọi dữ liệu khỏi giao diện:

- `shared/student-auth-service.js`: load lớp, load học sinh, xác thực, khôi phục phiên, đổi mật khẩu, logout.
- `shared/student-identity.js`: render tên, mã lớp, portal/course; render nút đổi mật khẩu và đăng xuất.
- `shared/change-password.js`: modal dùng chung với validate, trạng thái loading, lỗi, thành công và đóng modal.
- PyLearn, Web và CS chỉ gọi adapter; không copy ba phiên bản logic đổi mật khẩu.

## 4. Hợp đồng dữ liệu cần chốt trước khi code

### 4.1. Collection `classes`

Khuyến nghị bổ sung trường chuẩn:

```json
{
  "name": "PTA12",
  "code": "PTA12",
  "program": "python",
  "level": "advance",
  "courseId": "advance",
  "active": true
}
```

`code` là nguồn chính. Trong giai đoạn tương thích, có thể fallback sang `name`, nhưng phải ghi cảnh báo và tạo báo cáo lớp thiếu `code`.

### 4.2. Collection `students`

- Giữ `classId` làm quan hệ chính.
- Khi đăng nhập, đọc class document để lấy `code/program/level`; không tin `program` gửi từ browser.
- Audit học sinh có `classId` trỏ tới lớp không tồn tại hoặc lớp inactive.
- Không cho một học sinh có nhiều class code mâu thuẫn trong cùng phiên.

### 4.3. Mật khẩu và bảo mật

Source hiện tại so sánh trường `students.password` trực tiếp từ client và có fallback `123456`. Đây là rủi ro P1: người dùng có thể quan sát dữ liệu client và local session không phải bằng chứng xác thực.

**Quyết định hiện tại: Track A — chỉ dev/internal.** Không mở rộng migration này thành Firebase Auth/backend. Mọi README, Evidence Log và handoff phải ghi rõ giới hạn; production release vẫn bị chặn cho đến khi hoàn tất Track B.

Track đã chọn phải được ghi rõ trong Evidence Log; lượt này thực hiện Track A, còn Track B chỉ là kế hoạch production sau này:

**Track A — tương thích ngắn hạn (đã chọn, chỉ dev/internal):**

- Bọc logic Firestore hiện tại trong auth service dùng chung.
- Không log mật khẩu, không lưu mật khẩu vào session, validate đầu vào và rate-limit ở lớp backend/rules nếu có.
- Gắn trạng thái `SECURITY DEBT`; không claim production security.

**Track B — để dành cho production sau này:**

- Chuyển xác thực sang Firebase Authentication hoặc backend có hash mật khẩu.
- Dùng migration/admin script có backup, mapping student → auth user và quy trình reset mật khẩu.
- Firestore Rules kiểm tra `request.auth` và class/program claim; client không tự quyết định quyền.
- Chỉ đánh dấu `LIVE ACCEPTED` sau test unauthenticated, wrong-portal, wrong-class và password-change thật trên môi trường staging.

Agent được phép thực hiện Track A trên fixture/dev Firebase sau khi tạo backup; vẫn phải dừng trước schema migration/import production. Track B chưa thuộc lượt này.

## 5. Luồng đăng nhập đích

```text
Mở entry/login
  → tải classes active
  → học sinh chọn lớp (PTA12 / JSB15 / CSB13)
  → chọn học sinh
  → nhập mật khẩu
  → đọc class code chuẩn từ Firestore
  → resolve program + portal + courseId
  → tạo session v2
  → redirect đúng portal/course
  → portal guard kiểm tra session + expected program/course
```

### 5.1. Nhánh thành công

- `PTA12` → `/python/#/advance` (hoặc URL Python được cấu hình).
- `JSB15` → `/web/#/web-basic`.
- `CSB13` → `/cs/#/cs-basic`.
- Giữ `classId` và `classCode` trong session để header và audit hiển thị nhất quán.

### 5.2. Nhánh lỗi bắt buộc

- Không chọn lớp/học sinh/mật khẩu → lỗi tại form, không tạo session.
- Class code không khớp regex → `Mã lớp chưa được cấu hình, hãy liên hệ giáo viên`.
- Prefix hợp lệ nhưng portal chưa triển khai (hiện là CS) → `Portal đang được chuẩn bị`, không rơi về Python/Web.
- Session hết schema/thiếu program → xóa session cũ, quay entry/login.
- Truy cập nhầm portal → trang 403 nội bộ, hiển thị portal đúng; không render danh sách bài của portal sai.
- Firestore/API lỗi → fail closed, không tự cho vào Python.

## 6. Thay đổi theo portal

### Phase P — PyLearn

- [ ] Tạo classifier dùng chung và test đủ 9 prefix, lowercase, khoảng trắng, số 1–3 chữ số, mã sai.
- [ ] Render option lớp với `data-class-code`, ưu tiên `classes.code`, fallback có cảnh báo từ `classes.name`.
- [ ] Sửa `handleStudentLogin()` để tạo session v2 và redirect theo `courseId`; bỏ redirect cố định `#/`.
- [ ] Thêm `requirePortal('python')` và `requireCourse(expectedCourseId)` vào router.
- [ ] Giữ tên học sinh, mã lớp, khóa hiện tại, đổi mật khẩu, đăng xuất trong header.
- [ ] Khi logout, xóa session v2 và toàn bộ cache tiến độ nhạy cảm theo chính sách đã duyệt.
- [ ] Giữ compatibility read-only cho session `pylearn_student_session` trong một phiên migration; không chấp nhận nó để mở portal khác.

### Phase W — CodeWave Web

- [ ] Thêm auth bootstrap trước `render()`; không render hero/course list trước khi guard pass.
- [ ] JSB/JSA/JSI chỉ vào course tương ứng trong session; route khác trả 403/redirect đúng course.
- [ ] Thêm identity header: tên, mã lớp, badge Web, Đổi mật khẩu, Đăng xuất.
- [ ] Dùng shared auth service/change-password adapter.
- [ ] Xóa `Học Python`, course picker 6 mã và mọi link sang portal khác; không còn cross-app navigation.
- [ ] Nếu truy cập `/web/` chưa đăng nhập, đưa về entry login; nếu là PTB/CSB, hiển thị wrong-portal.
- [ ] Không dùng `localStorage` như cơ chế cấp quyền; chỉ dùng session v2 để khôi phục UX sau khi auth service xác nhận.

### Phase C — Computer Science

- [x] Tạo placeholder `cs-learning/README.md`; không dùng `mindx-coffee-management-JSI`.
- [ ] Chốt target/repository chính thức khi người dùng cung cấp.
- [ ] Tạo `cs-learning/` với auth bootstrap, portal guard, identity header và change-password adapter.
- [ ] Tạo route/course manifest tối thiểu cho CSB/CSA/CSI nhưng để lesson content `draft` nếu chưa có Teaching Guide.
- [ ] CSB/CSA/CSI chỉ vào course tương ứng; không có link sang Python/Web.
- [ ] Bổ sung asset, curriculum và test sau khi người dùng cung cấp nội dung chính thức.

## 7. Giao diện identity dùng chung

Mỗi portal phải hiển thị cố định trong header hoặc account panel:

- Tên học sinh.
- Mã lớp chuẩn, ví dụ `PTA12`.
- Portal/khóa hiện tại, ví dụ `Python Advance`.
- Nút `Đổi mật khẩu`.
- Nút `Đăng xuất`.

Modal đổi mật khẩu phải có:

- [ ] Mật khẩu cũ, mật khẩu mới, xác nhận mật khẩu.
- [ ] Không hiển thị mật khẩu dạng text mặc định.
- [ ] Validate rỗng, độ dài tối thiểu theo policy, hai mật khẩu mới trùng nhau, mật khẩu mới khác mật khẩu cũ.
- [ ] Disable nút khi đang gửi; không gửi request kép.
- [ ] Lỗi không tiết lộ student tồn tại hay không.
- [ ] Thành công cập nhật backend, báo rõ và yêu cầu đăng nhập lại nếu auth provider cần.
- [ ] Escape/keyboard/focus trap/đóng bằng Escape.
- [ ] Không ghi mật khẩu vào console, analytics, URL hoặc session.

## 8. Các phase thực thi cho AI agent

### Phase 0 — Preflight và rollback

- [ ] Đọc file này và các plan liên quan: `PYLEARN_FIX_IMPLEMENTATION_PLAN.md`, `CODEWAVE_WEB_IMPLEMENTATION_PLAN.md`, `web-learning/docs/CONTENT_AUTHORING.md`.
- [ ] Ghi `git status`, branch, commit và file tree.
- [ ] Tạo backup source PyLearn + `web-learning/` + kế hoạch mới.
- [ ] Nếu có thao tác Firestore, export collections `classes`, `students`, `progress` và kiểm tra có thể đọc lại.
- [ ] Không sửa dữ liệu production trong phase này.

### Phase 1 — Audit dữ liệu lớp

- [ ] Xuất bảng `classId → code/name → resolved program/course`.
- [ ] Báo cáo unknown prefix, duplicate code, inactive class, missing class reference.
- [ ] Chốt `classes.code` hay `classes.name` là nguồn chuẩn bằng owner approval.
- [ ] Không tự sửa hàng loạt dữ liệu khi chưa có backup và xác nhận.

### Phase 2 — Contract và shared auth

- [ ] Tạo classifier thuần, không phụ thuộc DOM/Firebase.
- [ ] Tạo session schema v2 và migration policy.
- [ ] Tạo auth service adapter và password policy.
- [ ] Viết unit tests trước khi nối UI.

### Phase 3 — Entry login + Python route

- [ ] Đưa `classCode/program/courseId` vào flow login.
- [ ] Redirect 9 trường hợp hợp lệ tới đúng portal/course.
- [ ] Fail closed cho mã sai/portal chưa có.
- [ ] Guard direct URL, refresh, back/forward và session cũ.

### Phase 4 — Web/CS portal guards

- [ ] Web bootstrap guard và identity header.
- [ ] CS shell/guard sau khi target được chốt.
- [ ] Xóa toàn bộ cross-portal link và picker khỏi UI.
- [ ] Kiểm tra đúng course mapping theo prefix.

### Phase 5 — Password/account parity

- [ ] Dùng cùng modal/service trên cả ba portal.
- [ ] Kiểm tra đổi mật khẩu ở Python rồi đăng nhập Web/CS (nếu cùng identity provider).
- [ ] Kiểm tra logout/relogin trên từng portal.

### Phase 6 — Test và acceptance

- [ ] Unit matrix classifier.
- [ ] Integration test login với Firebase Emulator/staging fixture.
- [ ] E2E 9 lớp mẫu: chọn lớp → chọn học sinh → login → đúng URL.
- [ ] E2E wrong portal 9×8 hoặc ma trận rút gọn có lý do.
- [ ] E2E identity, change password, logout, refresh, direct URL.
- [ ] Accessibility keyboard/focus/labels và mobile.
- [ ] Console/network audit: không có password log, không có cross-portal data render.

### Phase 7 — Deploy có kiểm soát

- [ ] Build cả Python/Web/CS.
- [ ] Cấu hình `PORTAL_URLS` theo môi trường.
- [ ] Deploy staging trước; read-back từng portal.
- [ ] Chạy smoke test với fixture PTB/PTA/PTI/JSB/JSA/JSI/CSB/CSA/CSI.
- [ ] Chỉ production sau owner sign-off và giữ backup/rollback.

## 9. Ma trận kiểm thử tối thiểu

| Case | Input lớp | Kết quả mong đợi |
|---|---|---|
| 01 | `PTB12` | Python Basic |
| 02 | `PTA12` | Python Advance |
| 03 | `PTI12` | Python Intensive |
| 04 | `JSB15` | Web Basic |
| 05 | `JSA15` | Web Advance |
| 06 | `JSI15` | Web Intensive |
| 07 | `CSB13` | CS Basic |
| 08 | `CSA13` | CS Advance |
| 09 | `CSI13` | CS Intensive |
| 10 | `pta12`, ` PTA12 ` | Chuẩn hóa thành `PTA12`, vẫn vào Python Advance |
| 11 | `ABC12`, `PTX12`, rỗng | Từ chối, không tạo session |
| 12 | Session `program=web` mở Python | 403/redirect đúng Web, không render Python |
| 13 | Session thiếu `program`/schema cũ | Xóa/migrate theo policy, quay login |
| 14 | Đổi mật khẩu ở portal | Login lại bằng mật khẩu mới trên provider dùng chung |
| 15 | Logout rồi back browser | Không xem được nội dung protected |

## 10. Acceptance criteria

### Routing

- [ ] 9 prefix hợp lệ đi đúng 9 course đích.
- [ ] Không có fallback mặc định sang Python.
- [ ] Mã lớp sai hoặc portal chưa tồn tại bị chặn rõ ràng.
- [ ] Direct URL, refresh, back/forward không vượt portal guard.

### Isolation

- [ ] Không có anchor/menu/button xuyên portal trong ba portal.
- [ ] Wrong-portal không render course list/lesson của portal bị cấm.
- [ ] Firestore Rules/API kiểm tra quyền độc lập với localStorage.

### Identity/password

- [ ] Tên + mã lớp + portal hiển thị trên mỗi portal sau login.
- [ ] Đổi mật khẩu dùng cùng policy/service và có kiểm thử persistence.
- [ ] Logout xóa session và protected route không còn truy cập.
- [ ] Không lưu/log password.

### Computer Science

- [ ] Có repository/target CS được owner xác nhận.
- [ ] CS shell chạy được với auth guard trước khi nạp nội dung.
- [ ] Không tự bịa curriculum khi chưa có nguồn.

### Release status

- `PLANNED`: chỉ có kế hoạch.
- `SOURCE READY`: code, tests và data fixture pass.
- `RUNTIME PASSED`: browser/staging flows pass.
- `LIVE ACCEPTED`: production HTTPS + read-back + owner sign-off.
- Không được báo `RELEASED` khi Track B auth hoặc CS target còn chưa chốt.

## 11. Evidence Log (điền khi thực thi)

| Gate | Lệnh/artifact | Kết quả | Trạng thái |
|---|---|---|---|
| Backup | `.backups/auth-routing-phase0-20260801-172954.zip` + SHA-256 | `24,317,331 bytes; 8042D352D24D7B8BE361258B9B6B7953D20CABB8A3B99BDBBFEA12EEB5A3B46E` | `CHECKPOINTED` |
| Class audit | `scripts/audit-class-codes.mjs` + synthetic fixture + user screenshot partial fixture | `Synthetic: 10 rows/9 mappings/0 errors; screenshot: 2 rows/0 errors; both use name fallback` | `PARTIAL SOURCE CONFIRMED / LIVE BLOCKED` |
| Contract unit | 9 prefix + invalid matrix | `TBD` | `PENDING` |
| Auth integration | emulator/staging login | `TBD` | `PENDING` |
| Python guard | direct URL + wrong portal | `TBD` | `PENDING` |
| Web guard | direct URL + wrong portal | `TBD` | `PENDING` |
| CS guard | placeholder only; direct URL guard chưa triển khai | `cs-learning/README.md` | `BLOCKED — chờ target chính thức` |
| Identity | screenshot/AX + name/class/course | `TBD` | `PENDING` |
| Password | change/relogin evidence | `TBD` | `PENDING` |
| Security | Rules/API unauthenticated matrix | `TBD` | `PENDING` |
| Build/E2E | commands + reports | `TBD` | `PENDING` |
| Release | HTTPS read-back + owner sign-off | ngoài phạm vi plan-only | `PENDING` |

## 12. Stop và escalation rules

- Dừng triển khai nội dung/portal CS thật nếu chưa chốt URL/repository chính thức; chỉ được giữ placeholder.
- Dừng nếu không xác định được `classes.code`/`classes.name` là nguồn mã lớp chuẩn.
- Dừng nếu một học sinh có nhiều class code hoặc prefix không xác định.
- Dừng nếu agent định fallback lớp lỗi sang Python.
- Dừng nếu cần import/sửa Firestore production mà chưa có export + rollback.
- Dừng release nếu vẫn dùng plaintext client-side password; Track A đã được chấp thuận riêng cho dev/internal nhưng không được gọi là secure production.
- Dừng nếu route guard chỉ dựa vào localStorage mà không có backend/rules enforcement.
- Dừng nếu phải dùng project coffee làm CS portal hoặc tự bịa curriculum CS.
- Dừng nếu thay đổi làm mất session/tiến độ hiện tại mà chưa có migration test.

## 13. Prompt bàn giao cho AI agent

```text
Đọc toàn bộ AUTH_PROGRAM_ROUTING_MIGRATION_PLAN.md trước khi sửa. Đọc thêm PYLEARN_FIX_IMPLEMENTATION_PLAN.md và CODEWAVE_WEB_IMPLEMENTATION_PLAN.md.

Mục tiêu: phân tuyến học sinh theo tiền tố mã lớp:
PTB/PTA/PTI → Python Basic/Advance/Intensive;
JSB/JSA/JSI → Web Basic/Advance/Intensive;
CSB/CSA/CSI → Computer Science Basic/Advance/Intensive.

Không fallback mã lỗi sang Python. Không cho portal này render hoặc link sang portal khác. Mỗi portal phải kiểm tra session + expected portal/course, hiển thị tên học sinh + mã lớp, đổi mật khẩu và đăng xuất qua shared auth service.

Trước khi sửa: ghi git baseline, tạo backup source và export dữ liệu nếu đụng Firestore. Bắt đầu bằng class audit và unit test classifier. Không tự bịa Computer Science portal/curriculum; dừng và báo blocker nếu chưa có target được owner xác nhận. Không claim production security khi còn plaintext client-side password; ghi rõ Track A/Track B và bằng chứng.

Sau mỗi phase cập nhật checklist và Evidence Log. Chỉ báo SOURCE READY/RUNTIME PASSED/LIVE ACCEPTED theo định nghĩa trong kế hoạch.
```

## 14. Files dự kiến thay đổi

| Nhóm | File/thư mục |
|---|---|
| Contract | `shared/student-auth-contract.js`, `shared/portal-config.js` |
| Auth | `shared/student-auth-service.js`, `shared/change-password.js`, `js/auth.js` |
| Python | `js/router.js`, `js/dashboard.js`, `index.html` |
| Web | `web-learning/src/main.js`, `web-learning/src/styles.css`, `web-learning/index.html` |
| CS | `cs-learning/` (chỉ sau khi target được chốt) |
| Tests | `tests/unit/auth-routing*`, `tests/e2e/auth-routing*`, `web-learning/tests/e2e/*` |
| Docs | plan này + data audit + migration runbook + evidence |

## 15. Phase 0–1 checkpoint — 2026-08-01

- [x] Ghi nhận repository root, branch `main`, HEAD trước phase và trạng thái worktree.
- [x] Tạo rollback backup và lưu SHA-256 trong evidence log.
- [x] Đọc source auth/router/dashboard hiện tại; xác nhận session cũ, nguồn `classes`, plaintext password fallback và thiếu CS runtime.
- [x] Tạo công cụ audit mã lớp không phụ thuộc package ngoài.
- [x] Chạy syntax check và fixture audit: 10/10 dòng hợp lệ, đủ 9 mapping, 0 lỗi.
- [x] Tạo `cs-learning/README.md` làm placeholder, không tự tạo curriculum hoặc portal thật.
- [x] Ghi nhận ảnh Firestore Console: `classes/JSB15` và `classes/PTA12`; `PTA12.name` trùng mã lớp.
- [x] Chạy regression syntax; toàn bộ JavaScript hiện tại qua syntax check.
- [x] Ghi nhận data gate baseline đang fail tại `js/data/advance/lesson-4.js` (5 practice published không có test case), ngoài phạm vi auth-routing.
- [x] Kiểm tra test runner hiện tại: exit `0` nhưng có `0` test/suite; chưa có test evidence cho auth-routing.
- [ ] Nhận Firestore dev export/fixture đầy đủ được owner xác nhận và chạy live class audit.
- [ ] Chốt shared auth contract/classifier rồi mới bắt đầu Phase 2.

Checkpoint này chỉ đạt `PHASE 0 CHECKPOINTED / PHASE 1 SOURCE AUDIT COMPLETE / LIVE CLASS AUDIT BLOCKED`; repository còn data baseline blocker nêu trên, và chưa có thay đổi login, session, Firebase Rules hoặc dữ liệu Firestore.
