---
title: 'Google Antigravity là gì?'
excerpt: 'Google Antigravity 2.0 là gì, cách dùng hiệu quả, bản cập nhật mới nhất có gì và so sánh với Cursor, Windsurf, GitHub Copilot.'
category: 'study'
tags: ['google-antigravity', 'antigravity', 'ai-coding', 'ai-agent', 'gemini']
author: 'Tuan Kiet'
publishDate: 2026-06-08T17:00:00.000Z
image: '~/assets/images/google-antigravity-la-gi.webp'
---

> Nếu Cursor, Windsurf hay Copilot giúp lập trình viên viết code nhanh hơn ngay trong editor, thì Google Antigravity đang đi theo hướng khác: biến AI agent thành một “đội thực thi” có thể đọc repo, sửa file, chạy lệnh, dùng trình duyệt, tạo artifact và làm việc song song trong nhiều project.

Google Antigravity không nên được hiểu đơn giản là một IDE AI mới. Cách đúng hơn là xem nó như một **nền tảng làm việc với agent**. Bạn vẫn có thể dùng nó cho coding, nhưng trọng tâm không còn là “AI gợi ý dòng code tiếp theo”, mà là “tôi giao một mục tiêu, agent tự lập kế hoạch, tự thao tác, rồi trả lại bằng chứng để tôi kiểm tra”.

Tính đến **ngày 9 tháng 6 năm 2026**, bản đáng chú ý nhất là **Google Antigravity 2.0**, được Google công bố trong đợt Google I/O 2026. Bản này đưa Antigravity từ một công cụ thiên về IDE/Agent Manager thành một hệ sinh thái gồm desktop app độc lập, CLI, SDK, API agent và tích hợp với Google Cloud/Gemini Enterprise Agent Platform.

### Google Antigravity là gì?

Google Antigravity là nền tảng phát triển phần mềm theo hướng **agent-first**. Thay vì đặt AI vào một sidebar nhỏ trong editor, Antigravity đặt agent ở trung tâm workflow. Agent có thể làm những việc mà trước đây lập trình viên phải tự nhảy qua nhiều cửa sổ:

- Đọc và chỉnh sửa nhiều file trong codebase.
- Chạy terminal command.
- Dùng browser để kiểm tra ứng dụng hoặc tra cứu thông tin.
- Tạo kế hoạch triển khai.
- Sinh artifact như checklist, ảnh chụp màn hình, walkthrough hoặc báo cáo kết quả.
- Làm việc song song thông qua subagents.
- Hoạt động theo project với phạm vi thư mục, quyền và policy riêng.

Điểm quan trọng nằm ở chữ **orchestrate**. Antigravity không chỉ giúp bạn code nhanh hơn, mà giúp bạn điều phối nhiều agent làm việc trên nhiều phần khác nhau của một nhiệm vụ.

Ví dụ, thay vì nhờ AI “viết component login”, bạn có thể giao việc:

```text
Audit toàn bộ luồng đăng nhập.
Tìm lỗi UX, kiểm tra validation, chạy test liên quan,
sửa các lỗi nhỏ, rồi tạo artifact gồm checklist thay đổi và ảnh màn hình trước/sau.
```

Với prompt kiểu này, Antigravity phù hợp hơn một autocomplete truyền thống, vì nhiệm vụ đòi hỏi đọc repo, chạy app, kiểm tra giao diện, sửa code và báo cáo lại.

### Bản cập nhật mới nhất có gì?

Bản cập nhật lớn nhất hiện tại là **Antigravity 2.0**, được Google mô tả như một desktop app độc lập để quản lý agent. Trước đó, Antigravity có Agent Manager gắn chặt hơn với IDE. Với 2.0, Google tách trải nghiệm agent ra thành một bề mặt riêng, có thể hoạt động độc lập và phù hợp hơn cho các tác vụ dài, song song hoặc đa dự án.

Những điểm mới đáng chú ý:

**Antigravity 2.0 desktop app**

Đây là trung tâm điều phối agent. Bạn tạo project, thêm một hoặc nhiều folder/repo, rồi khởi chạy agent theo task. Điểm mạnh là project có thể span nhiều thư mục, giúp agent có context rộng hơn khi xử lý hệ thống nhiều repo.

**Subagents và làm việc song song**

Antigravity 2.0 có Dynamic Subagents, cho phép chia một nhiệm vụ phức tạp thành các phần nhỏ để nhiều agent xử lý song song. Đây là hướng rất đáng chú ý nếu bạn làm các task kiểu audit, migration, refactor hoặc research có nhiều nhánh.

**Scheduled Tasks**

Bạn có thể định nghĩa lịch chạy cho agent. Ví dụ: mỗi sáng kiểm tra lỗi lint, mỗi tuần audit dependency, hoặc chạy một checklist bảo trì định kỳ. Đây là phần khiến Antigravity gần với “automation platform” hơn là chỉ một IDE.

**Antigravity CLI**

Google bổ sung CLI dạng terminal-first. CLI dùng cùng agent harness với Antigravity 2.0 nhưng nhẹ hơn, hợp với người làm việc qua terminal, SSH hoặc muốn workflow ít giao diện. CLI hỗ trợ multi-step reasoning, multi-file editing, tool calling, conversation history, slash commands, permissions và khả năng resume session.

**Antigravity SDK**

SDK cho phép lập trình viên xây custom agent bằng Python, dùng cùng agent loop, tool system và context management của Antigravity. Đây là phần quan trọng nếu bạn muốn đưa agent vào workflow riêng của công ty, thay vì chỉ dùng app có sẵn.

**AI Studio Build sang Antigravity**

Google công bố luồng export từ AI Studio Build sang Antigravity, không chỉ mang code mà còn mang context cuộc trò chuyện. Điều này hữu ích khi bạn prototype nhanh trong AI Studio rồi muốn tiếp tục phát triển local.

**Kế hoạch sử dụng và quota**

Theo tài liệu hiện tại, Antigravity có baseline quota, tab completion không giới hạn và quyền truy cập các tính năng như Scheduled Tasks và CLI. Người dùng Google AI Pro/Ultra có quota cao hơn; AI Ultra có mức ưu tiên và dung lượng cao nhất, đồng thời Google I/O 2026 công bố gói AI Ultra 100 USD/tháng với dung lượng Antigravity lớn hơn AI Pro.

### Cách dùng Antigravity hiệu quả

Muốn dùng Antigravity tốt, đừng dùng nó như chatbot hỏi đáp. Hãy dùng nó như một junior engineer có quyền thao tác trong repo, nhưng cần scope rõ, tiêu chí rõ và checkpoint rõ.

**1. Bắt đầu bằng goal, không bắt đầu bằng lệnh nhỏ**

Prompt yếu:

```text
Sửa bug login.
```

Prompt tốt hơn:

```text
Tìm nguyên nhân người dùng đăng nhập bằng Google bị redirect sai sau khi auth thành công.
Scope: chỉ kiểm tra route auth, callback, session middleware và trang dashboard.
Hãy tái hiện lỗi nếu có thể, đề xuất plan ngắn, sau đó sửa code.
Sau khi sửa, chạy test liên quan và tạo artifact tóm tắt file đã đổi.
```

Antigravity mạnh khi nhiệm vụ có mục tiêu rõ và có nhiều bước. Nếu prompt quá mơ hồ, agent sẽ tự lấp khoảng trống, và đó là lúc rủi ro tăng lên.

**2. Dùng project để khóa phạm vi làm việc**

Agent càng có nhiều quyền, càng cần biên giới. Khi tạo project, chỉ thêm những folder/repo thật sự cần thiết. Với task nhỏ, đừng cho agent thấy toàn bộ monorepo nếu chỉ cần sửa một package.

Một cách làm thực tế:

- Project riêng cho frontend.
- Project riêng cho backend.
- Project riêng cho docs.
- Project cross-repo chỉ dùng khi task thật sự cần nhiều repo.

Scope tốt giúp agent ít đọc nhầm, ít sửa lan và tiết kiệm quota.

**3. Chạy trong worktree khi task có rủi ro**

Antigravity hỗ trợ Local Mode và New Worktree Mode. Với task nhỏ, Local Mode tiện hơn. Với refactor, migration, chỉnh nhiều file hoặc thử nghiệm chưa chắc đúng, nên dùng New Worktree Mode để tách nhánh làm việc.

Nguyên tắc đơn giản:

- Bug nhỏ, chỉnh 1-2 file: có thể dùng Local Mode.
- Refactor nhiều nơi: dùng worktree.
- Migration framework/library: dùng worktree.
- Task chưa chắc đúng hướng: dùng worktree.

Đừng để agent sửa thẳng vào branch chính nếu bạn chưa có thói quen review diff kỹ.

**4. Yêu cầu artifact thay vì tin vào log**

Một điểm hay của Antigravity là artifact. Thay vì bắt bạn đọc toàn bộ tool log, agent có thể tạo kế hoạch, checklist, ảnh chụp màn hình, walkthrough hoặc báo cáo thay đổi.

Hãy yêu cầu artifact ngay trong prompt:

```text
Sau khi hoàn thành, tạo artifact gồm:
- Tóm tắt nguyên nhân.
- Danh sách file đã sửa.
- Cách test đã chạy.
- Ảnh màn hình trước/sau nếu có UI.
- Những rủi ro còn lại.
```

Artifact giúp bạn review nhanh hơn, nhưng không thay thế review diff. Nó là lớp giải thích, không phải bằng chứng tuyệt đối.

**5. Luôn buộc agent chạy kiểm chứng**

Một task coding không nên kết thúc bằng “đã sửa”. Nó nên kết thúc bằng test, lint, build hoặc ít nhất là hướng dẫn kiểm chứng rõ ràng.

Prompt nên có dòng:

```text
Nếu có test/lint/build phù hợp, hãy chạy.
Nếu không chạy được, nói rõ lý do và chỉ ra lệnh tôi cần chạy thủ công.
```

Điểm này rất quan trọng vì agentic coding dễ tạo cảm giác “xong rồi”, trong khi thực tế code có thể chưa build được.

**6. Dùng CLI cho việc nhanh, dùng desktop app cho việc dài**

Antigravity CLI phù hợp khi bạn đang ở terminal và muốn giao việc nhanh:

- Sửa lỗi nhỏ.
- Tạo test.
- Refactor một module.
- Giải thích một stack trace.
- Làm việc qua SSH.

Desktop app phù hợp hơn khi:

- Có nhiều project.
- Cần theo dõi nhiều agent song song.
- Cần artifact trực quan.
- Cần quản lý task dài.
- Cần phối hợp browser, editor và terminal.

Đừng ép một bề mặt làm tất cả. CLI là dao gấp nhanh; Antigravity 2.0 là bàn điều phối.

### So sánh với Cursor, Windsurf và GitHub Copilot

Không có công cụ nào thắng tuyệt đối. Điểm khác nhau nằm ở workflow bạn muốn.

| Công cụ | Mạnh nhất ở đâu | Hợp với ai | Điểm cần lưu ý |
|---|---|---|---|
| **Google Antigravity 2.0** | Điều phối agent, subagents, scheduled tasks, artifact, project đa folder/repo, CLI/SDK cùng hệ sinh thái | Người muốn giao task dài, audit, refactor, automation, làm nhiều repo hoặc muốn xây custom agent | Cần quản lý quyền kỹ, review diff kỹ, quota phụ thuộc plan |
| **Cursor** | AI editor rất mượt, agent trong editor, codebase context, sửa code nhanh trong workflow gần VS Code | Developer muốn thay IDE hằng ngày bằng editor AI nhanh và quen tay | Mạnh ở trải nghiệm editor; orchestration đa agent không phải trọng tâm chính như Antigravity |
| **Windsurf/Cascade** | Cascade agent, code/chat mode, memories/rules, tool calling, web search, terminal, workflow trong IDE | Người muốn IDE agentic có trải nghiệm mềm, nhiều tính năng hỗ trợ coding hằng ngày | Tùy plan/tính năng, cần kiểm tra giới hạn team/enterprise |
| **GitHub Copilot Coding Agent** | Làm việc gắn với GitHub issue/PR, chạy trong môi trường ephemeral qua GitHub Actions, hợp repo đã ở GitHub | Team dùng GitHub sâu, muốn giao issue cho agent tạo PR | Ít giống một IDE agent-first; mạnh ở workflow GitHub-native hơn là điều phối local nhiều agent |

Nếu bạn đang code trực tiếp từng ngày và cần autocomplete, inline edit, sửa nhanh từng file, **Cursor hoặc Windsurf** có thể dễ vào việc hơn.

Nếu bạn muốn agent làm một task từ đầu đến cuối, tạo artifact, chạy trình duyệt, dùng CLI, có scheduled task và có thể mở rộng bằng SDK, **Antigravity** đáng thử hơn.

Nếu team của bạn đã quản lý việc bằng issue, pull request, GitHub Actions và muốn giao việc từ GitHub, **GitHub Copilot Coding Agent** tự nhiên hơn.

### Khi nào nên dùng Antigravity?

Antigravity đáng dùng khi nhiệm vụ có một trong các dấu hiệu sau:

- Cần đọc nhiều file trước khi sửa.
- Cần chạy app, test hoặc dùng browser để kiểm chứng.
- Cần chia task thành nhiều nhánh song song.
- Cần tạo báo cáo hoặc artifact để review.
- Cần chạy lại định kỳ.
- Cần workflow agent qua CLI hoặc SDK.
- Cần làm việc trên nhiều folder/repo trong cùng một project.

Ví dụ task hợp:

```text
Audit toàn bộ flow checkout.
Tìm điểm gây drop-off, kiểm tra validation, route, state management và API error handling.
Đề xuất plan, sửa các lỗi nhỏ an toàn, chạy test liên quan,
rồi tạo artifact gồm checklist, diff summary và rủi ro còn lại.
```

Ví dụ task không nên dùng Antigravity:

- Viết một function nhỏ đã biết rõ logic.
- Đổi tên biến đơn giản.
- Hỏi nhanh cú pháp.
- Sửa một dòng CSS.
- Tạo snippet ngắn.

Những việc đó dùng autocomplete, chat trong editor hoặc Copilot có thể nhanh hơn.

### Rủi ro cần nhớ

Antigravity mạnh vì agent có thể thao tác nhiều thứ. Nhưng chính điểm đó cũng tạo rủi ro. Một agent có quyền đọc/ghi file, chạy lệnh và dùng browser phải được đối xử như một cộng sự junior có tốc độ rất cao nhưng chưa có trách nhiệm pháp lý.

Các nguyên tắc an toàn nên giữ:

- Luôn dùng git sạch trước khi giao task lớn.
- Ưu tiên worktree/branch riêng.
- Không cấp quyền rộng cho thư mục không liên quan.
- Không để agent đụng secrets, file credentials hoặc production config nếu không cần.
- Luôn đọc diff trước khi commit.
- Luôn chạy test/build sau khi agent sửa.
- Với lệnh nguy hiểm, bắt agent hỏi trước.

Antigravity không loại bỏ vai trò của developer. Nó chuyển vai trò của bạn từ người gõ mọi dòng code sang người đặt mục tiêu, giới hạn phạm vi, kiểm tra bằng chứng và quyết định merge hay không.

### Kết luận

Google Antigravity là một bước rõ ràng trong hướng **agentic software development**: không chỉ hỗ trợ viết code, mà điều phối nhiều agent hoàn thành công việc. Bản 2.0 làm hướng này rõ hơn bằng desktop app độc lập, CLI, SDK, scheduled tasks, subagents, artifact và tích hợp sâu hơn với hệ sinh thái Google/Gemini.

Nếu bạn đang tìm một editor AI để thay VS Code và code nhanh từng ngày, Cursor hoặc Windsurf vẫn là lựa chọn rất mạnh. Nếu bạn muốn giao task theo mục tiêu, theo dõi agent làm việc, kiểm chứng bằng artifact và mở rộng workflow bằng CLI/SDK, Antigravity là công cụ đáng thử nghiêm túc.

Cách dùng hiệu quả nhất không phải là “hãy code giúp tôi”, mà là:

```text
Đây là mục tiêu.
Đây là phạm vi.
Đây là tiêu chí hoàn thành.
Đây là cách kiểm chứng.
Đây là artifact tôi cần để review.
```

Khi bạn viết prompt theo cách đó, Antigravity mới thật sự phát huy điểm mạnh: biến AI từ một ô chat thành một hệ thống agent có thể làm việc, báo cáo và chịu sự kiểm soát của bạn.

### Nguồn tham khảo

- Google Developers Blog: [Build with Google Antigravity, our new agentic development platform](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/)
- Google Antigravity Docs: [Overview](https://www.antigravity.google/docs/overview)
- Google Antigravity Blog: [Google Antigravity @ I/O 2026](https://www.antigravity.google/blog/google-io-2026)
- Google Antigravity Docs: [Getting Started](https://www.antigravity.google/docs)
- Google Antigravity Docs: [Plans](https://antigravity.google/docs/plans)
- Google Antigravity Docs: [CLI Overview](https://www.antigravity.google/docs/cli-overview)
- Google Antigravity Product: [Antigravity SDK](https://antigravity.google/product/antigravity-sdk)
- Cursor Docs: [Agent Overview](https://docs.cursor.com/en/agent/overview)
- Windsurf Docs: [Cascade Overview](https://docs.windsurf.com/windsurf/cascade)
- GitHub Docs: [About GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent)
