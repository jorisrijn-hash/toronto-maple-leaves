import type { Metadata, Viewport } from "next";
import "@fontsource/anton";
import "@fontsource-variable/archivo";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { AppChrome } from "@/components/providers/AppChrome";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LivingRink } from "@/components/ui/LivingRink";
import { site } from "@/lib/site";

// Set NEXT_PUBLIC_SITE_URL in Vercel to the production domain. The fallback keeps
// local builds and previews working without it.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toronto-maple-leaves.vercel.app";

const description =
  "Schedule, roster, standings, match centre and youth programmes. A concept redesign of the Toronto Maple Leafs website.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Toronto Maple Leafs",
    template: "%s · Toronto Maple Leafs",
  },
  description,
  applicationName: site.name,
  keywords: ["Toronto Maple Leafs", "hockey", "NHL", "concept redesign", "ice hockey"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Toronto Maple Leafs",
    description,
    url: "/",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toronto Maple Leafs",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#05132B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale}>
      <body>
        <MotionProvider>
          <AppChrome />
          <LivingRink />
          <SiteNav />
          <main className="relative">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
