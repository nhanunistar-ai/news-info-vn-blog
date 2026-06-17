import fs from 'fs';
import path from 'path';

const POST_DIR = 'd:/news.info.vn/astrowind-theme/src/data/post';

const files = fs.readdirSync(POST_DIR).filter(f => f.endsWith('.md'));
let fixed = 0;

for (const file of files) {
  const filePath = path.join(POST_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Match publishDate with a quoted string value like 'May 20 2026' or "May 20 2026"
  const regex = /^(publishDate:\s*)['"](.+?)['"]\s*$/m;
  const match = content.match(regex);

  if (match) {
    const dateStr = match[2];
    const parsed = new Date(dateStr);

    if (!isNaN(parsed.getTime())) {
      // Format as YYYY-MM-DDTHH:mm:ss.000Z
      const isoDate = parsed.toISOString();
      content = content.replace(regex, `$1${isoDate}`);
      fs.writeFileSync(filePath, content);
      fixed++;
      console.log(`Fixed: ${file} -> ${isoDate}`);
    } else {
      console.log(`WARN: Could not parse date in ${file}: "${dateStr}"`);
    }
  }
}

console.log(`\nDone. Fixed ${fixed} of ${files.length} files.`);
