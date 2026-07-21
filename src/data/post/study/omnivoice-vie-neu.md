---
title: 'So sánh và Hướng dẫn chạy Local 2 mô hình TTS: OmniVoice và VieNeu-TTS'
excerpt: 'Hướng dẫn chi tiết cách cài đặt, cấu hình phần cứng và đánh giá chất lượng giọng đọc tiếng Việt giữa hai repo mã nguồn mở nổi bật: k2-fsa/OmniVoice và pnnbao97/VieNeu-TTS.'
category: ['study']
tags:
  - 'OmniVoice'
  - 'VieNeu-TTS'
  - 'AI'
  - 'TTS'
  - 'Voice Cloning'
author: 'news.info.vn'
publishDate: 2026-07-21T15:00:00.000Z
image: '~/assets/images/omnivoice-vie-neu-hero.webp'
---

Sự phát triển của mã nguồn mở đã mang công nghệ Text-to-Speech (TTS) và Voice Cloning (nhân bản giọng nói) đến tận máy tính cá nhân. Thay vì phải phụ thuộc vào các API trả phí, giờ đây bạn có thể tự chạy các mô hình AI giọng nói ngay trên máy (local). 

Trong bài viết này, chúng ta sẽ đi sâu vào kỹ thuật, cách cài đặt, cấu hình thiết bị và so sánh hai kho lưu trữ (repository) đang được cộng đồng chú ý: **k2-fsa/OmniVoice** và **pnnbao97/VieNeu-TTS**.

---

## 1. Hướng dẫn cài đặt và sử dụng từng Repo

### 1.1. k2-fsa/OmniVoice
OmniVoice là một dự án lớn từ nhóm `k2-fsa` (nổi tiếng với next-gen Kaldi, Sherpa). Điểm mạnh của repo này là hỗ trợ hơn 600 ngôn ngữ, có khả năng zero-shot voice cloning (nhân bản giọng nói chỉ từ 1 đoạn âm thanh ngắn khoảng 3 giây).

**Quy trình cài đặt (Workflow):**
Nên sử dụng môi trường ảo (Conda hoặc venv) để tránh xung đột thư viện.

```bash
# 1. Clone repository
git clone https://github.com/k2-fsa/OmniVoice.git
cd OmniVoice

# 2. Tạo môi trường ảo và kích hoạt
conda create -n omnivoice python=3.10
conda activate omnivoice

# 3. Cài đặt các thư viện cần thiết
pip install -r requirements.txt
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

**Cách sử dụng cơ bản (Python CLI):**
```python
from omnivoice import OmniVoice

# Khởi tạo mô hình
model = OmniVoice.from_pretrained("k2-fsa/omnivoice-base")

# Đọc văn bản với giọng clone
text = "Xin chào, đây là hệ thống tổng hợp giọng nói OmniVoice."
ref_audio = "path/to/your/voice_sample.wav"

audio_output = model.synthesize(text, reference_audio=ref_audio)
model.save_audio(audio_output, "output.wav")
```

### 1.2. pnnbao97/VieNeu-TTS
Khác với sự cồng kềnh của OmniVoice, **VieNeu-TTS** của tác giả Phạm Ngọc Nhật Bảo là một hệ thống tinh gọn, được "đo ni đóng giày" riêng cho Tiếng Việt. Dự án nổi bật với khả năng chạy thời gian thực (real-time) ngay trên CPU và xuất âm thanh chất lượng cao 24kHz.

**Quy trình cài đặt (Workflow):**

```bash
# 1. Clone repository
git clone https://github.com/pnnbao97/VieNeu-TTS.git
cd VieNeu-TTS

# 2. Cài đặt dependencies (rất nhẹ)
pip install -r requirements.txt
```

**Cách sử dụng cơ bản:**
VieNeu-TTS cung cấp sẵn script để chạy trực tiếp từ Terminal.

```bash
# Lệnh generate âm thanh đơn giản
python infer.py --text "Cộng hòa xã hội chủ nghĩa Việt Nam, Độc lập tự do hạnh phúc." --output "result.wav" --clone_audio "sample.wav"
```

---

## 2. Cấu hình thiết bị để hoạt động tốt trên Local

Việc chạy mô hình Deep Learning yêu cầu cấu hình phần cứng phù hợp. Dưới đây là mức cấu hình khuyến nghị để bạn có trải nghiệm không bị giật lag (stuttering).

### Đối với k2-fsa/OmniVoice
Do phải gánh kiến trúc mô hình đa ngôn ngữ khổng lồ và xử lý zero-shot cloning phức tạp, OmniVoice rất "ngốn" tài nguyên phần cứng.
- **CPU:** Tối thiểu Intel Core i7 thế hệ 10 hoặc AMD Ryzen 7.
- **GPU (Bắt buộc để chạy mượt):** NVIDIA RTX 3060 (12GB VRAM) trở lên. Nếu VRAM dưới 8GB, bạn sẽ gặp lỗi `Out of Memory` (OOM) khi generate các đoạn văn bản dài.
- **RAM:** Tối thiểu 16GB (Khuyến nghị 32GB).
- **Lưu trữ:** Ổ cứng SSD NVMe (Mô hình checkpoint tải về có thể lên đến vài chục GB).

### Đối với pnnbao97/VieNeu-TTS
VieNeu-TTS là một "phép màu" tối ưu hóa cho phần cứng máy cá nhân, đặc biệt nhấn mạnh vào **Real-time CPU inference** (Chạy thời gian thực trên CPU).
- **CPU:** Hoạt động trơn tru ngay cả trên các dòng CPU tầm trung như Intel Core i5 thế hệ 8 hoặc Ryzen 5.
- **GPU:** **Không bắt buộc!** Đây là lợi thế cực lớn. Tuy nhiên nếu có GPU NVIDIA (thậm chí là GTX 1650 4GB), tốc độ generate sẽ nhanh hơn thời gian thực gấp nhiều lần (vài mili-giây cho 1 câu).
- **RAM:** Chỉ cần 8GB là đủ để load model và xử lý.
- **Lưu trữ:** Rất nhẹ nhàng, chỉ cần vài GB trống.

---

## 3. So sánh kết quả Text to Voice (Tiếng Việt)

Khi đưa lên bàn cân chạy local với ngữ liệu Tiếng Việt, mỗi repo bộc lộ những điểm mạnh và điểm yếu riêng.

| Tiêu chí | k2-fsa/OmniVoice | pnnbao97/VieNeu-TTS |
| :--- | :--- | :--- |
| **Chất lượng phát âm Tiếng Việt** | Khá tốt. Đọc rõ ràng nhưng đôi khi ngữ điệu mang hơi hướng "người máy" hoặc bị lai giọng tiếng Anh do là mô hình đa ngôn ngữ (Multilingual). | **Xuất sắc.** Do được fine-tune (huấn luyện tinh chỉnh) bằng bộ dữ liệu thuần Việt, ngữ điệu, nhấn nhá và cách ngắt nghỉ cực kỳ tự nhiên. |
| **Xử lý từ viết tắt, tiếng lóng (VN)** | Yếu. Cần phải viết rõ ràng từng từ (ví dụ: không hiểu "UBND"). | Tốt hơn rất nhiều nhờ khâu chuẩn hóa văn bản (Text Normalization) tối ưu cho tiếng Việt. |
| **Chất lượng Voice Cloning** | Khả năng bắt chước timbre (âm sắc) rất giống bản gốc. Xử lý tốt cả âm thanh nhiễu. | Bắt chước âm sắc tốt, âm thanh đầu ra rất trong (24kHz audio quality). |
| **Tốc độ sinh (Inference Speed)** | Chậm nếu chỉ dùng CPU. Phụ thuộc hoàn toàn vào sức mạnh của Card đồ họa (GPU). | Rất nhanh, hỗ trợ Real-time ngay cả trên CPU cũ (Tốc độ sinh < thời lượng âm thanh). |
| **Tài nguyên tiêu thụ (VRAM/RAM)** | Rất lớn (>8GB VRAM GPU). | Rất nhỏ, thân thiện với laptop cá nhân. |

**Kết luận:**
- Nếu bạn cần một hệ thống có thể nói tiếng Anh, tiếng Trung và thỉnh thoảng nói tiếng Việt, hoặc muốn trải nghiệm kiến trúc state-of-the-art của K2, hãy chọn **OmniVoice**.
- Nhưng nếu mục tiêu của bạn là **chỉ làm nội dung Tiếng Việt**, cần một giọng đọc tự nhiên nhất, cài đặt dễ dàng nhất trên chiếc Laptop không có card rời đồ họa khủng, thì **VieNeu-TTS** của `pnnbao97` chắc chắn là vị vua ở mảng Local Text-to-Speech hiện tại.
