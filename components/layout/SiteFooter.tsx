import Link from "next/link";
import { site, assets } from "@/lib/site";
import { sponsors } from "@/lib/sponsors";

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Team",
    links: [
      { label: "Roster", href: "/team" },
      { label: "Schedule", href: "/schedule" },
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
      { label: "About", href: "/" },
      { label: "Community", href: "/" },
      { label: "Careers", href: "/" },
    ],
  },
];

const socials = [
  { label: "X", href: "https://x.com", path: "M4 4l16 16M20 4L4 20" },
  { label: "Instagram", href: "https://instagram.com", path: "" },
  { label: "YouTube", href: "https://youtube.com", path: "" },
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
                  <span className="font-mono text-xs">{s.label[0]}</span>
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
