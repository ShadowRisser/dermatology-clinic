"use client";

import { motion } from "framer-motion";
import { Sparkles, Microscope, Heart, Leaf } from "lucide-react";

const PILLARS = [
  {
    icon: Microscope,
    title: "Evidence-led",
    text: "Every protocol is grounded in clinical research and performed with medical-grade technology.",
  },
  {
    icon: Heart,
    title: "Human-first",
    text: "We treat people, never just skin. Your comfort, dignity, and confidence come before everything.",
  },
  {
    icon: Leaf,
    title: "Quietly luxurious",
    text: "An atmosphere designed to calm the nervous system — because radiant skin begins with ease.",
  },
];

export function Philosophy() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-luxury-lg">
              <img
                src="/clinic/spa-room.png"
                alt="Lumière treatment room"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-border bg-background/95 p-5 shadow-luxury-lg backdrop-blur-sm sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display text-3xl text-foreground">4.9</div>
                  <div className="text-xs text-muted-foreground">2,400+ reviews</div>
                </div>
              </div>
            </motion.div>
            {/* Decorative blur */}
            <div className="pointer-events-none absolute -left-8 -top-8 -z-10 h-40 w-40 rounded-full bg-blush/40 blur-3xl" />
          </motion.div>

          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-primary/50" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
                Our Philosophy
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 font-display text-4xl font-light leading-[1.1] tracking-tight text-foreground sm:text-5xl text-balance"
            >
              Skin is a portrait of how we've lived — and how we care.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty"
            >
              At Lumière, we believe aesthetic medicine is most beautiful when
              it's invisible — when it simply helps you look rested, radiant,
              and unmistakably yourself. We don't chase trends or erase
              character. We enhance what's already there, with restraint,
              precision, and an artist's eye.
            </motion.p>

            <div className="mt-8 space-y-5">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <p.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground">{p.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {p.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
