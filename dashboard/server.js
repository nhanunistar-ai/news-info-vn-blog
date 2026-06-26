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

// GET /api/posts — list existing posts
app.get('/api/posts', (_req, res) => {
  try {
    const files = fs.readdirSync(POSTS_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => ({
        filename: f,
        slug: f.replace('.md', ''),
      }))
      .sort((a, b) => b.filename.localeCompare(a.filename));
    res.json(files);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/posts/:slug — load existing post
app.get('/api/posts/:slug', (req, res) => {
  const filePath = path.join(POSTS_DIR, req.params.slug + '.md');
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
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

  const filePath = path.join(POSTS_DIR, safe + '.md');
  fs.writeFileSync(filePath, content, 'utf8');
  res.json({ success: true, path: filePath, slug: safe });
});

// POST /api/delete — delete post
app.post('/api/delete', (req, res) => {
  const { slug } = req.body;
  const filePath = path.join(POSTS_DIR, slug + '.md');
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
  fs.unlinkSync(filePath);
  res.json({ success: true });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n✅ Dashboard running at http://127.0.0.1:${PORT}\n`);
});
