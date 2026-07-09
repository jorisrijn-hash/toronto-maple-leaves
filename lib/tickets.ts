// Ticket products, mirroring the club's real offering (single game, packs, suites,
// membership waitlist). Prices are illustrative, in CAD.

export type TicketPackage = {
  id: string;
  kicker: string;
  title: string;
  status: "Coming soon" | "Available" | "Sold out" | "Waitlist";
  body: string;
  cta: string;
  featured?: boolean;
};

export const packages: TicketPackage[] = [
  {
    id: "single",
    kicker: "Matchday",
    title: "Single Game Tickets",
    status: "Coming soon",
    body: "2026-27 single-game tickets go on sale later this summer. Get notified the moment seats drop.",
    cta: "Notify me",
    featured: true,
  },
  {
    id: "ultimate",
    kicker: "The best of both",
    title: "Ultimate Hockey Pack",
    status: "Sold out",
    body: "A curated bundle of marquee matchups and premium perks. The 26-27 pack is going on sale this summer.",
    cta: "Join the waitlist",
  },
  {
    id: "lofts",
    kicker: "600 Level · Gondolas",
    title: "Premium Party Lofts",
    status: "Available",
    body: "Private party lofts high above the ice, the perfect setting for clients, corporate events or celebrations.",
    cta: "Learn more",
  },
  {
    id: "suites",
    kicker: "Watch in comfort",
    title: "Premium Suites",
    status: "Available",
    body: "The best seat in the house with full hospitality. Take in the action in style for your next big night.",
    cta: "Book now",
  },
  {
    id: "membership",
    kicker: "Season seats",
    title: "Membership Waitlist",
    status: "Waitlist",
    body: "Due to overwhelming demand we are not actively adding to the season-seat list. Add your name for future openings.",
    cta: "Add me",
  },
];

export const seating: { name: string; from: string; note: string }[] = [
  { name: "300 Level", from: "CA$69", note: "Upper bowl, full-arena view" },
  { name: "Lower Bowl", from: "CA$149", note: "Close to the ice" },
  { name: "Club Seats", from: "CA$295", note: "Premium centre, in-seat service" },
  { name: "Suites & Lofts", from: "On request", note: "Private hospitality" },
];
