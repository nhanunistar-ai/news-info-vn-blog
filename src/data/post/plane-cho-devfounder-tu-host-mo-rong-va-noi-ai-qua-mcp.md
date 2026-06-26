---
title: 'Plane cho dev/founder: tự host, mở rộng, và nối AI qua MCP'
excerpt: 'Bóc tách repo Plane theo hướng kỹ thuật: kiến trúc monorepo, cách self-host bằng Docker, cách mở rộng qua API/Webhooks, và cách nối AI agent bằng MCP để tự động hóa quản lý công việc.'
category: ['study', 'news']
tags: ['open-source', 'project-management', 'self-host', 'monorepo', 'docker', 'mcp', 'ai-agent']
author: 'Minh Anh'
publishDate: 2026-06-26T10:24:00.000Z
image: '~/assets/images/makeplane-plan.webp'
---

Plane là công cụ quản lý công việc kiểu “issue tracker + product planning” mã nguồn mở, hướng tới UX hiện đại nhưng vẫn hợp team có quy trình. Repo chính là `https://github.com/makeplane/plane` (AGPL-3.0), gồm cả web app và backend, có hướng self-host và **MCP server** để nối AI agent vào workspace.

Bài này dành cho dev/founder cần: (1) hiểu nhanh repo để tự triển khai hoặc đóng góp; (2) dựng workflow “AI-assisted” nhưng không biến team thành nô lệ của tool.

## Plane là gì (nhìn từ repo)

Điểm đáng chú ý nhất khi đọc README là Plane định vị rất “thực dụng”: tracking issues, chạy *cycles* (tương đương sprint), quản lý roadmap; đồng thời có các khối tính năng “gần product”: Modules, Views, Pages, Analytics. Repo công khai cũng cho thấy Plane phát triển khá nhanh, có nhiều phần infra/self-host và tài liệu dành riêng cho instance admin. Bạn có thể bắt đầu theo 2 nhánh:

- Dùng **Plane Cloud** để lên nhanh.
- **Self-host** để kiểm soát dữ liệu và hạ tầng, theo các hướng dẫn deployment trên developer docs.

## Kiến trúc repo và những thư mục nên đọc trước

Repo Plane là monorepo (thực tế bạn sẽ thấy `apps/`, `packages/`, cùng các file `pnpm-workspace.yaml`, `turbo.json`). Ngôn ngữ chính là TypeScript và Python (tỷ lệ khá lớn ở backend).

### Map nhanh “đọc repo 30 phút”

Nếu bạn là founder muốn đánh giá nhanh khả năng self-host + mở rộng, thứ tự đọc hợp lý thường là:

1. `README.md`: tổng quan, feature set, link docs, license.
2. Developer docs phần self-host: Docker Compose, Editions, Instance admin.
3. `deployments/` và các script cài đặt (`setup.sh`, hướng dẫn tải release).
4. `apps/` để nắm “biên giới hệ thống”: web UI vs API vs các service liên quan.
5. `packages/` để hiểu các module dùng chung (UI kit, utils, i18n, SDK… nếu có).

Nếu bạn là dev muốn đóng góp code, đọc thêm `CONTRIBUTING.md` và `AGENTS.md` (repo này có dấu hiệu đã chuẩn bị “agent-friendly”, ví dụ có thư mục `.claude/skills` cho workflow tạo PR/release notes).

Self-host về bản chất là một cụm service chạy bằng Docker. Chỉ riêng ba nhóm cấu hình sau đã quyết định 80% “đau khổ” của bạn: domain/URL (`WEB_URL`), CORS/ports, và storage+database (production nên cân nhắc external DB + object storage để giảm rủi ro mất dữ liệu).

## Self-host: đường nhanh và đường “chuẩn production”

Plane có hai kiểu “đường vào” đáng dùng tùy bối cảnh.

### Đường nhanh: chạy Community Edition bằng script

Theo tài liệu Docker Compose, cách phổ biến là tải `setup.sh` từ release stable rồi chạy:

```bash
mkdir plane-selfhost
cd plane-selfhost
curl -fsSL -o setup.sh https://github.com/makeplane/plane/releases/latest/download/setup.sh
chmod +x setup.sh
./setup.sh
```

Script sẽ tạo thư mục `plane-app` (hoặc `plane-app-preview`) và sinh `docker-compose.yaml` + `plane.env`. Điểm cần nhớ: chỉnh `WEB_URL`, `CORS_ALLOWED_ORIGINS`, và ports trước khi start.

### Đường “chuẩn”: Commercial Edition (có Free tier) và khả năng nâng cấp

Developer docs mô tả rõ: **Community Edition** tương đương Free tier về tính năng lõi; muốn nâng cấp paid plan khi self-host thì thường đi qua **Commercial Edition** (có Free tier và luồng upgrade). Nếu bạn định “tự host nhưng mai sau có SSO/RBAC/governance”, chọn Commercial Edition ngay từ đầu sẽ ít đổi đường hơn.

## Cách dùng đúng

Plane có thể trở thành “một Jira nữa” nếu bạn dùng sai. Với dev/founder, “dùng đúng” thường là thiết kế một workflow tối giản, có nguyên tắc.

### Một workflow mẫu cho startup

1. “Discovery”: ghi quyết định vào Pages, link sang Work Items tối thiểu (đừng tạo backlog khổng lồ).
2. “Delivery”: dùng Cycles như sprint nhẹ; chỉ kéo vào cycle thứ bạn thật sự làm.
3. “Learning”: sau release/incident, gắn lại vào work item và chốt bài học ngay trong tool.

### Nguyên tắc viết issue

- Issue phải trả lời được: “xong thì ai hưởng lợi, đo bằng gì”.
- Checklist chỉ cần đủ để người khác *tiếp tục làm* nếu bạn biến mất khỏi team.

## Work vs Code

Khi bạn dùng AI assistant (đặc biệt trong bối cảnh founder tự làm nhiều thứ), sai lầm phổ biến là lẫn lộn “viết tài liệu/ra quyết định” với “động tay sửa code”. Tách hai chế độ giúp bạn ra lệnh rõ và giảm hallucination.

| Nhu cầu | Work (thiên về quyết định) | Code (thiên về thay đổi repo) | Output mong đợi |
|---|---|---|---|
| Đánh giá Plane có hợp team không | Tóm tắt feature fit, trade-off, chi phí vận hành | Không cần | 1 trang quyết định + rủi ro |
| Lên kế hoạch self-host | Checklist infra, domain, backup, rollback | Chỉnh `docker-compose`, `plane.env`, script deploy | Runbook triển khai |
| Fix bug/đóng góp PR | Viết tái hiện lỗi, scope, acceptance criteria | Sửa code, chạy test, mở PR | PR + test evidence |
| Tự động hóa quản lý công việc | Thiết kế workflow, quyền truy cập, nguyên tắc tạo issue | Viết bot/agent dùng API/Webhook/MCP | Automation chạy được |

Điểm mấu chốt: phần “Work” phải chốt *ý định* và *tiêu chí*, rồi mới để “Code” xử lý kỹ thuật.

## Skills & MCP

Plane có tài liệu riêng về **Plane MCP Server** để kết nối AI agent với workspace thông qua Model Context Protocol (MCP). Với dev/founder, MCP hữu ích khi bạn muốn agent “làm việc trên Plane” theo quyền được cấp, thay vì chỉ chat chung chung.

### MCP của Plane dùng để làm gì

MCP trong bối cảnh Plane thường đáng tiền ở 2 use case:

- Triage: từ bug report thô thành issue có cấu trúc, nhãn, và độ ưu tiên gợi ý.
- Automation “nhẹ”: đồng bộ trạng thái theo PR/deploy, hoặc tạo work item theo template.

Plane cung cấp endpoint MCP dạng SSE `https://mcp.plane.so/sse` và hướng dẫn cấu hình qua `npx mcp-remote` (Node.js 20+ khuyến nghị). Điều này giúp bạn bật integration trong các IDE/agent host phổ biến.

### Prompt + workflow mẫu (copy/paste)

Dưới đây là các prompt mẫu bạn có thể copy/paste vào AI assistant (đổi lại tên repo, domain, tiêu chí theo team bạn).

#### Prompt 1: Đọc repo theo “đường đi nước bước”

```text
Bạn là tech lead. Hãy đọc nhanh repo https://github.com/makeplane/plane theo góc nhìn self-host + đóng góp code.
Output:
1) sơ đồ thành phần ở mức "apps/packages/deployments"
2) các điểm cần lưu ý về license (AGPL) khi fork/sửa
3) danh sách 10 file/thư mục nên đọc theo thứ tự, kèm lý do ngắn
Giới hạn: không suy đoán nếu không thấy trong repo; nếu thiếu thông tin thì đề xuất nơi cần tra trong docs.
```

#### Prompt 2: Lập runbook self-host (Docker Compose)

```text
Hãy viết runbook self-host Plane bằng Docker Compose cho môi trường staging.
Yêu cầu:
- domain: plane.stg.example.com
- port: 8080 (HTTP), chưa dùng HTTPS
- phải có mục backup/restore và rollback khi upgrade
- nêu rõ biến môi trường quan trọng (WEB_URL, CORS_ALLOWED_ORIGINS, LISTEN_HTTP_PORT...)
Output: Markdown ngắn gọn, có lệnh terminal copy/paste.
```

#### Prompt 3: Tạo issue template kiểu “sửa được ngay”

```text
Bạn là maintainer. Hãy tạo 2 mẫu issue cho repo Plane:
1) Bug report
2) Feature request
Mỗi mẫu phải có: môi trường, bước tái hiện, kỳ vọng, thực tế, log/screenshot, mức ảnh hưởng.
Output: nội dung YAML theo GitHub issue template, và giải thích 5 dòng về triết lý thiết kế template.
```

#### Prompt 4: Bật Plane MCP và thử một automation

```text
Mình muốn kết nối Plane MCP Server để AI agent có thể tạo work item khi có bug mới.
Hãy hướng dẫn cấu hình theo dạng JSON config (npx mcp-remote https://mcp.plane.so/sse).
Sau đó đề xuất 1 automation tối thiểu:
- input: đoạn text bug report
- output: tạo 1 issue trong Plane với title ngắn, steps, expected/actual, label "bug"
Nêu rõ rủi ro về quyền truy cập và cách giới hạn phạm vi.
```

## Giới hạn gói free

Nắm phần này sớm để tránh “đụng trần” lúc team đã quen dùng.

### Cloud Free (phù hợp thử nhanh)

Theo trang pricing, gói **Free** của Plane Cloud là \$0/seat/tháng và giới hạn **tối đa 12 seats**, tập trung vào core PM (Work Items, Cycles/Modules, Views, Intake, Estimates, Pages).

### Community Edition (open-source)

Community Edition là phần lõi open-source (AGPL-3.0). Developer docs mô tả CE “at par” với Free tier Cloud về mức tính năng. Điểm bạn cần cân nhắc là:

- Nếu bạn cần đường nâng cấp lên Pro/Business khi self-host, bạn sẽ phải chuyển sang Commercial Edition.
- AGPL có tác động pháp lý nếu bạn sửa đổi và cung cấp như dịch vụ: hãy đọc kỹ trước khi “fork rồi host cho khách”.

### Commercial Edition Free tier (self-host + nâng cấp)

Commercial Edition có Free tier và luồng upgrade lên paid plan, phù hợp khi bạn muốn self-host nhưng vẫn cần đường đi enterprise sau này.

## FAQ

### Plane khác gì so với Jira/Linear

Plane thường “ở giữa”: UI hiện đại kiểu Linear nhưng vẫn giữ cấu trúc đủ dùng cho quy trình (cycles/modules/views) và có đường đi enterprise. Linear hợp khi bạn ưu tiên tối giản; Jira hợp khi bạn sống nhờ hệ sinh thái plugin lớn.

### Có thể chạy Plane hoàn toàn on-prem không

Có. Plane hỗ trợ self-host qua Docker/Kubernetes; và có Air-gapped edition cho môi trường cô lập (offline).

### Tối thiểu cần hạ tầng gì để thử self-host

Hướng dẫn Docker Compose nêu mức tối thiểu 2 vCPU và 4GB RAM (khuyến nghị 8GB). Với staging, bắt đầu nhỏ rồi đo resource trước khi scale.

### MCP có giúp “tự động hóa PM” thật không, hay chỉ là demo

Nếu bạn dùng MCP cho vài việc lặp lại (triage bug, tạo issue theo template, sync trạng thái theo PR/deploy), nó rất thực tế. Tránh giao “toàn quyền backlog” cho agent khi chưa có rule về quyền, nhãn và tiêu chí đóng/mở.

### Khi nào nên đóng góp code thay vì chỉ self-host

Khi bạn đã self-host ổn và có pain point lặp lại có thể tổng quát hóa (fix bug, cải thiện docs, tối ưu deploy), PR nhỏ nhưng sẽ “rẻ” hơn một fork khó bảo trì.

---

Link nhanh để bắt đầu:

- Repo: https://github.com/makeplane/plane
- Docker Compose guide: https://developers.plane.so/self-hosting/methods/docker-compose
- Plane MCP Server: https://developers.plane.so/dev-tools/mcp-server
- Pricing (Free/Pro/Business): https://plane.so/pricing
