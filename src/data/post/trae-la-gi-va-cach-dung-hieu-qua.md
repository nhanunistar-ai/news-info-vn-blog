---
title: 'TRAE là gì và cách dùng hiệu quả'
excerpt: 'TRAE là trợ lý AI trong TRAE Work, giúp bạn viết tài liệu, nghiên cứu, xử lý dữ liệu và hỗ trợ lập trình theo kiểu agent. Với Work mode, Code mode, Skills và MCP, bạn có thể biến yêu cầu tự nhiên thành output dùng ngay: file, báo cáo, hoặc thay đổi code có kiểm chứng.'
category: ['study', 'news']
tags: [trae, trae-work, ai-assistant, ai-agent, skills, mcp]
author: 'Minh Khang'
publishDate: 2026-06-26T06:43:00.000Z
image: '~/assets/images/trae-work-ai-assistant.webp'
---

## TRAE Work là gì?

TRAE Work là một workspace AI-native, nơi **AI không chỉ “chat”** mà còn có thể **lập kế hoạch và thực thi** để tạo ra đầu ra cụ thể: tài liệu, báo cáo, file nội dung, hoặc thay đổi code trong dự án (khi bạn cung cấp repo/thư mục làm việc).

Nếu bạn cần một câu mô tả đúng kiểu “kỹ thuật”: **TRAE Work = UI + workflow + tool runtime** để bạn giao nhiệm vụ bằng ngôn ngữ tự nhiên, còn TRAE làm phần **planning + execution** có kiểm soát.

### Hai chế độ bạn sẽ dùng nhiều nhất

| Chế độ | Dùng khi | Output hay gặp |
|---|---|---|
| `Work mode` | viết bài, nghiên cứu, tài liệu, dữ liệu, báo cáo | `.md`, `.html`, `.docx`, `.pdf`, `.xlsx` |
| `Code mode` | làm việc với codebase: debug/refactor/test | patch/code diff, commit, hướng dẫn chạy, test |

Điểm quan trọng: dù ở mode nào thì “cách dùng hiệu quả” vẫn xoay quanh **3 thứ**: _ngữ cảnh_, _tiêu chí xong_, và _cơ chế kiểm chứng_.

## “Dùng đúng” theo tư duy kỹ thuật

### 1) Luôn định nghĩa “Done”

Đừng chỉ nói “làm giúp tao”. Hãy nói rõ “xong là xong” theo kiểu có thể kiểm chứng:

- Bài viết: “xong khi có `front matter` đúng format, có `H2/H3`, có `FAQ`, có `CTA`, 1200–1800 chữ.”
- Script: “xong khi chạy được lệnh `npm test` pass / có output file `report.html`.”
- Refactor: “xong khi giữ nguyên behavior, coverage không giảm, lint không tăng warning.”

Bạn càng định nghĩa Done rõ, TRAE càng ít vòng lặp sửa qua sửa lại.

### 2) Tách task lớn thành “đầu ra nhỏ”

Mẹo rất hiệu quả:

1. Chốt outline (mục lục).
2. Viết từng phần (mỗi phần 1 output).
3. Chạy verify (test/build/checklist).
4. Đóng gói (file final, link, hướng dẫn deploy).

Nếu bạn thấy TRAE tự tạo `Todo`, đó là cơ chế để bẻ một việc lớn thành các bước nhỏ có trạng thái.

### 3) Quản lý ngữ cảnh (context) như “dependency”

Trong thực tế, TRAE ra kết quả tốt nhất khi bạn đưa đúng “dependency” ngay từ đầu:

- Với content: `brand voice`, persona độc giả, sản phẩm, USP, CTA, link chính thức.
- Với data: schema cột, định nghĩa KPI, timezone, missing value policy.
- Với code: cấu trúc repo, command chạy test/build, constraint về version.

Nếu thiếu, TRAE vẫn làm được nhưng sẽ phải hỏi lại để tránh “bịa” hoặc đoán sai.

## Skills & MCP: khi nào cần dùng?

### Skills (kỹ năng theo tác vụ)

Bạn không cần nhớ tên skill, chỉ cần nói đúng “output muốn có”. Ví dụ:

- “Tạo 1 bài blog chuẩn Markdown có front matter như mẫu.”
- “Xuất 1 trang HTML tự chứa (self-contained) để up lên web.”
- “Tạo slide thuyết trình.”

TRAE sẽ tự chuyển sang skill phù hợp để làm ra output đúng định dạng.

### MCP (Model Context Protocol)

MCP là cơ chế để TRAE **kết nối thêm công cụ/dịch vụ** (tuỳ bạn cấp quyền và cấu hình). Về mặt kỹ thuật, bạn có thể coi MCP như “plugin protocol” để mở rộng năng lực execution.

Một cách nói dễ hiểu: **Skills = kỹ năng**, **MCP = tay chân**.

### Prompt mẫu “chuẩn kỹ thuật” (copy/paste dùng ngay)

#### Template đa năng

```text
Mục tiêu:
Độc giả/Ngữ cảnh:
Input (file/link/đoạn text):
Ràng buộc (độ dài, format, giọng, SEO, CTA):
Tiêu chí Done (có thể kiểm chứng):
Đầu ra mong muốn (file .md/.html/...):
```

#### Prompt để viết bài đăng cho website

```text
Viết bài blog giới thiệu TRAE Work theo hướng kỹ thuật, cho đối tượng dev/founder.
Giọng: gọn, rõ, có ví dụ prompt + workflow.
Bắt buộc: có front matter (title/excerpt/category/tags/author/publishDate/image), có mục "Cách dùng đúng", "Work vs Code", "Skills & MCP", "Giới hạn gói free", và "FAQ".
Tiêu chí Done: bài 1200–1800 từ, có H2/H3 rõ ràng, có ít nhất 4 prompt mẫu copy/paste, có 1 bảng so sánh.
Đầu ra: 1 file Markdown.
```

## Gói free bị giới hạn gì? (đi thẳng vào phần hay hỏi)

Theo mô tả quyền lợi công khai hiện tại, `Free` thường sẽ bị giới hạn ở các điểm liên quan đến **tốc độ ưu tiên** và **khả năng chạy song song**:

- `Fast-pass (速通) = 0` lượt/tháng: không có lượt “skip hàng chờ”.
- `Cloud tasks parallelism = 2`: số tác vụ cloud chạy song song tối đa 2.
- Giờ cao điểm có thể phải đợi hàng chờ (nhưng vẫn dùng được tính năng cốt lõi).

Bạn có thể xem chi tiết tại trang quyền lợi: https://docs.trae.cn/ide_fast-pass-overview

> Ghi chú: quyền lợi và giới hạn có thể thay đổi theo thời điểm/khu vực, nên khi cần con số “chuẩn” (token/quota/model) thì nên đối chiếu trong docs/ứng dụng ở thời điểm bạn dùng.

## Workflow gợi ý (để bạn “dạy” TRAE làm đúng ý)

### Workflow viết bài (content)

1. Bạn đưa: outline + style + format front matter + 1–2 bài mẫu.
2. TRAE viết bản nháp 1.
3. Bạn review theo 3 tiêu chí: `giọng`, `logic`, `CTA`.
4. TRAE rewrite và đóng gói thành `.md` final.

### Workflow làm việc với codebase (agent)

1. Bạn đưa repo/thư mục + lệnh chạy + constraint.
2. TRAE đọc cấu trúc và đề xuất kế hoạch thay đổi.
3. TRAE thực hiện thay đổi theo từng bước nhỏ.
4. Chạy verify (test/build) và ghi rõ “đã verify bằng gì”.

## FAQ

### TRAE có thể tạo file để tao đăng lên web không?

Có. Bạn yêu cầu `.md`/`.html`/`.docx`… và nêu format, TRAE sẽ xuất đúng định dạng để bạn copy/dán hoặc upload.

### Làm sao để TRAE ít hỏi lại?

Đưa trước 4 thứ: `mục tiêu`, `ngữ cảnh`, `ràng buộc`, `tiêu chí Done`.

### Khi nào nên dùng Code mode?

Khi bạn đang làm việc với repo/codebase và muốn kết quả là **thay đổi code có thể kiểm chứng** (test/build pass). www.news.info.vn/test

