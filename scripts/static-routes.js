import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { projects } from '../src/projects.js';

const html = await readFile('dist/index.html', 'utf8');
// Old image URLs stay valid for visitors still running a cached earlier page.
const legacyImages = { 'd03-1': 'd03-1-full', 'd04-3': 'd04-3-full' };
for (const [oldName, fullName] of Object.entries(legacyImages)) {
  await copyFile(`dist/images/${fullName}.webp`, `dist/images/${oldName}.webp`);
  for (const size of [240, 480, 800]) {
    await copyFile(`dist/images/previews/${fullName}-${size}.webp`, `dist/images/previews/${oldName}-${size}.webp`);
  }
}
const routes = ['work', 'about', ...projects.map(p => `work/${p.id}`)];
for (const route of routes) {
  await mkdir(`dist/${route}`, { recursive: true });
  const project = projects.find(p => route === `work/${p.id}`);
  const content = project ? html.replace('<title>ZHANG TAO — Selected Works</title>', `<title>${project.title} — ZHANG TAO</title>`) : html;
  await writeFile(`dist/${route}/index.html`, content);
}
await writeFile('dist/404.html', html);
await writeFile('dist/.nojekyll', '');
console.log(`Generated ${routes.length} static routes for direct links and refreshes.`);
