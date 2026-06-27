"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Gem } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useUI } from "@/lib/store";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Essential",
    icon: Sparkles,
    price: "290",
    cadence: "/ month",
    tagline: "Preventative maintenance",
    features: [
      "Monthly medical facial",
      "Quarterly skin consultation",
      "Customised home skincare plan",
      "Priority booking window",
      "10% off all add-on treatments",
    ],
    cta: "Begin Essential",
    featured: false,
  },
  {
    name: "Signature",
    icon: Crown,
    price: "890",
    cadence: "/ month",
    tagline: "Our most chosen journey",
    features: [
      "Everything in Essential",
      "Bi-monthly injectable touch-ups",
      "Quarterly laser or microneedling",
      "Annual full-skin MRI mapping",
      "Dedicated treatment coordinator",
      "15% off all add-on treatments",
    ],
    cta: "Choose Signature",
    featured: true,
  },
  {
    name: "Bespoke",
    icon: Gem,
    price: "2,400",
    cadence: "/ month",
    tagline: "The concierge experience",
    features: [
      "Everything in Signature",
      "Unlimited physician access",
      "Full-spectrum aesthetic plan",
      "Priority emergency scheduling",
      "Annual wellness & aesthetics retreat",
      "20% off all add-on treatments",
    ],
    cta: "Apply for Bespoke",
    featured: false,
  },
];

export function Pricing() {
  const openBooking = useUI((s) => s.openBooking);

  return (
    <section id="pricing" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Membership"
          title="A plan that ages with you"
          description="Predictable, physician-led care through flexible memberships — or pay-per-treatment. No surprises, only radiance."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7 transition-all duration-500",
                tier.featured
                  ? "border-primary/30 bg-card shadow-luxury-lg lg:-translate-y-4 lg:scale-[1.02]"
                  : "border-border bg-card/60 shadow-luxury hover:-translate-y-1"
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-foreground shadow-rose">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full",
                    tier.featured ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"
                  )}
                >
                  <tier.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground">{tier.tagline}</p>
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-medium text-foreground">
                  ${tier.price}
                </span>
                <span className="text-sm text-muted-foreground">{tier.cadence}</span>
              </div>

              <div className="my-6 h-px bg-border" />

              <ul className="flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                        tier.featured ? "bg-primary text-primary-foreground" : "bg-foreground/80 text-background"
                      )}
                    >
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openBooking(`${tier.name} Membership`)}
                className={cn(
                  "mt-7 w-full rounded-full py-3.5 text-sm font-medium transition-all",
                  tier.featured
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "border border-border text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
                )}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Prefer a single treatment? Browse our{" "}
          <button
            onClick={() => document.querySelector("#treatments")?.scrollIntoView({ behavior: "smooth" })}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            full menu
          </button>{" "}
          — no membership required.
        </p>
      </div>
    </section>
  );
}
