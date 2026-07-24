// =====================================================================
// PRACTICE.JS - Logic phần thực hành code Python
// Render bài tập, code editor, chạy Python bằng Pyodide, chấm kết quả
// =====================================================================

// ---------------------------------------------------------------------
// BIẾN TOÀN CỤC cho phần Practice
// ---------------------------------------------------------------------

// Bài tập đang được chọn hiện tại (index trong PRACTICE_DATA)
let currentExerciseIndex = -1;

// Trạng thái hoàn thành từng bài (dùng cho cơ chế mở khóa)
// Key = id bài, Value = true/false
let completedExercises = {};

// Tham chiếu đến Pyodide instance (sẽ được gán từ app.js)
// pyodideInstance được khai báo trong app.js

// =====================================================================
// TÍNH NĂNG: RENDER DANH SÁCH BÀI TẬP (SIDEBAR)
// =====================================================================

/**
 * Render danh sách 10 bài tập vào sidebar.
 * Bài 1 luôn mở, các bài sau cần hoàn thành bài trước mới mở.
 */
function renderPracticeList() {
  const container = document.getElementById('practice-list-container');
  let html = '';

  for (let i = 0; i < PRACTICE_DATA.length; i++) {
    const exercise = PRACTICE_DATA[i];

    // Tắt tính năng mở khoá tuần tự, tất cả bài đều được mở
    const isUnlocked = true;
    const isCompleted = completedExercises[exercise.id];
    const isActive = (i === currentExerciseIndex);

    // Chọn icon phù hợp: hoàn thành / mở khóa / khóa
    let icon = '🔒';
    if (isCompleted) {
      icon = '✅';
    } else if (isUnlocked) {
      icon = '📝';
    }

    // CSS class cho trạng thái
    let classNames = 'practice-item';
    if (isActive) classNames += ' active';
    if (!isUnlocked) classNames += ' locked';
    if (isCompleted) classNames += ' completed';

    // CSS class cho độ khó
    let difficultyClass = 'easy';
    if (exercise.difficulty === 'Trung bình') difficultyClass = 'medium';
    if (exercise.difficulty === 'Khó') difficultyClass = 'hard';

    html += `
      <div class="${classNames}"
           id="practice-item-${exercise.id}"
           onclick="selectExercise(${i})"
           data-unlocked="${isUnlocked}">
        <span class="practice-item-icon">${icon}</span>
        <div class="practice-item-info">
          <div class="practice-item-name">${i + 1}. ${exercise.title}</div>
          <div class="practice-item-difficulty ${difficultyClass}">
            ${exercise.difficulty}
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// =====================================================================
// TÍNH NĂNG: CHỌN BÀI TẬP
// =====================================================================

/**
 * Xử lý khi học sinh click vào 1 bài tập trong sidebar.
 * Hiển thị đề bài, gợi ý, code editor.
 *
 * @param {number} index - Vị trí bài tập trong mảng PRACTICE_DATA
 */
function selectExercise(index) {
  const exercise = PRACTICE_DATA[index];

  // Tắt tính năng mở khoá tuần tự, tất cả bài đều được mở
  const isUnlocked = true;

  currentExerciseIndex = index;

  // -----------------------------------------------------------------
  // BƯỚC 1: Cập nhật sidebar (đánh dấu bài đang chọn)
  // -----------------------------------------------------------------
  renderPracticeList();

  // -----------------------------------------------------------------
  // BƯỚC 2: Hiển thị tiêu đề và đề bài
  // -----------------------------------------------------------------
  document.getElementById('practice-title').textContent =
    `Bài ${index + 1}: ${exercise.title}`;

  // Badge độ khó
  const badge = document.getElementById('practice-difficulty');
  badge.textContent = exercise.difficulty;
  badge.className = 'difficulty-badge';
  if (exercise.difficulty === 'Dễ') badge.classList.add('easy');
  else if (exercise.difficulty === 'Trung bình') badge.classList.add('medium');
  else badge.classList.add('hard');

  // Mô tả bài
  document.getElementById('practice-description').textContent = exercise.description;

  // -----------------------------------------------------------------
  // BƯỚC 3: Hiển thị gợi ý
  // -----------------------------------------------------------------
  const hintsSection = document.getElementById('hints-section');
  hintsSection.style.display = 'block';

  const hintsContent = document.getElementById('hints-content');
  let hintsHtml = '';
  for (let i = 0; i < exercise.hints.length; i++) {
    hintsHtml += `
      <div class="hint-step">
        <span class="hint-step-number">${i + 1}</span>
        <span class="hint-step-text">${exercise.hints[i]}</span>
      </div>
    `;
  }
  hintsContent.innerHTML = hintsHtml;

  // Đóng gợi ý mặc định
  hintsContent.style.display = 'none';
  document.getElementById('btn-hints-toggle').classList.remove('open');

  // -----------------------------------------------------------------
  // BƯỚC 4: Hiển thị code editor
  // -----------------------------------------------------------------
  const editorSection = document.getElementById('code-editor-section');
  editorSection.style.display = 'block';

  // Khôi phục code đã lưu hoặc dùng starter code
  const savedCode = localStorage.getItem(`pylearn_code_${exercise.id}`);
  const codeEditor = document.getElementById('code-editor');
  codeEditor.value = savedCode || exercise.starterCode;
  codeEditor.disabled = false;

  // Cập nhật số dòng
  updateLineNumbers();

  // -----------------------------------------------------------------
  // BƯỚC 5: Ẩn kết quả cũ
  // -----------------------------------------------------------------
  document.getElementById('results-section').style.display = 'none';
}

// =====================================================================
// TÍNH NĂNG: CODE EDITOR
// =====================================================================

/**
 * Cập nhật số dòng bên trái code editor.
 * Được gọi mỗi khi nội dung code thay đổi.
 */
function updateLineNumbers() {
  const codeEditor = document.getElementById('code-editor');
  const lineNumbers = document.getElementById('line-numbers');
  const lines = codeEditor.value.split('\n').length;

  let numbersText = '';
  for (let i = 1; i <= lines; i++) {
    numbersText += i + '\n';
  }

  lineNumbers.textContent = numbersText;
}

/**
 * Lưu code hiện tại vào localStorage.
 */
function saveCurrentCode() {
  if (currentExerciseIndex < 0) return;

  const exercise = PRACTICE_DATA[currentExerciseIndex];
  const code = document.getElementById('code-editor').value;
  localStorage.setItem(`pylearn_code_${exercise.id}`, code);
}

/**
 * Khởi tạo các sự kiện cho code editor.
 */
function initCodeEditor() {
  const codeEditor = document.getElementById('code-editor');

  // Cập nhật số dòng khi gõ code
  codeEditor.addEventListener('input', () => {
    updateLineNumbers();
    saveCurrentCode();
  });

  // Đồng bộ scroll giữa textarea và line numbers
  codeEditor.addEventListener('scroll', () => {
    const lineNumbers = document.getElementById('line-numbers');
    lineNumbers.scrollTop = codeEditor.scrollTop;
  });

  // Xử lý phím Tab: thêm 4 dấu cách thay vì chuyển focus
  codeEditor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;

      // Chèn 4 dấu cách tại vị trí con trỏ
      codeEditor.value =
        codeEditor.value.substring(0, start) +
        '    ' +
        codeEditor.value.substring(end);

      // Đặt lại con trỏ sau 4 dấu cách
      codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
      updateLineNumbers();
      saveCurrentCode();
    }
  });
}

// =====================================================================
// TÍNH NĂNG: GỢI Ý (TOGGLE)
// =====================================================================

/**
 * Khởi tạo sự kiện đóng/mở gợi ý.
 */
function initHintsToggle() {
  const btn = document.getElementById('btn-hints-toggle');
  btn.addEventListener('click', () => {
    const content = document.getElementById('hints-content');
    const isOpen = content.style.display !== 'none';

    content.style.display = isOpen ? 'none' : 'block';
    btn.classList.toggle('open', !isOpen);
  });
}

// =====================================================================
// TÍNH NĂNG: CHẠY CODE PYTHON VÀ CHẤM BÀI
// =====================================================================

/**
 * Chạy code Python của học sinh bằng Pyodide, so sánh output với expected.
 * Được gọi khi bấm nút "Kiểm tra".
 */
async function runAndCheckCode() {
  // Kiểm tra Pyodide đã sẵn sàng chưa
  if (!window.pyodideInstance) {
    alert('⏳ Python runtime đang tải. Vui lòng đợi vài giây rồi thử lại.');
    return;
  }

  if (currentExerciseIndex < 0) return;

  const exercise = PRACTICE_DATA[currentExerciseIndex];
  const userCode = document.getElementById('code-editor').value;

  // Kiểm tra code không trống
  if (userCode.trim() === '' || userCode.trim() === exercise.starterCode.trim()) {
    alert('📝 Bạn chưa viết code! Hãy viết code rồi bấm Kiểm tra.');
    return;
  }

  // Vô hiệu hóa nút trong khi chạy
  const btnRun = document.getElementById('btn-run-code');
  btnRun.disabled = true;
  btnRun.textContent = '⏳ Đang chạy...';

  // -----------------------------------------------------------------
  // BƯỚC 1: Chạy từng test case
  // -----------------------------------------------------------------
  const results = [];

  for (let i = 0; i < exercise.testCases.length; i++) {
    const testCase = exercise.testCases[i];
    const result = await runSingleTestCase(userCode, testCase);
    results.push(result);
  }

  // -----------------------------------------------------------------
  // BƯỚC 2: Hiển thị kết quả
  // -----------------------------------------------------------------
  displayResults(results, exercise);

  // Khôi phục nút
  btnRun.disabled = false;
  btnRun.textContent = '▶ Kiểm tra';
}

/**
 * Chạy code Python với 1 test case cụ thể.
 * Dùng Pyodide để thực thi, mock input() và bắt print().
 *
 * @param {string} userCode - Code Python của học sinh
 * @param {Object} testCase - Object chứa input và expectedOutput
 * @returns {Object} - Kết quả: { passed, actualOutput, expectedOutput, error }
 */
async function runSingleTestCase(userCode, testCase) {
  try {
    const pyodide = window.pyodideInstance;

    // -----------------------------------------------------------------
    // Truyền dữ liệu input vào Pyodide thông qua biến global
    // để tránh lỗi escape khi nhúng vào code string
    // -----------------------------------------------------------------
    const inputData = testCase.input || '';
    pyodide.globals.set('_js_test_input', inputData);

    // -----------------------------------------------------------------
    // Thiết lập stdin/stdout giả lập
    // - Đưa dữ liệu input vào danh sách, hàm input() lấy từng dòng
    // - Bắt tất cả print() vào danh sách để so sánh sau
    // -----------------------------------------------------------------
    const setupCode = `
import builtins

# Lấy dữ liệu input từ JS (đã được truyền an toàn qua globals)
_raw_input = str(_js_test_input)
_test_input_data = _raw_input.strip().split("\\n") if _raw_input.strip() else []
_test_input_index = [0]

# Danh sách lưu output từ print()
_test_output = []

# Lưu lại hàm gốc để khôi phục sau
_original_input = builtins.input
_original_print = builtins.print

# Ghi đè hàm input() để đọc từ dữ liệu test
def _mock_input(prompt=""):
    if _test_input_index[0] < len(_test_input_data):
        value = _test_input_data[_test_input_index[0]]
        _test_input_index[0] += 1
        return value
    return ""

# Ghi đè hàm print() để bắt output
def _mock_print(*args, **kwargs):
    sep = kwargs.get("sep", " ")
    end = kwargs.get("end", "\\n")
    output = sep.join(str(a) for a in args) + end
    _test_output.append(output)

# Áp dụng mock
builtins.input = _mock_input
builtins.print = _mock_print
`;

    // Chạy code thiết lập
    await pyodide.runPythonAsync(setupCode);

    // Chạy code của học sinh
    await pyodide.runPythonAsync(userCode);

    // Lấy output
    const actualOutput = await pyodide.runPythonAsync(
      `"".join(_test_output).strip()`
    );

    // Khôi phục input/print gốc
    await pyodide.runPythonAsync(`
builtins.input = _original_input
builtins.print = _original_print
`);

    // So sánh output (trim whitespace)
    const actual = String(actualOutput).trim();
    const expected = testCase.expectedOutput.trim();
    const passed = actual === expected;

    return {
      passed,
      actualOutput: actual,
      expectedOutput: expected,
      error: null,
      testCase: testCase
    };

  } catch (error) {
    // Khôi phục input/print nếu có lỗi
    try {
      const pyodide = window.pyodideInstance;
      await pyodide.runPythonAsync(`
import builtins
if '_original_input' in dir():
    builtins.input = _original_input
if '_original_print' in dir():
    builtins.print = _original_print
`);
    } catch (e) {
      // Bỏ qua lỗi khi khôi phục
    }

    // Lấy dòng lỗi cuối cùng để hiển thị dễ đọc hơn
    let errorMsg = error.message || String(error);
    const lines = errorMsg.split('\n');
    // Tìm dòng lỗi Python (thường ở cuối)
    const pythonError = lines.filter(l => l.trim() && !l.startsWith('  File')).pop() || errorMsg;

    return {
      passed: false,
      actualOutput: '',
      expectedOutput: testCase.expectedOutput.trim(),
      error: pythonError,
      testCase: testCase
    };
  }
}

/**
 * Hiển thị kết quả chấm bài lên giao diện.
 *
 * @param {Array} results - Mảng kết quả từng test case
 * @param {Object} exercise - Bài tập hiện tại
 */
function displayResults(results, exercise) {
  const container = document.getElementById('results-container');
  const section = document.getElementById('results-section');
  section.style.display = 'block';

  let html = '';
  let allPassed = true;

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (!r.passed) allPassed = false;

    const statusIcon = r.passed ? '✅' : '❌';
    const statusClass = r.passed ? 'pass' : 'fail';

    html += `
      <div class="test-case-result ${statusClass}">
        <span class="test-case-icon">${statusIcon}</span>
        <div class="test-case-info">
          <div class="test-case-name">${r.testCase.description}</div>
          <div class="test-case-detail">
            ${r.testCase.input ? `<div>📥 Input: <code>${escapeHtml(r.testCase.input.replace(/\n/g, ', '))}</code></div>` : ''}
            <div>📤 Kết quả mong đợi: <code>${escapeHtml(r.expectedOutput)}</code></div>
            <div>📋 Kết quả của bạn: <code>${r.error ? '❗ Lỗi: ' + escapeHtml(r.error.split('\n').pop()) : escapeHtml(r.actualOutput || '(không có output)')}</code></div>
          </div>
        </div>
      </div>
    `;
  }

  // Tóm tắt kết quả
  const passCount = results.filter(r => r.passed).length;
  const totalCount = results.length;

  if (allPassed) {
    html += `
      <div class="results-summary all-pass">
        🎉 Tuyệt vời! Bạn đã vượt qua tất cả ${totalCount} test cases!
      </div>
    `;

    // Đánh dấu bài hoàn thành
    completedExercises[exercise.id] = true;
    savePracticeProgress();

    // Cập nhật sidebar (mở khóa bài tiếp theo)
    renderPracticeList();
  } else {
    html += `
      <div class="results-summary has-fail">
        💪 Đạt ${passCount}/${totalCount} test cases. Hãy kiểm tra lại code và thử lại!
      </div>
    `;
  }

  container.innerHTML = html;

  // Cuộn đến khu vực kết quả
  section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// =====================================================================
// TÍNH NĂNG: LƯU VÀ KHÔI PHỤC TIẾN TRÌNH THỰC HÀNH
// =====================================================================

/**
 * Lưu trạng thái hoàn thành các bài tập vào localStorage.
 */
function savePracticeProgress() {
  localStorage.setItem('pylearn_practice_completed', JSON.stringify(completedExercises));
}

/**
 * Khôi phục tiến trình thực hành từ localStorage.
 */
function loadPracticeProgress() {
  const saved = localStorage.getItem('pylearn_practice_completed');
  if (saved) {
    completedExercises = JSON.parse(saved);
  }
}

// =====================================================================
// KHỞI TẠO PRACTICE
// =====================================================================

/**
 * Hàm khởi tạo phần Practice: render sidebar, gắn sự kiện.
 */
function initPractice() {
  // Khôi phục tiến trình
  loadPracticeProgress();

  // Render danh sách bài tập
  renderPracticeList();

  // Gắn sự kiện cho code editor
  initCodeEditor();

  // Gắn sự kiện cho nút gợi ý
  initHintsToggle();

  // Gắn sự kiện cho nút Kiểm tra
  document.getElementById('btn-run-code').addEventListener('click', runAndCheckCode);
}
