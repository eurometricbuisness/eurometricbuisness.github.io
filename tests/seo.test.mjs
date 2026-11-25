import test from 'node:test';
import assert from 'node:assert/strict';
import { tools, categories } from '../src/data/tools.ts';
import { indexedTools, indexedCategories, shouldIndexTool, primarySite } from '../src/data/seo.ts';

test('searchable pages are unique, exist in the catalog, and use the primary site', () => {
 assert.equal(primarySite, 'https://eurometricbuisness.github.io');
 assert.equal(new Set(indexedTools).size, indexedTools.length);
 assert.equal(new Set(indexedCategories).size, indexedCategories.length);
 for (const slug of indexedTools) assert.ok(tools.some(tool => tool.slug === slug), slug);
 for (const slug of indexedCategories) assert.ok(categories.some(category => category.slug === slug), slug);
 for (const slug of ['sueldo-bruto-a-neto', 'indemnizacion-por-despido', 'finiquito', 'calculadora-irpf', 'cuota-autonomos']) assert.equal(shouldIndexTool(slug), false);
});
