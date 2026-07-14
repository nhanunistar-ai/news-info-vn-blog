---
title: 'Kết hợp NotebookLM với Antigravity - Sức mạnh của hai AI agent làm việc cùng nhau'
excerpt: 'NotebookLM hiểu sâu tài liệu của bạn. Antigravity thực thi code, browse web và build feature. Kết hợp đúng cách, hai tool này tạo ra một workflow mà một mình mỗi tool không làm được.'
category: ['study', 'news']
tags: ['notebooklm', 'antigravity', 'ai-agent', 'workflow', 'developer', 'productivity']
author: 'Tuan Kiet'
publishDate: 2026-06-24T08:00:00.000Z
image: '~/assets/images/ket-hop-notebooklm-voi-antigravity-suc-manh-cua-hai-ai-agent.webp'
---

> NotebookLM là AI đọc tài liệu giỏi nhất hiện tại. Antigravity là AI thực thi tác vụ mạnh nhất. Vấn đề là chúng không "nói chuyện" với nhau - đó là việc của bạn.

Nếu bạn đang dùng riêng lẻ từng tool, bạn đang bỏ lỡ phần hay nhất.

Bài này sẽ chỉ cụ thể cách nối hai tool lại thành một workflow thực tế - từ research đến code đến deploy.

---

## Hiểu đúng vai trò của từng tool

Trước khi kết hợp, cần hiểu rõ mỗi tool mạnh ở đâu và yếu ở đâu.

### NotebookLM - chuyên gia đọc tài liệu

NotebookLM nhận vào bất kỳ tài liệu nào bạn cung cấp - PDF, Google Docs, website, YouTube transcript - và trở thành chuyên gia về tập tài liệu đó.

**Mạnh:** Trích xuất insight chính xác từ tài liệu dài, tổng hợp nhiều nguồn, trả lời câu hỏi với trích dẫn nguồn rõ ràng, tạo Audio Overview, không "bịa" thông tin ngoài tài liệu.

**Yếu:** Không thể chạy code, không browse web thời gian thực, không thực thi tác vụ, không kết nối với tool bên ngoài.

### Antigravity - chuyên gia thực thi

Antigravity (Google) là nền tảng agent-first: nhận mục tiêu, lập kế hoạch, chạy code, browse web, tạo file và báo cáo kết quả.

**Mạnh:** Viết và chạy code thực, browse web thời gian thực, làm việc song song nhiều task, thao tác file system, tích hợp API.

**Yếu:** Không có bộ nhớ sâu về tài liệu của bạn - nó biết web nhưng không biết codebase nội bộ hay spec riêng của project bạn.

**Khoảng trống:** NotebookLM biết sâu tài liệu của bạn nhưng không hành động. Antigravity hành động mạnh nhưng không biết context riêng của bạn. Bạn là cầu nối.

---

## Workflow tổng thể

```
[Tài liệu của bạn]
        |
        v
  [NotebookLM]          <- Đọc, phân tích, trích xuất
        |
   Output: Brief / Spec / Insight
        |
        v
  [Bạn] (chỉnh sửa, xác nhận)
        |
        v
  [Antigravity]         <- Thực thi, code, browse, build
        |
        v
  [Kết quả thực tế]
```

Quy trình đơn giản nhưng cực kỳ hiệu quả vì mỗi agent làm đúng việc của nó.

---

## 4 workflow cụ thể với prompt mẫu

### Workflow 1 - Research to Code

**Tình huống:** Bạn có tài liệu kỹ thuật (API docs, RFC, whitepaper) và cần implement.

**Bước 1 - NotebookLM:** Tải API docs vào NotebookLM, chạy prompt:

```
Prompt mẫu 1 - NotebookLM:

Dựa trên tài liệu API này, hãy tạo một "Implementation Brief" gồm:
1. Các endpoint cần thiết để [mục tiêu cụ thể]
2. Request/response format của từng endpoint
3. Authentication method
4. Rate limits và error codes quan trọng
5. Ví dụ cURL cho mỗi endpoint

Format output dưới dạng markdown có thể copy-paste thẳng vào Antigravity.
```

**Bước 2 - Copy output sang Antigravity:**

```
Prompt mẫu 2 - Antigravity:

Dưới đây là Implementation Brief cho [tên API]:

[Paste output từ NotebookLM vào đây]

Nhiệm vụ:
1. Tạo một SDK wrapper trong [Node.js / Python] cho các endpoint trên
2. Implement error handling đầy đủ
3. Viết unit tests cho từng method
4. Tạo README.md với usage examples

Bắt đầu với file structure trước, confirm với tôi trước khi viết code.
```

**Kết quả:** Bạn có SDK hoàn chỉnh mà không phải đọc hết docs hoặc viết từng dòng code thủ công.

---

### Workflow 2 - Meeting Notes to Action Items to Code

**Tình huống:** Bạn có transcript cuộc họp product và cần convert sang tasks kỹ thuật.

**Bước 1 - NotebookLM:** Upload transcript, chạy:

```
Prompt mẫu 3 - NotebookLM:

Phân tích transcript này và tạo:

**Technical Backlog:**
- Mỗi feature request từ cuộc họp → 1 user story (As a..., I want..., So that...)
- Estimate độ phức tạp: Low / Medium / High
- Dependencies giữa các tasks
- Câu hỏi kỹ thuật cần clarify trước khi implement

**Không suy diễn** - chỉ dựa trên những gì được đề cập rõ ràng trong transcript.
Output format: YAML để dễ parse.
```

**Bước 2 - Antigravity thực thi tasks:**

Chọn một task cụ thể từ backlog và paste vào Antigravity với đầy đủ context:

```
Task từ backlog: [Copy user story cụ thể]

Context từ cuộc họp:
- [Paste đoạn transcript liên quan]
- Constraint: [deadline, tech stack, etc.]

Implement feature này. Check repo hiện tại trước để hiểu code style và patterns đang dùng.
```

---

### Workflow 3 - Competitor Research to Product Spec

**Tình huống:** Bạn cần build feature mới và muốn research competitor trước.

**Bước 1 - Antigravity browse & collect:**

Antigravity làm phần thu thập dữ liệu vì nó có khả năng browse web:

```
Browse các trang sau và extract thông tin về [feature cụ thể]:
- [competitor 1 URL]
- [competitor 2 URL]
- [competitor 3 URL]

Tạo file competitor-research.md với:
- Screenshot key UX patterns (mô tả text nếu không screenshot được)
- Pricing (nếu có)
- User reviews về feature này từ G2/Product Hunt
- Kỹ thuật implementation có thể đoán được từ behavior
```

**Bước 2 - NotebookLM synthesize:**

Upload file competitor-research.md vào NotebookLM cùng với product roadmap hiện tại của bạn, chạy:

```
Prompt mẫu 4 - NotebookLM:

Dựa trên competitor research và roadmap hiện tại của chúng tôi, hãy viết Product Spec cho [feature]:

1. **Problem Statement** - Vấn đề user đang gặp
2. **Proposed Solution** - Approach của chúng tôi (differentiated từ competitor)
3. **MVP Scope** - Chính xác những gì cần build ở v1, những gì để sau
4. **Success Metrics** - Cách đo lường feature này thành công
5. **Open Questions** - Những quyết định cần confirm trước khi build

Không suggest feature không có trong tài liệu đã cung cấp.
```

**Bước 3 - Antigravity implement từ spec:**

Paste spec vào Antigravity để bắt đầu implementation.

---

### Workflow 4 - Codebase Documentation

**Tình huống:** Bạn inherit một codebase không có docs và cần hiểu nhanh.

**Bước 1 - Antigravity extract:**

```
Scan codebase trong thư mục [path]. Tạo documentation-dump.md gồm:
- File structure với mô tả từng module
- Tất cả function signatures và JSDoc comments (nếu có)
- Tất cả API endpoints (nếu là backend)
- Database schema (nếu có migration files)
- Environment variables được reference
- External dependencies và cách chúng được dùng
```

**Bước 2 - NotebookLM làm "codebase expert":**

Upload documentation-dump.md vào NotebookLM. Từ đây bạn có thể hỏi bất kỳ câu hỏi nào về codebase:

- "Tôi muốn add authentication, cần modify những file nào?"
- "Explain flow của một request từ client đến database"
- "Những chỗ nào có technical debt rõ ràng?"

NotebookLM trở thành chuyên gia về codebase đó - không "bịa" vì nó chỉ trả lời dựa trên tài liệu bạn cung cấp.

---

## Tips thực chiến

**Luôn review output NotebookLM trước khi paste vào Antigravity.** NotebookLM chính xác về tài liệu nhưng có thể diễn giải theo cách bạn không muốn. 30 giây review tiết kiệm 30 phút debug sau.

**Dùng format có cấu trúc khi chuyển giữa hai tool.** YAML hoặc Markdown với headers rõ ràng giúp Antigravity parse context tốt hơn plain text.

**Chia task lớn thành phases.** Không paste một spec 10 trang vào Antigravity và chờ magic. Chia thành: (1) design data model, (2) implement backend, (3) implement frontend, mỗi phase là một session riêng.

**NotebookLM nhớ tốt hơn bạn tưởng.** Trong cùng một notebook session, nó giữ context. Dùng cùng notebook cho toàn bộ project thay vì tạo mới mỗi lần.

**Antigravity tốt hơn với mục tiêu rõ ràng hơn là mô tả mơ hồ.** Thay vì "build authentication", hãy dùng: "Implement JWT authentication với refresh token, flow: login → access token (15 min) + refresh token (7 days) → auto-refresh khi access token expire."

---

## Khi nào không cần kết hợp?

Không phải lúc nào cũng cần dùng cả hai.

**Chỉ dùng NotebookLM khi:** Bạn cần đọc/hiểu tài liệu, tổng hợp nhiều nguồn, tạo brief cho team hoặc chuẩn bị câu hỏi trước meeting.

**Chỉ dùng Antigravity khi:** Task đã rõ ràng, không cần research thêm, bạn chỉ cần thực thi nhanh.

**Kết hợp khi:** Bạn có tài liệu phức tạp cần hiểu sâu trước khi action, hoặc khi context nội bộ quan trọng với kết quả cuối cùng.

---

## Wrap-up

Điểm mấu chốt không phải là dùng nhiều tool hơn - mà là dùng đúng tool cho đúng việc.

NotebookLM + Antigravity không phải là magic formula. Đó là một quy trình rõ ràng: **hiểu sâu trước, hành động sau**. NotebookLM giúp bạn hiểu sâu. Antigravity giúp bạn hành động hiệu quả.

Thứ khiến quy trình này hoạt động là bạn - người biết khi nào dừng research và bắt đầu build.

---

*Bạn đang dùng workflow nào với Antigravity? Share ở phần comment bên dưới.*
