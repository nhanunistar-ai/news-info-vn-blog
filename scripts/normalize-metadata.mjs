import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');

const authors = [
  'Minh Anh',
  'Minh Khang',
  'Mai Lan',
  'Gia Huy',
  'Duc Huy',
  'Nam Phong',
  'Ngoc Khanh',
  'Bao Chau',
  'Tuan Kiet',
  'Gia Han',
  'Duc Minh',
  'Quang Huy',
  'Minh Chau',
  'Bao Ngoc',
  'Khanh Vy',
  'Quynh Nhu',
  'Thanh Tam',
  'Hoang Linh',
];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.md')) results.push(fullPath);
  }
  return results;
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function normalizeDate(rawDate) {
  const cleaned = rawDate.trim().replace(/^['"]|['"]$/g, '');
  const parsed = new Date(cleaned);
  if (Number.isNaN(parsed.valueOf())) return rawDate;

  const month = monthNames[parsed.getMonth()];
  const day = String(parsed.getDate()).padStart(2, '0');
  const year = parsed.getFullYear();
  return `'${month} ${day} ${year}'`;
}

function insertAuthor(lines, author) {
  const authorLine = `author: '${author}'`;
  const tagsIndex = lines.findIndex((line) => /^tags:\s*/.test(line));
  const categoryIndex = lines.findIndex((line) => /^category:\s*/.test(line));
  const pubDateIndex = lines.findIndex((line) => /^pubDate:\s*/.test(line));
  const insertAfter = tagsIndex >= 0 ? tagsIndex : categoryIndex;

  if (insertAfter >= 0) {
    lines.splice(insertAfter + 1, 0, authorLine);
    return;
  }

  if (pubDateIndex >= 0) {
    lines.splice(pubDateIndex, 0, authorLine);
    return;
  }

  lines.push(authorLine);
}

let changedFiles = 0;
let addedAuthors = 0;
let normalizedDates = 0;

for (const filePath of walkFiles(blogDir)) {
  const original = fs.readFileSync(filePath, 'utf8');
  const newline = original.includes('\r\n') ? '\r\n' : '\n';
  const match = original.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) continue;

  const frontmatter = match[1];
  const lines = frontmatter.split(/\r?\n/);
  let changed = false;

  const authorIndex = lines.findIndex((line) => /^author:\s*/.test(line));
  if (authorIndex < 0) {
    const author = authors[hashString(path.basename(filePath)) % authors.length];
    insertAuthor(lines, author);
    addedAuthors += 1;
    changed = true;
  }

  const pubDateIndex = lines.findIndex((line) => /^pubDate:\s*/.test(line));
  if (pubDateIndex >= 0) {
    const [, rawDate = ''] = lines[pubDateIndex].split(/:(.*)/s);
    const normalized = `pubDate: ${normalizeDate(rawDate)}`;
    if (normalized !== lines[pubDateIndex]) {
      lines[pubDateIndex] = normalized;
      normalizedDates += 1;
      changed = true;
    }
  }

  if (!changed) continue;

  const nextFrontmatter = lines.join(newline);
  const next = original.replace(match[0], `---${newline}${nextFrontmatter}${newline}---`);
  fs.writeFileSync(filePath, next, 'utf8');
  changedFiles += 1;
}

console.log(`Changed files: ${changedFiles}`);
console.log(`Added authors: ${addedAuthors}`);
console.log(`Normalized pubDate fields: ${normalizedDates}`);
