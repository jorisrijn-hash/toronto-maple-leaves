# Toronto Maple Leafs — concept redesign

An unofficial concept redesign of a professional hockey club website, built as a
portfolio piece. Not affiliated with or endorsed by the Toronto Maple Leafs or the NHL.

## Stack

- Next.js 14 (App Router), TypeScript strict, Tailwind CSS
- Framer Motion for interaction and reveal animation
- Self hosted fonts (`@fontsource`): Anton (display), Archivo (body), JetBrains Mono (figures)
- No database, no CMS. All content lives in typed modules under `lib/`.

Every route is statically rendered at build time.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, also the type check gate
```

## Environment

| Variable               | Required | Default                                  | Purpose                                        |
| ---------------------- | -------- | ---------------------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | `https://toronto-maple-leaves.vercel.app` | Absolute URLs in `sitemap.xml`, `robots.txt` and Open Graph tags |

Set it in Vercel once a real domain is attached. Without it, share cards and the
sitemap point at the preview URL.

## Content model

All content is typed data, not a CMS. Edit these and the pages follow.

| File               | Drives                                                 |
| ------------------ | ------------------------------------------------------ |
| `lib/site.ts`      | Site name, nav, arena, shared asset paths               |
| `lib/stats.ts`     | Skaters, goalies, franchise records                     |
| `lib/players.ts`   | Roster slugs, lookups, derived player copy              |
| `lib/schedule.ts`  | Fixtures                                               |
| `lib/matches.ts`   | Match centre: lines, previews, the illustrative boxscore |
| `lib/standings.ts` | Division table                                          |
| `lib/news.ts`      | Newsroom articles                                       |
| `lib/history.ts`   | Timeline and honoured numbers                           |
| `lib/youth.ts`     | Camps, clinics, staff, safeguarding, FAQ                |
| `lib/shop.ts`      | Products                                               |
| `lib/photos.ts`    | Photography manifest (see below)                        |

## Photography

`lib/photos.ts` holds 18 free-to-use photos from Pexels. Two delivery modes:

- `USE_LOCAL_PHOTOS = false` (default): served from the Pexels CDN. Works on deploy
  with no extra step. `images.pexels.com` is already allowed in `next.config.mjs`.
- `USE_LOCAL_PHOTOS = true`: served from `/public/photos`. Run `npm run photos`
  first to download them, then ship the `public/` folder.

Self hosting removes the runtime dependency on an external CDN and the image
optimisation calls that come with it. Recommended before a real launch.

## Chrome and popups

`components/providers/AppChrome.tsx` mounts the global layer: announcement bar,
entrance loader, page transition, cookie banner, command palette and the shortcut hint.

The popups are sequenced, not timed independently. `lib/intro.ts` records when the
entrance animation has finished and tells late subscribers, so the cookie banner and
the shortcut hint queue behind it rather than opening underneath it. If you add
another popup, subscribe with `whenIntroDone()` rather than picking a `setTimeout`.

Storage keys (bump the version suffix to re-show something to returning visitors):

- `leafs-intro-seen` (sessionStorage) — entrance animation, once per session
- `leafs-announce-dismissed-v1` — announcement bar
- `leafs-cookie-consent-v2` — cookie choice
- `leafs-cmdk-hint-v2` — command palette hint, once ever

## Design system

Tokens live in `tailwind.config.ts`.

- Colours: `ice-void`, `rink-navy`, `leafs-blue`, `ice-blue`, `frost`, `goal-red`
- `goal-red` is for fills only. It measures 4.01:1 on `ice-void`, below WCAG AA for
  text. Use `goal-red-ink` (5.72:1) whenever red is a foreground colour.
- Text below `frost/50` fails AA at small sizes. Do not go lower.
- Stacking order is semantic, not magic numbers: `z-nav`, `z-announce`, `z-consent`,
  `z-toast`, `z-drawer`, `z-lightbox`, `z-palette`.
- Motion easings and the shared viewport config are in `lib/motion.ts`.

Reduced motion is handled by `MotionProvider` (`reducedMotion="user"`). The CSS block
in `globals.css` alone is not enough: Framer Motion drives inline styles from JS and
ignores it.

## Deploying

The site is a standard Next.js app on Vercel. Push, and it builds.

When uploading a zip by hand, include the `public/` folder or every image, logo and
video will 404.

## Known limitations

- Standings and the completed match in the match centre are illustrative, not real
  results. Both are labelled as such in the UI.
- Eight of sixteen players have headshots. The rest fall back to a jersey number crest.
- The contact form validates but does not deliver. Point it at a form endpoint to make
  it live.
- No automated tests. The build is the only gate.
