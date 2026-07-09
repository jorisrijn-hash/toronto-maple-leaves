# Toronto Maple Leafs — concept redesign

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.

## IMPORTANT — repo structure

The repo root must **directly** contain `package.json` (i.e. `package.json`,
`app/`, `components/`, `lib/`, `public/` all sit at the top level).

Do **not** commit:
- a nested `leafs/` folder, or
- loose files like `PageTransition.tsx`, `CursorFX.tsx`, `WordReveal.tsx`,
  `page.tsx`, `stats.ts` sitting next to the folders.

Those stray copies break the `@/…` path alias and cause:
`Cannot find module '@/components/loader/PageTransition'`.

If your current repo has them, delete everything and re-upload the contents of
this folder cleanly.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (should compile with no errors)
```

## Deploy on Vercel

- Framework preset: **Next.js** (auto-detected).
- **Root Directory: leave empty** if `package.json` is at the repo root.
  If you insist on keeping the project inside a subfolder, set Root Directory
  to that subfolder instead.

## Structure

```
app/            routes (/, /stats, /team, /schedule, /shop, /tickets)
components/     ui, home, stats, loader, nav, layout, providers, brand
lib/            site.ts (config), stats.ts (data), motion.ts (easing/variants)
public/brand    logo.svg + white variants
public/media    hero video, poster, photography
```

Edit team data in `lib/stats.ts` and site config in `lib/site.ts`.
