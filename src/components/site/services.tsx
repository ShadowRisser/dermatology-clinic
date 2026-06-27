"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowUpRight, Loader2 } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useUI } from "@/lib/store";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Injectables", "Laser", "Facial", "Advanced", "Body", "Consultation"];

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const openBooking = useUI((s) => s.openBooking);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setServices(d.services);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? services : services.filter((s) => s.category === active)),
    [services, active]
  );

  return (
    <section id="treatments" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Menu"
          title="Treatments crafted with intention"
          description="Every protocol is physician-designed and tailored to your unique skin, anatomy, and goals — never templated."
        />

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === cat
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="mt-16 flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((service, i) => (
                <motion.article
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury-lg"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground backdrop-blur-sm">
                      {service.category}
                    </span>
                    {service.featured && (
                      <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary-foreground">
                        Signature
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-2xl leading-tight text-foreground">
                        {service.name}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-primary" />
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{service.tagline}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">
                      {service.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {service.durationMin} min
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          From
                        </div>
                        <div className="font-display text-xl font-medium text-foreground">
                          ${service.price}
                        </div>
                      </div>
                    </div>

                    {/* Book CTA */}
                    <button
                      onClick={() => openBooking(service.name)}
                      className="mt-4 w-full rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                    >
                      Book this treatment
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
