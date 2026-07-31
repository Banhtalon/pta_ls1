// =====================================================================
// APP.JS - Điểm khởi chạy chính của ứng dụng PyLearn
// Khởi tạo router, tải Pyodide, quản lý header
// =====================================================================

window.pyodideInstance = null;

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzt_lsTKUBK54kuOdowYcnFuQaQvLzC6LDFZOchRPDaPkfukueiD9xjpQ-yv8DazGkxNg/exec";

/**
 * Trạng thái Python runtime
 */
function initPyodide() {
  // Thay vì khởi tạo Pyodide trên main thread, ta dựa vào python-runner.js
  window.pyodideInstance = window.pythonRunner;
  
  const statusEl = document.getElementById('pyodide-status');
  if (statusEl) {
    statusEl.innerHTML = '✅ Python runtime (Web Worker) đã sẵn sàng!';
    statusEl.classList.add('ready');
  }
  
  const btnRun = document.getElementById('btn-run-code');
  if (btnRun) btnRun.disabled = false;
}

/**
 * Thu thập dữ liệu của bài học hiện tại và gửi báo cáo
 */
async function submitReport() {
  // Lấy route hiện tại để biết đang ở level nào, bài nào
  const route = typeof parseRoute === 'function' ? parseRoute(window.location.hash) : null;
  if (!route || route.page !== 'lesson') {
    alert("Vui lòng vào bài học cụ thể để nộp báo cáo!");
    return;
  }
  
  const studentNameInput = document.getElementById('student-name');
  if (!studentNameInput) return;
  const studentName = studentNameInput.value.trim();
  
  if (!studentName) {
    alert("Vui lòng nhập họ tên của bạn trước khi nộp bài!");
    studentNameInput.focus();
    return;
  }
  
  const levelId = route.level;
  const lessonId = route.lessonId;
  const lessonKey = `${levelId}_${lessonId}`;
  
  // Tính điểm Quiz
  const savedAnswers = localStorage.getItem(`pylearn_${lessonKey}_quiz_answers`);
  let correctQuizCount = 0;
  if (savedAnswers && window.currentQuizData) {
    const answers = JSON.parse(savedAnswers);
    window.currentQuizData.forEach(q => {
      if (answers[q.id] !== undefined && answers[q.id] === q.correctAnswer) {
        correctQuizCount++;
      }
    });
  }
  
  // Tính điểm Practice
  const savedPractice = localStorage.getItem(`pylearn_${lessonKey}_practice_completed`);
  let completedPracticeCount = 0;
  if (savedPractice) {
    const practiceProgress = JSON.parse(savedPractice);
    for (let key in practiceProgress) {
      if (practiceProgress[key] === true) completedPracticeCount++;
    }
  }
  
  const btnSubmit = document.getElementById('btn-submit-report');
  const originalText = btnSubmit.textContent;
  btnSubmit.textContent = "Đang gửi...";
  btnSubmit.disabled = true;
  
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name: studentName,
        level: levelId,
        lesson: lessonId,
        quizScore: correctQuizCount,
        practiceProgress: completedPracticeCount
      })
    });
    
    const result = await response.json();
    if (result.status === 'success') {
      alert(`Nộp bài thành công!\n- Bạn trả lời đúng ${correctQuizCount} câu lý thuyết.\n- Bạn đã hoàn thành ${completedPracticeCount} bài thực hành.`);
    } else {
      alert("Có lỗi xảy ra khi nộp bài: " + result.message);
    }
  } catch (error) {
    console.error("Lỗi gửi báo cáo:", error);
    alert("Lỗi kết nối hoặc báo cáo chưa được cấu hình. Chi tiết trong console.");
  } finally {
    btnSubmit.textContent = originalText;
    btnSubmit.disabled = false;
  }
}

/**
 * Cập nhật giao diện header tùy theo route hiện tại
 * (chỉ hiện nút báo cáo khi ở trang lesson)
 */
function updateHeaderForRoute(route) {
  const authSection = document.querySelector('.auth-section');
  
  if (authSection) {
    // Luôn hiển thị phần tài khoản học sinh trên tất cả các trang
    authSection.style.display = 'flex';
  }
  
  // Cập nhật trạng thái active cho menu nav
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  let navTarget = 'home';
  if (route.page === 'list' || route.page === 'lesson') {
    navTarget = route.level;
  }
  
  const activeLink = document.querySelector(`.main-nav .nav-link[data-nav="${navTarget}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

/**
 * Điểm khởi chạy của toàn bộ ứng dụng
 */
document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo router
  if (typeof initRouter === 'function') {
    initRouter();
  }
  
  // Tải Pyodide
  initPyodide();
  
  // Cài đặt nút gửi báo cáo
  const btnSubmit = document.getElementById('btn-submit-report');
  if (btnSubmit) {
    btnSubmit.addEventListener('click', submitReport);
  }
});
