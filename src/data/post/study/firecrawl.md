---
title: 'Firecrawl: Vũ khí tối thượng cào dữ liệu web cho LLM'
excerpt: 'Hướng dẫn toàn tập về Firecrawl - công cụ mã nguồn mở giúp biến mọi trang web thành định dạng Markdown sạch sẽ, sẵn sàng nạp thẳng vào các mô hình ngôn ngữ lớn (LLMs).'
category: ['study', 'discovery']
tags:
  - 'Firecrawl'
  - 'Web Scraping'
  - 'AI'
  - 'LLM'
  - 'Crawler'
author: 'news.info.vn'
publishDate: 2026-07-21T18:00:00.000Z
image: '~/assets/images/firecrawl-hero.webp'
---

Nếu bạn đang xây dựng một ứng dụng AI (như Chatbot, RAG system) cần lấy dữ liệu từ các trang web, chắc hẳn bạn đã gặp phải vô vàn khó khăn với HTML rác, Javascript render, captcha hay bị chặn IP. 

Đây chính là lúc **[Firecrawl](https://github.com/firecrawl/firecrawl)** xuất hiện như một vị cứu tinh. Được phát triển bởi Mendable AI, Firecrawl là một API (và mã nguồn mở) có khả năng cào (crawl) toàn bộ một website và trả về dữ liệu dưới dạng Markdown cực kỳ sạch sẽ - định dạng hoàn hảo nhất để nạp vào các mô hình LLM.

---

## 1. Firecrawl giải quyết bài toán gì?

Các công cụ cào dữ liệu truyền thống như BeautifulSoup hay Selenium trả về cho bạn HTML thuần hoặc text thô. Điều này tạo ra hai vấn đề lớn khi làm việc với AI:
1. HTML chứa quá nhiều thẻ (tags) vô nghĩa, làm tốn token (tiền) khi đưa vào LLM.
2. Các trang web hiện đại sử dụng React, Vue... cần render bằng JS mới ra nội dung, khiến các HTTP request thông thường "bó tay".

**Firecrawl giải quyết triệt để bằng cách:**
- Tự động vượt qua các hàng rào chống bot.
- Render hoàn chỉnh Javascript để lấy dữ liệu cuối cùng.
- Trích xuất nội dung chính và chuyển đổi sang Markdown chuẩn.
- Tự động thu thập tất cả các sub-links (link con) trong website chỉ với 1 API call.

---

## 2. Cách cài đặt và chạy Local Firecrawl

Dự án Firecrawl có sẵn mã nguồn mở trên GitHub, cho phép bạn tự host trên máy chủ riêng bằng Docker, giúp bảo mật dữ liệu tuyệt đối và không giới hạn số lượng request.

### Yêu cầu hệ thống:
- Cài đặt sẵn Docker và Docker Compose.
- Node.js >= 18 (nếu muốn chạy dev).

### Các bước chạy bằng Docker:

```bash
# 1. Clone repo từ GitHub
git clone https://github.com/firecrawl/firecrawl.git
cd firecrawl

# 2. Chạy dịch vụ bằng Docker Compose
docker-compose up -d
```

Hệ thống sẽ kéo các image cần thiết (như Redis, Playwright, API server) và khởi động ở cổng `3002`.

---

## 3. Hướng dẫn sử dụng Firecrawl (Workflow + Prompt)

Firecrawl cung cấp 3 tính năng chính: **Scrape** (Cào 1 trang), **Crawl** (Cào toàn bộ web), và **Extract** (Trích xuất dữ liệu có cấu trúc).

Dưới đây là cách sử dụng bằng Python SDK (hoặc bạn có thể gọi trực tiếp API `http://localhost:3002/v0/scrape`).

### Cài đặt SDK
```bash
pip install firecrawl-py
```

### 3.1. Scrape một URL thành Markdown
Giả sử bạn muốn lấy toàn bộ nội dung một bài báo để tóm tắt bằng LLM:

```python
from firecrawl import FirecrawlApp

app = FirecrawlApp(api_key="EMPTY") # Dùng "EMPTY" nếu chạy local localhost:3002

# Lấy dữ liệu dạng markdown
response = app.scrape_url(
    url='https://news.info.vn', 
    params={'formats': ['markdown']}
)

print(response['markdown'])
```
*Kết quả trả về sẽ là markdown sạch, không dính quảng cáo hay menu lộn xộn.*

### 3.2. Crawl toàn bộ Website
Bạn muốn tạo một chatbot trả lời các câu hỏi về tài liệu của công ty (Ví dụ: docs.congty.com). Bạn cần crawl tất cả các trang con.

```python
crawl_result = app.crawl_url(
    url='https://docs.congty.com',
    params={
        'limit': 100, # Giới hạn tối đa 100 trang con
        'scrapeOptions': {'formats': ['markdown']}
    }
)

# crawl_result sẽ trả về một ID job, hệ thống sẽ chạy ngầm và bạn có thể kiểm tra trạng thái
```

### 3.3. Extract dữ liệu có cấu trúc (Cực kỳ mạnh mẽ)
Đôi khi bạn không cần toàn bộ bài viết, bạn chỉ muốn bóc tách ra các trường dữ liệu cụ thể (như tên sản phẩm, giá bán, đánh giá) dưới dạng JSON. Nhờ sự trợ giúp của AI nội bộ, Firecrawl có thể làm được điều này.

**Ví dụ Prompt + Code Extract:**
```python
schema = {
    "type": "object",
    "properties": {
        "ten_bai_viet": {"type": "string"},
        "tac_gia": {"type": "string"},
        "tom_tat": {"type": "string"}
    },
    "required": ["ten_bai_viet", "tac_gia", "tom_tat"]
}

data = app.scrape_url('https://news.info.vn/bai-viet-1', {
    'formats': ['extract'],
    'extract': {
        'schema': schema,
        'systemPrompt': 'Trích xuất thông tin tác giả và viết 1 đoạn tóm tắt 3 câu bằng tiếng Việt.'
    }
})

print(data['extract'])
```

---

## 4. Tích hợp Firecrawl với LLM

Sau khi lấy được Markdown từ Firecrawl, việc tiếp theo là đưa vào Prompt cho ChatGPT hoặc Claude. Đây là cấu trúc Prompt chuẩn bạn nên dùng:

```text
Bạn là một chuyên gia phân tích dữ liệu. Tôi sẽ cung cấp cho bạn nội dung của một trang web dưới dạng Markdown (do Firecrawl trích xuất).

Nhiệm vụ của bạn:
1. Đọc kỹ nội dung và loại bỏ các thông tin rác (nếu còn sót lại như footer, copyright).
2. Lên danh sách 5 ý chính quan trọng nhất.
3. Dịch kết quả sang Tiếng Việt.

Dưới đây là nội dung trang web:
[Chèn kết quả từ Firecrawl vào đây]
```

## Tổng kết
Firecrawl thực sự là cầu nối hoàn hảo giữa Website và LLM. Bằng việc loại bỏ những khó khăn về parsing HTML và scraping truyền thống, công cụ này giúp các nhà phát triển AI tập trung vào logic lõi của ứng dụng thay vì đi xử lý chuỗi văn bản mệt mỏi. 

Hãy thử cài đặt Docker và trải nghiệm tốc độ cào dữ liệu "nhanh như chớp" của Firecrawl ngay hôm nay!
