"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Article, formatDate } from "@/lib/news";
import { photoAlt, photoSrc } from "@/lib/photos";
import { sectionLift } from "@/lib/motion";

export function NewsCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <motion.article variants={sectionLift} className="depth-card depth-layer group">
      <Link href={`/news/${article.slug}`} className="block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25">
        <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          <Image
            src={photoSrc(article.photo, large ? 1600 : 800)}
            alt={photoAlt(article.photo)}
            fill
            sizes={large ? "(max-width: 768px) 100vw, 720px" : "(max-width: 768px) 100vw, 380px"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ice-void/70 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-ice-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ice-blue backdrop-blur-sm">
            {article.category}
          </span>
        </div>
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2 font-mono text-[11px] text-frost/45">
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span>{article.readMins} min read</span>
          </div>
          <h3 className={`font-display leading-tight text-white ${large ? "text-3xl" : "text-xl"}`}>
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-frost/70">{article.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
}
