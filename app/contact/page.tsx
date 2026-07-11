import { Suspense } from "react";
import Link from "next/link";
import { WordReveal } from "@/components/ui/WordReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Reach the club: general enquiries, camps and clinics, tickets, partnerships and media.",
};

const channels = [
  { label: "Camps and clinics", value: "development@example.com", href: "mailto:development@example.com" },
  { label: "Tickets and memberships", value: "tickets@example.com", href: "mailto:tickets@example.com" },
  { label: "Partnerships", value: "partners@example.com", href: "mailto:partners@example.com" },
  { label: "Media", value: "media@example.com", href: "mailto:media@example.com" },
];

export default function ContactPage() {
  return (
    <div className="pb-28 pt-28">
      <header className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">Get in touch</p>
        <WordReveal
          text="Drop us a line"
          className="font-display text-[13vw] leading-[0.9] text-white sm:text-6xl lg:text-7xl"
        />
        <p className="mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-frost/75">
          Questions about a programme, a ticket or a partnership. Send it here and it lands with the
          right person.
        </p>
      </header>

      <section className="mx-auto mt-12 grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1.35fr_1fr]">
        <Suspense fallback={<div className="h-[32rem] rounded-2xl border border-white/10 bg-white/[0.02]" />}>
          <ContactForm />
        </Suspense>

        <aside className="space-y-4">
          {/* the building */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ice-blue">The building</h2>
            <p className="mt-3 font-display text-2xl text-white">{site.arena}</p>
            <p className="mt-1 text-sm text-frost/65">{site.city}</p>
            <Link
              href={site.arenaMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-frost/80 transition-colors hover:border-white/35 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Get directions
            </Link>
          </div>

          {/* direct lines */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ice-blue">Straight to the desk</h2>
            <ul className="mt-4 divide-y divide-white/5">
              {channels.map((c) => (
                <li key={c.label} className="py-3 first:pt-0 last:pb-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-frost/50">{c.label}</p>
                  <a
                    href={c.href}
                    className="text-sm text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-ice-blue"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-frost/50">
              Placeholder addresses for the concept build.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
