"use client";

import { motion } from "framer-motion";
import { Award, Users, Sparkles, HeartHandshake } from "lucide-react";

const STATS = [
  { icon: Award, value: "18+", label: "Years of Excellence" },
  { icon: Users, value: "50K+", label: "Treatments Delivered" },
  { icon: Sparkles, value: "30+", label: "Signature Protocols" },
  { icon: HeartHandshake, value: "98%", label: "Client Retention" },
];

const MARQUEE = [
  "Botulinum Toxin",
  "Dermal Fillers",
  "Laser Resurfacing",
  "Hydrafacial",
  "PRP Therapy",
  "Chemical Peel",
  "Microneedling",
  "Thread Lift",
  "CoolSculpting",
  "Medical Facial",
  "Laser Hair Removal",
  "Skin Consultation",
];

export function TrustBar() {
  return (
    <section className="relative border-y border-border/60 bg-secondary/40">
      {/* Stats */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <stat.icon className="mb-3 h-6 w-6 text-primary" strokeWidth={1.5} />
              <div className="font-display text-4xl font-medium text-foreground sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden border-t border-border/60 py-4">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="font-display text-xl text-foreground/70">{item}</span>
              <span className="text-primary">✦</span>
            </div>
          ))}
        </div>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
