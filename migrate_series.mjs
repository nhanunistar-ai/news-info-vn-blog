import fs from 'fs';
import path from 'path';

const SRC_DIR = 'd:/news.info.vn/src/content/series';
const DEST_DIR = 'd:/news.info.vn/astrowind-theme/src/data/series';

function migrateSeries() {
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }
  const files = fs.readdirSync(SRC_DIR);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const srcPath = path.join(SRC_DIR, file);
    const destPath = path.join(DEST_DIR, file);
    let content = fs.readFileSync(srcPath, 'utf8');

    // Match frontmatter block
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (match) {
      let fm = match[1];
      // Replacements
      fm = fm.replace(/^coverImage:\s*['"]?\.\.\/\.\.\/assets\/(.+?)['"]?$/m, "image: '~/assets/images/$1'");

      content = content.replace(frontmatterRegex, `---\n${fm}\n---`);
    }

    fs.writeFileSync(destPath, content);
  }

  // Create hardcoded series for study
  const studySeries = [
    {
      slug: 'chu-nghia-khac-ky.md',
      title: 'Chủ Nghĩa Khắc Kỷ',
      description: 'Mạch bài về Stoicism, từ nền tảng triết học đến thực hành đời sống.',
      order: 1,
      image: '~/assets/images/chu-nghia-khac-ky.webp', // Assumption, usually there's a fallback or specific image. Wait, the old site didn't define a cover for it except falling back to the first post's heroImage. We can leave image empty, the page logic can fallback to the first post's image.
    },
    {
      slug: 'ai-ky.md',
      title: 'Ái Kỷ',
      description: 'Mạch bài về ái kỷ, từ định nghĩa, quan hệ độc hại đến các lăng kính tâm lý và văn hóa.',
      order: 2,
    },
    {
      slug: 'memories-dreams-reflections.md',
      title: 'Memories, Dreams, Reflections',
      description:
        'Mạch đọc Jung qua ký ức, giấc mơ, biểu tượng và hành trình cá nhân hóa trong cuốn hồi ký quan trọng nhất của ông.',
      order: 3,
      image: '~/assets/images/memories-dreams-reflections.webp',
    },
    {
      slug: 'socrates.md',
      title: 'Socrates',
      description: 'Mạch bài về nghệ thuật đặt câu hỏi, tự xét mình và triết học như một cách sống từ Socrates.',
      order: 4,
    },
  ];

  for (const series of studySeries) {
    let fm = `title: '${series.title}'\ndescription: '${series.description}'\norder: ${series.order}`;
    if (series.image) {
      fm += `\nimage: '${series.image}'`;
    }
    const content = `---\n${fm}\n---\n`;
    fs.writeFileSync(path.join(DEST_DIR, series.slug), content);
  }

  console.log('Series migrated successfully.');
}

migrateSeries();
