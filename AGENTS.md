Personal website — Eleventy 3, Nunjucks, CSS only. No JS, no preprocessor.

## Conventions

- Colors: use `:root` custom properties; never hardcode hex values in CSS
- Frontmatter: YAML keys MUST be unindented (no leading spaces) — indented keys break the build
- Data binding: `src/_data/site.json` is flat — use `site.social.github`, not `social.github`
- Partials: reusable blocks in `src/_includes/partials/`, included as `{% include 'partials/name.njk' %}`
- Layout: `base.njk` wraps content in `<div class="container">` (not `<main>`) — child pages own their `<main>`

## Validation

- Run `npm test` (node:test, zero deps) before declaring work complete
