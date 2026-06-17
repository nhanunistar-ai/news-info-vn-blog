# Series Thomas Edison - kế hoạch chương và hero prompts

## Định hướng chung

Series dự kiến gồm **18 chương**, viết như tư liệu lịch sử kể chuyện: thân thiện, dễ đọc, nhưng không thần tượng hóa Edison một chiều. Mỗi bài phải dựa trên mốc lịch sử có kiểm chứng, tránh các giai thoại chưa chắc chắn nếu không ghi rõ là giai thoại.

Series nên đặt trong mục **Stories**, vì đây là dạng tiểu sử dài theo chương, tương tự các series Nikola Tesla và Albert Einstein.

## Quy ước slug bắt buộc

Tất cả bài trong series phải dùng file/slug bắt đầu bằng `edison-` để dễ quản lý trong thư mục `src/content/blog` và trên URL `/news/...`.

- Chương 1: `edison-thomas-edison-la-ai`
- Chương 2: `edison-tuoi-tho-o-milan-va-port-huron`
- Chương 3: `edison-cau-be-ban-bao-tren-tau`
- Chương 4: `edison-diec-co-doc-va-kha-nang-tap-trung`
- Chương 5: `edison-nhung-nam-dien-bao`
- Chương 6: `edison-bang-sang-che-dau-tien-va-bai-hoc-thi-truong`
- Chương 7: `edison-newark-va-con-duong-thanh-nha-phat-minh-chuyen-nghiep`
- Chương 8: `edison-menlo-park-va-nha-may-phat-minh`
- Chương 9: `edison-phonograph-chiec-may-khien-the-gioi-nghe-thay-chinh-minh`
- Chương 10: `edison-anh-sang-dien-khong-chi-la-bong-den`
- Chương 11: `edison-pearl-street-va-thanh-pho-bat-dau-sang-len`
- Chương 12: `edison-chien-tranh-dong-dien`
- Chương 13: `edison-gia-dinh-hon-nhan-va-cai-gia-cua-tham-vong`
- Chương 14: `edison-west-orange-phong-thi-nghiem-khong-lo`
- Chương 15: `edison-dien-anh-kinetograph-kinetoscope-va-black-maria`
- Chương 16: `edison-nhung-that-bai-lon-quang-sat-xi-mang-va-pin`
- Chương 17: `edison-ban-be-chien-tranh-va-nhung-nam-cuoi`
- Chương 18: `edison-cai-chet-di-san-va-su-that-phia-sau-huyen-thoai`

## Quy ước hero, cover và ngày đăng

- Ảnh bìa series Stories Edison: `src/assets/edison-cover.png`.
- Hero của từng chương phải dùng đúng asset trùng slug: `src/assets/{slug}.png`.
- Ví dụ chương 1 dùng `src/assets/edison-thomas-edison-la-ai.png`.
- Chương 18 là bài cuối cùng và phải có `pubDate: 'Jun 08 2026'`.
- Nếu đăng mỗi ngày một chương và giữ chương 18 là `Jun 08 2026`, lịch ngược lại sẽ là chương 1 bắt đầu từ `May 22 2026`.
- Không tự đổi slug sau khi đã thống nhất, để URL và asset luôn khớp nhau.

### Asset cần kiểm tra trước khi viết

Hiện trong `src/assets` đã có `edison-cover.png` và đa số hero theo slug. Hai hero dưới đây cần bổ sung hoặc xác nhận lại tên file trước khi viết đủ 18 chương:

- `edison-pearl-street-va-thanh-pho-bat-dau-sang-len.png`
- `edison-dien-anh-kinetograph-kinetoscope-va-black-maria.png`

## Nguyên tắc nội dung

- Không viết Edison như "thiên tài cô độc" theo kiểu huyền thoại rẻ tiền. Phải nhấn mạnh ông là nhà phát minh, doanh nhân, người tổ chức phòng thí nghiệm và người biết biến ý tưởng thành hệ thống thương mại.
- Khi nhắc các phát minh lớn như bóng đèn, máy quay, máy chiếu, điện lực, phonograph, phải nói rõ Edison thường không "từ hư không tạo ra", mà cải tiến, hệ thống hóa và thương mại hóa dựa trên rất nhiều thí nghiệm cùng đội ngũ cộng sự.
- Các tranh cãi như chiến tranh dòng điện, Tesla/Westinghouse, độc quyền bằng sáng chế, điện ảnh và Motion Picture Patents Company phải viết cân bằng, không biến thành drama mạng xã hội.
- Các chi tiết chưa chắc chắn như nguyên nhân điếc phải trình bày thận trọng: nhiều nguồn giải thích khác nhau, không khẳng định một nguyên nhân duy nhất.
- Mỗi chương nên có một đoạn mở đầu giàu không khí, sau đó đi vào mốc lịch sử, rồi kết lại bằng câu nối sang chương tiếp theo.

## Nguồn nền tảng cần dùng khi viết

- Library of Congress - Life of Thomas Alva Edison
- National Park Service - Thomas Edison National Historical Park
- Britannica - Thomas Edison biography
- Rutgers - The Thomas A. Edison Papers
- Smithsonian / Lemelson Center - Thomas Edison and invention culture
- National Museum of American History - Lighting A Revolution

## Style hero chung

```text
cinematic historical editorial portrait, late 19th century American invention era, warm tungsten light, smoky workshop atmosphere, brass machinery, handwritten patent papers, glass bulbs, telegraph wires, wood and iron textures, realistic but slightly mythic, serious documentary cover art, no text, no logo, no watermark, 18:9 aspect ratio, 4K
```

## Chương 1 - Thomas Edison là ai?

Mục tiêu: mở series bằng hình ảnh Edison không chỉ là "người phát minh bóng đèn", mà là người giúp định hình cách phát minh được tổ chức, sản xuất và thương mại hóa trong thời hiện đại.

```text
A cinematic historical editorial hero image of Thomas Edison-inspired inventor in an old laboratory, standing between glowing incandescent bulbs, a phonograph cylinder, telegraph wires, motion picture reels, and stacks of patent papers. The room feels like the birth of modern technology: warm tungsten light, smoky atmosphere, brass machinery, dark wood benches, serious documentary tone, realistic but slightly mythic, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 2 - Tuổi thơ ở Milan và Port Huron

Mục tiêu: kể về Edison sinh năm 1847 tại Milan, Ohio; gia đình chuyển tới Port Huron, Michigan; tính tò mò, đọc nhiều, học không hợp trường lớp và vai trò của mẹ Nancy Edison.

```text
A cinematic 1850s American childhood scene: a curious young boy inspired by Thomas Edison sitting near a window in a modest wooden home, surrounded by books, jars, simple chemical bottles, and small mechanical objects. Outside, a quiet Midwestern town and railway tracks fade into morning fog. Warm family light, historical realism, gentle storytelling mood, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 3 - Cậu bé bán báo trên tàu

Mục tiêu: Edison làm việc trên tuyến Grand Trunk Railroad, bán báo và kẹo, tự lập phòng thí nghiệm nhỏ, in Grand Trunk Herald; đặt nền cho tinh thần tự học và kinh doanh sớm.

```text
A cinematic railway scene from 1859: a teenage Thomas Edison-inspired newsboy inside a train baggage car, with newspapers, candy boxes, a small hand printing press, glass chemical bottles, and sparks of curiosity. Steam outside the train windows, motion blur, warm lantern light, early industrial America atmosphere, documentary realism, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 4 - Điếc, cô độc và khả năng tập trung

Mục tiêu: nói về vấn đề thính lực của Edison một cách thận trọng; các giả thuyết khác nhau; cách sự khiếm thính ảnh hưởng tới tính cách, giao tiếp và thói quen làm việc.

```text
A contemplative historical portrait of a young inventor sitting alone beside telegraph equipment, one hand near his ear, surrounded by muffled workshop lights and blurred human silhouettes in the distance. The image suggests partial deafness, solitude, and intense concentration without melodrama. Warm amber and deep blue tones, realistic documentary style, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 5 - Những năm điện báo

Mục tiêu: kể về Edison học điện báo, làm telegraph operator nhiều nơi, hiểu sâu hệ thống truyền tin và bắt đầu nhìn thấy vấn đề kỹ thuật có thể cải tiến.

```text
A cinematic telegraph office in the 1860s, night shift atmosphere: a young Edison-inspired operator sits at a wooden desk with Morse keys, paper tape, battery jars, wires running across the wall, and city lights beyond the window. The mood is focused, restless, and inventive. Historical realism, warm oil lamp light, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 6 - Bằng sáng chế đầu tiên và bài học thị trường

Mục tiêu: kể về electric vote recorder năm 1869, thất bại thương mại và bài học Edison rút ra: phát minh phải có người cần dùng.

```text
A serious historical editorial scene: a young inventor presenting an early electric vote recorder on a wooden table to indifferent politicians in a dim government office. Patent papers, brass switches, wires, and a quiet sense of disappointment. The scene should show the first hard lesson between invention and market demand, realistic 1860s atmosphere, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 7 - Newark và con đường thành nhà phát minh chuyên nghiệp

Mục tiêu: Edison ở New York/Newark, sửa máy in chứng khoán, phát triển stock ticker, telegraph improvements, hình thành xưởng sản xuất và kiếm vốn.

```text
A bustling 1870s Newark invention workshop: Edison-inspired inventor and assistants working around stock ticker machines, gears, paper tape, telegraph instruments, and patent drawings. Industrial energy, crowded benches, brass and steel details, warm factory light, early entrepreneur atmosphere, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 8 - Menlo Park và "nhà máy phát minh"

Mục tiêu: Edison mở phòng thí nghiệm Menlo Park năm 1876; khái niệm invention factory; làm việc theo nhóm, thử nghiệm có hệ thống, nhiều dự án cùng lúc.

```text
A wide cinematic view of Menlo Park laboratory at night: red brick building glowing with warm light, inside visible workbenches, assistants, glassware, batteries, telegraph equipment, and Edison-inspired figure moving between experiments. Snow or mist outside, intense creative atmosphere, birth of the invention factory, realistic historical editorial style, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 9 - Phonograph: chiếc máy khiến thế giới nghe thấy chính mình

Mục tiêu: kể về phonograph năm 1877, sự kinh ngạc của công chúng, biệt danh "Wizard of Menlo Park", và giới hạn thương mại ban đầu của phát minh này.

```text
A cinematic close-up scene of a tinfoil phonograph on a wooden workbench, Edison-inspired inventor leaning in as the machine plays back sound for the first time. Assistants look astonished in warm lamplight, scattered notes and metal cylinders around them. Magical but historically grounded atmosphere, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 10 - Ánh sáng điện: không chỉ là bóng đèn

Mục tiêu: giải thích Edison không chỉ tạo bóng đèn mà xây cả hệ thống chiếu sáng: filament, dây dẫn, công tắc, đồng hồ điện, máy phát, mạng phân phối.

```text
A grand cinematic laboratory scene filled with glowing carbon filament incandescent bulbs, electrical meters, switches, copper wires, generators, and Edison-inspired inventor studying a lighting system diagram. The image must emphasize an entire electric light system, not just one bulb. Warm golden glow, dark workshop background, serious documentary cover art, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 11 - Pearl Street và thành phố bắt đầu sáng lên

Mục tiêu: kể về hệ thống điện thương mại Pearl Street năm 1882 tại Lower Manhattan; từ phòng thí nghiệm bước ra hạ tầng đô thị.

```text
A cinematic 1882 Lower Manhattan night scene: streets near Pearl Street slowly illuminated by early electric lamps, newspaper offices and financial buildings in the background, steam and horse carriages under warm electric glow. Subtle view of underground cables and a generator station cutaway-like detail blended into the composition. Historical realism, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 12 - Chiến tranh dòng điện

Mục tiêu: trình bày cân bằng DC của Edison, AC của Westinghouse/Tesla, yếu tố kỹ thuật, thương mại, tuyên truyền và tranh cãi đạo đức.

```text
A dramatic but balanced historical editorial image: two opposing electrical systems represented by a split composition, Edison-style DC generators and thick copper wires on one side, Westinghouse/Tesla-inspired AC transformers and long-distance power lines on the other. No villain imagery, just tension between technologies. Stormy sky, industrial lighting, serious documentary mood, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 13 - Gia đình, hôn nhân và cái giá của tham vọng

Mục tiêu: kể về Mary Stilwell, Mina Miller, các con, Glenmont, thói quen làm việc cực đoan và khoảng cách giữa thiên tài công nghiệp với đời sống riêng.

```text
A quiet cinematic scene at Glenmont estate: an Edison-inspired older inventor standing near a window, laboratory lights visible far away, while a family parlor with photographs, letters, and children's objects sits in soft shadow. The mood is intimate and bittersweet, showing family life beside relentless work. Historical realism, warm interior light, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 14 - West Orange: phòng thí nghiệm khổng lồ

Mục tiêu: Edison xây phòng thí nghiệm West Orange năm 1887, mở rộng nghiên cứu, cải tiến phonograph, thiết bị điện ảnh, hóa học, vật liệu và sản xuất.

```text
A cinematic wide interior of the West Orange laboratory: multiple floors of shelves, chemical bottles, machine tools, phonographs, batteries, film equipment, and assistants working under tall industrial windows. Edison-inspired figure stands in the center like a factory conductor. Warm tungsten light, immense scale, documentary realism, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 15 - Điện ảnh: Kinetograph, Kinetoscope và Black Maria

Mục tiêu: kể về vai trò của Edison lab và W.K.L. Dickson trong điện ảnh sơ khai, Kinetograph, Kinetoscope, Black Maria, rồi tranh chấp bằng sáng chế.

```text
A cinematic early motion picture studio scene inside the Black Maria: black rotating studio walls, sunlight pouring from an open roof, a Kinetograph camera on a tripod, film strips, performers posing, and Edison-era technicians adjusting equipment. Early cinema atmosphere, sepia and warm light, historical realism, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 16 - Những thất bại lớn: quặng sắt, xi măng và pin

Mục tiêu: kể về ore-milling thất bại, Edison Portland Cement, storage battery và cách Edison chấp nhận thử sai với quy mô công nghiệp.

```text
A rugged cinematic industrial scene: an older Edison-inspired inventor standing among ore-crushing machinery, cement kilns, battery cells, dust, sparks, and abandoned blueprints. The mood shows ambition, failure, persistence, and industrial scale rather than triumph. Realistic early 1900s factory atmosphere, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 17 - Bạn bè, chiến tranh và những năm cuối

Mục tiêu: kể về quan hệ với Henry Ford, Harvey Firestone, Naval Consulting Board, nghiên cứu thời chiến, tìm nguồn cao su thay thế, sức khỏe suy giảm.

```text
A cinematic late-life scene of Edison-inspired elderly inventor with Henry Ford and industrial friends suggested but not exact likenesses, standing near a laboratory table with rubber plant specimens, naval research notes, batteries, and old photographs. Warm late afternoon light, reflective historical documentary mood, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```

## Chương 18 - Cái chết, di sản và sự thật phía sau huyền thoại

Mục tiêu: Edison qua đời ngày 18/10/1931 tại Glenmont, West Orange; đánh giá di sản 1.093 bằng sáng chế tại Mỹ, mô hình phòng thí nghiệm công nghiệp, mặt sáng và mặt tối của huyền thoại Edison.

```text
A solemn cinematic final chapter image: an empty Edison laboratory at night, a single incandescent bulb glowing above a wooden workbench with a phonograph, patent papers, film reel, telegraph key, and worn notebook. In the background, distant city lights shine softly as if carrying his legacy forward. Respectful, reflective, historical editorial style, no text, no logo, no watermark, 18:9 aspect ratio, 4K.
```
