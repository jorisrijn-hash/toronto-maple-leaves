import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, formatDate } from "@/lib/news";
import { NewsCard } from "@/components/news/NewsCard";
import { photoAlt, photoSrc } from "@/lib/photos";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  return { title: a ? a.title : "Article" };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="pb-28">
      <article className="pt-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Link href="/news" className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-frost/60 transition-colors hover:text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            News
          </Link>

          <span className="rounded-full border border-ice-blue/30 bg-ice-blue/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ice-blue">
            {article.category}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-white md:text-6xl">{article.title}</h1>
          <div className="mt-5 flex items-center gap-2 font-mono text-[12px] text-frost/50">
            <span>{article.author}</span>
            <span>·</span>
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span>{article.readMins} min read</span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl px-5 md:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
            <Image src={photoSrc(article.photo, 1800)} alt={photoAlt(article.photo)} fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" priority />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl px-5 md:px-8">
          {article.body.map((p, i) => (
            <p key={i} className="mb-5 text-lg leading-relaxed text-frost/80">
              {p}
            </p>
          ))}
        </div>
      </article>

      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-frost/50">More news</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
