// =====================================================================
// LESSON-DETAIL.JS - Giao diện trang học tập (Lý thuyết + Thực hành)
// =====================================================================

// Trạng thái bài học hiện tại
let currentLevelId = null;
let currentLessonId = null;

/**
 * Tải dữ liệu bài học động từ file js tương ứng
 */
async function loadLessonData(levelId, lessonId) {
  const key = `${levelId}_${lessonId}`;
  
  if (window.LESSON_DATA && window.LESSON_DATA[key]) {
    return window.LESSON_DATA[key];
  }
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `js/data/${levelId}/lesson-${lessonId}.js`;
    script.onload = () => {
      if (window.LESSON_DATA && window.LESSON_DATA[key]) {
        resolve(window.LESSON_DATA[key]);
      } else {
        reject(new Error(`Dữ liệu bài học ${key} không tìm thấy.`));
      }
    };
    script.onerror = () => reject(new Error(`Không thể tải dữ liệu bài ${levelId}/${lessonId}`));
    document.head.appendChild(script);
  });
}

/**
 * Chuyển tab giữa Quiz và Practice trong trang chi tiết
 */
function switchLessonTab(tabName) {
  // Bỏ active các tab
  document.querySelectorAll('.lesson-tab').forEach(t => t.classList.remove('active'));
  const activeTabBtn = document.querySelector(`.lesson-tab[data-lesson-tab="${tabName}"]`);
  if (activeTabBtn) activeTabBtn.classList.add('active');
  
  // Bỏ active content
  document.querySelectorAll('.lesson-tab-content').forEach(c => c.classList.remove('active'));
  const activeContent = document.getElementById(`lesson-${tabName}-content`);
  if (activeContent) activeContent.classList.add('active');
}

/**
 * Render trang chi tiết bài học
 */
async function renderLessonDetail(levelId, lessonId) {
  const app = document.getElementById('app');
  currentLevelId = levelId;
  currentLessonId = lessonId;
  
  const level = COURSE_STRUCTURE[levelId];
  if (!level) { navigateTo('#/'); return; }
  
  const lessonIndex = level.lessons.findIndex(l => l.id == lessonId);
  const lesson = level.lessons[lessonIndex];
  
  if (!lesson) { navigateTo(`#/${levelId}`); return; }
  
  if (lesson.status === 'draft') {
    app.innerHTML = `
      <div class="lesson-detail-page">
        <nav class="breadcrumb">
          <a href="#/" class="breadcrumb-item">🏠 Trang chủ</a>
          <span class="breadcrumb-separator">›</span>
          <a href="#/${levelId}" class="breadcrumb-item">${level.title}</a>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-item active">${lesson.title}</span>
        </nav>
        <div style="padding: 4rem 2rem; text-align: center; color: white;">
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">🚧 Sắp cập nhật</h2>
          <p style="color: #8a9bb3; margin-bottom: 2rem;">Bài học "${lesson.title}" đang trong quá trình hoàn thiện.</p>
          <button onclick="navigateTo('#/${levelId}')" class="btn-primary">Quay lại danh sách</button>
        </div>
      </div>
    `;
    return;
  }
  
  // Tải dữ liệu câu hỏi và thực hành động
  let lessonData;
  try {
    lessonData = await loadLessonData(levelId, lessonId);
  } catch (error) {
    console.error(error);
    app.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: white;">
        <h2>Oops! Có lỗi xảy ra.</h2>
        <p>${error.message}</p>
        <button onclick="navigateTo('#/${levelId}')" class="btn-primary" style="margin-top: 1rem;">Quay lại danh sách</button>
      </div>`;
    return;
  }
  
  const prevLesson = lessonIndex > 0 ? level.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < level.lessons.length - 1 ? level.lessons[lessonIndex + 1] : null;
  
  const lessonKey = `${levelId}_${lessonId}`;
  
  // Hủy state cũ nếu có
  if (typeof cleanupQuiz === 'function') cleanupQuiz();
  if (typeof cleanupPractice === 'function') cleanupPractice();
  
  app.innerHTML = `
    <div class="lesson-detail-page">
      <!-- ===== BREADCRUMB ===== -->
      <nav class="breadcrumb">
        <a href="#/" class="breadcrumb-item">🏠 Trang chủ</a>
        <span class="breadcrumb-separator">›</span>
        <a href="#/${levelId}" class="breadcrumb-item">${level.title}</a>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-item active">${lesson.title}</span>
      </nav>
      
      <!-- ===== LESSON NAV (PREV/NEXT) ===== -->
      <div class="lesson-nav-bar">
        ${prevLesson ? `<a href="#/${levelId}/${prevLesson.id}" class="btn-nav-lesson btn-prev">← Bài trước</a>` : '<span></span>'}
        <h2 class="lesson-nav-title">${lesson.title}</h2>
        ${nextLesson ? `<a href="#/${levelId}/${nextLesson.id}" class="btn-nav-lesson btn-next">Bài kế tiếp →</a>` : '<span></span>'}
      </div>
      
      <!-- ===== TABS ===== -->
      <div class="lesson-tabs">
        <button class="lesson-tab active" data-lesson-tab="quiz" onclick="switchLessonTab('quiz')">📝 Trắc nghiệm</button>
        <button class="lesson-tab" data-lesson-tab="practice" onclick="switchLessonTab('practice')">💻 Thực hành</button>
      </div>
      
      <!-- ===== TAB CONTENT ===== -->
      <div class="lesson-content">
        <!-- TAB QUIZ -->
        <div id="lesson-quiz-content" class="lesson-tab-content active">
          <div class="quiz-layout">
            <div class="quiz-questions-area">
              <div class="quiz-header">
                <h1>Bài tập: ${lesson.title}</h1>
                <p class="quiz-description">Hoàn thành ${lessonData.quizData.length} câu hỏi trắc nghiệm để kiểm tra kiến thức lý thuyết.</p>
              </div>
              <div id="quiz-questions-container"></div>
              <div class="quiz-submit-area">
                <button id="btn-submit-quiz" class="btn-primary btn-large">📝 Nộp bài</button>
              </div>
            </div>
            
            <div class="quiz-map-area">
              <div class="quiz-map-sticky">
                <h3 class="quiz-map-title">Bản đồ câu hỏi</h3>
                <p class="quiz-map-progress" id="quiz-progress">Tiến độ: 0/${lessonData.quizData.length}</p>
                <div class="quiz-map-grid" id="quiz-map-grid"></div>
                <div class="quiz-map-legend">
                  <div class="legend-item"><span class="legend-dot legend-dot-default"></span>Chưa trả lời</div>
                  <div class="legend-item"><span class="legend-dot legend-dot-answered"></span>Đã trả lời</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- TAB PRACTICE -->
        <div id="lesson-practice-content" class="lesson-tab-content">
          <div class="practice-layout">
            <aside class="practice-sidebar" id="practice-sidebar">
              <h3 class="sidebar-title">Danh sách bài tập</h3>
              <div id="practice-list-container"></div>
            </aside>
            <div class="practice-main">
              <div class="practice-header" id="practice-header">
                <div class="practice-title-row">
                  <h2 id="practice-title">Chọn một bài tập để bắt đầu</h2>
                  <span class="difficulty-badge" id="practice-difficulty"></span>
                </div>
                <p id="practice-description" class="practice-description">Chọn bài tập từ danh sách bên trái.</p>
              </div>
              
              <div class="hints-section" id="hints-section" style="display: none;">
                <button class="btn-hints-toggle" id="btn-hints-toggle">💡 Gợi ý</button>
                <div class="hints-content" id="hints-content"></div>
              </div>
              
              <div class="code-editor-section" id="code-editor-section" style="display: none;">
                <div class="editor-toolbar">
                  <span class="editor-filename">main.py</span>
                  <button class="btn-run" id="btn-run-code">▶ Kiểm tra</button>
                </div>
                <div class="editor-wrapper">
                  <textarea id="code-editor" class="code-textarea" spellcheck="false" placeholder="# Viết code Python của bạn ở đây..."></textarea>
                </div>
              </div>
              
              <div class="results-section" id="results-section" style="display: none;">
                <h3 class="results-title">📋 Kết quả</h3>
                <div id="results-container"></div>
              </div>
              
              <div class="pyodide-status" id="pyodide-status">
                <span class="loading-spinner"></span>Đang tải Python runtime...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quiz Result Modal -->
    <div class="modal-overlay" id="quiz-result-modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2>📊 Kết quả bài kiểm tra</h2>
          <button class="btn-close-modal" id="btn-close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="score-circle" id="score-circle">
            <span class="score-number" id="score-number">0</span>
            <span class="score-label" id="score-total-label">/${lessonData.quizData.length}</span>
          </div>
          <p class="score-text" id="score-text">Bạn đã hoàn thành bài kiểm tra!</p>
          <div class="score-details">
            <div class="score-detail correct"><span class="detail-icon">✅</span><span class="detail-label">Đúng:</span><span class="detail-value" id="score-correct">0</span></div>
            <div class="score-detail wrong"><span class="detail-icon">❌</span><span class="detail-label">Sai:</span><span class="detail-value" id="score-wrong">0</span></div>
            <div class="score-detail skipped"><span class="detail-icon">⬜</span><span class="detail-label">Bỏ qua:</span><span class="detail-value" id="score-skipped">0</span></div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" id="btn-review-quiz">🔍 Xem lại đáp án</button>
          <button class="btn-primary" id="btn-retry-quiz">🔄 Làm lại</button>
        </div>
      </div>
    </div>
  `;
  
  // Khởi tạo Quiz và Practice với dữ liệu vừa load
  initQuiz(lessonData.quizData, lessonKey);
  initPractice(lessonData.practiceData, lessonKey);
  
  // Cập nhật trạng thái Pyodide nếu đã tải xong
  if (window.pyodideInstance) {
    const statusEl = document.getElementById('pyodide-status');
    if (statusEl) {
      statusEl.innerHTML = '✅ Python runtime đã sẵn sàng!';
      statusEl.classList.add('ready');
    }
  }
}
