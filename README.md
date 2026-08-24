# Personal Website

A static personal website for **Claes Fransson** (Cloud Developer Student). It has a minimal landing page that links to a resume, and it's built with:

- **[Eleventy](https://www.11ty.dev/) 3** — static site generator
- **Nunjucks (`.njk`)** — templating
- **Plain CSS** — no JavaScript, no preprocessor

The site is fully static: after a build, the `_site/` folder is plain HTML/CSS you can deploy anywhere.

## Requirements

- **Node.js 18.20+** (any current LTS works)

## Getting started

```bash
npm install
```

## Build & run

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the static site into `_site/` |
| `npm start` | Builds and starts a dev server with live reload at <http://localhost:8080> |
| `npm test` | Runs the test suite (`node:test`, zero external dependencies) |

For day-to-day work, use `npm start` and open <http://localhost:8080>. Edits to templates and CSS reload the browser automatically. To check the production output, run `npm run build` and open `_site/index.html`.

> **Note:** the dev server runs on port **8080**. A static preview of `_site/` via a generic file server (e.g. Live Server on `5500`) also works for inspection, but `npm start` is the intended way to develop.

## Testing

The test suite in `test/` uses Node's built-in `node:test` runner — no frameworks, no dependencies. It validates the **built** output (HTML structure, content, CSS conventions) and the source templates. Always run `npm test` before considering a change complete:

```bash
npm test
```

## Project structure

```
personal-website/
├── .eleventy.js                    # Eleventy configuration
├── package.json
├── src/                            # Input directory
│   ├── _data/
│   │   └── site.json               # Site-wide data (name, tagline, social links)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk            # Base HTML layout (head, container, footer)
│   │   └── partials/
│   │       ├── hero.njk            # Shared <h1> title + tagline
│   │       └── social-links.njk    # Shared social links (GitHub / LinkedIn / Email)
│   ├── css/
│   │   └── styles.css              # All styles; colors live in :root custom properties
│   ├── index.njk                   # Landing page  ->  /
│   └── resume.njk                  # Resume page   ->  /resume/
└── test/                           # node:test suite (build, content, css, html, templates)
```

Eleventy reads from `src/` and writes to `_site/`. `src/css/` (and `src/js/`, if you add one) are **passthrough-copied** as-is. The current year is injected globally as `{{ year }}` for the footer.

## Editing the site

**Change site-wide info** (your name, tagline, social links) — edit `src/_data/site.json`:

```json
{
  "title": "Claes Fransson",
  "description": "Cloud Developer Student",
  "url": "https://claesf.se",
  "social": {
    "github": "https://github.com/Claes1981",
    "linkedin": "https://www.linkedin.com/in/claesfransson/",
    "email": "claes.v.fransson@gmail.com"
  }
}
```

**Landing page** — `src/index.njk` (Professional / Personal sections + social links).

**Resume** — `src/resume.njk` (summary, education, projects, experience, skills, languages).

**Styling** — `src/css/styles.css`.

## Extending the site

**Add a new page** — create a file in `src/`, e.g. `src/contact.njk`, with front matter. It automatically inherits the base layout and is included in the build:

```njk
---
layout: layouts/base.njk
title: Contact
permalink: /contact/
---

<header class="hero">
  {% include 'partials/hero.njk' %}
</header>

<main class="main-content">
  <section class="resume-section">
    <h2>Contact</h2>
    <p>...your content...</p>
  </section>
</main>
```

**Reuse a block** — create a partial in `src/_includes/partials/` and include it where needed:

```njk
{% include 'partials/social-links.njk' %}
```

**Add a data field** — put it in `src/_data/site.json` and reference it in any template. Because the data file is flat, use the `site.` prefix, e.g. `{{ site.social.github }}` (not `social.github`).

**Add colors** — define them once in the `:root` block of `styles.css` as `--color-*` custom properties and reference them with `var(--color-*)`. Never hardcode hex/`rgba()` values inside rules.

## Conventions & gotchas

- **Colors:** always use the `--color-*` custom properties from `:root`; don't hardcode hex or `rgba()` values in rules.
- **Front matter:** YAML keys must be **unindented** (no leading spaces) — indented keys break the build.
- **Data binding:** `site.json` is flat, so reference values as `site.social.github`, not `social.github`.
- **Partials:** reusable blocks live in `src/_includes/partials/` and are included as `{% include 'partials/name.njk' %}`.
- **Layout:** `base.njk` wraps page content in `<div class="container">` (not `<main>`). Each child page owns its own `<main>` element.
- **Validation:** run `npm test` before declaring work complete.

## Deploying

The output in `_site/` is static and can be published to any static host (GitHub Pages, Netlify, Vercel, a plain web server, etc.). Build locally with `npm run build`, then deploy the contents of `_site/`.
