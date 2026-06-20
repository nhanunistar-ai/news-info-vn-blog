// ── Prompt template (from prompt-hero.md) ──────────────────────────────────
const PROMPT_SUFFIX = `Shot on a Phase One XF IQ4 medium format camera, 85mm f/1.4 lens, dramatic high-contrast black and white photography, selective color treatment: entire image desaturated to monochrome except for specific accent details rendered in vibrant orange (#F15A28), ultra-sharp, cinematic lighting, deep shadows, fine grain texture, 16:9 aspect ratio, 4K resolution, editorial news photography style.`;

// ── State ──────────────────────────────────────────────────────────────────
let currentSlug = null;
let posts = [];

// ── DOM refs ───────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const fTitle    = $('f-title');
const fSlug     = $('f-slug');
const fExcerpt  = $('f-excerpt');
const fCategory = $('f-category');
const fTags     = $('f-tags');
const fAuthor   = $('f-author');
const fDate     = $('f-date');
const fImage    = $('f-image');
const fContent  = $('f-content');
const fPromptSubject = $('f-prompt-subject');

// ── Helpers ────────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function toast(msg, type = 'success') {
  const el = $('toast');
  el.textContent = msg;
  el.className = `show ${type}`;
  setTimeout(() => { el.className = ''; }, 2500);
}

function getCategories() {
  return Array.from(fCategory.selectedOptions).map(o => o.value);
}

function setCategories(vals) {
  Array.from(fCategory.options).forEach(o => {
    o.selected = vals.includes(o.value);
  });
}

function nowISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

// ── Frontmatter builder ────────────────────────────────────────────────────
function buildFrontmatter() {
  const cats = getCategories();
  const catStr = cats.length === 1
    ? `'${cats[0]}'`
    : `[${cats.map(c => `'${c}'`).join(', ')}]`;

  const tags = fTags.value.trim()
    ? fTags.value.split(',').map(t => `'${t.trim()}'`).join(', ')
    : '';

  const date = fDate.value
    ? new Date(fDate.value).toISOString()
    : new Date().toISOString();

  const image = fImage.value.trim() || `~/assets/images/${fSlug.value || 'hero'}.webp`;

  return `---
title: '${fTitle.value.replace(/'/g, "\\'")}'
excerpt: '${fExcerpt.value.replace(/'/g, "\\'")}'
category: ${catStr}
tags: [${tags}]
author: '${fAuthor.value}'
publishDate: ${date}
image: '${image}'
---`;
}

function updateFrontmatterPreview() {
  $('frontmatter-preview').textContent = buildFrontmatter();
}

// ── Post list ──────────────────────────────────────────────────────────────
async function loadPostList() {
  const res = await fetch('/api/posts');
  posts = await res.json();
  renderPostList(posts);
}

function renderPostList(list) {
  const ul = $('post-list');
  ul.innerHTML = '';
  list.forEach(p => {
    const li = document.createElement('li');
    li.dataset.slug = p.slug;
    // Extract title from slug for display
    const display = p.slug.replace(/-/g, ' ');
    li.innerHTML = `<span class="post-title">${display}</span><span class="post-slug">${p.slug}</span>`;
    if (p.slug === currentSlug) li.classList.add('active');
    li.addEventListener('click', () => openPost(p.slug));
    ul.appendChild(li);
  });
}

// ── Open post ──────────────────────────────────────────────────────────────
async function openPost(slug) {
  currentSlug = slug;
  const res = await fetch(`/api/posts/${slug}`);
  if (!res.ok) { toast('Không tìm được bài', 'error'); return; }
  const { content } = await res.json();

  // Parse frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (fmMatch) {
    const fm = fmMatch[1];
    const body = fmMatch[2];

    fTitle.value    = extractFm(fm, 'title');
    fExcerpt.value  = extractFm(fm, 'excerpt');
    fAuthor.value   = extractFm(fm, 'author') || 'Tuan Kiet';
    fImage.value    = extractFm(fm, 'image');
    fContent.value  = body.trimStart();

    // Tags
    const tagsRaw = fm.match(/^tags:\s*\[(.*)\]/m);
    if (tagsRaw) {
      fTags.value = tagsRaw[1].replace(/'/g, '').replace(/"/g, '');
    } else { fTags.value = ''; }

    // Date
    const dateRaw = extractFm(fm, 'publishDate');
    if (dateRaw) {
      const d = new Date(dateRaw);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      fDate.value = d.toISOString().slice(0, 16);
    }

    // Category
    const catRaw = fm.match(/^category:\s*(.+)$/m);
    if (catRaw) {
      const raw = catRaw[1].trim();
      const cats = raw.startsWith('[')
        ? raw.slice(1, -1).split(',').map(s => s.trim().replace(/'/g, '').replace(/"/g, ''))
        : [raw.replace(/'/g, '').replace(/"/g, '')];
      setCategories(cats);
    }
  } else {
    fContent.value = content;
  }

  fSlug.value = slug;

  // Update UI
  document.querySelectorAll('#post-list li').forEach(li => {
    li.classList.toggle('active', li.dataset.slug === slug);
  });

  $('save-status').textContent = '';
  updateFrontmatterPreview();
}

function extractFm(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*'?(.*?)'?$`, 'm'));
  return m ? m[1].trim() : '';
}

// ── New post ───────────────────────────────────────────────────────────────
function newPost() {
  currentSlug = null;
  fTitle.value = '';
  fSlug.value = '';
  fExcerpt.value = '';
  fTags.value = '';
  fAuthor.value = 'Tuan Kiet';
  fDate.value = nowISO();
  fImage.value = '';
  fContent.value = '';
  fPromptSubject.value = '';
  $('prompt-output').value = '';
  setCategories(['study']);
  $('save-status').textContent = '';
  updateFrontmatterPreview();
  document.querySelectorAll('#post-list li').forEach(li => li.classList.remove('active'));
  fTitle.focus();
}

// ── Save ───────────────────────────────────────────────────────────────────
async function savePost() {
  const title = fTitle.value.trim();
  if (!title) { toast('Thiếu title!', 'error'); return; }

  let slug = fSlug.value.trim() || slugify(title);
  fSlug.value = slug;

  const fm = buildFrontmatter();
  const body = fContent.value;
  const full = fm + '\n\n' + body;

  const res = await fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: slug, content: full }),
  });

  const data = await res.json();
  if (data.success) {
    currentSlug = data.slug;
    $('save-status').textContent = '✓ Đã lưu';
    setTimeout(() => { $('save-status').textContent = ''; }, 3000);
    toast(`Đã lưu: ${data.slug}.md`);
    await loadPostList();
    renderPostList(posts);
    document.querySelectorAll('#post-list li').forEach(li => {
      li.classList.toggle('active', li.dataset.slug === currentSlug);
    });
  } else {
    toast(data.error || 'Lỗi khi lưu', 'error');
  }
}

// ── Delete ─────────────────────────────────────────────────────────────────
async function deletePost() {
  if (!currentSlug) { toast('Chưa chọn bài nào', 'error'); return; }
  if (!confirm(`Xóa bài "${currentSlug}"?`)) return;

  const res = await fetch('/api/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug: currentSlug }),
  });
  const data = await res.json();
  if (data.success) {
    toast('Đã xóa bài');
    newPost();
    await loadPostList();
  } else {
    toast(data.error || 'Lỗi xóa', 'error');
  }
}

// ── Generate Image Prompt ──────────────────────────────────────────────────
function generatePrompt() {
  const title    = fTitle.value.trim();
  const excerpt  = fExcerpt.value.trim();
  const subject  = fPromptSubject.value.trim();

  // Build subject from user input or auto-derive from title+excerpt
  let subjectLine = subject;
  if (!subjectLine && title) {
    subjectLine = `A photorealistic, dramatic visual representation of "${title}". ${excerpt ? excerpt.slice(0, 120) : ''}`;
  }

  if (!subjectLine) {
    toast('Nhập title hoặc subject line trước', 'error');
    return;
  }

  const prompt = `${subjectLine} ${PROMPT_SUFFIX}`;
  $('prompt-output').value = prompt;
  toast('Prompt đã tạo!');
}

// ── Copy helpers ───────────────────────────────────────────────────────────
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    toast(`Đã copy ${label}`);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    toast(`Đã copy ${label}`);
  });
}

// ── Markdown snippets ──────────────────────────────────────────────────────
function insertSnippet(snippet) {
  const ta = fContent;
  const start = ta.selectionStart;
  const end   = ta.selectionEnd;
  const before = ta.value.slice(0, start);
  const after  = ta.value.slice(end);
  ta.value = before + snippet + after;
  ta.selectionStart = ta.selectionEnd = start + snippet.length;
  ta.focus();
}

// ── Search ─────────────────────────────────────────────────────────────────
$('search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  const filtered = posts.filter(p => p.slug.includes(q));
  renderPostList(filtered);
});

// ── Auto-slug from title ───────────────────────────────────────────────────
fTitle.addEventListener('input', () => {
  if (!currentSlug) {
    fSlug.value = slugify(fTitle.value);
  }
  updateFrontmatterPreview();
});

// ── Live frontmatter update ────────────────────────────────────────────────
[fExcerpt, fTags, fAuthor, fDate, fImage, fCategory, fSlug].forEach(el => {
  el.addEventListener('change', updateFrontmatterPreview);
  el.addEventListener('input', updateFrontmatterPreview);
});

// ── Button events ──────────────────────────────────────────────────────────
$('btn-new').addEventListener('click', newPost);
$('btn-save').addEventListener('click', savePost);
$('btn-delete').addEventListener('click', deletePost);
$('btn-gen-prompt').addEventListener('click', generatePrompt);
$('btn-copy-prompt').addEventListener('click', () => {
  copyToClipboard($('prompt-output').value, 'prompt');
});
$('btn-copy-fm').addEventListener('click', () => {
  copyToClipboard($('frontmatter-preview').textContent, 'frontmatter');
});

// ── Keyboard shortcut: Ctrl+S ──────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    savePost();
  }
});

// ── Init ───────────────────────────────────────────────────────────────────
(async () => {
  fDate.value = nowISO();
  setCategories(['study']);
  await loadPostList();
  updateFrontmatterPreview();
})();
