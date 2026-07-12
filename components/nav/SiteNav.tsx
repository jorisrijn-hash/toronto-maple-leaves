"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { nav, site, assets } from "@/lib/site";
import { EASE_OUT, EASE_DRAWER } from "@/lib/motion";
import { MenuIcon, TicketIcon } from "@/components/ui/icons";

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={clsx(
        "group relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "text-white" : "text-frost/70 hover:text-white"
      )}
    >
      {label}
      <span
        className={clsx(
          "absolute inset-x-3 -bottom-0.5 h-0.5 origin-center rounded-full bg-ice-blue transition-transform duration-300 ease-out",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function openPalette() {
  window.dispatchEvent(new Event("leafs:command"));
}

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Starts on the Mac glyph and is corrected after mount, so the server render and
  // the first client render agree and hydration stays clean.
  const [modKey, setModKey] = useState("\u2318");

  useEffect(() => {
    const isMac = /mac|iphone|ipad|ipod/i.test(navigator.userAgent);
    if (!isMac) setModKey("Ctrl ");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-[var(--ann-h,0px)] z-nav transition-[top,background-color,border-color] duration-300 ease-out",
        scrolled
          ? "border-b border-white/10 bg-ice-void/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="relative mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
        {/* logo, left */}
        <Link
          href="/"
          aria-label={`${site.shortName} home`}
          className="group flex shrink-0 items-center justify-self-start"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.leaf}
            alt=""
            width={36}
            height={40}
            className="h-9 w-auto transition-transform duration-300 ease-out group-hover:rotate-[8deg]"
          />
          <span className="ml-3 font-display text-lg leading-none tracking-wide text-white lg:hidden">
            {site.shortName}
          </span>
        </Link>

        {/*
          The links are the middle column. Two equal 1fr side columns means this column
          is genuinely centred, and unlike absolute positioning the columns cannot
          overlap when space runs short. The old nav split the links either side of a
          centred logo, which only looks centred when both halves happen to be the same
          width. With seven items of differing lengths, they never were.
        */}
        <ul className="col-start-2 hidden items-center justify-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} label={item.label} active={pathname === item.href} />
            </li>
          ))}
        </ul>

        {/* actions, right */}
        <div className="col-start-3 flex shrink-0 items-center justify-end gap-2 justify-self-end">
          {/*
            The search pill used to live here. It is gone by design: the shortcut is
            taught by the one time hint, the mobile menu, and the footer. Put it back by
            restoring a button that calls openPalette().
          */}
          <Link
            href="/tickets"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ice-void shadow-glow transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]"
          >
            <TicketIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Get Tickets</span>
            <span className="sm:hidden">Tickets</span>
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
          >
            <MenuIcon open={open} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE_DRAWER } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: EASE_OUT } }}
            className="border-t border-white/10 bg-ice-void/95 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col px-5 py-3">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openPalette();
                  }}
                  className="mb-1 flex w-full items-center gap-3 rounded-md px-2 py-3 text-base font-medium text-frost/80 transition-colors hover:text-white"
                >
                  <SearchIcon className="h-4 w-4" />
                  <span className="flex-1 text-left">Search players, pages, products</span>
                  <kbd className="hidden rounded border border-white/15 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-frost/60 md:inline">
                    {modKey}K
                  </kbd>
                </button>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-3 text-base font-medium text-frost/80 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
