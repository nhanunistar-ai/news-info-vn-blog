import fs from 'fs';
import path from 'path';

const postsDir = './src/data/post';
const files = fs.readdirSync(postsDir);

let updatedCount = 0;

files.forEach((file) => {
  if (file.endsWith('.md')) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Tìm tags và extract series name và chapter number
    const tagsMatch = content.match(/tags:\s*\n([\s\S]*?)(?:^---|$)/m);
    let seriesSlug = null;
    let chapterNum = null;

    if (tagsMatch) {
      const tagsSection = tagsMatch[1];
      const chapterTag = tagsSection.match(/- "chapter-(\d+)"/);

      if (chapterTag) {
        chapterNum = parseInt(chapterTag[1]);
      }

      // Series slug là tag không phải là chapter, và không phải keywords thông thường
      const possibleSeriesTags = tagsSection
        .match(/- "([a-z-]+)"/g)
        ?.map((t) => t.replace(/- "/g, '').replace(/"/g, ''))
        .filter(
          (t) =>
            !t.startsWith('chapter-') &&
            ![
              'astro',
              'tailwind',
              '432hz',
              '440hz',
              'music',
              'frequency',
              'sound-healing',
              'tam-ly',
              'ai-ky',
              'dsm-5-tr',
              'van-hoc',
              'dien-anh',
              'cuoc-doi-ky-la-cua-albert-einstein',
              'nhan-vat',
              'khoa-hoc',
              'cong-nghe',
              'lich-su',
              'ky-thuat',
              'kham-pha',
            ].includes(t)
        );

      if (possibleSeriesTags && possibleSeriesTags.length > 0) {
        seriesSlug = possibleSeriesTags[0];
      }
    }

    if (seriesSlug && chapterNum) {
      // Thêm series và chapter field nếu chưa có
      if (!content.includes('series:')) {
        // Thêm series và chapter sau category
        const updated = content.replace(/(category: [^\n]+)/, `$1\nseries: "${seriesSlug}"\nchapter: ${chapterNum}`);
        fs.writeFileSync(filePath, updated);
        updatedCount++;
        console.log(`✓ Added series fields to: ${file} (series: ${seriesSlug}, chapter: ${chapterNum})`);
      }
    }
  }
});

console.log(`Updated ${updatedCount} files.`);
