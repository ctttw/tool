import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://tyctw.github.io';

// Read App.tsx to get routes dynamically
const appPath = path.resolve(__dirname, '../src/App.tsx');
const appContent = fs.readFileSync(appPath, 'utf-8');

// Extract all <Route path="..." /> elements
const routeMatches = [...appContent.matchAll(/<Route (?:index )?path="([^"]+)"/g)];
// Also check for <Route index element={<Home />} />
const indexMatch = appContent.match(/<Route index element=/);

const paths = new Set();
if (indexMatch) {
  paths.add('/');
}

for (const match of routeMatches) {
  const routePath = match[1];
  if (routePath !== '/') {
    paths.add(`/${routePath}`);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(paths).map(routePath => {
  const urlPath = routePath === '/' ? '' : routePath;
  const priority = routePath === '/' ? '1.0' : (routePath === '/privacy' ? '0.5' : '0.8');
  
  return `  <url>
    <loc>${BASE_URL}${urlPath}</loc>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log(`Generated sitemap with ${paths.size} routes at public/sitemap.xml`);
