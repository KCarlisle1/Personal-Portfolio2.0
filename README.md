# Katie Carlisle Portfolio

A dark, playful, single-page software-development portfolio built with React, Vite, Tailwind CSS and shadcn-style reusable UI components.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Production build

```bash
npm run build
npm run preview
```

## First edits to make

1. Replace the placeholder email, GitHub and LinkedIn URLs in `src/main.jsx`.
2. Replace each generated project visual in `ProjectVisual` with your real screenshots/videos when ready.
3. Update the project descriptions and links in the `PROJECTS` array.
4. Add a custom favicon / app icon under `public/` if desired.

## GitHub Pages

Because this is a Vite app, a GitHub Pages deployment can be handled with GitHub Actions or the `gh-pages` package. For a project site hosted at `https://USERNAME.github.io/REPO/`, set Vite's `base` option accordingly in `vite.config.js` before deploying.
