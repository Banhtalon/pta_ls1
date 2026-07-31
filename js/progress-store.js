// =====================================================================
// PROGRESS-STORE.JS - Quản lý tiến độ học tập đồng nhất
// =====================================================================

const ProgressStore = {
  /**
   * Lấy tổng số bài học đã được publish trong một cấp độ.
   */
  getPublishedCount(levelId) {
    const level = COURSE_STRUCTURE[levelId];
    if (!level) return 0;
    return level.lessons.filter(l => l.status === 'published').length;
  },

  /**
   * Kiểm tra xem học sinh đã hoàn thành một bài học (trắc nghiệm + thực hành) chưa.
   */
  isLessonCompleted(levelId, lessonId) {
    const lessonKey = `${levelId}_${lessonId}`;
    
    // Tạm tính hoàn thành khi có kết quả quiz (hoặc có tiến độ thực hành)
    const quizResult = localStorage.getItem(`pylearn_${lessonKey}_quiz_result`);
    const practiceProgress = localStorage.getItem(`pylearn_${lessonKey}_practice_completed`);
    
    return !!(quizResult || practiceProgress);
  },

  /**
   * Tính toán tiến độ học tập cho một cấp độ (chỉ tính bài published).
   * @returns {Object} { completed, total, percent }
   */
  getLevelProgress(levelId) {
    const level = COURSE_STRUCTURE[levelId];
    if (!level) return { completed: 0, total: 0, percent: 0 };
    
    const publishedLessons = level.lessons.filter(l => l.status === 'published');
    const total = publishedLessons.length;
    let completed = 0;
    
    for (const lesson of publishedLessons) {
      if (this.isLessonCompleted(levelId, lesson.id)) {
        completed++;
      }
    }
    
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percent };
  }
};

window.ProgressStore = ProgressStore;
