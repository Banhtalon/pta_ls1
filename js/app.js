// =====================================================================
// APP.JS - Logic điều hướng chính + Khởi tạo Pyodide
// Quản lý chuyển tab, tải Python runtime, khởi tạo toàn bộ ứng dụng
// =====================================================================

// ---------------------------------------------------------------------
// BIẾN TOÀN CỤC
// ---------------------------------------------------------------------

// Tham chiếu đến Pyodide instance (Python runtime trong trình duyệt)
window.pyodideInstance = null;

// =====================================================================
// TÍNH NĂNG: CHUYỂN TAB (LÝ THUYẾT / THỰC HÀNH)
// =====================================================================

/**
 * Chuyển đổi giữa tab Lý thuyết và Thực hành.
 * Ẩn section cũ, hiện section mới, cập nhật trạng thái tab.
 *
 * @param {string} tabName - Tên tab: "quiz" hoặc "practice"
 */
function switchTab(tabName) {
  // -----------------------------------------------------------------
  // BƯỚC 1: Cập nhật trạng thái active cho tab trên header
  // -----------------------------------------------------------------
  const allTabs = document.querySelectorAll('.nav-tab');
  allTabs.forEach(tab => tab.classList.remove('active'));

  const activeTab = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
  if (activeTab) activeTab.classList.add('active');

  // -----------------------------------------------------------------
  // BƯỚC 2: Ẩn tất cả section, hiện section được chọn
  // -----------------------------------------------------------------
  const allSections = document.querySelectorAll('.content-section');
  allSections.forEach(section => section.classList.remove('active'));

  const activeSection = document.getElementById(`section-${tabName}`);
  if (activeSection) activeSection.classList.add('active');

  // -----------------------------------------------------------------
  // BƯỚC 3: Cuộn lên đầu trang
  // -----------------------------------------------------------------
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Gắn sự kiện click cho các tab trên header.
 */
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
}

// =====================================================================
// TÍNH NĂNG: TẢI PYODIDE (PYTHON RUNTIME)
// =====================================================================

/**
 * Tải và khởi tạo Pyodide - cho phép chạy code Python trong trình duyệt.
 *
 * Pyodide là thư viện WebAssembly biên dịch CPython sang trình duyệt.
 * Lần đầu tải có thể mất 5-10 giây tùy tốc độ mạng.
 */
async function initPyodide() {
  const statusEl = document.getElementById('pyodide-status');

  try {
    // Tải Pyodide từ CDN
    // loadPyodide() là hàm toàn cục do script pyodide.js cung cấp
    window.pyodideInstance = await loadPyodide();

    // Cập nhật trạng thái: sẵn sàng
    statusEl.innerHTML = '✅ Python runtime đã sẵn sàng!';
    statusEl.classList.add('ready');

    // Kích hoạt nút Kiểm tra
    document.getElementById('btn-run-code').disabled = false;

  } catch (error) {
    // Cập nhật trạng thái: lỗi
    statusEl.innerHTML = `❌ Không thể tải Python runtime. Kiểm tra kết nối mạng. <br>
      <small>Lỗi: ${error.message}</small>`;
    statusEl.classList.add('error');
    console.error('Lỗi khi tải Pyodide:', error);
  }
}

// =====================================================================
// TÍNH NĂNG: NỘP BÁO CÁO (GOOGLE SHEETS)
// =====================================================================

// Đường link Web App của Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzt_lsTKUBK54kuOdowYcnFuQaQvLzC6LDFZOchRPDaPkfukueiD9xjpQ-yv8DazGkxNg/exec";

/**
 * Thu thập dữ liệu và gửi lên Google Sheets
 */
async function submitReport() {
  const nameInput = document.getElementById('student-name');
  const studentName = nameInput.value.trim();

  if (!studentName) {
    alert("Vui lòng nhập họ tên của bạn trước khi nộp bài!");
    nameInput.focus();
    return;
  }

  // Thu thập dữ liệu Lý thuyết
  const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
  let correctQuizCount = 0;
  for (let key in quizAnswers) {
    if (quizAnswers[key].isCorrect) {
      correctQuizCount++;
    }
  }

  // Thu thập dữ liệu Thực hành
  const practiceProgress = JSON.parse(localStorage.getItem('practiceProgress')) || {};
  let completedPracticeCount = 0;
  for (let key in practiceProgress) {
    if (practiceProgress[key] === true) {
      completedPracticeCount++;
    }
  }

  // Hiển thị trạng thái đang gửi
  const btnSubmit = document.getElementById('btn-submit-report');
  const originalText = btnSubmit.textContent;
  btnSubmit.textContent = "Đang gửi...";
  btnSubmit.disabled = true;

  try {
    // Gọi API (Google Apps Script)
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      // Chú ý: Google Apps Script Web App yêu cầu header là text/plain để tránh lỗi CORS preflight
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name: studentName,
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
    // Nếu link Web App chưa được thay thế, báo cho người dùng
    if (GOOGLE_SCRIPT_URL.includes("REPLACE_WITH_YOUR_WEB_APP_URL")) {
      alert("Tính năng nộp bài chưa được cấu hình! Giáo viên cần nhập link Google Apps Script vào file app.js.");
    } else {
      alert("Lỗi kết nối! Vui lòng thử lại sau.");
    }
  } finally {
    // Khôi phục nút
    btnSubmit.textContent = originalText;
    btnSubmit.disabled = false;
  }
}

// =====================================================================
// KHỞI TẠO TOÀN BỘ ỨNG DỤNG
// =====================================================================

/**
 * Hàm khởi tạo chính - chạy khi trang web tải xong.
 * Thứ tự khởi tạo:
 * 1. Gắn sự kiện tab
 * 2. Khởi tạo phần Quiz
 * 3. Khởi tạo phần Practice
 * 4. Gắn sự kiện nộp báo cáo
 * 5. Tải Pyodide (chạy nền, không chặn giao diện)
 */
document.addEventListener('DOMContentLoaded', () => {
  // BƯỚC 1: Khởi tạo điều hướng tab
  initTabs();

  // BƯỚC 2: Khởi tạo phần Quiz (render câu hỏi, bản đồ)
  initQuiz();

  // BƯỚC 3: Khởi tạo phần Practice (render sidebar, gắn sự kiện)
  initPractice();

  // BƯỚC 4: Gắn sự kiện nộp báo cáo
  document.getElementById('btn-submit-report').addEventListener('click', submitReport);

  // BƯỚC 5: Tải Pyodide ở nền (không cần await và không chặn UI)
  initPyodide();
});
