"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./section-heading";
import { MessageCircle } from "lucide-react";
import { useUI } from "@/lib/store";

const FAQS = [
  {
    q: "Are consultations truly personalised?",
    a: "Always. Every journey begins with a 30-minute physician consultation where we assess your skin, anatomy, lifestyle, and goals — then design a protocol exclusively for you. We never use templated treatment plans.",
  },
  {
    q: "Is there downtime after treatments?",
    a: "It depends on the treatment. Many of our signature protocols — Hydrafacial, botulinum toxin, light laser work — involve little to no downtime. Deeper resurfacing or thread lifts may require a few days. Your physician will clarify expected downtime during your consultation so you can plan accordingly.",
  },
  {
    q: "How do I know which treatment is right for me?",
    a: "Start with our complimentary AI Skin Analysis for an instant overview, then book an in-person consultation. Our physicians will guide you to the treatments most likely to deliver the results you envision — and just as importantly, tell you what you don't need.",
  },
  {
    q: "Are your practitioners qualified?",
    a: "Every physician on our team is board-certified in dermatology with extensive cosmetic and aesthetic training. Our aestheticians are licensed medical professionals with years of specialised experience. Credentials are displayed in each specialist's profile.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We kindly request 24 hours' notice for rescheduling or cancellations. A $50 hold secures your appointment and is fully credited toward any treatment. Late cancellations may forfeit the hold.",
  },
  {
    q: "Do you offer financing or memberships?",
    a: "Yes — our three membership tiers (Essential, Signature, Bespoke) offer predictable monthly care with meaningful savings. For single treatments, we also offer flexible financing through our partners. Ask our team for details.",
  },
];

export function FAQ() {
  const openBooking = useUI((s) => s.openBooking);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Good to Know"
          title="Questions, gracefully answered"
          description="Everything you might wonder before your first visit. Can't find your answer? Lumée, our AI consultant, is always one tap away."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-luxury data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-secondary/30 px-6 py-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </span>
            <div>
              <div className="font-display text-xl text-foreground">Still curious?</div>
              <div className="text-sm text-muted-foreground">
                Speak with our team or chat with Lumée.
              </div>
            </div>
          </div>
          <button
            onClick={() => openBooking("General Consultation")}
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90"
          >
            Book a consultation
          </button>
        </div>
      </div>
    </section>
  );
}
