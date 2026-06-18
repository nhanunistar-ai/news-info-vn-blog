import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const blogDir = path.join(__dirname, '../src/content/blog');
const files = fs.readdirSync(blogDir);
const now = new Date();

const missingHero = [];
const missingCategory = [];
const futureDates = [];
const missingDesc = [];
const noFrontmatter = [];
const categoryCount = {};

files.forEach((f) => {
  const content = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const fmMatch = content.match(/^---[\r\n]([\s\S]*?)[\r\n]---/);
  if (!fmMatch) {
    noFrontmatter.push(f);
    return;
  }
  const fm = fmMatch[1];

  if (!fm.includes('heroImage')) missingHero.push(f);
  if (!fm.includes('category')) missingCategory.push(f);
  if (!fm.match(/description:\s*.+/)) missingDesc.push(f);

  const catMatch = fm.match(/category:\s*['"]?([^'"\n]+)['"]?/);
  if (catMatch) {
    const cat = catMatch[1].trim();
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  }

  const dateMatch = fm.match(/pubDate:\s*['"]?([^'"\n]+)['"]?/);
  if (dateMatch) {
    const d = new Date(dateMatch[1].trim());
    if (!isNaN(d.getTime()) && d > now) {
      futureDates.push({ file: f, date: dateMatch[1].trim() });
    }
  }
});

console.log('=== SITE AUDIT REPORT ===\n');
console.log('Total blog posts:', files.length);

console.log('\n--- Categories ---');
Object.entries(categoryCount)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(' ', cat + ':', count, 'posts');
  });

console.log('\n--- Missing heroImage (' + missingHero.length + ') ---');
missingHero.forEach((f) => console.log('  -', f));

console.log('\n--- Missing category (' + missingCategory.length + ') ---');
missingCategory.forEach((f) => console.log('  -', f));

console.log('\n--- Missing description (' + missingDesc.length + ') ---');
missingDesc.forEach((f) => console.log('  -', f));

console.log('\n--- Future pubDate (' + futureDates.length + ') ---');
futureDates.forEach((item) => console.log('  -', item.file, '->', item.date));

console.log('\n--- No frontmatter (' + noFrontmatter.length + ') ---');
noFrontmatter.forEach((f) => console.log('  -', f));

console.log('\n=== END OF AUDIT ===');
