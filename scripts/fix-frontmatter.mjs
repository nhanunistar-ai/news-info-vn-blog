import fs from 'fs';
import path from 'path';

const postsDir = './src/data/post';
const files = fs.readdirSync(postsDir);

let fixedCount = 0;

files.forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if frontmatter is properly closed
    const lines = content.split('\n');
    let frontmatterEnd = -1;
    let started = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === '---') {
        if (!started) {
          started = true;
        } else {
          frontmatterEnd = i;
          break;
        }
      }
    }
    
    // If frontmatter not properly closed
    if (started && frontmatterEnd === -1) {
      // Find where content starts (first non-frontmatter line)
      let contentStart = -1;
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line.includes(':') || line.startsWith('#') || line.startsWith('>')) {
          contentStart = i;
          break;
        }
      }
      
      if (contentStart > 1) {
        // Insert closing --- before content
        lines.splice(contentStart, 0, '---');
        const newContent = lines.join('\n');
        fs.writeFileSync(filePath, newContent);
        fixedCount++;
        console.log(`✓ Fixed: ${file}`);
      }
    }
  }
});

console.log(`Fixed ${fixedCount} files.`);