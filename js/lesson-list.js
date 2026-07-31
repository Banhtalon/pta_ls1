// =====================================================================
// LESSON-LIST.JS - Trang danh sách các bài học của một cấp độ
// =====================================================================

/**
 * Render một thẻ đại diện cho một bài học.
 */
function renderLessonCard(levelId, lesson, index) {
  const isPublished = lesson.status === 'published';
  let isCompleted = false;
  if (isPublished && window.ProgressStore) {
    isCompleted = window.ProgressStore.isLessonCompleted(levelId, lesson.id);
  }
  const statusClass = isCompleted ? 'completed' : (isPublished ? '' : 'draft');
  const statusIcon = isCompleted ? '✅ Hoàn thành' : (isPublished ? '⭐ Chưa học' : '🔒 Sắp cập nhật');
  const levelColor = isPublished ? COURSE_STRUCTURE[levelId].color : '#8a9bb3';
  
  return `
    <div class="lesson-card ${statusClass}" style="${isPublished ? '' : 'opacity: 0.7'}">
      <div class="lesson-card-number" style="background-color: ${levelColor}">${index + 1}</div>
      <div class="lesson-card-content">
        <h3 class="lesson-card-title">${lesson.title}</h3>
        <p class="lesson-card-description">${lesson.description}</p>
        <div class="lesson-card-footer">
          <span class="lesson-card-status">${statusIcon}</span>
          <button class="btn-start-lesson" style="background-color: ${levelColor}; ${isPublished ? '' : 'cursor: not-allowed;'}" ${isPublished ? `onclick="navigateTo('#/${levelId}/${lesson.id}')"` : 'disabled'}>
            ${isCompleted ? 'Học lại ↻' : (isPublished ? 'Học tiếp →' : 'Chưa mở')}
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render trang danh sách bài học của cấp độ tương ứng.
 * 
 * @param {string} levelId - ID cấp độ cần hiển thị
 */
function renderLessonList(levelId) {
  const app = document.getElementById('app');
  if (!app) return;
  
  const level = COURSE_STRUCTURE[levelId];
  
  // Nếu ID không hợp lệ, quay về trang chủ
  if (!level) {
    navigateTo('#/');
    return;
  }
  
  // Tính tổng số bài đã hoàn thành để hiển thị progress tổng quan
  let completedCount = 0;
  let publishedCount = 0;
  let progressPercent = 0;
  
  if (window.ProgressStore) {
    const progress = window.ProgressStore.getLevelProgress(levelId);
    completedCount = progress.completed;
    publishedCount = progress.total;
    progressPercent = progress.percent;
  }
  
  app.innerHTML = `
    <div class="lesson-list-page">
      <!-- ===== BREADCRUMB ===== -->
      <nav class="breadcrumb">
        <a href="#/" class="breadcrumb-item">🏠 Trang chủ</a>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-item active">${level.title}</span>
      </nav>
      
      <!-- ===== LEVEL HEADER ===== -->
      <div class="level-header" style="border-left-color: ${level.color}">
        <div class="level-header-info">
          <span class="level-header-icon" style="background-color: ${level.colorLight}; color: ${level.color}">${level.icon}</span>
          <div>
            <h1 class="level-header-title">Cấp độ ${level.title}</h1>
            <p class="level-header-description">${level.description}</p>
          </div>
        </div>
        <div class="level-header-progress">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="font-weight: 600; color: #fff;">Tiến độ của bạn</span>
            <span style="color: ${level.color}; font-weight: bold;">${progressPercent}%</span>
          </div>
          <div class="progress-bar" style="height: 10px; background-color: #2a3441; border-radius: 5px;">
            <div class="progress-fill" style="width: ${progressPercent}%; background-color: ${level.color}; height: 100%; border-radius: 5px; transition: width 0.3s ease;"></div>
          </div>
          <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #8a9bb3; text-align: right;">Đã hoàn thành ${completedCount}/${publishedCount} bài</p>
        </div>
      </div>
      
      <!-- ===== LESSONS GRID ===== -->
      <div class="lessons-grid">
        ${level.lessons.map((lesson, index) => renderLessonCard(levelId, lesson, index)).join('')}
      </div>
    </div>
  `;
}
