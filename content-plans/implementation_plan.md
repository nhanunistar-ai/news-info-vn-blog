# Tổ chức lại thư mục `src/data/post` theo Category

## Hiện trạng

| Thống kê                                        | Số liệu                           |
| ----------------------------------------------- | --------------------------------- |
| Tổng số bài viết                                | 181 file `.md`                    |
| Thư mục hiện tại                                | `src/data/post/` (1 folder phẳng) |
| Bài **đơn category**                            | 152 bài                           |
| Bài **đa category** (ví dụ `['study', 'news']`) | 29 bài                            |

### Phân bố category hiện tại

| Category                                    | Số lượng |
| ------------------------------------------- | -------- |
| `stories` (đơn)                             | 81       |
| `study` (đơn)                               | 66       |
| `news` (đơn)                                | 5        |
| `['study', 'news']`                         | 18       |
| `['discovery', 'stories']`                  | 4        |
| `['discovery', 'news']`                     | 3        |
| `['discovery', 'study']`                    | 2        |
| `['study', 'discovery']`                    | 1        |
| `['news', 'stories']`                       | 1        |
| Không có category rõ ràng (`discovery` đơn) | 0        |

## Vấn đề cần giải quyết

> [!IMPORTANT]
> **29 bài viết thuộc nhiều category cùng lúc.** Không thể đơn giản di chuyển file vào thư mục category vì 1 file không thể nằm ở 2 thư mục. Giải pháp: **dùng category đầu tiên trong danh sách làm thư mục chứa file.** Category thứ hai vẫn được giữ nguyên trong frontmatter và hoạt động bình thường trên website.

## Cấu trúc thư mục mới

```
src/data/post/
├── discovery/
│   ├── buc-tuong-bang-nam-cuc.md
│   ├── haarp-va-thoi-tiet-cuc-doan.md
│   └── ...
├── stories/
│   ├── alien-interview.md
│   ├── nikola-tesla-chuong-2.md
│   └── ... (81+ files)
├── study/
│   ├── chu-nghia-khac-ky-la-gi.md
│   ├── obsidian-la-gi.md
│   └── ... (84+ files)
└── news/
    ├── ai-ky-theo-dsm-5-tr.md
    ├── google-io-2026.md
    └── ... (8+ files)
```

## Proposed Changes

### 1. Tạo script migration tự động

#### [NEW] scripts/migrate-posts-to-categories.mjs

Script Node.js sẽ:

1. Đọc tất cả 181 file `.md` trong `src/data/post/`
2. Parse frontmatter để lấy category đầu tiên
3. Tạo thư mục con (`discovery/`, `stories/`, `study/`, `news/`)
4. Di chuyển file vào đúng thư mục
5. In báo cáo kết quả

---

### 2. Cập nhật Astro Content Config

#### [MODIFY] [content.config.ts](file:///d:/news.info.vn/news-info-vn-blog/src/content.config.ts)

Thay đổi glob pattern từ:

```diff
- loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
+ loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: 'src/data/post' }),
```

Chỉ cần thêm `**/` để Astro quét đệ quy vào các thư mục con. **Không cần sửa bất kỳ logic nào khác** vì Astro `glob` loader tự động lấy tên file (không bao gồm subfolder) làm `id`.

---

### 3. Cập nhật Dashboard

#### [MODIFY] [server.js](file:///d:/news.info.vn/news-info-vn-blog/dashboard/server.js)

Cập nhật API để:

- Đọc bài viết đệ quy từ các thư mục con thay vì chỉ thư mục gốc
- Khi lưu bài mới, tự động đặt vào thư mục đúng theo category
- Khi xóa bài, tìm file trong tất cả thư mục con

---

## Open Questions

> [!IMPORTANT]
> **Bài viết không có category**: Hiện tại chưa thấy bài nào thiếu category. Nếu sau này có bài không có category, bạn muốn đặt vào thư mục nào? Đề xuất: tạo thư mục `uncategorized/` hoặc để ở thư mục gốc `post/`.

## Verification Plan

### Automated Tests

- Chạy `npm run build` sau khi migration để đảm bảo Astro vẫn đọc được tất cả 181 bài viết
- So sánh số lượng file trước và sau migration

### Manual Verification

- Kiểm tra Dashboard (`http://127.0.0.1:3333`) vẫn hiển thị đầy đủ danh sách bài viết
- Mở một vài bài viết trên trang web để đảm bảo link và nội dung không bị ảnh hưởng
