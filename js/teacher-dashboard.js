// =====================================================================
// TEACHER-DASHBOARD.JS - Trang Dashboard quản lý dành cho Giáo viên
// Quản lý lớp học, học sinh và theo dõi tiến độ làm bài
// =====================================================================

// ---------------------------------------------------------------------
// BIẾN TOÀN CỤC cho Dashboard
// ---------------------------------------------------------------------

// Tab đang được chọn trên Dashboard: 'overview' | 'classes' | 'students' | 'progress'
let dashboardActiveTab = 'overview';

// Lớp đang được chọn để xem chi tiết
let selectedClassId = '';

// Khóa học đang được chọn để xem tiến độ: 'basic' | 'advance' | 'intensive'
let selectedCourseId = 'basic';

// =====================================================================
// TÍNH NĂNG: RENDER TRANG DASHBOARD CHÍNH
// =====================================================================

/**
 * Render toàn bộ trang Dashboard giáo viên vào #app.
 * Bao gồm: Sidebar bên trái + Nội dung chính bên phải.
 */
function renderTeacherDashboard() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="td-container">
      <!-- SIDEBAR bên trái -->
      <aside class="td-sidebar">
        <div class="td-sidebar-header">
          <span class="td-sidebar-icon">👩‍🏫</span>
          <h2 class="td-sidebar-title">Dashboard</h2>
        </div>

        <nav class="td-sidebar-nav">
          <button class="td-nav-btn ${dashboardActiveTab === 'overview' ? 'active' : ''}" 
                  onclick="switchDashboardTab('overview')">
            <span class="td-nav-icon">📊</span> Tổng quan
          </button>
          <button class="td-nav-btn ${dashboardActiveTab === 'classes' ? 'active' : ''}" 
                  onclick="switchDashboardTab('classes')">
            <span class="td-nav-icon">🏫</span> Quản lý lớp
          </button>
          <button class="td-nav-btn ${dashboardActiveTab === 'students' ? 'active' : ''}" 
                  onclick="switchDashboardTab('students')">
            <span class="td-nav-icon">👥</span> Quản lý học sinh
          </button>
          <button class="td-nav-btn ${dashboardActiveTab === 'progress' ? 'active' : ''}" 
                  onclick="switchDashboardTab('progress')">
            <span class="td-nav-icon">📈</span> Tiến độ học tập
          </button>
        </nav>

        <div class="td-sidebar-footer">
          <a href="#/" class="td-back-link">← Quay lại trang học</a>
        </div>
      </aside>

      <!-- NỘI DUNG CHÍNH bên phải -->
      <main class="td-main" id="td-main-content">
        <!-- Nội dung sẽ được render bởi các hàm tab -->
      </main>
    </div>
  `;

  // Render nội dung tab đang chọn
  renderDashboardTabContent();
}

/**
 * Chuyển tab trên Dashboard.
 * Gọi khi người dùng click vào nút trên sidebar.
 */
function switchDashboardTab(tabName) {
  dashboardActiveTab = tabName;

  // Cập nhật trạng thái active cho nút sidebar
  document.querySelectorAll('.td-nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`.td-nav-btn[onclick="switchDashboardTab('${tabName}')"]`);
  if (activeBtn) activeBtn.classList.add('active');

  // Render lại nội dung tab
  renderDashboardTabContent();
}

/**
 * Render nội dung phần chính tùy theo tab đang chọn.
 */
function renderDashboardTabContent() {
  const mainContent = document.getElementById('td-main-content');
  if (!mainContent) return;

  if (dashboardActiveTab === 'overview') {
    renderOverviewTab(mainContent);
  } else if (dashboardActiveTab === 'classes') {
    renderClassesTab(mainContent);
  } else if (dashboardActiveTab === 'students') {
    renderStudentsTab(mainContent);
  } else if (dashboardActiveTab === 'progress') {
    renderProgressTab(mainContent);
  }
}

// =====================================================================
// TÍNH NĂNG: TAB TỔNG QUAN
// =====================================================================

/**
 * Hiển thị tổng quan: Số lớp, số học sinh, tỷ lệ hoàn thành.
 */
async function renderOverviewTab(container) {
  container.innerHTML = `
    <div class="td-page-header">
      <h1 class="td-page-title">📊 Tổng quan</h1>
      <p class="td-page-subtitle">Thống kê chung về các lớp học và tiến độ</p>
    </div>
    <div class="td-loading">Đang tải dữ liệu...</div>
  `;

  try {
    // -------------------------------------------------------------
    // BƯỚC 1: LẤY DỮ LIỆU THỐNG KÊ SONG SONG (PROMISE.ALL)
    // Thay vì chờ tuần tự từng collection (mất 3 lần thời gian chờ network),
    // gọi cả 3 yêu cầu cùng lúc để giảm 60-70% thời gian tải trang.
    // -------------------------------------------------------------
    const [classesSnapshot, studentsSnapshot, progressSnapshot] = await Promise.all([
      window.db.collection('classes').get(),
      window.db.collection('students').get(),
      window.db.collection('progress').get()
    ]);

    const totalClasses = classesSnapshot.size;
    const totalStudents = studentsSnapshot.size;
    const totalSubmissions = progressSnapshot.size;

    // -------------------------------------------------------------
    // BƯỚC 4: HIỂN THỊ CÁC THẺ THỐNG KÊ
    // -------------------------------------------------------------
    container.innerHTML = `
      <div class="td-page-header">
        <h1 class="td-page-title">📊 Tổng quan</h1>
        <p class="td-page-subtitle">Thống kê chung về các lớp học và tiến độ</p>
      </div>

      <div class="td-stats-grid">
        <div class="td-stat-card td-stat-blue">
          <div class="td-stat-icon">🏫</div>
          <div class="td-stat-number">${totalClasses}</div>
          <div class="td-stat-label">Lớp học</div>
        </div>
        <div class="td-stat-card td-stat-green">
          <div class="td-stat-icon">👥</div>
          <div class="td-stat-number">${totalStudents}</div>
          <div class="td-stat-label">Học sinh</div>
        </div>
        <div class="td-stat-card td-stat-orange">
          <div class="td-stat-icon">📝</div>
          <div class="td-stat-number">${totalSubmissions}</div>
          <div class="td-stat-label">Bài đã nộp</div>
        </div>
      </div>

      <div class="td-section">
        <h2 class="td-section-title">Hướng dẫn nhanh</h2>
        <div class="td-guide-cards">
          <div class="td-guide-card" onclick="switchDashboardTab('classes')">
            <span class="td-guide-step">1</span>
            <strong>Tạo lớp học</strong>
            <p>Nhập tên lớp (VD: PTA01) trong tab "Quản lý lớp"</p>
          </div>
          <div class="td-guide-card" onclick="switchDashboardTab('students')">
            <span class="td-guide-step">2</span>
            <strong>Thêm học sinh</strong>
            <p>Thêm danh sách học sinh vào lớp trong tab "Quản lý học sinh"</p>
          </div>
          <div class="td-guide-card" onclick="switchDashboardTab('progress')">
            <span class="td-guide-step">3</span>
            <strong>Theo dõi tiến độ</strong>
            <p>Xem bảng điểm và tiến độ trong tab "Tiến độ học tập"</p>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Lỗi tải tổng quan:', error);
    container.innerHTML = `
      <div class="td-page-header">
        <h1 class="td-page-title">📊 Tổng quan</h1>
      </div>
      <div class="td-error">
        <p>⚠️ Không thể tải dữ liệu. Vui lòng kiểm tra kết nối Firebase.</p>
        <p style="font-size: 0.85rem; opacity: 0.7;">Chi tiết lỗi: ${error.message}</p>
      </div>
    `;
  }
}

// =====================================================================
// TÍNH NĂNG: TAB QUẢN LÝ LỚP
// =====================================================================

/**
 * Hiển thị danh sách các lớp + form tạo lớp mới.
 */
async function renderClassesTab(container) {
  container.innerHTML = `
    <div class="td-page-header">
      <h1 class="td-page-title">🏫 Quản lý lớp học</h1>
      <p class="td-page-subtitle">Tạo và quản lý các lớp học</p>
    </div>

    <!-- Form thêm lớp mới -->
    <div class="td-form-card">
      <h3 class="td-form-title">Tạo lớp mới</h3>
      <div class="td-form-row">
        <input type="text" id="input-new-class" class="td-input" 
               placeholder="Nhập tên lớp (VD: PTA01)..." maxlength="20">
        <button class="td-btn td-btn-primary" onclick="handleCreateClass()">
          + Tạo lớp
        </button>
      </div>
    </div>

    <!-- Danh sách các lớp -->
    <div class="td-section">
      <h2 class="td-section-title">Danh sách lớp</h2>
      <div id="td-classes-list" class="td-classes-grid">
        <div class="td-loading">Đang tải...</div>
      </div>
    </div>
  `;

  // Tải danh sách lớp từ Firestore
  await loadAndRenderClasses();
}

/**
 * Tải danh sách lớp từ Firestore và hiển thị lên giao diện.
 */
async function loadAndRenderClasses() {
  const listContainer = document.getElementById('td-classes-list');
  if (!listContainer) return;

  try {
    // -------------------------------------------------------------
    // TẢI SONG SONG DANH SÁCH LỚP VÀ DANH SÁCH HỌC SINH
    // Tránh gửi N request lặp lại bên trong vòng lặp for (N+1 query problem)
    // -------------------------------------------------------------
    const [classesSnap, studentsSnap] = await Promise.all([
      window.db.collection('classes').orderBy('createdAt', 'desc').get(),
      window.db.collection('students').get()
    ]);

    if (classesSnap.empty) {
      listContainer.innerHTML = `
        <div class="td-empty-state">
          <span class="td-empty-icon">📭</span>
          <p>Chưa có lớp học nào. Hãy tạo lớp đầu tiên!</p>
        </div>
      `;
      return;
    }

    // Đếm số học sinh của mỗi lớp ngay trong bộ nhớ (In-memory group by)
    const studentCountByClass = {};
    studentsSnap.forEach(doc => {
      const cid = doc.data().classId;
      if (cid) {
        studentCountByClass[cid] = (studentCountByClass[cid] || 0) + 1;
      }
    });

    let html = '';
    for (const doc of classesSnap.docs) {
      const classData = doc.data();
      const classId = doc.id;
      const studentCount = studentCountByClass[classId] || 0;
      const safeName = SafeDOM.escapeHTML(classData.name || classId);
      const safeId = SafeDOM.escapeHTML(classId);

      html += `
        <div class="td-class-card">
          <div class="td-class-card-header">
            <span class="td-class-name">${safeName}</span>
            <span class="td-class-count">${studentCount} học sinh</span>
          </div>
          <div class="td-class-card-actions">
            <button class="td-btn td-btn-small td-btn-outline btn-view-students" data-id="${safeId}">
              👥 Xem HS
            </button>
            <button class="td-btn td-btn-small td-btn-danger btn-delete-class" data-id="${safeId}" data-name="${safeName}">
              🗑️ Xóa
            </button>
          </div>
        </div>
      `;
    }

    listContainer.innerHTML = html;
    
    listContainer.querySelectorAll('.btn-view-students').forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectedClassId = e.currentTarget.getAttribute('data-id');
        switchDashboardTab('students');
      });
    });
    
    listContainer.querySelectorAll('.btn-delete-class').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const name = e.currentTarget.getAttribute('data-name');
        handleDeleteClass(id, name);
      });
    });
  } catch (error) {
    console.error('Lỗi tải danh sách lớp:', error);
    listContainer.textContent = `⚠️ Lỗi: ${error.message}`;
    listContainer.className = 'td-error';
  }
}

/**
 * Xử lý khi giáo viên nhấn nút "Tạo lớp".
 */
async function handleCreateClass() {
  const input = document.getElementById('input-new-class');
  if (!input) return;

  const className = input.value.trim().toUpperCase();

  // Kiểm tra đầu vào
  if (!className) {
    alert('Vui lòng nhập tên lớp!');
    input.focus();
    return;
  }

  try {
    // Kiểm tra lớp đã tồn tại chưa
    const existingDoc = await window.db.collection('classes').doc(className).get();
    if (existingDoc.exists) {
      alert(`Lớp "${className}" đã tồn tại!`);
      return;
    }

    // Tạo lớp mới trên Firestore
    await window.db.collection('classes').doc(className).set({
      name: className,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Xóa ô nhập và tải lại danh sách
    input.value = '';
    alert(`Tạo lớp "${className}" thành công!`);
    await loadAndRenderClasses();
  } catch (error) {
    console.error('Lỗi tạo lớp:', error);
    alert('Lỗi khi tạo lớp: ' + error.message);
  }
}

/**
 * Xử lý khi giáo viên nhấn nút "Xóa lớp".
 * Có xác nhận trước khi xóa.
 */
async function handleDeleteClass(classId, className) {
  const confirmed = confirm(
    `⚠️ Bạn có chắc muốn xóa lớp "${className}"?\n\n` +
    `Tất cả học sinh và dữ liệu tiến độ của lớp này sẽ bị xóa!`
  );
  if (!confirmed) return;

  try {
    // Xóa tất cả tiến độ của học sinh trong lớp
    const progressSnap = await window.db.collection('progress')
      .where('classId', '==', classId).get();
    for (const doc of progressSnap.docs) {
      await doc.ref.delete();
    }

    // Xóa tất cả học sinh trong lớp
    const studentsSnap = await window.db.collection('students')
      .where('classId', '==', classId).get();
    for (const doc of studentsSnap.docs) {
      await doc.ref.delete();
    }

    // Xóa lớp
    await window.db.collection('classes').doc(classId).delete();

    alert(`Đã xóa lớp "${className}"!`);
    await loadAndRenderClasses();
  } catch (error) {
    console.error('Lỗi xóa lớp:', error);
    alert('Lỗi khi xóa lớp: ' + error.message);
  }
}

// =====================================================================
// TÍNH NĂNG: TAB QUẢN LÝ HỌC SINH
// =====================================================================

/**
 * Hiển thị danh sách học sinh + form thêm học sinh.
 */
async function renderStudentsTab(container) {
  // Tải danh sách lớp để hiện dropdown
  let classOptions = '<option value="">Chọn lớp...</option>';
  try {
    const classesSnap = await window.db.collection('classes').get();
    classesSnap.forEach(doc => {
      const selected = doc.id === selectedClassId ? 'selected' : '';
      classOptions += `<option value="${doc.id}" ${selected}>${doc.data().name || doc.id}</option>`;
    });
  } catch (error) {
    console.error('Lỗi tải lớp:', error);
  }

  container.innerHTML = `
    <div class="td-page-header">
      <h1 class="td-page-title">👥 Quản lý học sinh</h1>
      <p class="td-page-subtitle">Thêm và quản lý học sinh theo lớp</p>
    </div>

    <!-- Chọn lớp -->
    <div class="td-form-card">
      <h3 class="td-form-title">Chọn lớp</h3>
      <select id="td-student-class-select" class="td-select" onchange="handleStudentClassChange()">
        ${classOptions}
      </select>
    </div>

    <!-- Form thêm học sinh (chỉ hiện khi đã chọn lớp) -->
    <div id="td-add-student-section" style="display: ${selectedClassId ? 'block' : 'none'};">
      <div class="td-form-card">
        <h3 class="td-form-title">Thêm học sinh vào lớp</h3>
        
        <!-- Thêm từng học sinh -->
        <div class="td-form-row" style="margin-bottom: 12px;">
          <input type="text" id="input-new-student" class="td-input" 
                 placeholder="Nhập tên học sinh...">
          <button class="td-btn td-btn-primary" onclick="handleAddOneStudent()">
            + Thêm
          </button>
        </div>

        <!-- Thêm hàng loạt -->
        <div class="td-form-group">
          <label class="td-label">Hoặc thêm hàng loạt (mỗi tên 1 dòng):</label>
          <textarea id="input-bulk-students" class="td-textarea" rows="4" 
                    placeholder="Nguyễn Văn A&#10;Trần Thị B&#10;Lê Minh C"></textarea>
          <button class="td-btn td-btn-secondary" onclick="handleAddBulkStudents()" style="margin-top: 8px;">
            📋 Thêm hàng loạt
          </button>
        </div>
      </div>
    </div>

    <!-- Danh sách học sinh -->
    <div class="td-section">
      <h2 class="td-section-title" id="td-student-list-title">
        ${selectedClassId ? `Danh sách học sinh - Lớp ${selectedClassId}` : 'Chọn lớp để xem danh sách'}
      </h2>
      <div id="td-students-list">
        ${selectedClassId ? '<div class="td-loading">Đang tải...</div>' : ''}
      </div>
    </div>
  `;

  // Nếu đã chọn lớp, tải danh sách học sinh
  if (selectedClassId) {
    await loadAndRenderStudents(selectedClassId);
  }
}

/**
 * Xử lý khi giáo viên chọn lớp trong dropdown.
 */
function handleStudentClassChange() {
  const select = document.getElementById('td-student-class-select');
  if (!select) return;

  selectedClassId = select.value;

  // Hiện/ẩn form thêm HS
  const addSection = document.getElementById('td-add-student-section');
  if (addSection) {
    addSection.style.display = selectedClassId ? 'block' : 'none';
  }

  // Cập nhật tiêu đề
  const title = document.getElementById('td-student-list-title');
  if (title) {
    title.textContent = selectedClassId
      ? `Danh sách học sinh - Lớp ${selectedClassId}`
      : 'Chọn lớp để xem danh sách';
  }

  // Tải danh sách HS
  if (selectedClassId) {
    loadAndRenderStudents(selectedClassId);
  } else {
    const listEl = document.getElementById('td-students-list');
    if (listEl) listEl.innerHTML = '';
  }
}

/**
 * Tải danh sách học sinh của một lớp và hiển thị lên bảng.
 */
async function loadAndRenderStudents(classId) {
  const listContainer = document.getElementById('td-students-list');
  if (!listContainer) return;

  try {
    const snapshot = await window.db.collection('students')
      .where('classId', '==', classId)
      .get();

    if (snapshot.empty) {
      listContainer.innerHTML = `
        <div class="td-empty-state">
          <span class="td-empty-icon">📭</span>
          <p>Lớp này chưa có học sinh. Hãy thêm học sinh phía trên!</p>
        </div>
      `;
      return;
    }

    // Sắp xếp danh sách học sinh theo tên bằng JavaScript (tránh lỗi Composite Index của Firestore)
    const sortedDocs = snapshot.docs.slice().sort((a, b) => {
      const nameA = (a.data().name || '').toString();
      const nameB = (b.data().name || '').toString();
      return nameA.localeCompare(nameB, 'vi');
    });

    let html = `
      <table class="td-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Mật khẩu</th>
            <th>Lần hoạt động cuối</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
    `;

    let stt = 1;
    sortedDocs.forEach(doc => {
      const student = doc.data();
      const safeName = SafeDOM.escapeHTML(student.name);
      const safeId = SafeDOM.escapeHTML(doc.id);
      let lastActive = 'Chưa đăng nhập';
      if (student.lastActive) {
        if (typeof student.lastActive.toDate === 'function') {
          lastActive = student.lastActive.toDate().toLocaleString('vi-VN');
        } else {
          lastActive = new Date(student.lastActive).toLocaleString('vi-VN');
        }
      }
      
      const pwd = student.password || '123456';
      const safePwd = SafeDOM.escapeHTML(pwd);

      html += `
        <tr>
          <td>${stt++}</td>
          <td><strong>${safeName}</strong></td>
          <td><span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-family: monospace; font-size: 0.9em; color: #334155;">${safePwd}</span></td>
          <td>${lastActive}</td>
          <td>
            <button class="td-btn td-btn-small td-btn-danger btn-delete-student" data-id="${safeId}" data-name="${safeName}">
              🗑️ Xóa
            </button>
          </td>
        </tr>
      `;
    });

    html += '</tbody></table>';
    listContainer.innerHTML = html;
    
    listContainer.querySelectorAll('.btn-delete-student').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const name = e.currentTarget.getAttribute('data-name');
        handleDeleteStudent(id, name);
      });
    });
  } catch (error) {
    console.error('Lỗi tải học sinh:', error);
    listContainer.textContent = `⚠️ Lỗi: ${error.message}`;
    listContainer.className = 'td-error';
  }
}

/**
 * Thêm 1 học sinh vào lớp đang chọn.
 */
async function handleAddOneStudent() {
  const input = document.getElementById('input-new-student');
  if (!input || !selectedClassId) return;

  const studentName = input.value.trim();
  if (!studentName) {
    alert('Vui lòng nhập tên học sinh!');
    input.focus();
    return;
  }

  try {
    await window.db.collection('students').add({
      name: studentName,
      classId: selectedClassId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastActive: null,
      password: "123456"
    });

    input.value = '';
    await loadAndRenderStudents(selectedClassId);
  } catch (error) {
    console.error('Lỗi thêm học sinh:', error);
    alert('Lỗi: ' + error.message);
  }
}

/**
 * Thêm nhiều học sinh cùng lúc (mỗi tên 1 dòng).
 */
async function handleAddBulkStudents() {
  const textarea = document.getElementById('input-bulk-students');
  if (!textarea || !selectedClassId) return;

  const text = textarea.value.trim();
  if (!text) {
    alert('Vui lòng nhập danh sách tên học sinh!');
    textarea.focus();
    return;
  }

  // Tách từng dòng, lọc bỏ dòng trống
  const names = text.split('\n')
    .map(name => name.trim())
    .filter(name => name.length > 0);

  if (names.length === 0) {
    alert('Không tìm thấy tên học sinh hợp lệ!');
    return;
  }

  const confirmed = confirm(`Bạn sẽ thêm ${names.length} học sinh vào lớp ${selectedClassId}. Tiếp tục?`);
  if (!confirmed) return;

  try {
    // Dùng batch write để thêm nhanh hơn
    const batch = window.db.batch();

    for (const name of names) {
      const newDocRef = window.db.collection('students').doc();
      batch.set(newDocRef, {
        name: name,
        classId: selectedClassId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastActive: null,
        password: "123456"
      });
    }

    await batch.commit();
    textarea.value = '';
    alert(`Đã thêm ${names.length} học sinh thành công!`);
    await loadAndRenderStudents(selectedClassId);
  } catch (error) {
    console.error('Lỗi thêm hàng loạt:', error);
    alert('Lỗi: ' + error.message);
  }
}

/**
 * Xóa một học sinh khỏi lớp.
 */
async function handleDeleteStudent(studentId, studentName) {
  const confirmed = confirm(`Bạn có chắc muốn xóa học sinh "${studentName}"?`);
  if (!confirmed) return;

  try {
    // Xóa tiến độ của học sinh
    const progressSnap = await window.db.collection('progress')
      .where('studentId', '==', studentId).get();
    for (const doc of progressSnap.docs) {
      await doc.ref.delete();
    }

    // Xóa học sinh
    await window.db.collection('students').doc(studentId).delete();
    await loadAndRenderStudents(selectedClassId);
  } catch (error) {
    console.error('Lỗi xóa học sinh:', error);
    alert('Lỗi: ' + error.message);
  }
}

// =====================================================================
// TÍNH NĂNG: TAB TIẾN ĐỘ HỌC TẬP
// =====================================================================

/**
 * Hiển thị bảng tiến độ học tập của học sinh theo lớp và khóa học.
 */
async function renderProgressTab(container) {
  // Tải danh sách lớp cho dropdown
  let classOptions = '<option value="">Chọn lớp...</option>';
  try {
    const classesSnap = await window.db.collection('classes').get();
    classesSnap.forEach(doc => {
      const selected = doc.id === selectedClassId ? 'selected' : '';
      classOptions += `<option value="${doc.id}" ${selected}>${doc.data().name || doc.id}</option>`;
    });
  } catch (error) {
    console.error('Lỗi tải lớp:', error);
  }

  // Tạo tabs cho các khóa học
  const courseTabs = Object.keys(COURSE_STRUCTURE).map(courseId => {
    const course = COURSE_STRUCTURE[courseId];
    const active = courseId === selectedCourseId ? 'active' : '';
    return `<button class="td-course-tab ${active}" onclick="handleCourseTabChange('${courseId}')">${course.icon} ${course.title}</button>`;
  }).join('');

  container.innerHTML = `
    <div class="td-page-header">
      <h1 class="td-page-title">📈 Tiến độ học tập</h1>
      <p class="td-page-subtitle">Theo dõi kết quả làm bài của học sinh</p>
    </div>

    <!-- Bộ lọc -->
    <div class="td-filter-bar">
      <div class="td-filter-group">
        <label class="td-label">Lớp:</label>
        <select id="td-progress-class-select" class="td-select" onchange="handleProgressClassChange()">
          ${classOptions}
        </select>
      </div>
      <div class="td-filter-group">
        <label class="td-label">Khóa học:</label>
        <div class="td-course-tabs">
          ${courseTabs}
        </div>
      </div>
      <button class="td-btn td-btn-outline" onclick="exportProgressCSV()" title="Xuất file CSV">
        📤 Xuất CSV
      </button>
    </div>

    <!-- Bảng tiến độ -->
    <div id="td-progress-table-container">
      ${selectedClassId
        ? '<div class="td-loading">Đang tải dữ liệu tiến độ...</div>'
        : '<div class="td-empty-state"><span class="td-empty-icon">📋</span><p>Chọn lớp để xem tiến độ</p></div>'
      }
    </div>
  `;

  // Tải dữ liệu tiến độ nếu đã chọn lớp
  if (selectedClassId) {
    await loadAndRenderProgress();
  }
}

/**
 * Xử lý khi giáo viên chọn lớp trong tab Tiến độ.
 */
function handleProgressClassChange() {
  const select = document.getElementById('td-progress-class-select');
  if (!select) return;
  selectedClassId = select.value;

  if (selectedClassId) {
    loadAndRenderProgress();
  } else {
    const container = document.getElementById('td-progress-table-container');
    if (container) {
      container.innerHTML = '<div class="td-empty-state"><span class="td-empty-icon">📋</span><p>Chọn lớp để xem tiến độ</p></div>';
    }
  }
}

/**
 * Xử lý khi giáo viên chọn khóa học (Basic / Advance / Intensive).
 */
function handleCourseTabChange(courseId) {
  selectedCourseId = courseId;

  // Cập nhật trạng thái active
  document.querySelectorAll('.td-course-tab').forEach(tab => tab.classList.remove('active'));
  const activeTab = document.querySelector(`.td-course-tab[onclick="handleCourseTabChange('${courseId}')"]`);
  if (activeTab) activeTab.classList.add('active');

  // Tải lại bảng tiến độ
  if (selectedClassId) {
    loadAndRenderProgress();
  }
}

/**
 * Tải dữ liệu tiến độ từ Firestore và hiển thị bảng.
 * Mỗi dòng = 1 học sinh, mỗi cột = 1 bài học.
 */
async function loadAndRenderProgress() {
  const tableContainer = document.getElementById('td-progress-table-container');
  if (!tableContainer) return;

  tableContainer.innerHTML = '<div class="td-loading">Đang tải...</div>';

  try {
    // -------------------------------------------------------------
    // BƯỚC 1: LẤY DANH SÁCH HỌC SINH TRONG LỚP
    // -------------------------------------------------------------
    const studentsSnap = await window.db.collection('students')
      .where('classId', '==', selectedClassId)
      .get();

    if (studentsSnap.empty) {
      tableContainer.innerHTML = '<div class="td-empty-state"><span class="td-empty-icon">📭</span><p>Lớp này chưa có học sinh</p></div>';
      return;
    }

    // Lưu danh sách học sinh vào mảng và sắp xếp theo tên bằng JavaScript
    const students = [];
    studentsSnap.forEach(doc => {
      students.push({ id: doc.id, ...doc.data() });
    });
    students.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'vi'));

    // -------------------------------------------------------------
    // BƯỚC 2: LẤY DANH SÁCH BÀI HỌC CỦA KHÓA ĐANG CHỌN
    // -------------------------------------------------------------
    const course = COURSE_STRUCTURE[selectedCourseId];
    if (!course) return;
    const lessons = course.lessons;

    // -------------------------------------------------------------
    // BƯỚC 3: LẤY DỮ LIỆU TIẾN ĐỘ TỪ FIRESTORE
    // -------------------------------------------------------------
    const progressSnap = await window.db.collection('progress')
      .where('classId', '==', selectedClassId)
      .get();

    // Tổ chức dữ liệu thành map: studentId -> lessonKey -> progressData
    const progressMap = {};
    progressSnap.forEach(doc => {
      const data = doc.data();
      if (!progressMap[data.studentId]) {
        progressMap[data.studentId] = {};
      }
      progressMap[data.studentId][data.lessonKey] = data;
    });

    // -------------------------------------------------------------
    // BƯỚC 4: TẠO BẢNG HTML
    // -------------------------------------------------------------
    let headerHtml = '<th class="td-th-sticky">Học sinh</th>';
    for (const lesson of lessons) {
      headerHtml += `<th title="${lesson.title}">B${lesson.id}</th>`;
    }
    headerHtml += '<th>Tổng</th>';

    let bodyHtml = '';
    for (const student of students) {
      let rowHtml = `<td class="td-td-sticky"><strong>${student.name}</strong></td>`;
      let totalDone = 0;

      for (const lesson of lessons) {
        const lessonKey = `${selectedCourseId}_${lesson.id}`;
        const progress = progressMap[student.id] && progressMap[student.id][lessonKey];

        if (progress) {
          totalDone++;
          if (progress.type === 'quiz' && progress.score) {
            const score = progress.score;
            const total = score.correct + score.wrong + score.skipped;
            const percent = total > 0 ? Math.round((score.correct / total) * 100) : 0;
            const colorClass = percent >= 70 ? 'td-cell-pass' : percent >= 50 ? 'td-cell-warn' : 'td-cell-fail';
            rowHtml += `<td class="${colorClass}" title="Đúng ${score.correct}/${total}">${score.correct}/${total}</td>`;
          } else {
            rowHtml += `<td class="td-cell-pass" title="Đã hoàn thành">✅</td>`;
          }
        } else {
          rowHtml += `<td class="td-cell-empty" title="Chưa làm">—</td>`;
        }
      }

      // Cột tổng
      const totalPercent = lessons.length > 0
        ? Math.round((totalDone / lessons.length) * 100)
        : 0;
      rowHtml += `<td><strong>${totalPercent}%</strong></td>`;

      bodyHtml += `<tr>${rowHtml}</tr>`;
    }

    tableContainer.innerHTML = `
      <div class="td-table-wrapper">
        <table class="td-table td-progress-table">
          <thead><tr>${headerHtml}</tr></thead>
          <tbody>${bodyHtml}</tbody>
        </table>
      </div>
    `;
  } catch (error) {
    console.error('Lỗi tải tiến độ:', error);
    tableContainer.innerHTML = `<div class="td-error">⚠️ Lỗi: ${error.message}</div>`;
  }
}

// =====================================================================
// TÍNH NĂNG: XUẤT BÁO CÁO CSV
// =====================================================================

/**
 * Xuất bảng tiến độ hiện tại ra file CSV để giáo viên tải về.
 */
async function exportProgressCSV() {
  if (!selectedClassId || !selectedCourseId) {
    alert('Vui lòng chọn lớp và khóa học trước khi xuất!');
    return;
  }

  try {
    // Lấy danh sách học sinh
    const studentsSnap = await window.db.collection('students')
      .where('classId', '==', selectedClassId)
      .get();

    const students = [];
    studentsSnap.forEach(doc => {
      students.push({ id: doc.id, ...doc.data() });
    });
    students.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'vi'));

    // Lấy bài học
    const course = COURSE_STRUCTURE[selectedCourseId];
    const lessons = course.lessons;

    // Lấy tiến độ
    const progressSnap = await window.db.collection('progress')
      .where('classId', '==', selectedClassId)
      .get();

    const progressMap = {};
    progressSnap.forEach(doc => {
      const data = doc.data();
      if (!progressMap[data.studentId]) {
        progressMap[data.studentId] = {};
      }
      progressMap[data.studentId][data.lessonKey] = data;
    });

    // Tạo nội dung CSV
    // Dòng tiêu đề
    let csv = 'Họ tên';
    for (const lesson of lessons) {
      csv += `,Bài ${lesson.id}`;
    }
    csv += ',Tổng %\n';

    // Dữ liệu từng học sinh
    for (const student of students) {
      csv += `"${student.name}"`;
      let totalDone = 0;

      for (const lesson of lessons) {
        const lessonKey = `${selectedCourseId}_${lesson.id}`;
        const progress = progressMap[student.id] && progressMap[student.id][lessonKey];

        if (progress && progress.type === 'quiz' && progress.score) {
          const total = progress.score.correct + progress.score.wrong + progress.score.skipped;
          csv += `,${progress.score.correct}/${total}`;
          totalDone++;
        } else if (progress) {
          csv += `,Hoàn thành`;
          totalDone++;
        } else {
          csv += `,—`;
        }
      }

      const percent = lessons.length > 0 ? Math.round((totalDone / lessons.length) * 100) : 0;
      csv += `,${percent}%\n`;
    }

    // Tạo file download
    const BOM = '\uFEFF'; // Byte Order Mark để Excel đọc đúng tiếng Việt
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tien_do_${selectedClassId}_${selectedCourseId}_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Lỗi xuất CSV:', error);
    alert('Lỗi khi xuất file: ' + error.message);
  }
}

// =====================================================================
// HÀM ĐỒNG BỘ KẾT QUẢ LÊN FIREBASE
// (Được gọi từ quiz.js và practice.js sau khi học sinh nộp bài)
// =====================================================================

/**
 * Đồng bộ kết quả quiz lên Firestore.
 * Gọi sau khi học sinh nộp bài trắc nghiệm.
 *
 * @param {string} lessonKey - Khóa bài học, VD: 'advance_4'
 * @param {object} score - Kết quả: { correct, wrong, skipped }
 */
async function syncQuizResultToFirebase(lessonKey, score) {
  // Chỉ đồng bộ khi đã đăng nhập và Firebase sẵn sàng
  if (!window.currentStudent || !window.db) return;

  try {
    const student = window.currentStudent;

    // Tìm xem đã có bản ghi tiến độ cho bài này chưa
    const existingSnap = await window.db.collection('progress')
      .where('studentId', '==', student.id)
      .where('lessonKey', '==', lessonKey)
      .where('type', '==', 'quiz')
      .get();

    if (!existingSnap.empty) {
      // Đã có → cập nhật
      const docRef = existingSnap.docs[0].ref;
      await docRef.update({
        score: score,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      // Chưa có → tạo mới
      await window.db.collection('progress').add({
        studentId: student.id,
        classId: student.classId,
        lessonKey: lessonKey,
        type: 'quiz',
        score: score,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (error) {
    // Không alert lỗi để không làm phiền học sinh
    // Dữ liệu vẫn được lưu trên localStorage
    console.error('Lỗi đồng bộ quiz lên Firebase:', error);
  }
}

/**
 * Đồng bộ kết quả thực hành lên Firestore.
 * Gọi khi học sinh hoàn thành một bài thực hành.
 *
 * @param {string} lessonKey - Khóa bài học, VD: 'advance_4'
 * @param {object} completedExercises - Object chứa ID bài đã hoàn thành
 */
async function syncPracticeResultToFirebase(lessonKey, completedExercises) {
  if (!window.currentStudent || !window.db) return;

  try {
    const student = window.currentStudent;

    const existingSnap = await window.db.collection('progress')
      .where('studentId', '==', student.id)
      .where('lessonKey', '==', lessonKey)
      .where('type', '==', 'practice')
      .get();

    // Đếm số bài đã hoàn thành
    let completedCount = 0;
    for (const key in completedExercises) {
      if (completedExercises[key] === true) completedCount++;
    }

    const progressData = {
      studentId: student.id,
      classId: student.classId,
      lessonKey: lessonKey,
      type: 'practice',
      completedCount: completedCount,
      submittedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (!existingSnap.empty) {
      await existingSnap.docs[0].ref.update(progressData);
    } else {
      await window.db.collection('progress').add(progressData);
    }
  } catch (error) {
    console.error('Lỗi đồng bộ practice lên Firebase:', error);
  }
}
