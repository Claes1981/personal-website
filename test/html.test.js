import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readPage } from './helpers.js';

describe('HTML structure — index', () => {
  const html = readPage('index.html');

  it('has DOCTYPE', () => {
    assert.ok(html.startsWith('<!DOCTYPE html>'));
  });

  it('has html lang attribute', () => {
    assert.match(html, /<html lang="en">/);
  });

  it('has viewport meta tag', () => {
    assert.match(html, /<meta name="viewport"/);
  });

  it('links to stylesheet', () => {
    assert.match(html, /<link rel="stylesheet" href="\/css\/styles\.css">/);
  });

  it('has exactly one <main> element', () => {
    const matches = html.match(/<main[\s>]/g);
    assert.equal(matches?.length, 1);
  });

  it('has no nested <main> elements', () => {
    // Find the opening <main> tag end, then check no other <main> before </main>
    const mainStart = html.indexOf('<main');
    const mainTagEnd = html.indexOf('>', mainStart) + 1;
    const mainEnd = html.indexOf('</main>');
    const mainContent = html.slice(mainTagEnd, mainEnd);
    assert.ok(!mainContent.includes('<main'));
  });

  it('has a <footer> element', () => {
    assert.match(html, /<footer>/);
  });

  it('footer contains site name', () => {
    assert.match(html, /<footer>[\s\S]*Claes Fransson[\s\S]*<\/footer>/);
  });

  it('external links have rel="noopener"', () => {
    const extLinks = html.match(/<a\s+href="https?:[^"]+"[^>]*>/g) ?? [];
    for (const link of extLinks) {
      assert.ok(
        link.includes('rel="noopener"'),
        `External link missing rel="noopener": ${link}`
      );
    }
  });
});

describe('HTML structure — resume', () => {
  const html = readPage('resume/index.html');

  it('has exactly one <main> element', () => {
    const matches = html.match(/<main[\s>]/g);
    assert.equal(matches?.length, 1);
  });

  it('has no nested <main> elements', () => {
    const mainStart = html.indexOf('<main');
    const mainTagEnd = html.indexOf('>', mainStart) + 1;
    const mainEnd = html.indexOf('</main>');
    const mainContent = html.slice(mainTagEnd, mainEnd);
    assert.ok(!mainContent.includes('<main'));
  });

  it('external links have rel="noopener"', () => {
    const extLinks = html.match(/<a\s+href="https?:[^"]+"[^>]*>/g) ?? [];
    for (const link of extLinks) {
      assert.ok(
        link.includes('rel="noopener"'),
        `External link missing rel="noopener": ${link}`
      );
    }
  });

  it('all divs are properly closed', () => {
    const opens = (html.match(/<div[\s>]/g) ?? []).length;
    const closes = (html.match(/<\/div>/g) ?? []).length;
    assert.equal(opens, closes, `Expected ${opens} closing divs, found ${closes}`);
  });
});
