import fs from 'fs';
import path from 'path';

const dir = 'd:/news.info.vn/news-info-vn-blog/src/data/post/uncategorized';
const parent = 'd:/news.info.vn/news-info-vn-blog/src/data/post';

if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const fmMatch = content.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/);
    let category = 'uncategorized';
    if (fmMatch) {
      const catMatch = fmMatch[1].match(/^category:\s*(.+)$/m);
      if (catMatch) {
        const raw = catMatch[1].trim();
        if (raw.startsWith('[')) {
          category = raw.slice(1, -1).split(',')[0].trim().replace(/['"]/g, '');
        } else {
          category = raw.replace(/['"]/g, '');
        }
      }
    }
    const safe = category.replace(/[^a-z0-9\-]/g, '').toLowerCase() || 'uncategorized';
    const targetDir = path.join(parent, safe);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, {recursive: true});
    fs.renameSync(path.join(dir, file), path.join(targetDir, file));
  }
  
  if (fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
      console.log('Fixed BOM files and removed uncategorized directory!');
  } else {
      console.log('Still have some files in uncategorized');
  }
}
