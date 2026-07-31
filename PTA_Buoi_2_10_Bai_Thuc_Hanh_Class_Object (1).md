# PTA Buổi 2 - 10 Bài Thực Hành (Class & Object)

> Phạm vi: Class, Object, Thuộc tính. Không sử dụng `def` hoặc
> `__init__`.

## Bài 1. Tạo lớp Student

**Đề bài** - Tạo lớp `Student` có các thuộc tính: - `name = "An"` -
`age = 13` - `school = "MindX"` - Tạo một đối tượng và in toàn bộ thông
tin.

**Đáp án**

``` python
class Student:
    name = "An"
    age = 13
    school = "MindX"

st = Student()

print(st.name)
print(st.age)
print(st.school)
```

------------------------------------------------------------------------

## Bài 2. Đổi tên học sinh

**Đề bài** Cho lớp:

``` python
class Student:
    name = "An"
```

Đổi tên thành **"Bình"** rồi in kết quả.

**Đáp án**

``` python
class Student:
    name = "An"

st = Student()
st.name = "Bình"

print(st.name)
```

------------------------------------------------------------------------

## Bài 3. Lớp Bike

**Đề bài** Tạo lớp `Bike` gồm: - brand - color - price

Tạo một đối tượng và in từng thuộc tính.

**Đáp án**

``` python
class Bike:
    brand = "Giant"
    color = "Blue"
    price = 5000000

bike = Bike()

print(bike.brand)
print(bike.color)
print(bike.price)
```

------------------------------------------------------------------------

## Bài 4. Hai đối tượng

**Đề bài** Tạo lớp `Student`, tạo hai đối tượng: - An - Bình

In tên của cả hai.

**Đáp án**

``` python
class Student:
    name = ""

st1 = Student()
st2 = Student()

st1.name = "An"
st2.name = "Bình"

print(st1.name)
print(st2.name)
```

------------------------------------------------------------------------

## Bài 5. Thay đổi nhiều thuộc tính

**Đề bài** Tạo lớp `Student` có: - name - age - school

Sau khi tạo đối tượng, đổi: - name → Lan - age → 15 - school → MindX

In kết quả.

**Đáp án**

``` python
class Student:
    name = ""
    age = 0
    school = ""

st = Student()

st.name = "Lan"
st.age = 15
st.school = "MindX"

print(st.name)
print(st.age)
print(st.school)
```

------------------------------------------------------------------------

## Bài 6. Lớp Phone

**Đề bài** Tạo lớp `Phone` gồm: - brand - color - storage

In theo mẫu:

    Brand: Samsung
    Color: Black
    Storage: 128GB

**Đáp án**

``` python
class Phone:
    brand = "Samsung"
    color = "Black"
    storage = "128GB"

phone = Phone()

print("Brand:", phone.brand)
print("Color:", phone.color)
print("Storage:", phone.storage)
```

------------------------------------------------------------------------

## Bài 7. Quản lý thú cưng

**Đề bài** Tạo lớp `Pet` gồm: - name - species - age

Tạo hai thú cưng và in thông tin.

**Đáp án**

``` python
class Pet:
    name = ""
    species = ""
    age = 0

pet1 = Pet()
pet2 = Pet()

pet1.name = "Milu"
pet1.species = "Dog"
pet1.age = 3

pet2.name = "Kitty"
pet2.species = "Cat"
pet2.age = 2

print(pet1.name, pet1.species, pet1.age)
print(pet2.name, pet2.species, pet2.age)
```

------------------------------------------------------------------------

## Bài 8. So sánh hai học sinh

**Đề bài** Tạo hai học sinh. Nếu tuổi học sinh thứ nhất lớn hơn học sinh
thứ hai thì in:

    Học sinh 1 lớn tuổi hơn

Ngược lại in:

    Học sinh 2 lớn tuổi hơn hoặc bằng

**Đáp án**

``` python
class Student:
    name = ""
    age = 0

st1 = Student()
st2 = Student()

st1.name = "An"
st1.age = 15

st2.name = "Bình"
st2.age = 13

if st1.age > st2.age:
    print("Học sinh 1 lớn tuổi hơn")
else:
    print("Học sinh 2 lớn tuổi hơn hoặc bằng")
```

------------------------------------------------------------------------

## Bài 9. Danh sách đối tượng

**Đề bài** Tạo lớp `Student`. Tạo 3 đối tượng, lưu vào danh sách và dùng
vòng lặp `for` để in tên.

**Đáp án**

``` python
class Student:
    name = ""

st1 = Student()
st2 = Student()
st3 = Student()

st1.name = "An"
st2.name = "Bình"
st3.name = "Chi"

students = [st1, st2, st3]

for student in students:
    print(student.name)
```

------------------------------------------------------------------------

## Bài 10. Quản lý điểm học sinh

**Đề bài**

Tạo lớp `QuanLyDiemHS` gồm: - HoTen - Lop - Truong - DiemToan -
DiemVan - DiemAnh

Yêu cầu: 1. Tạo ít nhất 3 học sinh. 2. Tính điểm trung bình của từng học
sinh. 3. In học sinh có điểm trung bình cao nhất. 4. Nếu nhiều học sinh
cùng điểm cao nhất thì in tất cả.

**Đáp án**

``` python
class QuanLyDiemHS:
    HoTen = ""
    Lop = ""
    Truong = ""
    DiemToan = 0
    DiemVan = 0
    DiemAnh = 0

hs1 = QuanLyDiemHS()
hs1.HoTen = "Nguyễn Văn An"
hs1.Lop = "8A"
hs1.Truong = "MindX School"
hs1.DiemToan = 9
hs1.DiemVan = 8
hs1.DiemAnh = 10

hs2 = QuanLyDiemHS()
hs2.HoTen = "Trần Bình"
hs2.Lop = "8A"
hs2.Truong = "MindX School"
hs2.DiemToan = 9
hs2.DiemVan = 9
hs2.DiemAnh = 9

hs3 = QuanLyDiemHS()
hs3.HoTen = "Lê Minh"
hs3.Lop = "8A"
hs3.Truong = "MindX School"
hs3.DiemToan = 8
hs3.DiemVan = 8
hs3.DiemAnh = 8

danh_sach = [hs1, hs2, hs3]

max_dtb = 0

for hs in danh_sach:
    dtb = (hs.DiemToan + hs.DiemVan + hs.DiemAnh) / 3
    if dtb > max_dtb:
        max_dtb = dtb

print("=== Học sinh có điểm trung bình cao nhất ===")

for hs in danh_sach:
    dtb = (hs.DiemToan + hs.DiemVan + hs.DiemAnh) / 3
    if dtb == max_dtb:
        print(hs.HoTen)
        print(hs.Lop)
        print(hs.Truong)
        print(round(dtb, 2))
        print("----------------")
```
