/**
 * compress-images.mjs
 * Convert tất cả PNG trong src/assets/ sang WebP (quality 82)
 * rồi cập nhật các reference trong src/content/blog/*.md và src/pages/*.astro
 *
 * An toàn với Astro: Astro Image pipeline đọc file nguồn, không quan tâm định dạng.
 * Chạy: node scripts/compress-images.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'src', 'assets');
const CONTENT_DIR = path.join(ROOT, 'src', 'content');
const PAGES_DIR = path.join(ROOT, 'src', 'pages');

const DRY_RUN = process.argv.includes('--dry-run');

function getAllFiles(dir, exts) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllFiles(fullPath, exts));
    else if (exts.includes(path.extname(entry.name).toLowerCase())) results.push(fullPath);
  }
  return results;
}

// 1. Tìm tất cả PNG trong src/assets
const pngFiles = getAllFiles(ASSETS_DIR, ['.png']);
console.log(`\nTìm thấy ${pngFiles.length} file PNG trong src/assets/\n`);

const converted = [];
const failed = [];

for (const pngPath of pngFiles) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const pngSize = fs.statSync(pngPath).size;

  if (DRY_RUN) {
    console.log(`[DRY-RUN] Sẽ convert: ${path.relative(ROOT, pngPath)} (${(pngSize / 1024).toFixed(0)} KB)`);
    converted.push({ pngPath, webpPath });
    continue;
  }

  try {
    // Dùng sharp-cli để convert PNG -> WebP quality 82
    execSync(`npx sharp-cli --input "${pngPath}" --output "${webpPath}" --format webp --quality 82`, {
      stdio: 'pipe',
    });

    const webpSize = fs.statSync(webpPath).size;
    const saved = pngSize - webpSize;
    const pct = ((saved / pngSize) * 100).toFixed(1);

    console.log(
      `✅ ${path.basename(pngPath)} → webp | ${(pngSize/1024).toFixed(0)}KB → ${(webpSize/1024).toFixed(0)}KB (-${pct}%)`
    );
    converted.push({ pngPath, webpPath, pngSize, webpSize });
  } catch (err) {
    console.error(`❌ Lỗi convert: ${path.basename(pngPath)}`, err.message);
    failed.push(pngPath);
  }
}

if (DRY_RUN) {
  console.log('\n[DRY-RUN] Xong. Chạy lại không có --dry-run để thực hiện.');
  process.exit(0);
}

if (converted.length === 0) {
  console.log('Không có file nào được convert.');
  process.exit(0);
}

// 2. Cập nhật references trong .md và .astro files
const sourceFiles = [
  ...getAllFiles(CONTENT_DIR, ['.md', '.mdx']),
  ...getAllFiles(PAGES_DIR, ['.astro', '.js', '.ts']),
];

console.log(`\nCập nhật references trong ${sourceFiles.length} file nguồn...`);

let totalRefUpdated = 0;
for (const srcFile of sourceFiles) {
  let content = fs.readFileSync(srcFile, 'utf8');
  let modified = false;

  for (const { pngPath } of converted) {
    const baseName = path.basename(pngPath);          // abc.png
    const webpName = baseName.replace(/\.png$/i, '.webp');

    // Replace mọi reference đến file .png này (tất cả dạng path)
    const regex = new RegExp(baseName.replace('.', '\\.'), 'g');
    if (regex.test(content)) {
      content = content.replace(new RegExp(baseName.replace('.', '\\.'), 'g'), webpName);
      modified = true;
      totalRefUpdated++;
    }
  }

  if (modified) {
    fs.writeFileSync(srcFile, content, 'utf8');
    console.log(`  📝 Updated: ${path.relative(ROOT, srcFile)}`);
  }
}

// 3. GIỮ LẠI PNG gốc (không xóa) — có thể xóa thủ công sau khi kiểm tra
console.log('\n(PNG gốc được giữ lại làm backup)');
let deleted = 0;

// 4. Tổng kết
const totalPngSize = converted.reduce((s, c) => s + (c.pngSize || 0), 0);
const totalWebpSize = converted.reduce((s, c) => s + (c.webpSize || 0), 0);
const totalSaved = totalPngSize - totalWebpSize;

console.log('\n=== KẾT QUẢ ===');
console.log(`Converted: ${converted.length} file`);
console.log(`Failed:    ${failed.length} file`);
console.log(`Deleted:   ${deleted} PNG gốc`);
console.log(`References updated: ${totalRefUpdated}`);
console.log(`Dung lượng trước: ${(totalPngSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Dung lượng sau:   ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Tiết kiệm:        ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${((totalSaved/totalPngSize)*100).toFixed(1)}%)`);

if (failed.length > 0) {
  console.log('\nFile lỗi:');
  failed.forEach(f => console.log(' -', path.relative(ROOT, f)));
}
