import fs from 'fs';
import path from 'path';

const postsDir = './src/data/post';

// Đọc tất cả files trong thư mục post
const files = fs.readdirSync(postsDir);

files.forEach((file) => {
  if (file.endsWith('.md')) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Tách frontmatter và content
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const bodyContent = frontmatterMatch[2];

      // Parse frontmatter hiện tại - kiểm tra xem đã convert chưa
      if (frontmatter.includes('publishDate:')) {
        console.log(`⚠ Skip (already converted): ${file}`);
        return;
      }

      // Parse original frontmatter
      const lines = frontmatter.split('\n').filter((line) => line.trim());
      let newFrontmatter = {};

      lines.forEach((line) => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          let value = line.substring(colonIndex + 1).trim();

          // Remove quotes if present
          if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
            value = value.slice(1, -1);
          }

          switch (key) {
            case 'title':
              newFrontmatter.title = value;
              break;
            case 'description':
              newFrontmatter.excerpt = value;
              break;
            case 'category':
              newFrontmatter.category = value.charAt(0).toUpperCase() + value.slice(1);
              break;
            case 'author':
              newFrontmatter.author = value;
              break;
            case 'pubDate':
              newFrontmatter.publishDate = convertDate(value);
              break;
            case 'heroImage':
              newFrontmatter.image = value.replace('../../assets/', '~/assets/');
              break;
            case 'series':
              newFrontmatter.tags = newFrontmatter.tags || [];
              newFrontmatter.tags.push(value);
              break;
            case 'chapter':
              newFrontmatter.tags = newFrontmatter.tags || [];
              newFrontmatter.tags.push(`chapter-${value}`);
              break;
            case 'tags':
              // Handle existing tags array
              if (value.startsWith('[') && value.endsWith(']')) {
                const tags = value
                  .slice(1, -1)
                  .split(',')
                  .map((t) => t.trim().replace(/['"]/g, ''));
                newFrontmatter.tags = (newFrontmatter.tags || []).concat(tags);
              }
              break;
          }
        }
      });

      // Set default values
      if (!newFrontmatter.publishDate) {
        newFrontmatter.publishDate = '2026-06-01T00:00:00Z';
      }
      if (!newFrontmatter.category) {
        newFrontmatter.category = 'News';
      }
      if (!newFrontmatter.author) {
        newFrontmatter.author = 'News Team';
      }

      // Build new frontmatter
      let newFrontmatterStr = '---\n';
      newFrontmatterStr += `publishDate: ${newFrontmatter.publishDate}\n`;
      newFrontmatterStr += `author: "${newFrontmatter.author}"\n`;
      newFrontmatterStr += `title: "${newFrontmatter.title}"\n`;
      if (newFrontmatter.excerpt) {
        newFrontmatterStr += `excerpt: "${newFrontmatter.excerpt}"\n`;
      }
      if (newFrontmatter.image) {
        newFrontmatterStr += `image: "${newFrontmatter.image}"\n`;
      }
      newFrontmatterStr += `category: ${newFrontmatter.category}\n`;
      if (newFrontmatter.tags && newFrontmatter.tags.length > 0) {
        newFrontmatterStr += `tags:\n`;
        newFrontmatter.tags.forEach((tag) => {
          if (tag) {
            newFrontmatterStr += `  - "${tag}"\n`;
          }
        });
      }
      newFrontmatterStr += '---\n';

      // Update image paths in content
      let updatedContent = bodyContent.replace(/\.\.\/\.\.\/assets\//g, '~/assets/');

      // Write back to file
      const finalContent = newFrontmatterStr + updatedContent;
      fs.writeFileSync(filePath, finalContent);

      console.log(`✓ Converted: ${file}`);
    }
  }
});

function convertDate(dateStr) {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  const parts = dateStr.split(' ');
  if (parts.length === 3) {
    const month = months[parts[0]] || '01';
    const day = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}T00:00:00Z`;
  }

  return '2026-06-01T00:00:00Z';
}

console.log('Conversion completed!');
