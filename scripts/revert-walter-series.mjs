import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Directory containing all posts
const POSTS_DIR = path.join(__dirname, '..', 'src', 'data', 'post');

function revertSeries(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      revertSeries(fullPath);
    } else if (entry.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const regex = /series:\s*['"]stories['"]/i;
      if (regex.test(content)) {
        content = content.replace(regex, "series: 'walter-russell'");
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Reverted series in', fullPath);
      }
    }
  }
}

revertSeries(POSTS_DIR);
console.log('Revert completed.');
