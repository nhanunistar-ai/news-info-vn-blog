---
title: 'Cửu Chương 4.0 - cuộc đua lượng tử'
description: 'Trung Quốc đang có hai hướng máy tính lượng tử rất mạnh: Cửu Chương 4.0 dùng quang tử và Zuchongzhi dùng qubit siêu dẫn. Nhưng khi so với Google, câu chuyện không đơn giản là ai mạnh hơn.'
category: 'study'
tags: ['quantum-computing', 'jiuzhang', 'zuchongzhi', 'google-willow', 'china-quantum', 'superconducting-qubits']
author: 'Duc Huy'
pubDate: 'Jun 17 2026'
heroImage: '../../assets/cuu-chuong-4-zuchongzhi-va-cuoc-dua-luong-tu-trung-quoc-google.png'
---

> Nếu chỉ nhìn vào những con số kiểu “nhanh hơn siêu máy tính hàng tỷ tỷ năm”, cuộc đua máy tính lượng tử rất dễ biến thành một cuộc thi headline. Nhưng phía sau Cửu Chương 4.0, Zuchongzhi và Google Willow là ba triết lý phần cứng, ba kiểu benchmark và ba mục tiêu kỹ thuật không hoàn toàn giống nhau.

### Đừng so máy tính lượng tử như so CPU<hr>

Khi nói về máy tính cổ điển, chúng ta quen so theo số nhân CPU, tốc độ xung, RAM, GPU, benchmark render hoặc điểm hiệu năng tổng hợp.

Máy tính lượng tử không đơn giản như vậy.

Một hệ thống lượng tử có thể cực mạnh trong một bài toán hẹp nhưng không có nghĩa nó đã là “máy tính đa dụng” theo nghĩa chúng ta dùng hằng ngày. Có hệ thống dùng photon, có hệ thống dùng qubit siêu dẫn, có hệ thống dùng ion bẫy, có hệ thống dùng nguyên tử trung hòa. Mỗi hướng có điểm mạnh, điểm yếu và loại bài test riêng.

Vì vậy, khi đặt **Cửu Chương 4.0**, **Zuchongzhi** và **Google Willow/Sycamore** cạnh nhau, cách so đúng không phải là hỏi “máy nào mạnh hơn tuyệt đối?”.

Câu hỏi đúng hơn là:

- Máy đó dùng kiến trúc gì?
- Nó chứng minh ưu thế lượng tử bằng benchmark nào?
- Benchmark đó có hữu ích thực tế chưa?
- Hệ thống có lập trình linh hoạt không?
- Nó có đang tiến gần đến sửa lỗi lượng tử chịu lỗi hay chưa?
- Nó chứng minh năng lực nghiên cứu hay đã sẵn sàng giải quyết bài toán công nghiệp?

Đó là lý do bài viết này sẽ so tương đối, không xếp hạng một cách thô bạo.

### Cửu Chương 4.0 là gì?<hr>

**Cửu Chương** - thường được viết quốc tế là **Jiuzhang** - là dòng máy tính lượng tử quang tử của Trung Quốc. Tên gọi lấy cảm hứng từ tác phẩm toán học cổ đại Trung Hoa “Cửu chương toán thuật”.

Khác với máy lượng tử siêu dẫn dùng qubit trên chip ở nhiệt độ cực thấp, Jiuzhang dùng **photon** - tức các hạt ánh sáng - để thực hiện một loại bài toán lấy mẫu đặc biệt gọi là **Gaussian boson sampling**.

Nói đơn giản:

- Hệ thống tạo ra nhiều trạng thái ánh sáng bị “nén” (squeezed states).
- Các photon đi qua một mạng quang học nhiều mode.
- Máy đo mẫu phân bố photon ở đầu ra.
- Bài toán là lấy mẫu từ phân bố lượng tử đó.

Với máy cổ điển, mô phỏng chính xác phân bố này trở nên cực khó khi số photon, số mode và độ phức tạp tăng lên.

Theo paper **Robust quantum computational advantage with programmable 3050-photon Gaussian boson sampling**, Jiuzhang 4.0 dùng **1024 squeezed states**, đưa vào bộ xử lý quang tử **8176 mode**, và ghi nhận các sự kiện lên tới **3050 photon detection events**. Nhóm nghiên cứu cho biết hệ thống tạo một mẫu trong khoảng **25,6 micro giây**, trong khi mô phỏng bằng thuật toán tensor network hiện đại trên siêu máy tính El Capitan được ước tính vượt quá **10^42 năm** cho cấu hình tương ứng.

Con số này rất lớn.

Nhưng cần hiểu đúng: nó nói về một **nhiệm vụ lấy mẫu lượng tử chuyên biệt**, không phải việc Jiuzhang có thể chạy Windows, huấn luyện AI, phá mã ngân hàng hay mô phỏng thuốc ngay lập tức.

Jiuzhang 4.0 giống một thiết bị thí nghiệm được tối ưu để đẩy giới hạn “quantum computational advantage” trong miền quang tử.

Nó là một cột mốc khoa học rất mạnh.

Nhưng nó không phải máy tính lượng tử đa dụng theo nghĩa phổ thông.

### Gaussian boson sampling có ý nghĩa gì?<hr>

Gaussian boson sampling nghe rất hàn lâm, nhưng ý tưởng cốt lõi có thể hiểu như sau.

Trong một hệ lượng tử quang học lớn, nhiều photon đi qua một mạng giao thoa phức tạp. Do bản chất lượng tử, các đường đi của photon không thể được xem như từng viên bi độc lập. Chúng giao thoa, chồng chập, tạo ra một phân bố xác suất cực kỳ khó mô phỏng.

Máy lượng tử không cần “tính” phân bố đó bằng cách mô phỏng từng khả năng. Nó để tự nhiên lượng tử chạy, rồi đo kết quả.

Đó là điểm mạnh của boson sampling: dùng chính vật lý để tạo mẫu từ một phân bố mà máy cổ điển khó bắt chước.

Tuy vậy, có một vấn đề lớn: photon rất dễ mất.

Mất photon làm bài toán dễ bị mô phỏng hơn bằng một số kỹ thuật cổ điển mới. Vì vậy, các phiên bản Jiuzhang mới phải liên tục chứng minh rằng hệ thống vẫn tạo được ưu thế lượng tử **ngay cả khi xét đến photon loss và các thuật toán mô phỏng cải tiến**.

Jiuzhang 4.0 đáng chú ý vì paper nhấn mạnh tính “robust” - tức ưu thế lượng tử vẫn đứng vững trước các phương pháp spoofing và mô phỏng cổ điển mới, đặc biệt là hướng matrix product state.

Nói cách khác: đây không chỉ là câu chuyện tăng số photon. Đây là câu chuyện giữ cho lợi thế lượng tử vẫn khó bị bắt chước khi phía máy cổ điển cũng tiến bộ.

### Zuchongzhi là gì?<hr>

Nếu Cửu Chương là nhánh quang tử, thì **Zuchongzhi** là nhánh **qubit siêu dẫn** của Trung Quốc.

Tên gọi Zuchongzhi lấy theo Tổ Xung Chi, nhà toán học và thiên văn học Trung Hoa nổi tiếng. Về kiến trúc, Zuchongzhi gần với hướng của Google hơn: dùng các qubit siêu dẫn trên chip, điều khiển bằng xung vi sóng, vận hành ở nhiệt độ cực thấp.

Zuchongzhi 2.x từng tạo tiếng vang vì chạy random circuit sampling trên hệ siêu dẫn 66 qubit chức năng. Paper năm 2021 về Zuchongzhi cho biết hệ thống thực hiện benchmark đến **56 qubit, 20 chu kỳ**, và bài lấy mẫu mà máy chạy trong khoảng **1,2 giờ** được ước tính sẽ cần ít nhất **8 năm** trên siêu máy tính mạnh nhất thời điểm đó. Nhóm tác giả cũng so sánh chi phí mô phỏng cổ điển cao hơn từ **2 đến 3 bậc độ lớn** so với thí nghiệm Sycamore 53 qubit của Google năm 2019.

Phiên bản mới hơn là **Zuchongzhi 3.0**.

Theo paper **Establishing a New Benchmark in Quantum Computational Advantage with 105-qubit Zuchongzhi 3.0 Processor**, hệ thống có **105 qubit siêu dẫn**, với fidelity được báo cáo ở mức:

- Single-qubit gate: **99,90%**
- Two-qubit gate: **99,62%**
- Readout: **99,18%**

Thí nghiệm nổi bật là random circuit sampling với **83 qubit, 32 chu kỳ**. Nhóm nghiên cứu cho biết Zuchongzhi 3.0 tạo **một triệu mẫu trong vài trăm giây**, trong khi mô phỏng trên siêu máy tính Frontier được ước tính cần khoảng **6,4 × 10^9 năm**. Paper cũng nói chi phí mô phỏng cổ điển của nhiệm vụ này vượt các thí nghiệm SYC-67/SYC-70 của Google khoảng sáu bậc độ lớn.

Đây là một tuyên bố mạnh.

Nhưng vẫn phải nhắc lại: random circuit sampling là benchmark để chứng minh năng lực lượng tử, không phải ứng dụng công nghiệp trực tiếp.

### Zuchongzhi khác Cửu Chương ở đâu?<hr>

Cả hai đều thuộc hệ sinh thái lượng tử Trung Quốc, nhưng chúng không phải cùng một loại máy.

**Cửu Chương/Jiuzhang:**

- Dùng photon.
- Mạnh ở Gaussian boson sampling.
- Rất phù hợp để chứng minh ưu thế lượng tử trong miền quang học.
- Không phải máy lượng tử gate-based đa dụng theo nghĩa thông thường.
- Có lợi thế tự nhiên về photon và mạng quang học, nhưng khó ở mất photon, lập trình linh hoạt và tích hợp sửa lỗi.

**Zuchongzhi:**

- Dùng qubit siêu dẫn.
- Gần hướng Google/IBM hơn.
- Chạy random circuit sampling.
- Có khả năng lập trình theo mạch lượng tử tốt hơn so với boson sampling chuyên biệt.
- Vẫn thuộc giai đoạn NISQ - noisy intermediate-scale quantum - tức còn nhiễu và chưa chịu lỗi.

Nếu ví von:

Jiuzhang giống một “máy gia tốc lượng tử quang học” cực giỏi trong một bài toán lấy mẫu.

Zuchongzhi giống một nguyên mẫu máy tính lượng tử siêu dẫn gần hơn với mô hình máy tính lượng tử lập trình được.

Cả hai đều quan trọng, nhưng quan trọng theo hai cách khác nhau.

### Google đã làm gì với Sycamore và Willow?<hr>

Google là một trong những nhóm mở đầu cuộc đua “quantum supremacy” hiện đại.

Năm 2019, Google công bố thí nghiệm **Sycamore**, một chip siêu dẫn 53 qubit, chạy random circuit sampling trong khoảng **200 giây**. Google ước tính siêu máy tính cổ điển sẽ mất khoảng **10.000 năm** để làm nhiệm vụ tương đương. Tuyên bố này gây tranh luận, đặc biệt vì IBM cho rằng mô phỏng cổ điển có thể tối ưu hơn nhiều.

Nhưng dù tranh luận thế nào, Sycamore đã đặt ra một mốc truyền thông và kỹ thuật: máy lượng tử có thể vượt máy cổ điển trong một bài toán được thiết kế riêng.

Đến **Willow**, Google chuyển trọng tâm nhiều hơn sang vấn đề quan trọng hơn: **sửa lỗi lượng tử**.

Willow là chip siêu dẫn **105 qubit**. Paper **Quantum error correction below the surface code threshold** của Google Quantum AI công bố kết quả với surface code memory. Điểm đáng chú ý là hệ thống distance-7 dùng **101 qubit**, đạt mức lỗi logic khoảng **0,143% mỗi chu kỳ sửa lỗi**, có real-time decoder và được mô tả là vận hành dưới ngưỡng surface code.

Đây là một cột mốc khác loại so với random circuit sampling.

Random circuit sampling trả lời câu hỏi: “Máy lượng tử có thể làm một nhiệm vụ lấy mẫu nhanh hơn máy cổ điển không?”.

Sửa lỗi lượng tử trả lời câu hỏi sâu hơn: “Chúng ta có thể mở rộng máy lượng tử mà lỗi không tăng mất kiểm soát không?”.

Nếu muốn có máy tính lượng tử thực sự hữu ích cho hóa học, vật liệu, tối ưu hóa hoặc phá một số bài toán mật mã, sửa lỗi lượng tử là con đường gần như bắt buộc.

### Vậy Trung Quốc hay Google đang dẫn trước?<hr>

Câu trả lời ngắn: **tùy tiêu chí**.

Nếu xét các benchmark lấy mẫu cực hẹp, Trung Quốc đang có những tuyên bố rất mạnh:

- Jiuzhang 4.0 đẩy Gaussian boson sampling lên quy mô photon/mode rất lớn.
- Zuchongzhi 3.0 đưa random circuit sampling siêu dẫn lên 105 qubit, với cấu hình 83 qubit 32 chu kỳ rất khó mô phỏng cổ điển.

Nếu xét hướng sửa lỗi lượng tử chịu lỗi, Google có một mốc cực quan trọng với Willow:

- Surface code dưới ngưỡng.
- Logical memory vượt break-even.
- Real-time decoding.
- Tập trung vào lộ trình fault-tolerant quantum computing.

Vì vậy, nói “Trung Quốc vượt Google” là quá đơn giản.

Nói “Google vẫn số một tuyệt đối” cũng không chính xác.

Đúng hơn là:

- Trung Quốc đang rất mạnh ở **quantum advantage benchmark**, cả quang tử và siêu dẫn.
- Google đang rất mạnh ở **lộ trình sửa lỗi lượng tử và máy lượng tử chịu lỗi**.
- Hai bên dùng benchmark khác nhau, nên không thể so điểm như GPU.

Điểm đáng chú ý là cả hai hướng đều cần nhau về mặt chiến lược.

Một quốc gia muốn dẫn đầu lượng tử không chỉ cần một bài benchmark đẹp. Họ cần phần cứng, thuật toán, cryogenics, quang học, điều khiển, phần mềm, sửa lỗi, cloud access, chuỗi cung ứng và nhân lực.

### Bảng so sánh nhanh<hr>

| Hệ thống | Quốc gia/nhóm | Kiến trúc | Quy mô nổi bật | Benchmark chính | Ý nghĩa |
|---|---|---|---|---|---|
| Jiuzhang 4.0 | Trung Quốc | Quang tử | 1024 squeezed states, 8176 mode, tới 3050 photon detection events | Gaussian boson sampling | Đẩy xa ưu thế lượng tử quang tử trong bài lấy mẫu chuyên biệt |
| Zuchongzhi 3.0 | Trung Quốc | Qubit siêu dẫn | 105 qubit, thí nghiệm 83 qubit 32 cycle | Random circuit sampling | Benchmark siêu dẫn rất mạnh, cạnh tranh trực tiếp với hướng Google |
| Sycamore | Google | Qubit siêu dẫn | 53 qubit | Random circuit sampling | Mốc quantum supremacy nổi tiếng năm 2019 |
| Willow | Google | Qubit siêu dẫn | 105 qubit, distance-7 surface code 101 qubit | Sửa lỗi lượng tử và RCS | Dấu mốc quan trọng cho lộ trình fault-tolerant quantum computing |

Bảng này cho thấy điểm mấu chốt: Jiuzhang, Zuchongzhi và Willow không đang thi cùng một môn 100%.

Jiuzhang thi ở đường chạy quang tử.

Zuchongzhi thi ở đường chạy sampling siêu dẫn.

Willow đang cố chạy marathon sửa lỗi.

### Vì sao benchmark lượng tử hay bị tranh luận?<hr>

Các tuyên bố “máy lượng tử làm trong vài phút, siêu máy tính mất hàng tỷ năm” thường gây tranh luận vì phần “siêu máy tính mất bao lâu” là một ước tính dựa trên thuật toán mô phỏng tốt nhất tại thời điểm đó.

Nhưng thuật toán cổ điển cũng tiến bộ.

Sau mỗi thí nghiệm quantum advantage, cộng đồng mô phỏng cổ điển thường tìm cách tối ưu:

- Tận dụng tensor network.
- Khai thác photon loss.
- Tận dụng cấu trúc mạch.
- Hy sinh độ chính xác để mô phỏng gần đúng.
- Chạy trên GPU/siêu máy tính tốt hơn.

Vì vậy, một benchmark lượng tử mạnh không chỉ cần chạy nhanh. Nó còn phải đứng vững trước các thuật toán cổ điển mới.

Đó là lý do Jiuzhang 4.0 nhấn mạnh khả năng chống lại các spoofing algorithms, còn Zuchongzhi 3.0 đặt benchmark của mình cạnh các thí nghiệm Google gần đây và các siêu máy tính mạnh nhất.

Đây là cuộc đua động, không phải bảng điểm cố định.

### Máy tính lượng tử đã hữu ích thật chưa?<hr>

Câu trả lời thực tế: **chưa nhiều như truyền thông kỳ vọng**.

Các hệ thống hiện nay vẫn chủ yếu chứng minh năng lực trong benchmark khoa học. Chúng chưa thay thế máy tính cổ điển cho công việc phổ thông, chưa làm AI phổ thông nhanh hơn theo cách trực tiếp, chưa phá mã RSA thực tế và chưa giải quyết hàng loạt bài toán công nghiệp ở quy mô thương mại.

Nhưng nói vậy không có nghĩa chúng vô nghĩa.

Máy tính lượng tử hiện nay giống giai đoạn rất sớm của máy tính điện tử: cồng kềnh, đắt đỏ, khó điều khiển, nhiều lỗi, nhưng mở ra một hướng hoàn toàn khác để xử lý thông tin.

Các ứng dụng dài hạn có thể nằm ở:

- Mô phỏng phân tử và vật liệu lượng tử.
- Thiết kế xúc tác, pin, vật liệu siêu dẫn.
- Một số bài toán tối ưu hóa đặc biệt.
- Một số dạng học máy lượng tử.
- Mật mã hậu lượng tử và đánh giá an toàn hệ thống mã hóa.
- Nghiên cứu nền tảng về vật lý lượng tử nhiều hạt.

Điều quan trọng là để đi tới đó, cộng đồng cần vượt qua bài toán lỗi.

Và đây là nơi Google Willow trở nên đáng chú ý.

### Vì sao sửa lỗi lượng tử mới là trận đánh dài hạn?<hr>

Qubit rất mong manh.

Nó bị nhiễu bởi môi trường, sai lệch điều khiển, decoherence, lỗi đọc, lỗi cổng và nhiều yếu tố vật lý khác. Nếu chỉ ghép thật nhiều qubit nhiễu lại với nhau, hệ thống không tự động mạnh hơn. Nó có thể sai nhanh hơn.

Sửa lỗi lượng tử dùng nhiều qubit vật lý để mã hóa một qubit logic ổn định hơn. Nhưng điều này chỉ hiệu quả nếu lỗi vật lý nằm dưới một ngưỡng nhất định. Nếu lỗi quá cao, quá trình sửa lỗi lại tạo thêm lỗi.

Đó là ý nghĩa của “below threshold”.

Google Willow cho thấy khi tăng khoảng cách mã surface code, lỗi logic có thể giảm theo hướng mong muốn. Đây không phải đích cuối, nhưng là bằng chứng rằng kiến trúc có thể mở rộng theo đúng chiều.

Trong khi đó, các benchmark sampling như Jiuzhang và Zuchongzhi chứng minh máy lượng tử có thể vượt mô phỏng cổ điển ở một bài toán cụ thể.

Hai thứ này bổ sung nhau:

- Sampling chứng minh **năng lực lượng tử hiện tại**.
- Sửa lỗi chứng minh **khả năng tiến tới máy lượng tử hữu ích lâu dài**.

Nếu sampling là màn trình diễn tốc độ, sửa lỗi là nền móng kỹ thuật.

### Trung Quốc đang gửi tín hiệu gì?<hr>

Cửu Chương 4.0 và Zuchongzhi cho thấy Trung Quốc không đặt cược vào một kiến trúc duy nhất.

Họ phát triển song song:

- Quang tử để đẩy ưu thế lượng tử trong boson sampling.
- Siêu dẫn để cạnh tranh trực tiếp với Google/IBM ở mô hình gate-based.
- Cloud access và hệ sinh thái phần mềm để đưa phần cứng đến cộng đồng nghiên cứu rộng hơn.

Đây là chiến lược đáng chú ý.

Trong lĩnh vực lượng tử, chưa ai biết kiến trúc nào sẽ thắng tuyệt đối. Mỗi hướng có một cửa hẹp để đi đến máy lượng tử hữu ích. Đầu tư nhiều nhánh giúp tăng xác suất thành công.

Quan trọng hơn, các cột mốc kiểu Jiuzhang 4.0 và Zuchongzhi 3.0 có ý nghĩa địa chính trị.

Chúng cho thấy Trung Quốc có năng lực:

- Thiết kế phần cứng lượng tử quy mô lớn.
- Điều khiển hệ thống nhiều qubit/photon với độ chính xác cao.
- Xây dựng thí nghiệm đủ mạnh để thách thức mô phỏng cổ điển.
- Duy trì đội ngũ nghiên cứu lượng tử hàng đầu thế giới.

Đây không chỉ là câu chuyện khoa học.

Nó là câu chuyện hạ tầng chiến lược của thế kỷ 21.

### Google đang gửi tín hiệu gì?<hr>

Google, ngược lại, dường như muốn chuyển câu chuyện từ “quantum supremacy” sang “fault-tolerant quantum computing”.

Sycamore từng giúp Google thắng truyền thông ở mốc 2019.

Nhưng Willow quan trọng hơn nếu nhìn dài hạn.

Điểm Google muốn chứng minh là: máy lượng tử không chỉ mạnh trong một bài test được thiết kế riêng, mà có thể được mở rộng theo kiến trúc sửa lỗi, tiến tới logical qubits ổn định.

Đây là hướng khó, chậm và ít hào nhoáng hơn những con số hàng tỷ tỷ năm.

Nhưng nếu thành công, nó mới là con đường dẫn đến máy lượng tử có thể chạy thuật toán dài, sâu và hữu ích.

Vì vậy, Google không nhất thiết phải thắng mọi benchmark sampling để vẫn giữ lợi thế chiến lược.

Nếu họ đi trước ở sửa lỗi, họ đang đi trước ở thứ có thể quyết định giai đoạn tiếp theo.

### Kết luận: cuộc đua chưa có người thắng cuối cùng<hr>

Cửu Chương 4.0, Zuchongzhi và Google Willow đại diện cho ba câu trả lời khác nhau trước cùng một câu hỏi:

**Làm thế nào để biến cơ học lượng tử thành năng lực tính toán thực sự?**

Jiuzhang trả lời bằng ánh sáng: dùng photon để tạo phân bố lượng tử mà máy cổ điển gần như không theo kịp.

Zuchongzhi trả lời bằng chip siêu dẫn: xây hệ gate-based lớn, chạy mạch ngẫu nhiên sâu và chứng minh chi phí mô phỏng cổ điển khổng lồ.

Google trả lời bằng sửa lỗi: nếu muốn máy lượng tử làm việc có ích lâu dài, phải kiểm soát lỗi ở cấp logical qubit.

Nếu hỏi ai đang “mạnh hơn”, câu trả lời tốt nhất là:

- Jiuzhang 4.0 rất mạnh trong ưu thế lượng tử quang tử.
- Zuchongzhi 3.0 rất mạnh trong benchmark sampling siêu dẫn.
- Google Willow rất quan trọng trong lộ trình sửa lỗi lượng tử.

Cuộc đua lượng tử không phải một cuộc chạy nước rút.

Nó giống một cuộc thám hiểm nhiều ngả, trong đó mỗi đội đang mở một con đường qua vùng đất chưa có bản đồ.

Và điều thú vị nhất là: có thể đến cuối cùng, máy lượng tử hữu ích trong tương lai sẽ không giống hoàn toàn bất kỳ hệ thống nào chúng ta đang ca ngợi hôm nay.

### Nguồn tham khảo<hr>

- [Robust quantum computational advantage with programmable 3050-photon Gaussian boson sampling - Jiuzhang 4.0](https://arxiv.org/abs/2508.09092)
- [Establishing a New Benchmark in Quantum Computational Advantage with 105-qubit Zuchongzhi 3.0 Processor](https://arxiv.org/abs/2412.11924)
- [Strong quantum computational advantage using a superconducting quantum processor - Zuchongzhi](https://arxiv.org/abs/2106.14734)
- [Quantum error correction below the surface code threshold - Google Willow](https://arxiv.org/abs/2408.13687)
- [Quantum supremacy using a programmable superconducting processor - Google Sycamore supplementary](https://arxiv.org/abs/1910.11333)