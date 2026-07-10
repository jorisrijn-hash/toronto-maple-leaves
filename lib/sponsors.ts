// Official partners. Drop a real logo file in /public/sponsors and set `logo` to swap
// the text wordmark for the brand mark (e.g. "/sponsors/scotiabank.svg").

export type Sponsor = {
  name: string;
  role: string;
  url: string;
  logo?: string;
  tier: "premier" | "official";
};

export const sponsors: Sponsor[] = [
  { name: "Scotiabank", role: "Arena naming rights", url: "https://www.scotiabank.com", logo: "/sponsors/scotiabank.png", tier: "premier" },
  { name: "Dairy Farmers of Ontario", role: "Jersey patch · Milk", url: "https://www.nhl.com/mapleleafs/news/toronto-maple-leafs-partner-with-dairy-farmers-of-ontario-335651244", logo: "/sponsors/milk.png", tier: "premier" },
  { name: "Oreo", role: "Helmet sponsor", url: "https://www.oreo.com", logo: "/sponsors/oreo.png", tier: "premier" },
  { name: "Gatorade Canada", role: "Official partner", url: "https://gatorade.ca/pages/team", tier: "official" },
  { name: "Mastercard", role: "Financial", url: "https://www.mastercard.ca", tier: "official" },
  { name: "Navacord", role: "Insurance", url: "https://navacord.com", tier: "official" },
  { name: "Ford", role: "Automotive", url: "https://www.ford.ca", tier: "official" },
  { name: "Canadian Tire", role: "Retail", url: "https://www.canadiantire.ca", tier: "official" },
  { name: "Coca-Cola", role: "Beverage", url: "https://www.coca-cola.com", tier: "official" },
  { name: "Molson Coors", role: "Beverage", url: "https://www.molsoncoors.com", tier: "official" },
  { name: "Matt & Steve's", role: "Official caesar", url: "https://mattandsteves.com", tier: "official" },
];
