"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import type { Review } from "@/lib/types";

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.reviews?.length) setReviews(d.reviews);
      })
      .finally(() => setLoading(false));
  }, []);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % Math.max(reviews.length, 1)),
    [reviews.length]
  );
  const prev = () =>
    setIndex((i) => (i - 1 + Math.max(reviews.length, 1)) % Math.max(reviews.length, 1));

  useEffect(() => {
    if (reviews.length <= 1) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, reviews.length]);

  const active = reviews[index];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blush/20 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Voices"
          title="Cherished by those we care for"
          description="A few words from the people who trust us with their skin, their confidence, and their time."
        />

        {loading ? (
          <div className="mt-16 flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : active ? (
          <div className="mt-12">
            <div className="relative min-h-[320px] sm:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <Quote className="mb-6 h-10 w-10 text-primary/30" strokeWidth={1} />
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < active.rating
                            ? "h-5 w-5 fill-primary text-primary"
                            : "h-5 w-5 text-border"
                        }
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <p className="max-w-3xl font-display text-2xl font-light leading-relaxed text-foreground sm:text-3xl text-balance">
                    &ldquo;{active.text}&rdquo;
                  </p>
                  <div className="mt-7">
                    <div className="font-medium text-foreground">{active.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {active.treatment} · {active.location}
                    </div>
                  </div>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={
                      i === index
                        ? "h-2 w-8 rounded-full bg-primary transition-all"
                        : "h-2 w-2 rounded-full bg-border transition-all hover:bg-foreground/40"
                    }
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
