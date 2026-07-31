// =====================================================================
// DỮ LIỆU BÀI HỌC: Advance Python - Bài 1: OOP - Classes & Objects
// Trạng thái: Placeholder - Cần bổ sung nội dung chi tiết
// =====================================================================

window.LESSON_DATA = window.LESSON_DATA || {};
window.LESSON_DATA['advance_1'] = {
  quizData: [
    {
        "id": 1,
        "topic": "Ôn tập cú pháp Python",
        "question": "Kiểu dữ liệu nào dùng để lưu số nguyên?",
        "options": [
            "A. int",
            "B. float",
            "C. str",
            "D. bool"
        ],
        "correctAnswer": 0,
        "explanation": "`int` là viết tắt của integer, dùng để lưu số nguyên."
    },
    {
        "id": 2,
        "topic": "Ôn tập cú pháp Python",
        "question": "Giá trị của biến score thuộc kiểu dữ liệu nào?\n\nscore = 8.5",
        "options": [
            "A. int",
            "B. float",
            "C. str",
            "D. bool"
        ],
        "correctAnswer": 1,
        "explanation": "8.5 là số thập phân, thuộc kiểu `float`."
    },
    {
        "id": 3,
        "topic": "Ôn tập cú pháp Python",
        "question": "Lệnh nào dùng để hiển thị dữ liệu ra màn hình?",
        "options": [
            "A. input()",
            "B. print()",
            "C. int()",
            "D. return"
        ],
        "correctAnswer": 1,
        "explanation": "Lệnh `print()` dùng để in/hiển thị dữ liệu ra màn hình."
    },
    {
        "id": 4,
        "topic": "Ôn tập cú pháp Python",
        "question": "Dữ liệu nhận được từ lệnh sau có kiểu mặc định là gì?\n\nage = input(\"Nhập tuổi: \")",
        "options": [
            "A. Số nguyên",
            "B. Số thực",
            "C. Chuỗi",
            "D. Boolean"
        ],
        "correctAnswer": 2,
        "explanation": "Lệnh `input()` luôn trả về dữ liệu kiểu chuỗi (string) theo mặc định."
    },
    {
        "id": 5,
        "topic": "Ôn tập cú pháp Python",
        "question": "Lệnh nào nhập một số nguyên từ bàn phím?",
        "options": [
            "A. input(int())",
            "B. int(input())",
            "C. print(input())",
            "D. input(float())"
        ],
        "correctAnswer": 1,
        "explanation": "Cần kết hợp hàm `int()` để ép kiểu chuỗi từ `input()` sang số nguyên."
    },
    {
        "id": 6,
        "topic": "Ôn tập cú pháp Python",
        "question": "Toán tử nào dùng để lấy phần dư?",
        "options": [
            "A. /",
            "B. //",
            "C. %",
            "D. **"
        ],
        "correctAnswer": 2,
        "explanation": "Toán tử `%` dùng để chia lấy phần dư."
    },
    {
        "id": 7,
        "topic": "Ôn tập cú pháp Python",
        "question": "Kết quả của biểu thức sau là gì?\n\n10 // 3",
        "options": [
            "A. 3",
            "B. 3.33",
            "C. 1",
            "D. 4"
        ],
        "correctAnswer": 0,
        "explanation": "Toán tử `//` là chia lấy phần nguyên. 10 chia 3 được 3 dư 1, nên kết quả phần nguyên là 3."
    },
    {
        "id": 8,
        "topic": "Ôn tập cú pháp Python",
        "question": "Cấu trúc nào được dùng để kiểm tra một điều kiện?",
        "options": [
            "A. for",
            "B. if",
            "C. def",
            "D. return"
        ],
        "correctAnswer": 1,
        "explanation": "Cấu trúc `if` được dùng để rẽ nhánh dựa trên điều kiện."
    },
    {
        "id": 9,
        "topic": "Ôn tập cú pháp Python",
        "question": "Lệnh nào thêm một phần tử vào cuối danh sách?",
        "options": [
            "A. remove()",
            "B. clear()",
            "C. append()",
            "D. insert()"
        ],
        "correctAnswer": 2,
        "explanation": "Phương thức `append()` thêm phần tử vào cuối danh sách."
    },
    {
        "id": 10,
        "topic": "Ôn tập cú pháp Python",
        "question": "Danh sách nào được khai báo đúng?",
        "options": [
            "A. numbers = (1, 2, 3)",
            "B. numbers = [1, 2, 3]",
            "C. numbers = {1, 2, 3}",
            "D. numbers = <1, 2, 3>"
        ],
        "correctAnswer": 1,
        "explanation": "Danh sách (list) trong Python được khai báo trong ngoặc vuông `[]`."
    },
    {
        "id": 11,
        "topic": "Ôn tập cú pháp Python",
        "question": "Chương trình sau in ra kết quả nào?\n\nnumber = 7\nif number % 2 == 0:\n    print(\"Chẵn\")\nelse:\n    print(\"Lẻ\")",
        "options": [
            "A. Chẵn",
            "B. Lẻ",
            "C. 7",
            "D. Chương trình báo lỗi"
        ],
        "correctAnswer": 1,
        "explanation": "7 chia 2 dư 1, không thoả mãn điều kiện `% 2 == 0` nên sẽ chạy vào nhánh `else` in ra 'Lẻ'."
    },
    {
        "id": 12,
        "topic": "Ôn tập cú pháp Python",
        "question": "Đoạn chương trình sau lặp bao nhiêu lần?\n\nfor i in range(5):\n    print(i)",
        "options": [
            "A. 4 lần",
            "B. 5 lần",
            "C. 6 lần",
            "D. Không dừng"
        ],
        "correctAnswer": 1,
        "explanation": "`range(5)` sẽ tạo ra chuỗi (0, 1, 2, 3, 4) gồm 5 phần tử, nên lặp 5 lần."
    },
    {
        "id": 13,
        "topic": "Ôn tập cú pháp Python",
        "question": "Các giá trị của i trong chương trình sau là gì?\n\nfor i in range(1, 5):\n    print(i)",
        "options": [
            "A. 0, 1, 2, 3, 4",
            "B. 1, 2, 3, 4",
            "C. 1, 2, 3, 4, 5",
            "D. 0, 1, 2, 3"
        ],
        "correctAnswer": 1,
        "explanation": "`range(1, 5)` bắt đầu từ 1 và kết thúc trước 5 (tức là đến 4)."
    },
    {
        "id": 14,
        "topic": "Ôn tập cú pháp Python",
        "question": "Giá trị cuối cùng của total là bao nhiêu?\n\ntotal = 0\nfor i in range(1, 4):\n    total = total + i",
        "options": [
            "A. 3",
            "B. 4",
            "C. 6",
            "D. 10"
        ],
        "correctAnswer": 2,
        "explanation": "`range(1, 4)` là các giá trị 1, 2, 3. Tổng = 0 + 1 + 2 + 3 = 6."
    },
    {
        "id": 15,
        "topic": "Ôn tập cú pháp Python",
        "question": "Sau khi chạy chương trình, danh sách fruits có giá trị nào?\n\nfruits = [\"cam\", \"táo\"]\nfruits.append(\"xoài\")",
        "options": [
            "A. [\"cam\", \"táo\"]",
            "B. [\"xoài\", \"cam\", \"táo\"]",
            "C. [\"cam\", \"táo\", \"xoài\"]",
            "D. [\"cam\", \"xoài\"]"
        ],
        "correctAnswer": 2,
        "explanation": "`append()` thêm phần tử 'xoài' vào cuối danh sách."
    },
    {
        "id": 16,
        "topic": "Ôn tập cú pháp Python",
        "question": "Lệnh nào phù hợp để kiểm tra chuỗi \"Python\" có chứa chữ \"P\" hay không?",
        "options": [
            "A. \"P\" in \"Python\"",
            "B. \"P\" == \"Python\"",
            "C. \"Python\".append(\"P\")",
            "D. \"Python\".remove(\"P\")"
        ],
        "correctAnswer": 0,
        "explanation": "Toán tử `in` dùng để kiểm tra sự tồn tại của chuỗi con bên trong chuỗi lớn."
    },
    {
        "id": 17,
        "topic": "Ôn tập cú pháp Python",
        "question": "Kết quả của đoạn chương trình sau là gì?\n\ntext = \"MindX\"\nfor character in text:\n    print(character)",
        "options": [
            "A. In toàn bộ chuỗi trên một dòng",
            "B. In từng ký tự trên từng dòng",
            "C. In số lượng ký tự",
            "D. Chương trình báo lỗi"
        ],
        "correctAnswer": 1,
        "explanation": "Lệnh `for` duyệt qua từng ký tự của chuỗi, và lệnh `print()` mặc định in mỗi ký tự xuống dòng mới."
    },
    {
        "id": 18,
        "topic": "Ôn tập cú pháp Python",
        "question": "Hàm nào dưới đây có trả về giá trị?",
        "options": [
            "A. <pre>def hello(name):\n    print(\"Xin chào\", name)</pre>",
            "B. <pre>def total(a, b):\n    return a + b</pre>",
            "C. <pre>def show():\n    print(\"Python\")</pre>",
            "D. <pre>def start():\n    input()</pre>"
        ],
        "correctAnswer": 1,
        "explanation": "Hàm total có chứa lệnh `return`, nghĩa là hàm sẽ trả về kết quả."
    },
    {
        "id": 19,
        "topic": "Ôn tập cú pháp Python",
        "question": "Giá trị của result là bao nhiêu?\n\ndef tinh_tong(a, b):\n    return a + b\n\nresult = tinh_tong(3, 4) + 2",
        "options": [
            "A. 7",
            "B. 9",
            "C. 34",
            "D. 2"
        ],
        "correctAnswer": 1,
        "explanation": "`tinh_tong(3, 4)` trả về 7, sau đó cộng thêm 2 được 9."
    },
    {
        "id": 20,
        "topic": "Ôn tập cú pháp Python",
        "question": "Đoạn lệnh nào phù hợp nhất để đếm số chẵn trong danh sách?",
        "options": [
            "A. <pre>count = 0\nfor number in numbers:\n    if number % 2 == 0:\n        count += 1</pre>",
            "B. <pre>count = 0\nif numbers % 2 == 0:\n    count += numbers</pre>",
            "C. <pre>for number in numbers:\n    count = number</pre>",
            "D. <pre>count = numbers.remove()</pre>"
        ],
        "correctAnswer": 0,
        "explanation": "Cần dùng vòng lặp `for` để duyệt qua từng số, và dùng `if` kết hợp `% 2 == 0` để kiểm tra số chẵn và tăng biến đếm."
    }
],
  practiceData: [
    {
      id: 1,
      title: "Thông tin cá nhân",
      difficulty: "Dễ",
      description: "Nhập vào 3 thông tin: Họ tên, Tuổi, và Chiều cao (mỗi thông tin nhập trên một dòng). Sau đó in ra màn hình theo mẫu:\nTên: [Họ tên]\nTuổi: [Tuổi]\nChiều cao: [Chiều cao] m",
      hints: [
        "Bước 1: Sử dụng hàm input() để nhận đầu vào từ bàn phím.",
        "Bước 2: input() mặc định trả về chuỗi. Tuổi cần ép sang int(), chiều cao cần ép sang float().",
        "Bước 3: Sử dụng print() để in ra kết quả."
      ],
      starterCode: "# Nhập Họ tên, Tuổi, Chiều cao\n\n# In ra thông tin\n",
      testCases: [
        {
          id: 1,
          input: "Quốc Bảo\n13\n1.65",
          expectedOutput: "Tên: Quốc Bảo\nTuổi: 13\nChiều cao: 1.65 m",
          description: "Kiểm tra in thông tin cá nhân cơ bản"
        },
        {
          id: 2,
          input: "Nguyễn Văn A\n20\n1.7",
          expectedOutput: "Tên: Nguyễn Văn A\nTuổi: 20\nChiều cao: 1.7 m",
          description: "Kiểm tra thông tin khác"
        }
      ]
    },
    {
      id: 2,
      title: "Tính toán cơ bản",
      difficulty: "Dễ",
      description: "Nhập hai số nguyên a và b. Lần lượt in ra Tổng, Hiệu, Tích, Thương của hai số đó trên các dòng riêng biệt.",
      hints: [
        "Bước 1: Nhập a và b, sử dụng int(input()) để chuyển đổi kiểu.",
        "Bước 2: Dùng lệnh print để in ra các kết quả a+b, a-b, a*b.",
        "Bước 3: Chú ý phép chia a/b. Cần xử lý thế nào nếu b = 0? (Với bài này có thể giả định b luôn khác 0 ở test case cơ bản, hoặc dùng if để kiểm tra)."
      ],
      starterCode: "# Nhập a và b\n\n# In ra Tổng, Hiệu, Tích, Thương\n",
      testCases: [
        {
          id: 1,
          input: "8\n2",
          expectedOutput: "10\n6\n16\n4.0",
          description: "a = 8, b = 2"
        },
        {
          id: 2,
          input: "10\n5",
          expectedOutput: "15\n5\n50\n2.0",
          description: "a = 10, b = 5"
        }
      ]
    },
    {
      id: 3,
      title: "Kiểm tra chẵn hoặc lẻ",
      difficulty: "Dễ",
      description: "Nhập một số nguyên n. In ra 'n là số chẵn' hoặc 'n là số lẻ' tương ứng.",
      hints: [
        "Bước 1: Nhập số nguyên n.",
        "Bước 2: Dùng phép chia lấy dư % để kiểm tra (nếu n % 2 == 0 thì là số chẵn).",
        "Bước 3: Dùng f-string hoặc dấu phẩy trong print() để in biến n ra kết quả."
      ],
      starterCode: "# Nhập số nguyên n\n\n# Kiểm tra và in kết quả\n",
      testCases: [
        {
          id: 1,
          input: "4",
          expectedOutput: "4 là số chẵn",
          description: "Kiểm tra số chẵn"
        },
        {
          id: 2,
          input: "7",
          expectedOutput: "7 là số lẻ",
          description: "Kiểm tra số lẻ"
        }
      ]
    },
    {
      id: 4,
      title: "Kiểm tra điểm",
      difficulty: "Dễ",
      description: "Nhập điểm từ bàn phím (số thực). Nếu điểm >= 8: in 'Giỏi'. Nếu 6.5 <= điểm < 8: in 'Khá'. Nếu 5 <= điểm < 6.5: in 'Đạt'. Nếu dưới 5: in 'Cần cố gắng'.",
      hints: [
        "Bước 1: Dùng float(input()) để lấy giá trị điểm.",
        "Bước 2: Sử dụng if - elif - else.",
        "Bước 3: Sắp xếp điều kiện từ mức điểm cao xuống thấp."
      ],
      starterCode: "# Nhập điểm\n\n# Xếp loại\n",
      testCases: [
        {
          id: 1,
          input: "8.5",
          expectedOutput: "Giỏi",
          description: "Điểm >= 8"
        },
        {
          id: 2,
          input: "7.0",
          expectedOutput: "Khá",
          description: "Điểm từ 6.5 đến dưới 8"
        },
        {
          id: 3,
          input: "5.5",
          expectedOutput: "Đạt",
          description: "Điểm từ 5 đến dưới 6.5"
        },
        {
          id: 4,
          input: "4.0",
          expectedOutput: "Cần cố gắng",
          description: "Điểm dưới 5"
        }
      ]
    },
    {
      id: 5,
      title: "In các số từ 1 đến n",
      difficulty: "Dễ",
      description: "Nhập số nguyên dương n. In các số từ 1 đến n, mỗi số trên một dòng.",
      hints: [
        "Bước 1: Nhập số nguyên dương n.",
        "Bước 2: Sử dụng vòng lặp for và hàm range().",
        "Bước 3: Cần kiểm tra điểm bắt đầu và điểm kết thúc của range() (lưu ý range(1, n+1))."
      ],
      starterCode: "# Nhập n\n\n# Vòng lặp in các số từ 1 đến n\n",
      testCases: [
        {
          id: 1,
          input: "5",
          expectedOutput: "1\n2\n3\n4\n5",
          description: "In các số từ 1 đến 5"
        },
        {
          id: 2,
          input: "3",
          expectedOutput: "1\n2\n3",
          description: "In các số từ 1 đến 3"
        }
      ]
    },
    {
      id: 6,
      title: "Tính tổng từ 1 đến n",
      difficulty: "Trung bình",
      description: "Nhập số nguyên dương n. Tính và in ra tổng các số từ 1 đến n (1 + 2 + 3 + ... + n).",
      hints: [
        "Bước 1: Tạo biến tổng bằng 0 trước vòng lặp.",
        "Bước 2: Duyệt các số từ 1 đến n bằng vòng lặp.",
        "Bước 3: Cộng từng số vào biến tổng.",
        "Bước 4: In kết quả ra ngoài cùng của vòng lặp."
      ],
      starterCode: "# Nhập n\n\n# Tính tổng\n\n# In kết quả\n",
      testCases: [
        {
          id: 1,
          input: "1",
          expectedOutput: "1",
          description: "n = 1"
        },
        {
          id: 2,
          input: "5",
          expectedOutput: "15",
          description: "n = 5"
        },
        {
          id: 3,
          input: "10",
          expectedOutput: "55",
          description: "n = 10"
        }
      ]
    },
    {
      id: 7,
      title: "Tìm số lớn nhất trong ba số",
      difficulty: "Trung bình",
      description: "Nhập ba số a, b, c. In ra số lớn nhất. Nếu ba số bằng nhau, in 'Ba số bằng nhau'.",
      hints: [
        "Bước 1: Nhập 3 số nguyên.",
        "Bước 2: So sánh trường hợp đặc biệt trước (a == b và b == c).",
        "Bước 3: Nếu không bằng nhau, dùng if-elif-else hoặc hàm max() để tìm số lớn nhất."
      ],
      starterCode: "# Nhập a, b, c\n\n# Kiểm tra và tìm số lớn nhất\n",
      testCases: [
        {
          id: 1,
          input: "5\n9\n2",
          expectedOutput: "9",
          description: "Số lớn nhất là b"
        },
        {
          id: 2,
          input: "7\n7\n7",
          expectedOutput: "Ba số bằng nhau",
          description: "Ba số bằng nhau"
        },
        {
          id: 3,
          input: "10\n4\n8",
          expectedOutput: "10",
          description: "Số lớn nhất là a"
        }
      ]
    },
    {
      id: 8,
      title: "Đếm số chẵn trong danh sách",
      difficulty: "Trung bình",
      description: "Cho danh sách: numbers = [2, 5, 8, 11, 14, 17, 20]. Hãy in ra các số chẵn (mỗi số trên 1 dòng), đếm xem có bao nhiêu số chẵn và tính tổng các số chẵn đó. In ra số đếm và tổng ở 2 dòng cuối cùng.",
      hints: [
        "Bước 1: Chuẩn bị hai biến trước vòng lặp: một biến đếm và một biến tổng.",
        "Bước 2: Duyệt từng phần tử trong danh sách.",
        "Bước 3: Nếu phần tử chia hết cho 2 thì in ra, tăng biến đếm và cộng vào tổng.",
        "Bước 4: In ra biến đếm và tổng sau khi vòng lặp kết thúc."
      ],
      starterCode: "numbers = [2, 5, 8, 11, 14, 17, 20]\n# Chuẩn bị biến đếm và tổng\n\n# Vòng lặp xử lý\n\n# In kết quả\n",
      testCases: [
        {
          id: 1,
          input: "",
          expectedOutput: "2\n8\n14\n20\n4\n44",
          description: "Kiểm tra với danh sách cho sẵn"
        }
      ]
    },
    {
      id: 9,
      title: "Xử lý họ tên",
      difficulty: "Trung bình",
      description: "Nhập họ và tên của bạn. Sau đó: 1. In từng ký tự trên một dòng. 2. Đếm số ký tự (không tính dấu cách). 3. Kiểm tra chữ 'a' (hoặc 'A') có xuất hiện trong tên hay không (in 'Có chữ a' hoặc 'Không có chữ a').",
      hints: [
        "Bước 1: Dùng vòng lặp for để duyệt từng ký tự trong chuỗi.",
        "Bước 2: Có thể kiểm tra ký_tự != ' ' để đếm độ dài.",
        "Bước 3: Toán tử in giúp kiểm tra một chuỗi con ('a' in ten.lower())."
      ],
      starterCode: "# Nhập họ tên\n\n# In từng ký tự và đếm\n\n# Kiểm tra chữ a\n",
      testCases: [
        {
          id: 1,
          input: "Le An",
          expectedOutput: "L\ne\n \nA\nn\n4\nCó chữ a",
          description: "Tên có chữ A và dấu cách"
        },
        {
          id: 2,
          input: "Minh",
          expectedOutput: "M\ni\nn\nh\n4\nKhông có chữ a",
          description: "Tên không có chữ a"
        }
      ]
    },
    {
      id: 10,
      title: "Viết hàm tính tổng số chẵn",
      difficulty: "Trung bình",
      description: "Hoàn thành hàm `tinh_tong_so_chan(numbers)`. Hàm nhận vào một danh sách số nguyên và trả về tổng các số chẵn trong đó. Hệ thống sẽ tự động gọi hàm và in ra kết quả kiểm tra.",
      hints: [
        "Bước 1: Biến tổng nên đặt ở trong hàm, ngay trước vòng lặp.",
        "Bước 2: Khi đã tính xong tổng trong vòng lặp, cần sử dụng từ khóa `return` để trả về kết quả đó.",
        "Bước 3: print() chỉ hiển thị ra màn hình, còn return giúp hàm trả về giá trị để chương trình sử dụng tiếp."
      ],
      starterCode: "def tinh_tong_so_chan(numbers):\n    # Viết chương trình tại đây\n    pass\n\n# Không xóa đoạn code dưới đây\nnumbers = eval(input())\nresult = tinh_tong_so_chan(numbers)\nprint(result)",
      testCases: [
        {
          id: 1,
          input: "[1, 2, 3, 4, 5, 6]",
          expectedOutput: "12",
          description: "Tổng các số 2, 4, 6"
        },
        {
          id: 2,
          input: "[10, 15, 20]",
          expectedOutput: "30",
          description: "Tổng các số 10, 20"
        },
        {
          id: 3,
          input: "[1, 3, 5]",
          expectedOutput: "0",
          description: "Không có số chẵn nào"
        }
      ]
    }
  ]
};
