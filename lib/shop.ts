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
  sizes?: string[];
  description?: string;
};

const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];
const JERSEY_SIZES = ["S", "M", "L", "XL", "XXL", "3XL"];

export const products: Product[] = [
  { id: "matthews-jersey", name: "Auston Matthews Home Jersey", price: 289.99, category: "Jerseys", tag: "Bestseller", image: "/shop/matthews-jersey.png", sizes: JERSEY_SIZES, description: "Fanatics Breakaway home jersey with the captain's patch and authentic tackle-twill numbering. Wear number 34 on Scotiabank Arena ice." },
  { id: "nylander-jersey", name: "William Nylander Home Jersey", price: 259.99, category: "Jerseys", image: "/shop/nylander-jersey.png", sizes: JERSEY_SIZES, description: "Home blue Breakaway jersey honouring the club's 2025-26 scoring leader. Lightweight, tailored for gameday." },
  { id: "bobrovsky-jersey", name: "Sergei Bobrovsky Home Jersey", price: 279.99, category: "Jerseys", tag: "New", image: "/shop/bobrovsky-jersey.png", sizes: JERSEY_SIZES, description: "Premium home jersey for the new man between the pipes. Stitched crest, fight strap and pro-cut collar." },
  { id: "practice-jersey", name: "Royal Practice Jersey", price: 149.99, category: "Jerseys", image: "/shop/practice-jersey.png", sizes: JERSEY_SIZES, description: "Authentic practice sweater in royal blue, as worn at morning skate. Durable double-knit construction." },
  { id: "rink-trucker", name: "Rink Lockup Trucker Hat", price: 39.99, category: "Headwear", image: "/shop/rink-trucker.png", sizes: ["One size"], description: "Structured trucker with breathable mesh back and embroidered rink lockup. Snapback fit." },
  { id: "blackout-39thirty", name: "New Era Blackout 39THIRTY", price: 44.99, category: "Headwear", image: "/shop/blackout-39thirty.png", sizes: ["S/M", "M/L", "L/XL"], description: "Tonal blackout 39THIRTY with a stretch-fit band and raised primary crest." },
  { id: "playoffs-trucker", name: "Playoffs Locker Room Trucker", price: 34.99, category: "Headwear", image: "/shop/playoffs-trucker.png", sizes: ["One size"], description: "Locker-room trucker from the 2025 Stanley Cup Playoffs run. Adjustable snap closure." },
  { id: "pro-crown-hat", name: "Pro Crown Adjustable Hat", price: 32.99, category: "Headwear", image: "/shop/pro-crown-hat.png", sizes: ["One size"], description: "Clean pro-crown silhouette with a curved brim and tonal embroidery." },
  { id: "lacer-hoodie", name: "'47 Superior Lacer Hoodie", price: 99.99, category: "Apparel", tag: "Bestseller", image: "/shop/lacer-hoodie.png", sizes: APPAREL_SIZES, description: "Heavyweight '47 lacer hoodie in vintage cream with a laced collar and distressed crest. Brushed-fleece interior." },
  { id: "matthews-tee", name: "Matthews Name & Number Tee", price: 44.99, category: "Apparel", image: "/shop/matthews-tee.png", sizes: APPAREL_SIZES, description: "Soft cotton name-and-number tee with a stacked back print. Regular fit." },
  { id: "quarter-zip", name: "Insignia Core Quarter-Zip", price: 84.99, category: "Apparel", image: "/shop/quarter-zip.png", sizes: APPAREL_SIZES, description: "Levelwear quarter-zip in navy with a moisture-wicking finish. Layer it rinkside or at the office." },
  { id: "jogger", name: "Lululemon Steady State Jogger", price: 128.0, category: "Apparel", image: "/shop/jogger.png", sizes: APPAREL_SIZES, description: "lululemon Steady State jogger co-branded with the club crest. Soft, tapered, everyday-ready." },
  { id: "puck", name: "Autograph Model Puck", price: 19.99, category: "Accessories", image: "/shop/puck.png", description: "Official Inglasco autograph-model puck with the primary crest. Ideal for signings and display." },
  { id: "flag", name: "Primary Logo Flag 3x5", price: 29.99, category: "Accessories", image: "/shop/flag.png", description: "3-by-5-foot single-sided flag with the primary logo. Two brass grommets for easy hanging." },
  { id: "giftcard", name: "Digital Gift Card", price: 25.0, category: "Accessories", image: "/shop/giftcard.png", description: "Let them pick. Digital gift card delivered by email, redeemable across the team store." },
];
