---
title: 'QML và ML cổ điển'
description: 'Đối chiếu học máy lượng tử và học máy truyền thống qua phần cứng, biểu diễn dữ liệu, huấn luyện, suy luận và thách thức triển khai.'
category: 'study'
tags: ['quantum-computing', 'machine-learning', 'qml']
pubDate: 'May 10 2026'
heroImage: '../../assets/qml-va-ml-co-dien.png'
---
Sự khác biệt giữa Học máy lượng tử (QML) và Học máy truyền thống (Cổ điển) không chỉ đơn thuần là sự thay đổi về tốc độ xử lý mà còn là một sự thay đổi hệ hình trong cách dữ liệu được biểu diễn, tính toán và tối ưu hóa. Dưới đây là sự so sánh chi tiết giữa hai lĩnh vực này:

### **1. Nền tảng phần cứng và Đơn vị thông tin**<hr>

- **Máy học truyền thống:** Hoạt động trên các bộ vi xử lý cổ điển như CPU, GPU hoặc TPU. Đơn vị thông tin cơ bản là **bit**, chỉ có thể tồn tại ở một trong hai trạng thái xác định: 0 hoặc 1.

- **QML:** Hoạt động trên các bộ xử lý lượng tử (QPU) sử dụng **qubit**. Nhờ các nguyên lý của cơ học lượng tử, qubit có thể tồn tại ở trạng thái **chồng chất** (vừa là 0 vừa là 1 cùng lúc) và **vướng víu** với nhau, cho phép thực hiện các phép tính song song trên quy mô khổng lồ.

### **2. Biểu diễn dữ liệu và Không gian trạng thái**<hr>
- **Máy học truyền thống:** Dữ liệu được biểu diễn dưới dạng các vectơ hoặc tensor trong không gian vectơ thực. Khả năng xử lý các tương quan phức tạp bị giới hạn bởi số chiều mà máy tính cổ điển có thể quản lý hiệu quả.

- **QML:** Dữ liệu cổ điển phải được mã hóa thành các **trạng thái lượng tử** để đưa vào không gian **Hilbert**. Không gian này có số chiều tăng theo cấp số nhân với số lượng qubit (ví dụ: 30 qubit tạo ra không gian hơn 1 tỷ chiều). Điều này cho phép QML tìm ra các cấu trúc và đặc trưng hình học trong dữ liệu mà các thuật toán cổ điển không thể tiếp cận được.

### **3. Cơ chế huấn luyện và Thuật toán**<hr>
- **Máy học truyền thống:** Sử dụng thuật toán **Lan truyền ngược (backpropagation)** để tính toán gradient và cập nhật trọng số. Đây là một quá trình xác định dựa trên các số thực chính xác cao.

- **QML:** Sử dụng **Quy tắc dịch tham số (parameter-shift rule)** để tính toán gradient trực tiếp từ các mạch lượng tử. Việc huấn luyện QML thường diễn ra trong các mô hình **lai (Hybrid)**: máy tính lượng tử thực hiện các chương trình con khó (như tính toán hàm nhân - kernel), trong khi máy tính cổ điển đảm nhận việc tối ưu hóa vòng lặp ngoài.

### **4. Kết quả và Suy luận**<hr>

- **Máy học truyền thống:** Kết quả của một bước tiến (forward pass) là một giá trị xác định. Bạn chỉ cần chạy mô hình một lần để nhận được câu trả lời.

- **QML:** Kết quả là sự sụp đổ của trạng thái lượng tử khi bị đo đạc, mang tính chất **xác suất**. Để có được một câu trả lời chính xác, mô hình QML cần phải được thực thi hàng ngàn lần (gọi là **shots**) để thu thập số liệu thống kê và hội tụ về một kết quả cổ điển.

### **5. Thách thức và Độ ổn định**<hr>

- **Máy học truyền thống:** Phần cứng cực kỳ ổn định, tỷ lệ lỗi gần như bằng không. Thách thức chính là việc sa lầy vào các điểm cực tiểu cục bộ trong quá trình huấn luyện.

- **QML:** Đối mặt với **nhiễu môi trường** và hiện tượng mất liên kết lượng tử (decoherence). Ngoài ra, QML gặp phải vấn đề **\"Barren Plateaus\" (Vùng bình nguyên cằn cỗi)**, nơi gradient biến mất nhanh chóng khi số lượng qubit tăng lên, khiến việc huấn luyện các mô hình sâu trở nên cực kỳ khó khăn.

### **Bảng so sánh tóm tắt**<hr>

| **Đặc điểm** | **Máy học truyền thống** | **Học máy lượng tử (QML)** |
|----|----|----|
| **Đơn vị dữ liệu** | Bit (0 hoặc 1) | Qubit (Chồng chất, Vướng víu) |
| **Không gian xử lý** | Không gian vectơ thực \$R\^n\$ | Không gian Hilbert \$2\^N\$ chiều |
| **Phương pháp huấn luyện** | Lan truyền ngược (Xác định) | Quy tắc dịch tham số (Xác suất) |
| **Độ chính xác phần cứng** | Rất cao, không có lỗi gate | Nhạy cảm với nhiễu và lỗi gate |
| **Lợi thế cốt lõi** | Xử lý dữ liệu quy mô lớn, ổn định | Xử lý dữ liệu đa chiều, mô phỏng tự nhiên |
| **Trạng thái năm 2026** | Trưởng thành, phổ biến rộng rãi | Đang trong giai đoạn thử nghiệm thực tế |
<hr>
Kết luận: QML không thay thế máy học truyền thống mà đóng vai trò như một bộ gia tốc chuyên dụng. Trong khi máy học cổ điển vẫn thống trị các tác vụ phổ thông, QML được kỳ vọng sẽ tạo ra đột phá trong các lĩnh vực có cấu trúc dữ liệu phức tạp như hóa học, tài chính và tối ưu hóa tổ hợp.
