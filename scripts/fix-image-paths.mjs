import fs from 'fs';
import path from 'path';

const postsDir = './src/data/post';
const files = fs.readdirSync(postsDir);

let fixedCount = 0;

files.forEach((file) => {
  if (file.endsWith('.md')) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace ../../assets/ with /images/ (public folder)
    const updated = content.replace(/image:\s*["']\.\.\/\.\.\/assets\/([^"']+)["']/g, (match, filename) => {
      return `image: "/images/${filename}"`;
    });

    // Also fix any image references in content
    const contentUpdated = updated.replace(/!\[([^\]]*)\]\(\.\.\/\.\.\/assets\/([^)]+)\)/g, (match, alt, filename) => {
      return `![${alt}](/images/${filename})`;
    });

    if (contentUpdated !== content) {
      fs.writeFileSync(filePath, contentUpdated);
      fixedCount++;
      console.log(`✓ Fixed image paths in: ${file}`);
    }
  }
});

console.log(`Fixed image paths in ${fixedCount} files.`);
