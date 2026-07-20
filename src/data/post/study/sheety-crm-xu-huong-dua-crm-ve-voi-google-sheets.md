---
title: 'Sheety CRM - khi Google Sheets vẫn đủ tốt'
excerpt: 'Từ Sheets đơn giản đến CRM có cấu trúc: khi nào nên ở lại với Google Sheets, khi nào nên chuyển sang Atomic CRM, Refine hoặc NextCRM.'
category: ['study', 'news']
tags: ['crm', 'google-sheets', 'open-source', 'self-host', 'automation']
author: 'Minh Anh'
publishDate: 2026-06-27T09:00:00.000Z
image: '~/assets/images/sheety-crm.webp'
---

Nếu bạn từng mở một file Google Sheets để theo dõi lead, khách hàng, lịch follow-up hay doanh thu dự kiến, thì bạn đã chạm vào tinh thần của “Sheety CRM”. Nó không phải tên một sản phẩm cụ thể, mà là một cách nghĩ: đưa CRM về mức đơn giản, quen tay và dễ sửa như spreadsheet, thay vì bắt mọi người học một hệ thống nặng nề ngay từ đầu.

Xu hướng này không mới, nhưng đang trở lại vì hai lý do. Thứ nhất, nhiều team nhỏ chỉ cần quản lý khoảng 25–50 khách hàng đầu tiên và muốn thứ gì đó cài trong 15 phút, không cần kỹ thuật cao. Thứ hai, Google Sheets là một launchpad hợp lý cho CRM rất cơ bản: rẻ, dễ chia sẻ, dễ tùy biến, nhưng sẽ nhanh chóng chạm trần khi dữ liệu tăng và quy trình bắt đầu cần tự động hóa.

Trong bài này, mình dùng repo gốc [Aatomic](https://github.com/marmelab/atomic-crm) làm điểm tựa chính, rồi so thêm với [Refine](https://github.com/refinedev/refine) và [Nextcrm](https://github.com/pdovhomilja/nextcrm-app) để trả lời một câu hỏi rất thực tế: khi nào nên ở lại với Sheets, khi nào nên “tốt nghiệp” sang CRM mã nguồn mở?

## Sheety CRM là gì

“Sheety CRM” là kiểu CRM có triết lý spreadsheet-first: dữ liệu nhìn được ngay theo hàng/cột, dễ thêm trường mới, dễ import/export, và ai mới vào cũng hiểu sau vài phút.

Google Sheets phù hợp với giai đoạn đầu vì gần như ai cũng biết dùng, có thể cộng tác qua cloud, và cho phép chỉnh pipeline, cột dữ liệu, trạng thái, ghi chú theo cách riêng của team. Nhưng càng nhiều contact và thao tác, lỗi thủ công và giới hạn tự động hóa càng lộ rõ.

Đây là một cách làm rất hợp lý nếu bạn đang tìm cách “đánh giá nhu cầu thật sự” trước khi đầu tư vào một hệ thống CRM nghiêm túc.

## Atomic CRM là đại diện đáng chú ý

[Atomic](https://github.com/marmelab/atomic-crm) không chạy trên Google Sheets. Đây là điểm cần nói rõ ngay để tránh hiểu sai. Atomic CRM là một CRM mã nguồn mở viết bằng React, dùng shadcn-admin-kit và Supabase, có đầy đủ các khối mà một CRM “thật” cần: contacts, tasks, notes, deals, activity history, import/export, đăng nhập SSO, API integration, và cả MCP server cho AI assistant.

Điểm hay của Atomic CRM là nó giữ được tinh thần “gần tay” như spreadsheet nhưng không dừng ở đó. Trang giới thiệu của dự án nhấn mạnh import/export, Kanban cho deal pipeline, email-to-note, API, MCP server, cùng khả năng tự host trên Supabase hoặc hạ tầng riêng. README cũng cho thấy đường local dev khá thẳng: cần Node 22, Docker, Supabase local và có thể chạy bằng `make install` rồi `make start`.

Với newbie, cách hiểu dễ nhất là thế này: nếu Google Sheets là cuốn sổ bán hàng thông minh, thì Atomic CRM là lúc bạn chuyển cuốn sổ đó thành một ứng dụng có cấu trúc nhưng vẫn đủ dễ sửa bằng code.

## Khi nào nên ở lại với Sheets

Bạn nên ở lại với Google Sheets nếu đang ở một trong các trạng thái sau:

- Mới có vài chục lead đầu tiên.
- Chưa rõ pipeline thực sự của team gồm mấy bước.
- Chưa có người kỹ thuật để vận hành thêm app.
- Cần học xem “dữ liệu nào thật sự quan trọng” trước khi chọn CRM.

Trong giai đoạn đầu, Google Sheets có lợi thế rất lớn: setup tức thì, rẻ, dễ chia sẻ, và không đòi hỏi người dùng phải “thay thói quen” nhiều. Nếu team vẫn đang thử nghiệm cách bán hàng, cách follow-up, hay cách định nghĩa một deal, thì giữ nguyên Sheets là một lựa chọn rất hợp lý.

## Khi nào nên nâng cấp lên CRM mã nguồn mở

Bạn nên chuyển sang một repo kiểu Atomic CRM khi bắt đầu thấy ba dấu hiệu. Một là dữ liệu không còn là “một bảng” nữa, mà thành nhiều thực thể: contact, công ty, deal, task, note, activity. Hai là team cần biết “ai đã làm gì” chứ không chỉ “ô nào vừa sửa”. Ba là bạn muốn kết nối email, API, workflow hoặc AI, nhưng không muốn bị khóa vào SaaS ngay từ đầu.

Atomic CRM đặc biệt hợp với nhóm này vì nó đã có sẵn những mảnh ghép dùng được ngay: activity log, import/export, deal Kanban, email capture, API, SSO, MCP server và khả năng tùy biến giao diện bằng code. Nó không còn là “bảng tính đẹp hơn”, mà là một nền CRM starter kit để bạn biến thành phiên bản riêng của công ty mình.

## So sánh nhanh 3 hướng đi

| Repo                                                  | Bản chất                                             | Hợp với ai                                  | Điểm mạnh                                                                         | Điểm cần lưu ý                                           |
| ----------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [Atomic](https://github.com/marmelab/atomic-crm)      | CRM mã nguồn mở hoàn chỉnh trên React + Supabase     | Team muốn CRM thật nhưng vẫn nhẹ và dễ sửa  | Có contacts, tasks, notes, deals, activity, import/export, SSO, API, MCP          | Vẫn cần dev để custom sâu; không phải Google Sheets thật |
| [Refine](https://github.com/refinedev/refine)         | Meta-framework/headless framework cho app CRUD-heavy | Team kỹ thuật muốn tự dựng CRM theo nhu cầu | Rất mạnh về scaffolding, routing, auth, data providers; có template CRM reference | Không phải CRM đóng gói sẵn; bạn phải tự xây nhiều phần  |
| [Nextcrm](https://github.com/pdovhomilja/nextcrm-app) | CRM đầy đủ trên Next.js + PostgreSQL                 | Team cần nhiều tính năng nâng cao và AI sớm | Có activities, audit log, email client, AI enrichment, vector search, MCP server  | Phức tạp hơn đáng kể; overkill cho team mới              |

Nếu phải nói rất đời thường: Atomic CRM là lựa chọn “ra sản phẩm nhanh nhưng vẫn mở”, Refine là “bộ khung để tự xây CRM của bạn”, còn NextCRM là “một chiếc CRM nặng đô có AI/MCP baked-in”.

## Chọn đường nào cho đúng

### Nếu bạn là founder không rành kỹ thuật

Hãy bắt đầu với Google Sheets để học workflow, không phải để sống mãi với nó. Mục tiêu 4–8 tuần đầu là xác định xem bạn thật sự cần track gì: nguồn lead, người liên hệ chính, trạng thái deal, lần follow-up cuối, next step, và giá trị dự kiến. Khi các trường này ổn định, đó là lúc bạn mang schema ấy sang Atomic CRM.

### Nếu bạn là dev solo hoặc team sản phẩm nhỏ

Atomic CRM thường là điểm bắt đầu tốt nhất trong ba repo. Nó đã là một CRM, không chỉ là framework; nhưng vẫn mở để bạn sửa schema, UI, pages và flows theo domain riêng. Nói cách khác, nó giúp bạn bỏ qua phần lớn việc “dựng nền” mà Refine buộc bạn tự làm.

### Nếu bạn cần internal tool hơn là CRM đóng gói

Refine hợp hơn. Refine tự mô tả mình là React meta-framework cho các ứng dụng CRUD-heavy như internal tools, admin panels, dashboards; và template CRM của họ là ví dụ reference để học pattern triển khai.

### Nếu bạn muốn AI, enrichment và automation ngay

NextCRM đáng xem hơn Atomic CRM. README của dự án này cho thấy nó có activities, audit trail, built-in MCP server, vector search, enrichment bằng agent/sandbox, cùng email client và project management. Đổi lại, độ phức tạp setup và vận hành cũng cao hơn tương ứng.

## Prompt mẫu copy/paste

### Prompt 1: Từ Google Sheets sang schema CRM

```text
Tôi đang quản lý lead trong Google Sheets với các cột:
name, company, email, phone, source, stage, owner, last_contacted_at, next_step, deal_value, notes.

Hãy chuyển bảng này thành schema CRM mức cơ bản:
1) entity nào nên tách riêng
2) field nào nên giữ ở record chính
3) field nào nên thành activity/history
4) field nào cần chuẩn hóa enum

Output bằng Markdown, dễ hiểu cho người mới.
```

### Prompt 2: Đánh giá có nên dùng Atomic CRM không

```text
Hãy đánh giá repo https://github.com/marmelab/atomic-crm cho team 5 người đang dùng Google Sheets làm CRM.
Yêu cầu:
- nêu rõ cái gì repo đã có sẵn
- cái gì vẫn phải tự code
- 3 rủi ro khi self-host
- kết luận: dùng ngay / thử pilot / chưa phù hợp
Không suy đoán nếu repo không nói rõ.
```

### Prompt 3: Viết kế hoạch migrate dữ liệu

```text
Tôi có 1 file Google Sheets CRM và muốn migrate sang Atomic CRM.
Hãy viết kế hoạch migrate 3 giai đoạn:
1) dọn dữ liệu
2) map cột sang entity CRM
3) kiểm tra sau import

Bao gồm checklist lỗi thường gặp: trùng contact, stage không chuẩn, notes quá dài, owner thiếu.
```

### Prompt 4: So sánh Atomic CRM, Refine, NextCRM

```text
So sánh 3 hướng làm CRM:
1) Atomic CRM
2) Refine + CRM template
3) NextCRM

Theo 6 tiêu chí:
- tốc độ lên bản đầu
- độ khó tùy biến
- mức sẵn sàng cho production
- AI/MCP
- phù hợp cho newbie
- chi phí vận hành

Trả lời bằng bảng và kết luận theo 3 chân dung người dùng: founder, dev solo, team kỹ thuật 5-10 người.
```

## Workflow gợi ý dễ làm nhất

Nếu bạn là newbie, đừng lao vào clone repo trước. Workflow hợp lý hơn là:

1. Dùng Google Sheets trong 2–4 tuần để chốt các cột dữ liệu thật sự cần.
2. Chạy Prompt 1 và Prompt 3 để biến bảng tính thành schema có cấu trúc.
3. Đánh giá Atomic CRM bằng Prompt 2.
4. Chỉ khi team đã thống nhất entity và pipeline, mới pilot Atomic CRM.

Trình tự này quan trọng vì phần khó nhất của CRM không phải dựng app, mà là thống nhất “một khách hàng được định nghĩa như thế nào” và “một deal được coi là tiến triển ra sao”.

## Kết luận

“Sheety CRM” không phải là chống lại CRM, mà là chống lại việc triển khai CRM quá sớm, quá nặng và quá xa cách với cách con người thật sự làm việc. Google Sheets rất tốt để học quy trình, học dữ liệu, và ép team nói chung một ngôn ngữ. Nhưng khi công việc đã thành hệ thống, bạn sẽ cần một nền như Atomic CRM để có activity history, quyền truy cập, pipeline, API và AI một cách bền vững.

Nếu phải chốt một câu: hãy bắt đầu như một bảng tính, nhưng đừng dừng lại ở bảng tính. Đó chính là tinh thần thật sự của Sheety CRM.
