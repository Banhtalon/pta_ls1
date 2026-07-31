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

        <!-- Nút đăng nhập -->
        <button id="btn-login-submit" class="login-btn">Vào học</button>

        <!-- Link dành cho giáo viên -->
        <div class="login-footer">
          <a href="#/teacher-dashboard" class="login-teacher-link">Bạn là giáo viên?</a>
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
  classSelect.addEventListener('change', function () {
    var classId = classSelect.value;
    if (classId) {
      loadStudentsByClass(classId);
    } else {
      // Nếu bỏ chọn lớp → reset dropdown học sinh
      var studentSelect = document.getElementById('login-student-select');
      studentSelect.innerHTML = '<option value="">-- Chọn lớp trước --</option>';
      studentSelect.disabled = true;
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
  // Lấy giá trị từ dropdown
  var classSelect = document.getElementById('login-class-select');
  var studentSelect = document.getElementById('login-student-select');

  var classId = classSelect ? classSelect.value : '';
  var studentId = studentSelect ? studentSelect.value : '';

  // Kiểm tra đã chọn đầy đủ chưa
  if (!classId) {
    alert('Vui lòng chọn lớp học!');
    return;
  }
  if (!studentId) {
    alert('Vui lòng chọn tên học sinh!');
    return;
  }

  // Lấy tên hiển thị từ option đang được chọn
  var studentName = studentSelect.options[studentSelect.selectedIndex].textContent;

  // Tạo object session cho học sinh
  var studentSession = {
    id: studentId,
    name: studentName,
    classId: classId,
    isVerified: false // Đánh dấu chưa xác thực (TRACK-B)
  };

  // Lưu session vào localStorage (dạng chuỗi JSON)
  localStorage.setItem(SESSION_KEY, JSON.stringify(studentSession));

  // Cập nhật biến toàn cục
  window.currentStudent = studentSession;

  // Cập nhật header hiện tên học sinh
  updateHeaderWithStudent();

  // Chuyển đến trang chủ
  navigateTo('#/');

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
    
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn-logout';
    logoutBtn.id = 'btn-logout';
    logoutBtn.textContent = 'Đăng xuất';
    logoutBtn.addEventListener('click', handleLogout);
    
    authSection.appendChild(nameSpan);
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
