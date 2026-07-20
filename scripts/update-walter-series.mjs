import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root (two levels up from this script)
const POSTS_DIR = path.join(__dirname, '..', 'src', 'data', 'post');

function updateSeries(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      updateSeries(fullPath);
    } else if (entry.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const regex = /series:\s*['"]walter-russell['"]/i;
      if (regex.test(content)) {
        content = content.replace(regex, "series: 'stories'");
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated series in', fullPath);
      }
    }
  }
}

updateSeries(POSTS_DIR);
console.log('All walter-russell series fields updated to stories.');
