import { articles } from "@/lib/news";
import { WordReveal } from "@/components/ui/WordReveal";
import { NewsGrid } from "@/components/news/NewsGrid";

export const metadata = { title: "News" };

export default function NewsPage() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured.slug);

  return (
    <div className="pb-28 pt-28">
      <header className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ice-blue">The latest</p>
        <WordReveal
          text="Newsroom"
          className="font-display text-[15vw] leading-[0.9] text-white sm:text-7xl lg:text-8xl"
        />
      </header>

      <section className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <NewsGrid featured={featured} rest={rest} />
      </section>
    </div>
  );
}
