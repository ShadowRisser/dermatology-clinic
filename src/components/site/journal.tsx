"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "./section-heading";

const POSTS = [
  {
    category: "Skin Science",
    title: "The collagen timeline: what really happens after 30",
    excerpt:
      "A physician's guide to understanding intrinsic aging, and the treatments that genuinely move the needle — backed by clinical evidence, not hype.",
    readTime: "6 min read",
    image: "/clinic/treatment-skincare.png",
    accent: "bg-blush/40",
  },
  {
    category: "Injectables",
    title: "Beyond 'frozen': the modern art of botulinum toxin",
    excerpt:
      "Today's injectables are about refinement, not restriction. Here's how our physicians achieve natural, expressive results that simply look rested.",
    readTime: "5 min read",
    image: "/clinic/treatment-injectables.png",
    accent: "bg-[oklch(0.72_0.12_75_/_0.3)]",
  },
  {
    category: "Lasers",
    title: "Choosing the right laser for your skin tone",
    excerpt:
      "Not every laser suits every complexion. A candid look at safety, efficacy, and why a patch test is non-negotiable for melanin-rich skin.",
    readTime: "7 min read",
    image: "/clinic/treatment-laser.png",
    accent: "bg-sage/40",
  },
];

export function Journal() {
  return (
    <section id="journal" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="The Journal"
            title="Insights from our atelier"
            description="Considered writing on skin, aging, and the science of looking — and feeling — like yourself."
            align="left"
          />
          <button className="group hidden items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background sm:inline-flex">
            Read all entries
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 mix-blend-multiply ${post.accent}`} />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all group-hover:gap-2.5">
                  Read article
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
