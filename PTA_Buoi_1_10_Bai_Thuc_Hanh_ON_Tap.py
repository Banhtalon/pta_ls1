# =====================================================================
# ĐÁP ÁN BÀI TẬP THỰC HÀNH PYLEARN (10 BÀI)
# =====================================================================
# Hướng dẫn: Đây là mã nguồn giải đáp chi tiết cho 10 bài thực hành
# Bạn có thể copy từng phần để chạy thử.
# =====================================================================

# ---------------------------------------------------------------------
# Bài 1: Hello World
# ---------------------------------------------------------------------
# Dùng hàm print() để in ra chuỗi chính xác theo yêu cầu.
print("Xin chào Python!")


# ---------------------------------------------------------------------
# Bài 2: Tính tổng hai số
# ---------------------------------------------------------------------
# Lấy input, ép sang kiểu int và tính tổng
a = int(input())
b = int(input())
tong = a + b
# In ra đúng định dạng
print(f"Tong: {tong}")


# ---------------------------------------------------------------------
# Bài 3: Kiểm tra số chẵn lẻ
# ---------------------------------------------------------------------
# Dùng phép chia lấy dư (%) cho 2 để kiểm tra chẵn lẻ
n = int(input())
if n % 2 == 0:
    print("Chan")
else:
    print("Le")


# ---------------------------------------------------------------------
# Bài 4: Tìm số lớn nhất trong 3 số
# ---------------------------------------------------------------------
# Nhập 3 số
a = int(input())
b = int(input())
c = int(input())

# Gán max_val ban đầu bằng a
max_val = a
# Lần lượt kiểm tra b và c
if b > max_val:
    max_val = b
if c > max_val:
    max_val = c
    
print(f"So lon nhat: {max_val}")


# ---------------------------------------------------------------------
# Bài 5: Tính tiền mua sách
# ---------------------------------------------------------------------
# Nhập số lượng sách khách mua
so_luong = int(input())

# Tính tổng tiền ban đầu (50,000 / cuốn)
tong_tien = so_luong * 50000

# Kiểm tra điều kiện giảm giá (từ 5 cuốn trở lên)
if so_luong >= 5:
    tong_tien = tong_tien * 0.9  # Giảm 10% nghĩa là chỉ trả 90%

# In kết quả (ép kiểu int để loại bỏ phần thập phân nếu có)
print(f"Tong tien: {int(tong_tien)}")


# ---------------------------------------------------------------------
# Bài 6: Xếp loại học tập
# ---------------------------------------------------------------------
# Nhập điểm trung bình dạng số thực (float)
diem = float(input())

# Kiểm tra từ cao xuống thấp
if diem >= 8.0:
    print("Gioi")
elif diem >= 6.5:
    print("Kha")
elif diem >= 5.0:
    print("Trung binh")
else:
    print("Yeu")


# ---------------------------------------------------------------------
# Bài 7: Tiết kiệm mua xe đạp
# ---------------------------------------------------------------------
# Nhập giá xe và số tiền tiết kiệm mỗi ngày
gia_xe = int(input())
tiet_kiem_ngay = int(input())

tong_tien = 0
so_ngay = 0

# Vòng lặp đếm ngày cho tới khi đủ tiền
while tong_tien < gia_xe:
    tong_tien += tiet_kiem_ngay
    so_ngay += 1

print(f"Can {so_ngay} ngay")


# ---------------------------------------------------------------------
# Bài 8: Máy tính mini
# ---------------------------------------------------------------------
# Nhập số, dấu phép toán và số thứ hai
so_1 = int(input())
phep_toan = input().strip()
so_2 = int(input())

# Dùng if-elif để so sánh và thực hiện tính toán
if phep_toan == "+":
    ket_qua = so_1 + so_2
elif phep_toan == "-":
    ket_qua = so_1 - so_2
elif phep_toan == "*":
    ket_qua = so_1 * so_2
elif phep_toan == "/":
    # Phép chia sẽ trả về số thực (float)
    ket_qua = so_1 / so_2

print(f"Ket qua: {ket_qua}")


# ---------------------------------------------------------------------
# Bài 9: Đếm số từ trong câu
# ---------------------------------------------------------------------
# Nhập câu văn
cau_van = input().strip()

# Dùng split() để tách các từ dựa trên khoảng trắng
danh_sach_tu = cau_van.split()

# Tính độ dài danh sách chính là số lượng từ
so_tu = len(danh_sach_tu)
print(f"So tu: {so_tu}")


# ---------------------------------------------------------------------
# Bài 10: Tính tiền cước Taxi
# ---------------------------------------------------------------------
def tinh_tien_taxi(km):
    """
    Hàm tính cước phí taxi:
    - 1 km đầu: 15,000
    - km 2 tới 10: 12,000/km
    - km 11 trở lên: 10,000/km
    """
    if km <= 1:
        return 15000
    elif km <= 10:
        return 15000 + (km - 1) * 12000
    else:
        return 15000 + 9 * 12000 + (km - 10) * 10000

# Nhận input từ ngoài
so_km = int(input())

# Gọi hàm
tien = tinh_tien_taxi(so_km)

# In kết quả
print(f"Tien cuoc: {tien}")
