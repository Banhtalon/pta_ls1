// =====================================================================
// TÍNH NĂNG: DỮ LIỆU CÂU HỎI TRẮC NGHIỆM PYTHON
// =====================================================================
// Cấu trúc mảng chứa các object câu hỏi.
// Mỗi câu hỏi gồm: id, chủ đề, nội dung câu hỏi, 4 lựa chọn, đáp án đúng (index 0-3), và giải thích.

const QUIZ_DATA = [
  // ---------------------------------------------------------------------
  // BƯỚC 1: BIẾN & KIỂU DỮ LIỆU (7 câu)
  // ---------------------------------------------------------------------
  {
    id: 1,
    topic: "Biến & Kiểu dữ liệu",
    question: "Đâu là cách khai báo biến hợp lệ trong Python?",
    options: [
      "A. 1variable = 'Python'",
      "B. my variable = 'Python'",
      "C. my_variable = 'Python'",
      "D. variable-my = 'Python'"
    ],
    correctAnswer: 2,
    explanation: "Tên biến trong Python không được bắt đầu bằng số, không chứa dấu cách hay dấu gạch ngang. Chỉ có my_variable với dấu gạch dưới là hợp lệ."
  },
  {
    id: 2,
    topic: "Biến & Kiểu dữ liệu",
    question: "Hàm nào dùng để kiểm tra kiểu dữ liệu của một biến trong Python?",
    options: [
      "A. typeof()",
      "B. type()",
      "C. check_type()",
      "D. get_type()"
    ],
    correctAnswer: 1,
    explanation: "Trong Python, hàm `type()` được sử dụng để lấy kiểu dữ liệu của một đối tượng hoặc biến."
  },
  {
    id: 3,
    topic: "Biến & Kiểu dữ liệu",
    question: "Kiểu dữ liệu của biến `x = 5.0` là gì?",
    options: [
      "A. int",
      "B. float",
      "C. str",
      "D. double"
    ],
    correctAnswer: 1,
    explanation: "Bất kỳ số nào có chứa dấu thập phân (dấu chấm) trong Python đều được hiểu là kiểu số thực `float`."
  },
  {
    id: 4,
    topic: "Biến & Kiểu dữ liệu",
    question: "Làm thế nào để chuyển đổi một số nguyên `x = 10` sang kiểu chuỗi (string)?",
    options: [
      "A. to_string(x)",
      "B. convert(x, str)",
      "C. str(x)",
      "D. string(x)"
    ],
    correctAnswer: 2,
    explanation: "Hàm `str()` được dùng để ép kiểu (chuyển đổi) một giá trị sang kiểu xâu ký tự (chuỗi)."
  },
  {
    id: 5,
    topic: "Biến & Kiểu dữ liệu",
    question: "Từ khóa nào sau đây KHÔNG phải là từ khóa hợp lệ trong Python?",
    options: [
      "A. True",
      "B. false",
      "C. None",
      "D. and"
    ],
    correctAnswer: 1,
    explanation: "Trong Python, giá trị boolean đúng/sai phải viết hoa chữ cái đầu: `True`, `False`. Do đó `false` (viết thường) không phải từ khóa."
  },
  {
    id: 6,
    topic: "Biến & Kiểu dữ liệu",
    question: "Đoạn code sau in ra kết quả gì?\n```python\nx = '10'\ny = '20'\nprint(x + y)\n```",
    options: [
      "A. 30",
      "B. 1020",
      "C. Lỗi",
      "D. '10 + 20'"
    ],
    correctAnswer: 1,
    explanation: "Vì x và y là các chuỗi (str) nên toán tử `+` sẽ thực hiện ghép chuỗi thay vì cộng toán học. Kết quả là '1020'."
  },
  {
    id: 7,
    topic: "Biến & Kiểu dữ liệu",
    question: "Giá trị của biến `z` sau lệnh `z = bool(0)` là gì?",
    options: [
      "A. True",
      "B. False",
      "C. 0",
      "D. Lỗi"
    ],
    correctAnswer: 1,
    explanation: "Hàm `bool()` trả về `False` khi giá trị truyền vào là 0, rỗng, hoặc None. Các số khác 0 sẽ trả về `True`."
  },

  // ---------------------------------------------------------------------
  // BƯỚC 2: TOÁN TỬ (7 câu)
  // ---------------------------------------------------------------------
  {
    id: 8,
    topic: "Toán tử",
    question: "Kết quả của phép tính `10 // 3` là gì?",
    options: [
      "A. 3.3333",
      "B. 3",
      "C. 1",
      "D. 4"
    ],
    correctAnswer: 1,
    explanation: "Toán tử `//` là phép chia lấy phần nguyên, do đó 10 chia 3 được 3, dư 1. Kết quả là 3."
  },
  {
    id: 9,
    topic: "Toán tử",
    question: "Toán tử nào dùng để tính phần dư của phép chia?",
    options: [
      "A. /",
      "B. //",
      "C. %",
      "D. **"
    ],
    correctAnswer: 2,
    explanation: "Toán tử `%` (modulo) dùng để chia lấy phần dư."
  },
  {
    id: 10,
    topic: "Toán tử",
    question: "Đoạn code sau in ra kết quả gì?\n```python\nprint(2 ** 3)\n```",
    options: [
      "A. 6",
      "B. 8",
      "C. 9",
      "D. Lỗi"
    ],
    correctAnswer: 1,
    explanation: "Toán tử `**` là phép lũy thừa. `2 ** 3` nghĩa là 2 mũ 3, bằng 8."
  },
  {
    id: 11,
    topic: "Toán tử",
    question: "Biểu thức `(5 > 3) and (10 < 5)` trả về kết quả gì?",
    options: [
      "A. True",
      "B. False",
      "C. None",
      "D. Lỗi"
    ],
    correctAnswer: 1,
    explanation: "Toán tử `and` chỉ trả về `True` khi cả hai vế đều `True`. Do `10 < 5` là `False` nên cả biểu thức là `False`."
  },
  {
    id: 12,
    topic: "Toán tử",
    question: "Toán tử nào dùng để kiểm tra hai giá trị có bằng nhau không?",
    options: [
      "A. =",
      "B. ===",
      "C. ==",
      "D. !="
    ],
    correctAnswer: 2,
    explanation: "Dấu `==` dùng để so sánh bằng. Dấu `=` dùng để gán giá trị."
  },
  {
    id: 13,
    topic: "Toán tử",
    question: "Biểu thức `not (4 == 4)` trả về kết quả gì?",
    options: [
      "A. True",
      "B. False",
      "C. 4",
      "D. Lỗi"
    ],
    correctAnswer: 1,
    explanation: "`4 == 4` là `True`. Toán tử `not` đảo ngược giá trị boolean, nên `not True` trở thành `False`."
  },
  {
    id: 14,
    topic: "Toán tử",
    question: "Thứ tự ưu tiên của các phép toán trong biểu thức `2 + 3 * 4` là gì?",
    options: [
      "A. Cộng trước, nhân sau (kết quả 20)",
      "B. Nhân trước, cộng sau (kết quả 14)",
      "C. Thực hiện từ trái sang phải ngẫu nhiên",
      "D. Báo lỗi vì thiếu dấu ngoặc"
    ],
    correctAnswer: 1,
    explanation: "Python tuân theo quy tắc toán học tiêu chuẩn: nhân/chia thực hiện trước cộng/trừ. Nên 3*4=12, sau đó 2+12=14."
  },

  // ---------------------------------------------------------------------
  // BƯỚC 3: CÂU ĐIỀU KIỆN (7 câu)
  // ---------------------------------------------------------------------
  {
    id: 15,
    topic: "Câu điều kiện",
    question: "Cú pháp đúng của câu lệnh `if` trong Python là gì?",
    options: [
      "A. if (x > 5) { ... }",
      "B. if x > 5 then:",
      "C. if x > 5:",
      "D. if x > 5"
    ],
    correctAnswer: 2,
    explanation: "Python không dùng dấu ngoặc nhọn `{}` hay từ khóa `then`. Cú pháp đúng là `if điều_kiện:`."
  },
  {
    id: 16,
    topic: "Câu điều kiện",
    question: "Từ khóa nào được dùng để kiểm tra nhiều điều kiện liên tiếp?",
    options: [
      "A. else if",
      "B. elseif",
      "C. elif",
      "D. else_if"
    ],
    correctAnswer: 2,
    explanation: "Trong Python, từ khóa `elif` là viết tắt của `else if`, dùng để kiểm tra thêm các điều kiện sau `if`."
  },
  {
    id: 17,
    topic: "Câu điều kiện",
    question: "Đoạn code sau in ra gì?\n```python\nx = 10\nif x > 15:\n    print('A')\nelif x == 10:\n    print('B')\nelse:\n    print('C')\n```",
    options: [
      "A. A",
      "B. B",
      "C. C",
      "D. A và B"
    ],
    correctAnswer: 1,
    explanation: "Vì `x = 10` nên điều kiện `x > 15` sai, nó chuyển sang kiểm tra `x == 10` (đúng), do đó in ra 'B' và kết thúc."
  },
  {
    id: 18,
    topic: "Câu điều kiện",
    question: "Python dùng ký hiệu nào để xác định khối lệnh bên trong `if`, `for`, `while`?",
    options: [
      "A. Dấu ngoặc nhọn {}",
      "B. Dấu ngoặc vuông []",
      "C. Từ khóa begin và end",
      "D. Khoảng trắng thụt lề (Indentation)"
    ],
    correctAnswer: 3,
    explanation: "Python bắt buộc sử dụng thụt lề (thường là 4 khoảng trắng) để nhóm các câu lệnh thành một khối."
  },
  {
    id: 19,
    topic: "Câu điều kiện",
    question: "Từ khóa nào được dùng để bắt đầu một câu điều kiện trong Python?",
    options: [
      "A. if",
      "B. when",
      "C. check",
      "D. case"
    ],
    correctAnswer: 0,
    explanation: "Trong Python, từ khóa `if` luôn được dùng để bắt đầu một khối lệnh điều kiện."
  },
  {
    id: 20,
    topic: "Câu điều kiện",
    question: "Đoạn code sau in ra gì?\n```python\nif True:\n    print(1)\nif False:\n    print(2)\nelse:\n    print(3)\n```",
    options: [
      "A. 1",
      "B. 1 và 3",
      "C. 3",
      "D. 1, 2 và 3"
    ],
    correctAnswer: 1,
    explanation: "`if True:` sẽ chạy và in ra 1. Lệnh `if False:` không chạy, chuyển xuống nhánh `else:` và in ra 3."
  },
  {
    id: 21,
    topic: "Câu điều kiện",
    question: "Từ khóa nào dùng để kiểm tra thêm một điều kiện mới nếu điều kiện `if` đầu tiên sai?",
    options: [
      "A. else if",
      "B. elseif",
      "C. elif",
      "D. else"
    ],
    correctAnswer: 2,
    explanation: "Trong Python, `elif` (viết tắt của else if) được dùng để nối tiếp các điều kiện cần kiểm tra."
  },

  // ---------------------------------------------------------------------
  // BƯỚC 4: VÒNG LẶP FOR (6 câu)
  // ---------------------------------------------------------------------
  {
    id: 22,
    topic: "Vòng lặp for",
    question: "Hàm `range(5)` tạo ra chuỗi số nào?",
    options: [
      "A. 1, 2, 3, 4, 5",
      "B. 0, 1, 2, 3, 4",
      "C. 0, 1, 2, 3, 4, 5",
      "D. 1, 2, 3, 4"
    ],
    correctAnswer: 1,
    explanation: "`range(n)` mặc định bắt đầu từ 0 và kết thúc ở n-1. Nên `range(5)` tạo ra các số từ 0 đến 4."
  },
  {
    id: 23,
    topic: "Vòng lặp for",
    question: "Đoạn code sau in ra kết quả gì?\n```python\nfor i in range(2, 5):\n    print(i, end=' ')\n```",
    options: [
      "A. 2 3 4",
      "B. 2 3 4 5",
      "C. 1 2 3 4",
      "D. 3 4 5"
    ],
    correctAnswer: 0,
    explanation: "`range(start, stop)` bắt đầu từ start và kết thúc ở stop-1. Kết quả in ra 2 3 4."
  },
  {
    id: 24,
    topic: "Vòng lặp for",
    question: "Để lặp từ 10 xuống 1 (giảm dần) bằng vòng lặp `for`, ta dùng hàm `range` như thế nào?",
    options: [
      "A. range(10, 1)",
      "B. range(1, 11, -1)",
      "C. range(10, 0, -1)",
      "D. range(10, 1, -1)"
    ],
    correctAnswer: 2,
    explanation: "Cú pháp `range(start, stop, step)`. Để lặp từ 10 xuống 1, start=10, stop=0 (không lấy 0), step=-1."
  },
  {
    id: 25,
    topic: "Vòng lặp for",
    question: "Làm thế nào để duyệt qua từng ký tự trong chuỗi `s = 'ABC'`?",
    options: [
      "A. for char in s:",
      "B. for char = s:",
      "C. for char in range(s):",
      "D. for char in length(s):"
    ],
    correctAnswer: 0,
    explanation: "Trong Python, bạn có thể duyệt trực tiếp qua các phần tử của một chuỗi bằng vòng lặp `for char in string:`."
  },
  {
    id: 26,
    topic: "Vòng lặp for",
    question: "Đoạn code vòng lặp lồng nhau sau sẽ in ra từ 'Hi' bao nhiêu lần?\n```python\nfor i in range(2):\n    for j in range(3):\n        print('Hi')\n```",
    options: [
      "A. 2 lần",
      "B. 3 lần",
      "C. 5 lần",
      "D. 6 lần"
    ],
    correctAnswer: 3,
    explanation: "Vòng lặp ngoài chạy 2 lần (i=0,1). Mỗi lần lặp ngoài, vòng lặp trong chạy 3 lần. Tổng cộng 2 * 3 = 6 lần."
  },
  {
    id: 27,
    topic: "Vòng lặp for",
    question: "Để lặp lại một khối lệnh 5 lần, ta dùng cách viết nào sau đây?",
    options: [
      "A. loop(5):",
      "B. for i in range(5):",
      "C. for i = 1 to 5:",
      "D. repeat 5:"
    ],
    correctAnswer: 1,
    explanation: "Trong Python, vòng lặp `for i in range(5):` sẽ lặp 5 lần (với i nhận các giá trị từ 0 đến 4)."
  },

  // ---------------------------------------------------------------------
  // BƯỚC 5: VÒNG LẶP WHILE (6 câu)
  // ---------------------------------------------------------------------
  {
    id: 28,
    topic: "Vòng lặp while",
    question: "Vòng lặp `while` sẽ tiếp tục chạy khi nào?",
    options: [
      "A. Khi điều kiện của nó là False",
      "B. Số lần lặp được xác định trước",
      "C. Khi điều kiện của nó là True",
      "D. Tùy thuộc vào lệnh break"
    ],
    correctAnswer: 2,
    explanation: "Cú pháp `while điều_kiện:`. Vòng lặp sẽ tiếp tục chừng nào điều kiện vẫn còn đúng (`True`)."
  },
  {
    id: 29,
    topic: "Vòng lặp while",
    question: "Câu lệnh nào dùng để thoát hoàn toàn khỏi vòng lặp ngay lập tức?",
    options: [
      "A. stop",
      "B. exit",
      "C. break",
      "D. continue"
    ],
    correctAnswer: 2,
    explanation: "`break` được dùng để ngắt (thoát) vòng lặp `for` hoặc `while` hiện tại ngay lập tức."
  },
  {
    id: 30,
    topic: "Vòng lặp while",
    question: "Câu lệnh nào được sử dụng để lập tức dừng và thoát khỏi vòng lặp?",
    options: [
      "A. stop",
      "B. end",
      "C. exit",
      "D. break"
    ],
    correctAnswer: 3,
    explanation: "Lệnh `break` sẽ ngay lập tức phá vỡ vòng lặp gần nhất chứa nó và chuyển điều khiển sang lệnh đứng ngay sau vòng lặp."
  },
  {
    id: 31,
    topic: "Vòng lặp while",
    question: "Đoạn code sau in ra gì?\n```python\ni = 1\nwhile i < 4:\n    print(i, end=' ')\n    i += 1\n```",
    options: [
      "A. 1 2 3",
      "B. 1 2 3 4",
      "C. Vòng lặp vô hạn",
      "D. 2 3 4"
    ],
    correctAnswer: 0,
    explanation: "Biến i bắt đầu từ 1, lặp khi `i < 4` (tức là 1, 2, 3). Sau khi i = 4 vòng lặp dừng lại. Kết quả in ra 1 2 3."
  },
  {
    id: 32,
    topic: "Vòng lặp while",
    question: "Nguyên nhân chính dẫn đến vòng lặp vô hạn (infinite loop) ở vòng lặp `while` là gì?",
    options: [
      "A. Lỗi cú pháp",
      "B. Quên cập nhật biến điều kiện trong thân vòng lặp",
      "C. Sử dụng lệnh break sai cách",
      "D. Viết điều kiện là False"
    ],
    correctAnswer: 1,
    explanation: "Nếu trong thân vòng lặp không có lệnh nào làm thay đổi điều kiện (ví dụ tăng/giảm biến đếm), điều kiện sẽ mãi `True` và gây lặp vô hạn."
  },
  {
    id: 33,
    topic: "Vòng lặp while",
    question: "Có thể sử dụng `else` kết hợp với vòng lặp `while` trong Python không?",
    options: [
      "A. Không, else chỉ dùng cho if",
      "B. Không, Python không hỗ trợ",
      "C. Có, khối else sẽ chạy khi vòng lặp while kết thúc tự nhiên (không bị break)",
      "D. Có, khối else sẽ chạy nếu điều kiện while ngay từ đầu là True"
    ],
    correctAnswer: 2,
    explanation: "Python cho phép dùng `while...else`. Khối lệnh `else` sẽ được thực thi khi điều kiện vòng lặp trở thành `False` bình thường (không bị ngắt bởi `break`)."
  },

  // ---------------------------------------------------------------------
  // BƯỚC 6: DANH SÁCH - LIST (6 câu)
  // ---------------------------------------------------------------------
  {
    id: 34,
    topic: "Danh sách - List",
    question: "Ký hiệu nào dùng để tạo một danh sách (list) trong Python?",
    options: [
      "A. {}",
      "B. ()",
      "C. []",
      "D. <>"
    ],
    correctAnswer: 2,
    explanation: "Danh sách (List) trong Python được định nghĩa bằng các giá trị đặt bên trong cặp dấu ngoặc vuông `[]`."
  },
  {
    id: 35,
    topic: "Danh sách - List",
    question: "Làm thế nào để lấy phần tử ĐẦU TIÊN của danh sách `arr = [10, 20, 30]`?",
    options: [
      "A. arr[1]",
      "B. arr[0]",
      "C. arr.first()",
      "D. arr[0.0]"
    ],
    correctAnswer: 1,
    explanation: "Trong Python, chỉ mục (index) của List bắt đầu từ 0. Nên phần tử đầu tiên nằm ở vị trí 0."
  },
  {
    id: 36,
    topic: "Danh sách - List",
    question: "Phương thức nào dùng để thêm một phần tử vào CUỐI danh sách?",
    options: [
      "A. insert()",
      "B. add()",
      "C. push()",
      "D. append()"
    ],
    correctAnswer: 3,
    explanation: "Phương thức `append(x)` được dùng để thêm một mục x vào cuối danh sách hiện tại."
  },
  {
    id: 37,
    topic: "Danh sách - List",
    question: "Đoạn code sau in ra gì?\n```python\narr = [1, 2, 3]\narr.remove(2)\nprint(arr)\n```",
    options: [
      "A. [1, 3]",
      "B. [2, 3]",
      "C. [1, 2]",
      "D. Lỗi"
    ],
    correctAnswer: 0,
    explanation: "Phương thức `remove(x)` sẽ xóa phần tử đầu tiên trong danh sách có giá trị bằng x. Do đó số 2 bị xóa khỏi mảng."
  },
  {
    id: 38,
    topic: "Danh sách - List",
    question: "Hàm nào trả về số lượng phần tử của một danh sách?",
    options: [
      "A. count()",
      "B. size()",
      "C. length()",
      "D. len()"
    ],
    correctAnswer: 3,
    explanation: "Hàm `len(list)` trả về số lượng các mục (độ dài) của danh sách."
  },
  {
    id: 39,
    topic: "Danh sách - List",
    question: "Làm thế nào để lấy phần tử CUỐI CÙNG của danh sách bằng số âm?",
    options: [
      "A. arr[-1]",
      "B. arr[-0]",
      "C. arr[last]",
      "D. arr[end]"
    ],
    correctAnswer: 0,
    explanation: "Python hỗ trợ chỉ mục âm (negative indexing), trong đó `-1` trỏ đến phần tử cuối cùng, `-2` là phần tử áp chót, v.v."
  },

  // ---------------------------------------------------------------------
  // BƯỚC 7: XÂU KÝ TỰ - STRING (6 câu)
  // ---------------------------------------------------------------------
  {
    id: 40,
    topic: "Xâu ký tự - String",
    question: "Đoạn code sau in ra gì?\n```python\ns = 'Python'\nprint(s[0:2])\n```",
    options: [
      "A. Pyt",
      "B. yth",
      "C. Py",
      "D. P"
    ],
    correctAnswer: 2,
    explanation: "Cắt chuỗi (Slicing) `s[start:stop]` sẽ lấy từ chỉ mục `start` đến `stop-1`. Do đó `s[0:2]` lấy ký tự ở index 0 và 1 ('P' và 'y')."
  },
  {
    id: 41,
    topic: "Xâu ký tự - String",
    question: "Phương thức nào dùng để chuyển toàn bộ chuỗi sang CHỮ HOA?",
    options: [
      "A. uppercase()",
      "B. upper()",
      "C. toUpper()",
      "D. caps()"
    ],
    correctAnswer: 1,
    explanation: "Phương thức `upper()` trong Python trả về một bản sao của chuỗi với tất cả các ký tự được chuyển thành chữ hoa."
  },
  {
    id: 42,
    topic: "Xâu ký tự - String",
    question: "Làm thế nào để kiểm tra xem một từ có nằm trong một chuỗi hay không?",
    options: [
      "A. Dùng hàm includes()",
      "B. Dùng từ khóa in",
      "C. Dùng hàm contains()",
      "D. Dùng từ khóa has"
    ],
    correctAnswer: 1,
    explanation: "Toán tử `in` được dùng để kiểm tra một xâu con có tồn tại trong một xâu ký tự lớn hơn hay không. Ví dụ: `'a' in 'apple'` trả về `True`."
  },
  {
    id: 43,
    topic: "Xâu ký tự - String",
    question: "Đoạn code sau in ra kết quả gì?\n```python\ns = 'hello'\nprint(len(s))\n```",
    options: [
      "A. 4",
      "B. 5",
      "C. 6",
      "D. Lỗi"
    ],
    correctAnswer: 1,
    explanation: "Hàm `len()` trả về độ dài (số ký tự) của xâu. Chữ 'hello' có 5 ký tự nên kết quả là 5."
  },
  {
    id: 44,
    topic: "Xâu ký tự - String",
    question: "Phương thức `find(sub)` của chuỗi sẽ trả về gì nếu không tìm thấy chuỗi con `sub`?",
    options: [
      "A. Báo lỗi",
      "B. False",
      "C. None",
      "D. -1"
    ],
    correctAnswer: 3,
    explanation: "Phương thức `find()` trả về chỉ mục xuất hiện đầu tiên của chuỗi con, nếu không tìm thấy nó sẽ trả về `-1`."
  },
  {
    id: 45,
    topic: "Xâu ký tự - String",
    question: "Làm thế nào để lặp qua từng ký tự của chuỗi `s = 'hi'` ?",
    options: [
      "A. for c in s:",
      "B. while c < s:",
      "C. for c in range(s):",
      "D. foreach(s)"
    ],
    correctAnswer: 0,
    explanation: "Có thể duyệt xâu ký tự trực tiếp bằng vòng lặp `for in`. Biến `c` sẽ lần lượt nhận giá trị là từng ký tự trong xâu."
  },

  // ---------------------------------------------------------------------
  // BƯỚC 8: HÀM - FUNCTION (5 câu)
  // ---------------------------------------------------------------------
  {
    id: 46,
    topic: "Hàm - Function",
    question: "Từ khóa nào dùng để định nghĩa (tạo mới) một hàm trong Python?",
    options: [
      "A. function",
      "B. func",
      "C. def",
      "D. define"
    ],
    correctAnswer: 2,
    explanation: "Trong Python, từ khóa `def` được sử dụng để bắt đầu khai báo một hàm mới."
  },
  {
    id: 47,
    topic: "Hàm - Function",
    question: "Làm thế nào để gọi hàm có tên là `my_function`?",
    options: [
      "A. call my_function",
      "B. my_function()",
      "C. run my_function()",
      "D. execute my_function"
    ],
    correctAnswer: 1,
    explanation: "Để thực thi (gọi) một hàm, ta viết tên hàm theo sau bởi cặp dấu ngoặc tròn `()`."
  },
  {
    id: 48,
    topic: "Hàm - Function",
    question: "Câu lệnh nào dùng để trả về giá trị từ một hàm?",
    options: [
      "A. return",
      "B. output",
      "C. print",
      "D. get"
    ],
    correctAnswer: 0,
    explanation: "Từ khóa `return` được dùng để kết thúc hàm và trả về một giá trị cho nơi đã gọi hàm đó."
  },
  {
    id: 49,
    topic: "Hàm - Function",
    question: "Sự khác biệt giữa biến toàn cục (global) và biến cục bộ (local) là gì?",
    options: [
      "A. Biến cục bộ khai báo ngoài hàm, biến toàn cục khai báo trong hàm",
      "B. Biến cục bộ khai báo trong hàm, chỉ dùng được trong hàm đó; biến toàn cục khai báo ngoài hàm",
      "C. Cả hai là giống nhau",
      "D. Python không có khái niệm cục bộ/toàn cục"
    ],
    correctAnswer: 1,
    explanation: "Biến định nghĩa bên trong một hàm chỉ tồn tại trong hàm đó (local). Biến định nghĩa ngoài hàm có thể truy cập từ mọi nơi (global)."
  },
  {
    id: 50,
    topic: "Hàm - Function",
    question: "Đoạn code sau in ra kết quả gì?\n```python\ndef add(a, b=2):\n    return a + b\n\nprint(add(5))\n```",
    options: [
      "A. Lỗi vì thiếu tham số b",
      "B. 5",
      "C. 7",
      "D. 2"
    ],
    correctAnswer: 2,
    explanation: "Hàm `add` có tham số mặc định `b = 2`. Khi gọi `add(5)`, `a` nhận giá trị 5 và `b` lấy giá trị mặc định là 2. Kết quả trả về là 7."
  }
];
