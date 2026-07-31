// =====================================================================
// QUIZ.JS - Logic phần trắc nghiệm lý thuyết
// Lấy dữ liệu động từ currentQuizData
// =====================================================================

// ---------------------------------------------------------------------
// BIẾN TOÀN CỤC cho phần Quiz
// ---------------------------------------------------------------------
let currentQuizData = [];
let currentLessonKey = '';
let userAnswers = {};
let quizSubmitted = false;

/**
 * Xóa trạng thái của bài quiz hiện tại (chuẩn bị load bài mới)
 */
function cleanupQuiz() {
  userAnswers = {};
  quizSubmitted = false;
  currentQuizData = [];
  currentLessonKey = '';
}

// =====================================================================
// TÍNH NĂNG: RENDER CÂU HỎI
// =====================================================================

/**
 * Render toàn bộ câu hỏi ra giao diện.
 */
function renderQuizQuestions() {
  const container = document.getElementById('quiz-questions-container');
  if (!container) return;
  let html = '';

  for (let i = 0; i < currentQuizData.length; i++) {
    const q = currentQuizData[i];

    let questionContent = '';
    if (q.question.includes('\\n') || q.question.includes('\n')) {
      const parts = splitQuestionAndCode(q.question);
      questionContent = `<p class="question-text">${formatInlineCode(parts.text)}</p>`;
      if (parts.code) {
        questionContent += `<pre class="question-code-block">${escapeHtml(parts.code)}</pre>`;
      }
    } else {
      questionContent = `<p class="question-text">${formatInlineCode(q.question)}</p>`;
    }

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

function renderQuizMap() {
  const grid = document.getElementById('quiz-map-grid');
  if (!grid) return;
  let html = '';

  for (let i = 1; i <= currentQuizData.length; i++) {
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

function scrollToQuestion(questionId) {
  const card = document.getElementById(`question-card-${questionId}`);
  if (card) {
    const headerHeight = 64;
    const cardTop = card.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
    window.scrollTo({ top: cardTop, behavior: 'smooth' });
  }
}

// =====================================================================
// TÍNH NĂNG: XỬ LÝ CHỌN ĐÁP ÁN
// =====================================================================

function onAnswerSelect(questionId, optionIndex) {
  if (quizSubmitted) return;
  
  userAnswers[questionId] = optionIndex;
  
  const cell = document.getElementById(`map-cell-${questionId}`);
  if (cell) cell.classList.add('answered');
  
  updateQuizProgress();
  saveQuizProgress();
}

function updateQuizProgress() {
  const total = currentQuizData.length;
  const answered = Object.keys(userAnswers).length;
  const progressEl = document.getElementById('quiz-progress');
  if (progressEl) progressEl.textContent = `Tiến độ: ${answered}/${total}`;
}

// =====================================================================
// TÍNH NĂNG: NỘP BÀI VÀ CHẤM ĐIỂM
// =====================================================================

function submitQuiz() {
  if (quizSubmitted) return;
  
  const answeredCount = Object.keys(userAnswers).length;
  const totalCount = currentQuizData.length;
  
  if (answeredCount < totalCount) {
    const confirmMsg = `Bạn mới trả lời ${answeredCount}/${totalCount} câu. Bạn có chắc muốn nộp bài?`;
    if (!confirm(confirmMsg)) return;
  }
  
  quizSubmitted = true;
  
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;
  
  for (let i = 0; i < currentQuizData.length; i++) {
    const q = currentQuizData[i];
    const userAnswer = userAnswers[q.id];
    const card = document.getElementById(`question-card-${q.id}`);
    const cell = document.getElementById(`map-cell-${q.id}`);
    
    if (userAnswer === undefined) {
      skippedCount++;
      if (card) card.classList.add('skipped');
    } else if (userAnswer === q.correctAnswer) {
      correctCount++;
      if (card) card.classList.add('correct');
      if (cell) cell.classList.add('correct');
    } else {
      wrongCount++;
      if (card) card.classList.add('wrong');
      if (cell) cell.classList.add('wrong');
      
      const wrongLabel = document.getElementById(`label-q${q.id}-opt${userAnswer}`);
      if (wrongLabel) wrongLabel.classList.add('is-wrong');
    }
    
    const correctLabel = document.getElementById(`label-q${q.id}-opt${q.correctAnswer}`);
    if (correctLabel) correctLabel.classList.add('is-correct');
    
    const explanation = document.getElementById(`explanation-${q.id}`);
    if (explanation) explanation.classList.add('show');
    
    const radios = document.querySelectorAll(`input[name="question-${q.id}"]`);
    radios.forEach(radio => radio.disabled = true);
  }
  
  const elScoreNumber = document.getElementById('score-number');
  if (elScoreNumber) elScoreNumber.textContent = correctCount;
  
  const elScoreTotal = document.getElementById('score-total-label');
  if (elScoreTotal) elScoreTotal.textContent = `/${totalCount}`;
  
  const elScoreCorrect = document.getElementById('score-correct');
  if (elScoreCorrect) elScoreCorrect.textContent = correctCount;
  
  const elScoreWrong = document.getElementById('score-wrong');
  if (elScoreWrong) elScoreWrong.textContent = wrongCount;
  
  const elScoreSkipped = document.getElementById('score-skipped');
  if (elScoreSkipped) elScoreSkipped.textContent = skippedCount;
  
  const percent = Math.round((correctCount / totalCount) * 100);
  let message = '';
  if (percent >= 90) {
    message = '🎉 Xuất sắc! Bạn nắm vững kiến thức!';
  } else if (percent >= 70) {
    message = '👍 Tốt lắm! Cần ôn thêm một số chủ đề nhé.';
  } else if (percent >= 50) {
    message = '💪 Cố gắng thêm! Hãy xem lại các phần kiến thức bị sai.';
  } else {
    message = '📖 Cần ôn tập lại! Đọc kỹ lý thuyết và thử lại nhé.';
  }
  const elScoreText = document.getElementById('score-text');
  if (elScoreText) elScoreText.textContent = message;
  
  const circle = document.getElementById('score-circle');
  if (circle) {
    if (percent >= 70) {
      circle.style.borderColor = 'var(--color-success)';
    } else if (percent >= 50) {
      circle.style.borderColor = 'var(--color-accent)';
    } else {
      circle.style.borderColor = 'var(--color-error)';
    }
  }
  
  const modal = document.getElementById('quiz-result-modal');
  if (modal) modal.style.display = 'flex';
  
  const btnSubmit = document.getElementById('btn-submit-quiz');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = '✅ Đã nộp bài';
  }
  
  saveQuizResult(correctCount, wrongCount, skippedCount);
}

// =====================================================================
// TÍNH NĂNG: XEM LẠI VÀ LÀM LẠI
// =====================================================================

function reviewQuiz() {
  const modal = document.getElementById('quiz-result-modal');
  if (modal) modal.style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function retryQuiz() {
  userAnswers = {};
  quizSubmitted = false;
  
  localStorage.removeItem(`pylearn_${currentLessonKey}_quiz_answers`);
  localStorage.removeItem(`pylearn_${currentLessonKey}_quiz_result`);
  
  const modal = document.getElementById('quiz-result-modal');
  if (modal) modal.style.display = 'none';
  
  renderQuizQuestions();
  renderQuizMap();
  updateQuizProgress();
  
  const btnSubmit = document.getElementById('btn-submit-quiz');
  if (btnSubmit) {
    btnSubmit.disabled = false;
    btnSubmit.textContent = '📝 Nộp bài';
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================================================================
// TÍNH NĂNG: LƯU VÀ KHÔI PHỤC TIẾN TRÌNH (localStorage)
// =====================================================================

function saveQuizProgress() {
  localStorage.setItem(`pylearn_${currentLessonKey}_quiz_answers`, JSON.stringify(userAnswers));
}

function saveQuizResult(correct, wrong, skipped) {
  const result = { correct, wrong, skipped, submittedAt: new Date().toISOString() };
  localStorage.setItem(`pylearn_${currentLessonKey}_quiz_result`, JSON.stringify(result));

  // Đồng bộ kết quả lên Firebase (nếu đã đăng nhập)
  if (typeof syncQuizResultToFirebase === 'function') {
    syncQuizResultToFirebase(currentLessonKey, { correct, wrong, skipped });
  }
}

function loadQuizProgress() {
  const savedAnswers = localStorage.getItem(`pylearn_${currentLessonKey}_quiz_answers`);
  if (savedAnswers) {
    userAnswers = JSON.parse(savedAnswers);
    
    for (const [questionId, optionIndex] of Object.entries(userAnswers)) {
      const radio = document.getElementById(`q${questionId}-opt${optionIndex}`);
      if (radio) radio.checked = true;
      
      const cell = document.getElementById(`map-cell-${questionId}`);
      if (cell) cell.classList.add('answered');
    }
    updateQuizProgress();
  }
  
  const savedResult = localStorage.getItem(`pylearn_${currentLessonKey}_quiz_result`);
  if (savedResult) {
    quizSubmitted = false; 
    submitQuiz();
  }
}

// =====================================================================
// HÀM TIỆN ÍCH
// =====================================================================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatInlineCode(text) {
  return text.replace(/`([^`]+)`/g, '<code>$1</code>');
}

function splitQuestionAndCode(questionText) {
  const mdPattern = /([\s\S]*?)```(?:python)?\s*\n?([\s\S]*?)```([\s\S]*)/i;
  const mdMatch = questionText.match(mdPattern);
  if (mdMatch) {
    const text = (mdMatch[1].trim() + " " + mdMatch[3].trim()).trim();
    const code = mdMatch[2].trim();
    return { text, code };
  }
  
  if (questionText.includes('\n\n')) {
    const parts = questionText.split('\n\n');
    return { text: parts[0].trim(), code: parts.slice(1).join('\n\n').trim() };
  }
  
  const codePatterns = [
    /^(.*?:)\s*\n([\s\S]+)$/,
    /^(.*?)\n((?:[a-z_][\w]*\s*[=(]|print|for |while |if |def |import ).*)$/im
  ];
  
  for (const pattern of codePatterns) {
    const match = questionText.match(pattern);
    if (match && match[1].trim() !== '') {
      return { text: match[1], code: match[2].trim() };
    }
  }
  
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
 * Khởi tạo Quiz với dữ liệu bài học cụ thể
 */
function initQuiz(quizData, lessonKey) {
  currentQuizData = quizData;
  currentLessonKey = lessonKey;
  
  renderQuizQuestions();
  renderQuizMap();
  
  const btnSubmit = document.getElementById('btn-submit-quiz');
  if (btnSubmit) btnSubmit.addEventListener('click', submitQuiz);
  
  const btnClose = document.getElementById('btn-close-modal');
  if (btnClose) btnClose.addEventListener('click', () => {
    document.getElementById('quiz-result-modal').style.display = 'none';
  });
  
  const btnReview = document.getElementById('btn-review-quiz');
  if (btnReview) btnReview.addEventListener('click', reviewQuiz);
  
  const btnRetry = document.getElementById('btn-retry-quiz');
  if (btnRetry) btnRetry.addEventListener('click', retryQuiz);
  
  const modalOverlay = document.getElementById('quiz-result-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        modalOverlay.style.display = 'none';
      }
    });
  }
  
  loadQuizProgress();
}
