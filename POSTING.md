# Quy Trinh Dang Bai Nhanh

## 1) Tao bai moi

1. Vao `src/content/blog/`.
2. Copy file `_post-template.md`.
3. Doi ten file theo slug, vi du: `ai-agent-automation.md`.

Luu y:
- Ten file se la URL bai viet: `/blog/ai-agent-automation/`.
- Sua `title`, `description`, `pubDate` truoc khi push.

## 1.1) Draft / Published

- Them `draft: true` vao frontmatter de an bai khoi trang danh sach, RSS va route public.
- Khi san sang dang, doi `draft: false` hoac xoa dong `draft`.
- Bai draft van co the nam trong `src/content/blog/`, nhung khong len site khi `draft: true`.

## 2) Them anh

1. Bo anh vao `src/assets/`.
2. Cap nhat `heroImage` trong frontmatter:

```md
heroImage: '../../assets/ten-anh.jpg'
```

## 3) Kiem tra local (khuyen dung)

```bash
npm run dev
```

Mo `http://localhost:4321` de xem bai.

## 4) Publish len site

```bash
git add .
git commit -m "add post: ten bai viet"
git push origin main
```

Cloudflare Pages se tu dong build va deploy.

## 5) Dang bai tu may khac

Co 2 cach:
- Sua truc tiep tren GitHub web trong thu muc `src/content/blog/`, commit len `main`.
- Hoac clone repo, sua file, roi `git push origin main`.
