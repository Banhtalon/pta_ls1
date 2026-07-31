// =====================================================================
// DỮ LIỆU BÀI HỌC: Advance Python - Bài 4: Làm quen với PyQt
// =====================================================================

window.LESSON_DATA = window.LESSON_DATA || {};
window.LESSON_DATA['advance_4'] = {
  quizData: [
    // PHẦN I. CÂU HỎI DỄ (1–15)
    {
      id: 1,
      topic: "PyQt Cơ Bản",
      question: "PyQt là thư viện được sử dụng để làm gì?",
      options: [
        "A. Phân tích dữ liệu",
        "B. Thiết kế và xây dựng giao diện ứng dụng Desktop bằng Python",
        "C. Lập trình Web",
        "D. Quản lý cơ sở dữ liệu"
      ],
      correctAnswer: 1,
      explanation: "PyQt là một trong những thư viện phổ biến nhất để thiết kế và xây dựng giao diện ứng dụng Desktop (GUI) bằng Python."
    },
    {
      id: 2,
      topic: "PyQt Cơ Bản",
      question: "Qt Designer là công cụ dùng để:",
      options: [
        "A. Viết code Python",
        "B. Thiết kế giao diện bằng cách kéo thả",
        "C. Quản lý dữ liệu",
        "D. Chạy chương trình"
      ],
      correctAnswer: 1,
      explanation: "Qt Designer là công cụ trực quan đi kèm với PyQt, cho phép thiết kế giao diện đồ họa bằng thao tác kéo thả rất nhanh chóng."
    },
    {
      id: 3,
      topic: "PyQt Cơ Bản",
      question: "Sau khi thiết kế giao diện bằng Qt Designer, giao diện được lưu với phần mở rộng nào?",
      options: [
        "A. .py",
        "B. .txt",
        "C. .ui",
        "D. .exe"
      ],
      correctAnswer: 2,
      explanation: "File thiết kế từ Qt Designer được lưu trữ dưới định dạng XML với đuôi mở rộng là .ui (User Interface)."
    },
    {
      id: 4,
      topic: "PyQt Cơ Bản",
      question: "Ngôn ngữ lập trình chính khi sử dụng PyQt là:",
      options: [
        "A. Java",
        "B. C++",
        "C. Python",
        "D. JavaScript"
      ],
      correctAnswer: 2,
      explanation: "PyQt là bộ binding (trình bọc) Python cho framework Qt (vốn viết bằng C++)."
    },
    {
      id: 5,
      topic: "PyQt Cơ Bản",
      question: "Widget nào thường dùng để hiển thị văn bản?",
      options: [
        "A. QLabel",
        "B. QPushButton",
        "C. QTextEdit",
        "D. QLineEdit"
      ],
      correctAnswer: 0,
      explanation: "QLabel là Widget cơ bản nhất dùng để hiển thị chữ (văn bản) hoặc hình ảnh."
    },
    {
      id: 6,
      topic: "PyQt Cơ Bản",
      question: "Widget nào cho phép người dùng nhập một dòng văn bản?",
      options: [
        "A. QLabel",
        "B. QPushButton",
        "C. QLineEdit",
        "D. QTextBrowser"
      ],
      correctAnswer: 2,
      explanation: "QLineEdit được dùng khi bạn muốn người dùng nhập vào một dòng văn bản (ví dụ: tên đăng nhập, số điện thoại)."
    },
    {
      id: 7,
      topic: "PyQt Cơ Bản",
      question: "Widget nào tạo một nút bấm?",
      options: [
        "A. QLabel",
        "B. QPushButton",
        "C. QTextEdit",
        "D. QListWidget"
      ],
      correctAnswer: 1,
      explanation: "QPushButton là widget phổ biến nhất để tạo ra một nút bấm cho phép người dùng tương tác."
    },
    {
      id: 8,
      topic: "PyQt Cơ Bản",
      question: "Thiết kế giao diện bằng Qt Designer giúp:",
      options: [
        "A. Không cần lập trình",
        "B. Thiết kế giao diện nhanh hơn",
        "C. Chạy chương trình nhanh hơn",
        "D. Không cần cài Python"
      ],
      correctAnswer: 1,
      explanation: "Qt Designer giúp lập trình viên không phải gõ code để canh chỉnh giao diện, từ đó rút ngắn đáng kể thời gian thiết kế."
    },
    {
      id: 9,
      topic: "PyQt Cơ Bản",
      question: "Sau khi thiết kế giao diện, cần làm gì tiếp theo?",
      options: [
        "A. Xóa file .ui",
        "B. Kết nối giao diện với chương trình Python",
        "C. Cài Windows",
        "D. Tắt Qt Designer"
      ],
      correctAnswer: 1,
      explanation: "Chỉ thiết kế giao diện thôi là chưa đủ, bạn phải dùng code Python để gọi (load) giao diện đó và viết logic xử lý."
    },
    {
      id: 10,
      topic: "PyQt Cơ Bản",
      question: "PyQt hỗ trợ xây dựng ứng dụng trên:",
      options: [
        "A. Chỉ Windows",
        "B. Chỉ Linux",
        "C. Chỉ macOS",
        "D. Nhiều hệ điều hành"
      ],
      correctAnswer: 3,
      explanation: "PyQt là đa nền tảng (cross-platform), có thể chạy trên Windows, macOS, Linux mà không cần sửa code giao diện."
    },
    {
      id: 11,
      topic: "PyQt Cơ Bản",
      question: "Để mở Qt Designer cần:",
      options: [
        "A. Cài PyQt",
        "B. Cài Photoshop",
        "C. Cài Scratch",
        "D. Cài Unity"
      ],
      correctAnswer: 0,
      explanation: "Qt Designer đi kèm với bộ công cụ PyQt5-tools hoặc PyQt6-tools khi cài qua pip."
    },
    {
      id: 12,
      topic: "PyQt Cơ Bản",
      question: "Trong Qt Designer, mỗi thành phần giao diện được gọi là:",
      options: [
        "A. Variable",
        "B. Widget",
        "C. Function",
        "D. Package"
      ],
      correctAnswer: 1,
      explanation: "Widget là tên gọi chung cho các thành phần giao diện trong Qt như nút bấm, nhãn, ô nhập liệu..."
    },
    {
      id: 13,
      topic: "PyQt Cơ Bản",
      question: "Việc đặt objectName giúp:",
      options: [
        "A. Làm giao diện đẹp hơn",
        "B. Python dễ truy cập Widget",
        "C. Giảm dung lượng file",
        "D. Tăng tốc độ máy"
      ],
      correctAnswer: 1,
      explanation: "objectName giống như ID của widget. Python sẽ dựa vào objectName này để tìm và tương tác (đổi chữ, lấy dữ liệu, bắt sự kiện)."
    },
    {
      id: 14,
      topic: "PyQt Cơ Bản",
      question: "Widget nào thường dùng để nhập nhiều dòng văn bản?",
      options: [
        "A. QLabel",
        "B. QTextEdit",
        "C. QPushButton",
        "D. QCheckBox"
      ],
      correctAnswer: 1,
      explanation: "Nếu QLineEdit chỉ dùng cho 1 dòng thì QTextEdit dùng cho đoạn văn bản dài có nhiều dòng."
    },
    {
      id: 15,
      topic: "PyQt Cơ Bản",
      question: "File .ui được tạo bởi:",
      options: [
        "A. VS Code",
        "B. Qt Designer",
        "C. Python",
        "D. GitHub"
      ],
      correctAnswer: 1,
      explanation: "Qt Designer mặc định lưu kết quả thiết kế thành file có định dạng .ui."
    },

    // PHẦN II. CÂU HỎI TRUNG BÌNH (16–20)
    {
      id: 16,
      topic: "PyQt Trung Bình",
      question: "Vì sao nên sử dụng Qt Designer thay vì tự viết toàn bộ giao diện bằng code?",
      options: [
        "A. Không cần Python",
        "B. Thiết kế nhanh, trực quan và dễ chỉnh sửa",
        "C. Chương trình chạy nhanh hơn",
        "D. Không cần PyQt"
      ],
      correctAnswer: 1,
      explanation: "Viết code giao diện thủ công mất nhiều thời gian để mò mẫm tọa độ, kích thước. Qt Designer trực quan giúp làm việc này nhanh hơn."
    },
    {
      id: 17,
      topic: "PyQt Trung Bình",
      question: "Nếu thay đổi objectName của một QPushButton nhưng không sửa trong Python thì điều gì có thể xảy ra?",
      options: [
        "A. Không ảnh hưởng",
        "B. Python không tìm thấy Widget",
        "C. Máy tính bị lỗi",
        "D. File .ui bị xóa"
      ],
      correctAnswer: 1,
      explanation: "Python tìm Widget qua objectName. Nếu bạn đổi objectName trong .ui mà code Python vẫn dùng tên cũ, chương trình sẽ báo lỗi Attribute Error."
    },
    {
      id: 18,
      topic: "PyQt Trung Bình",
      question: "Thư viện nào thường được dùng để nạp giao diện từ file .ui?",
      options: [
        "A. pygame",
        "B. uic",
        "C. turtle",
        "D. pandas"
      ],
      correctAnswer: 1,
      explanation: "Module 'uic' (User Interface Compiler) của PyQt cung cấp hàm loadUi() để đọc file .ui vào chương trình Python."
    },
    {
      id: 19,
      topic: "PyQt Trung Bình",
      question: "Đâu là quy trình hợp lý?",
      options: [
        "A. Thiết kế giao diện → Lưu .ui → Kết nối Python → Chạy chương trình",
        "B. Viết game → Thiết kế giao diện",
        "C. Chạy chương trình → Thiết kế giao diện",
        "D. Cài Office → Viết Python"
      ],
      correctAnswer: 0,
      explanation: "Đây là quy trình chuẩn khi phát triển GUI với PyQt: Tạo UI trước, lưu file .ui, rồi viết logic bằng Python và cuối cùng là chạy."
    },
    {
      id: 20,
      topic: "PyQt Trung Bình",
      question: "Lợi ích lớn nhất của việc tách file giao diện và file Python là:",
      options: [
        "A. Giao diện và xử lý logic dễ bảo trì",
        "B. Chương trình nhẹ hơn",
        "C. Không cần lưu file",
        "D. Không cần VS Code"
      ],
      correctAnswer: 0,
      explanation: "Sự phân tách này tuân thủ mô hình MVC/MVP, giúp code gọn gàng, bạn có thể thiết kế lại giao diện mà không sợ hỏng logic code."
    },

    // PHẦN III. CÂU HỎI NÂNG CẤP (21–28)
    {
      id: 21,
      topic: "PyQt Nâng Cấp",
      question: "PyQt chủ yếu được sử dụng để phát triển loại ứng dụng nào?",
      options: [
        "A. Ứng dụng Web",
        "B. Ứng dụng Desktop có giao diện",
        "C. Game 3D",
        "D. Ứng dụng Android"
      ],
      correctAnswer: 1,
      explanation: "PyQt mạnh mẽ nhất trong mảng Desktop App. Dù có thể chạy trên Mobile nhưng không tối ưu bằng các framework khác."
    },
    {
      id: 22,
      topic: "PyQt Nâng Cấp",
      question: "Điểm nổi bật của Qt Designer là gì?",
      options: [
        "A. Thiết kế giao diện bằng kéo thả Widget",
        "B. Viết thuật toán",
        "C. Quản lý cơ sở dữ liệu",
        "D. Chỉnh sửa ảnh"
      ],
      correctAnswer: 0,
      explanation: "Khả năng Kéo-Thả (Drag & Drop) What You See Is What You Get (WYSIWYG) chính là sức mạnh của Qt Designer."
    },
    {
      id: 23,
      topic: "PyQt Nâng Cấp",
      question: "Module nào thường chứa các Widget như QLabel và QPushButton?",
      options: [
        "A. QtWidgets",
        "B. QtPython",
        "C. PyWidgets",
        "D. GUIWidgets"
      ],
      correctAnswer: 0,
      explanation: "Các thành phần giao diện (UI) cơ bản nằm trong module PyQt5.QtWidgets (hoặc PyQt6.QtWidgets)."
    },
    {
      id: 24,
      topic: "PyQt Nâng Cấp",
      question: "Lệnh nào dùng để đổi tiêu đề cửa sổ?",
      options: [
        "A. setTitle()",
        "B. setWindowTitle()",
        "C. Title()",
        "D. changeTitle()"
      ],
      correctAnswer: 1,
      explanation: "Phương thức setWindowTitle('Tên Tiêu Đề') thuộc lớp QMainWindow/QWidget dùng để thiết lập tên trên thanh tiêu đề cửa sổ."
    },
    {
      id: 25,
      topic: "PyQt Nâng Cấp",
      question: "Widget nào phù hợp nhất để hiển thị nội dung giới thiệu hoặc hướng dẫn ngắn?",
      options: [
        "A. QLabel",
        "B. QPushButton",
        "C. QTextEdit",
        "D. QLineEdit"
      ],
      correctAnswer: 0,
      explanation: "QLabel là lựa chọn phù hợp nhất cho các đoạn text tĩnh chỉ dùng để hiển thị mà không cần chỉnh sửa."
    },
    {
      id: 26,
      topic: "PyQt Nâng Cấp",
      question: "Để nạp giao diện từ file .ui, thường sử dụng:",
      options: [
        "A. uic.loadUi()",
        "B. openUi()",
        "C. loadGUI()",
        "D. importUI()"
      ],
      correctAnswer: 0,
      explanation: "Hàm chuẩn để nạp file giao diện trong Python sử dụng PyQt là uic.loadUi('ten_file.ui', self)."
    },
    {
      id: 27,
      topic: "PyQt Nâng Cấp",
      question: "Cách làm đúng khi phát triển ứng dụng bằng Qt Designer là:",
      options: [
        "A. Lưu file .ui, sau đó tạo file Python để kết nối",
        "B. Đổi file .ui thành .py",
        "C. Chỉ cần Qt Designer",
        "D. Chỉ cần Python"
      ],
      correctAnswer: 0,
      explanation: "Quy trình phát triển chuẩn là thiết kế xong .ui, sau đó tải nó trực tiếp vào logic được viết riêng ở một file .py."
    },
    {
      id: 28,
      topic: "PyQt Nâng Cấp",
      question: "Lợi ích của việc dùng Qt Designer kết hợp PyQt là:",
      options: [
        "A. Thiết kế giao diện trực quan và lập trình xử lý linh hoạt",
        "B. Không cần học Python",
        "C. Không cần Widget",
        "D. Chỉ chạy trên Windows"
      ],
      correctAnswer: 0,
      explanation: "Sự kết hợp này mang lại điểm mạnh của cả hai: Giao diện trực quan của C++ Qt và cú pháp linh hoạt, dễ phát triển của Python."
    }
  ],
  practiceData: [
    {
      id: 1,
      title: "Bài thực hành 1: Thiết kế cửa sổ chào mừng",
      difficulty: "Dễ",
      description: "Yêu cầu:\n- Thiết kế một cửa sổ giao diện có tiêu đề cửa sổ là: Welcome\n- Một Label hiển thị: Chào mừng đến với PyQt\n- Một nút bấm: Bắt đầu\n\nYêu cầu hoàn thành:\n- Lưu giao diện thành file welcome.ui\n- Kết nối giao diện với main.py để chạy được cửa sổ.",
      illustration: "images/mockups/welcome_window_mockup_1785386207673.jpg",
      hints: [
        "Sử dụng công cụ Qt Designer để kéo thả các Widget.",
        "Dùng QLabel để hiển thị chữ 'Chào mừng đến với PyQt'.",
        "Dùng QPushButton để tạo nút 'Bắt đầu'.",
        "Sử dụng uic.loadUi('welcome.ui', self) trong Python để load giao diện."
      ],
      starterCode: "import sys\nfrom PyQt6.QtWidgets import QApplication, QMainWindow\nfrom PyQt6 import uic\n\nclass WelcomeWindow(QMainWindow):\n    def __init__(self):\n        super().__init__()\n        # Load giao diện từ file welcome.ui\n        uic.loadUi('welcome.ui', self)\n\nif __name__ == '__main__':\n    app = QApplication(sys.argv)\n    window = WelcomeWindow()\n    window.show()\n    sys.exit(app.exec())\n",
      testCases: []
    },
    {
      id: 2,
      title: "Bài thực hành 2: Thiết kế giao diện nhập thông tin",
      difficulty: "Dễ",
      description: "Yêu cầu:\n- Thiết kế giao diện gồm tiêu đề cửa sổ: Thông tin học viên\n- Các thành phần:\n  + Label: Họ tên\n  + Line Edit: nhập họ tên\n  + Label: Lớp\n  + Line Edit: nhập lớp\n  + Nút bấm: Lưu\n\nYêu cầu hoàn thành:\n- Lưu thành student.ui\n- Kết nối với main.py",
      illustration: "images/mockups/student_info_mockup_1785386220556.jpg",
      hints: [
        "Dùng QLineEdit để tạo các ô cho phép người dùng nhập chữ.",
        "Dùng QLabel để ghi chú thích (Họ tên, Lớp) bên cạnh các ô nhập liệu.",
        "Nhớ lưu file với tên student.ui."
      ],
      starterCode: "import sys\nfrom PyQt6.QtWidgets import QApplication, QMainWindow\nfrom PyQt6 import uic\n\nclass StudentWindow(QMainWindow):\n    def __init__(self):\n        super().__init__()\n        # Load file student.ui\n        uic.loadUi('student.ui', self)\n\nif __name__ == '__main__':\n    app = QApplication(sys.argv)\n    window = StudentWindow()\n    window.show()\n    sys.exit(app.exec())\n",
      testCases: []
    },
    {
      id: 3,
      title: "Bài thực hành 3: Thiết kế máy tính đơn giản",
      difficulty: "Dễ",
      description: "Yêu cầu:\n- Thiết kế giao diện gồm:\n  + Label: Số thứ nhất\n  + Line Edit\n  + Label: Số thứ hai\n  + Line Edit\n  + Push Button: Tính tổng\n\nYêu cầu hoàn thành:\n- Lưu file calculator.ui\n- Kết nối với main.py\n- (Chưa cần lập trình phép cộng, chỉ thiết kế UI)",
      illustration: "images/mockups/calculator_ui_mockup_1785386231721.jpg",
      hints: [
        "Kéo thả 2 QLabel và 2 QLineEdit tương ứng.",
        "Thêm một QPushButton và đổi chữ thành 'Tính tổng'.",
        "Có thể sắp xếp chúng cho ngay ngắn bằng cách kéo các đường gióng."
      ],
      starterCode: "import sys\nfrom PyQt6.QtWidgets import QApplication, QMainWindow\nfrom PyQt6 import uic\n\nclass CalculatorWindow(QMainWindow):\n    def __init__(self):\n        super().__init__()\n        # Load file calculator.ui\n        uic.loadUi('calculator.ui', self)\n\nif __name__ == '__main__':\n    app = QApplication(sys.argv)\n    window = CalculatorWindow()\n    window.show()\n    sys.exit(app.exec())\n",
      testCases: []
    },
    {
      id: 4,
      title: "Bài thực hành 4: Thiết kế Form Đăng ký",
      difficulty: "Trung bình",
      description: "Yêu cầu:\n- Thiết kế cửa sổ có tiêu đề: Đăng ký\n- Giao diện gồm 4 mục (Mỗi mục gồm Label và Line Edit):\n  + Họ tên\n  + Email\n  + Mật khẩu\n  + Nhập lại mật khẩu\n- Có hai nút: Đăng ký, Làm mới\n\nYêu cầu nâng cao:\n- Thêm dòng: 'Thông tin của bạn sẽ được bảo mật' (Sử dụng màu chữ xanh hoặc xám).\n\nYêu cầu hoàn thành:\n- Xuất thành register.ui\n- Kết nối với main.py",
      illustration: "images/mockups/register_form_mockup_1785386240620.jpg",
      hints: [
        "Với các ô nhập mật khẩu, bạn có thể tìm thuộc tính 'echoMode' của QLineEdit trong Property Editor và chuyển thành 'Password' để ẩn ký tự.",
        "Để đổi màu chữ của QLabel ('Thông tin của bạn sẽ được bảo mật'), tìm thuộc tính 'styleSheet' và nhập: color: gray; hoặc color: blue;"
      ],
      starterCode: "import sys\nfrom PyQt6.QtWidgets import QApplication, QMainWindow\nfrom PyQt6 import uic\n\nclass RegisterWindow(QMainWindow):\n    def __init__(self):\n        super().__init__()\n        # Load file register.ui\n        uic.loadUi('register.ui', self)\n\nif __name__ == '__main__':\n    app = QApplication(sys.argv)\n    window = RegisterWindow()\n    window.show()\n    sys.exit(app.exec())\n",
      testCases: []
    },
    {
      id: 5,
      title: "Bài thực hành 5: Thiết kế Form Đăng nhập",
      difficulty: "Khó",
      description: "Yêu cầu cơ bản:\n- Cửa sổ có tiêu đề: Sign In hoặc Đăng nhập\n- Giao diện gồm:\n  + Label Username, Label Password\n  + Hai ô nhập liệu: Username, Password\n  + Một nút bấm: Đăng nhập\n- Lưu thành login.ui và kết nối với main.py\n\nYêu cầu nâng cao:\n- Bổ sung thêm dòng nhắc nhở 'Vui lòng đăng nhập'\n- Thêm dòng 'Chưa có tài khoản? Đăng ký tại đây' (Chữ 'tại đây' tô màu khác và có gạch chân).\n- Trang trí giao diện hài hòa, căn lề hợp lý, màu sắc thân thiện.",
      illustration: "images/mockups/login_form_mockup_1785386248577.jpg",
      hints: [
        "Phần chữ 'Chưa có tài khoản? Đăng ký tại đây': Bạn có thể dùng QLabel. Để tạo gạch chân và đổi màu, hãy nhấp đúp vào Label, chọn chế độ sửa Rich Text hoặc nhập HTML đơn giản: Chưa có tài khoản? <a href='#' style='color: blue; text-decoration: underline;'>Đăng ký tại đây</a>",
        "Sử dụng công cụ Qt Designer để chỉnh font chữ, kích cỡ và màu sắc trong mục styleSheet của từng Widget."
      ],
      starterCode: "import sys\nfrom PyQt6.QtWidgets import QApplication, QMainWindow\nfrom PyQt6 import uic\n\nclass LoginWindow(QMainWindow):\n    def __init__(self):\n        super().__init__()\n        # Load file login.ui\n        uic.loadUi('login.ui', self)\n\nif __name__ == '__main__':\n    app = QApplication(sys.argv)\n    window = LoginWindow()\n    window.show()\n    sys.exit(app.exec())\n",
      testCases: []
    }
  ]
};
