---
title: 'Kiro - AI IDE của Amazon'
excerpt: 'Kiro là AI IDE mới của Amazon với kiến trúc spec-driven: thay vì chat code, bạn định nghĩa requirements và design trước, Kiro tự sinh implementation và test.'
category: ['study', 'news']
tags: ['kiro', 'ai-coding', 'ai-agent', 'ide', 'amazon', 'aws']
author: 'Tuan Kiet'
publishDate: 2026-05-25T07:00:00.000Z
image: '~/assets/images/kiro-ai-ide-amazon.webp'
---

> Kiro đặt câu hỏi khác với các AI IDE còn lại: thay vì hỏi "AI gợi ý code thế nào", Kiro hỏi "làm sao để AI và developer cùng hiểu một feature trước khi viết bất kỳ dòng code nào?"

Hầu hết AI coding tools hiện nay đều tiếp cận theo hướng từ dưới lên — gợi ý completions, sửa lỗi, viết function theo yêu cầu ngắn. Kiro tiếp cận từ trên xuống: bắt đầu từ spec, design, rồi mới đến implementation.

### Kiro là gì?

Kiro là **AI IDE** được Amazon phát triển, ra mắt tháng 7/2025. Nó được xây dựng trên VS Code nhưng có thêm một lớp kiến trúc gọi là **spec-driven development** — quy trình phát triển phần mềm bắt đầu từ tài liệu yêu cầu, không phải từ code.

Triết lý của Kiro là AI không nên chỉ viết code theo lệnh, mà nên tham gia vào toàn bộ vòng đời phát triển: từ khi hiểu yêu cầu, đến khi thiết kế giải pháp, rồi mới đến implementation.

### Spec-driven development hoạt động thế nào?

Khi bắt đầu một feature trong Kiro, workflow diễn ra theo 3 bước:

**1. Requirements** — Bạn mô tả feature bằng ngôn ngữ tự nhiên. Kiro tự động sinh tài liệu yêu cầu có cấu trúc với user stories và acceptance criteria. Bạn review và chỉnh sửa.

**2. Design** — Kiro phân tích codebase hiện tại và đề xuất thiết kế kỹ thuật: data model, component architecture, API changes. Bạn có thể can thiệp, từ chối hoặc chấp nhận từng phần.

**3. Tasks** — Kiro chia design thành danh sách task cụ thể, mỗi task có thể thực thi độc lập. Agent thực hiện từng task, viết code, viết test và báo cáo kết quả.

Toàn bộ tài liệu requirements và design được lưu trong thư mục `.kiro/specs/` ngay trong repo, versioned cùng code.

### Hooks và Steering

Hai tính năng khác biệt Kiro so với IDE thông thường:

**Hooks** — Event-based automation. Bạn có thể cấu hình Kiro tự động chạy một action khi xảy ra sự kiện: khi lưu file thì lint, khi tạo file mới thì check conventions, khi hoàn thành task thì chạy test. Đây là cách nhúng quy trình của team vào IDE.

**Steering** — File Markdown định nghĩa context mà AI luôn ghi nhớ khi làm việc trong project: code conventions, architecture decisions, thư viện ưu tiên, những gì không được làm. Steering files giúp Kiro hiểu dự án theo cách mà team đã đồng thuận.

### Kiro so với Cursor

Cursor mạnh hơn trong interactive coding — bạn muốn AI làm gì, nói ngay, AI làm ngay. Kiro mạnh hơn trong dự án có nhiều người, nhiều feature, cần tài liệu hóa quyết định và đảm bảo code align với thiết kế.

Kiro phù hợp hơn với team coi tài liệu và spec là asset quan trọng, không chỉ là overhead.

### Pricing

Kiro hiện trong giai đoạn preview miễn phí. Amazon chưa công bố pricing chính thức cho giai đoạn GA.

### Ai nên thử Kiro?

Developer và team muốn AI không chỉ viết code mà còn giúp duy trì nhất quán giữa yêu cầu, thiết kế và implementation. Đặc biệt hữu ích với dự án có nhiều stakeholder, nhiều feature song song, hoặc codebase lớn cần context rõ ràng trước khi AI can thiệp.
