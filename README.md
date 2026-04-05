# VoiceCraft.Docs

Documentation site for **VoiceCraft**, built with **Nuxt 4 + Docus** and multilingual support via `@nuxtjs/i18n`.

Live documentation: [voicecraft.avion.team](https://voicecraft.avion.team)

This docs project includes:

- a custom landing page UI;
- client/server/Minecraft integration guides;
- localized content and UI strings;
- branded styling, fonts, and icons.

## Tech Stack

- `nuxt` 4
- `docus`
- `@nuxtjs/i18n`
- `@nuxtjs/google-fonts`
- `sass-embedded`
- `pnpm`

## Quick Start

```bash
pnpm install
pnpm dev
```

The site will be available at `http://localhost:3000` (or the next available port).

## Scripts

```bash
pnpm dev      # start dev server
pnpm build    # production build
```

## Project Structure

```text
VoiceCraft.Docs/
├── app.config.ts                 # Docus/Nuxt UI config (header, seo, toc, theme)
├── nuxt.config.ts                # Nuxt config, i18n, fonts, head/meta, favicon
├── assets/css/theme.scss         # global styles and typography
├── components/
│   └── VoiceCraftLanding.vue     # custom homepage component
├── content/
│   ├── ru/                       # Russian documentation
│   └── en/                       # English documentation
├── i18n/locales/
│   ├── ru.json                   # UI/landing translations (RU)
│   └── en.json                   # UI/landing translations (EN)
├── plugins/
│   └── i18n-ui.ts                # runtime localization for UI labels (toc/title/links)
└── public/
    ├── favicon.ico               # favicon
    └── images/                   # brand assets/screenshots
```

## Content and Routing

Content is organized by locale under `content/<locale>/...`.

Examples:

- `content/ru/1.start/2.quick-start.md` → `/ru/start/quick-start`
- `content/en/1.start/2.quick-start.md` → `/en/start/quick-start`

Locale home pages:

- `content/ru/index.md`
- `content/en/index.md`

Both use the `::voice-craft-landing::` component.

## Localization

### Where locales are configured

In `nuxt.config.ts`:

- `defaultLocale`
- `locales[]`
- `langDir`

### Where UI translations live

- `i18n/locales/ru.json`
- `i18n/locales/en.json`

`ui.*` keys are used for system labels (title, TOC, sidebar links),
`landing.*` keys are used by the custom homepage.

### Add a new locale

1. Add locale in `nuxt.config.ts` (`code`, `name`, `file`).
2. Create `i18n/locales/<code>.json`.
3. Add `content/<code>/...` pages.
4. Provide at least `ui.*` and `landing.*` keys.

## Customization

### Visual Theme

Main styles are in `assets/css/theme.scss`.

This file controls:

- color palette and background effects;
- buttons/cards/animations;
- container widths;
- typography (`Comfortaa` for content, `Nunito` for headings).

### Landing Page

`components/VoiceCraftLanding.vue`:

- hero section;
- CTA buttons;
- product tour slider;
- i18n-driven text.

### Header / SEO / TOC

`app.config.ts` + `plugins/i18n-ui.ts`:

- site header title;
- SEO values;
- TOC labels;
- sidebar utility link labels.

## Favicon and Page Title

- Favicon: `public/favicon.ico`
- Additional icon asset: `public/images/brand/voicecraft-icon.png`
- Head link configuration: `nuxt.config.ts`
- Localized page title: `content/*/index.md` + `plugins/i18n-ui.ts`

## Build and Deploy

```bash
pnpm build
```

Production output is generated in `.output/`.

To preview production build locally:

```bash
node .output/server/index.mjs
```

## GitHub Pages Deployment

This repository includes an automated GitHub Pages workflow:

- Workflow file: `.github/workflows/deploy-pages.yml`
- Trigger: push to `main` (and manual `workflow_dispatch`)
- Build artifact: `.output/public`

### One-time repository setup

1. Open `Settings -> Pages`.
2. Set **Source** to **GitHub Actions**.
3. Ensure your custom domain is set to `voicecraft.avion.team`.
4. Verify DNS for `voicecraft.avion.team` points to GitHub Pages.

### Notes

- `public/CNAME` is included for custom domain support.
- `public/.nojekyll` is included so `_nuxt` assets are served correctly.

## Useful Links

- Docs: [voicecraft.avion.team](https://voicecraft.avion.team)
- VoiceCraft: [GitHub](https://github.com/AvionBlock/VoiceCraft)
- Releases: [Latest release](https://github.com/AvionBlock/VoiceCraft/releases/latest)
