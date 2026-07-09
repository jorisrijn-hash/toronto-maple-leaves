// Shop catalogue with real product photography (in /public/shop). Prices are
// illustrative, in CAD. Add or swap products by editing this list.

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
  { id: "matthews-jersey", name: "Auston Matthews Home Jersey", price: 289.99, category: "Jerseys", tag: "Bestseller", image: "/shop/matthews-jersey.jpg" },
  { id: "nylander-jersey", name: "William Nylander Home Jersey", price: 259.99, category: "Jerseys", image: "/shop/nylander-jersey.jpg" },
  { id: "bobrovsky-jersey", name: "Sergei Bobrovsky Home Jersey", price: 279.99, category: "Jerseys", tag: "New", image: "/shop/bobrovsky-jersey.jpg" },
  { id: "mckenna-jersey", name: "Gavin McKenna Select Jersey", price: 289.99, category: "Jerseys", tag: "New", image: "/shop/mckenna-jersey.jpg" },
  { id: "practice-jersey", name: "Royal Practice Jersey", price: 149.99, category: "Jerseys", image: "/shop/practice-jersey.jpg" },
  { id: "rink-trucker", name: "Rink Lockup Trucker Hat", price: 39.99, category: "Headwear", image: "/shop/rink-trucker.jpg" },
  { id: "blackout-39thirty", name: "New Era Blackout 39THIRTY", price: 44.99, category: "Headwear", image: "/shop/blackout-39thirty.jpg" },
  { id: "playoffs-trucker", name: "Playoffs Locker Room Trucker", price: 34.99, category: "Headwear", image: "/shop/playoffs-trucker.jpg" },
  { id: "pro-crown-hat", name: "Pro Crown Adjustable Hat", price: 32.99, category: "Headwear", image: "/shop/pro-crown-hat.jpg" },
  { id: "lacer-hoodie", name: "'47 Superior Lacer Hoodie", price: 99.99, category: "Apparel", tag: "Bestseller", image: "/shop/lacer-hoodie.jpg" },
  { id: "matthews-tee", name: "Matthews Name & Number Tee", price: 44.99, category: "Apparel", image: "/shop/matthews-tee.jpg" },
  { id: "quarter-zip", name: "Insignia Core Quarter-Zip", price: 84.99, category: "Apparel", image: "/shop/quarter-zip.jpg" },
  { id: "jogger", name: "Lululemon Steady State Jogger", price: 128.0, category: "Apparel", image: "/shop/jogger.jpg" },
  { id: "puck", name: "Autograph Model Puck", price: 19.99, category: "Accessories", image: "/shop/puck.jpg" },
  { id: "flag", name: "Primary Logo Flag 3x5", price: 29.99, category: "Accessories", image: "/shop/flag.jpg" },
  { id: "giftcard", name: "Digital Gift Card", price: 25.0, category: "Accessories", image: "/shop/giftcard.jpg" },
];
