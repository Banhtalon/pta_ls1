// =====================================================================
// DỮ LIỆU BÀI HỌC: Advance Python - Bài 3: Kế thừa (Inheritance)
// Trạng thái: Đã cập nhật 28 câu hỏi trắc nghiệm
// =====================================================================

window.LESSON_DATA = window.LESSON_DATA || {};
window.LESSON_DATA['advance_3'] = {
  quizData: [
    {
        "id": 1,
        "topic": "Kế thừa",
        "question": "Trong lập trình hướng đối tượng, lớp (class) được hiểu là gì?",
        "options": [
            "A. Một biến chỉ lưu được số nguyên.",
            "B. Một bản thiết kế dùng để tạo ra các đối tượng.",
            "C. Một câu lệnh lặp.",
            "D. Một tệp Python."
        ],
        "correctAnswer": 1,
        "explanation": "Lớp là khuôn mẫu hoặc bản thiết kế dùng để tạo ra các đối tượng có chung nhóm thuộc tính và phương thức."
    },
    {
        "id": 2,
        "topic": "Kế thừa",
        "question": "Đối tượng (object) là gì?",
        "options": [
            "A. Một thể hiện cụ thể được tạo ra từ lớp.",
            "B. Một từ khóa trong Python.",
            "C. Một phép toán.",
            "D. Một vòng lặp."
        ],
        "correctAnswer": 0,
        "explanation": "Đối tượng là một thể hiện cụ thể được tạo ra từ lớp. Ví dụ, student1 có thể là một đối tượng của lớp Student."
    },
    {
        "id": 3,
        "topic": "Kế thừa",
        "question": "Thuộc tính của đối tượng thường dùng để làm gì?",
        "options": [
            "A. Lưu trữ thông tin hoặc trạng thái của đối tượng.",
            "B. Kết thúc chương trình.",
            "C. Tạo vòng lặp.",
            "D. Nhập dữ liệu từ bàn phím."
        ],
        "correctAnswer": 0,
        "explanation": "Thuộc tính lưu trữ dữ liệu mô tả trạng thái của đối tượng, chẳng hạn tên, tuổi hoặc màu sắc."
    },
    {
        "id": 4,
        "topic": "Kế thừa",
        "question": "Phương thức của lớp có chức năng chính là gì?",
        "options": [
            "A. Mô tả hành động hoặc xử lý liên quan đến đối tượng.",
            "B. Đổi tên file Python.",
            "C. Chỉ dùng để lưu số nguyên.",
            "D. Xóa toàn bộ chương trình."
        ],
        "correctAnswer": 0,
        "explanation": "Phương thức mô tả hành động mà đối tượng có thể thực hiện, chẳng hạn speak(), move() hoặc calculate()."
    },
    {
        "id": 5,
        "topic": "Kế thừa",
        "question": "Từ khóa nào được dùng để khai báo một lớp trong Python?",
        "options": [
            "A. object",
            "B. new",
            "C. class",
            "D. create"
        ],
        "correctAnswer": 2,
        "explanation": "Python sử dụng từ khóa class để khai báo một lớp."
    },
    {
        "id": 6,
        "topic": "Kế thừa",
        "question": "Từ khóa nào được dùng để khai báo một phương thức trong Python?",
        "options": [
            "A. def",
            "B. method",
            "C. function",
            "D. make"
        ],
        "correctAnswer": 0,
        "explanation": "Phương thức được khai báo giống hàm thông thường bằng từ khóa def, nhưng được đặt bên trong lớp."
    },
    {
        "id": 7,
        "topic": "Kế thừa",
        "question": "Trong phương thức của lớp, self đại diện cho điều gì?",
        "options": [
            "A. Lớp cha.",
            "B. Đối tượng hiện tại đang gọi phương thức.",
            "C. Tên file Python.",
            "D. Một danh sách."
        ],
        "correctAnswer": 1,
        "explanation": "self tham chiếu đến đối tượng hiện tại đang gọi phương thức."
    },
    {
        "id": 8,
        "topic": "Kế thừa",
        "question": "Cách truy cập thuộc tính name của đối tượng hiện tại là:",
        "options": [
            "A. name.self",
            "B. self.name",
            "C. class.name",
            "D. name()"
        ],
        "correctAnswer": 1,
        "explanation": "Cú pháp self.name dùng để đọc hoặc thay đổi thuộc tính name của đối tượng hiện tại."
    },
    {
        "id": 9,
        "topic": "Kế thừa",
        "question": "Phương thức __init__() thường được dùng để:",
        "options": [
            "A. Khởi tạo giá trị ban đầu cho đối tượng.",
            "B. Xóa một lớp.",
            "C. Dừng chương trình.",
            "D. Tạo vòng lặp."
        ],
        "correctAnswer": 0,
        "explanation": "__init__() thường dùng để gán các giá trị ban đầu cho thuộc tính khi đối tượng được tạo."
    },
    {
        "id": 10,
        "topic": "Kế thừa",
        "question": "Khi nào phương thức __init__() thường được gọi?",
        "options": [
            "A. Khi một đối tượng mới được tạo ra.",
            "B. Khi đóng chương trình.",
            "C. Khi dùng print().",
            "D. Khi xóa biến."
        ],
        "correctAnswer": 0,
        "explanation": "Khi gọi cú pháp như Student(\"An\"), Python tạo đối tượng và gọi __init__() để khởi tạo."
    },
    {
        "id": 11,
        "topic": "Kế thừa",
        "question": "Cú pháp nào tạo đối tượng student1 từ lớp Student?",
        "options": [
            "A. Student = student1()",
            "B. student1 = Student()",
            "C. student1.Student()",
            "D. class student1 = Student"
        ],
        "correctAnswer": 1,
        "explanation": "student1 = Student() tạo một đối tượng từ lớp Student và gán đối tượng đó cho biến student1."
    },
    {
        "id": 12,
        "topic": "Kế thừa",
        "question": "Cú pháp nào gọi phương thức hello() của đối tượng student1?",
        "options": [
            "A. hello.student1()",
            "B. student1:hello()",
            "C. student1.hello()",
            "D. hello(student1.)"
        ],
        "correctAnswer": 2,
        "explanation": "Phương thức của đối tượng được gọi bằng dấu chấm: student1.hello()."
    },
    {
        "id": 13,
        "topic": "Kế thừa",
        "question": "Trong kế thừa, lớp được kế thừa gọi là:",
        "options": [
            "A. Lớp cha.",
            "B. Lớp con.",
            "C. Đối tượng.",
            "D. Thuộc tính."
        ],
        "correctAnswer": 0,
        "explanation": "Lớp cung cấp thuộc tính và phương thức cho lớp khác được gọi là lớp cha."
    },
    {
        "id": 14,
        "topic": "Kế thừa",
        "question": "Trong kế thừa, lớp nhận lại thuộc tính và phương thức từ lớp khác gọi là:",
        "options": [
            "A. Lớp cha.",
            "B. Lớp con.",
            "C. Biến cục bộ.",
            "D. Hàm dựng sẵn."
        ],
        "correctAnswer": 1,
        "explanation": "Lớp nhận lại và sử dụng các thành phần từ lớp cha được gọi là lớp con."
    },
    {
        "id": 15,
        "topic": "Kế thừa",
        "question": "Lợi ích chính của kế thừa là gì?",
        "options": [
            "A. Giúp tái sử dụng mã và hạn chế viết lặp lại.",
            "B. Làm chương trình luôn chạy nhanh gấp đôi.",
            "C. Không cần dùng đối tượng.",
            "D. Không cần khai báo phương thức."
        ],
        "correctAnswer": 0,
        "explanation": "Kế thừa giúp tái sử dụng mã nguồn, tổ chức chương trình rõ ràng và hạn chế lặp lại."
    },
    {
        "id": 16,
        "topic": "Kế thừa",
        "question": "Cho chương trình:\n\n```python\nclass Student:\n    def __init__(self, name):\n        self.name = name\n\n    def introduce(self):\n        return \"Mình là \" + self.name\n\nstudent1 = Student(\"An\")\nprint(student1.introduce())\n```\nKết quả là gì?",
        "options": [
            "A. Student",
            "B. An",
            "C. Mình là An",
            "D. Chương trình báo lỗi."
        ],
        "correctAnswer": 2,
        "explanation": "student1 có thuộc tính name bằng \"An\". Phương thức introduce() ghép chuỗi \"Mình là \" với self.name, nên kết quả là Mình là An."
    },
    {
        "id": 17,
        "topic": "Kế thừa",
        "question": "Cho chương trình:\n\n```python\nclass Counter:\n    def __init__(self, value):\n        self.value = value\n\n    def increase(self):\n        self.value += 1\n\ncounter = Counter(5)\ncounter.increase()\ncounter.increase()\nprint(counter.value)\n```\nKết quả là gì?",
        "options": [
            "A. 5",
            "B. 6",
            "C. 7",
            "D. 8"
        ],
        "correctAnswer": 2,
        "explanation": "Giá trị bắt đầu là 5. Mỗi lần gọi increase() tăng thêm 1. Sau hai lần gọi, giá trị là 7."
    },
    {
        "id": 18,
        "topic": "Kế thừa",
        "question": "Cho chương trình:\n\n```python\nclass Animal:\n    def speak(self):\n        return \"Âm thanh của động vật\"\n\nclass Cat(Animal):\n    pass\n\ncat = Cat()\nprint(cat.speak())\n```\nKết quả là gì?",
        "options": [
            "A. Âm thanh của động vật",
            "B. Cat",
            "C. Không in gì.",
            "D. Báo lỗi vì Cat không có phương thức speak()."
        ],
        "correctAnswer": 0,
        "explanation": "Cat kế thừa Animal. Dù lớp Cat không tự khai báo speak(), đối tượng cat vẫn dùng được phương thức kế thừa từ lớp cha."
    },
    {
        "id": 19,
        "topic": "Kế thừa",
        "question": "Cho chương trình:\n\n```python\nclass Animal:\n    def speak(self):\n        return \"Animal\"\n\nclass Dog(Animal):\n    def speak(self):\n        return \"Gâu gâu\"\n\ndog = Dog()\nprint(dog.speak())\n```\nKết quả là gì?",
        "options": [
            "A. Animal",
            "B. Gâu gâu",
            "C. Dog",
            "D. Chương trình báo lỗi."
        ],
        "correctAnswer": 1,
        "explanation": "Lớp Dog có phương thức speak() riêng (ghi đè), nên phương thức của lớp con được sử dụng và trả về Gâu gâu."
    },
    {
        "id": 20,
        "topic": "Kế thừa",
        "question": "Cho chương trình:\n\n```python\nclass Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height\n\nrect = Rectangle(4, 3)\nrect.width = 5\nprint(rect.area())\n```\nKết quả là gì?",
        "options": [
            "A. 12",
            "B. 15",
            "C. 20",
            "D. Chương trình báo lỗi."
        ],
        "correctAnswer": 1,
        "explanation": "Ban đầu width = 4, sau đó được đổi thành 5. Diện tích mới là 5 × 3 = 15."
    },
    {
        "id": 21,
        "topic": "Kế thừa",
        "question": "Phương thức (method) là gì trong lập trình hướng đối tượng (OOP)?",
        "options": [
            "A. Biến lưu trữ dữ liệu của đối tượng.",
            "B. Hàm được sử dụng để thực hiện các thao tác liên quan đến đối tượng.",
            "C. Đối tượng lưu trữ các thuộc tính của phương thức.",
            "D. Kiểu dữ liệu được sử dụng để định nghĩa đối tượng."
        ],
        "correctAnswer": 1,
        "explanation": "Phương thức là hàm được khai báo trong lớp để thực hiện thao tác hoặc mô tả hành vi của đối tượng."
    },
    {
        "id": 22,
        "topic": "Kế thừa",
        "question": "Trong Python, phương thức của một lớp được định nghĩa bằng cách sử dụng từ khóa nào?",
        "options": [
            "A. method",
            "B. define",
            "C. function",
            "D. def"
        ],
        "correctAnswer": 3,
        "explanation": "Python sử dụng từ khóa def để khai báo hàm và phương thức."
    },
    {
        "id": 23,
        "topic": "Kế thừa",
        "question": "Để gọi một phương thức của đối tượng trong Python, chúng ta sử dụng cú pháp nào?",
        "options": [
            "A. <Tên đối tượng>.<Tên phương thức>()",
            "B. <Tên phương thức>.<Tên đối tượng>()",
            "C. <Tên đối tượng>:<Tên phương thức>()",
            "D. <Tên phương thức>:<Tên đối tượng>()"
        ],
        "correctAnswer": 0,
        "explanation": "Ta gọi phương thức bằng cú pháp <đối tượng>.<phương thức>(), ví dụ student1.hello()."
    },
    {
        "id": 24,
        "topic": "Kế thừa",
        "question": "Phương thức __init__() dùng để làm gì?",
        "options": [
            "A. Khởi tạo một danh sách các phần tử.",
            "B. Xóa một đối tượng khỏi bộ nhớ.",
            "C. Đặt giá trị ban đầu cho các thuộc tính của đối tượng.",
            "D. Thêm một phần tử vào cuối danh sách."
        ],
        "correctAnswer": 2,
        "explanation": "__init__() dùng để khởi tạo các thuộc tính ban đầu của đối tượng khi đối tượng được tạo."
    },
    {
        "id": 25,
        "topic": "Kế thừa",
        "question": "Từ khóa self trong phương thức của một lớp được sử dụng để làm gì?",
        "options": [
            "A. Là từ khóa mặc định, bắt buộc phải có khi xây dựng phương thức.",
            "B. Xác định số lượng tham số của phương thức.",
            "C. Truy cập đến các thuộc tính của đối tượng đang được xử lý.",
            "D. Đánh dấu là một phương thức có thể dùng bên ngoài lớp."
        ],
        "correctAnswer": 2,
        "explanation": "self giúp truy cập các thuộc tính và phương thức của đối tượng hiện tại. Cách diễn đạt chính xác hơn là “đối tượng đang được xử lý”, không phải toàn bộ lớp."
    },
    {
        "id": 26,
        "topic": "Kế thừa",
        "question": "Cho lớp HinhChuNhat gồm hai thuộc tính là chieudai, chieurong và phương thức __init__() để khởi tạo đối tượng:\n\n```python\nclass HinhChuNhat:\n    chieudai = 0\n    chieurong = 0\n\n    def __init__(self, d, r):\n        self.chieudai = d\n        self.chieurong = r\n```\nCần xây dựng thêm phương thức tính chu vi. Hãy chọn phương án đúng nhất.",
        "options": [
            "A. <pre>def ChuVi(self):\n    CV = 2 * (self.chieudai + self.chieurong)\n    return CV</pre>",
            "B. <pre>def ChuVi(self):\n    CV = 2 * chieudai + chieurong\n    return CV</pre>",
            "C. <pre>def ChuVi():\n    CV = 2 * (chieudai + chieurong)\n    return CV</pre>",
            "D. <pre>def ChuVi(self):\n    CV = self.(chieudai + chieurong)\n    return CV</pre>"
        ],
        "correctAnswer": 0,
        "explanation": "Công thức chu vi là 2 × (chiều dài + chiều rộng). Vì hai giá trị là thuộc tính của đối tượng nên phải truy cập bằng self.chieudai và self.chieurong."
    },
    {
        "id": 27,
        "topic": "Kế thừa",
        "question": "Cho chương trình:\n\n```python\nclass Circle:\n    radius = 0\n\n    def __init__(self, _radius):\n        self.radius = _radius\n\n    def circumference(self):\n        return 2 * 3.14 * self.radius\n\ncircle1 = Circle(5)\nprint(circle1.circumference())\n```\nĐoạn mã trên đang thực hiện gì?",
        "options": [
            "A. Tạo một đối tượng Circle mới với bán kính là 5, sau đó in ra chu vi của hình tròn.",
            "B. Tạo một đối tượng Circle mới với bán kính là 5, sau đó in ra thông báo \"5\".",
            "C. Tạo một đối tượng Circle mới với bán kính là 5, sau đó in ra chuỗi \"circumference\".",
            "D. In ra lỗi vì không thể tính chu vi của đối tượng circle1."
        ],
        "correctAnswer": 0,
        "explanation": "Chương trình tạo circle1 với bán kính 5, gọi phương thức circumference() và in chu vi: 2 × 3.14 × 5 = 31.4."
    },
    {
        "id": 28,
        "topic": "Kế thừa",
        "question": "Chương trình sau khi được thực thi sẽ xuất ra màn hình kết quả gì?\n\n```python\nclass MathOperations:\n    result = 0\n\n    def __init__(self, x):\n        self.result = x\n\n    def add(self, x, y):\n        self.result += x + y\n\n    def multiply(self, x, y):\n        self.result += x * y\n\nmath_ops = MathOperations(20)\nmath_ops.add(3, 5)\nmath_ops.multiply(2, 4)\n\nprint(math_ops.result)\n```",
        "options": [
            "A. 16",
            "B. 6",
            "C. 36",
            "D. 8"
        ],
        "correctAnswer": 2,
        "explanation": "Giá trị ban đầu là 20. Sau add(3, 5), kết quả là 28. Sau multiply(2, 4), cộng thêm 8 nên kết quả cuối là 36."
    }
],
  practiceData: [
    {
        "id": 1,
        "title": "Lớp Học sinh",
        "difficulty": "Dễ",
        "description": "Tạo lớp `Student` gồm các thuộc tính `name`, `age`, `school`. Sử dụng `__init__()` để khởi tạo. Viết phương thức `introduce()` để in ra màn hình theo mẫu: `Xin chào, mình là <Tên>, <Tuổi> tuổi.`",
        "hints": [
            "Bước 1: Tạo class Student và hàm `__init__(self, name, age, school)`.",
            "Bước 2: Gán `self.name = name`, v.v.",
            "Bước 3: Viết hàm `introduce(self)` dùng `print()` hoặc f-string."
        ],
        "starterCode": "class Student:\n    # Khởi tạo __init__ tại đây\n\n    # Phương thức introduce\n\n\nst = Student(\"An\", 13, \"MindX\")\nst.introduce()\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Xin chào, mình là An, 13 tuổi.",
                "description": "In đúng câu giới thiệu"
            }
        ]
    },
    {
        "id": 2,
        "title": "Hình chữ nhật",
        "difficulty": "Dễ",
        "description": "Tạo lớp `Rectangle` với thuộc tính `width`, `height`. Viết phương thức `area()` để tính diện tích và `perimeter()` để tính chu vi. Khởi tạo hcn kích thước 4x5 và in ra diện tích, chu vi (mỗi kết quả trên 1 dòng).",
        "hints": [
            "Bước 1: Khởi tạo với `__init__(self, width, height)`.",
            "Bước 2: `area()` trả về `width * height`.",
            "Bước 3: `perimeter()` trả về `2 * (width + height)`."
        ],
        "starterCode": "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    # Thêm phương thức area() và perimeter()\n\n\nr = Rectangle(4, 5)\nprint(r.area())\nprint(r.perimeter())\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "20\n18",
                "description": "Tính đúng diện tích và chu vi"
            }
        ]
    },
    {
        "id": 3,
        "title": "Hình tròn",
        "difficulty": "Dễ",
        "description": "Tạo lớp `Circle` có thuộc tính `radius`. Viết phương thức `circumference()` trả về chu vi hình tròn (Công thức: 2 * 3.14 * radius).",
        "hints": [
            "Bước 1: Khởi tạo với `__init__(self, radius)`.",
            "Bước 2: Phương thức `circumference()` trả về `2 * 3.14 * self.radius`."
        ],
        "starterCode": "class Circle:\n    # Viết mã tại đây\n    pass\n\n\nc = Circle(5)\nprint(c.circumference())\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "31.400000000000002",
                "description": "Tính đúng chu vi hình tròn"
            }
        ]
    },
    {
        "id": 4,
        "title": "Máy tính cộng trừ",
        "difficulty": "Dễ",
        "description": "Tạo lớp `Calculator`. Lớp này không cần thuộc tính. Chỉ cần viết hai phương thức `add(a, b)` trả về tổng và `subtract(a, b)` trả về hiệu.",
        "hints": [
            "Bước 1: Phương thức bắt buộc có tham số `self` đầu tiên.",
            "Bước 2: Ví dụ `def add(self, a, b): return a + b`."
        ],
        "starterCode": "class Calculator:\n    # Viết mã tại đây\n    pass\n\n\ncal = Calculator()\nprint(cal.add(3, 5))\nprint(cal.subtract(8, 2))\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "8\n6",
                "description": "Tính đúng tổng và hiệu"
            }
        ]
    },
    {
        "id": 5,
        "title": "Quản lý sách",
        "difficulty": "Dễ",
        "description": "Tạo lớp `Book` có các thuộc tính `title` và `author`. Viết phương thức `display()` để in ra tên sách và tác giả (mỗi thông tin một dòng).",
        "hints": [
            "Bước 1: `__init__(self, title, author)`.",
            "Bước 2: Phương thức `display(self)` gọi 2 lệnh print."
        ],
        "starterCode": "class Book:\n    # Viết mã tại đây\n    pass\n\n\nbook = Book(\"Python\", \"MindX\")\nbook.display()\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Python\nMindX",
                "description": "In đúng tên sách và tác giả"
            }
        ]
    },
    {
        "id": 6,
        "title": "Xe ô tô",
        "difficulty": "Dễ",
        "description": "Tạo lớp `Car` có thuộc tính `brand` và `color`. Viết phương thức `drive()` in ra câu: `Xe đang chạy.`",
        "hints": [
            "Bước 1: Định nghĩa `__init__` cho `brand` và `color`.",
            "Bước 2: Hàm `drive()` không cần dùng đến các thuộc tính này, chỉ in câu lệnh tĩnh."
        ],
        "starterCode": "class Car:\n    # Viết mã tại đây\n    pass\n\n\ncar = Car(\"Toyota\", \"Đỏ\")\ncar.drive()\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Xe đang chạy.",
                "description": "In đúng thông báo của phương thức drive"
            }
        ]
    },
    {
        "id": 7,
        "title": "Nhân viên",
        "difficulty": "Trung bình",
        "description": "Tạo lớp `Employee` có `name` và `salary`. Viết phương thức `increase(percent)` để tăng `salary` thêm một lượng phần trăm được truyền vào.",
        "hints": [
            "Bước 1: Để tăng lương, công thức là `self.salary += self.salary * percent / 100`.",
            "Bước 2: Lưu ý tham số của hàm tăng lương là `(self, percent)`."
        ],
        "starterCode": "class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    # Viết phương thức increase tại đây\n\n\nemp = Employee(\"Lan\", 1000)\nemp.increase(10)\nprint(emp.salary)\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "1100.0",
                "description": "Tính đúng mức lương sau khi tăng"
            }
        ]
    },
    {
        "id": 8,
        "title": "Kế thừa Động vật",
        "difficulty": "Trung bình",
        "description": "Tạo lớp `Animal` có phương thức `speak()` in ra `Animal`. Sau đó tạo lớp `Dog` kế thừa từ `Animal` và ghi đè (override) phương thức `speak()` để in ra `Gâu gâu`.",
        "hints": [
            "Bước 1: Định nghĩa `class Animal:` và hàm `speak`.",
            "Bước 2: Định nghĩa `class Dog(Animal):` để kế thừa.",
            "Bước 3: Viết lại hàm `speak` bên trong lớp Dog."
        ],
        "starterCode": "class Animal:\n    def speak(self):\n        print(\"Animal\")\n\n# Tạo lớp Dog kế thừa Animal tại đây\n\n\ndog = Dog()\ndog.speak()\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Gâu gâu",
                "description": "Lớp Dog ghi đè thành công phương thức speak"
            }
        ]
    },
    {
        "id": 9,
        "title": "Tài khoản học sinh",
        "difficulty": "Trung bình",
        "description": "Tạo lớp `StudentAccount` có `name` và `score`. Viết phương thức `add_score(point)` để cộng thêm `point` vào điểm hiện tại, và phương thức `show()` để in ra tên và điểm (mỗi thông tin một dòng).",
        "hints": [
            "Bước 1: `__init__(self, name, score)`.",
            "Bước 2: Hàm `add_score` dùng `self.score += point`.",
            "Bước 3: Hàm `show` dùng print."
        ],
        "starterCode": "class StudentAccount:\n    # Viết mã tại đây\n    pass\n\n\nst = StudentAccount(\"An\", 8)\nst.add_score(1)\nst.show()\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "An\n9",
                "description": "Cập nhật và in đúng thông tin điểm"
            }
        ]
    },
    {
        "id": 10,
        "title": "Quản lý tài khoản ngân hàng",
        "difficulty": "Khó",
        "description": "Tạo lớp `BankAccount` với 4 thuộc tính: `bank_name`, `owner`, `account_number`, `balance`.\nYêu cầu:\n1. Khởi tạo `__init__`.\n2. Phương thức `deposit(amount)` nạp tiền, in ra: `Nạp thành công <amount>.`\n3. Phương thức `withdraw(amount)` rút tiền, in `Rút thành công <amount>.` Nếu số dư không đủ, in `Số dư không đủ.`\n4. Phương thức `display_balance()` in chi tiết tài khoản giống như mẫu.",
        "hints": [
            "Bước 1: Gán 4 giá trị truyền vào cho 4 thuộc tính tương ứng bằng `self.thuoc_tinh = gia_tri`.",
            "Bước 2: Phương thức rút tiền cần có hàm if để kiểm tra điều kiện `amount <= self.balance`.",
            "Bước 3: Trong `display_balance()`, có thể in từng dòng thông tin tương ứng với nhãn."
        ],
        "starterCode": "class BankAccount:\n    # Viết toàn bộ class tại đây\n    pass\n\n\naccount = BankAccount(\n    \"MindX Bank\",\n    \"Nguyễn Văn A\",\n    \"123456789\",\n    5000\n)\n\naccount.display_balance()\naccount.deposit(1000)\naccount.withdraw(3000)\naccount.display_balance()\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Ngân hàng: MindX Bank\nChủ tài khoản: Nguyễn Văn A\nSố tài khoản: 123456789\nSố dư: 5000\nNạp thành công 1000.\nRút thành công 3000.\nNgân hàng: MindX Bank\nChủ tài khoản: Nguyễn Văn A\nSố tài khoản: 123456789\nSố dư: 3000",
                "description": "Kiểm tra đúng mọi hành vi của tài khoản"
            }
        ]
    }
]
};
