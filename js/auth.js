// =====================================================================
// AUTH.JS - Xử lý đăng nhập / đăng xuất cho học sinh
// Quản lý session bằng localStorage, kết nối Firestore để lấy danh sách lớp & HS
// =====================================================================

// ---- Biến toàn cục ----
// Đối tượng học sinh đang đăng nhập: { id, name, classId }
// Giá trị null nghĩa là chưa có ai đăng nhập
window.currentStudent = null;

// Key lưu session trong localStorage
var SESSION_KEY = 'pylearn_student_session';


// =====================================================================
// 1. RENDER TRANG ĐĂNG NHẬP
// =====================================================================

/**
 * Hiển thị form đăng nhập vào vùng #app.
 * Form gồm: dropdown chọn lớp → dropdown chọn học sinh → nút Vào học.
 * Khi render xong, tự động gọi loadClassList() để fill danh sách lớp.
 */
function renderLoginPage() {
  var app = document.getElementById('app');
  if (!app) return;
  var webLearningUrl = window.LEARNING_APP_LINKS?.webBaseUrl || './web-learning/dist/';

  // Dùng template literal để tạo HTML cho trang đăng nhập
  app.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        
        <!-- Header có Logo bên trái, tiêu đề bên phải -->
        <div class="login-header">
          <svg class="login-logo-svg" width="44" height="44" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M58.745 0C28.465 0 29.28 13.06 29.28 13.06V27.12H88.755V29.83H29.075C12.56 29.83 0 41.53 0 58.745C0 76.2 11.23 87.665 29.075 87.665H35.8V74.88C35.8 57.035 50.41 42.425 68.255 42.425H88.755V28.535C88.755 12.02 75.98 0 58.745 0ZM42.19 8.685C45.33 8.685 47.88 11.235 47.88 14.375C47.88 17.515 45.33 20.065 42.19 20.065C39.05 20.065 36.5 17.515 36.5 14.375C36.5 11.235 39.05 8.685 42.19 8.685Z" fill="#3D7346"/>
            <path d="M88.72 29.83V42.425H68.255C50.41 42.425 35.8 57.035 35.8 74.88V89.49H29.075V86.78H88.72C105.235 86.78 117.795 75.08 117.795 57.865C117.795 40.41 106.565 28.945 88.72 28.945H82V41.73C82 59.575 67.39 74.185 49.545 74.185H29.045V88.075C29.045 104.59 41.82 116.61 59.055 116.61C89.335 116.61 88.52 103.55 88.52 103.55V89.49H29.075C29.075 89.49 29.075 89.49 29.075 89.49H88.72V29.83ZM75.61 96.545C72.47 96.545 69.92 99.095 69.92 102.235C69.92 105.375 72.47 107.925 75.61 107.925C78.75 107.925 81.3 105.375 81.3 102.235C81.3 99.095 78.75 96.545 75.61 96.545Z" fill="#589F5E"/>
          </svg>
          <div class="login-header-text">
            <h2 class="login-title">PyLearn - Đăng nhập</h2>
            <p class="login-subtitle">Chọn lớp và tên của bạn để bắt đầu học</p>
          </div>
        </div>

        <div id="login-error-msg" class="login-error"></div>

        <!-- Dropdown chọn lớp -->
        <div class="login-form-group">
          <label for="login-class-select">Lớp học</label>
          <select id="login-class-select" class="login-select">
            <option value="">-- Chọn lớp trước --</option>
          </select>
        </div>

        <!-- Dropdown chọn học sinh -->
        <div class="login-form-group" style="margin-bottom: 24px;">
          <label for="login-student-select">Học sinh</label>
          <select id="login-student-select" class="login-select" disabled>
            <option value="">-- Chọn lớp trước --</option>
          </select>
        </div>

        <!-- Ô nhập mật khẩu (Mặc định ẩn) -->
        <div class="login-form-group" id="login-password-group" style="display: none; margin-bottom: 24px;">
          <label for="login-student-password">Mật khẩu</label>
          <input type="password" id="login-student-password" class="login-input" placeholder="Nhập mật khẩu (mặc định: 123456)">
        </div>

        <!-- Nút đăng nhập -->
        <button id="btn-login-submit" class="login-btn">Vào học</button>

        <!-- Link dành cho giáo viên -->
        <div class="login-footer">
          <a href="#/teacher-login" class="login-teacher-link">Bạn là giáo viên?</a>
          <a href="${webLearningUrl}" class="login-teacher-link">Học Lập trình Web (JSB/JSA/JSI) →</a>
        </div>
      </div>
      
      <div class="login-page-footer">
        Designed by Dương Quang
      </div>
    </div>
  `;

  // --- Gắn sự kiện ---

  // Khi chọn lớp → load danh sách học sinh của lớp đó
  var classSelect = document.getElementById('login-class-select');
  var passwordGroup = document.getElementById('login-password-group');
  
  classSelect.addEventListener('change', function () {
    var classId = classSelect.value;
    if (classId) {
      loadStudentsByClass(classId);
    } else {
      // Nếu bỏ chọn lớp → reset dropdown học sinh
      var studentSelect = document.getElementById('login-student-select');
      studentSelect.innerHTML = '<option value="">-- Chọn lớp trước --</option>';
      studentSelect.disabled = true;
      if (passwordGroup) passwordGroup.style.display = 'none';
    }
  });

  var studentSelect = document.getElementById('login-student-select');
  studentSelect.addEventListener('change', function () {
    if (studentSelect.value && passwordGroup) {
      passwordGroup.style.display = 'block';
    } else if (passwordGroup) {
      passwordGroup.style.display = 'none';
    }
  });

  // Khi nhấn nút "Vào học" → xử lý đăng nhập
  var btnLogin = document.getElementById('btn-login-submit');
  btnLogin.addEventListener('click', handleStudentLogin);

  // Gọi hàm load danh sách lớp từ Firestore
  loadClassList();
}


// =====================================================================
// 2. LOAD DANH SÁCH LỚP TỪ FIRESTORE
// =====================================================================

/**
 * Đọc collection 'classes' từ Firestore và fill vào dropdown lớp.
 * Mỗi document trong collection 'classes' cần có trường 'name' (tên lớp).
 * Sử dụng Firebase compat SDK: window.db.collection('classes').get()
 */
async function loadClassList() {
  var classSelect = document.getElementById('login-class-select');
  if (!classSelect) return;

  try {
    // Kiểm tra Firebase đã sẵn sàng chưa
    if (!window.db) {
      console.error('Firebase chưa được khởi tạo (window.db không tồn tại).');
      classSelect.innerHTML = '<option value="">⚠ Lỗi kết nối Firebase</option>';
      return;
    }

    // Truy vấn toàn bộ collection 'classes'
    var snapshot = await window.db.collection('classes').get();

    // Giữ lại option mặc định "Chọn lớp..."
    classSelect.innerHTML = '<option value="">Chọn lớp...</option>';

    // Duyệt qua từng document và tạo option
    snapshot.forEach(function (doc) {
      var data = doc.data();
      var option = document.createElement('option');
      option.value = doc.id;              // id của document làm value
      option.textContent = data.name;     // tên lớp hiển thị
      classSelect.appendChild(option);
    });

  } catch (error) {
    console.error('Lỗi khi tải danh sách lớp:', error);
    classSelect.innerHTML = '<option value="">⚠ Không tải được danh sách lớp</option>';
  }
}


// =====================================================================
// 3. LOAD DANH SÁCH HỌC SINH THEO LỚP
// =====================================================================

/**
 * Khi người dùng chọn lớp, hàm này đọc collection 'students'
 * lọc theo classId và fill kết quả vào dropdown học sinh.
 *
 * @param {string} classId - ID của lớp được chọn (trùng với doc.id trong 'classes')
 */
async function loadStudentsByClass(classId) {
  var studentSelect = document.getElementById('login-student-select');
  if (!studentSelect) return;

  // Hiện trạng thái đang tải
  studentSelect.innerHTML = '<option value="">Đang tải...</option>';
  studentSelect.disabled = true;

  try {
    // Kiểm tra Firebase
    if (!window.db) {
      console.error('Firebase chưa được khởi tạo.');
      studentSelect.innerHTML = '<option value="">⚠ Lỗi kết nối</option>';
      return;
    }

    // Truy vấn students có classId trùng với lớp được chọn
    var snapshot = await window.db.collection('students')
      .where('classId', '==', classId)
      .get();

    // Reset dropdown và thêm option mặc định
    studentSelect.innerHTML = '<option value="">Chọn tên bạn...</option>';

    // Sắp xếp danh sách học sinh theo tên theo bảng chữ cái tiếng Việt
    var sortedDocs = snapshot.docs.slice().sort(function (a, b) {
      var nameA = (a.data().name || '').toString();
      var nameB = (b.data().name || '').toString();
      return nameA.localeCompare(nameB, 'vi');
    });

    // Duyệt kết quả, mỗi student tạo 1 option
    sortedDocs.forEach(function (doc) {
      var data = doc.data();
      var option = document.createElement('option');
      option.value = doc.id;              // id của student document
      option.textContent = data.name;     // tên học sinh
      studentSelect.appendChild(option);
    });

    // Mở khóa dropdown để người dùng chọn
    studentSelect.disabled = false;

    // Nếu không có học sinh nào trong lớp
    if (snapshot.empty) {
      studentSelect.innerHTML = '<option value="">Không có học sinh trong lớp này</option>';
    }

  } catch (error) {
    console.error('Lỗi khi tải danh sách học sinh:', error);
    studentSelect.innerHTML = '<option value="">⚠ Không tải được danh sách</option>';
  }
}


// =====================================================================
// 4. XỬ LÝ ĐĂNG NHẬP
// =====================================================================

/**
 * Đọc giá trị từ 2 dropdown (lớp + học sinh),
 * tạo object currentStudent, lưu vào localStorage,
 * rồi chuyển đến trang chủ.
 * Đồng thời ghi lastActive lên Firestore để giáo viên theo dõi.
 */
async function handleStudentLogin() {
  // Lấy giá trị từ dropdown và ô password
  var classSelect = document.getElementById('login-class-select');
  var studentSelect = document.getElementById('login-student-select');
  var passwordInput = document.getElementById('login-student-password');
  var errorMsg = document.getElementById('login-error-msg');

  var classId = classSelect ? classSelect.value : '';
  var studentId = studentSelect ? studentSelect.value : '';
  var password = passwordInput ? passwordInput.value : '';

  // Kiểm tra đã chọn đầy đủ chưa
  if (!classId) {
    if(errorMsg) errorMsg.textContent = 'Vui lòng chọn lớp học!';
    return;
  }
  if (!studentId) {
    if(errorMsg) errorMsg.textContent = 'Vui lòng chọn tên học sinh!';
    return;
  }
  if (!password) {
    if(errorMsg) errorMsg.textContent = 'Vui lòng nhập mật khẩu!';
    return;
  }

  if (errorMsg) errorMsg.textContent = '';
  
  var btnLogin = document.getElementById('btn-login-submit');
  if(btnLogin) {
    btnLogin.disabled = true;
    btnLogin.textContent = 'Đang kiểm tra...';
  }

  try {
    // Kiểm tra mật khẩu trên Firestore
    if (!window.db) throw new Error("Mất kết nối CSDL");
    const doc = await window.db.collection('students').doc(studentId).get();
    
    if (!doc.exists) {
      if(errorMsg) errorMsg.textContent = 'Không tìm thấy thông tin học sinh!';
      if(btnLogin) { btnLogin.disabled = false; btnLogin.textContent = 'Vào học'; }
      return;
    }
    
    const studentData = doc.data();
    const dbPassword = studentData.password || "123456";
    
    if (password !== dbPassword) {
      if(errorMsg) errorMsg.textContent = 'Sai mật khẩu!';
      if(btnLogin) { btnLogin.disabled = false; btnLogin.textContent = 'Vào học'; }
      return;
    }

    // Pass
    var studentName = studentSelect.options[studentSelect.selectedIndex].textContent;

    // Tạo object session cho học sinh
    var studentSession = {
      id: studentId,
      name: studentName,
      classId: classId,
      isVerified: true
    };

    // Lưu session vào localStorage (dạng chuỗi JSON)
    localStorage.setItem(SESSION_KEY, JSON.stringify(studentSession));

    // Cập nhật biến toàn cục
    window.currentStudent = studentSession;

    // Cập nhật header hiện tên học sinh
    updateHeaderWithStudent();

    // Chuyển đến trang chủ
    navigateTo('#/');
  } catch (err) {
    console.error("Lỗi xác thực:", err);
    if(errorMsg) errorMsg.textContent = 'Lỗi kết nối CSDL!';
    if(btnLogin) { btnLogin.disabled = false; btnLogin.textContent = 'Vào học'; }
    return;
  }

  // Ghi thời gian hoạt động cuối và khôi phục tiến độ từ Firestore về máy học sinh
  try {
    if (window.db) {
      window.db.collection('students').doc(studentId).update({
        lastActive: new Date().toISOString()
      });

      // Tự động tải lại toàn bộ tiến độ cũ từ Firebase về localStorage
      // Giúp học sinh cài lại máy hoặc dùng máy khác KHÔNG BAO GIỜ BỊ MẤT BÀI
      window.db.collection('progress')
        .where('studentId', '==', studentId)
        .get()
        .then(function (snap) {
          snap.forEach(function (doc) {
            var data = doc.data();
            if (data.lessonKey) {
              if (data.type === 'quiz' && data.score) {
                localStorage.setItem('pylearn_' + data.lessonKey + '_quiz_result', JSON.stringify(data.score));
              } else if (data.type === 'practice') {
                localStorage.setItem('pylearn_' + data.lessonKey + '_practice_completed', 'true');
              }
            }
          });
          console.log('✅ Đã đồng bộ ' + snap.size + ' bản ghi tiến độ từ Firebase về máy học sinh!');
        });
    }
  } catch (error) {
    console.warn('Không thể đồng bộ Firestore:', error);
  }
}


// =====================================================================
// 5. ĐĂNG XUẤT
// =====================================================================

/**
 * Xóa session khỏi localStorage, đặt lại biến toàn cục,
 * và chuyển người dùng về trang đăng nhập.
 */
function handleLogout() {
  // Xóa session trong localStorage
  localStorage.removeItem(SESSION_KEY);

  // Đặt lại biến toàn cục
  window.currentStudent = null;

  // Chuyển về trang đăng nhập
  navigateTo('#/login');
}


// =====================================================================
// 6. KIỂM TRA SESSION ĐÃ LƯU
// =====================================================================

/**
 * Kiểm tra localStorage có session đăng nhập không.
 * Nếu có → khôi phục window.currentStudent và trả về true.
 * Nếu không → trả về false.
 *
 * Hàm này thường được gọi khi ứng dụng vừa khởi động
 * để tự động đăng nhập lại nếu học sinh đã đăng nhập trước đó.
 *
 * @returns {boolean} - true nếu có session hợp lệ, false nếu không
 */
function checkLoginSession() {
  var savedSession = localStorage.getItem(SESSION_KEY);

  if (savedSession) {
    try {
      // Parse chuỗi JSON thành object
      var session = JSON.parse(savedSession);

      // Kiểm tra object có đầy đủ thông tin không
      if (session.id && session.name && session.classId) {
        window.currentStudent = session;
        return true;
      }
    } catch (error) {
      // JSON không hợp lệ → xóa session lỗi
      console.warn('Session không hợp lệ, đã xóa:', error);
      localStorage.removeItem(SESSION_KEY);
    }
  }

  return false;
}


// =====================================================================
// 7. KIỂM TRA NHANH TRẠNG THÁI ĐĂNG NHẬP
// =====================================================================

/**
 * Trả về true nếu học sinh đã đăng nhập (có currentStudent),
 * false nếu chưa.
 * Đây là hàm tiện ích ngắn gọn, dùng ở nhiều nơi trong ứng dụng.
 *
 * @returns {boolean}
 */
function isLoggedIn() {
  return window.currentStudent !== null;
}


// =====================================================================
// 8. CẬP NHẬT HEADER KHI ĐÃ ĐĂNG NHẬP
// =====================================================================

/**
 * Thay nội dung vùng .auth-section trên header:
 * - Nếu đã đăng nhập → hiện tên học sinh + nút Đăng xuất
 * - Nếu chưa → hiện nút Đăng nhập (trạng thái mặc định)
 *
 * Hàm này được gọi sau khi đăng nhập thành công
 * hoặc khi trang vừa load và phát hiện có session cũ.
 */
function updateHeaderWithStudent() {
  var authSection = document.querySelector('.auth-section');
  if (!authSection) return;

  if (window.currentStudent) {
    // Đã đăng nhập → hiện tên + nút đăng xuất
    authSection.innerHTML = '';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'login-student-name';
    nameSpan.textContent = `👋 ${window.currentStudent.name}`;
    
    const changePwdBtn = document.createElement('button');
    changePwdBtn.className = 'btn-change-pwd';
    changePwdBtn.id = 'btn-change-pwd';
    changePwdBtn.innerHTML = '🔑 Đổi mật khẩu';
    changePwdBtn.style.marginRight = '8px';
    changePwdBtn.addEventListener('click', showChangePasswordModal);
    
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn-logout';
    logoutBtn.id = 'btn-logout';
    logoutBtn.textContent = 'Đăng xuất';
    logoutBtn.addEventListener('click', handleLogout);
    
    authSection.appendChild(nameSpan);
    authSection.appendChild(changePwdBtn);
    authSection.appendChild(logoutBtn);
  } else {
    // Chưa đăng nhập → hiện nút đăng nhập mặc định
    authSection.innerHTML = '';
    const loginBtn = document.createElement('button');
    loginBtn.className = 'btn-login';
    loginBtn.id = 'btn-login';
    loginBtn.textContent = 'Đăng nhập';
    authSection.appendChild(loginBtn);
  }
}

// =====================================================================
// ĐỔI MẬT KHẨU
// =====================================================================

function showChangePasswordModal() {
  if (document.getElementById('change-pwd-modal')) return;
  
  // Icon mắt nhắm
  const eyeSlashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

  const modalHTML = `
    <div id="change-pwd-modal" class="modal-overlay">
      <div class="modal-content" style="max-width: 440px; padding: 32px; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.1);">
        <h3 style="text-align: center; margin-top: 0; margin-bottom: 8px; font-size: 1.5rem; color: #1e293b;">Đổi mật khẩu</h3>
        <p style="text-align: center; color: #64748b; font-size: 1rem; margin-top: 0; margin-bottom: 24px;">Cập nhật mật khẩu để bảo mật tài khoản của bạn</p>
        
        <div id="pwd-error-msg" class="login-error"></div>
        
        <div class="login-form-group" style="margin-bottom: 20px;">
          <label style="color: #475569; font-weight: 500;">Mật khẩu cũ</label>
          <div class="pwd-input-wrapper">
            <input type="password" id="old-pwd" class="login-input" placeholder="Mật khẩu hiện tại" style="background: transparent;">
            <span class="toggle-pwd" onclick="togglePasswordVisibility('old-pwd', this)">${eyeSlashIcon}</span>
          </div>
        </div>
        
        <div class="login-form-group" style="margin-bottom: 20px;">
          <label style="color: #475569; font-weight: 500;">Mật khẩu mới</label>
          <div class="pwd-input-wrapper">
            <input type="password" id="new-pwd" class="login-input" placeholder="Mật khẩu mới" style="background: transparent;">
            <span class="toggle-pwd" onclick="togglePasswordVisibility('new-pwd', this)">${eyeSlashIcon}</span>
          </div>
        </div>
        
        <div class="login-form-group" style="margin-bottom: 32px;">
          <label style="color: #475569; font-weight: 500;">Xác nhận mật khẩu</label>
          <div class="pwd-input-wrapper">
            <input type="password" id="confirm-pwd" class="login-input" placeholder="Nhập lại mật khẩu mới" style="background: transparent;">
            <span class="toggle-pwd" onclick="togglePasswordVisibility('confirm-pwd', this)">${eyeSlashIcon}</span>
          </div>
        </div>
        
        <div style="display: flex; gap: 16px;">
          <button id="btn-cancel-pwd" style="flex: 1; padding: 14px; border-radius: 8px; border: none; cursor: pointer; background: #1e293b; color: white; font-weight: 600; font-size: 1rem; transition: opacity 0.2s;">Hủy</button>
          <button id="btn-save-pwd" style="flex: 1; padding: 14px; border-radius: 8px; border: none; cursor: pointer; background: #3b5998; color: white; font-weight: 600; font-size: 1rem; transition: opacity 0.2s;">Lưu</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Nút Hủy Hover
  const btnCancel = document.getElementById('btn-cancel-pwd');
  btnCancel.addEventListener('mouseover', () => btnCancel.style.opacity = '0.9');
  btnCancel.addEventListener('mouseout', () => btnCancel.style.opacity = '1');
  btnCancel.addEventListener('click', () => {
    document.getElementById('change-pwd-modal').remove();
  });
  
  // Nút Lưu Hover
  const btnSave = document.getElementById('btn-save-pwd');
  btnSave.addEventListener('mouseover', () => btnSave.style.opacity = '0.9');
  btnSave.addEventListener('mouseout', () => btnSave.style.opacity = '1');
  btnSave.addEventListener('click', handleChangePassword);
}

window.togglePasswordVisibility = function(inputId, iconSpan) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  } else {
    input.type = 'password';
    iconSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
  }
};

async function handleChangePassword() {
  const oldPwd = document.getElementById('old-pwd').value;
  const newPwd = document.getElementById('new-pwd').value;
  const confirmPwd = document.getElementById('confirm-pwd').value;
  const errorMsg = document.getElementById('pwd-error-msg');
  const saveBtn = document.getElementById('btn-save-pwd');
  
  if (!oldPwd || !newPwd || !confirmPwd) {
    errorMsg.textContent = 'Vui lòng điền đủ các trường!';
    return;
  }
  
  if (newPwd !== confirmPwd) {
    errorMsg.textContent = 'Mật khẩu mới không khớp!';
    return;
  }
  
  if (!window.currentStudent || !window.currentStudent.id) {
    errorMsg.textContent = 'Lỗi phiên đăng nhập!';
    return;
  }
  
  errorMsg.textContent = '';
  saveBtn.disabled = true;
  saveBtn.textContent = 'Đang xử lý...';
  
  try {
    const studentRef = window.db.collection('students').doc(window.currentStudent.id);
    const doc = await studentRef.get();
    
    if (!doc.exists) {
      errorMsg.textContent = 'Không tìm thấy học sinh!';
      saveBtn.disabled = false;
      saveBtn.textContent = 'Lưu';
      return;
    }
    
    const studentData = doc.data();
    const dbPassword = studentData.password || "123456";
    
    if (oldPwd !== dbPassword) {
      errorMsg.textContent = 'Mật khẩu cũ không chính xác!';
      saveBtn.disabled = false;
      saveBtn.textContent = 'Lưu';
      return;
    }
    
    await studentRef.update({ password: newPwd });
    alert("Đổi mật khẩu thành công!");
    document.getElementById('change-pwd-modal').remove();
    
  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Lỗi kết nối CSDL!';
    saveBtn.disabled = false;
    saveBtn.textContent = 'Lưu';
  }
}

// =====================================================================
// TÍNH NĂNG: ĐĂNG NHẬP DÀNH CHO GIÁO VIÊN
// =====================================================================

/**
 * Hiển thị giao diện Đăng nhập dành riêng cho Giáo viên
 */
function renderTeacherLoginPage() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-logo-circle">
            <span class="login-logo-icon">👩‍🏫</span>
          </div>
          <h1 class="login-title">Giáo viên</h1>
          <p class="login-subtitle">Đăng nhập tài khoản quản trị</p>
        </div>

        <div id="teacher-login-error" class="login-error"></div>

        <form id="teacher-login-form" class="login-form">
          <div class="login-form-group">
            <label for="teacher-id">Tên đăng nhập</label>
            <input type="text" id="teacher-id" class="login-input" placeholder="Nhập tên đăng nhập" required autofocus />
          </div>

          <div class="login-form-group">
            <label for="teacher-pwd">Mật khẩu</label>
            <div class="pwd-input-wrapper">
              <input type="password" id="teacher-pwd" class="login-input" placeholder="Nhập mật khẩu" required />
              <span class="toggle-pwd" onclick="togglePasswordVisibility('teacher-pwd', this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              </span>
            </div>
          </div>

          <button type="submit" class="login-btn" id="btn-teacher-login">Đăng nhập</button>
        </form>

        <div class="login-footer">
          <a href="#/login" class="login-teacher-link">← Quay lại Đăng nhập Học sinh</a>
        </div>
      </div>
    </div>
  `;

  // Gắn sự kiện submit form
  const form = document.getElementById('teacher-login-form');
  form.addEventListener('submit', handleTeacherLogin);
}

/**
 * Xử lý xác thực Giáo viên
 */
function handleTeacherLogin(e) {
  e.preventDefault();
  
  const idInput = document.getElementById('teacher-id').value.trim();
  const pwdInput = document.getElementById('teacher-pwd').value.trim();
  const errorMsg = document.getElementById('teacher-login-error');

  errorMsg.style.display = 'none';
  errorMsg.textContent = '';

  if (idInput === 'admin' && pwdInput === '571002') {
    // Lưu phiên đăng nhập giáo viên
    localStorage.setItem('pylearn_teacher_session', 'admin_logged_in');
    
    // Chuyển hướng sang trang Quản trị
    navigateTo('#/teacher-dashboard');
  } else {
    errorMsg.textContent = 'Sai tên đăng nhập hoặc mật khẩu!';
    errorMsg.style.display = 'block';
  }
}
