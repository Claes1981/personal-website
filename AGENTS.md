# Agent Instructions

This is an Eleventy (11ty) static site generator project with Node.js.

## Project Structure

```
/
├── _site/              # Build output (ignore)
├── src/                # Source files (recommended)
│   ├── _data/          # JSON/YAML data files
│   ├── _includes/      # Template partials and layouts
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   └── pages/          # Page templates
├── .eleventy.js        # Eleventy configuration
├── package.json        # Node.js dependencies
└── ...
```

## Commands

### Development
```bash
npm run start          # Build and serve with live reload at http://localhost:8080
npm run build          # Build for production to _site/
```

### Testing
No test framework configured. To add tests:
- Install Jest: `npm install --save-dev jest`
- Run tests: `npm test`
- Run single test: `npm test -- -t "test name"`

### Linting
No linter configured. Recommended setup:
- Install ESLint: `npm install --save-dev eslint`
- Run lint: `npm run lint`
- Auto-fix: `npm run lint -- --fix`

## Code Style Guidelines

### JavaScript (Node.js)
- Use ES6+ syntax (const/let, arrow functions, async/await)
- Prefer const over let; only use var if necessary for hoisting
- Use single quotes for strings: `const name = 'value';`
- Semicolons are required
- Maximum line length: 100 characters
- Use 2-space indentation
- No trailing whitespace

### Imports
```javascript
// Node.js modules
const path = require('path');

// ES modules (if using "type": "module")
import eleventyConfig from './.eleventy.js';

// Import Eleventy plugins
import PluginName from '@11ty/eleventy-plugin-name';
```

### Naming Conventions
- Files: kebab-case (`my-template.njk`, `utility-function.js`)
- Variables/Functions: camelCase (`const myVariable =`)
- Classes: PascalCase (`class MyComponent`)
- Constants: UPPER_SNAKE_CASE (`const MAX_SIZE =`)
- Eleventy data files: kebab-case or camelCase (`site.json`, `userData.yaml`)

### Eleventy Configuration
- Place config in `.eleventy.js` at project root
- Export a function that receives the config object
- Use passthrough copy for static assets
- Configure template formats and extensions

Example:
```javascript
export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk'
  };
}
```

### Templates (Nunjucks)
- Use `.njk` extension for Nunjucks templates
- Extend layouts: `{% extends "layouts/base.njk" %}`
- Include partials: `{% include "partials/header.njk" %}`
- Access data: `{{ site.title }}`, `{{ collections.posts }}`
- Use `{%- -%}` for whitespace control

### Markdown
- Use frontmatter for page data
- Support HTML and shortcodes
- Link to other pages with collection data

Example:
```yaml
---
layout: layouts/post.njk
title: My Post
date: 2024-01-01
tags: [blog]
---
Content here...
```

### CSS
- Use BEM naming convention: `.block__element--modifier`
- Organize by feature/component
- Consider using a preprocessor (Sass/Less)
- Place in `src/css/` directory

### Error Handling
- Use try/catch for async operations
- Log errors with context
- Fail gracefully in template filters

```javascript
eleventyConfig.addFilter('safeFilter', (input) => {
  try {
    return transform(input);
  } catch (error) {
    console.error('Filter error:', error);
    return input; // Return original on failure
  }
});
```

### Collections
- Auto-created from tags or directory structure
- Access via `collections.tagName` in templates
- Use `eleventyExcludeFromCollections: true` for non-collection pages

### Permalinks
- Define in frontmatter or config
- Use template strings: `permalink: "/blog/{{ page.date | dateToISODate }}/{{ title | slugify }}/"`

### Plugins
- Install via npm: `npm install --save-dev @11ty/eleventy-plugin-name`
- Register in `.eleventy.js`: `config.addPlugin(PluginName);`
- Common plugins: syntaxHighlight, rss, image, minify

## Best Practices

1. Keep templates DRY with layouts and includes
2. Use data cascading for shared content
3. Optimize images before build
4. Minify CSS/JS in production
5. Use environment variables for config via `.env`
6. Document custom filters and tags
7. Version control everything except `_site/` and `node_modules/`

## Common Tasks

### Add a new page type
1. Create layout in `_includes/layouts/`
2. Create page template with frontmatter
3. Add to appropriate collection via tags

### Add a custom filter
```javascript
// .eleventy.js
eleventyConfig.addFilter('capitalize', (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
});
```

### Add shortcodes
```javascript
// Raw shortcode
eleventyConfig.addShortcode('siteUrl', () => process.env.SITE_URL);

// Paired shortcode
eleventyConfig.addPairedShortcode('highlight', (content) => {
  return `<mark>${content}</mark>`;
});
```
