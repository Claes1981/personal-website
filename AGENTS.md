# AGENTS.md — Personal Website

**Generated:** 2026-06-30

## OVERVIEW

Project: **Claes Fransson — Personal Website**
Stack: Eleventy 3.1.2, Nunjucks templates, CSS (no JS), ES Modules

## STRUCTURE

```
/
├── _site/              # Build output (ignore)
├── src/
│   ├── _data/
│   │   └── site.json   # Site metadata + social links
│   ├── _includes/
│   │   └── layouts/
│   │       └── base.njk   # Base HTML layout
│   ├── css/
│   │   └── styles.css     # Global styles
│   ├── js/                # Empty (no JS yet)
│   ├── index.njk          # Home page (permalink: /)
│   └── resume.njk         # Resume page (permalink: /resume/)
├── .eleventy.js        # Eleventy config
└── package.json
```

## COMMANDS

| Action  | Command            | Notes                        |
|---------|--------------------|------------------------------|
| Install | `npm install`      | Only dep: @11ty/eleventy     |
| Start   | `npm run start`    | Live reload at :8080         |
| Build   | `npm run build`    | Production build to _site/   |
| Test    | *(none)*           | No test framework configured |

## CODING STANDARDS

- **Language:** Nunjucks templates (`.njk`), CSS, ES Modules
- **Style:** 2-space indentation, semantic HTML, CSS classes for styling
- **Data:** Site config in `src/_data/site.json` (site title, description, social links)
- **Layouts:** All pages extend `src/_includes/layouts/base.njk`
- **Permalinks:** Set in frontmatter (`permalink: /` and `permalink: /resume/`)

## WHERE TO LOOK

- **Source:** `src/`
- **Config:** `.eleventy.js`, `src/_data/site.json`
- **Layouts:** `src/_includes/layouts/`
- **Styles:** `src/css/styles.css`

## NOTES

- No JavaScript currently used
- CSS is plain (no preprocessor)
- Social links and site metadata centralized in `site.json`
- Resume page contains education, work experience, skills, and languages
