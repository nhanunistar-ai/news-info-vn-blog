import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '..', 'src', 'data', 'post');

function fixImagePaths(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fixImagePaths(filePath);
    } else if (file.endsWith('.md')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('../../assets/images/')) {
        // Change from ../../ to ../../../ because it's now in a subdirectory
        content = content.replace(/\.\.\/\.\.\/assets\/images\//g, '../../../assets/images/');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', filePath);
      }
    }
  }
}

fixImagePaths(POSTS_DIR);
console.log('Done fixing image paths.');
