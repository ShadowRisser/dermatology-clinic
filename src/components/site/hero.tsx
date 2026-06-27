"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, ShieldCheck } from "lucide-react";
import { useUI } from "@/lib/store";

export function Hero() {
  const openBooking = useUI((s) => s.openBooking);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background image with slow zoom */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 animate-slow-zoom bg-cover bg-center"
          style={{ backgroundImage: "url(/clinic/hero-interior.png)" }}
        />
        {/* Warm overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Floating decorative orbs */}
      <div className="pointer-events-none absolute right-[8%] top-[22%] -z-10 hidden h-72 w-72 rounded-full bg-blush/40 blur-3xl md:block animate-float-slow" />
      <div className="pointer-events-none absolute bottom-[12%] left-[5%] -z-10 hidden h-56 w-56 rounded-full bg-[oklch(0.72_0.12_75_/_0.18)] blur-3xl md:block animate-float" />

      <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-1.5 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/80">
              Aesthetic &amp; Dermatology · Est. 2006
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-light leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-balance"
          >
            Where art
            <br />
            meets <span className="italic text-gradient-gold">science</span>.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty"
          >
            Bespoke aesthetic and dermatology care, delivered by board-certified
            physicians. Reveal your most radiant self through treatments
            crafted entirely around you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={() => openBooking()}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all hover:gap-3 hover:bg-foreground/90"
            >
              Reserve Your Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo("#skin-ai")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-7 py-4 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-background"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Try AI Skin Analysis
            </button>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4.9</span> · 2,400+ reviews
              </span>
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Board-Certified Physicians
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#treatments")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
          Discover
        </span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-border p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-primary"
          />
        </span>
      </motion.button>
    </section>
  );
}
