// =====================================================================
// DỮ LIỆU CẤU TRÚC KHOÁ HỌC PYLEARN
// Chứa metadata tổng quan cho 3 cấp độ: Basic, Advance, Intensive
// =====================================================================

const COURSE_STRUCTURE = {
  "basic": {
    "id": "basic",
    "title": "Basic Python",
    "subtitle": "Nền tảng cơ bản",
    "description": "Làm quen với Python từ những khái niệm đầu tiên: biến, kiểu dữ liệu, điều kiện, vòng lặp và hàm.",
    "color": "#27ae60",
    "colorLight": "#eafaf1",
    "icon": "🟢",
    "lessons": [
      {
        "id": 1,
        "title": "Thế giới ngôn ngữ và xứ Python kỳ diệu",
        "description": "Làm quen với Python, cài đặt và chạy chương trình đầu tiên",
        "status": "draft",
        "contentVersion": 1
      },
      {
        "id": 2,
        "title": "Sức mạnh của biến và kiểu dữ liệu",
        "description": "Biến, kiểu dữ liệu int, float, string, boolean",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 3,
        "title": "Tính toán với toán tử",
        "description": "Toán tử số học, so sánh và logic",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 4,
        "title": "Rẽ nhánh bằng câu điều kiện",
        "description": "Câu lệnh điều kiện và rẽ nhánh",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 5,
        "title": "Checkpoint 1",
        "description": "Kiểm tra kiến thức giai đoạn 1",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 6,
        "title": "Vòng lặp for và range()",
        "description": "Cấu trúc lặp với số lần biết trước",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 7,
        "title": "Vòng lặp while",
        "description": "Cấu trúc lặp với điều kiện",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 8,
        "title": "Lập trình giải quyết vấn đề",
        "description": "Thực hành tư duy giải thuật",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 9,
        "title": "Checkpoint 2 và làm quen với danh sách",
        "description": "Kiểm tra kiến thức và giới thiệu kiểu dữ liệu mảng",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 10,
        "title": "Danh sách nâng cao",
        "description": "Các thao tác thêm, xóa, sửa trên danh sách",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 11,
        "title": "Chuỗi ký tự",
        "description": "Xử lý và thao tác với chuỗi nâng cao",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 12,
        "title": "Hàm – Chia nhỏ công việc",
        "description": "Tạo hàm và tái sử dụng mã nguồn",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 13,
        "title": "Hàm có giá trị trả về",
        "description": "Hàm với từ khóa return và tham số",
        "status": "published",
        "contentVersion": 1
      }
    ]
  },
  "advance": {
    "id": "advance",
    "title": "Advance Python",
    "subtitle": "Nâng cao kỹ năng",
    "description": "Đi sâu vào lập trình hướng đối tượng, thiết kế giao diện đồ họa với PyQt và ứng dụng thực tế.",
    "color": "#f0a500",
    "colorLight": "#fef9e7",
    "icon": "🟡",
    "lessons": [
      {
        "id": 1,
        "title": "Ôn tập cú pháp Python",
        "description": "Củng cố lại kiến thức nền tảng Python",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 2,
        "title": "Làm quen với lớp và đối tượng",
        "description": "Khái niệm Lập trình Hướng đối tượng (OOP)",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 3,
        "title": "Kế thừa (Inheritance)",
        "description": "Tính kế thừa và tái sử dụng mã nguồn trong OOP",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 4,
        "title": "Làm quen với PyQt",
        "description": "Giới thiệu thư viện thiết kế giao diện PyQt",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 5,
        "title": "Xây dựng thành phần giao diện – Checkpoint 1",
        "description": "Thực hành thiết kế UI và kiểm tra định kỳ",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 6,
        "title": "Tùy chỉnh phong cách giao diện bằng QSS",
        "description": "Làm đẹp ứng dụng PyQt với StyleSheet",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 7,
        "title": "Giao diện và sự kiện",
        "description": "Bắt và xử lý sự kiện người dùng (Signals & Slots)",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 8,
        "title": "Phân chia bố cục cho giao diện",
        "description": "Sử dụng Layouts để sắp xếp widget hợp lý",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 9,
        "title": "Kiểm tra kiến thức PyQt – Checkpoint 2",
        "description": "Ôn tập và đánh giá kỹ năng lập trình giao diện",
        "status": "draft",
        "contentVersion": 1
      },
      {
        "id": 10,
        "title": "Lên ý tưởng và kế hoạch sản phẩm cuối khóa",
        "description": "Phân tích yêu cầu và thiết kế dự án",
        "status": "draft",
        "contentVersion": 1
      },
      {
        "id": 11,
        "title": "Phát triển sản phẩm cuối khóa",
        "description": "Bắt tay vào lập trình dự án thực tế",
        "status": "draft",
        "contentVersion": 1
      },
      {
        "id": 12,
        "title": "Phát triển sản phẩm cuối khóa (tiếp tục)",
        "description": "Hoàn thiện các tính năng cốt lõi",
        "status": "draft",
        "contentVersion": 1
      },
      {
        "id": 13,
        "title": "Hoàn thiện và trình bày sản phẩm cuối khóa",
        "description": "Báo cáo và demo dự án",
        "status": "draft",
        "contentVersion": 1
      }
    ]
  },
  "intensive": {
    "id": "intensive",
    "title": "Intensive Python",
    "subtitle": "Chuyên sâu thực chiến",
    "description": "Dự án chuyên sâu, kết hợp xử lý dữ liệu, giao diện nâng cao và tích hợp trí tuệ nhân tạo (AI).",
    "color": "#e74c3c",
    "colorLight": "#fdedec",
    "icon": "🔴",
    "lessons": [
      {
        "id": 1,
        "title": "Lên ý tưởng dự án cá nhân",
        "description": "Định hướng và chọn đề tài dự án cấp cao",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 2,
        "title": "Ôn tập lớp – đối tượng – thư viện PyQt",
        "description": "Củng cố kiến thức OOP và giao diện",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 3,
        "title": "Xây dựng tài nguyên dự án",
        "description": "Chuẩn bị hình ảnh, dữ liệu, cấu trúc thư mục",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 4,
        "title": "Lập trình xử lý giao diện dự án",
        "description": "Hoàn thiện UI cho ứng dụng",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 5,
        "title": "Checkpoint 1",
        "description": "Đánh giá tiến độ thiết kế dự án",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 6,
        "title": "Xây dựng dữ liệu và lưu trữ",
        "description": "Thiết kế CSDL và cách lưu trữ dữ liệu bền vững",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 7,
        "title": "CRUD với dữ liệu",
        "description": "Thêm, Đọc, Sửa, Xóa dữ liệu trong ứng dụng",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 8,
        "title": "Tích hợp AI vào ứng dụng",
        "description": "Sử dụng API trí tuệ nhân tạo để nâng tầm sản phẩm",
        "status": "published",
        "contentVersion": 1
      },
      {
        "id": 9,
        "title": "Checkpoint 2",
        "description": "Đánh giá tính năng dữ liệu và AI",
        "status": "draft",
        "contentVersion": 1
      },
      {
        "id": 10,
        "title": "Hoàn thiện giao diện và tính năng",
        "description": "Ghép nối logic và tinh chỉnh UI/UX",
        "status": "draft",
        "contentVersion": 1
      },
      {
        "id": 11,
        "title": "Hoàn thiện dữ liệu và trải nghiệm người dùng",
        "description": "Xử lý luồng dữ liệu trơn tru và ngoại lệ",
        "status": "draft",
        "contentVersion": 1
      },
      {
        "id": 12,
        "title": "Kiểm thử và tối ưu ứng dụng",
        "description": "Sửa lỗi (debug) và tối ưu hóa hiệu năng",
        "status": "draft",
        "contentVersion": 1
      },
      {
        "id": 13,
        "title": "Hoàn thiện, kiểm thử và chuẩn bị trình bày dự án",
        "description": "Đóng gói ứng dụng và báo cáo tổng kết",
        "status": "draft",
        "contentVersion": 1
      }
    ]
  }
};
