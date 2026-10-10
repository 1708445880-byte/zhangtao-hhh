import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { projects } from '../src/projects.js';

// This inventory comes from every embedded image in the supplied 36-page PDF,
// including pages without a title. It is independent of the project galleries.
const inventory = JSON.parse(readFileSync(new URL('../content/pdf-image-map.json', import.meta.url)));
const previews = JSON.parse(readFileSync(new URL('../src/image-manifest.json', import.meta.url)));
const publicDirectory = new URL('../public/', import.meta.url);
const portrait = '/images/c02-1.webp';
assert.equal(inventory.pages.length, inventory.page_count);
assert.deepEqual(inventory.pages.map(page => page.page), Array.from({ length: 36 }, (_, i) => i + 1));
const expected = inventory.pages.flatMap(page => page.images.map(image => image.path));
assert.equal(new Set(expected).size, expected.length, 'Duplicate paths in PDF inventory');
const galleryImages = projects.flatMap(project => project.images);
const displayed = new Set([...galleryImages, portrait]);
for (const page of inventory.pages) {
  for (const image of page.images) {
    assert(displayed.has(image.path), `PDF page ${page.page}: image omitted from the site: ${image.path}`);
    assert(existsSync(new URL(image.path.slice(1), publicDirectory)), `Original image missing: ${image.path}`);
    assert.equal(createHash('sha256').update(readFileSync(new URL(image.path.slice(1), publicDirectory))).digest('hex'), image.website_sha256, `Original image changed: ${image.path}`);
    assert(previews[image.path], `Responsive preview manifest missing: ${image.path}`);
    assert.equal(previews[image.path].variants.length, 3);
    for (const variant of previews[image.path].variants) {
      assert(existsSync(new URL(variant.path.slice(1), publicDirectory)), `Preview missing: ${variant.path}`);
    }
  }
}
assert.equal(galleryImages.length, new Set(galleryImages).size, 'An image is assigned to multiple gallery entries');
assert.deepEqual([...displayed].sort(), expected.slice().sort(), 'Gallery and PDF inventory differ');
assert.deepEqual(readdirSync(new URL('images/', publicDirectory)).filter(name => name.endsWith('.webp')).map(name => '/images/' + name).sort(), expected.slice().sort(), 'An extracted original image is absent from the inventory');
for (const project of projects) assert(project.images.includes(project.cover), `Cover is outside its gallery: ${project.id}`);
assert.equal(projects.find(project => project.id === 'guangan-night').images.length, 18, 'Boat tour must include all images on PDF pages 15–19');
assert.equal(projects.find(project => project.id === 'poetry-in-light').images.length, 12, 'Light show must include the page 23 lighting plans');
assert.equal(projects.find(project => project.id === 'victory-of-justice').images.length, 12, 'Performance must include all images on pages 24–26');
console.log(`PASS: all ${expected.length} PDF images accounted for: ${galleryImages.length} gallery images and 1 portrait; ${projects.length} projects; every original and responsive preview exists.`);
