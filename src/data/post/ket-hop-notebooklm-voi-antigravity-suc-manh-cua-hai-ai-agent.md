---
title: 'Kết hợp NotebookLM với Antigravity qua MCP - AI agent tự hỏi knowledge base của bạn'
excerpt: 'notebooklm-mcp biến NotebookLM thành một MCP server. Khi đó Antigravity, Claude Code hay Cursor có thể tự query notebook của bạn khi cần - zero hallucination, có citation, không cần copy-paste.'
category: ['study', 'news']
tags: ['notebooklm', 'antigravity', 'mcp', 'ai-agent', 'developer', 'claude-code', 'cursor']
author: 'Tuan Kiet'
publishDate: 2026-06-24T08:00:00.000Z
image: '~/assets/images/ket-hop-notebooklm-voi-antigravity-suc-manh-cua-hai-ai-agent.webp'
---

> NotebookLM đọc tài liệu của bạn chính xác tuyệt đối - không bịa, có citation. Antigravity thực thi code và tác vụ. `notebooklm-mcp` là cầu nối để hai tool này làm việc cùng nhau mà không cần bạn đứng giữa copy-paste.

Vấn đề quen thuộc: bạn có một notebook NotebookLM chứa đầy tài liệu kỹ thuật, spec, docs nội bộ. Và bạn đang dùng Antigravity để build feature. Mỗi lần agent cần hỏi về context trong docs, bạn phải: mở NotebookLM, hỏi, copy kết quả, paste vào Antigravity.

`notebooklm-mcp` xóa bỏ bước đó. Agent tự hỏi notebook khi cần.

---

## MCP là gì và tại sao nó quan trọng

**MCP (Model Context Protocol)** là chuẩn kết nối để AI agent (Claude Code, Cursor, Antigravity...) gọi các tool bên ngoài. Khi bạn cài một MCP server, agent của bạn có thêm "tay" - có thể tự động gọi tool đó trong workflow.

`notebooklm-mcp` là MCP server expose NotebookLM ra dưới dạng các tool. Agent có thể gọi `ask_question`, `add_source`, `notebook_query`... như gọi bất kỳ function nào khác - tự động, không cần input từ bạn.

Có hai implementation chính đang được dùng:

- **[PleasePrompto/notebooklm-mcp](https://github.com/PleasePrompto/notebooklm-mcp)** - TypeScript/Node.js, hỗ trợ `stdio` và Streamable-HTTP. Dùng Patchright (stealth Chrome) để drive browser. Tốt cho setup đơn giản.
- **[jacob-bd/notebooklm-mcp-cli](https://github.com/jacob-bd/notebooklm-mcp-cli)** - Python, package unified gồm cả CLI (`nlm`) lẫn MCP server. **35 tools**, có `nlm setup add antigravity` để tự config. Đây là cái được maintain tích cực hơn và có nhiều tính năng hơn.

---

## Cài đặt: jacob-bd/notebooklm-mcp-cli (khuyến nghị)

### Bước 1 - Cài package

```bash
# Dùng uv (recommended)
uv tool install notebooklm-mcp-cli

# Hoặc pip
pip install notebooklm-mcp-cli
```

Sau khi cài, bạn có hai lệnh:
- `nlm` - CLI để tương tác với NotebookLM từ terminal
- `notebooklm-mcp` - MCP server để AI agent kết nối

### Bước 2 - Authenticate với NotebookLM

NotebookLM không có official API. Tool này dùng cookie auth:

```bash
nlm login
```

Lệnh này mở browser, bạn đăng nhập Google, cookies được extract tự động. Login một lần, dùng mãi (cookies tự-refresh).

Kiểm tra auth:

```bash
nlm login --check
```

### Bước 3 - Kết nối Antigravity

Lệnh một dòng - tự config không cần edit JSON:

```bash
nlm setup add antigravity
```

Tool tự detect config path của Antigravity và ghi vào đúng chỗ. Restart Antigravity là xong.

Muốn config cho các tool khác:

```bash
nlm setup add claude-code
nlm setup add cursor
nlm setup add gemini
```

### Bước 4 - Cài Skill cho Antigravity (optional nhưng nên làm)

```bash
nlm skill install antigravity
```

Skill file giúp Antigravity hiểu rõ hơn cách dùng các tools của NotebookLM - khi nào nên query, khi nào nên add source...

---

## Cài đặt: PleasePrompto/notebooklm-mcp (Node.js alternative)

Nếu bạn quen Node.js hơn Python:

```bash
npx notebooklm-mcp@latest
```

Kết nối Antigravity - thêm vào config:

```json
{
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["notebooklm-mcp@latest"]
    }
  }
}
```

Auth tương tự: chạy `setup_auth` tool lần đầu, login qua browser, cookies persist.

---

## Các tool quan trọng nhất

Sau khi kết nối, agent của bạn có các tool này:

| Tool | Dùng khi nào |
|------|-------------|
| `ask_question` / `notebook_query` | Hỏi notebook, trả về answer + citations |
| `notebook_list` | List toàn bộ notebooks |
| `source_add` | Add URL, text, Google Drive vào notebook |
| `studio_create` | Tạo audio podcast, video, slides từ notebook |
| `research_start` | Cho agent tự research web rồi import vào notebook |
| `cross_notebook_query` | Query nhiều notebook cùng lúc |
| `notebook_create` | Tạo notebook mới |

---

## 4 prompt mẫu để dùng ngay

Sau khi kết nối MCP, bạn nói chuyện với Antigravity bình thường - nó tự biết khi nào gọi tool NotebookLM.

**Prompt 1 - Hỏi về tài liệu kỹ thuật nội bộ:**

```
Tôi đang implement authentication cho dự án. 
Hãy query notebook "Backend Architecture" của tôi và 
cho biết chúng tôi đang dùng auth flow nào, có những 
endpoint nào liên quan, và bất kỳ gotcha nào được ghi chú.
Sau đó generate skeleton code dựa trên thông tin đó.
```

**Prompt 2 - Research rồi build feature:**

```
Tôi cần implement rate limiting. 
1. Add tài liệu từ URL này vào notebook "Tech Research": 
   https://redis.io/docs/manual/patterns/rate-limiting/
2. Query notebook đó để lấy best practices
3. Implement một rate limiter middleware cho Express.js 
   dựa trên những gì tìm được, không hallucinate thêm
```

**Prompt 3 - Cross-notebook context:**

```
Query cả notebook "Product Specs Q3" và notebook "API Docs v2" 
để hiểu yêu cầu cho feature export. Tổng hợp thành một 
implementation plan, sau đó bắt đầu viết code.
```

**Prompt 4 - Generate nội dung từ research:**

```
Notebook "Competitor Analysis" của tôi chứa research 
về 5 competitors. 
Tạo một audio podcast overview từ notebook đó - format "deep dive", 
sau đó liệt kê 3 insight quan trọng nhất với citations 
từ tài liệu gốc.
```

---

## Tại sao "zero hallucination" quan trọng

Điểm khác biệt lớn nhất khi dùng NotebookLM qua MCP so với hỏi AI trực tiếp:

**Không dùng MCP:** Antigravity biết rất nhiều thứ về thế giới, nhưng không biết gì về codebase nội bộ, spec riêng, hay tài liệu bạn không publish công khai. Nó có thể đoán, có thể bịa.

**Dùng MCP:** Antigravity query notebook của bạn - nơi chứa đúng những tài liệu đó. Câu trả lời có citation cụ thể về nguồn nào trong notebook. Nếu thông tin không có trong tài liệu, NotebookLM nói thẳng "thông tin này không có trong nguồn" thay vì đoán.

Với `source_format: "footnotes"` hoặc `"json"`, agent còn nhận được structured citations:

```json
{
  "answer": "Authentication flow dùng JWT với refresh token...",
  "sources": [
    {
      "index": 1,
      "title": "Backend Architecture v2.pdf",
      "excerpt": "JWT access tokens expire after 15 minutes..."
    }
  ]
}
```

---

## Một số lưu ý thực tế

**Context window:** `jacob-bd/notebooklm-mcp-cli` expose 35 tools. Nhiều tool = tốn context. Nếu bạn không cần hết, dùng selective tool exposure:

```bash
# Chỉ bật những tool cần thiết
NOTEBOOKLM_PROFILE=minimal notebooklm-mcp
```

Profile `minimal` chỉ có: `ask_question`, `get_health`, `list_notebooks`, `select_notebook`, `get_notebook`.

**Không phải official API:** Cả hai implementation đều dùng internal API của Google - undocumented, có thể thay đổi. Dùng cho personal/experimental, không production-critical.

**Rate limit:** Free tier khoảng 50 queries/day. Đủ cho development, cần nâng plan nếu dùng nhiều.

**Cookie expire:** Khoảng 2-4 tuần cần re-auth một lần. Tự động refresh nếu có saved session, hoặc `nlm login` lại.

**Multi-account:** Cần query từ nhiều Google account?

```bash
nlm login --profile work
nlm login --profile personal
nlm setup add antigravity --profile work
```

---

## Khi nào workflow này thực sự có giá trị

- **Onboarding tài liệu nội bộ:** Upload spec, architecture docs, runbooks vào notebook. Dev mới có thể dùng AI agent hỏi thẳng thay vì đọc hàng trăm trang.
- **Code review với context:** Agent có thể cross-check code với coding standards trong notebook trước khi submit PR.
- **Research-to-code pipeline:** Agent research web, import vào notebook, query lại, rồi implement - tất cả trong một session.
- **Documentation grounding:** Khi AI generate docs hoặc content, nó query notebook để đảm bảo chính xác với tài liệu thực tế.

Điểm mấu chốt: bạn bỏ công một lần xây dựng notebook tốt, sau đó agent của bạn có context đó mãi mãi - mà không cần bạn đứng giữa làm cầu nối thủ công mỗi lần.
