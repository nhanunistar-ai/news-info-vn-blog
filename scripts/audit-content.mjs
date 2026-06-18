import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');
const seriesDir = path.join(root, 'src', 'content', 'series');
const publicDir = path.join(root, 'public');
const srcDir = path.join(root, 'src');

const MB = 1024 * 1024;
const today = new Date();
today.setHours(0, 0, 0, 0);

const report = {
  posts: 0,
  series: 0,
  categories: new Map(),
  missingAuthor: [],
  missingHero: [],
  brokenHero: [],
  futurePosts: [],
  invalidPubDate: [],
  nonStandardPubDate: [],
  seriesMissingChapter: [],
  largePublicFiles: [],
  legacyBlogLinks: [],
};

function walkFiles(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];

  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath, predicate));
      continue;
    }
    if (entry.isFile() && predicate(fullPath)) results.push(fullPath);
  }
  return results;
}

function parseFrontmatter(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;

    const [, key, rawValue] = field;
    data[key] = rawValue.trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
}

function formatPath(filePath) {
  return path.relative(root, filePath).replaceAll('\\', '/');
}

function addCategory(category) {
  const key = category || 'missing';
  report.categories.set(key, (report.categories.get(key) || 0) + 1);
}

for (const filePath of walkFiles(blogDir, (file) => file.endsWith('.md'))) {
  report.posts += 1;

  const data = parseFrontmatter(filePath);
  const relPath = formatPath(filePath);
  const title = data.title || path.basename(filePath);

  addCategory(data.category);

  if (!data.author) report.missingAuthor.push({ relPath, title });

  if (!data.heroImage) {
    report.missingHero.push({ relPath, title });
  } else {
    const heroPath = path.resolve(path.dirname(filePath), data.heroImage);
    if (!fs.existsSync(heroPath)) {
      report.brokenHero.push({ relPath, title, heroImage: data.heroImage });
    }
  }

  if (data.pubDate) {
    const pubDate = new Date(data.pubDate);
    if (Number.isNaN(pubDate.valueOf())) {
      report.invalidPubDate.push({ relPath, title, pubDate: data.pubDate });
    } else if (pubDate > today) {
      report.futurePosts.push({ relPath, title, pubDate: data.pubDate });
    }
    if (!/^[A-Z][a-z]{2} \d{2} \d{4}$/.test(data.pubDate)) {
      report.nonStandardPubDate.push({ relPath, title, pubDate: data.pubDate });
    }
  }

  if (data.series && !data.chapter) {
    report.seriesMissingChapter.push({ relPath, title, series: data.series });
  }
}

report.series = walkFiles(seriesDir, (file) => file.endsWith('.md')).length;

for (const filePath of walkFiles(publicDir)) {
  const stat = fs.statSync(filePath);
  if (stat.size >= 20 * MB) {
    report.largePublicFiles.push({
      relPath: formatPath(filePath),
      mb: Number((stat.size / MB).toFixed(2)),
    });
  }
}

for (const filePath of walkFiles(srcDir, (file) => /\.(astro|md|mdx|js|ts|css)$/.test(file))) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/(["'(`\s])\/blog\/|news\.info\.vn\/blog/.test(line)) {
      report.legacyBlogLinks.push({
        relPath: formatPath(filePath),
        line: index + 1,
        text: line.trim(),
      });
    }
  });
}

function printList(title, items, formatter, limit = 12) {
  console.log(`\n${title}: ${items.length}`);
  for (const item of items.slice(0, limit)) {
    console.log(`- ${formatter(item)}`);
  }
  if (items.length > limit) console.log(`- ...and ${items.length - limit} more`);
}

console.log('Content audit');
console.log('=============');
console.log(`Posts: ${report.posts}`);
console.log(`Series pages: ${report.series}`);
console.log(`Categories: ${[...report.categories.entries()].map(([key, count]) => `${key}=${count}`).join(', ')}`);

printList('Missing author', report.missingAuthor, (item) => `${item.relPath} :: ${item.title}`);
printList('Missing hero', report.missingHero, (item) => `${item.relPath} :: ${item.title}`);
printList('Broken hero', report.brokenHero, (item) => `${item.relPath} :: ${item.heroImage}`);
printList('Future posts', report.futurePosts, (item) => `${item.pubDate} :: ${item.relPath}`);
printList('Invalid pubDate', report.invalidPubDate, (item) => `${item.pubDate} :: ${item.relPath}`);
printList('Non-standard pubDate', report.nonStandardPubDate, (item) => `${item.pubDate} :: ${item.relPath}`);
printList('Series posts without chapter', report.seriesMissingChapter, (item) => `${item.series} :: ${item.relPath}`);
printList('Large public files >= 20MB', report.largePublicFiles, (item) => `${item.mb}MB :: ${item.relPath}`);
printList(
  'Legacy /blog/ links in source',
  report.legacyBlogLinks,
  (item) => `${item.relPath}:${item.line} :: ${item.text}`
);

if (report.brokenHero.length > 0 || report.missingHero.length > 0 || report.invalidPubDate.length > 0) {
  process.exitCode = 1;
}
