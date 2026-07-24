// =====================================================================
// QUIZ.JS - Logic phần trắc nghiệm lý thuyết
// Render 50 câu hỏi, xử lý chọn đáp án, bản đồ câu hỏi, nộp & chấm
// =====================================================================

// ---------------------------------------------------------------------
// BIẾN TOÀN CỤC cho phần Quiz
// ---------------------------------------------------------------------

// Lưu đáp án mà học sinh đã chọn. Key = id câu hỏi, Value = index đáp án
let userAnswers = {};

// Trạng thái đã nộp bài chưa (sau khi nộp không cho sửa)
let quizSubmitted = false;

// =====================================================================
// TÍNH NĂNG: RENDER CÂU HỎI
// =====================================================================

/**
 * Render toàn bộ 50 câu hỏi ra giao diện.
 * Mỗi câu hỏi được tạo thành 1 card chứa nhãn, nội dung, 4 lựa chọn.
 */
function renderQuizQuestions() {
  const container = document.getElementById('quiz-questions-container');
  let html = '';

  // Duyệt qua từng câu hỏi trong mảng QUIZ_DATA
  for (let i = 0; i < QUIZ_DATA.length; i++) {
    const q = QUIZ_DATA[i];

    // -----------------------------------------------------------------
    // BƯỚC 1: Xử lý nội dung câu hỏi (có thể chứa code block)
    // -----------------------------------------------------------------
    let questionContent = '';

    // Kiểm tra nếu câu hỏi có chứa code block (dùng \n để nhận biết code nhiều dòng)
    if (q.question.includes('\\n') || q.question.includes('\n')) {
      // Tách phần text và phần code
      const parts = splitQuestionAndCode(q.question);
      questionContent = `<p class="question-text">${formatInlineCode(parts.text)}</p>`;
      if (parts.code) {
        questionContent += `<pre class="question-code-block">${escapeHtml(parts.code)}</pre>`;
      }
    } else {
      questionContent = `<p class="question-text">${formatInlineCode(q.question)}</p>`;
    }

    // -----------------------------------------------------------------
    // BƯỚC 2: Tạo HTML cho 4 đáp án
    // -----------------------------------------------------------------
    let optionsHtml = '';
    for (let j = 0; j < q.options.length; j++) {
      optionsHtml += `
        <li class="option-item">
          <input type="radio"
                 class="option-radio"
                 name="question-${q.id}"
                 id="q${q.id}-opt${j}"
                 value="${j}"
                 onchange="onAnswerSelect(${q.id}, ${j})"
          >
          <label class="option-label" for="q${q.id}-opt${j}" id="label-q${q.id}-opt${j}">
            <span class="option-radio-custom"></span>
            <span class="option-text">${formatInlineCode(q.options[j])}</span>
          </label>
        </li>
      `;
    }

    // -----------------------------------------------------------------
    // BƯỚC 3: Ghép thành card hoàn chỉnh
    // -----------------------------------------------------------------
    html += `
      <div class="quiz-question-card" id="question-card-${q.id}"
           style="animation-delay: ${i * 0.03}s">
        <span class="question-label">Câu ${q.id}</span>
        ${questionContent}
        <ul class="options-list">
          ${optionsHtml}
        </ul>
        <div class="explanation" id="explanation-${q.id}">
          💡 ${formatInlineCode(q.explanation)}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// =====================================================================
// TÍNH NĂNG: BẢN ĐỒ CÂU HỎI
// =====================================================================

/**
 * Render lưới bản đồ 50 ô, mỗi ô đại diện 1 câu hỏi.
 * Click vào ô sẽ cuộn đến câu hỏi tương ứng.
 */
function renderQuizMap() {
  const grid = document.getElementById('quiz-map-grid');
  let html = '';

  for (let i = 1; i <= QUIZ_DATA.length; i++) {
    html += `
      <button class="quiz-map-cell" id="map-cell-${i}"
              onclick="scrollToQuestion(${i})"
              title="Câu ${i}">
        ${i}
      </button>
    `;
  }

  grid.innerHTML = html;
}

/**
 * Cuộn mượt đến câu hỏi có id tương ứng.
 */
function scrollToQuestion(questionId) {
  const card = document.getElementById(`question-card-${questionId}`);
  if (card) {
    // Cuộn đến card, trừ đi chiều cao header
    const headerHeight = 64;
    const cardTop = card.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
    window.scrollTo({ top: cardTop, behavior: 'smooth' });
  }
}

// =====================================================================
// TÍNH NĂNG: XỬ LÝ CHỌN ĐÁP ÁN
// =====================================================================

/**
 * Được gọi khi học sinh chọn 1 đáp án.
 * Lưu đáp án vào userAnswers và cập nhật bản đồ câu hỏi.
 *
 * @param {number} questionId - Id của câu hỏi (1-50)
 * @param {number} optionIndex - Index đáp án đã chọn (0-3)
 */
function onAnswerSelect(questionId, optionIndex) {
  // Nếu đã nộp bài rồi thì không cho sửa
  if (quizSubmitted) return;

  // Lưu đáp án
  userAnswers[questionId] = optionIndex;

  // Cập nhật ô trên bản đồ: đổi màu vàng cho biết đã trả lời
  const cell = document.getElementById(`map-cell-${questionId}`);
  if (cell) {
    cell.classList.add('answered');
  }

  // Cập nhật tiến độ
  updateQuizProgress();

  // Lưu vào localStorage
  saveQuizProgress();
}

/**
 * Cập nhật dòng "Tiến độ: X/50" trên bản đồ.
 */
function updateQuizProgress() {
  const total = QUIZ_DATA.length;
  const answered = Object.keys(userAnswers).length;
  const progressEl = document.getElementById('quiz-progress');
  progressEl.textContent = `Tiến độ: ${answered}/${total}`;
}

// =====================================================================
// TÍNH NĂNG: NỘP BÀI VÀ CHẤM ĐIỂM
// =====================================================================

/**
 * Xử lý khi học sinh bấm nút "Nộp bài".
 * Chấm điểm, hiển thị kết quả trong modal, highlight đáp án đúng/sai.
 */
function submitQuiz() {
  // Nếu đã nộp rồi thì không làm gì
  if (quizSubmitted) return;

  // Xác nhận trước khi nộp
  const answeredCount = Object.keys(userAnswers).length;
  const totalCount = QUIZ_DATA.length;

  if (answeredCount < totalCount) {
    const confirmMsg = `Bạn mới trả lời ${answeredCount}/${totalCount} câu. Bạn có chắc muốn nộp bài?`;
    if (!confirm(confirmMsg)) return;
  }

  // Đánh dấu đã nộp
  quizSubmitted = true;

  // -----------------------------------------------------------------
  // BƯỚC 1: Chấm điểm
  // -----------------------------------------------------------------
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < QUIZ_DATA.length; i++) {
    const q = QUIZ_DATA[i];
    const userAnswer = userAnswers[q.id];
    const card = document.getElementById(`question-card-${q.id}`);
    const cell = document.getElementById(`map-cell-${q.id}`);

    if (userAnswer === undefined) {
      // Chưa trả lời
      skippedCount++;
      card.classList.add('skipped');
    } else if (userAnswer === q.correctAnswer) {
      // Trả lời đúng
      correctCount++;
      card.classList.add('correct');
      if (cell) cell.classList.add('correct');
    } else {
      // Trả lời sai
      wrongCount++;
      card.classList.add('wrong');
      if (cell) cell.classList.add('wrong');

      // Highlight đáp án sai mà người dùng đã chọn
      const wrongLabel = document.getElementById(`label-q${q.id}-opt${userAnswer}`);
      if (wrongLabel) wrongLabel.classList.add('is-wrong');
    }

    // Highlight đáp án đúng cho mọi câu
    const correctLabel = document.getElementById(`label-q${q.id}-opt${q.correctAnswer}`);
    if (correctLabel) correctLabel.classList.add('is-correct');

    // Hiển thị giải thích
    const explanation = document.getElementById(`explanation-${q.id}`);
    if (explanation) explanation.classList.add('show');

    // Vô hiệu hóa radio buttons
    const radios = document.querySelectorAll(`input[name="question-${q.id}"]`);
    radios.forEach(radio => radio.disabled = true);
  }

  // -----------------------------------------------------------------
  // BƯỚC 2: Hiển thị kết quả trong modal
  // -----------------------------------------------------------------
  document.getElementById('score-number').textContent = correctCount;
  document.getElementById('score-correct').textContent = correctCount;
  document.getElementById('score-wrong').textContent = wrongCount;
  document.getElementById('score-skipped').textContent = skippedCount;

  // Thông điệp dựa trên điểm
  const percent = Math.round((correctCount / totalCount) * 100);
  let message = '';
  if (percent >= 90) {
    message = '🎉 Xuất sắc! Bạn nắm vững kiến thức Python cơ bản!';
  } else if (percent >= 70) {
    message = '👍 Tốt lắm! Cần ôn thêm một số chủ đề nhé.';
  } else if (percent >= 50) {
    message = '💪 Cố gắng thêm! Hãy xem lại các phần kiến thức bị sai.';
  } else {
    message = '📖 Cần ôn tập lại! Đọc kỹ lý thuyết và thử lại nhé.';
  }
  document.getElementById('score-text').textContent = message;

  // Đổi màu vòng tròn điểm theo mức độ
  const circle = document.getElementById('score-circle');
  if (percent >= 70) {
    circle.style.borderColor = 'var(--color-success)';
  } else if (percent >= 50) {
    circle.style.borderColor = 'var(--color-accent)';
  } else {
    circle.style.borderColor = 'var(--color-error)';
  }

  // Hiện modal
  document.getElementById('quiz-result-modal').style.display = 'flex';

  // Vô hiệu hóa nút nộp bài
  document.getElementById('btn-submit-quiz').disabled = true;
  document.getElementById('btn-submit-quiz').textContent = '✅ Đã nộp bài';

  // Lưu kết quả vào localStorage
  saveQuizResult(correctCount, wrongCount, skippedCount);
}

// =====================================================================
// TÍNH NĂNG: XEM LẠI VÀ LÀM LẠI
// =====================================================================

/**
 * Đóng modal và cuộn lên đầu để xem lại đáp án.
 */
function reviewQuiz() {
  document.getElementById('quiz-result-modal').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Reset toàn bộ bài quiz để làm lại từ đầu.
 */
function retryQuiz() {
  // Xóa đáp án đã chọn
  userAnswers = {};
  quizSubmitted = false;

  // Xóa dữ liệu localStorage
  localStorage.removeItem('pylearn_quiz_answers');
  localStorage.removeItem('pylearn_quiz_result');

  // Đóng modal
  document.getElementById('quiz-result-modal').style.display = 'none';

  // Render lại câu hỏi và bản đồ
  renderQuizQuestions();
  renderQuizMap();
  updateQuizProgress();

  // Khôi phục nút nộp bài
  document.getElementById('btn-submit-quiz').disabled = false;
  document.getElementById('btn-submit-quiz').textContent = '📝 Nộp bài';

  // Cuộn lên đầu
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================================================================
// TÍNH NĂNG: LƯU VÀ KHÔI PHỤC TIẾN TRÌNH (localStorage)
// =====================================================================

/**
 * Lưu đáp án đã chọn vào localStorage.
 */
function saveQuizProgress() {
  localStorage.setItem('pylearn_quiz_answers', JSON.stringify(userAnswers));
}

/**
 * Lưu kết quả chấm điểm vào localStorage.
 */
function saveQuizResult(correct, wrong, skipped) {
  const result = { correct, wrong, skipped, submittedAt: new Date().toISOString() };
  localStorage.setItem('pylearn_quiz_result', JSON.stringify(result));
}

/**
 * Khôi phục tiến trình từ localStorage khi tải lại trang.
 * Nếu đã nộp bài trước đó thì hiện lại kết quả.
 */
function loadQuizProgress() {
  // Khôi phục đáp án
  const savedAnswers = localStorage.getItem('pylearn_quiz_answers');
  if (savedAnswers) {
    userAnswers = JSON.parse(savedAnswers);

    // Đánh dấu lại các radio đã chọn
    for (const [questionId, optionIndex] of Object.entries(userAnswers)) {
      const radio = document.getElementById(`q${questionId}-opt${optionIndex}`);
      if (radio) radio.checked = true;

      const cell = document.getElementById(`map-cell-${questionId}`);
      if (cell) cell.classList.add('answered');
    }

    updateQuizProgress();
  }

  // Kiểm tra nếu đã nộp bài trước đó
  const savedResult = localStorage.getItem('pylearn_quiz_result');
  if (savedResult) {
    // Tự động nộp lại để hiển thị kết quả
    quizSubmitted = false; // Reset tạm để submitQuiz() chạy được
    submitQuiz();
  }
}

// =====================================================================
// HÀM TIỆN ÍCH
// =====================================================================

/**
 * Escape HTML đặc biệt để hiển thị code an toàn.
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Chuyển đổi inline code (nằm giữa dấu backtick `) thành thẻ <code>.
 */
function formatInlineCode(text) {
  return text.replace(/`([^`]+)`/g, '<code>$1</code>');
}

/**
 * Tách câu hỏi thành phần text và phần code (nếu có).
 * Xử lý code block markdown (```python ... ```) hoặc nhận biết qua xuống dòng.
 */
function splitQuestionAndCode(questionText) {
  // 1. Kiểm tra pattern markdown code block (```python ... ```)
  const mdPattern = /([\s\S]*?)```(?:python)?\s*\n?([\s\S]*?)```([\s\S]*)/i;
  const mdMatch = questionText.match(mdPattern);
  if (mdMatch) {
    const text = (mdMatch[1].trim() + " " + mdMatch[3].trim()).trim();
    const code = mdMatch[2].trim();
    return { text, code };
  }

  // 2. Tìm pattern: câu hỏi có dòng code bắt đầu sau ":\n"
  const codePatterns = [
    /^(.*?:)\s*\n([\s\S]+)$/,
    /^(.*?)\n((?:[a-z_][\w]*\s*[=(]|print|for |while |if |def |import ).*)$/im
  ];

  for (const pattern of codePatterns) {
    const match = questionText.match(pattern);
    if (match) {
      return { text: match[1], code: match[2].trim() };
    }
  }

  // 3. Nếu toàn bộ chuỗi có chứa \n, coi như code
  if (questionText.includes('\n')) {
    const firstLine = questionText.split('\n')[0];
    const rest = questionText.split('\n').slice(1).join('\n');
    return { text: firstLine, code: rest.trim() };
  }

  return { text: questionText, code: null };
}

// =====================================================================
// KHỞI TẠO QUIZ
// =====================================================================

/**
 * Hàm khởi tạo phần Quiz: render câu hỏi, bản đồ, gắn sự kiện.
 */
function initQuiz() {
  // Render câu hỏi và bản đồ
  renderQuizQuestions();
  renderQuizMap();

  // Gắn sự kiện cho nút nộp bài
  document.getElementById('btn-submit-quiz').addEventListener('click', submitQuiz);

  // Gắn sự kiện cho modal
  document.getElementById('btn-close-modal').addEventListener('click', () => {
    document.getElementById('quiz-result-modal').style.display = 'none';
  });
  document.getElementById('btn-review-quiz').addEventListener('click', reviewQuiz);
  document.getElementById('btn-retry-quiz').addEventListener('click', retryQuiz);

  // Đóng modal khi click bên ngoài
  document.getElementById('quiz-result-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('quiz-result-modal').style.display = 'none';
    }
  });

  // Khôi phục tiến trình từ localStorage
  loadQuizProgress();
}
