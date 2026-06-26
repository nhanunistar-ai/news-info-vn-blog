---
title: 'VoxCPM2: Mã nguồn mở - Đỉnh cao Voice cloning cục bộ'
excerpt: 'VoxCPM2 là thế hệ mới nhất của hệ thống chuyển đổi văn bản thành giọng nói mã nguồn mở hoàn toàn dưới giấy phép Apache-2.0. Điểm khác biệt cốt lõi của nó là kiến trúc không sử dụng tokenizer
'
category: ['study', 'news']
tags: ['VoxCPM2', 'TextToSpeech', 'VoiceCloning', 'AI', 'OpenSource']
author: 'Admin'
publishDate: 2026-06-26T03:54:00.000Z
image: '~/assets/images/VoxCPM2.webp'
---

Trong kỷ nguyên AI, việc tạo ra giọng nói nhân tạo không còn xa lạ, nhưng để đạt được độ tự nhiên, cảm xúc và khả năng sao chép (clone) hoàn hảo mà không tốn phí API đắt đỏ là một thách thức lớn. **VoxCPM2** - thế hệ mới nhất của hệ thống Text-to-Speech (TTS) từ OpenBMB - chính là giải pháp mã nguồn mở mạnh mẽ nhất hiện nay, sẵn sàng thay thế các dịch vụ đám mây như ElevenLabs.

**1\. VoxCPM2 là gì và Công dụng chính?**

VoxCPM2 là một mô hình ngôn ngữ lớn chuyên dụng cho giọng nói với **2 tỷ tham số**, được huấn luyện trên hơn **2 triệu giờ** dữ liệu âm thanh đa ngôn ngữ.

**Điểm khác biệt cốt lõi:** Khác với các hệ thống TTS truyền thống chia nhỏ văn bản thành các đơn vị rời rạc (tokens), VoxCPM2 sử dụng kiến trúc **không sử dụng tokenizer (tokenizer-free)**. Nó mô hình hóa giọng nói trực tiếp trong không gian âm thanh liên tục, giúp giữ lại toàn bộ các sắc thái tinh tế nhất như tiếng lấy hơi, khoảng dừng và sự rung động tự nhiên của con người.

**4 Chế độ vận hành chính:**

- **Basic TTS:** Chuyển văn bản thành giọng nói đa ngôn ngữ, tự động điều chỉnh ngữ điệu theo nội dung.
- **Voice Design (Thiết kế giọng nói):** Tạo ra một giọng nói hoàn toàn mới chỉ bằng mô tả văn bản (ví dụ: "giọng nam trung niên, trầm ấm, đọc chậm") mà không cần âm thanh mẫu.
- **Controllable Cloning (Nhân bản có kiểm soát):** Sao chép giọng nói từ một đoạn mẫu ngắn (3-10 giây) và có thể tùy chỉnh thêm cảm xúc, tốc độ bằng lệnh văn bản.
- **Ultimate Cloning (Nhân bản tối thượng):** Tái tạo hoàn hảo 100% đặc trưng của người nói khi bạn cung cấp cả âm thanh mẫu và văn bản phiên âm chính xác.

**2\. Đối tượng sử dụng**

- **Nhà sáng tạo nội dung:** Làm video YouTube, TikTok, Podcast hoặc lồng tiếng phim với chất lượng phòng thu **48kHz**.
- **Lập trình viên & Startup:** Xây dựng trợ lý ảo, tổng đài tự động (chatbot thoại) hoặc ứng dụng dịch thuật video.
- **Người học ngoại ngữ:** Luyện nghe và phát âm với hệ thống hỗ trợ **30 ngôn ngữ**, bao gồm cả **tiếng Việt**.

**3\. Yêu cầu thiết bị (Hardware)**

Mặc dù là mô hình lớn, VoxCPM2 vẫn có thể chạy trên phần cứng thương mại:

- **GPU (Khuyên dùng):** Card đồ họa **NVIDIA** có từ **8GB VRAM** trở lên (như RTX 3060, 4060, 4090) để đạt tốc độ xử lý thời gian thực.
- **RAM:** Tối thiểu **16GB**.
- **CPU:** Có thể chạy trên CPU (như chip Intel i5 hoặc Mac Mini) nhưng tốc độ sẽ chậm hơn đáng kể.
- **Phần mềm:** Python 3.10+, PyTorch 2.5.0+, CUDA 12.0+. Bắt buộc phải cài đặt **FFmpeg** để xử lý âm thanh.

**4\. Hướng dẫn cài đặt (Step-by-Step)**

Để bắt đầu, bạn thực hiện theo các bước sau trong Terminal/Command Prompt:

- **Clone mã nguồn:**
- git clone <https://github.com/OpenBMB/VoxCPM.git>
- cd VoxCPM
- **Cài đặt thư viện:**
- pip install -r requirements.txt
- **Tải trọng số mô hình (Weights):** Sử dụng huggingface-cli để tải bản VoxCPM2 (2B) về máy.
- **Khởi động giao diện Web:**
- python app.py

**5\. Cài đặt và sử dụng**

Sau khi chạy lệnh python app.py, một giao diện web (Gradio) sẽ hiện ra. Đây là cách bạn sử dụng:

- **Bước 1: Chọn chế độ.** Nếu muốn clone giọng mình, hãy tải lên tệp .wav hoặc .mp3 dài 5-10 giây ở ô **Reference Audio**.
- **Bước 2: Nhập nội dung.** Nhập văn bản bạn muốn AI đọc vào ô **Target Text**.
- **Bước 3: Thêm "gia vị" (Voice Design).** Nếu không có âm thanh mẫu, hãy nhập mô tả vào ngoặc đơn trước văn bản, ví dụ: (A young girl with a soft, sweet voice) Chào mọi người, hôm nay mình sẽ kể chuyện....
- **Bước 4: Tinh chỉnh.**
  - Bật **"Prompt speech enhancement"** để AI tự động lọc nhiễu cho âm thanh mẫu của bạn.
  - Nếu giọng tạo ra bị rè hoặc ngắt quãng, hãy giảm chỉ số **CFG** (Guidance Scale) xuống mức 1.5 - 2.0.

**_Note:_** _Với cấu hình không có GPU rời NVIDIA (chỉ có card onboard) bạn có thể tối ưu hóa việc chạy VoxCPM2 thông qua các giải pháp kỹ thuật sau để đạt hiệu suất tốt nhất:_

**a. Sử dụng các phiên bản tối ưu cho CPU và Card Onboard**

Thay vì chạy bản PyTorch tiêu chuẩn (vốn yêu cầu CUDA của NVIDIA), bạn nên sử dụng các dự án trong hệ sinh thái được thiết kế riêng cho phần cứng hạn chế:

- **VoxCPM.cpp:** Đây là phiên bản quan trọng nhất, sử dụng định dạng GGML/GGUF hỗ trợ suy luận trực tiếp trên **CPU** và hỗ trợ **Vulkan**. Vì card Intel Iris Xe của bạn có hỗ trợ Vulkan, bản này sẽ giúp tận dụng sức mạnh của card onboard để tăng tốc thay vì chỉ dựa vào CPU đơn thuần.
- **VoxCPM-ONNX:** Phiên bản này xuất mô hình sang định dạng ONNX, giúp chạy nhẹ hơn và tương thích tốt hơn với các trình suy luận trên CPU.

**b. Điều chỉnh tham số suy luận (Inference Tweaks)**

Để tránh bị tràn bộ nhớ hoặc quá tải CPU, bạn cần can thiệp vào các thông số trong giao diện web hoặc dòng lệnh:

- **Giảm Inference Timesteps:** Đây là số bước "tinh lọc" âm thanh. Bạn nên giảm xuống mức tối thiểu (ví dụ: 5-10 bước) để tăng tốc độ tạo giọng nói, dù chất lượng có thể giảm đi đôi chút.
- **Hạ CFG Scale (Guidance Scale):** Giảm giá trị này (xuống khoảng 1.5 - 2.0) giúp mô hình hoạt động "thả lỏng" hơn, giảm bớt gánh nặng tính toán và tránh hiện tượng lỗi khi sinh chuỗi dài.
- **Cắt ngắn Reference Audio:** Trình biên dịch sẽ tốn ít bộ nhớ cache (KV cache) hơn nếu bạn chỉ sử dụng đoạn âm thanh mẫu ngắn (khoảng 5-15 giây). Việc dùng mẫu quá dài (trên 30 giây) sẽ làm chậm quá trình xử lý đáng kể.

**c. Lựa chọn mô hình nhẹ hơn**

Nếu bản VoxCPM2 (2 tỷ tham số) quá chậm, bạn hãy cân nhắc sử dụng các phiên bản cũ hơn nhưng nhẹ hơn:

- **VoxCPM-0.5B:** Chỉ có 500 triệu tham số, yêu cầu VRAM/RAM thấp hơn nhiều (chỉ cần ~5GB) và tốc độ xử lý nhanh hơn bản 2B đáng kể.
- **VoxCPM1.5:** Phiên bản trung gian (~0.8B tham số), cân bằng giữa hiệu suất và chất lượng.

**d. Giải pháp thay thế: Chạy trên Đám mây miễn phí**

Nếu việc chạy local vẫn không đáp ứng được nhu cầu về tốc độ (thời gian chờ quá lâu), bạn có thể sử dụng:

- **Google Colab (Bản miễn phí):** Cung cấp GPU T4 (16GB VRAM), hoàn toàn đủ sức chạy mượt mà VoxCPM2 bản 2B. Bạn chỉ cần tải file notebook hỗ trợ lên và chạy trực tiếp trên trình duyệt mà không tốn tài nguyên máy cá nhân.

**Lời khuyên:** Bạn nên ưu tiên cài đặt **VoxCPM.cpp** đầu tiên vì nó được cộng đồng đánh giá là giải pháp tối ưu nhất cho người dùng không có card đồ họa NVIDIA.

Việc chạy **VoxCPM2** trên **Google Colab** là một giải pháp tối ưu cho những ai không có card đồ họa (GPU) mạnh tại máy cá nhân, vì Colab cung cấp miễn phí GPU **T4 (16GB VRAM)**, hoàn toàn đủ sức xử lý mô hình 2 tỷ tham số này.

Dưới đây là hướng dẫn các bước chi tiết để bạn thiết lập và sử dụng:

**Bước 1: Thiết lập môi trường GPU**

Để chạy được mô hình AI nặng như VoxCPM2, bạn **bắt buộc** phải kích hoạt GPU:

- Trong giao diện Google Colab, vào menu **Runtime** (Thời gian chạy) -> **Change runtime type** (Thay đổi loại thời gian chạy).
- Chọn **T4 GPU** từ danh sách các trình tăng tốc phần cứng và nhấn **Save**.

**Bước 2: Cài đặt các thư viện cần thiết**

Bạn cần chạy các câu lệnh để tải mã nguồn và cài đặt môi trường Python (yêu cầu Python ≥ 3.10). Trong một ô mã lệnh (code cell), nhập và chạy:

!git clone <https://github.com/OpenBMB/VoxCPM.git>

%cd VoxCPM

!pip install -r requirements.txt

!pip install gradio # Để chạy giao diện Web UI

_Lưu ý: Bạn cũng cần đảm bảo hệ thống đã cài đặt_ **_FFmpeg_** _để xử lý các tệp âm thanh._

**Bước 3: Tải và nạp mô hình (Model Loading)**

VoxCPM2 có kích thước khoảng **8GB VRAM**. Bạn có thể sử dụng huggingface-cli để tải trọng số mô hình từ Hugging Face về bộ nhớ tạm của Colab:

!huggingface-cli download openbmb/VoxCPM2 --local-dir ./checkpoints/VoxCPM2

**Bước 4: Khởi chạy giao diện Web (Gradio)**

Đây là cách dễ nhất để người mới "cầm tay chỉ việc" sử dụng các tính năng nhân bản giọng nói (Voice Cloning) hay thiết kế giọng nói (Voice Design):

- Chạy lệnh: !python app.py
- Sau khi mô hình nạp xong (quá trình "warm up"), Colab sẽ xuất hiện một đường dẫn có dạng **\*.gradio.live**.
- Nhấp vào link đó để mở giao diện web trực quan trên trình duyệt.

**_\*Lưu ý cho người dùng Việt Nam_**

Nếu bạn muốn đạt chất lượng giọng đọc tiếng Việt tốt nhất, trong bước nạp mô hình, bạn có thể trỏ đường dẫn tới bản **checkpoint đã được tinh chỉnh (fine-tuned) cho tiếng Việt** (ví dụ bản của Phạm Phú Ngọc Trai với 1000 giờ dữ liệu tiếng Việt) thay vì bản gốc của OpenBMB.

**Tại sao nên dùng Colab?**

- **Tốc độ:** Với GPU T4, tốc độ tạo giọng nói (RTF) sẽ rất nhanh so với việc chạy trên CPU máy i5 thông thường.
- **Tiện lợi:** Bạn không cần cài đặt CUDA hay trình điều khiển (driver) phức tạp trên máy tính cá nhân.
- **Hoàn toàn miễn phí:** Bạn có thể trải nghiệm đầy đủ các chế độ như **Ultimate Cloning** (sao chép từng hơi thở) hay **Voice Design** (tạo giọng từ văn bản) mà không tốn phí API.

**6\. Đánh giá từ cộng đồng công nghệ và GitHub**

Dự án VoxCPM hiện đạt hơn **31.700 stars** trên GitHub, phản ánh sức hút cực lớn của nó.

**Ưu điểm nổi bật:**

- **Hỗ trợ tiếng Việt xuất sắc:** Với các bản tinh chỉnh (fine-tune) từ cộng đồng (như của Phạm Phú Ngọc Trai), tỷ lệ lỗi từ (WER) cho tiếng Việt chỉ khoảng **1.56%**, giọng đọc cực kỳ truyền cảm, không bị "máy móc".
- **Quyền riêng tư tuyệt đối:** Toàn bộ quá trình xử lý diễn ra local trên máy của bạn, không lo bị rò rỉ dữ liệu giọng nói lên đám mây.
- **Miễn phí hoàn toàn:** Sử dụng giấy phép **Apache-2.0**, cho phép dùng cho cả mục đích thương mại mà không tốn phí.

**Nhược điểm & Hạn chế:**

- **Độ ổn định:** Đôi khi gặp lỗi ở các câu văn quá dài hoặc các đoạn văn có cảm xúc cực mạnh (cần chia nhỏ văn bản để đạt kết quả tốt nhất).
- **Accent Drift:** Ở chế độ Ultimate Cloning, đôi khi giọng người nói gốc (ví dụ người Việt nói tiếng Anh) sẽ bị AI "chuẩn hóa" thành giọng bản xứ hoàn toàn, làm mất đi chất giọng đặc trưng.

**Kết luận:** VoxCPM2 hiện là "vũ khí" TTS mạnh nhất mà một cá nhân hay doanh nghiệp nhỏ có thể sở hữu. Nếu bạn có một chiếc card đồ họa đủ tốt, đây là công cụ không thể thiếu trong kho vũ khí AI của mình để sáng tạo nội dung chuyên nghiệp.

_Tham khảo thêm tại repository chính thức:_ [_OpenBMB/VoxCPM_](https://github.com/OpenBMB/VoxCPM)
