# Hướng dẫn sử dụng Dashboard — news.info.vn

## 1. Yêu cầu

- **Node.js** >= 18 (kiểm tra: `node -v`)
- Đã cài dependencies một lần (chỉ làm lần đầu)

---

## 2. Cài dependencies (lần đầu tiên)

Mở terminal, điều hướng vào thư mục `dashboard/`:

```bash
cd D:\news.info.vn\news-info-vn-blog\dashboard
npm install
```

Chỉ cần làm **một lần duy nhất**.

---

## 3. Khởi động dashboard

Mỗi lần muốn dùng, mở terminal và chạy:

```bash
cd D:\news.info.vn\news-info-vn-blog\dashboard
node server.js
```

Khi thấy dòng:
```
✅ Dashboard running at http://localhost:3333
```

Mở trình duyệt và truy cập: **http://localhost:3333**

> **Lưu ý:** Giữ terminal mở trong suốt thời gian sử dụng. Đóng terminal = tắt server.

---

## 4. Tắt dashboard

Quay lại terminal đang chạy server → nhấn `Ctrl + C`.

---

## 5. Giao diện dashboard

```
┌─────────────────┬────────────────────────────┬──────────────────┐
│   SIDEBAR       │      META PANEL             │   RIGHT PANEL    │
│                 │  (title, slug, excerpt...)  │  (Image Prompt)  │
│  Danh sách      ├────────────────────────────┤  (Frontmatter)   │
│  bài viết       │                            │                  │
│                 │    MARKDOWN EDITOR          │                  │
│  [+ Bài mới]    │                            │                  │
│                 │                            │                  │
└─────────────────┴────────────────────────────┴──────────────────┘
```

---

## 6. Viết bài mới

1. Click **`+ Bài mới`** ở góc trên sidebar
2. Điền **Title** → Slug tự động tạo từ title (có thể sửa tay)
3. Điền **Excerpt** — mô tả ngắn ~160 ký tự, dùng cho SEO và preview
4. Chọn **Category** — Ctrl+Click để chọn nhiều (study, news, discovery, stories)
5. Điền **Tags** — cách nhau bằng dấu phẩy: `ai-coding, cursor, ide`
6. Điền **Author** — mặc định là `Tuan Kiet`
7. Chọn **Publish Date** — mặc định là thời điểm hiện tại
8. Điền **Image path** — đường dẫn ảnh hero, ví dụ: `~/assets/images/ten-bai.webp`
9. Viết nội dung trong **Markdown Editor** ở giữa
10. Nhấn **💾 Lưu bài** hoặc **Ctrl+S**

File `.md` sẽ được lưu trực tiếp vào `src/data/post/`.

---

## 7. Chỉnh sửa bài cũ

1. Tìm bài trong **sidebar trái** — dùng ô tìm kiếm nếu cần
2. Click tên bài → toàn bộ nội dung và meta load vào editor
3. Chỉnh sửa như bình thường
4. Nhấn **💾 Lưu bài** hoặc **Ctrl+S** để ghi đè

---

## 8. Xóa bài

1. Mở bài cần xóa từ sidebar
2. Click **🗑 Xóa**
3. Xác nhận trong hộp thoại

> **Cảnh báo:** Xóa là vĩnh viễn, không có undo.

---

## 9. Tạo Image Prompt (cho Midjourney / DALL-E 3)

Dashboard tự động tạo prompt theo phong cách **black & white + selective color cam #F15A28** đã chốt.

### Cách dùng:

**Option A — Tự động:**
1. Điền Title và Excerpt trước
2. Click **⚡ Generate** → prompt tự sinh từ title + excerpt

**Option B — Tùy chỉnh:**
1. Điền **Subject line** vào ô bên dưới nút Generate
   - Ví dụ: `A photorealistic close-up of a developer's hands typing on a keyboard in a dark room`
2. Click **⚡ Generate**

3. Click **📋 Copy Prompt** → dán vào Midjourney hoặc DALL-E 3

### Template prompt cố định (không thay đổi):
```
Shot on a Phase One XF IQ4 medium format camera, 85mm f/1.4 lens, dramatic 
high-contrast black and white photography, selective color treatment: entire 
image desaturated to monochrome except for specific accent details rendered 
in vibrant orange (#F15A28), ultra-sharp, cinematic lighting, deep shadows, 
fine grain texture, 16:9 aspect ratio, 4K resolution, editorial news 
photography style.
```

**Với Midjourney:** Thêm `--ar 16:9 --style raw --v 7` vào cuối prompt.

---

## 10. Frontmatter Preview

Khu vực **Frontmatter Preview** ở right panel luôn cập nhật realtime khi bạn thay đổi bất kỳ field nào.

Click **📋 Copy** để copy toàn bộ YAML frontmatter.

---

## 11. Toolbar Markdown

| Nút | Chèn |
|-----|------|
| H3 | `### ` |
| B | `**bold**` |
| Quote | `> quote` |
| Code | ` ```code``` ` |
| List | `- item` |

---

## 12. Workflow hoàn chỉnh khuyến nghị

```
1. Viết nội dung trong editor
2. Điền title + excerpt
3. Click ⚡ Generate → copy prompt
4. Dán prompt vào Midjourney/DALL-E → tạo ảnh hero
5. Lưu ảnh vào src/assets/images/ten-bai.webp
6. Điền image path vào field Image
7. Ctrl+S → lưu bài
8. Kiểm tra http://localhost:4321 (Astro dev server)
9. Commit và push lên GitHub → Cloudflare tự deploy
```

---

## 13. Lỗi thường gặp

| Lỗi | Giải pháp |
|-----|-----------|
| `Cannot find module 'express'` | Chưa `npm install`. Chạy lại trong thư mục `dashboard/` |
| `EADDRINUSE: address already in use :::3333` | Port 3333 đang dùng. Mở Task Manager → tìm và kill process `node` |
| Bài không hiện trên web | Kiểm tra frontmatter đúng format chưa, đặc biệt `publishDate` |
| Ảnh không hiện | Đường dẫn phải là `~/assets/images/ten-file.webp` (không phải `/public/...`) |

---

## 14. Cấu trúc files

```
dashboard/
├── server.js          ← Node.js server (Express)
├── package.json       ← Dependencies
├── huongdansudung.md  ← File này
└── public/
    ├── index.html     ← Giao diện UI
    ├── style.css      ← Styles (dark theme)
    └── app.js         ← Logic frontend
```

Server ghi file trực tiếp vào:
```
src/data/post/*.md
```
