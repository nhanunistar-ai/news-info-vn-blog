# Ghi chú dự án — news.info.vn

## Sync local với remote (khi mới clone hoặc lấy bản mới nhất)

```bash
cd D:\news.info.vn\news-info-vn-blog
git pull origin main
```

---

## Quy trình làm việc đầy đủ: Check → Build → Commit → Push

### Bước 1 — Kiểm tra trạng thái (xem file nào đã thay đổi)

```bash
git status
```

Hoặc xem tóm tắt ngắn:

```bash
git status --short
```

---

### Bước 2 — Chạy check (lint + type check)

```bash
npm run check
```

Nếu có lỗi, chạy auto-fix:

```bash
npm run fix
```

---

### Bước 3 — Build để kiểm tra (bắt lỗi build trước khi push)

```bash
npm run build
```

Build thành công sẽ hiện:
```
[build] XXX page(s) built in Xs
[build] Complete!
```

---

### Bước 4 — Stage file thay đổi

Stage tất cả file:
```bash
git add -A
```

Hoặc stage file cụ thể:
```bash
git add src/pages/contact.astro
git add src/components/widgets/Footer.astro
```

---

### Bước 5 — Tạo commit

```bash
git commit -m "mô tả ngắn về thay đổi"
```

Ví dụ commit message tốt:
```bash
git commit -m "feat: add contact page"
git commit -m "fix: footer logo dark mode"
git commit -m "content: add leonardo da vinci series"
```

---

### Bước 6 — Push lên origin main

```bash
git push origin main
```

Cloudflare Pages sẽ **tự động deploy** sau khi push thành công.

---

## Quy trình nhanh (gộp bước 4-5-6)

```bash
git add -A
git commit -m "mô tả thay đổi"
git push origin main
```

---

## Các lệnh hay dùng khác

### Xem lịch sử commit gần nhất
```bash
git log --oneline -10
```

### Xem diff trước khi commit
```bash
git diff
```

### Lấy bản mới nhất từ remote (không có thay đổi local)
```bash
git pull origin main
```

### Lấy bản mới nhất khi có thay đổi local chưa commit
```bash
git stash
git pull origin main
git stash pop
```

### Chạy dev server để xem trước
```bash
npm run dev
# → Mở http://localhost:4321
```

### Preview bản build
```bash
npm run preview
# → Mở http://localhost:4321
```

---

## Thông tin dự án

| Mục | Giá trị |
|-----|---------|
| Repo | https://github.com/nhanunistar-ai/news-info-vn-blog.git |
| Branch chính | `main` |
| Deploy | Cloudflare Pages (tự động khi push main) |
| Node.js yêu cầu | >= 22.12.0 |
| Posts directory | `src/data/post/` |
| Assets | `src/assets/images/` |
| Dashboard | `dashboard/` (chạy `node server.js`, port 3333) |

---

## Xử lý lỗi thường gặp

| Lỗi | Giải pháp |
|-----|-----------|
| `npm run build` lỗi | Đọc error message, thường do frontmatter sai hoặc import thiếu |
| `git push` bị từ chối | Chạy `git pull origin main` trước rồi push lại |
| Ảnh không hiển thị sau deploy | Kiểm tra file đã được `git add` và commit chưa |
| `merge conflict` | Xem file conflict, sửa tay, rồi `git add` + `git commit` |
