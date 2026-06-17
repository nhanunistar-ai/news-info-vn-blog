import fs from 'fs';
import path from 'path';

// Read a few posts and check their category field values
const dir = 'd:/news.info.vn/astrowind-theme/src/data/post';
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .slice(0, 10);

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    const catMatch = fmMatch[1].match(/^category:\s*(.*)$/m);
    const seriesMatch = fmMatch[1].match(/^series:\s*(.*)$/m);
    console.log(`${f}: category=${catMatch?.[1]} series=${seriesMatch?.[1] || 'none'}`);
  }
}

// Also check series files
const seriesDir = 'd:/news.info.vn/astrowind-theme/src/data/series';
const seriesFiles = fs.readdirSync(seriesDir).filter((f) => f.endsWith('.md'));
console.log('\n--- Series files ---');
for (const f of seriesFiles) {
  const content = fs.readFileSync(path.join(seriesDir, f), 'utf8');
  console.log(`${f}:`);
  console.log(content.split('---')[1]?.trim());
  console.log('');
}
