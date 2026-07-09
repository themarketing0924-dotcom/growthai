import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteUrl = 'https://www.growthai.kr';
const today = new Date().toISOString().slice(0, 10);

function extractMatches(filePath, pattern) {
  const content = fs.readFileSync(filePath, 'utf8');
  const out = [];
  for (const match of content.matchAll(pattern)) {
    out.push(match[1]);
  }
  return out;
}

const staticRoutes = [
  '/',
  '/ceo',
  '/basics',
  '/gallery',
  '/live',
  '/partner',
  '/contact',
  '/enroll',
  '/blog',
  '/prompts',
  '/course/ai',
  '/course/bootcamp',
  '/course/monthly',
  '/course/vvip',
  '/product/ebook-writer',
];

const blogIds = extractMatches(path.join(root, 'src/pages/BlogPage.tsx'), /id:\s*(\d+),/g).map(id => `/blog/${id}`);
const toolSlugs = extractMatches(path.join(root, 'src/data/tools.ts'), /slug:\s*'([^']+)'/g).map(slug => `/tools/${slug}`);

const urls = [...new Set([...staticRoutes, ...blogIds, ...toolSlugs])].sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${siteUrl}${url}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`Generated sitemap with ${urls.length} URLs.`);
