"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, GraduationCap, Stethoscope, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useUI } from "@/lib/store";
import type { Doctor } from "@/lib/types";

export function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const openBooking = useUI((s) => s.openBooking);

  useEffect(() => {
    const data = [
      {id:"d1",name:"Dr. Elena Marchetti",title:"Medical Director, MD",credentials:"Board-Certified Dermatologist, FAAD",bio:"Dr. Marchetti leads Lumière with eighteen years of clinical excellence and a fellowship in cosmetic dermatology from a leading European institute. Renowned for her subtle, anatomy-led approach to injectables, she has trained physicians internationally and is frequently cited in aesthetic media for her philosophy of \"invisible refinement.\" Patients describe her consults as the most thorough they have ever experienced.",image:"/clinic/doctor-1.png",specialty:"Cosmetic Dermatology",experienceY:18,sortOrder:1},
      {id:"d2",name:"Dr. James Whitford",title:"Senior Dermatologist, MD PhD",credentials:"Board-Certified, Mohs Surgery",bio:"Dr. Whitford brings twenty-two years of expertise in laser and procedural dermatology, with a doctorate investigating fractional laser tissue interactions. He oversees our laser and surgical dermatology programme, combining rigorous clinical science with an artist's eye for facial harmony.",image:"/clinic/doctor-2.png",specialty:"Laser & Surgical Dermatology",experienceY:22,sortOrder:2},
      {id:"d3",name:"Sofia Renaud",title:"Lead Aesthetician",credentials:"Licensed Medical Aesthetician, LE",bio:"Sofia has spent twelve years perfecting the artistry of clinical aesthetics, with advanced training in Hydrafacial, chemical peels, microneedling, and bespoke skincare protocols. Her signature facials blend medical efficacy with a deeply restorative sensory experience.",image:"/clinic/doctor-3.png",specialty:"Clinical Aesthetics",experienceY:12,sortOrder:3},
    ];
    setDoctors(data as any);
    setLoading(false);
  }, []);

  return (
    <section
      id="specialists"
      className="relative scroll-mt-20 overflow-hidden bg-foreground py-24 text-background sm:py-32"
    >
      {/* Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[oklch(0.72_0.12_75)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Atelier"
          title="Meet your specialists"
          description="A small, hand-selected team of board-certified physicians and master aestheticians — each chosen for craft, judgement, and an artist's eye."
          light
        />

        {loading ? (
          <div className="mt-16 flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {doctors.map((doc, i) => (
              <motion.article
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative overflow-hidden rounded-3xl bg-card text-card-foreground shadow-luxury-lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/80">
                      {doc.specialty}
                    </div>
                    <h3 className="mt-1.5 font-display text-3xl text-background">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-background/70">{doc.title}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {doc.credentials}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                      <Stethoscope className="h-3.5 w-3.5" />
                      {doc.experienceY} yrs
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {doc.bio}
                  </p>
                  <button
                    onClick={() => openBooking(`Consultation with ${doc.name}`)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
                  >
                    Book with {doc.name.split(" ").slice(-1)[0]}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
