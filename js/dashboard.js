// =====================================================================
// DASHBOARD.JS - Trang chủ (Hiển thị các cấp độ học)
// =====================================================================

/**
 * Tính toán tiến độ học tập cho một cấp độ (dựa vào số bài đã học trong localStorage).
 * 
 * @param {string} levelId - ID của cấp độ ('basic', 'advance', 'intensive')
 * @returns {Object} - Đối tượng chứa completed, total, và phần trăm tiến độ
 */
function calculateLevelProgress(levelId) {
  if (window.ProgressStore) {
    return window.ProgressStore.getLevelProgress(levelId);
  }
  return { completed: 0, total: 0, percent: 0 };
}

/**
 * Render thẻ (card) cho từng cấp độ khóa học.
 */
function renderLevelCard(levelId) {
  const level = COURSE_STRUCTURE[levelId];
  if (!level) return '';
  
  const progress = calculateLevelProgress(levelId);
  
  // Custom icons based on level to match the design
  let headerIcon = '';
  let headerBg = '';
  let headerColor = '';
  
  if (levelId === 'basic') {
    headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`;
    headerBg = 'linear-gradient(90deg, #d4f0d4, #e8f5e9)'; // Light green gradient
    headerColor = '#27ae60';
  } else if (levelId === 'advance') {
    headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`;
    headerBg = 'linear-gradient(90deg, #fcebba, #fff8e1)'; // Light yellow gradient
    headerColor = '#f0a500';
  } else {
    headerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
    headerBg = 'linear-gradient(90deg, #fadbd8, #fdedec)'; // Light red gradient
    headerColor = '#e74c3c';
  }
  
  // Lấy danh sách 3 bài học đầu tiên để hiển thị xem trước
  const previewLessons = level.lessons.slice(0, 3);
  let lessonsPreviewHtml = '';
  
  for (let i = 0; i < previewLessons.length; i++) {
    lessonsPreviewHtml += `
      <li class="lesson-preview-item">
        <span class="check-icon" style="color: ${headerColor}">✓</span> Bài ${i + 1}: ${previewLessons[i].title}
      </li>
    `;
  }
  
  if (level.lessons.length > 3) {
    lessonsPreviewHtml += `
      <li class="lesson-preview-item text-muted">
        <span class="check-icon" style="color: ${headerColor}">✓</span> Và ${level.lessons.length - 3} bài học khác...
      </li>
    `;
  }
  
  return `
    <div class="level-card level-card--${levelId}">
      <div class="level-card-header-block" style="background: ${headerBg};">
        <div class="level-header-icon-box" style="color: ${headerColor}">
          ${headerIcon}
        </div>
      </div>
      
      <div class="level-card-body">
        <h2 class="level-title">${level.title}</h2>
        <p class="level-subtitle">${level.subtitle}</p>
        <p class="level-description">${level.description}</p>
        
        <ul class="level-lessons-preview">
          ${lessonsPreviewHtml}
        </ul>
      </div>
      
      <div class="level-card-footer">
        <div class="level-progress-wrapper">
           <div class="progress-bar">
             <div class="progress-fill" style="width: ${progress.percent}%; background-color: ${headerColor}"></div>
           </div>
           <span class="progress-text">${progress.percent}% (${progress.completed}/${progress.total} bài)</span>
        </div>
        
        <button class="btn-start-level" style="background-color: ${headerColor}" onclick="navigateTo('#/${levelId}')">
          Bắt đầu ngay →
        </button>
      </div>
    </div>
  `;
}

/**
 * Render toàn bộ trang Dashboard vào container #app.
 */
function renderDashboard() {
  const app = document.getElementById('app');
  if (!app) return;
  
  app.innerHTML = `
    <div class="dashboard-page">
      <!-- ===== HERO SECTION ===== -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-content">
            <h1 class="hero-title">Học Lập Trình Python</h1>
            <p class="hero-subtitle">Từ cơ bản đến chuyên sâu, nền tảng vững chắc để<br>bạn chinh phục thế giới lập trình.</p>
          </div>
          
          <div class="hero-graphics">
             <div class="mock-editor">
                <div class="mock-editor-header">
                   <span class="dot dot-red"></span>
                   <span class="dot dot-yellow"></span>
                   <span class="dot dot-green"></span>
                </div>
                <div class="mock-editor-body">
                   <pre><code><span class="kw">import</span> sys

<span class="kw">def</span> <span class="fn">run_smart_test</span>():
    <span class="kw">if</span> x &gt; <span class="num">0</span>:
        <span class="fn">print</span>(<span class="str">"Python is awesome!"</span>)
    <span class="kw">return</span> <span class="num">42</span>

<span class="fn">run_smart_test</span>()</code></pre>
                </div>
             </div>
             
             <!-- Floating decorations -->
             <div class="floating-item float-python">🐍</div>
             <div class="floating-item float-search">🔍</div>
             <div class="floating-item float-doc">📄</div>
          </div>
        </div>
      </section>
      
      <!-- ===== LEVELS SECTION ===== -->
      <section class="levels-section">
        <div class="levels-container">
          ${renderLevelCard('basic')}
          ${renderLevelCard('advance')}
          ${renderLevelCard('intensive')}
        </div>
      </section>
    </div>
  `;
}
