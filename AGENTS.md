# Leonardo Macchiarini — Portfolio

## Project

Static portfolio site for Leonardo Macchiarini, product designer based in Florence, Italy.
Five pages, no build step, no framework, no package manager: plain HTML, CSS and vanilla
JavaScript, with GSAP, ScrollTrigger and Lenis vendored in `assets/vendor/`.

## Pages

| File | Section | Notes |
| --- | --- | --- |
| `index.html` | Landing | Full-screen intro, links to the four sections |
| `about.html` | 01 — About me | Bio, education, skills, languages |
| `cv.html` | 02 — CV | Full CV inline, same design system |
| `projects.html` | 03 — My projects | SHOCK!, ELIO, Silky Skin, Bat-wing; full-screen sections + lightbox |
| `contacts.html` | 04 — Contacts | Email, phone, location, LinkedIn, GitHub, Instagram |

Section numbering is fixed: **01 About, 02 CV, 03 Projects, 04 Contacts**.
Do not renumber sections without updating the header nav, footer nav and landing links.

## Structure

```text
index.html, about.html, cv.html, projects.html, contacts.html
assets/
  css/fonts.css      # shim: imports assets/fonts/fonts.css
  css/layout.css     # structural rules
  css/style.css      # design system + page styles
  js/main.js         # nav, lightbox, shared UI
  js/motion.js       # GSAP + Lenis motion
  vendor/            # gsap, ScrollTrigger, lenis
  fonts/             # Archivo + Inter Tight woff2 + fonts.css
  img/<project>/     # images grouped by project
  img/mapping.json   # source image map (page number -> files, dimensions)
  docs/<project>/    # source PDFs, presentations, drawings
```

## Design system

Tokens live in `:root` at the top of `assets/css/style.css`. Reuse them; do not add new
colours, fonts or spacing values without asking.

- Background `#000000`, panels `#141414` / `#1a1a1a`, lines `#232323`
- Accent `#1E6EF3`, accent strong `#1652CC`, link `#B0C4FF`
- Text `#FFFFFF`, muted `#A0A0A0`
- Sans: Archivo / Inter Tight; wordmark: Palatino/Georgia serif
- Container `1200px`, header `64px`, radius `12px`, spacing scale `8/16/24/32/48/64/96`
- Motion: `--dur 220ms`, `--dur-lg 400ms`, custom cubic-bezier easings

## Conventions

- Site copy is **English**. Conversation with the user is **Italian**.
- Every inner page reuses the same header and footer markup. Only the `aria-current="page"`
  attribute moves to the active nav item.
- Each page has: skip link, `#progress`, shared header, `main#contenuto`, shared footer.
- One `<h1>` per page, then logical heading order. Keep `alt`, ARIA labels and `button type`.
- Use existing classes (`container`, `page-head`, `big-num`, `reveal`, `proj`, `shot`, etc.)
  before inventing new ones.
- Motion is progressive enhancement: the page must remain usable with JavaScript blocked and
  with `prefers-reduced-motion: reduce`.
- Keep relative paths. Encode spaces in asset URLs as `%20`.
- Do not add a framework, bundler or dependency unless the user explicitly asks.

## Assets and content

- `assets/img/` contains both source originals and `-web` derivatives. **Never overwrite or
  delete an original.** Add a new derivative with the `-web` suffix.
- New site images: JPG/PNG, long edge max 2200 px, quality ~82, plus `width`/`height` and
  `alt`. Use `loading="lazy"` except the main above-the-fold image.
- `assets/docs/` holds source PDFs. Treat it as read-only reference material.
- `assets/img/mapping.json` maps catalogue page numbers to files and dimensions. Keep it
  updated only when you add or replace source images.

## Never touch

- `assets/docs/**` — source PDFs and presentations.
- Original images in `assets/img/**` — only add derivatives.
- `.file-versions/`, `.od-frames/`, `.od-skills/`, `*.artifact.json` — host-managed.
- `.git/` internals.

## Verification

Before calling a change done:

1. Every `href` and `src` resolves; no references to deleted files.
2. Open the five pages at 360, 768 and 1440 px: no horizontal scroll, nav works, footer intact.
3. `projects.html`: lightbox opens, closes with Esc, prev/next and keyboard work, focus returns.
4. Console has no errors, GSAP/Lenis load, reduced-motion mode does not break layout.
5. `git status` shows only intentional changes.

## Skills

Project skills (`.opencode/skills/`):

- `page-edit` — edit/create pages without breaking shared chrome and tokens.
- `project-case-study` — add a case study to `projects.html`.
- `image-prep` — turn originals into web-ready derivatives.
- `site-qa` — pre-release checklist for this site.
- `token-efficiency` — keep exploration and output cheap.

Imported skills (MIT/Apache-2.0, attributed in their folders):

- `redesign-existing-projects` — audit and upgrade existing UI without a rewrite.
- `web-design-guidelines` — Vercel Web Interface Guidelines review.
- `review-animations` — motion craft review (GSAP/Lenis).
- `impeccable-design-polish` — post-change polish pass.

Built-in OpenCode skills available when relevant: `browser` (preview, screenshots, console),
`opencode` (OpenCode questions), `report` (upstream bug reports).

## Agents

- `designer` — visual direction, responsive/UX polish, uses browser preview and design skills.
- `developer` — HTML/CSS/JS implementation and refactors.
- `qa-reviewer` — read-only audit: links, accessibility, motion, responsive, console.

Agents default to free-tier models so they work without account funds. Paid upgrades are
listed as comments in each agent file (`gemini-4-argon`, `gpt-5.3-codex`,
`gemini-3.8-flash`). Change the `model:` line to switch.

## Token discipline

Read narrowly, prefer `grep`/`Select-String` and line ranges over whole files, batch
independent reads, and report findings without restating code. Load a skill only when its
task matches. `assets/css/style.css` is ~50 KB: never read it in full unless strictly needed.
