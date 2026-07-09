import { WordReveal } from "@/components/ui/WordReveal";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="pb-28 pt-28">
      <header className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/70">
          <span className="h-1.5 w-1.5 rounded-full bg-ice-blue" />
          Official team store
        </div>
        <WordReveal
          text="The Locker"
          className="font-display text-[15vw] leading-[0.9] text-white sm:text-7xl lg:text-8xl"
        />
        <p className="mt-5 max-w-xl text-balance text-frost/75">
          Wear the crest. Jerseys, headwear and gameday gear, built for the coldest
          nights and the loudest ones.
        </p>
      </header>

      <section className="mx-auto mt-14 max-w-7xl px-5 md:px-8">
        <ShopGrid />
      </section>
    </div>
  );
}
