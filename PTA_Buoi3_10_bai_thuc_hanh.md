# PTA Buổi 3 - Bộ bài thực hành

## Thông tin

-   Chủ đề: Phương thức, `self`, `__init__()` và kế thừa
-   Gồm **10 bài thực hành**
    -   Bài 1--6: Dễ
    -   Bài 7--9: Trung bình
    -   Bài 10: Vận dụng tổng hợp

------------------------------------------------------------------------

# Bài 1 (Dễ) - Lớp Student

## Đề bài

Tạo lớp `Student` gồm các thuộc tính: - name - age - school

Sử dụng `__init__()` để khởi tạo.

Viết phương thức `introduce()` để in:

``` python
Xin chào, mình là <Tên>, <Tuổi> tuổi.
```

## Lời giải

``` python
class Student:
    def __init__(self, name, age, school):
        self.name = name
        self.age = age
        self.school = school

    def introduce(self):
        print(f"Xin chào, mình là {self.name}, {self.age} tuổi.")

st = Student("An", 13, "MindX")
st.introduce()
```

------------------------------------------------------------------------

# Bài 2 (Dễ) - Rectangle

## Đề bài

Tạo lớp `Rectangle` có: - width - height

Viết: - `area()` - `perimeter()`

## Lời giải

``` python
class Rectangle:
    def __init__(self,width,height):
        self.width=width
        self.height=height

    def area(self):
        return self.width*self.height

    def perimeter(self):
        return 2*(self.width+self.height)
```

------------------------------------------------------------------------

# Bài 3 (Dễ) - Circle

## Đề bài

Tạo lớp `Circle` có thuộc tính `radius`.

Viết phương thức `circumference()`.

## Lời giải

``` python
class Circle:
    def __init__(self,radius):
        self.radius=radius

    def circumference(self):
        return 2*3.14*self.radius
```

------------------------------------------------------------------------

# Bài 4 (Dễ) - Calculator

## Đề bài

Tạo lớp `Calculator` gồm: - add(a,b) - subtract(a,b)

## Lời giải

``` python
class Calculator:
    def add(self,a,b):
        return a+b

    def subtract(self,a,b):
        return a-b
```

------------------------------------------------------------------------

# Bài 5 (Dễ) - Book

## Đề bài

Tạo lớp `Book` có: - title - author

Viết `display()`.

## Lời giải

``` python
class Book:
    def __init__(self,title,author):
        self.title=title
        self.author=author

    def display(self):
        print(self.title)
        print(self.author)
```

------------------------------------------------------------------------

# Bài 6 (Dễ) - Car

## Đề bài

Tạo lớp `Car` gồm: - brand - color

Viết `drive()` in ra:

    Xe đang chạy.

## Lời giải

``` python
class Car:
    def __init__(self,brand,color):
        self.brand=brand
        self.color=color

    def drive(self):
        print("Xe đang chạy.")
```

------------------------------------------------------------------------

# Bài 7 (Trung bình) - Employee

## Đề bài

Tạo lớp `Employee` gồm: - name - salary

Viết `increase(percent)`.

## Lời giải

``` python
class Employee:
    def __init__(self,name,salary):
        self.name=name
        self.salary=salary

    def increase(self,percent):
        self.salary += self.salary*percent/100
```

------------------------------------------------------------------------

# Bài 8 (Trung bình) - Kế thừa

## Đề bài

Tạo lớp `Animal` có `speak()`.

Tạo lớp `Dog` kế thừa `Animal` và ghi đè `speak()`.

## Lời giải

``` python
class Animal:
    def speak(self):
        print("Animal")

class Dog(Animal):
    def speak(self):
        print("Gâu gâu")
```

------------------------------------------------------------------------

# Bài 9 (Trung bình) - StudentAccount

## Đề bài

Tạo lớp `StudentAccount` gồm: - name - score

Viết: - add_score() - show()

## Lời giải

``` python
class StudentAccount:
    def __init__(self,name,score):
        self.name=name
        self.score=score

    def add_score(self,point):
        self.score+=point

    def show(self):
        print(self.name,self.score)
```

------------------------------------------------------------------------

# Bài 10 - BankAccount

## Đề bài

Hãy xây dựng lớp **BankAccount** đại diện cho tài khoản ngân hàng.

Thuộc tính: - Tên ngân hàng - Tên chủ tài khoản - Số tài khoản - Số tiền
trong tài khoản

Phương thức: - `__init__()` - `deposit(amount)` - `withdraw(amount)` -
`display_balance()`

## Lời giải

``` python
class BankAccount:
    def __init__(self, bank_name, owner, account_number, balance):
        self.bank_name = bank_name
        self.owner = owner
        self.account_number = account_number
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
        else:
            print("Số dư không đủ.")

    def display_balance(self):
        print("Ngân hàng:", self.bank_name)
        print("Chủ tài khoản:", self.owner)
        print("Số tài khoản:", self.account_number)
        print("Số dư:", self.balance)

acc = BankAccount("MindX Bank","Nguyễn Văn A","123456",5000)
acc.deposit(1000)
acc.withdraw(2000)
acc.display_balance()
```
