# PyLearn Fix Implementation Plan

> Execution contract cho AI triển khai sửa lỗi, kiểm thử và bàn giao dự án PyLearn.

## 0. Trạng thái tài liệu

| Trường | Giá trị |
|---|---|
| Ngày lập | 2026-07-31 |
| Workspace | `F:\MINDX_project test\Dự án Mẫu\PTA\ls1` |
| Nhánh tại thời điểm lập | `main` |
| Commit nền | `00de1c9` |
| Trạng thái | `PLAN READY / IMPLEMENTATION NOT STARTED` |
| Phạm vi | Source, dữ liệu khóa học, Firebase/Auth, progress, Python runner, QA |
| Ngoài phạm vi tự động | Deploy production, sửa/xóa dữ liệu thật, tạo tài khoản thật |

### Quy tắc cập nhật checklist

- Chỉ đổi `[ ]` thành `[x]` khi đã có bằng chứng mới trong **Evidence Log**.
- Không dùng “đã sửa” thay cho kết quả test.
- Không đánh dấu `LIVE ACCEPTED` từ kiểm tra source hoặc emulator.
- Không xóa hoặc thay nội dung placeholder chỉ vì nội dung đó chưa hoàn thiện.

## 1. Mục tiêu

Sửa các lỗi khiến dự án chưa an toàn hoặc chưa đáng tin cậy khi dùng với học sinh:

1. Bảo vệ dashboard và dữ liệu giáo viên bằng Firebase Authentication và Firestore Rules.
2. Không dùng `localStorage` như bằng chứng xác thực danh tính.
3. Ngăn XSS từ tên học sinh, dữ liệu Firestore và output Python.
4. Cách ly Python runner, có timeout và khả năng phục hồi sau vòng lặp vô hạn.
5. Chuẩn hóa progress giữa localStorage và Firestore, không mất chi tiết khi đổi máy.
6. Mô hình hóa placeholder/draft như trạng thái hợp lệ, không chấm hoặc đồng bộ như bài thật.
7. Ngăn route lỗi do bài học thiếu file.
8. Chuẩn hóa timestamp, completion rule và dữ liệu dashboard.
9. Tạo validator/test tự động để lỗi hợp đồng dữ liệu không quay lại.

## 2. Giả định bắt buộc

PLACEHOLDER:

- `allowed: true`
- File placeholder được giữ để cập nhật nội dung học sau.
- Placeholder không được coi là lỗi chỉ vì nội dung còn mẫu.
- Placeholder phải có trạng thái runtime rõ ràng.
- Placeholder không được sinh điểm, completion hoặc bản ghi progress chính thức.

ASSESSMENT:

- Quiz/test case nằm trên client nên học sinh có thể xem đáp án bằng DevTools.
- Nếu chỉ dùng để luyện tập/theo dõi tương đối: client-side grading được phép.
- Nếu dùng làm điểm chính thức: phải có backend chấm điểm; không được tuyên bố điểm client là chống gian lận.

WORKTREE:

- Workspace hiện có thay đổi tracked và nhiều file untracked.
- Không reset, checkout hoặc ghi đè thay đổi sẵn có.
- Chỉ sửa file thuộc phạm vi kế hoạch.

PRODUCTION:

- Không deploy Firebase Rules.
- Không ghi, sửa, xóa dữ liệu Firestore production.
- Không chạy migration production.
- Chỉ thực hiện các thao tác trên khi người dùng xác nhận chính xác thao tác đó.

## 3. Baseline đã quan sát

| Kiểm tra | Kết quả tại 2026-07-31 |
|---|---|
| JavaScript syntax | 0 lỗi |
| Bài khai báo trong `COURSE_STRUCTURE` | 39 |
| File lesson hiện có | 29 |
| File lesson thiếu | 10 |
| File có placeholder | 26, được phép |
| Lesson có practice `testCases: []` | `basic_1`, `advance_4` |
| Chrome mở teacher dashboard không session | Có |
| Firebase Authentication SDK | Không có |
| Firestore đọc ẩn danh | Thành công trong Chrome |
| Session-name XSS | Tái hiện được |
| `git diff --check` | 91 trailing-whitespace findings |

File lesson thiếu:

- `js/data/advance/lesson-9.js` đến `lesson-13.js`
- `js/data/intensive/lesson-9.js` đến `lesson-13.js`

## 4. Trạng thái nghiệm thu

| Trạng thái | Điều kiện |
|---|---|
| `PLAN READY` | Có execution plan và checklist |
| `SOURCE READY` | Static tests, unit tests, data validator và build/check đều đạt |
| `EMULATOR ACCEPTED` | Firestore Rules và migration đạt trên emulator |
| `RUNTIME ACCEPTED` | Luồng học sinh/giáo viên và runner đạt trên browser |
| `LIVE ACCEPTED` | Deploy production được xác nhận, readback và smoke test đạt |
| `RELEASED` | `LIVE ACCEPTED` và được người có thẩm quyền duyệt |

Trạng thái hiện tại:

- `PLAN READY`
- `SOURCE READY: PENDING`
- `EMULATOR ACCEPTED: PENDING`
- `RUNTIME ACCEPTED: PENDING`
- `LIVE ACCEPTED: BLOCKED — chưa có quyền deploy`
- `PEER-PASSED: PENDING`
- `RELEASED: PENDING`

## 5. Hard gates

### GATE-00 — Backup trước khi sửa

trigger: trước thay đổi source đầu tiên

action:

- Tạo backup mới của workspace, loại trừ `.git`, `.backups`, cache và server tạm.
- Ghi đường dẫn, số entry, kích thước và SHA-256 vào Evidence Log.
- Mở archive và xác nhận đọc được entry.

stop:

- Backup lỗi.
- Hash không đọc được.
- Archive trống hoặc thiếu `index.html`, `js/`, `css/`.

### GATE-01 — Chốt mô hình danh tính

trigger: trước Phase 6

decision-required:

- `TRACK-A — Recommended`: Firebase Auth cho giáo viên và học sinh.
- `TRACK-B — Informal`: giáo viên có Auth; học sinh chọn tên nhưng progress phải gắn nhãn `unverified`.
- `TRACK-C — Authoritative with PIN/custom token`: cần backend/Cloud Function; phải xin phép mở rộng kiến trúc.

default:

- Nếu chưa có quyết định, triển khai các Phase 0–5.
- Dừng trước thay đổi auth/rules production.

### GATE-02 — Dữ liệu production

trigger:

- Deploy Rules.
- Migration Firestore.
- Tạo/xóa lớp hoặc học sinh thật.
- Thử nút delete trên dashboard thật.

action:

- Dừng.
- Nêu chính xác project, collection, số bản ghi và thao tác.
- Chờ xác nhận cụ thể.

### GATE-03 — Placeholder

policy:

- Không xóa placeholder.
- Không biến placeholder thành bài published bằng cách đoán nội dung.
- Không sửa nội dung giáo trình ngoài lỗi schema hoặc lỗi hiển thị rõ ràng.
- Bài `draft` có thể có file dữ liệu đầy đủ, một phần hoặc mẫu.

### GATE-04 — Evidence

require:

- Mỗi phase có command, expected result, actual result và artifact.
- Claim browser phải kèm route, browser và kết quả.
- Claim Rules phải kèm emulator test.
- Claim migration phải kèm count trước/sau và rollback artifact.

## 6. Kiến trúc đích

### 6.1 Lesson lifecycle

Nguồn sự thật: `js/data/course-structure.js`.

Mỗi lesson phải có:

```js
{
  id: 1,
  title: "...",
  description: "...",
  status: "published", // published | draft | archived
  contentVersion: 1
}
```

Quy tắc:

- `published`: file tồn tại, schema hợp lệ, quiz/practice đáp ứng acceptance.
- `draft`: file placeholder được phép; UI hiện “Sắp cập nhật”; không chấm/đồng bộ.
- `archived`: không hiện cho học sinh mới; dữ liệu progress cũ vẫn đọc được.
- Direct route đến `draft`: hiện trang trạng thái có breadcrumb và nút quay lại.
- Direct route đến file thiếu: hiện lỗi dữ liệu có mã, không hiện generic “Oops”.

### 6.2 Progress schema v2

Một lesson dùng một document progress xác định:

```js
{
  schemaVersion: 2,
  studentUid: "...",
  studentId: "...",
  classId: "...",
  lessonKey: "advance_2",
  contentVersion: 1,
  verificationStatus: "verified", // verified | unverified
  quiz: {
    correct: 0,
    wrong: 0,
    skipped: 0,
    total: 0,
    percent: 0,
    passed: false,
    submittedAt: null
  },
  practice: {
    completedExerciseIds: [],
    requiredExerciseIds: [],
    passed: false,
    submittedAt: null
  },
  completed: false,
  updatedAt: null
}
```

Document ID đề xuất:

```text
progress/{studentUid}_{lessonKey}
```

Completion rule đề xuất:

```text
published
AND quiz.passed
AND practice.passed
```

Quiz pass threshold:

- Dùng một constant duy nhất.
- Giá trị mặc định đề xuất: `70`.
- Nếu business rule khác, ghi quyết định vào Evidence Log.

### 6.3 Authentication and authorization

Teacher:

- Firebase Auth bắt buộc.
- Teacher được cấp quyền qua custom claim hoặc `teachers/{uid}`.
- Router chỉ render dashboard sau khi auth state và role đã xác nhận.
- Firestore Rules là lớp bảo vệ chính; client route guard chỉ là UX.

Student:

- Không dùng object tự tạo trong `localStorage` làm danh tính đáng tin cậy.
- Progress phải gắn với `request.auth.uid`.
- Nếu giữ selector không credential, mọi kết quả phải là `unverified`.

### 6.4 Safe rendering

- Dữ liệu động ưu tiên DOM API và `textContent`.
- Không ghép tên, lỗi, input, output hoặc Firestore data vào `innerHTML`.
- Không dùng inline `onclick` với dữ liệu động.
- Nếu buộc phải dùng template HTML, escape text và attribute bằng helper đã test.

### 6.5 Python runner

- Pyodide chạy trong Web Worker.
- Main thread gửi `userCode`, test case và timeout.
- Worker trả JSON thuần, không trả HTML.
- Quá timeout: terminate worker, hiện `TIME_LIMIT_EXCEEDED`, tạo worker mới.
- Lỗi một test không làm hỏng test sau.

## 7. File targets dự kiến

Modify:

- `index.html`
- `js/firebase-config.js`
- `js/auth.js`
- `js/router.js`
- `js/dashboard.js`
- `js/lesson-list.js`
- `js/lesson-detail.js`
- `js/quiz.js`
- `js/practice.js`
- `js/teacher-dashboard.js`
- `js/data/course-structure.js`
- Các file lesson cần gắn metadata hoặc sửa schema

Add:

- `js/safe-dom.js`
- `js/progress-store.js`
- `js/python-runner.js`
- `js/python-worker.js`
- `scripts/check-syntax.cjs`
- `scripts/validate-course-data.cjs`
- `tests/course-data.test.cjs`
- `tests/progress-store.test.cjs`
- `tests/security-rendering.test.cjs`
- `tests/firestore.rules.test.cjs`
- `tests/browser/critical-flows.spec.cjs`
- `firestore.rules`
- `firebase.json`
- `package.json`
- `package-lock.json`
- 10 file placeholder còn thiếu

Remove only after proof:

- Dead Google Apps Script report code trong `js/app.js`
- Stale `js/quiz-data.js` hoặc `js/practice-data.js` nếu xác nhận không còn consumer

## 8. Implementation checklist

### Phase 0 — Preflight và bảo vệ worktree

- [ ] Chạy `git status --short --branch`.
- [ ] Lưu `git diff --stat`.
- [ ] Lưu danh sách untracked hiện có.
- [ ] Xác nhận không có AI khác đang sửa cùng file.
- [ ] Tạo backup theo GATE-00.
- [ ] Kiểm tra SHA-256 backup.
- [ ] Ghi baseline vào Evidence Log.
- [ ] Không stage hoặc commit file ngoài phạm vi.

Acceptance:

- Backup hợp lệ.
- Không có file người dùng bị ghi đè.
- Danh sách target đã chốt.

### Phase 1 — Test harness và data validator

#### 1.1 Package scripts

- [ ] Tạo `package.json` tối thiểu.
- [ ] Thêm `check:syntax`.
- [ ] Thêm `check:data`.
- [ ] Thêm `test:unit`.
- [ ] Thêm `test:rules`.
- [ ] Thêm `test:browser`.
- [ ] Thêm `check` chạy toàn bộ gate không-production.
- [ ] Khóa dependency bằng `package-lock.json`.
- [ ] Dùng phiên bản cố định cho `@playwright/test`.
- [ ] Dùng phiên bản cố định cho `@firebase/rules-unit-testing`.
- [ ] Dùng phiên bản cố định cho `firebase-tools`.
- [ ] Dùng phiên bản cố định cho DOM test library nếu security tests cần DOM.

Script contract:

```json
{
  "scripts": {
    "check:syntax": "node scripts/check-syntax.cjs",
    "check:data": "node scripts/validate-course-data.cjs",
    "test:unit": "node --test tests/*.test.cjs",
    "test:browser": "playwright test tests/browser",
    "check": "npm run check:syntax && npm run check:data && npm run test:unit"
  }
}
```

Điều chỉnh tên script khi cần nhưng phải giữ một lệnh tổng `npm.cmd run check`.

#### 1.2 Course validator

- [ ] Đọc lesson list từ `COURSE_STRUCTURE`, không hard-code số lượng.
- [ ] Kiểm tra `id`, `title`, `description`, `status`, `contentVersion`.
- [ ] Kiểm tra file/key khớp `<level>_<id>`.
- [ ] Kiểm tra quiz ID duy nhất và tuần tự.
- [ ] Kiểm tra `correctAnswer` nằm trong options.
- [ ] Kiểm tra practice ID duy nhất.
- [ ] `published` phải có ít nhất một quiz và một practice.
- [ ] Practice published không được có `testCases: []`.
- [ ] `draft` được phép có placeholder/empty tests.
- [ ] Validator báo lỗi kèm file và lesson key.
- [ ] Validator exit code `1` khi fixture sai.

Negative fixtures:

- [ ] Published lesson thiếu file.
- [ ] Duplicate quiz ID.
- [ ] `correctAnswer` ngoài options.
- [ ] Published practice có zero tests.
- [ ] Unknown status.
- [ ] Lesson file đăng ký sai `window.LESSON_DATA` key.

Acceptance:

- `npm.cmd run check:data` exit `0` trên source hợp lệ.
- Từng negative fixture exit `1` và nêu đúng lỗi.

### Phase 2 — Placeholder lifecycle và route an toàn

#### 2.1 Metadata

- [ ] Gắn `status` cho đủ 39 lesson.
- [ ] Gắn `contentVersion`.
- [ ] Chỉ đánh `published` cho lesson đã qua validator.
- [ ] Đánh `draft` cho placeholder.
- [ ] Không dựa vào comment `Placeholder` để quyết định runtime.

#### 2.2 Bổ sung file thiếu

- [ ] Tạo `advance/lesson-9.js`.
- [ ] Tạo `advance/lesson-10.js`.
- [ ] Tạo `advance/lesson-11.js`.
- [ ] Tạo `advance/lesson-12.js`.
- [ ] Tạo `advance/lesson-13.js`.
- [ ] Tạo `intensive/lesson-9.js`.
- [ ] Tạo `intensive/lesson-10.js`.
- [ ] Tạo `intensive/lesson-11.js`.
- [ ] Tạo `intensive/lesson-12.js`.
- [ ] Tạo `intensive/lesson-13.js`.
- [ ] Mỗi file đăng ký đúng lesson key.
- [ ] Không tự bịa nội dung học; dùng placeholder trung tính.

#### 2.3 UI behavior

- [ ] Lesson card `published` có nút học.
- [ ] Lesson card `draft` có badge “Sắp cập nhật”.
- [ ] Draft button disabled hoặc mở trang coming-soon có kiểm soát.
- [ ] Draft không hiện điểm/completion.
- [ ] Draft không gọi quiz/practice init.
- [ ] Draft không ghi localStorage progress.
- [ ] Draft không đồng bộ Firestore.
- [ ] Direct route draft không phát sinh console error.
- [ ] Route invalid điều hướng an toàn.

Acceptance:

- 39/39 lesson có file và metadata.
- Không còn 404 cho lesson route.
- Placeholder còn nguyên và không tạo progress.

### Phase 3 — Chặn XSS và loại bỏ unsafe sinks

#### 3.1 Auth/header

- [ ] Không render `currentStudent.name` bằng template `innerHTML`.
- [ ] Dùng `textContent` cho tên.
- [ ] Gắn logout handler bằng `addEventListener`.
- [ ] Session chứa HTML hiển thị đúng như text.

#### 3.2 Practice results

- [ ] Không ghép input/output/error vào HTML.
- [ ] Dùng `document.createElement`.
- [ ] Preserve newline bằng CSS hoặc `textContent`.
- [ ] Không cho output tạo element.

#### 3.3 Teacher dashboard

- [ ] Escape hoặc render text an toàn cho class name.
- [ ] Escape hoặc render text an toàn cho student name.
- [ ] Không đặt dữ liệu Firestore trong inline `onclick`.
- [ ] Không render `error.message` bằng HTML.
- [ ] CSV chống formula injection với giá trị bắt đầu `=`, `+`, `-`, `@`.

#### 3.4 Tests

- [ ] Test `<img onerror=...>` trong session name.
- [ ] Test payload trong class/student name.
- [ ] Test output Python có HTML.
- [ ] Test error message có HTML.
- [ ] Test CSV formula payload.
- [ ] Xác nhận marker JavaScript không chạy.

Acceptance:

- Không còn user/Firestore/Python-controlled value đi vào unsafe `innerHTML`.
- Security rendering tests đạt.
- Browser test XSS đạt.

### Phase 4 — Python runner có timeout

#### 4.1 Worker

- [ ] Tạo `python-worker.js`.
- [ ] Worker khởi tạo Pyodide.
- [ ] Worker nhận message có request ID.
- [ ] Worker mock `input`/`print` độc lập cho từng test.
- [ ] Worker luôn restore builtins.
- [ ] Worker trả structured result.

#### 4.2 Main-thread controller

- [ ] Tạo `python-runner.js`.
- [ ] Timeout cấu hình bằng constant.
- [ ] Timeout terminate worker.
- [ ] Worker tự khởi tạo lại sau timeout/crash.
- [ ] UI button luôn được enable trong `finally`.
- [ ] Ngăn chạy song song cùng một editor.
- [ ] Có trạng thái “Runtime đang khởi động lại”.

#### 4.3 Tests

- [ ] Code đúng trả pass.
- [ ] SyntaxError trả lỗi đọc được.
- [ ] `while True: pass` trả timeout.
- [ ] Sau timeout, bài tiếp theo vẫn chạy.
- [ ] `print("<img ...>")` chỉ hiện text.
- [ ] Nhiều test case không rò globals ngoài contract.

Acceptance:

- Infinite loop không treo tab.
- UI phục hồi không cần reload.
- Output không thực thi HTML.

### Phase 5 — Progress v2 và completion chính xác

#### 5.1 Progress store

- [ ] Tạo `js/progress-store.js`.
- [ ] Một module chịu trách nhiệm serialize/parse/validate.
- [ ] Schema version bắt buộc.
- [ ] JSON lỗi không làm crash app.
- [ ] Storage key bao gồm student UID và lesson key.
- [ ] Có migration từ legacy keys.
- [ ] Migration idempotent.
- [ ] Giữ legacy data cho đến khi readback đạt.

#### 5.2 Quiz

- [ ] Quiz result ghi `correct`, `wrong`, `skipped`, `total`, `percent`, `passed`.
- [ ] Không dựa vào sự tồn tại của key.
- [ ] Restore kết quả không tự submit lại qua confirm dialog.
- [ ] Draft lesson không ghi kết quả.

#### 5.3 Practice

- [ ] Lưu `completedExerciseIds`.
- [ ] Lưu `requiredExerciseIds`.
- [ ] `passed` chỉ true khi đủ required exercises.
- [ ] Zero test không thể auto-pass published lesson.
- [ ] Draft cho phép zero test nhưng runner bị khóa.

#### 5.4 Dashboard/list

- [ ] Dùng một hàm `isLessonCompleted`.
- [ ] Comment và implementation cùng định nghĩa.
- [ ] Quiz 0 điểm không được tính hoàn thành.
- [ ] `{}` không được tính hoàn thành.
- [ ] Progress draft không tăng tổng.
- [ ] Tổng phần trăm dùng số lesson published.

Acceptance:

- Unit tests cho mọi trạng thái pass/fail.
- Reload và đổi route giữ đúng progress.
- Không có false completion.

### Phase 6 — Firebase Authentication và Firestore Rules

> GATE-01 phải được giải quyết trước phase này.

#### 6.1 Firebase Auth

- [ ] Nạp Firebase Auth SDK.
- [ ] Dùng `onAuthStateChanged`.
- [ ] Có loading state, không render route trước khi auth resolve.
- [ ] Teacher login qua provider đã chọn.
- [ ] Student login theo track đã chọn.
- [ ] Logout xóa local presentation state, không giả vờ thu hồi server session.

#### 6.2 Teacher role

- [ ] Có nguồn sự thật cho role.
- [ ] Không tin `localStorage.role`.
- [ ] Teacher route guard kiểm tra Firebase user và role.
- [ ] Không phải teacher thì redirect/403 UI.
- [ ] Dashboard không query trước khi role resolve.

#### 6.3 Firestore Rules

- [ ] Thêm `firestore.rules`.
- [ ] Default deny.
- [ ] Unauthenticated read/write bị từ chối.
- [ ] Student chỉ đọc profile của mình.
- [ ] Student chỉ đọc/write progress của UID mình.
- [ ] Student không tự sửa role/class binding.
- [ ] Teacher chỉ quản lý class/student thuộc phạm vi được cấp.
- [ ] Teacher mới được đọc dashboard progress.
- [ ] Field whitelist và type validation.
- [ ] Không cho client tự đặt server-owned timestamp/verification.

#### 6.4 Rules tests

- [ ] Unauthenticated class list denied.
- [ ] Unauthenticated teacher dashboard denied.
- [ ] Student A không đọc Student B.
- [ ] Student A không ghi progress cho Student B.
- [ ] Student không tạo teacher role.
- [ ] Teacher được đọc lớp được cấp.
- [ ] Teacher được tạo/xóa dữ liệu đúng scope.
- [ ] Teacher không truy cập scope khác nếu hệ thống có nhiều teacher.
- [ ] Invalid progress schema denied.

Acceptance:

- Rules emulator tests đạt.
- Chrome teacher route không session không render dữ liệu.
- Không có production deploy.

### Phase 7 — Đồng bộ Firestore và timestamp

#### 7.1 Progress documents

- [ ] Dùng deterministic document ID.
- [ ] Không query rồi add gây duplicate.
- [ ] Dùng `set(..., { merge: true })` hoặc transaction phù hợp.
- [ ] Quiz và practice cùng tồn tại trong một document.
- [ ] Không để record type cuối ghi đè type trước trong dashboard.
- [ ] Dashboard hiển thị cả quiz và practice.

#### 7.2 Timestamp

- [ ] `lastActive` dùng `serverTimestamp`.
- [ ] `submittedAt` dùng `serverTimestamp`.
- [ ] Reader hỗ trợ tạm cả Timestamp và ISO string khi migration.
- [ ] Invalid timestamp hiện fallback, không crash toàn bảng.

#### 7.3 Cross-device restore

- [ ] Restore exact completed exercise IDs.
- [ ] Restore quiz pass state.
- [ ] Không ghi boolean vào key cần object.
- [ ] Content version mismatch có policy rõ ràng.
- [ ] Không overwrite local mới hơn bằng remote cũ hơn.

#### 7.4 Migration

- [ ] Viết migration idempotent.
- [ ] Test trên emulator fixture.
- [ ] Count trước/sau bằng nhau theo cohort.
- [ ] Lưu bản legacy cho rollback.
- [ ] Không chạy production khi chưa có xác nhận.

Acceptance:

- Student làm trên máy A, mở máy B thấy đúng từng exercise.
- Teacher dashboard hiển thị đúng quiz và practice.
- Không duplicate progress docs.

### Phase 8 — Teacher dashboard hardening

- [ ] Tất cả query chạy sau authorization.
- [ ] Create/update/delete kiểm tra role.
- [ ] Delete class dùng batch/transaction hoặc backend operation.
- [ ] Không xóa tuần tự rồi để partial state mà không báo.
- [ ] Hiện số bản ghi sẽ xóa trước confirmation.
- [ ] Có audit fields: actor UID, action, target, timestamp.
- [ ] CSV escape đúng.
- [ ] Loading/error/empty state không lộ dữ liệu nhạy cảm.
- [ ] Progress map không để practice che quiz.
- [ ] Chỉ tính published lessons vào tổng.

Acceptance:

- Student không mở được dashboard.
- Anonymous không đọc được thống kê.
- Delete failure không tạo trạng thái nửa vời trong emulator test.

### Phase 9 — Dọn dead code và quality debt

- [ ] Xác nhận Google Apps Script report UI không còn consumer.
- [ ] Xóa `GOOGLE_SCRIPT_URL` và `submitReport` nếu Firebase là nguồn chính.
- [ ] Xóa listener tới element không tồn tại.
- [ ] Xác nhận `quiz-data.js` có còn consumer.
- [ ] Xác nhận `practice-data.js` có còn consumer.
- [ ] Chỉ xóa stale file sau search + runtime test.
- [ ] Sửa trailing whitespace trong file bị chạm.
- [ ] Chạy `git diff --check`.
- [ ] Không format hàng loạt file ngoài scope.

Acceptance:

- Không còn dead selector/report path.
- `git diff --check` không báo lỗi trong file đã sửa.
- Không xóa nhầm nguồn dữ liệu lesson.

### Phase 10 — QA tổng hợp

#### 10.1 Static/unit

- [ ] `npm.cmd run check`.
- [ ] Data validator pass.
- [ ] Unit tests pass.
- [ ] Rules emulator tests pass.
- [ ] `git diff --check` pass cho changed files.

#### 10.2 Browser matrix

Routes:

- [ ] `#/login`
- [ ] `#/`
- [ ] `#/basic`
- [ ] Một published lesson
- [ ] Một draft lesson
- [ ] Một invalid lesson
- [ ] `#/teacher-dashboard` anonymous
- [ ] `#/teacher-dashboard` student
- [ ] `#/teacher-dashboard` teacher

Viewport:

- [ ] 375×812
- [ ] 768×1024
- [ ] 1280×900

Browsers:

- [ ] Chrome
- [ ] Edge

Critical flows:

- [ ] Student authentication.
- [ ] Quiz submit/reload.
- [ ] Practice pass/reload.
- [ ] Infinite-loop timeout/recovery.
- [ ] Cross-device restore fixture.
- [ ] Draft lesson does not create progress.
- [ ] Teacher role guard.
- [ ] Teacher dashboard shows both quiz/practice.
- [ ] Logout revokes protected UI.
- [ ] XSS fixtures remain text.

#### 10.3 Accessibility smoke

- [ ] Keyboard vào được lesson cards.
- [ ] Draft button có disabled/ARIA rõ ràng.
- [ ] Modal có role/name/focus handling.
- [ ] Practice list không chỉ là `<div onclick>`.
- [ ] Error/status có live region phù hợp.

Acceptance:

- `SOURCE READY`
- `EMULATOR ACCEPTED`
- `RUNTIME ACCEPTED — Chrome and Edge`
- Không tự nâng lên `LIVE ACCEPTED`.

## 9. Production handoff — không tự thực hiện

Prerequisites:

- [ ] Người dùng xác nhận Firebase project chính xác.
- [ ] Backup/export Firestore production.
- [ ] Ghi hash và count.
- [ ] Rules diff được review.
- [ ] Migration dry-run trên emulator.
- [ ] Rollback command được chuẩn bị.
- [ ] Có tài khoản test teacher/student, không dùng dữ liệu thật.

Deployment sequence:

1. Backup.
2. Deploy Rules.
3. Read back Rules.
4. Chạy anonymous/student/teacher access probes.
5. Migration theo batch nhỏ nếu cần.
6. Readback counts.
7. Browser smoke.
8. Giữ rollback artifact.

Stop immediately:

- Anonymous vẫn đọc được progress.
- Student đọc được student khác.
- Teacher CRUD bị deny ngoài dự kiến.
- Migration count lệch.
- Có duplicate progress.
- Browser console có uncaught error ở critical flow.

## 10. Rollback

Source:

- Ưu tiên restore từng file từ backup.
- Không dùng `git reset --hard`.
- Không dùng `git checkout --` khi chưa xác nhận file không chứa thay đổi của người dùng.

Firestore:

- Không xóa field legacy trong lần migration đầu.
- Dùng `schemaVersion` để reader hỗ trợ song song v1/v2.
- Nếu migration lỗi, chuyển reader về v1 và restore từ export.

Rules:

- Lưu rules trước deploy.
- Rollback bằng file rules đã readback, không dùng rules nhớ lại bằng tay.

Worker:

- Giữ đường fallback feature flag trong giai đoạn test.
- Không fallback về runner main-thread trong production nếu timeout là yêu cầu bắt buộc.

## 11. Stop/escalation rules

AI phải dừng và hỏi người dùng khi:

- Cần chọn TRACK-A/B/C.
- Cần Firebase Console hoặc tài khoản provider.
- Cần tạo/xóa tài khoản.
- Cần deploy Rules.
- Cần ghi/xóa dữ liệu production.
- Không phân biệt được placeholder với published từ nguồn hiện có.
- File target có thay đổi mới từ người/AI khác.
- Backup/hash không đạt.
- Test cần thao tác destructive.
- Yêu cầu mới làm thay đổi completion rule hoặc pass threshold.

AI không được:

- Tự coi dropdown chọn tên là authentication an toàn.
- Tự tuyên bố điểm client-side là chống gian lận.
- Tự deploy vì source tests đã pass.
- Tự xóa placeholder.
- Tự điền nội dung giáo trình.
- Tự dùng dữ liệu học sinh thật trong fixture.

## 12. Definition of Done

### Source

- [ ] Tất cả P1/P2 trong kế hoạch được sửa hoặc có exception được duyệt.
- [ ] Không còn unsafe rendering sink cho dữ liệu động.
- [ ] Python runner có timeout/recovery.
- [ ] Progress schema v2 thống nhất local/remote.
- [ ] Placeholder có lifecycle rõ ràng.
- [ ] 39/39 lesson file contract hợp lệ.

### Security

- [ ] Teacher dashboard bắt buộc Firebase Auth + teacher role.
- [ ] Anonymous Firestore access bị deny theo policy.
- [ ] Student không thể ghi progress cho UID khác.
- [ ] Rules tests đầy đủ và pass.

### Quality

- [ ] `npm.cmd run check` pass.
- [ ] Rules emulator tests pass.
- [ ] Browser critical flows pass.
- [ ] Changed-file diff check sạch.
- [ ] Evidence Log đầy đủ.

### Reporting

- [ ] Báo trạng thái bằng nhãn acceptance chính xác.
- [ ] Liệt kê file đã sửa.
- [ ] Liệt kê file còn untracked/unrelated.
- [ ] Không claim `LIVE ACCEPTED`, `PEER-PASSED` hoặc `RELEASED` khi chưa có bằng chứng.

## 13. Evidence Log

| ID | Phase | Command/Test | Expected | Actual | Artifact/Path | Status |
|---|---|---|---|---|---|---|
| BASE-01 | Baseline | JS syntax | 0 failures | 0 failures | Terminal evidence 2026-07-31 | PASS |
| BASE-02 | Baseline | Course contract scan | Derive from current structure | 39 declared, 29 files, 10 missing | `js/data/course-structure.js` | PASS |
| BASE-03 | Baseline | Chrome anonymous teacher route | Must be denied in target | Dashboard/data rendered | Runtime evidence 2026-07-31 | FAIL |
| BASE-04 | Baseline | Session-name XSS | Must remain text in target | JavaScript executed | `js/auth.js` | FAIL |
| BASE-05 | Baseline | Placeholder behavior | Draft must not grade | Placeholder opens as quiz/practice | `js/lesson-list.js` | FAIL |
| P0-01 | Phase 0 | Fresh backup | Valid zip + SHA-256 | PENDING | `.backups/` | PENDING |
| P1-01 | Phase 1 | `npm.cmd run check:data` | Exit 0 | PENDING | validator output | PENDING |
| P2-01 | Phase 2 | Draft route browser test | No grade/no 404 | PENDING | Playwright report | PENDING |
| P3-01 | Phase 3 | XSS fixtures | Marker not executed | PENDING | test report | PENDING |
| P4-01 | Phase 4 | Infinite loop | Timeout + recover | PENDING | browser trace | PENDING |
| P5-01 | Phase 5 | Progress unit tests | All pass | PENDING | test report | PENDING |
| P6-01 | Phase 6 | Rules emulator tests | All pass | PENDING | emulator output | PENDING |
| P7-01 | Phase 7 | Cross-device fixture | Exact restore | PENDING | test artifact | PENDING |
| P8-01 | Phase 8 | Teacher authorization matrix | Correct allow/deny | PENDING | browser/rules report | PENDING |
| P10-01 | Phase 10 | Chrome critical flows | All pass | PENDING | Playwright report | PENDING |
| P10-02 | Phase 10 | Edge critical flows | All pass | PENDING | Playwright report | PENDING |
| LIVE-01 | Production | Backup/readback/smoke | All pass | BLOCKED | production evidence | BLOCKED |

## 14. Planning backup

Backup bảo vệ việc tạo tài liệu kế hoạch này:

```text
Path: .backups/pylearn-pre-fix-plan-20260731-104928.zip
Entries: 53
Size: 1833335 bytes
SHA-256: 14AE78AACD4D32594F478E6CE4D8BB9316B3112CEBDEB503547A5395DE7BE73D
```

Lưu ý:

- Backup trên không thay thế GATE-00 của phiên triển khai.
- AI triển khai phải tạo backup mới vì source có thể đã thay đổi sau ngày lập kế hoạch.
