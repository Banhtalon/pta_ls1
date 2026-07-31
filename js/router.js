// =====================================================================
// ROUTER.JS - Điều hướng dựa trên URL Hash (SPA Router)
// =====================================================================

/**
 * Phân tích hash của URL hiện tại để xác định trang cần hiển thị.
 * Ví dụ: '#/basic/1' → { page: 'lesson', level: 'basic', lessonId: 1 }
 * '#/basic' → { page: 'list', level: 'basic' }
 * '#/' hoặc rỗng → { page: 'dashboard' }
 * '#/login' → { page: 'login' }
 * '#/teacher-dashboard' → { page: 'teacher-dashboard' }
 */
function parseRoute(hash) {
  if (!hash || hash === '#' || hash === '#/') {
    return { page: 'dashboard' };
  }
  
  // Xóa ký tự '#/' ở đầu
  const path = hash.substring(2);
  const parts = path.split('/');

  // Các route đặc biệt (không cần tham số)
  if (parts[0] === 'login') {
    return { page: 'login' };
  }
  if (parts[0] === 'teacher-dashboard') {
    return { page: 'teacher-dashboard' };
  }
  if (parts[0] === 'teacher-login') {
    return { page: 'teacher-login' };
  }
  
  if (parts.length === 1) {
    return { page: 'list', level: parts[0] };
  } else if (parts.length >= 2) {
    return { page: 'lesson', level: parts[0], lessonId: parts[1] };
  }
  
  return { page: 'dashboard' };
}

/**
 * Chuyển hướng đến một URL hash mới.
 */
function navigateTo(hash) {
  window.location.hash = hash;
}

/**
 * Xử lý mỗi khi URL hash thay đổi.
 * Tùy vào route để gọi hàm render tương ứng.
 */
function handleRouteChange() {
  const hash = window.location.hash;
  const route = parseRoute(hash);

  // -------------------------------------------------------------
  // Trang đăng nhập và dashboard giáo viên: KHÔNG cần kiểm tra đăng nhập
  // -------------------------------------------------------------
  if (route.page === 'login') {
    if (typeof renderLoginPage === 'function') {
      renderLoginPage();
    }
    // Ẩn header khi ở trang login
    const header = document.getElementById('main-header');
    if (header) header.style.display = 'none';
    const footer = document.getElementById('main-footer');
    if (footer) footer.style.display = 'none';
    return;
  }

  if (route.page === 'teacher-login') {
    if (typeof renderTeacherLoginPage === 'function') {
      renderTeacherLoginPage();
    }
    const header = document.getElementById('main-header');
    if (header) header.style.display = 'none';
    const footer = document.getElementById('main-footer');
    if (footer) footer.style.display = 'none';
    return;
  }

  if (route.page === 'teacher-dashboard') {
    // Kiem tra phien dang nhap cua giao vien
    const teacherSession = localStorage.getItem('pylearn_teacher_session');
    if (!teacherSession) {
      navigateTo('#/teacher-login');
      return;
    }

    if (typeof renderTeacherDashboard === 'function') {
      renderTeacherDashboard();
    }
    // Ẩn header mặc định, dashboard có header riêng
    const header = document.getElementById('main-header');
    if (header) header.style.display = 'none';
    const footer = document.getElementById('main-footer');
    if (footer) footer.style.display = 'none';
    return;
  }

  // -------------------------------------------------------------
  // Các trang khác: KIỂM TRA ĐĂNG NHẬP trước
  // -------------------------------------------------------------
  if (typeof checkLoginSession === 'function' && !checkLoginSession()) {
    // Chưa đăng nhập → chuyển sang trang login
    navigateTo('#/login');
    return;
  }

  // Hiện lại header và footer cho các trang bình thường
  const header = document.getElementById('main-header');
  if (header) header.style.display = '';
  const footer = document.getElementById('main-footer');
  if (footer) footer.style.display = '';

  // Cập nhật header với thông tin học sinh đang đăng nhập
  if (typeof updateHeaderWithStudent === 'function') {
    updateHeaderWithStudent();
  }

  // Gọi hàm render tương ứng tùy theo trang
  if (route.page === 'dashboard') {
    renderDashboard();
  } else if (route.page === 'list') {
    renderLessonList(route.level);
  } else if (route.page === 'lesson') {
    renderLessonDetail(route.level, route.lessonId);
  }
  
  // Cập nhật trạng thái header (nếu cần thiết, do app.js quản lý)
  if (typeof updateHeaderForRoute === 'function') {
    updateHeaderForRoute(route);
  }
}

/**
 * Khởi tạo router, lắng nghe sự kiện hashchange và xử lý route ban đầu.
 */
function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange(); // Xử lý route khi vừa vào trang
}
