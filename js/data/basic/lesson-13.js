// =====================================================================
// DỮ LIỆU BÀI HỌC: Basic Python - Bài 13: Functions
// Trạng thái: Hoàn thành
// =====================================================================

window.LESSON_DATA = window.LESSON_DATA || {};
window.LESSON_DATA['basic_13'] = {
  quizData: [
    {
      "id": 1,
      "topic": "Phần 1. Khái niệm về hàm",
      "question": "Hàm trong Python dùng để:",
      "options": [
        "A. Lưu dữ liệu",
        "B. Thực hiện một nhiệm vụ cụ thể",
        "C. Tạo danh sách",
        "D. Tạo vòng lặp"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 2,
      "topic": "Phần 1. Khái niệm về hàm",
      "question": "Từ khóa dùng để định nghĩa hàm là:",
      "options": [
        "A. function",
        "B. method",
        "C. def",
        "D. return"
      ],
      "correctAnswer": 2,
      "explanation": "Đúng!"
    },
    {
      "id": 3,
      "topic": "Phần 1. Khái niệm về hàm",
      "question": "Hàm có giá trị trả về sử dụng từ khóa nào?",
      "options": [
        "A. print",
        "B. input",
        "C. return",
        "D. break"
      ],
      "correctAnswer": 2,
      "explanation": "Đúng!"
    },
    {
      "id": 4,
      "topic": "Phần 1. Khái niệm về hàm",
      "question": "Khi gọi một hàm, chương trình sẽ:",
      "options": [
        "A. Bỏ qua hàm",
        "B. Thực hiện các câu lệnh trong hàm",
        "C. Thoát chương trình",
        "D. Báo lỗi"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 5,
      "topic": "Phần 1. Khái niệm về hàm",
      "question": "Hàm giúp chương trình:",
      "options": [
        "A. Dài hơn",
        "B. Khó đọc hơn",
        "C. Dễ quản lý và tái sử dụng",
        "D. Chạy chậm hơn"
      ],
      "correctAnswer": 2,
      "explanation": "Đúng!"
    },
    {
      "id": 6,
      "topic": "Phần 2. Tham số và giá trị trả về",
      "question": "Tham số của hàm là:",
      "options": [
        "A. Giá trị nhập vào cho hàm",
        "B. Tên chương trình",
        "C. Kiểu dữ liệu",
        "D. Danh sách"
      ],
      "correctAnswer": 0,
      "explanation": "Đúng!"
    },
    {
      "id": 7,
      "topic": "Phần 2. Tham số và giá trị trả về",
      "question": "Hàm không có return thường:",
      "options": [
        "A. Trả về kết quả",
        "B. Chỉ thực hiện công việc",
        "C. Báo lỗi",
        "D. Dừng chương trình"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 8,
      "topic": "Phần 2. Tham số và giá trị trả về",
      "question": "Hàm có thể nhận:",
      "options": [
        "A. 0 tham số",
        "B. 1 tham số",
        "C. Nhiều tham số",
        "D. Tất cả các đáp án trên"
      ],
      "correctAnswer": 3,
      "explanation": "Đúng!"
    },
    {
      "id": 9,
      "topic": "Phần 2. Tham số và giá trị trả về",
      "question": "Sau lệnh return, hàm sẽ:",
      "options": [
        "A. Tiếp tục chạy",
        "B. Kết thúc",
        "C. Quay về đầu",
        "D. In kết quả"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 10,
      "topic": "Phần 2. Tham số và giá trị trả về",
      "question": "Giá trị trả về của hàm thường được:",
      "options": [
        "A. Lưu vào biến",
        "B. Bỏ qua",
        "C. Chỉ để in",
        "D. Không sử dụng"
      ],
      "correctAnswer": 0,
      "explanation": "Đúng!"
    },
    {
      "id": 11,
      "topic": "Phần 3. Hàm dựng sẵn",
      "question": "Hàm len() dùng để:",
      "options": [
        "A. Tính tổng",
        "B. Đếm số phần tử hoặc số ký tự",
        "C. Tìm số lớn nhất",
        "D. Sắp xếp"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 12,
      "topic": "Phần 3. Hàm dựng sẵn",
      "question": "Hàm max() dùng để:",
      "options": [
        "A. Tìm giá trị nhỏ nhất",
        "B. Tìm giá trị lớn nhất",
        "C. Đếm phần tử",
        "D. Nhân số"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 13,
      "topic": "Phần 3. Hàm dựng sẵn",
      "question": "Hàm min() dùng để:",
      "options": [
        "A. Tìm giá trị nhỏ nhất",
        "B. Tìm giá trị lớn nhất",
        "C. Tính tổng",
        "D. Chia"
      ],
      "correctAnswer": 0,
      "explanation": "Đúng!"
    },
    {
      "id": 14,
      "topic": "Phần 3. Hàm dựng sẵn",
      "question": "Hàm abs() dùng để:",
      "options": [
        "A. Tính căn bậc hai",
        "B. Lấy giá trị tuyệt đối",
        "C. Lũy thừa",
        "D. Làm tròn"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 15,
      "topic": "Phần 3. Hàm dựng sẵn",
      "question": "Hàm round() dùng để:",
      "options": [
        "A. Làm tròn số",
        "B. Tính trung bình",
        "C. Đổi kiểu dữ liệu",
        "D. Tính bình phương"
      ],
      "correctAnswer": 0,
      "explanation": "Đúng!"
    },
    {
      "id": 16,
      "topic": "Phần 4. Thư viện",
      "question": "Muốn sử dụng thư viện cần:",
      "options": [
        "A. include",
        "B. import",
        "C. library",
        "D. package"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 17,
      "topic": "Phần 4. Thư viện",
      "question": "Thư viện random dùng để:",
      "options": [
        "A. Làm việc với chuỗi",
        "B. Sinh số ngẫu nhiên",
        "C. Vẽ hình",
        "D. Đọc file"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 18,
      "topic": "Phần 4. Thư viện",
      "question": "Hàm randint(a,b) thuộc thư viện:",
      "options": [
        "A. math",
        "B. random",
        "C. string",
        "D. time"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 19,
      "topic": "Phần 4. Thư viện",
      "question": "Thư viện string chủ yếu hỗ trợ:",
      "options": [
        "A. Chuỗi ký tự",
        "B. Danh sách",
        "C. File",
        "D. Hình ảnh"
      ],
      "correctAnswer": 0,
      "explanation": "Đúng!"
    },
    {
      "id": 20,
      "topic": "Phần 4. Thư viện",
      "question": "Để sử dụng hàm trong thư viện math, cần:",
      "options": [
        "A. import math",
        "B. include math",
        "C. using math",
        "D. add math"
      ],
      "correctAnswer": 0,
      "explanation": "Đúng!"
    },
    {
      "id": 21,
      "topic": "Phần 5. Vận dụng",
      "question": "Khi muốn dùng lại nhiều lần một đoạn chương trình, nên:",
      "options": [
        "A. Viết lại nhiều lần",
        "B. Tạo hàm",
        "C. Dùng print()",
        "D. Dùng input()"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 22,
      "topic": "Phần 5. Vận dụng",
      "question": "Hàm giúp giảm:",
      "options": [
        "A. Số biến",
        "B. Mã lặp",
        "C. Bộ nhớ",
        "D. Kiểu dữ liệu"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 23,
      "topic": "Phần 5. Vận dụng",
      "question": "Một hàm có thể:",
      "options": [
        "A. Không có tham số",
        "B. Có nhiều tham số",
        "C. Có hoặc không có giá trị trả về",
        "D. Tất cả các đáp án trên"
      ],
      "correctAnswer": 3,
      "explanation": "Đúng!"
    },
    {
      "id": 24,
      "topic": "Phần 5. Vận dụng",
      "question": "Khi chương trình lớn, việc chia thành nhiều hàm giúp:",
      "options": [
        "A. Dễ đọc",
        "B. Dễ sửa lỗi",
        "C. Dễ mở rộng",
        "D. Tất cả các đáp án trên"
      ],
      "correctAnswer": 3,
      "explanation": "Đúng!"
    },
    {
      "id": 25,
      "topic": "Phần 5. Vận dụng",
      "question": "Hàm nào phù hợp để tính tổng hai số nhiều lần?",
      "options": [
        "A. print()",
        "B. input()",
        "C. Hàm tự định nghĩa",
        "D. type()"
      ],
      "correctAnswer": 2,
      "explanation": "Đúng!"
    },
    {
      "id": 26,
      "topic": "Phần 6. Tổng hợp",
      "question": "return thường xuất hiện ở đâu?",
      "options": [
        "A. Ngoài hàm",
        "B. Trong hàm",
        "C. Trong vòng lặp",
        "D. Trong danh sách"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 27,
      "topic": "Phần 6. Tổng hợp",
      "question": "Hàm có thể gọi:",
      "options": [
        "A. Một lần",
        "B. Nhiều lần",
        "C. Không lần nào",
        "D. Chỉ hai lần"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 28,
      "topic": "Phần 6. Tổng hợp",
      "question": "Mục đích chính của hàm là:",
      "options": [
        "A. Tăng số dòng code",
        "B. Tổ chức chương trình tốt hơn",
        "C. Tạo biến",
        "D. Tạo chuỗi"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    },
    {
      "id": 29,
      "topic": "Phần 6. Tổng hợp",
      "question": "Khi một hàm trả về giá trị, ta có thể:",
      "options": [
        "A. Gán vào biến",
        "B. Dùng trong phép tính",
        "C. In ra màn hình",
        "D. Tất cả các đáp án trên"
      ],
      "correctAnswer": 3,
      "explanation": "Đúng!"
    },
    {
      "id": 30,
      "topic": "Phần 6. Tổng hợp",
      "question": "Kiến thức trọng tâm của Buổi 13 là:",
      "options": [
        "A. Vòng lặp",
        "B. Hàm, giá trị trả về và một số hàm/thư viện cơ bản",
        "C. Danh sách",
        "D. Điều kiện"
      ],
      "correctAnswer": 1,
      "explanation": "Đúng!"
    }
  ],
  practiceData: [
    {
      id: 1,
      title: "Bài 1: Tính tiền mua hàng",
      difficulty: "Dễ",
      description: "Viết hàm `tinh_tien(don_gia, so_luong)` trả về tổng tiền cần thanh toán.\n\n**Công thức:**\nTổng tiền = đơn giá × số lượng",
      hints: ["Hàm cần nhận bao nhiêu tham số?", "Kết quả nào cần đặt sau từ khóa return?"],
      starterCode: "def tinh_tien(don_gia, so_luong):\n    # Viết code tại đây\n    \n    return 0\n\n# --- Phần kiểm tra ---\ndon_gia = int(input())\nso_luong = int(input())\ntong_tien = tinh_tien(don_gia, so_luong)\nprint(\"Tổng tiền cần thanh toán:\", tong_tien, \"đồng\")\n",
      testCases: [
        { id: 1, input: "15000\n4", expectedOutput: "Tổng tiền cần thanh toán: 60000 đồng", description: "Tính tiền cho 4 sản phẩm giá 15000" }
      ]
    },
    {
      id: 2,
      title: "Bài 2: Tính tiền sau giảm giá",
      difficulty: "Trung bình",
      description: "Một cửa hàng giảm giá sản phẩm theo phần trăm. Viết hàm `tinh_gia_sau_giam(gia_goc, phan_tram_giam)` trả về số tiền khách hàng cần trả.\n\n**Công thức:**\nTiền giảm = giá gốc × phần trăm giảm / 100\nGiá sau giảm = giá gốc - tiền giảm",
      hints: ["Pseudo-code:\n- Tính số tiền được giảm\n- Tính giá còn lại\n- Trả về giá còn lại"],
      starterCode: "def tinh_gia_sau_giam(gia_goc, phan_tram_giam):\n    # Viết code tại đây\n    \n    return 0\n\n# --- Phần kiểm tra ---\ngia_goc = int(input())\nphan_tram_giam = int(input())\nket_qua = tinh_gia_sau_giam(gia_goc, phan_tram_giam)\nprint(\"Giá sau khi giảm:\", int(ket_qua), \"đồng\")\n",
      testCases: [
        { id: 1, input: "200000\n15", expectedOutput: "Giá sau khi giảm: 170000 đồng", description: "Giảm 15% cho 200000" }
      ]
    },
    {
      id: 3,
      title: "Bài 3: Đổi nhiệt độ",
      difficulty: "Trung bình",
      description: "Viết hàm `doi_sang_do_f(do_c)` đổi nhiệt độ từ độ C sang độ F.\n\n**Công thức:**\nĐộ F = Độ C × 9 / 5 + 32",
      hints: ["Hàm chỉ thực hiện phép tính, không nên nhập dữ liệu bên trong hàm.", "Dùng return để gửi kết quả về nơi gọi hàm."],
      starterCode: "def doi_sang_do_f(do_c):\n    # Viết code tại đây\n    \n    return 0\n\n# --- Phần kiểm tra ---\ndo_c = float(input())\nket_qua = doi_sang_do_f(do_c)\nprint(\"Nhiệt độ F:\", ket_qua)\n",
      testCases: [
        { id: 1, input: "30", expectedOutput: "Nhiệt độ F: 86.0", description: "Đổi 30 độ C sang độ F" }
      ]
    },
    {
      id: 4,
      title: "Bài 4: Kiểm tra đủ tuổi xem phim",
      difficulty: "Dễ",
      description: "Viết hàm `kiem_tra_do_tuoi(tuoi)`.\n\n**Quy tắc:**\n- Nếu tuổi từ 13 trở lên, trả về `\"Được phép xem phim\"`.\n- Nếu nhỏ hơn 13, trả về `\"Chưa đủ tuổi xem phim\"`.",
      hints: ["Nếu tuổi >= 13:\n    trả về thông báo thứ nhất\nNgược lại:\n    trả về thông báo thứ hai"],
      starterCode: "def kiem_tra_do_tuoi(tuoi):\n    # Viết code tại đây\n    \n    return \"\"\n\n# --- Phần kiểm tra ---\ntuoi = int(input())\nket_qua = kiem_tra_do_tuoi(tuoi)\nprint(ket_qua)\n",
      testCases: [
        { id: 1, input: "15", expectedOutput: "Được phép xem phim", description: "Tuổi 15" },
        { id: 2, input: "10", expectedOutput: "Chưa đủ tuổi xem phim", description: "Tuổi 10" }
      ]
    },
    {
      id: 5,
      title: "Bài 5: Tính tiền taxi",
      difficulty: "Trung bình",
      description: "Một hãng taxi tính giá như sau:\n- Giá mở cửa: 12000 đồng.\n- Mỗi kilomet tiếp theo: 10000 đồng.\n\nViết hàm `tinh_tien_taxi(so_km)`.\n\n**Quy tắc:**\n- Nếu đi từ 0 đến 1 km, giá là 12000 đồng.\n- Nếu đi trên 1 km, tiền taxi bằng:\n`12000 + (số km - 1) × 10000`",
      hints: ["Bạn cần kết hợp:\n- Hàm có giá trị trả về\n- if/else\n- Phép tính số học"],
      starterCode: "def tinh_tien_taxi(so_km):\n    # Viết code tại đây\n    \n    return 0\n\n# --- Phần kiểm tra ---\nso_km = float(input())\nket_qua = tinh_tien_taxi(so_km)\nprint(\"Tiền taxi:\", int(ket_qua), \"đồng\")\n",
      testCases: [
        { id: 1, input: "5", expectedOutput: "Tiền taxi: 52000 đồng", description: "Đi 5km" },
        { id: 2, input: "0.5", expectedOutput: "Tiền taxi: 12000 đồng", description: "Đi 0.5km" }
      ]
    }
  ]
};
