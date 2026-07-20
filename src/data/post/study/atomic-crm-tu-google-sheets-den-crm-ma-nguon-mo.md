---
title: 'Atomic CRM: từ Google Sheets đến CRM mã nguồn mở'
excerpt: 'Atomic CRM là bước chuyển tự nhiên từ bảng tính sang một hệ thống CRM có cấu trúc, đủ nhẹ để hiểu và đủ mở để sửa.'
category: ['study', 'news']
tags: ['crm', 'open-source', 'google-sheets', 'self-host', 'automation']
author: 'Minh Anh'
publishDate: 2026-05-27T09:30:00.000Z
image: '~/assets/images/sheety-crm.webp'
---

Nếu Google Sheets là nơi rất nhiều team bắt đầu quản lý khách hàng, thì Atomic CRM là kiểu dự án khiến bạn nghĩ: “à, đây là lúc mình nên biến cái bảng tính đó thành một hệ thống tử tế hơn”. Nó không cố trở thành Salesforce tiếp theo. Nó cũng không ép bạn mua một gói SaaS rồi học lại toàn bộ quy trình. Atomic CRM hấp dẫn vì nó đứng đúng ở khoảng giữa: đủ nhẹ để hiểu, đủ thật để dùng, và đủ mở để sửa.

Bài này dành cho cả newbie lẫn người đã từng vật lộn với vài file Sheets, Notion database hay CRM quá nặng. Mình sẽ dùng repo gốc [Atomic](https://github.com/marmelab/atomic-crm) làm trung tâm, rồi đặt nó cạnh [Refine](https://github.com/refinedev/refine) và [Nextcrm](https://github.com/pdovhomilja/nextcrm-app) để trả lời câu hỏi quan trọng hơn cả tính năng: Atomic CRM hợp với ai, và có phải thời điểm để rời spreadsheet hay chưa.

## Atomic CRM là gì

[marmelab/atomic-crm](https://github.com/marmelab/atomic-crm) là một CRM mã nguồn mở được xây bằng React, shadcn-admin-kit và Supabase. Theo README và trang chính thức, dự án đã có sẵn các khối cốt lõi như contacts, tasks, notes, deals, activity history, import/export dữ liệu, đăng nhập qua Google/Azure/Keycloak/Auth0, API integration, và MCP server để nối AI assistant vào CRM.

Điều đáng chú ý là Atomic CRM không định vị mình như “một app CRM hoàn tất rồi đóng nắp”, mà như một CRM toolkit. Trang giới thiệu nhấn mạnh khả năng custom UI, data model, theming, pages và components bằng code, đồng thời tự host được trên Supabase hoặc hạ tầng riêng. Với team vừa rời Google Sheets nhưng chưa muốn nhảy vào CRM enterprise, đây là điểm rơi khá đẹp.

## Atomic CRM giải quyết bài toán gì

### Từ dữ liệu rời rạc sang dữ liệu có cấu trúc

Khi team còn nhỏ, một bảng Google Sheets có thể đủ để theo dõi tên khách, email, trạng thái deal và vài ghi chú. Nhưng chỉ cần thêm owner, lịch follow-up, email liên quan, notes theo thời gian, và vài deal chạy song song, bảng tính bắt đầu mất trật tự. Atomic CRM giải quyết điều đó bằng cách tách công việc ra thành các khối rõ ràng: contacts, tasks, notes, deals và history.

### Từ thao tác thủ công sang workflow có thể lặp lại

Một CRM đúng nghĩa không chỉ lưu dữ liệu, mà còn tạo ra quy tắc làm việc lặp lại. Atomic CRM có deal pipeline dạng Kanban, activity history gộp các tương tác, email-to-note bằng cách CC hệ thống, và API để kết nối sang hệ thống khác. Đây là bước chuyển quan trọng: từ “ghi cho nhớ” sang “vận hành được”.

## Atomic CRM hợp với ai

### Founder đang “thoát Sheets”

Nếu bạn đang quản lý lead trong Google Sheets nhưng bắt đầu gặp các vấn đề như trùng dữ liệu, khó theo dõi ai làm gì, hay không biết version nào là bản đúng, Atomic CRM là ứng viên hợp lý. Nó đủ gần với mô hình cũ để team không bị sốc, nhưng đủ mạnh để đưa mọi thứ vào quy trình.

### Team sản phẩm nhỏ có 1–3 dev

Đây có lẽ là chân dung hợp nhất với Atomic CRM. Vì repo đã có sẵn các phần nền, team không phải tự dựng CRM từ số 0. Bạn có thể giữ lại phần lớn những gì đã có, rồi chỉ tập trung custom entity, UI và business flow riêng.

### Agency hoặc team internal tools

Nếu bạn thường xuyên làm app nội bộ cho sale, CS hay account, Atomic CRM có giá trị như một starter kit thật sự: tiết kiệm thời gian dựng auth, CRUD flows, pipeline và notes.

## Khi nào chưa nên dùng Atomic CRM

Atomic CRM không hợp nếu bạn hoàn toàn không có năng lực kỹ thuật mà vẫn muốn “mua về bật là chạy” như SaaS. Trang dự án nói rất rõ: để custom CRM, bạn cần kỹ năng React và TypeScript; không có giao diện no-code cho phần tùy biến. Nếu bạn không định sửa gì bằng code và chỉ cần một công cụ dùng ngay, có thể SaaS sẽ ít đau đầu hơn.

Nó cũng chưa phải lựa chọn tốt nhất nếu team của bạn đang cần email client tích hợp sâu, AI enrichment, audit trail dày, semantic search hay project management ngay từ ngày đầu. Khi đó, một repo như NextCRM sẽ “tham vọng” hơn, dù đổi lại bằng độ phức tạp vận hành cao hơn.

## So sánh nhanh Atomic CRM, Refine và NextCRM

| Repo                                                  | Bản chất                                               | Hợp với ai                                                    | Điểm mạnh                                                                 | Điểm cần lưu ý                                  |
| ----------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| [Atomic](https://github.com/marmelab/atomic-crm)      | CRM mã nguồn mở dạng toolkit, đã có sẵn các khối chính | Team muốn một CRM thật nhưng vẫn dễ custom                    | Contacts, tasks, notes, deals, import/export, SSO, API, MCP, tự host      | Cần React/TypeScript để custom sâu              |
| [Refine](https://github.com/refinedev/refine)         | Meta-framework cho app CRUD-heavy                      | Team kỹ thuật muốn tự dựng CRM/internal tool từ nền tảng mạnh | Headless, mạnh về auth, routing, data provider, có template CRM reference | Không phải CRM đóng gói; phải tự làm nhiều phần |
| [Nextcrm](https://github.com/pdovhomilja/nextcrm-app) | CRM đầy đủ trên Next.js/PostgreSQL, có AI sâu          | Team muốn một CRM “all-in” hơn                                | Activities, audit log, email client, enrichment, vector search, MCP       | Phức tạp hơn nhiều, dễ quá sức với team nhỏ     |

Nếu xem ba repo này như ba cấp độ trưởng thành, thì Atomic CRM nằm ở giữa: ít trống hơn Refine, nhưng ít nặng hơn NextCRM.

## Cách đọc Atomic CRM nếu bạn là newbie

Nếu mới bước vào repo open-source, bạn không cần hiểu mọi thư mục ngay. Cách đọc hiệu quả hơn là nhìn theo ba lớp.

### Lớp 1: sản phẩm có gì

Đọc README và trang demo trước. Chỉ riêng README đã cho thấy Atomic CRM không phải demo “nửa vời”: có contacts, tasks, notes, deals, import/export, inbound email, access control, API và testing command rõ ràng.

### Lớp 2: chạy local có dễ không

Atomic CRM yêu cầu Make, Node 22 LTS và Docker vì backend chạy qua Supabase local. Quy trình local khá rõ: fork repo, `make install`, rồi `make start`; sau đó frontend chạy qua Vite, backend qua Supabase/Postgres local. Với newbie kỹ thuật, đây là tín hiệu tốt: repo có đường vào tương đối thẳng.

### Lớp 3: sửa được đến đâu

Trang chính thức nói rõ phần custom: theming, thay component, thêm page, mở rộng data model, tận dụng shadcn-admin-kit với hơn 200 hooks/components.

## 4 prompt mẫu copy/paste

### Prompt 1: Đánh giá repo cho team hiện tại

```text
Hãy đánh giá repo https://github.com/marmelab/atomic-crm cho team 6 người đang dùng Google Sheets làm CRM.
Yêu cầu:
- nêu rõ tính năng đã có sẵn
- phần nào cần tự code thêm
- 3 rủi ro khi self-host
- kết luận theo 3 mức: dùng ngay / pilot / chưa phù hợp
Không suy đoán nếu repo không nói rõ.
```

### Prompt 2: Biến bảng tính thành mô hình dữ liệu CRM

```text
Tôi có Google Sheets CRM với các cột:
lead_name, company, email, phone, source, status, owner, value, notes, next_action, updated_at.

Hãy đề xuất cách map dữ liệu này sang Atomic CRM:
1) contact
2) deal
3) task
4) note/activity

Output bằng bảng Markdown, dễ hiểu cho người mới.
```

### Prompt 3: Lập kế hoạch pilot 2 tuần

```text
Hãy viết kế hoạch pilot Atomic CRM trong 2 tuần cho team sales nhỏ.
Điều kiện:
- vẫn giữ Google Sheets làm bản đối chiếu
- chỉ import 50 contact đầu tiên
- phải có tiêu chí pass/fail rõ
- nêu danh sách việc cần kiểm tra mỗi ngày

Trả lời ngắn gọn, thực dụng.
```

### Prompt 4: So sánh hướng build CRM

```text
So sánh 3 lựa chọn:
1) dùng Atomic CRM
2) dùng Refine để tự build CRM
3) dùng NextCRM

Theo các tiêu chí:
- thời gian ra bản đầu
- độ khó cho dev
- độ thân thiện với newbie
- khả năng AI/MCP
- mức độ phù hợp để thay Google Sheets

Kết luận theo từng chân dung: founder không code, dev solo, team kỹ thuật 5 người.
```

## Workflow gợi ý để áp dụng Atomic CRM

Một sai lầm phổ biến là clone repo, chạy local, rồi nghĩ mình đã “triển khai CRM”. Thực tế phần quan trọng hơn là chuẩn bị dữ liệu và quy trình trước.

### Giai đoạn 1: dọn dữ liệu cũ

Chốt một file nguồn duy nhất, xóa cột dư, chuẩn hóa owner, status, source và định nghĩa rõ thế nào là contact, thế nào là deal. Nếu bước này chưa xong, import vào CRM chỉ làm dữ liệu bẩn nhanh hơn.

### Giai đoạn 2: pilot với một nhóm nhỏ

Đừng import toàn bộ công ty ngay. Hãy lấy 30–50 contact, 1 pipeline đơn giản, 1–2 owner và thử trong 1–2 tuần. Mục tiêu không phải “dùng hết tính năng”, mà là kiểm tra xem team có ghi note, cập nhật trạng thái và follow-up tốt hơn không.

### Giai đoạn 3: custom theo pain point thật

Chỉ sau pilot mới nên sửa schema hoặc UI. Custom quá sớm thường làm đông cứng một quy trình còn chưa được kiểm chứng.

## Kết luận

Atomic CRM không phải lựa chọn cho mọi người, nhưng nó là điểm rơi hợp lý cho những team đã qua giai đoạn bảng tính mà chưa muốn bước vào CRM enterprise nặng nề. Nó có đủ phần “CRM thật” để vận hành nghiêm túc, nhưng vẫn giữ lợi thế lớn nhất của open-source: bạn có thể hiểu, sửa và sở hữu nó.

Nếu bài Sheety CRM là câu chuyện “khi nào nên bắt đầu bằng spreadsheet”, thì Atomic CRM là bước tiếp theo tự nhiên: khi nào nên tốt nghiệp khỏi spreadsheet mà vẫn giữ sự đơn giản trong cách làm việc.
