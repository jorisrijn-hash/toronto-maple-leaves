// Shop catalogue. Add a product photo by setting `image` to a path under /public/shop
// (e.g. "/shop/home-jersey.jpg"); until then a branded placeholder tile is shown.
// Prices are illustrative, in CAD.

export const categories = ["All", "Jerseys", "Headwear", "Apparel", "Accessories"] as const;
export type Category = (typeof categories)[number];

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Exclude<Category, "All">;
  tag?: string;
  image?: string;
};

export const products: Product[] = [
  { id: "home-jersey", name: "2026 Home Jersey", price: 259.99, category: "Jerseys", tag: "New" },
  { id: "away-jersey", name: "2026 Away Jersey", price: 259.99, category: "Jerseys" },
  { id: "matthews-jersey", name: "Matthews Home Jersey", price: 289.99, category: "Jerseys", tag: "Bestseller" },
  { id: "third-jersey", name: "Heritage Third Jersey", price: 274.99, category: "Jerseys" },
  { id: "logo-cap", name: "Primary Logo Cap", price: 39.99, category: "Headwear" },
  { id: "cuffed-beanie", name: "Cuffed Knit Beanie", price: 34.99, category: "Headwear" },
  { id: "team-hoodie", name: "Blue & White Hoodie", price: 89.99, category: "Apparel", tag: "New" },
  { id: "heritage-tee", name: "Heritage Crest Tee", price: 44.99, category: "Apparel" },
  { id: "team-scarf", name: "Matchday Scarf", price: 29.99, category: "Accessories" },
  { id: "puck-set", name: "Collector Puck Set", price: 24.99, category: "Accessories" },
  { id: "water-bottle", name: "Insulated Bottle", price: 27.99, category: "Accessories" },
  { id: "leaf-pennant", name: "Felt Pennant", price: 19.99, category: "Accessories" },
];
