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
// KHỞI TẠO TOÀN BỘ ỨNG DỤNG
// =====================================================================

/**
 * Hàm khởi tạo chính - chạy khi trang web tải xong.
 * Thứ tự khởi tạo:
 * 1. Gắn sự kiện tab
 * 2. Khởi tạo phần Quiz
 * 3. Khởi tạo phần Practice
 * 4. Tải Pyodide (chạy nền, không chặn giao diện)
 */
document.addEventListener('DOMContentLoaded', () => {
  // BƯỚC 1: Khởi tạo điều hướng tab
  initTabs();

  // BƯỚC 2: Khởi tạo phần Quiz (render câu hỏi, bản đồ)
  initQuiz();

  // BƯỚC 3: Khởi tạo phần Practice (render sidebar, gắn sự kiện)
  initPractice();

  // BƯỚC 4: Tải Pyodide ở nền (không cần await vì không chặn UI)
  initPyodide();
});
