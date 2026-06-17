import fs from 'fs';
import path from 'path';

const SRC_DIR = 'd:/news.info.vn/src/content/blog';
const DEST_DIR = 'd:/news.info.vn/astrowind-theme/src/data/post';

const SRC_ASSETS_DIR = 'd:/news.info.vn/src/assets';
const DEST_ASSETS_DIR = 'd:/news.info.vn/astrowind-theme/src/assets/images';

// Copy all assets
function copyAssets() {
    if (!fs.existsSync(DEST_ASSETS_DIR)) {
        fs.mkdirSync(DEST_ASSETS_DIR, { recursive: true });
    }
    const files = fs.readdirSync(SRC_ASSETS_DIR);
    for (const file of files) {
        const srcPath = path.join(SRC_ASSETS_DIR, file);
        const destPath = path.join(DEST_ASSETS_DIR, file);
        if (fs.statSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
        }
    }
    console.log('Assets copied successfully.');
}

// Migrate posts
function migratePosts() {
    if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR, { recursive: true });
    }
    const files = fs.readdirSync(SRC_DIR);
    for (const file of files) {
        if (!file.endsWith('.md')) continue;
        const srcPath = path.join(SRC_DIR, file);
        const destPath = path.join(DEST_DIR, file);
        let content = fs.readFileSync(srcPath, 'utf8');
        
        // Match frontmatter block
        const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
        const match = content.match(frontmatterRegex);
        
        if (match) {
            let fm = match[1];
            // Replacements
            fm = fm.replace(/^pubDate:/m, 'publishDate:');
            fm = fm.replace(/^updatedDate:/m, 'updateDate:');
            fm = fm.replace(/^description:/m, 'excerpt:');
            fm = fm.replace(/^heroImage:\s*['"]?\.\.\/\.\.\/assets\/(.+?)['"]?$/m, "image: '~/assets/images/$1'");
            
            content = content.replace(frontmatterRegex, `---\n${fm}\n---`);
        }
        
        fs.writeFileSync(destPath, content);
    }
    console.log('Posts migrated successfully.');
}

copyAssets();
migratePosts();
