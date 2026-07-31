// =====================================================================
// FIREBASE-CONFIG.JS - Cấu hình và khởi tạo Firebase SDK (v9 Compat)
// Quản lý kết nối Firebase & Firestore database cho ứng dụng PyLearn
// =====================================================================

/**
 * Cấu hình Firebase Project - Giáo viên cần thay thế bằng thông tin project thực tế
 * Lấy từ: Firebase Console -> Project Settings -> General -> Your apps
 */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAHHrGRraE1EvIATPSPewuedOXxVEAPadA",
  authDomain: "web-python-practice.firebaseapp.com",
  projectId: "web-python-practice",
  storageBucket: "web-python-practice.firebasestorage.app",
  messagingSenderId: "149722683415",
  appId: "1:149722683415:web:68cbb8038bffc360632452",
  measurementId: "G-K24XE4WB0K"
};

// Khai báo các biến global trên window để các file script khác dễ dàng truy cập
window.firebaseConfig = FIREBASE_CONFIG;
window.firebaseApp = null;
window.db = null;
window.firebaseReady = false;

/**
 * Khởi tạo Firebase App và Firestore Database
 * Hàm này kiểm tra Firebase SDK (CDN) đã sẵn sàng trước khi khởi tạo
 * @returns {object|null} Instance của Firestore Database (window.db)
 */
function initFirebase() {
  // Kiểm tra xem Firebase SDK (compat) đã được load qua thẻ <script> từ CDN chưa
  if (typeof firebase === 'undefined') {
    console.warn('⚠️ Firebase SDK chưa được nạp. Vui lòng thêm thẻ <script> CDN của Firebase vào file HTML.');
    window.firebaseReady = false;
    return null;
  }

  try {
    // Kiểm tra nếu ứng dụng chưa được khởi tạo thì mới gọi initializeApp
    if (!firebase.apps || !firebase.apps.length) {
      window.firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
    } else {
      window.firebaseApp = firebase.app();
    }

    // Khởi tạo Firestore database instance
    window.db = firebase.firestore();

    // Bật bộ nhớ đệm cục bộ (Local Persistence / Cache) để tải dữ liệu gần như tức thì
    window.db.enablePersistence({ synchronizeTabs: true }).catch(err => {
      console.warn('⚠️ Không thể bật cache ngoại tuyến:', err.code);
    });

    window.firebaseReady = true;

    console.log('✅ Firebase và Firestore đã được khởi tạo thành công!');
    return window.db;
  } catch (error) {
    console.error('❌ Lỗi khi khởi tạo Firebase:', error);
    window.firebaseReady = false;
    return null;
  }
}

/**
 * Hàm helper lấy Firestore Database instance
 * Tự động gọi initFirebase() nếu database chưa được khởi tạo
 * @returns {object|null} Instance của Firestore Database (window.db)
 */
function getFirestore() {
  if (!window.db) {
    return initFirebase();
  }
  return window.db;
}

// Tự động chạy khởi tạo khi file script được nạp
initFirebase();
