import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readSource, readJson } from './helpers.js';

describe('source templates', () => {
  it('site.json has required keys', () => {
    const site = readJson('_data/site.json');
    assert.ok(site.title, 'Missing title');
    assert.ok(site.description, 'Missing description');
    assert.ok(site.social, 'Missing social');
    assert.ok(site.social.github, 'Missing social.github');
    assert.ok(site.social.linkedin, 'Missing social.linkedin');
    assert.ok(site.social.email, 'Missing social.email');
  });

  it('index.njk has unindented frontmatter', () => {
    const src = readSource('index.njk');
    const lines = src.split('\n');
    // Lines between first --- and second --- should not start with whitespace
    assert.equal(lines[0], '---');
    const endIdx = lines.indexOf('---', 1);
    assert.ok(endIdx > 0, 'No closing --- found');
    for (let i = 1; i < endIdx; i++) {
      assert.ok(
        !lines[i].startsWith(' ') && !lines[i].startsWith('\t'),
        `Frontmatter line ${i + 1} is indented: "${lines[i]}"`
      );
    }
  });

  it('resume.njk has unindented frontmatter', () => {
    const src = readSource('resume.njk');
    const lines = src.split('\n');
    assert.equal(lines[0], '---');
    const endIdx = lines.indexOf('---', 1);
    assert.ok(endIdx > 0, 'No closing --- found');
    for (let i = 1; i < endIdx; i++) {
      assert.ok(
        !lines[i].startsWith(' ') && !lines[i].startsWith('\t'),
        `Frontmatter line ${i + 1} is indented: "${lines[i]}"`
      );
    }
  });

  it('base.njk uses <div class="container"> not <main>', () => {
    const src = readSource('_includes/layouts/base.njk');
    assert.ok(src.includes('<div class="container">'));
    assert.ok(!src.includes('<main class="container">'));
  });

  it('social-links partial uses site.social.* data binding', () => {
    const src = readSource('_includes/partials/social-links.njk');
    assert.ok(src.includes('site.social.github'));
    assert.ok(src.includes('site.social.linkedin'));
    assert.ok(src.includes('site.social.email'));
    // Should NOT use the old broken binding (social.github without site. prefix)
    assert.ok(!/[^.\w]social\.github/.test(src));
    assert.ok(!/[^.\w]social\.linkedin/.test(src));
  });

  it('index.njk includes social-links partial', () => {
    const src = readSource('index.njk');
    assert.match(src, /{% include 'partials\/social-links\.njk' %}/);
  });

  it('resume.njk includes social-links partial', () => {
    const src = readSource('resume.njk');
    assert.match(src, /{% include 'partials\/social-links\.njk' %}/);
  });
});
