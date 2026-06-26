---
title: 'Docker Phần 1 - Container là gì và tại sao cần Docker'
excerpt: 'Docker giải quyết vấn đề "máy tao chạy được mà máy mày không chạy được". Tìm hiểu container là gì, khác gì máy ảo, và tại sao Docker đang là tiêu chuẩn triển khai phần mềm hiện đại.'
category: 'study'
tags: ['docker', 'container', 'devops', 'lap-trinh', 'tu-hoc']
author: 'Tuan Kiet'
publishDate: 2026-06-22T08:00:00.000Z
image: '~/assets/images/docker-phan-1-container-la-gi-va-tai-sao-can-docker.webp'
series: 'docker-tu-co-ban-den-nang-cao'
chapter: 1
---

> "Nhưng máy tao chạy được mà!" - Câu nói nổi tiếng nhất trong lịch sử lập trình. Docker ra đời để giải quyết đúng cái câu này.

Nếu bạn đã từng làm việc nhóm và gặp tình trạng: code chạy hoàn hảo trên máy mình nhưng lên máy đồng nghiệp hay server thì báo lỗi - Docker là thứ bạn cần.

### Vấn đề thực tế

Hãy tưởng tượng bạn viết một ứng dụng Python. Máy bạn đang chạy Python 3.11, dùng thư viện X phiên bản 2.1, hệ điều hành macOS.

Bạn deploy lên server Ubuntu. Server đang chạy Python 3.8. Thư viện X chỉ có phiên bản 1.9. Kết quả: lỗi.

Bạn gửi code cho đồng nghiệp review. Máy họ là Windows. Một số dependency không tương thích. Kết quả: lỗi khác.

Bạn mất cả ngày để debug những thứ không liên quan đến logic code - chỉ là môi trường không đồng nhất.

**Docker giải quyết điều này bằng cách đóng gói toàn bộ môi trường chạy vào một "hộp" gọi là container.**

### Container là gì?

Container là một đơn vị phần mềm đóng gói code và tất cả dependencies của nó lại với nhau - bao gồm runtime, libraries, biến môi trường, file cấu hình - để ứng dụng chạy nhanh và đáng tin cậy trên mọi môi trường.

Nói đơn giản hơn: container như một chiếc hộp kín chứa đúng những gì ứng dụng cần để chạy. Bạn mang hộp đó đến máy nào, môi trường nào, nó cũng chạy y hệt.

### Container khác máy ảo như thế nào?

Đây là câu hỏi đầu tiên mọi người thường hỏi.

**Máy ảo (Virtual Machine):**

- Mô phỏng cả phần cứng
- Mỗi VM chạy một hệ điều hành đầy đủ riêng
- Kích thước: thường vài GB
- Khởi động: vài phút
- Cô lập hoàn toàn nhưng nặng và chậm

**Container:**

- Chia sẻ kernel của hệ điều hành host
- Chỉ chứa ứng dụng và dependencies cần thiết
- Kích thước: thường vài chục MB đến vài trăm MB
- Khởi động: vài giây hoặc dưới 1 giây
- Cô lập ở mức process, nhẹ và nhanh hơn nhiều

```
Máy ảo:
[App A] [App B] [App C]
[Guest OS] [Guest OS] [Guest OS]
[Hypervisor]
[Host OS]
[Hardware]

Container:
[App A] [App B] [App C]
[Container Engine (Docker)]
[Host OS]
[Hardware]
```

Lý do container nhẹ hơn: thay vì chạy cả hệ điều hành, tất cả container chia sẻ kernel của máy host. Chúng chỉ cần những gì khác nhau - libraries và dependencies riêng.

### Docker là gì trong hệ sinh thái container?

Container không phải do Docker phát minh - công nghệ container trên Linux đã có từ trước (LXC, cgroups, namespaces). Nhưng Docker đã tạo ra một bộ công cụ giúp làm việc với container trở nên cực kỳ dễ dàng.

Docker gồm:

**Docker Engine** - phần mềm chạy và quản lý container trên máy bạn.

**Docker Hub** - kho lưu trữ images công khai. Giống npm cho Node.js hay PyPI cho Python, nhưng cho container images.

**Docker CLI** - công cụ dòng lệnh để tương tác với Docker Engine.

**Docker Compose** - công cụ để định nghĩa và chạy nhiều container cùng lúc.

### Các khái niệm cơ bản cần nắm

Trước khi dùng Docker, bạn cần hiểu 3 khái niệm cốt lõi:

**Image** - bản thiết kế của container. Image là bất biến (immutable), chứa đủ mọi thứ để chạy ứng dụng: code, runtime, libraries, config. Image được xây dựng từ Dockerfile.

**Container** - instance đang chạy của một image. Một image có thể tạo ra nhiều container. Container có thể start, stop, delete. Khi delete container, data bên trong mất (trừ khi dùng volume).

**Dockerfile** - file văn bản chứa hướng dẫn để Docker xây dựng image. Mỗi dòng trong Dockerfile tạo ra một "layer" trong image.

```
Dockerfile (hướng dẫn xây dựng)
    |
    v
Image (bản thiết kế, bất biến)
    |
    v
Container (instance đang chạy)
```

### Tại sao Docker thay đổi cách phát triển phần mềm?

**Development - Production parity:** Môi trường dev giống hệt production. Không còn "chạy được trên máy dev, không chạy được trên server."

**Onboarding nhanh hơn:** Thay vì mất cả ngày setup môi trường, developer mới chỉ cần chạy `docker-compose up` là có đủ mọi thứ.

**Microservices:** Docker là nền tảng của kiến trúc microservices. Mỗi service chạy trong container riêng, scale độc lập.

**CI/CD:** Build, test, deploy đều dùng container - đảm bảo nhất quán ở mọi bước.

**Resource efficiency:** Chạy nhiều container trên cùng một máy hiệu quả hơn nhiều VM.

### Ai nên học Docker?

- Backend developer muốn deploy ứng dụng dễ dàng hơn
- Frontend developer làm việc trong team cần môi trường đồng nhất
- DevOps engineer - Docker là kỹ năng bắt buộc
- Bất kỳ ai muốn học Kubernetes (Docker là tiền đề)
- Developer muốn thử nghiệm công nghệ mới mà không "làm bẩn" máy

### Phần tiếp theo

Ở phần 2, chúng ta sẽ cài Docker, viết Dockerfile đầu tiên, build image và chạy container - cầm tay chỉ việc từng bước.
