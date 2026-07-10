import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '..', 'src', 'data', 'post');

function getFirstCategory(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return 'uncategorized';

  const fm = fmMatch[1];
  const catRaw = fm.match(/^category:\s*(.+)$/m);
  
  if (!catRaw) return 'uncategorized';
  
  const raw = catRaw[1].trim();
  if (raw.startsWith('[')) {
    // Array format: ['study', 'news']
    const categories = raw.slice(1, -1).split(',').map(s => s.trim().replace(/'/g, '').replace(/"/g, ''));
    return categories[0] || 'uncategorized';
  } else {
    // String format: 'study'
    return raw.replace(/'/g, '').replace(/"/g, '');
  }
}

async function migrate() {
  console.log(`Bắt đầu migration thư mục: ${POSTS_DIR}`);
  
  if (!fs.existsSync(POSTS_DIR)) {
    console.error('Không tìm thấy thư mục posts!');
    process.exit(1);
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  console.log(`Tìm thấy ${files.length} bài viết.`);

  let count = 0;
  
  for (const file of files) {
    const oldPath = path.join(POSTS_DIR, file);
    
    // Đảm bảo không xử lý nhầm thư mục
    if (fs.statSync(oldPath).isDirectory()) continue;
    
    const content = fs.readFileSync(oldPath, 'utf8');
    const category = getFirstCategory(content);
    
    // Lọc tên category cho an toàn (loại bỏ ký tự lạ)
    const safeCategory = category.replace(/[^a-z0-9\-]/g, '').toLowerCase() || 'uncategorized';
    
    const newDir = path.join(POSTS_DIR, safeCategory);
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
      console.log(`Tạo thư mục mới: ${safeCategory}/`);
    }
    
    const newPath = path.join(newDir, file);
    fs.renameSync(oldPath, newPath);
    count++;
  }

  console.log(`\nHoàn thành! Đã di chuyển ${count} bài viết vào các thư mục category.`);
}

migrate();
