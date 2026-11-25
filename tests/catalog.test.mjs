import test from 'node:test';
import assert from 'node:assert/strict';
import { tools, categories } from '../src/data/tools.ts';
import { toolDescriptions } from '../src/data/tool-descriptions.ts';
test('the catalog has 15 unique tools assigned to existing categories', () => {
 assert.equal(tools.length, 15);
 assert.equal(new Set(tools.map(tool => tool.slug)).size, 15);
 for (const tool of tools) assert.ok(categories.some(category => category.slug === tool.category));
});
test('every tool has a purpose, instructions, and interpretation', () => {
 assert.deepEqual(Object.keys(toolDescriptions).sort(), tools.map(tool => tool.slug).sort());
 for (const tool of tools) for (const text of Object.values(toolDescriptions[tool.slug])) assert.ok(text.trim().length > 30);
});
