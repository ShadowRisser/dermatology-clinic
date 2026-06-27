"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";

interface Pair {
  id: string;
  before: string;
  after: string;
  label: string;
  treatment: string;
  duration: string;
}

const PAIRS: Pair[] = [
  {
    id: "texture",
    before: "/clinic/skin-before.png",
    after: "/clinic/skin-after.png",
    label: "Skin Texture & Radiance",
    treatment: "Hydrafacial + Microneedling",
    duration: "8 weeks",
  },
  {
    id: "tone",
    before: "/clinic/treatment-skincare.png",
    after: "/clinic/skin-after.png",
    label: "Tone & Brightening",
    treatment: "Chemical Peel + Vitamin C",
    duration: "12 weeks",
  },
  {
    id: "sculpt",
    before: "/clinic/treatment-injectables.png",
    after: "/clinic/skin-after.png",
    label: "Contour & Definition",
    treatment: "Dermal Fillers",
    duration: "Immediate",
  },
];

function ComparisonSlider({ pair }: { pair: Pair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [width, setWidth] = useState(0);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  // Track container width so the "before" image keeps its true aspect
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) update(e.clientX);
    };
    const onTouch = (e: TouchEvent) => {
      if (dragging.current && e.touches[0]) update(e.touches[0].clientX);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [update]);

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[4/5] select-none overflow-hidden rounded-3xl border border-border shadow-luxury sm:aspect-[4/3]"
      onMouseDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        if (e.touches[0]) update(e.touches[0].clientX);
      }}
    >
      {/* After (base) */}
      <img
        src={pair.after}
        alt="After treatment"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={pair.before}
          alt="Before treatment"
          className="absolute inset-0 h-full object-cover"
          style={width ? { width: `${width}px` } : undefined}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="absolute left-4 top-4 rounded-full bg-foreground/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-background backdrop-blur-sm">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
        After
      </span>

      {/* Slider handle */}
      <div
        className="absolute inset-y-0 z-10 flex items-center"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-white/90 shadow-lg" />
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-background/90 shadow-luxury backdrop-blur-sm transition-transform group-hover:scale-110">
          <MoveHorizontal className="h-5 w-5 text-foreground" />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-5">
        <div className="font-display text-xl text-white">{pair.label}</div>
        <div className="mt-0.5 text-sm text-white/80">
          {pair.treatment} · {pair.duration}
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section id="results" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real Results"
          title="The Lumière difference, revealed"
          description="Drag the handle to explore genuine before-and-after transformations. Every result reflects a fully bespoke, physician-led protocol."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PAIRS.map((pair, i) => (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <ComparisonSlider pair={pair} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          Results vary. Book a consultation for a personalised treatment plan.
        </motion.div>
      </div>
    </section>
  );
}
