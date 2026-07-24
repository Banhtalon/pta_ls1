const PRACTICE_DATA = [
  {
    id: 1,
    title: "Hello World",
    difficulty: "Dễ",
    description: "Viết chương trình in ra câu chào 'Xin chào Python!'. Không cần dữ liệu đầu vào.",
    hints: [
      "Bước 1: Sử dụng hàm print() có sẵn trong Python để in ra màn hình",
      "Bước 2: Đặt chuỗi văn bản cần in ('Xin chào Python!') bên trong dấu ngoặc kép hoặc ngoặc đơn"
    ],
    starterCode: "# Viết code của bạn ở đây\n",
    testCases: [
      {
        id: 1,
        input: "",
        expectedOutput: "Xin chào Python!",
        description: "Kiểm tra output hiển thị câu chào"
      }
    ]
  },
  {
    id: 2,
    title: "Tính tổng hai số",
    difficulty: "Dễ",
    description: "Viết chương trình nhận vào hai số nguyên từ bàn phím (mỗi số trên một dòng). Tính và in ra tổng của hai số đó với định dạng 'Tong: X' (X là tổng tính được).",
    hints: [
      "Bước 1: Sử dụng hàm input() để đọc dữ liệu từ bàn phím cho số thứ nhất và số thứ hai",
      "Bước 2: Dữ liệu nhập vào mặc định là chuỗi (string), bạn cần dùng int() để chuyển đổi chúng sang số nguyên",
      "Bước 3: Cộng hai số vừa chuyển đổi",
      "Bước 4: Dùng hàm print() kết hợp chuỗi 'Tong: ' và kết quả phép cộng. Bạn có thể dùng dấu phẩy để nối trong print"
    ],
    starterCode: "# Nhập số nguyên thứ nhất\n\n# Nhập số nguyên thứ hai\n\n# Tính tổng và in kết quả\n",
    testCases: [
      {
        id: 1,
        input: "3\n5",
        expectedOutput: "Tong: 8",
        description: "Tổng hai số dương"
      },
      {
        id: 2,
        input: "0\n0",
        expectedOutput: "Tong: 0",
        description: "Tổng hai số 0"
      },
      {
        id: 3,
        input: "-2\n7",
        expectedOutput: "Tong: 5",
        description: "Tổng số âm và số dương"
      }
    ]
  },
  {
    id: 3,
    title: "Kiểm tra số chẵn lẻ",
    difficulty: "Dễ",
    description: "Nhập vào một số nguyên từ bàn phím. Kiểm tra và in ra 'Chan' nếu đó là số chẵn, in ra 'Le' nếu là số lẻ.",
    hints: [
      "Bước 1: Dùng hàm input() để nhập số và int() để chuyển thành số nguyên",
      "Bước 2: Số chẵn là số chia hết cho 2. Sử dụng phép chia lấy phần dư (%) trong Python (nếu n % 2 == 0 thì n là số chẵn)",
      "Bước 3: Sử dụng cấu trúc rẽ nhánh if - else để kiểm tra điều kiện và in ra kết quả tương ứng"
    ],
    starterCode: "# Nhập số nguyên\n\n# Kiểm tra chẵn lẻ bằng lệnh if-else và in kết quả\n",
    testCases: [
      {
        id: 1,
        input: "4",
        expectedOutput: "Chan",
        description: "Kiểm tra số chẵn"
      },
      {
        id: 2,
        input: "7",
        expectedOutput: "Le",
        description: "Kiểm tra số lẻ"
      },
      {
        id: 3,
        input: "0",
        expectedOutput: "Chan",
        description: "Kiểm tra với số 0"
      }
    ]
  },
  {
    id: 4,
    title: "Tìm số lớn nhất trong 3 số",
    difficulty: "Trung bình",
    description: "Nhập vào 3 số nguyên từ bàn phím (mỗi số trên một dòng). Tìm số có giá trị lớn nhất và in ra theo định dạng 'So lon nhat: X'.",
    hints: [
      "Bước 1: Lần lượt nhập và chuyển đổi 3 số nguyên bằng input() và int()",
      "Bước 2: Có thể dùng cấu trúc if - elif - else để so sánh các số",
      "Bước 3: Hoặc bạn có thể dùng hàm max() có sẵn của Python để tìm số lớn nhất",
      "Bước 4: In ra màn hình chuỗi 'So lon nhat: ' kèm theo kết quả"
    ],
    starterCode: "# Nhập 3 số nguyên\n\n# Tìm số lớn nhất\n\n# In ra kết quả\n",
    testCases: [
      {
        id: 1,
        input: "5\n2\n9",
        expectedOutput: "So lon nhat: 9",
        description: "Số lớn nhất ở cuối"
      },
      {
        id: 2,
        input: "-1\n-5\n-3",
        expectedOutput: "So lon nhat: -1",
        description: "So sánh các số âm"
      },
      {
        id: 3,
        input: "7\n7\n4",
        expectedOutput: "So lon nhat: 7",
        description: "Có hai số bằng nhau"
      }
    ]
  },
  {
    id: 5,
    title: "Tính tiền mua sách",
    difficulty: "Dễ",
    description: "Một cửa hàng sách bán mỗi cuốn sách với giá 50,000 VNĐ. Nếu mua từ 5 cuốn trở lên sẽ được giảm giá 10% trên tổng số tiền. Nhập vào số lượng sách muốn mua. Tính và in ra tổng số tiền phải trả với định dạng 'Tong tien: X' (X là số tiền kiểu nguyên).",
    hints: [
      "Bước 1: Nhập số lượng sách từ bàn phím và chuyển thành số nguyên.",
      "Bước 2: Tính tổng tiền ban đầu = số lượng * 50000.",
      "Bước 3: Dùng lệnh if kiểm tra nếu số lượng >= 5 thì tổng tiền = tổng tiền * 0.9 (giảm 10%).",
      "Bước 4: Chuyển tổng tiền về kiểu số nguyên (int) và in ra màn hình đúng định dạng."
    ],
    starterCode: "# Nhập số lượng sách\n\n# Tính tổng tiền ban đầu\n\n# Kiểm tra điều kiện giảm giá\n\n# In kết quả\n",
    testCases: [
      {
        id: 1,
        input: "3",
        expectedOutput: "Tong tien: 150000",
        description: "Mua dưới 5 cuốn (không giảm giá)"
      },
      {
        id: 2,
        input: "5",
        expectedOutput: "Tong tien: 225000",
        description: "Mua đúng 5 cuốn (được giảm giá 10%)"
      },
      {
        id: 3,
        input: "10",
        expectedOutput: "Tong tien: 450000",
        description: "Mua nhiều hơn 5 cuốn (được giảm giá)"
      }
    ]
  },
  {
    id: 6,
    title: "Xếp loại học tập",
    difficulty: "Dễ",
    description: "Cuối kì, giáo viên cần tự động xếp loại học sinh. Nhập vào điểm trung bình (số thực). Nếu điểm >= 8.0 in ra 'Gioi', nếu 6.5 <= điểm < 8.0 in ra 'Kha', nếu 5.0 <= điểm < 6.5 in ra 'Trung binh', còn lại in ra 'Yeu'.",
    hints: [
      "Bước 1: Nhập điểm và dùng float() để chuyển thành kiểu số thực.",
      "Bước 2: Sử dụng cấu trúc if - elif - else để kiểm tra từng điều kiện.",
      "Bước 3: Điều kiện đầu tiên kiểm tra điểm >= 8.0.",
      "Bước 4: Các điều kiện elif tiếp theo kiểm tra mức >= 6.5 và >= 5.0."
    ],
    starterCode: "# Nhập điểm trung bình\n\n# Dùng lệnh if - elif - else để xếp loại và in kết quả\n",
    testCases: [
      {
        id: 1,
        input: "8.5",
        expectedOutput: "Gioi",
        description: "Điểm >= 8.0"
      },
      {
        id: 2,
        input: "7.0",
        expectedOutput: "Kha",
        description: "Điểm từ 6.5 đến dưới 8.0"
      },
      {
        id: 3,
        input: "4.5",
        expectedOutput: "Yeu",
        description: "Điểm dưới 5.0"
      }
    ]
  },
  {
    id: 7,
    title: "Tiết kiệm mua xe đạp",
    difficulty: "Trung bình",
    description: "Bạn học sinh muốn mua một chiếc xe đạp. Nhập vào giá tiền chiếc xe đạp và số tiền tiết kiệm được mỗi ngày (mỗi số trên 1 dòng). Dùng vòng lặp while để đếm số ngày cần tiết kiệm cho đến khi tổng số tiền tiết kiệm >= giá tiền xe. In ra định dạng 'Can X ngay'.",
    hints: [
      "Bước 1: Nhập giá tiền xe đạp và tiền tiết kiệm mỗi ngày (chuyển sang kiểu int).",
      "Bước 2: Tạo biến tong_tien = 0 và so_ngay = 0.",
      "Bước 3: Dùng vòng lặp while với điều kiện tong_tien < gia_xe.",
      "Bước 4: Trong vòng lặp, mỗi ngày cộng thêm tiền tiết kiệm vào tong_tien và tăng so_ngay lên 1.",
      "Bước 5: In ra so_ngay."
    ],
    starterCode: "# Nhập giá xe và số tiền tiết kiệm mỗi ngày\n\n# Khởi tạo tổng tiền và số ngày\n\n# Vòng lặp tính số ngày tiết kiệm\n\n# In kết quả\n",
    testCases: [
      {
        id: 1,
        input: "1500000\n50000",
        expectedOutput: "Can 30 ngay",
        description: "Xe 1.5tr, tiết kiệm 50k/ngày"
      },
      {
        id: 2,
        input: "500000\n30000",
        expectedOutput: "Can 17 ngay",
        description: "Phép chia có dư, cần làm tròn lên số ngày"
      }
    ]
  },
  {
    id: 8,
    title: "Máy tính mini",
    difficulty: "Trung bình",
    description: "Viết máy tính thực hiện cộng, trừ, nhân, chia. Lần lượt nhập số thứ nhất, dấu phép toán (+, -, *, /) và số thứ hai (mỗi giá trị trên 1 dòng). Tính và in 'Ket qua: X'. Phép chia trả về số thực (ví dụ 5.0), các phép toán khác trả về số nguyên.",
    hints: [
      "Bước 1: Dùng input() và int() để nhập hai số nguyên.",
      "Bước 2: Dùng input() để nhận chuỗi chứa dấu phép toán.",
      "Bước 3: Dùng if - elif - else so sánh dấu để thực hiện phép toán tương ứng.",
      "Bước 4: In ra kết quả."
    ],
    starterCode: "# Nhập số thứ 1, dấu phép toán và số thứ 2\n\n# Tính toán dựa trên dấu và in kết quả\n",
    testCases: [
      {
        id: 1,
        input: "10\n+\n5",
        expectedOutput: "Ket qua: 15",
        description: "Phép cộng"
      },
      {
        id: 2,
        input: "7\n*\n3",
        expectedOutput: "Ket qua: 21",
        description: "Phép nhân"
      },
      {
        id: 3,
        input: "10\n/\n2",
        expectedOutput: "Ket qua: 5.0",
        description: "Phép chia"
      }
    ]
  },
  {
    id: 9,
    title: "Đếm số từ trong câu",
    difficulty: "Trung bình",
    description: "Nhập vào một câu văn (chuỗi). Đếm số lượng từ trong câu đó và in ra định dạng 'So tu: X'. Các từ được phân tách nhau bởi dấu khoảng trắng.",
    hints: [
      "Bước 1: Dùng input() để nhận câu văn.",
      "Bước 2: Sử dụng hàm .split() của chuỗi để tách câu thành một danh sách (list) các từ.",
      "Bước 3: Dùng hàm len() để đếm số phần tử trong danh sách đó.",
      "Bước 4: In kết quả ra màn hình."
    ],
    starterCode: "# Nhập câu văn\n\n# Tách từ và đếm\n\n# In kết quả\n",
    testCases: [
      {
        id: 1,
        input: "hom nay troi dep",
        expectedOutput: "So tu: 4",
        description: "Câu có 4 từ"
      },
      {
        id: 2,
        input: "xin chao cac ban hoc sinh",
        expectedOutput: "So tu: 6",
        description: "Câu có 6 từ"
      }
    ]
  },
  {
    id: 10,
    title: "Tính tiền cước Taxi",
    difficulty: "Trung bình",
    description: "Viết hàm tinh_tien_taxi(km) tính cước: 1km đầu: 15000đ; Từ km 2 đến 10: 12000đ/km; Từ km 11 trở đi: 10000đ/km. Nhập số km đã đi (số nguyên), gọi hàm và in 'Tien cuoc: X'.",
    hints: [
      "Bước 1: Định nghĩa hàm def tinh_tien_taxi(km):",
      "Bước 2: Nếu km <= 1, tiền = 15000.",
      "Bước 3: Nếu km <= 10, tiền = 15000 + (km - 1) * 12000.",
      "Bước 4: Nếu km > 10, tiền = 15000 + 9 * 12000 + (km - 10) * 10000.",
      "Bước 5: Bên ngoài hàm, nhập số km, gọi hàm và in kết quả."
    ],
    starterCode: "def tinh_tien_taxi(km):\n    # Viết logic tính tiền cước ở đây\n    pass\n\n# Nhập số km, gọi hàm và in kết quả\n",
    testCases: [
      {
        id: 1,
        input: "1",
        expectedOutput: "Tien cuoc: 15000",
        description: "Đi 1 km"
      },
      {
        id: 2,
        input: "5",
        expectedOutput: "Tien cuoc: 63000",
        description: "Đi 5 km (15k + 4*12k)"
      },
      {
        id: 3,
        input: "12",
        expectedOutput: "Tien cuoc: 143000",
        description: "Đi 12 km (15k + 9*12k + 2*10k)"
      }
    ]
  }
];
