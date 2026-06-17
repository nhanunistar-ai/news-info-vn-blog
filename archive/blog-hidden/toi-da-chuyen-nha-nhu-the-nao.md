---
title: 'Tôi đã chuyển nhà từ WordPress sang đây như thế nào?'
description: 'Case study chuyển toàn bộ blog từ WordPress sang Astro + Cloudflare Pages, giảm chi phí, tăng tốc độ và kiểm soát nội dung chặt hơn.'
pubDate: 'May 20 2026'
draft: true
heroImage: '../../assets/blog-placeholder-3.jpg'
---

Tôi từng có một website WordPress vận hành theo kiểu "đăng đều là được". Ban đầu mọi thứ ổn, nhưng càng về sau hệ thống càng nặng: plugin chồng plugin, tốc độ giảm, bảo trì mệt, và nội dung không còn tạo ra khác biệt.

Đến lúc cần làm lại từ đầu, tôi không muốn sửa chữa một kiến trúc cũ nữa. Tôi chọn chuyển hẳn sang mô hình blog tĩnh với **Astro + Cloudflare Pages**, tập trung vào thứ quan trọng nhất: nội dung có giá trị và quy trình xuất bản có kiểm soát.

## Vì sao tôi rời WordPress?

Lý do không phải vì WordPress tệ. Vấn đề là WordPress không còn phù hợp với mục tiêu mới của tôi:

- Tôi cần chi phí vận hành gần như bằng 0.
- Tôi muốn hạ tầng ít điểm lỗi nhất có thể.
- Tôi muốn toàn quyền kiểm soát nội dung bằng Git, thay vì bấm sửa trực tiếp trên admin panel.

Nếu mục tiêu là "đội biên tập lớn, nhiều tính năng động", WordPress vẫn rất mạnh. Nhưng nếu mục tiêu là "nhanh, gọn, bền, dễ mở rộng bằng AI workflow", stack tĩnh hiệu quả hơn.

## Kiến trúc mới tôi chọn

Tôi chuẩn hóa lại theo 4 thành phần:

- **Astro** để build site tĩnh.
- **GitHub** để quản lý phiên bản nội dung và code.
- **Cloudflare Pages** để deploy tự động mỗi lần push.
- **Cloudflare DNS + Email Routing** để giữ domain sống ổn định và xử lý email tên miền.

Kết quả là mọi thứ chạy như một pipeline rõ ràng: viết bài bằng Markdown, commit, push, tự build, tự lên production.

## Các bước chuyển nhà thực tế

Tôi đi theo trình tự an toàn để không downtime:

1. Dựng project Astro blog mới hoàn toàn.
2. Push source lên GitHub repo riêng.
3. Deploy lên `*.pages.dev` để test độc lập.
4. Trỏ domain thật sang Cloudflare Pages sau khi test ổn.
5. Giữ server cũ thêm 24-48h rồi mới tắt.

Điểm quan trọng nhất: **không xóa hạ tầng cũ trước khi domain mới chạy ổn**.

## Tôi đã được gì sau khi chuyển?

Sau khi chuyển xong, có 3 thay đổi rõ nhất:

- Tốc độ tải trang cải thiện mạnh nhờ static + CDN edge.
- Rủi ro bảo mật thấp hơn do không còn bề mặt tấn công kiểu plugin/database như trước.
- Quy trình xuất bản chuyên nghiệp hơn: mọi thay đổi đều có lịch sử commit, review, rollback rõ ràng.

Tôi cũng thấy đầu óc nhẹ đi đáng kể. Không còn kiểu "đăng nhập admin sửa nóng rồi quên đã sửa gì".

## Bài học lớn nhất

Chuyển từ WordPress sang Astro không chỉ là thay công nghệ. Nó là thay cách làm nội dung:

- Bớt phụ thuộc vào công cụ.
- Tăng kỷ luật biên tập.
- Ưu tiên nội dung nguyên bản thay vì nội dung cho đủ số lượng.

Nếu bạn đang có một domain cũ và muốn hồi sinh nó theo hướng tinh gọn, đây là combo tôi recommend: **Astro + Cloudflare Pages + quy trình viết chuẩn Markdown**.

Mọi thứ bắt đầu rất nhỏ, nhưng vận hành đúng ngay từ đầu sẽ giúp bạn đi đường dài mà không phải đập đi làm lại lần nữa.
