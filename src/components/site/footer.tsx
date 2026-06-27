"use client";

import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Clock } from "lucide-react";
import { useUI } from "@/lib/store";

const COLUMNS = [
  {
    title: "Treatments",
    links: ["Injectables", "Laser Resurfacing", "Hydrafacial", "PRP Therapy", "Chemical Peel", "Thread Lift"],
  },
  {
    title: "Clinic",
    links: ["Our Specialists", "Memberships", "Before & After", "The Journal", "Careers", "Press"],
  },
  {
    title: "Visit",
    links: ["Book Consultation", "AI Skin Analysis", "Ask Lumée", "FAQ", "Contact", "Directions"],
  },
];

export function Footer() {
  const openBooking = useUI((s) => s.openBooking);
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.12_75)]">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={1.5} />
              </span>
              <span className="font-display text-2xl">
                Lumi<span className="italic text-[oklch(0.72_0.12_75)]">è</span>re
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/60">
              Aesthetic &amp; dermatology, practised as an art. Bespoke,
              physician-led care for skin that ages beautifully.
            </p>

            <div className="mt-6 space-y-3 text-sm text-background/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.72_0.12_75)]" />
                <span>128 Madison Avenue, Floor 14<br />New York, NY 10016</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[oklch(0.72_0.12_75)]" />
                <a href="tel:+12125550100" className="hover:text-background">+1 (212) 555 0100</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[oklch(0.72_0.12_75)]" />
                <a href="mailto:care@lumiere.clinic" className="hover:text-background">care@lumiere.clinic</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[oklch(0.72_0.12_75)]" />
                <span>Mon–Sat · 9am–7pm</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 text-background/70 transition-all hover:border-[oklch(0.72_0.12_75)] hover:bg-background/10 hover:text-background"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-background/50">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => {
                  const isBooking = link === "Book Consultation";
                  const isHash = ["Our Specialists", "Before & After", "AI Skin Analysis", "Ask Lumée"].includes(link);
                  const hash =
                    link === "Our Specialists" ? "#specialists" :
                    link === "Before & After" ? "#results" :
                    link === "AI Skin Analysis" ? "#skin-ai" : null;
                  return (
                    <li key={link}>
                      <button
                        onClick={() => {
                          if (isBooking) openBooking();
                          else if (hash) scrollTo(hash);
                        }}
                        className="text-sm text-background/70 transition-colors hover:text-background"
                      >
                        {link}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-7 sm:flex-row">
          <p className="text-xs text-background/50">
            © {year} Lumière Aesthetic &amp; Dermatology. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-background/50">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-background">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-background">Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-background">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
