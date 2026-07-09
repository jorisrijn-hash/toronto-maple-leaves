import type { Metadata, Viewport } from "next";
import "@fontsource/anton";
import "@fontsource-variable/archivo";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { AppChrome } from "@/components/providers/AppChrome";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LivingRink } from "@/components/ui/LivingRink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "Toronto Maple Leafs",
    template: "%s · Toronto Maple Leafs",
  },
  description:
    "Toronto Maple Leafs. Schedule, roster, live stats and more. A concept redesign.",
};

export const viewport: Viewport = {
  themeColor: "#05132B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale}>
      <body>
        <AppChrome />
        <LivingRink />
        <SiteNav />
        <main className="relative">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
