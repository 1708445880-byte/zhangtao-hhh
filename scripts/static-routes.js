import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { projects } from '../src/projects.js';

const html = await readFile('dist/index.html', 'utf8');
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
