import fs from 'fs';
import path from 'path';

const postsDir = './src/data/post';
const files = fs.readdirSync(postsDir);

let fixedCount = 0;

files.forEach((file) => {
  if (file.endsWith('.md')) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix quotes in frontmatter
    let updated = content.replace(/^(title|excerpt|author):\s*"([^"']*"[^"']*)"$/gm, (_match, key, value) => {
      // If value contains quotes, use single quotes wrapper
      return `${key}: '${value}'`;
    });

    if (updated !== content) {
      fs.writeFileSync(filePath, updated);
      fixedCount++;
      console.log(`✓ Fixed quotes in: ${file}`);
    }
  }
});

console.log(`Fixed quotes in ${fixedCount} files.`);
