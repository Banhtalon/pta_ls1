# Bộ 28 câu trắc nghiệm PTA Buổi 3  
## Chủ đề: Phương thức, `self`, `__init__()` và kế thừa

- **Câu 1–15:** Mức dễ – lý thuyết
- **Câu 16–20:** Mức trung bình – đọc hiểu và vận dụng
- **Câu 21–28:** Các câu được bổ sung từ đề bài
- Mỗi câu có **đáp án và giải thích** ở phần sau.
- Cuối tài liệu có **bảng tổng kết đáp án**.

---

# PHẦN I — 15 CÂU DỄ LÝ THUYẾT

## Câu 1
Trong lập trình hướng đối tượng, **lớp (class)** được hiểu là gì?

A. Một biến chỉ lưu được số nguyên.  
B. Một bản thiết kế dùng để tạo ra các đối tượng.  
C. Một câu lệnh lặp.  
D. Một tệp Python.

## Câu 2
**Đối tượng (object)** là gì?

A. Một thể hiện cụ thể được tạo ra từ lớp.  
B. Một từ khóa trong Python.  
C. Một phép toán.  
D. Một vòng lặp.

## Câu 3
Thuộc tính của đối tượng thường dùng để làm gì?

A. Lưu trữ thông tin hoặc trạng thái của đối tượng.  
B. Kết thúc chương trình.  
C. Tạo vòng lặp.  
D. Nhập dữ liệu từ bàn phím.

## Câu 4
Phương thức của lớp có chức năng chính là gì?

A. Mô tả hành động hoặc xử lý liên quan đến đối tượng.  
B. Đổi tên file Python.  
C. Chỉ dùng để lưu số nguyên.  
D. Xóa toàn bộ chương trình.

## Câu 5
Từ khóa nào được dùng để khai báo một lớp trong Python?

A. `object`  
B. `new`  
C. `class`  
D. `create`

## Câu 6
Từ khóa nào được dùng để khai báo một phương thức trong Python?

A. `def`  
B. `method`  
C. `function`  
D. `make`

## Câu 7
Trong phương thức của lớp, `self` đại diện cho điều gì?

A. Lớp cha.  
B. Đối tượng hiện tại đang gọi phương thức.  
C. Tên file Python.  
D. Một danh sách.

## Câu 8
Cách truy cập thuộc tính `name` của đối tượng hiện tại là:

A. `name.self`  
B. `self.name`  
C. `class.name`  
D. `name()`

## Câu 9
Phương thức `__init__()` thường được dùng để:

A. Khởi tạo giá trị ban đầu cho đối tượng.  
B. Xóa một lớp.  
C. Dừng chương trình.  
D. Tạo vòng lặp.

## Câu 10
Khi nào phương thức `__init__()` thường được gọi?

A. Khi một đối tượng mới được tạo ra.  
B. Khi đóng chương trình.  
C. Khi dùng `print()`.  
D. Khi xóa biến.

## Câu 11
Cú pháp nào tạo đối tượng `student1` từ lớp `Student`?

A. `Student = student1()`  
B. `student1 = Student()`  
C. `student1.Student()`  
D. `class student1 = Student`

## Câu 12
Cú pháp nào gọi phương thức `hello()` của đối tượng `student1`?

A. `hello.student1()`  
B. `student1:hello()`  
C. `student1.hello()`  
D. `hello(student1.)`

## Câu 13
Trong kế thừa, lớp được kế thừa gọi là:

A. Lớp cha.  
B. Lớp con.  
C. Đối tượng.  
D. Thuộc tính.

## Câu 14
Trong kế thừa, lớp nhận lại thuộc tính và phương thức từ lớp khác gọi là:

A. Lớp cha.  
B. Lớp con.  
C. Biến cục bộ.  
D. Hàm dựng sẵn.

## Câu 15
Lợi ích chính của kế thừa là gì?

A. Giúp tái sử dụng mã và hạn chế viết lặp lại.  
B. Làm chương trình luôn chạy nhanh gấp đôi.  
C. Không cần dùng đối tượng.  
D. Không cần khai báo phương thức.

---

# PHẦN II — 5 CÂU TRUNG BÌNH

## Câu 16
Cho chương trình:

```python
class Student:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        return "Mình là " + self.name

student1 = Student("An")
print(student1.introduce())
```

Kết quả là gì?

A. `Student`  
B. `An`  
C. `Mình là An`  
D. Chương trình báo lỗi.

## Câu 17
Cho chương trình:

```python
class Counter:
    def __init__(self, value):
        self.value = value

    def increase(self):
        self.value += 1

counter = Counter(5)
counter.increase()
counter.increase()
print(counter.value)
```

Kết quả là gì?

A. `5`  
B. `6`  
C. `7`  
D. `8`

## Câu 18
Cho chương trình:

```python
class Animal:
    def speak(self):
        return "Âm thanh của động vật"

class Cat(Animal):
    pass

cat = Cat()
print(cat.speak())
```

Kết quả là gì?

A. `Âm thanh của động vật`  
B. `Cat`  
C. Không in gì.  
D. Báo lỗi vì `Cat` không có phương thức `speak()`.

## Câu 19
Cho chương trình:

```python
class Animal:
    def speak(self):
        return "Animal"

class Dog(Animal):
    def speak(self):
        return "Gâu gâu"

dog = Dog()
print(dog.speak())
```

Kết quả là gì?

A. `Animal`  
B. `Gâu gâu`  
C. `Dog`  
D. Chương trình báo lỗi.

## Câu 20
Cho chương trình:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

rect = Rectangle(4, 3)
rect.width = 5
print(rect.area())
```

Kết quả là gì?

A. `12`  
B. `15`  
C. `20`  
D. Chương trình báo lỗi.

---

# PHẦN III — 8 CÂU ĐƯỢC BỔ SUNG

## Câu 21
Phương thức (method) là gì trong lập trình hướng đối tượng (OOP)?

A. Biến lưu trữ dữ liệu của đối tượng.  
B. Hàm được sử dụng để thực hiện các thao tác liên quan đến đối tượng.  
C. Đối tượng lưu trữ các thuộc tính của phương thức.  
D. Kiểu dữ liệu được sử dụng để định nghĩa đối tượng.

## Câu 22
Trong Python, phương thức của một lớp được định nghĩa bằng cách sử dụng từ khóa nào?

A. `method`  
B. `define`  
C. `function`  
D. `def`

## Câu 23
Để gọi một phương thức của đối tượng trong Python, chúng ta sử dụng cú pháp nào?

A. `<Tên đối tượng>.<Tên phương thức>()`  
B. `<Tên phương thức>.<Tên đối tượng>()`  
C. `<Tên đối tượng>:<Tên phương thức>()`  
D. `<Tên phương thức>:<Tên đối tượng>()`

## Câu 24
Phương thức `__init__()` dùng để làm gì?

A. Khởi tạo một danh sách các phần tử.  
B. Xóa một đối tượng khỏi bộ nhớ.  
C. Đặt giá trị ban đầu cho các thuộc tính của đối tượng.  
D. Thêm một phần tử vào cuối danh sách.

## Câu 25
Từ khóa `self` trong phương thức của một lớp được sử dụng để làm gì?

A. Là từ khóa mặc định, bắt buộc phải có khi xây dựng phương thức.  
B. Xác định số lượng tham số của phương thức.  
C. Truy cập đến các thuộc tính của đối tượng đang được xử lý.  
D. Đánh dấu là một phương thức có thể dùng bên ngoài lớp.

## Câu 26
Cho lớp `HinhChuNhat` gồm hai thuộc tính là `chieudai`, `chieurong` và phương thức `__init__()` để khởi tạo đối tượng:

```python
class HinhChuNhat:
    chieudai = 0
    chieurong = 0

    def __init__(self, d, r):
        self.chieudai = d
        self.chieurong = r
```

Cần xây dựng thêm phương thức tính chu vi. Hãy chọn phương án đúng nhất.

A.

```python
def ChuVi(self):
    CV = 2 * (self.chieudai + self.chieurong)
    return CV
```

B.

```python
def ChuVi(self):
    CV = 2 * chieudai + chieurong
    return CV
```

C.

```python
def ChuVi():
    CV = 2 * (chieudai + chieurong)
    return CV
```

D.

```python
def ChuVi(self):
    CV = self.(chieudai + chieurong)
    return CV
```

## Câu 27
Cho chương trình:

```python
class Circle:
    radius = 0

    def __init__(self, _radius):
        self.radius = _radius

    def circumference(self):
        return 2 * 3.14 * self.radius

circle1 = Circle(5)
print(circle1.circumference())
```

Đoạn mã trên đang thực hiện gì?

A. Tạo một đối tượng `Circle` mới với bán kính là 5, sau đó in ra chu vi của hình tròn.  
B. Tạo một đối tượng `Circle` mới với bán kính là 5, sau đó in ra thông báo `"5"`.  
C. Tạo một đối tượng `Circle` mới với bán kính là 5, sau đó in ra chuỗi `"circumference"`.  
D. In ra lỗi vì không thể tính chu vi của đối tượng `circle1`.

## Câu 28
Chương trình sau khi được thực thi sẽ xuất ra màn hình kết quả gì?

```python
class MathOperations:
    result = 0

    def __init__(self, x):
        self.result = x

    def add(self, x, y):
        self.result += x + y

    def multiply(self, x, y):
        self.result += x * y

math_ops = MathOperations(20)
math_ops.add(3, 5)
math_ops.multiply(2, 4)

print(math_ops.result)
```

A. `16`  
B. `6`  
C. `36`  
D. `8`

---

# ĐÁP ÁN VÀ GIẢI THÍCH

## Câu 1 — Đáp án B
Lớp là khuôn mẫu hoặc bản thiết kế dùng để tạo ra các đối tượng có chung nhóm thuộc tính và phương thức.

## Câu 2 — Đáp án A
Đối tượng là một thể hiện cụ thể được tạo ra từ lớp. Ví dụ, `student1` có thể là một đối tượng của lớp `Student`.

## Câu 3 — Đáp án A
Thuộc tính lưu trữ dữ liệu mô tả trạng thái của đối tượng, chẳng hạn tên, tuổi hoặc màu sắc.

## Câu 4 — Đáp án A
Phương thức mô tả hành động mà đối tượng có thể thực hiện, chẳng hạn `speak()`, `move()` hoặc `calculate()`.

## Câu 5 — Đáp án C
Python sử dụng từ khóa `class` để khai báo một lớp.

## Câu 6 — Đáp án A
Phương thức được khai báo giống hàm thông thường bằng từ khóa `def`, nhưng được đặt bên trong lớp.

## Câu 7 — Đáp án B
`self` tham chiếu đến đối tượng hiện tại đang gọi phương thức.

## Câu 8 — Đáp án B
Cú pháp `self.name` dùng để đọc hoặc thay đổi thuộc tính `name` của đối tượng hiện tại.

## Câu 9 — Đáp án A
`__init__()` thường dùng để gán các giá trị ban đầu cho thuộc tính khi đối tượng được tạo.

## Câu 10 — Đáp án A
Khi gọi cú pháp như `Student("An")`, Python tạo đối tượng và gọi `__init__()` để khởi tạo.

## Câu 11 — Đáp án B
`student1 = Student()` tạo một đối tượng từ lớp `Student` và gán đối tượng đó cho biến `student1`.

## Câu 12 — Đáp án C
Phương thức của đối tượng được gọi bằng dấu chấm: `student1.hello()`.

## Câu 13 — Đáp án A
Lớp cung cấp thuộc tính và phương thức cho lớp khác được gọi là lớp cha.

## Câu 14 — Đáp án B
Lớp nhận lại và sử dụng các thành phần từ lớp cha được gọi là lớp con.

## Câu 15 — Đáp án A
Kế thừa giúp tái sử dụng mã nguồn, tổ chức chương trình rõ ràng và hạn chế lặp lại.

## Câu 16 — Đáp án C
`student1` có thuộc tính `name` bằng `"An"`. Phương thức `introduce()` ghép chuỗi `"Mình là "` với `self.name`, nên kết quả là `Mình là An`.

## Câu 17 — Đáp án C
Giá trị bắt đầu là 5. Mỗi lần gọi `increase()` tăng thêm 1. Sau hai lần gọi, giá trị là 7.

## Câu 18 — Đáp án A
`Cat` kế thừa `Animal`. Dù lớp `Cat` không tự khai báo `speak()`, đối tượng `cat` vẫn dùng được phương thức kế thừa từ lớp cha.

## Câu 19 — Đáp án B
Lớp `Dog` có phương thức `speak()` riêng, nên phương thức của lớp con được sử dụng và trả về `Gâu gâu`.

## Câu 20 — Đáp án B
Ban đầu `width = 4`, sau đó được đổi thành 5. Diện tích mới là `5 × 3 = 15`.

## Câu 21 — Đáp án B
Phương thức là hàm được khai báo trong lớp để thực hiện thao tác hoặc mô tả hành vi của đối tượng.

## Câu 22 — Đáp án D
Python sử dụng từ khóa `def` để khai báo hàm và phương thức.

## Câu 23 — Đáp án A
Ta gọi phương thức bằng cú pháp `<đối tượng>.<phương thức>()`, ví dụ `student1.hello()`.

## Câu 24 — Đáp án C
`__init__()` dùng để khởi tạo các thuộc tính ban đầu của đối tượng khi đối tượng được tạo.

## Câu 25 — Đáp án C
`self` giúp truy cập các thuộc tính và phương thức của đối tượng hiện tại. Cách diễn đạt chính xác hơn là “đối tượng đang được xử lý”, không phải toàn bộ lớp.

## Câu 26 — Đáp án A
Công thức chu vi là `2 × (chiều dài + chiều rộng)`. Vì hai giá trị là thuộc tính của đối tượng nên phải truy cập bằng `self.chieudai` và `self.chieurong`.

## Câu 27 — Đáp án A
Chương trình tạo `circle1` với bán kính 5, gọi phương thức `circumference()` và in chu vi: `2 × 3.14 × 5 = 31.4`.

## Câu 28 — Đáp án C
Giá trị ban đầu là 20. Sau `add(3, 5)`, kết quả là 28. Sau `multiply(2, 4)`, cộng thêm 8 nên kết quả cuối là 36.

---

# BẢNG TỔNG KẾT ĐÁP ÁN

| Câu | Đáp án | Câu | Đáp án | Câu | Đáp án | Câu | Đáp án |
|---:|:---:|---:|:---:|---:|:---:|---:|:---:|
| 1 | B | 8 | B | 15 | A | 22 | D |
| 2 | A | 9 | A | 16 | C | 23 | A |
| 3 | A | 10 | A | 17 | C | 24 | C |
| 4 | A | 11 | B | 18 | A | 25 | C |
| 5 | C | 12 | C | 19 | B | 26 | A |
| 6 | A | 13 | A | 20 | B | 27 | A |
| 7 | B | 14 | B | 21 | B | 28 | C |

---

## Tài liệu PTA
https://drive.google.com/file/d/1Wr-XlMEPZj9OLCCLstDQEZqfqPcBUZMo/view?usp=drive_link

## Gửi phản hồi
https://forms.gle/qM1STP7RJ9kVn1Uh8
