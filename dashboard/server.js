import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3333;

// Paths
const POSTS_DIR = path.join(__dirname, '..', 'src', 'data', 'post');
const PUBLIC_DIR = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.use(express.json({ limit: '10mb' }));
app.use(express.static(PUBLIC_DIR));

function getAllMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function findPostBySlug(slug) {
  const allFiles = getAllMarkdownFiles(POSTS_DIR);
  return allFiles.find(f => path.basename(f, '.md') === slug);
}

function getFirstCategory(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return 'uncategorized';
  const fm = fmMatch[1];
  const catRaw = fm.match(/^category:\s*(.+)$/m);
  if (!catRaw) return 'uncategorized';
  const raw = catRaw[1].trim();
  if (raw.startsWith('[')) {
    const categories = raw.slice(1, -1).split(',').map(s => s.trim().replace(/'/g, '').replace(/"/g, ''));
    return categories[0] || 'uncategorized';
  } else {
    return raw.replace(/'/g, '').replace(/"/g, '');
  }
}

// GET /api/posts — list existing posts
app.get('/api/posts', (_req, res) => {
  try {
    const files = getAllMarkdownFiles(POSTS_DIR)
      .map(filePath => {
        const filename = path.basename(filePath);
        return {
          filename,
          slug: filename.replace('.md', ''),
          category: path.basename(path.dirname(filePath))
        };
      })
      .sort((a, b) => b.filename.localeCompare(a.filename));
    res.json(files);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/posts/:slug — load existing post
app.get('/api/posts/:slug', (req, res) => {
  const filePath = findPostBySlug(req.params.slug);
  if (!filePath) return res.status(404).json({ error: 'Not found' });
  const content = fs.readFileSync(filePath, 'utf8');
  res.json({ content });
});

// POST /api/save — save post
app.post('/api/save', (req, res) => {
  const { filename, content } = req.body;
  if (!filename || !content) return res.status(400).json({ error: 'Missing filename or content' });

  // Sanitize filename
  const safe = filename.replace(/[^a-z0-9\-]/g, '').toLowerCase();
  if (!safe) return res.status(400).json({ error: 'Invalid filename' });

  const existingPath = findPostBySlug(safe);
  if (existingPath) {
    fs.unlinkSync(existingPath); // Delete old one in case category changed
  }

  const category = getFirstCategory(content);
  const safeCategory = category.replace(/[^a-z0-9\-]/g, '').toLowerCase() || 'uncategorized';
  const newDir = path.join(POSTS_DIR, safeCategory);
  
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }
  
  const filePath = path.join(newDir, safe + '.md');
  fs.writeFileSync(filePath, content, 'utf8');
  res.json({ success: true, path: filePath, slug: safe });
});

// POST /api/delete — delete post
app.post('/api/delete', (req, res) => {
  const { slug } = req.body;
  const filePath = findPostBySlug(slug);
  if (!filePath) return res.status(404).json({ error: 'Not found' });
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n✅ Dashboard running at http://127.0.0.1:${PORT}\n`);
});
