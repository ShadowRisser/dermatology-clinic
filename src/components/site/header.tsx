"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUI } from "@/lib/store";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Treatments", href: "#treatments" },
  { label: "Skin AI", href: "#skin-ai" },
  { label: "Results", href: "#results" },
  { label: "Specialists", href: "#specialists" },
  { label: "Pricing", href: "#pricing" },
  { label: "Journal", href: "#journal" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openBooking = useUI((s) => s.openBooking);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass shadow-luxury py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.12_75)] shadow-rose">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={1.5} />
            </span>
            <span className="font-display text-2xl font-medium tracking-tight text-foreground">
              Lumi<span className="italic text-primary">è</span>re
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="link-underline text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => openBooking()}
              className="hidden rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:bg-foreground/90 sm:inline-flex"
            >
              Book Consultation
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-background p-7 shadow-luxury-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl">
                  Lumi<span className="italic text-primary">è</span>re
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                    onClick={() => handleNav(link.href)}
                    className="border-b border-border/50 py-4 text-left font-display text-2xl text-foreground"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  openBooking();
                }}
                className="mt-auto rounded-full bg-foreground px-6 py-4 text-base text-background hover:bg-foreground/90"
              >
                Book Consultation
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
