// =====================================================================
// DỮ LIỆU BÀI HỌC: Advance Python - Bài 2: Làm quen với lớp và đối tượng
// Trạng thái: Đã cập nhật 20 câu hỏi trắc nghiệm OOP
// =====================================================================

window.LESSON_DATA = window.LESSON_DATA || {};
window.LESSON_DATA['advance_2'] = {
  quizData: [
    {
        "id": 1,
        "topic": "Lớp và đối tượng",
        "question": "Trong lập trình hướng đối tượng, Class (Lớp) là gì?",
        "options": [
            "A. Một đối tượng cụ thể",
            "B. Một bản thiết kế để tạo ra đối tượng",
            "C. Một biến",
            "D. Một hàm"
        ],
        "correctAnswer": 1,
        "explanation": "Class đóng vai trò như bản thiết kế (khuôn mẫu) chứa các thuộc tính và phương thức để tạo ra các đối tượng cụ thể."
    },
    {
        "id": 2,
        "topic": "Lớp và đối tượng",
        "question": "Object (Đối tượng) là gì?",
        "options": [
            "A. Một biến số",
            "B. Một thực thể được tạo từ lớp",
            "C. Một thư viện",
            "D. Một vòng lặp"
        ],
        "correctAnswer": 1,
        "explanation": "Đối tượng là một thực thể cụ thể (ví dụ con mèo Milu) được tạo ra từ bản thiết kế là Lớp (ví dụ Lớp Mèo)."
    },
    {
        "id": 3,
        "topic": "Lớp và đối tượng",
        "question": "Từ khóa nào dùng để khai báo lớp trong Python?",
        "options": [
            "A. object",
            "B. class",
            "C. define",
            "D. new"
        ],
        "correctAnswer": 1,
        "explanation": "Từ khóa `class` được dùng để khai báo một lớp mới trong Python."
    },
    {
        "id": 4,
        "topic": "Lớp và đối tượng",
        "question": "Sau khi khai báo lớp, muốn tạo đối tượng ta cần:",
        "options": [
            "A. Gọi tên lớp kèm dấu ngoặc tròn ()",
            "B. Dùng print()",
            "C. Dùng input()",
            "D. Dùng if"
        ],
        "correctAnswer": 0,
        "explanation": "Cú pháp tạo đối tượng: `tên_đối_tượng = TênLớp()`."
    },
    {
        "id": 5,
        "topic": "Lớp và đối tượng",
        "question": "Thuộc tính (Attribute) dùng để:",
        "options": [
            "A. Lặp chương trình",
            "B. Mô tả đặc điểm của đối tượng",
            "C. Nhập dữ liệu",
            "D. In dữ liệu"
        ],
        "correctAnswer": 1,
        "explanation": "Thuộc tính dùng để lưu trữ các thông tin, đặc điểm của đối tượng (như màu sắc, kích thước, tên...)."
    },
    {
        "id": 6,
        "topic": "Lớp và đối tượng",
        "question": "Để truy cập thuộc tính của một đối tượng, ta dùng:",
        "options": [
            "A. Dấu phẩy ,",
            "B. Dấu hai chấm :",
            "C. Dấu chấm .",
            "D. Dấu chấm phẩy ;"
        ],
        "correctAnswer": 2,
        "explanation": "Cú pháp là: `tên_đối_tượng.tên_thuộc_tính`."
    },
    {
        "id": 7,
        "topic": "Lớp và đối tượng",
        "question": "Lớp Student có thuộc tính name. Muốn lấy tên của đối tượng st, ta viết:",
        "options": [
            "A. st(name)",
            "B. st.name",
            "C. name.st",
            "D. Student.name()"
        ],
        "correctAnswer": 1,
        "explanation": "Sử dụng dấu chấm `.` để truy cập thuộc tính name của đối tượng st."
    },
    {
        "id": 8,
        "topic": "Lớp và đối tượng",
        "question": "Một lớp có thể tạo được bao nhiêu đối tượng?",
        "options": [
            "A. 1",
            "B. 2",
            "C. 10",
            "D. Nhiều đối tượng"
        ],
        "correctAnswer": 3,
        "explanation": "Từ một bản thiết kế (Lớp), ta có thể tạo ra vô số thực thể (Đối tượng) khác nhau."
    },
    {
        "id": 9,
        "topic": "Lớp và đối tượng",
        "question": "Đâu là tên lớp phù hợp theo quy ước đặt tên thông dụng?",
        "options": [
            "A. student",
            "B. Student",
            "C. 123Student",
            "D. classStudent"
        ],
        "correctAnswer": 1,
        "explanation": "Tên lớp thường được viết hoa chữ cái đầu tiên (PascalCase)."
    },
    {
        "id": 10,
        "topic": "Lớp và đối tượng",
        "question": "Đâu là tên đối tượng phù hợp?",
        "options": [
            "A. Student",
            "B. student",
            "C. Class",
            "D. Object"
        ],
        "correctAnswer": 1,
        "explanation": "Tên đối tượng thường viết thường hoặc dùng snake_case, tránh viết hoa chữ đầu tiên để không nhầm với tên lớp."
    },
    {
        "id": 11,
        "topic": "Lớp và đối tượng",
        "question": "Khi thay đổi thuộc tính trực tiếp trên một đối tượng, thông thường:",
        "options": [
            "A. Chỉ đối tượng đó nhận giá trị mới",
            "B. Tất cả đối tượng đều bị xóa",
            "C. Lớp bị xóa",
            "D. Chương trình luôn báo lỗi"
        ],
        "correctAnswer": 0,
        "explanation": "Mỗi đối tượng có bộ thuộc tính riêng độc lập, nên thay đổi của đối tượng này không ảnh hưởng đến đối tượng khác."
    },
    {
        "id": 12,
        "topic": "Lớp và đối tượng",
        "question": "Trong phạm vi bài học này, lớp được dùng để chứa:",
        "options": [
            "A. Các thuộc tính mô tả đối tượng",
            "B. Chỉ vòng lặp",
            "C. Chỉ điều kiện",
            "D. Chỉ lệnh nhập dữ liệu"
        ],
        "correctAnswer": 0,
        "explanation": "Trong bài này, lớp đóng vai trò định nghĩa các thuộc tính cơ bản để tạo đối tượng."
    },
    {
        "id": 13,
        "topic": "Lớp và đối tượng",
        "question": "Thuộc tính nào phù hợp với lớp Student?",
        "options": [
            "A. name",
            "B. age",
            "C. school",
            "D. Cả A, B và C"
        ],
        "correctAnswer": 3,
        "explanation": "Học sinh (Student) đều có các đặc điểm cơ bản như tên, tuổi và trường học."
    },
    {
        "id": 14,
        "topic": "Lớp và đối tượng",
        "question": "Đối tượng nào có thể thuộc lớp Car?",
        "options": [
            "A. Một chiếc Toyota Vios cụ thể",
            "B. Một chiếc laptop",
            "C. Một học sinh",
            "D. Một quyển sách"
        ],
        "correctAnswer": 0,
        "explanation": "Lớp Car (Xe hơi) dùng để tạo ra các đối tượng là những chiếc xe hơi cụ thể."
    },
    {
        "id": 15,
        "topic": "Lớp và đối tượng",
        "question": "Đâu là ví dụ đúng về lớp và đối tượng?",
        "options": [
            "A. Lớp: Học sinh — Đối tượng: Nguyễn Văn A",
            "B. Lớp: Nguyễn Văn A — Đối tượng: Học sinh",
            "C. Lớp: 15 tuổi — Đối tượng: Học sinh",
            "D. Lớp: Điểm số — Đối tượng: Toán"
        ],
        "correctAnswer": 0,
        "explanation": "Lớp là khái niệm chung (Học sinh), còn đối tượng là một ví dụ cụ thể có thật (bạn Nguyễn Văn A)."
    },
    {
        "id": 16,
        "topic": "Lớp và đối tượng",
        "question": "Kết quả của đoạn chương trình sau là gì?\n\n```python\nclass Student:\n    name = \"An\"\n\nst = Student()\nprint(st.name)\n```",
        "options": [
            "A. Student",
            "B. name",
            "C. An",
            "D. Lỗi"
        ],
        "correctAnswer": 2,
        "explanation": "Đối tượng `st` lấy giá trị mặc định của thuộc tính `name` trong lớp `Student` là \"An\"."
    },
    {
        "id": 17,
        "topic": "Lớp và đối tượng",
        "question": "Kết quả của đoạn chương trình sau là gì?\n\n```python\nclass Student:\n    age = 14\n\nst = Student()\nst.age = 15\n\nprint(st.age)\n```",
        "options": [
            "A. 14",
            "B. 15",
            "C. Student",
            "D. Lỗi"
        ],
        "correctAnswer": 1,
        "explanation": "Thuộc tính `age` ban đầu là 14, sau đó được thay đổi thành 15 cho đối tượng `st`."
    },
    {
        "id": 18,
        "topic": "Lớp và đối tượng",
        "question": "Kết quả của đoạn chương trình sau là gì?\n\n```python\nclass Dog:\n    color = \"White\"\n\ndog1 = Dog()\ndog2 = Dog()\n\ndog2.color = \"Black\"\nprint(dog1.color)\n```",
        "options": [
            "A. White",
            "B. Black",
            "C. Dog",
            "D. Lỗi"
        ],
        "correctAnswer": 0,
        "explanation": "Thuộc tính của `dog2` thay đổi thành Black, nhưng `dog1` không bị ảnh hưởng và vẫn giữ màu White mặc định."
    },
    {
        "id": 19,
        "topic": "Lớp và đối tượng",
        "question": "Có bao nhiêu dòng được in ra màn hình trong chương trình sau?\n\n```python\nclass Student:\n    school = \"MindX\"\n\nst1 = Student()\nst2 = Student()\nst3 = Student()\n\nprint(st1.school)\nprint(st2.school)\nprint(st3.school)\n```",
        "options": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. 4"
        ],
        "correctAnswer": 2,
        "explanation": "Có 3 lệnh print() gọi in 3 thuộc tính của 3 đối tượng khác nhau, do đó sẽ in ra 3 dòng."
    },
    {
        "id": 20,
        "topic": "Lớp và đối tượng",
        "question": "Kết quả của đoạn chương trình sau là gì?\n\n```python\nclass Student:\n    name = \"An\"\n\nst = Student()\n\nif st.name == \"An\":\n    print(\"Đúng\")\nelse:\n    print(\"Sai\")\n```",
        "options": [
            "A. Đúng",
            "B. Sai",
            "C. An",
            "D. Lỗi"
        ],
        "correctAnswer": 0,
        "explanation": "Vì `st.name` mang giá trị mặc định là \"An\", điều kiện `st.name == \"An\"` trả về True, chương trình in ra \"Đúng\"."
    },
    {
        "id": 21,
        "topic": "Lớp và đối tượng",
        "question": "Thuộc tính trong lập trình hướng đối tượng đại diện cho:",
        "options": [
            "A. Điều kiện của đối tượng",
            "B. Hành động của đối tượng",
            "C. Đặc điểm của đối tượng",
            "D. Quan hệ giữa các đối tượng"
        ],
        "correctAnswer": 2,
        "explanation": "Thuộc tính đại diện cho các đặc điểm, thông số trạng thái của một đối tượng."
    },
    {
        "id": 22,
        "topic": "Lớp và đối tượng",
        "question": "Trong Python, OOP là viết tắt của thuật ngữ nào?",
        "options": [
            "A. Object-Oriented Programming",
            "B. Oreo-Object Protocol",
            "C. Oriented-Object Python",
            "D. Object-Orange Program"
        ],
        "correctAnswer": 0,
        "explanation": "OOP là viết tắt của Object-Oriented Programming (Lập trình hướng đối tượng)."
    },
    {
        "id": 23,
        "topic": "Lớp và đối tượng",
        "question": "Để cập nhật giá trị \"John\" cho thuộc tính name của đối tượng friend, câu lệnh đúng là:",
        "options": [
            "A. name = \"John\"",
            "B. friend.name = \"John\"",
            "C. name = Friend(\"John\")",
            "D. \"John\".name()"
        ],
        "correctAnswer": 1,
        "explanation": "Sử dụng cú pháp `đối_tượng.thuộc_tính = giá_trị` để cập nhật dữ liệu."
    },
    {
        "id": 24,
        "topic": "Lớp và đối tượng",
        "question": "Đâu là một câu lệnh khởi tạo đối tượng đúng?",
        "options": [
            "A. DongVat Cho = \"\"",
            "B. Fish.Shark()",
            "C. DuaHau = TraiCay()",
            "D. Tất cả đều đúng"
        ],
        "correctAnswer": 2,
        "explanation": "Cú pháp đúng là `tên_biến = TênLớp()`. A sai cú pháp kiểu dữ liệu của ngôn ngữ khác (C++/Java), B sai cú pháp gọi lớp."
    },
    {
        "id": 25,
        "topic": "Lớp và đối tượng",
        "question": "Cú pháp đúng để khởi tạo một đối tượng là:",
        "options": [
            "A. <Tên đối tượng> = <Tên lớp>()",
            "B. <Kiểu dữ liệu>.<Tên lớp>()",
            "C. <Tên lớp>.<Tên biến>()",
            "D. <Tên thuộc tính>.<Tên lớp>()"
        ],
        "correctAnswer": 0,
        "explanation": "Ví dụ: `st1 = Student()`"
    },
    {
        "id": 26,
        "topic": "Lớp và đối tượng",
        "question": "Trong Python, cú pháp đúng để khai báo một lớp là:",
        "options": [
            "A. <pre>class &lt;Tên lớp&gt;:\n    &lt;Mô tả lớp&gt;</pre>",
            "B. <pre>class &lt;Thuộc tính&gt;:\n    &lt;Mô tả lớp&gt;</pre>",
            "C. <pre>class &lt;Điều kiện&gt;:\n    &lt;Mô tả lớp&gt;</pre>",
            "D. <pre>class &lt;Đối tượng&gt;:\n    &lt;Mô tả lớp&gt;</pre>"
        ],
        "correctAnswer": 0,
        "explanation": "Từ khóa `class` luôn đi kèm với tên lớp muốn định nghĩa."
    },
    {
        "id": 27,
        "topic": "Lớp và đối tượng",
        "question": "Câu lệnh nào in ra số tiền thu được khi bán số chai Sting trên?\n\n```python\nclass NuocUong:\n    DonGia = 0\n    SoLuong = 0\n\nsting = NuocUong()\nsting.DonGia = 10000\nsting.SoLuong = 3\n```",
        "options": [
            "A. print(sting(DonGia * SoLuong))",
            "B. print(NuocUong.DonGia * NuocUong.SoLuong)",
            "C. print(sting.DonGia * sting.SoLuong)",
            "D. print(DonGia * SoLuong)"
        ],
        "correctAnswer": 2,
        "explanation": "Ta phải truy cập vào các thuộc tính của đối tượng `sting` qua cú pháp dấu chấm."
    },
    {
        "id": 28,
        "topic": "Lớp và đối tượng",
        "question": "Chương trình sau in ra kết quả nào?\n\n```python\nclass Student:\n    name = \"\"\n    age = 0\n\nstudent1 = Student()\nstudent1.name = \"Nguyễn Văn A\"\nstudent1.age = 14\n\nstudent2 = Student()\nstudent2.name = \"Trần Thị B\"\nstudent2.age = 13\n\nprint(\"Danh sách học viên gồm:\")\nprint(student2.name)\nprint(student1.name)\n```",
        "options": [
            "A. <pre>Danh sách sinh viên gồm:\nname\nname</pre>",
            "B. <pre>Danh sách học viên gồm:\nstudent1\nstudent2</pre>",
            "C. <pre>Danh sách học viên gồm:\nTrần Thị B\nNguyễn Văn A</pre>",
            "D. <pre>Danh sách học viên gồm:\nNguyễn Văn A\n14\nTrần Thị B\n13</pre>"
        ],
        "correctAnswer": 2,
        "explanation": "Lệnh print in chuỗi tiêu đề, sau đó in tên student2 trước, rồi mới in tên student1 sau."
    }
],
  practiceData: [
    {
        "id": 1,
        "title": "Tạo lớp Student",
        "difficulty": "Dễ",
        "description": "Tạo lớp `Student` có các thuộc tính: `name = \"An\"`, `age = 13`, `school = \"MindX\"`. Sau đó tạo một đối tượng và in toàn bộ thông tin (mỗi thông tin trên một dòng).",
        "hints": [
            "Bước 1: Sử dụng từ khóa `class` để định nghĩa lớp.",
            "Bước 2: Tạo đối tượng bằng `st = Student()`.",
            "Bước 3: Dùng `print(st.name)` để in thuộc tính."
        ],
        "starterCode": "class Student:\n    # Định nghĩa thuộc tính\n    pass\n\n# Tạo đối tượng và in\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "An\n13\nMindX",
                "description": "In đúng thông tin đối tượng Student"
            }
        ]
    },
    {
        "id": 2,
        "title": "Đổi tên học sinh",
        "difficulty": "Dễ",
        "description": "Cho lớp `Student` có thuộc tính `name = \"An\"`. Đổi tên học sinh thành **\"Bình\"** rồi in kết quả ra màn hình.",
        "hints": [
            "Bước 1: Tạo đối tượng từ lớp Student.",
            "Bước 2: Đổi giá trị thuộc tính bằng cú pháp `st.name = \"Bình\"`.",
            "Bước 3: Dùng print() để in."
        ],
        "starterCode": "class Student:\n    name = \"An\"\n\n# Tạo đối tượng, đổi tên và in\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Bình",
                "description": "Đổi và in tên thành công"
            }
        ]
    },
    {
        "id": 3,
        "title": "Lớp Bike",
        "difficulty": "Dễ",
        "description": "Tạo lớp `Bike` gồm các thuộc tính: `brand = \"Giant\"`, `color = \"Blue\"`, `price = 5000000`. Tạo một đối tượng và in từng thuộc tính ra màn hình (mỗi thuộc tính một dòng).",
        "hints": [
            "Bước 1: Định nghĩa lớp Bike với 3 thuộc tính.",
            "Bước 2: Tạo biến đối tượng bike.",
            "Bước 3: In từng thuộc tính bằng 3 lệnh print()."
        ],
        "starterCode": "# Định nghĩa lớp Bike\n\n\n# Tạo đối tượng và in\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Giant\nBlue\n5000000",
                "description": "In đúng 3 thuộc tính của Bike"
            }
        ]
    },
    {
        "id": 4,
        "title": "Hai đối tượng",
        "difficulty": "Dễ",
        "description": "Tạo lớp `Student` có thuộc tính `name = \"\"`. Tạo hai đối tượng `st1` và `st2`. Đặt tên cho `st1` là **\"An\"** và `st2` là **\"Bình\"**. Cuối cùng in tên của cả hai.",
        "hints": [
            "Bước 1: Tạo đối tượng `st1 = Student()` và `st2 = Student()`.",
            "Bước 2: Gán `st1.name = \"An\"` và tương tự cho `st2`.",
            "Bước 3: In tên từng người ra màn hình."
        ],
        "starterCode": "class Student:\n    name = \"\"\n\n# Tạo 2 đối tượng, gán tên và in\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "An\nBình",
                "description": "In tên 2 đối tượng khác nhau"
            }
        ]
    },
    {
        "id": 5,
        "title": "Thay đổi nhiều thuộc tính",
        "difficulty": "Trung bình",
        "description": "Tạo lớp `Student` có `name = \"\"`, `age = 0`, `school = \"\"`. Sau khi tạo đối tượng, hãy đổi `name` thành \"Lan\", `age` thành 15, `school` thành \"MindX\". Sau đó in 3 thuộc tính ra màn hình.",
        "hints": [
            "Bước 1: Tạo đối tượng `st`.",
            "Bước 2: Dùng `st.thuoc_tinh = gia_tri` để thay đổi lần lượt 3 thuộc tính.",
            "Bước 3: In 3 thuộc tính ra."
        ],
        "starterCode": "class Student:\n    name = \"\"\n    age = 0\n    school = \"\"\n\n# Tạo đối tượng, thay đổi thuộc tính và in\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Lan\n15\nMindX",
                "description": "In đúng thông tin đã cập nhật"
            }
        ]
    },
    {
        "id": 6,
        "title": "Lớp Phone",
        "difficulty": "Trung bình",
        "description": "Tạo lớp `Phone` gồm các thuộc tính mặc định: `brand = \"Samsung\"`, `color = \"Black\"`, `storage = \"128GB\"`. In ra thông tin theo đúng mẫu:\nBrand: Samsung\nColor: Black\nStorage: 128GB",
        "hints": [
            "Bước 1: Trong lệnh print(), truyền thêm chuỗi tiêu đề phía trước, ví dụ: `print(\"Brand:\", phone.brand)`."
        ],
        "starterCode": "# Định nghĩa lớp Phone\n\n\n# Tạo đối tượng và in theo mẫu\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Brand: Samsung\nColor: Black\nStorage: 128GB",
                "description": "In thông tin có kèm nhãn"
            }
        ]
    },
    {
        "id": 7,
        "title": "Quản lý thú cưng",
        "difficulty": "Trung bình",
        "description": "Tạo lớp `Pet` gồm các thuộc tính mặc định: `name = \"\"`, `species = \"\"`, `age = 0`. Tạo hai thú cưng: Milu (Dog, 3 tuổi) và Kitty (Cat, 2 tuổi). In thông tin của từng con (tên, giống, tuổi trên cùng một dòng).",
        "hints": [
            "Bước 1: Tạo 2 đối tượng `pet1` và `pet2`.",
            "Bước 2: Thay đổi thông tin cho từng đối tượng.",
            "Bước 3: Dùng `print(pet1.name, pet1.species, pet1.age)` để in trên cùng một dòng."
        ],
        "starterCode": "class Pet:\n    name = \"\"\n    species = \"\"\n    age = 0\n\n# Khởi tạo và gán giá trị\n\n# In kết quả\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Milu Dog 3\nKitty Cat 2",
                "description": "In đúng thông tin của 2 thú cưng"
            }
        ]
    },
    {
        "id": 8,
        "title": "So sánh hai học sinh",
        "difficulty": "Trung bình",
        "description": "Tạo hai học sinh (An - 15 tuổi, Bình - 13 tuổi) từ lớp `Student`. Dùng lệnh `if` kiểm tra, nếu học sinh 1 lớn tuổi hơn học sinh 2 thì in `Học sinh 1 lớn tuổi hơn`. Ngược lại in `Học sinh 2 lớn tuổi hơn hoặc bằng`.",
        "hints": [
            "Bước 1: Tạo lớp `Student` với `name` và `age`.",
            "Bước 2: Tạo `st1` và `st2` và gán thông tin.",
            "Bước 3: Dùng `if st1.age > st2.age:` để kiểm tra."
        ],
        "starterCode": "class Student:\n    name = \"\"\n    age = 0\n\n# Tạo và gán thông tin\n\n# Dùng if-else so sánh tuổi\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "Học sinh 1 lớn tuổi hơn",
                "description": "Kiểm tra cấu trúc điều kiện If-Else với thuộc tính đối tượng"
            }
        ]
    },
    {
        "id": 9,
        "title": "Danh sách đối tượng",
        "difficulty": "Trung bình",
        "description": "Tạo lớp `Student`. Tạo 3 đối tượng (An, Bình, Chi) và lưu tất cả vào một danh sách (list). Dùng vòng lặp `for` duyệt qua danh sách để in ra tên của từng học sinh.",
        "hints": [
            "Bước 1: Tạo `st1`, `st2`, `st3` và gán tên.",
            "Bước 2: Gom vào danh sách `students = [st1, st2, st3]`.",
            "Bước 3: Duyệt `for student in students:` và in ra `student.name`."
        ],
        "starterCode": "class Student:\n    name = \"\"\n\n# Tạo đối tượng và danh sách\n\n# Vòng lặp in tên\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "An\nBình\nChi",
                "description": "Vòng lặp duyệt danh sách đối tượng"
            }
        ]
    },
    {
        "id": 10,
        "title": "Quản lý điểm học sinh",
        "difficulty": "Khó",
        "description": "Tạo lớp `QuanLyDiemHS` gồm: HoTen, Lop, Truong, DiemToan, DiemVan, DiemAnh (tất cả có giá trị mặc định là rỗng hoặc 0).\n- Tạo 3 học sinh (Nguyễn Văn An, Trần Bình, Lê Minh) với điểm tự chọn.\n- Tính điểm trung bình của từng học sinh.\n- In ra thông tin của học sinh có điểm trung bình cao nhất. Nếu có nhiều người bằng điểm thì in tất cả (theo mẫu trong bài học).",
        "hints": [
            "Bước 1: Tạo class và 3 đối tượng, gán đầy đủ thuộc tính.",
            "Bước 2: Cho vào một mảng `danh_sach = [hs1, hs2, hs3]`.",
            "Bước 3: Dùng vòng lặp thứ nhất để tìm `max_dtb`.",
            "Bước 4: Dùng vòng lặp thứ 2 để in ra học sinh có dtb bằng `max_dtb`."
        ],
        "starterCode": "class QuanLyDiemHS:\n    HoTen = \"\"\n    Lop = \"\"\n    Truong = \"\"\n    DiemToan = 0\n    DiemVan = 0\n    DiemAnh = 0\n\n# Bổ sung mã của bạn tại đây\n",
        "testCases": [
            {
                "id": 1,
                "input": "",
                "expectedOutput": "=== Học sinh có điểm trung bình cao nhất ===\nNguyễn Văn An\n8A\nMindX School\n9.0\n----------------\nTrần Bình\n8A\nMindX School\n9.0\n----------------",
                "description": "Kiểm tra đúng đối tượng và format xuất ra"
            }
        ]
    }
]
};
