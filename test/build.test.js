import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureBuilt } from './helpers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = join(__dirname, '..', '_site');

describe('build output', () => {
  before(() => {
    ensureBuilt();
  });

  it('produces index.html', () => {
    assert.ok(existsSync(join(siteDir, 'index.html')));
  });

  it('produces resume/index.html', () => {
    assert.ok(existsSync(join(siteDir, 'resume', 'index.html')));
  });

  it('copies CSS to _site/css/styles.css', () => {
    assert.ok(existsSync(join(siteDir, 'css', 'styles.css')));
  });

  it('index.html is non-empty', () => {
    const content = readFileSync(join(siteDir, 'index.html'), 'utf-8');
    assert.ok(content.length > 100);
  });

  it('resume/index.html is non-empty', () => {
    const content = readFileSync(join(siteDir, 'resume', 'index.html'), 'utf-8');
    assert.ok(content.length > 500);
  });
});
