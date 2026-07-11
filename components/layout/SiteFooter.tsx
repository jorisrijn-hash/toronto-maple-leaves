import Link from "next/link";
import { site, assets } from "@/lib/site";
import { sponsors } from "@/lib/sponsors";

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Team",
    links: [
      { label: "Roster", href: "/team" },
      { label: "Schedule", href: "/schedule" },
      { label: "Standings", href: "/standings" },
      { label: "Stats", href: "/stats" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Team store", href: "/shop" },
      { label: "Jerseys", href: "/shop" },
      { label: "Gift cards", href: "/shop" },
    ],
  },
  {
    title: "Tickets",
    links: [
      { label: "Single game", href: "/tickets" },
      { label: "Premium suites", href: "/tickets" },
      { label: "Memberships", href: "/tickets" },
    ],
  },
  {
    title: "Club",
    links: [
      { label: "History", href: "/history" },
      { label: "Gallery", href: "/gallery" },
      { label: "News", href: "/news" },
      { label: "Match centre", href: "/match/demo-final" },
    ],
  },
];

const socials: { label: string; href: string; path: string }[] = [
  {
    label: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.205 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 1.802c-3.15 0-3.523.012-4.767.069-2.933.134-4.132 1.336-4.267 4.267-.057 1.244-.069 1.617-.069 4.767 0 3.15.012 3.523.069 4.767.135 2.933 1.336 4.132 4.267 4.267 1.244.057 1.617.069 4.767.069 3.15 0 3.523-.012 4.767-.069 2.933-.135 4.132-1.336 4.267-4.267.057-1.244.069-1.617.069-4.767 0-3.15-.012-3.523-.069-4.767-.135-2.931-1.336-4.132-4.267-4.267-1.244-.057-1.617-.069-4.767-.069zm0 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666zm5.338-9.87a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-ice-void/70">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* brand + newsletter */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.logoWhite} alt={site.name} width={88} height={98} className="h-20 w-auto" />
            <p className="mt-5 max-w-xs text-sm text-frost/60">
              {site.tagline} Follow the club all season, from opening face-off to the final horn.
            </p>

            <a
              href={site.arenaMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-sm text-frost/70 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-ice-blue" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {site.arena}, {site.city}
            </a>

            <div className="mt-8">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/50">
                Leafs Nation newsletter
              </p>
              <div className="flex max-w-sm items-center gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-frost/35 focus:border-ice-blue/50 focus:outline-none"
                />
                <button className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ice-void transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]">
                  Join
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-frost/60 transition-colors hover:border-white/30 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-frost/45">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-frost/70 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* partners line */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/45">
            Official partners
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {sponsors.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.role}
                className="text-sm text-frost/55 transition-colors hover:text-white"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-frost/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Concept redesign.
          </p>
          <p className="max-w-xl md:text-right">{site.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
