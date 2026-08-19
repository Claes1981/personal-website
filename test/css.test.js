import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureBuilt, readPage } from './helpers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = join(__dirname, '..', '_site');

describe('CSS conventions', () => {
  let css;

  it('has :root custom properties block', () => {
    ensureBuilt();
    css = readFileSync(join(siteDir, 'css', 'styles.css'), 'utf-8');
    assert.match(css, /:root\s*{/);
  });

  it('defines expected color variables', () => {
    const expected = [
      '--color-primary',
      '--color-dark',
      '--color-medium',
      '--color-muted',
      '--color-text',
      '--color-text-light',
      '--color-bg',
      '--color-bg-card',
      '--color-white',
      '--color-notice-bg',
      '--color-border',
    ];
    for (const name of expected) {
      assert.ok(css.includes(name), `Missing custom property: ${name}`);
    }
  });

  it('uses var() references for colors', () => {
    const varRefs = (css.match(/var\(--color-[\w-]+\)/g) ?? []).length;
    assert.ok(varRefs >= 10, `Expected at least 10 var() references, found ${varRefs}`);
  });

  it('has no unused .intro class', () => {
    assert.ok(!css.includes('.intro'), 'Found unused .intro class');
  });

  it('has responsive media query', () => {
    assert.match(css, /@media/);
  });
});

describe('CSS — classes used in HTML are defined', () => {
  let css;
  let home;
  let resume;

  it('all HTML classes exist in CSS', () => {
    ensureBuilt();
    css = readFileSync(join(siteDir, 'css', 'styles.css'), 'utf-8');
    home = readPage('index.html');
    resume = readPage('resume/index.html');

    // Extract all class names from HTML
    const allHtml = home + resume;
    const classNames = new Set();
    const classAttrRe = /class="([^"]+)"/g;
    let match;
    while ((match = classAttrRe.exec(allHtml)) !== null) {
      for (const cls of match[1].split(/\s+/)) {
        if (cls) classNames.add(cls);
      }
    }

    // Check each class is defined in CSS (skip common utilities)
    const missing = [...classNames].filter(
      (cls) => !css.includes(`.${cls}`) && !css.includes(cls)
    );
    // Structural/semantic classes that don't need explicit CSS rules
    const allowlisted = new Set([
      'summary', 'education-item', 'institution', 'course-list',
      'credits', 'experience-item', 'skills-grid', 'skill-category',
    ]);
    const unexpected = missing.filter((c) => !allowlisted.has(c));
    assert.equal(
      unexpected.length,
      0,
      `Classes in HTML but not in CSS: ${unexpected.join(', ')}`
    );
  });
});
