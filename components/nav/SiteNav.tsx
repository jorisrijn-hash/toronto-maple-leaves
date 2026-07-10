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

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const half = Math.ceil(nav.length / 2);
  const leftNav = nav.slice(0, half);
  const rightNav = nav.slice(half);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out",
        scrolled
          ? "border-b border-white/10 bg-ice-void/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="relative mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
        {/* left links */}
        <ul className="hidden items-center justify-end gap-1 md:flex">
          {leftNav.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} label={item.label} active={pathname === item.href} />
            </li>
          ))}
        </ul>

        {/* center logo / home */}
        <Link
          href="/"
          aria-label={`${site.shortName} home`}
          className="group col-start-1 flex items-center justify-self-start md:col-start-2 md:justify-self-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.leaf}
            alt=""
            width={36}
            height={40}
            className="h-9 w-auto transition-transform duration-300 ease-out group-hover:rotate-[8deg]"
          />
          <span className="ml-3 font-display text-lg leading-none tracking-wide text-white md:hidden">
            {site.shortName}
          </span>
        </Link>

        {/* right links + CTA */}
        <div className="hidden items-center gap-1 md:flex">
          {rightNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={pathname === item.href} />
          ))}
          <Link
            href="/tickets"
            className="group ml-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ice-void shadow-glow transition-transform duration-150 ease-out hover:scale-[1.03] active:scale-[0.97]"
          >
            <TicketIcon className="h-4 w-4" />
            Get Tickets
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="col-start-3 flex h-10 w-10 items-center justify-center justify-self-end rounded-md text-white md:hidden"
        >
          <MenuIcon open={open} className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE_DRAWER } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: EASE_OUT } }}
            className="border-t border-white/10 bg-ice-void/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-5 py-3">
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
              <li className="pt-2">
                <Link
                  href="/tickets"
                  className="group flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-ice-void"
                >
                  <TicketIcon className="h-4 w-4" />
                  Get Tickets
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
