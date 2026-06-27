"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Upload,
  Loader2,
  X,
  Camera,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useUI } from "@/lib/store";
import type { SkinAnalysis } from "@/lib/types";
import { cn } from "@/lib/utils";

const severityColor: Record<string, string> = {
  mild: "text-sage",
  moderate: "text-[oklch(0.72_0.12_75)]",
  advanced: "text-primary",
};

const priorityColor: Record<string, string> = {
  high: "border-primary/40 bg-primary/5",
  medium: "border-[oklch(0.72_0.12_75_/_0.4)] bg-[oklch(0.72_0.12_75_/_0.05)]",
  low: "border-border bg-secondary/40",
};

export function SkinAnalysisSection() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkinAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const openBooking = useUI((s) => s.openBooking);

  const onFile = useCallback((file: File) => {
    setError(null);
    setResult(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, or WebP).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be under 8MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  const analyze = async () => {
    if (!imageData) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/skin-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Analysis failed");
      }
      if (data.analysis) {
        setResult(data.analysis);
      } else {
        setError("We couldn't produce a structured analysis. Please try a clearer, well-lit photo.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImageData(null);
    setResult(null);
    setError(null);
  };

  const scoreColor =
    result && result.overallScore >= 75
      ? "oklch(0.62 0.11 145)"
      : result && result.overallScore >= 55
      ? "oklch(0.72 0.12 75)"
      : "oklch(0.62 0.11 38)";

  return (
    <section
      id="skin-ai"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-24 sm:py-32"
    >
      {/* Decorative */}
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-blush/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-[oklch(0.72_0.12_75_/_0.12)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI-Powered · Complimentary"
          title="Your skin, analysed by intelligence"
          description="Upload a single well-lit photograph and receive an instant, physician-grade skin assessment — powered by advanced vision AI. No appointment required."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Left: upload / preview */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              {!imageData ? (
                <motion.div
                  key="drop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                  className="group flex aspect-square cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card/60 p-8 text-center transition-all hover:border-primary/40 hover:bg-card"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                    <Upload className="h-7 w-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-2xl text-foreground">
                    Drop your photo here
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    or click to browse · JPG, PNG, WebP · max 8MB
                  </p>
                  <div className="mt-5 flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs text-muted-foreground">
                    <Camera className="h-3.5 w-3.5" />
                    A clear, front-facing photo works best
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative aspect-square overflow-hidden rounded-3xl border border-border shadow-luxury"
                >
                  <img src={imageData} alt="Your upload" className="h-full w-full object-cover" />
                  {!loading && (
                    <button
                      onClick={reset}
                      className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/40 backdrop-blur-sm">
                      <Loader2 className="h-10 w-10 animate-spin text-white" />
                      <p className="mt-4 text-sm font-medium text-white">
                        Analysing your skin…
                      </p>
                      <p className="mt-1 text-xs text-white/70">
                        This usually takes a few seconds
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFile(f);
                e.target.value = "";
              }}
            />

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {imageData && !result && !loading && (
              <button
                onClick={analyze}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all hover:gap-3"
              >
                <Sparkles className="h-4 w-4" />
                Analyse My Skin
              </button>
            )}

            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              Your image is processed securely for this analysis only and is never
              stored. This tool offers educational guidance, not a medical diagnosis.
            </p>
          </div>

          {/* Right: results */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex aspect-square flex-col items-center justify-center rounded-3xl border border-border bg-card/40 p-8 text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-border">
                    <Sparkles className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-2xl text-foreground">
                    Your analysis appears here
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    Upload a photo and run the analysis to see your skin health
                    score, concerns, and personalised recommendations.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-luxury lg:p-7"
                >
                  {/* Score + type */}
                  <div className="flex items-center gap-5">
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="oklch(0.9 0.015 60)"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke={scoreColor}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 42}
                          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                          animate={{
                            strokeDashoffset:
                              2 * Math.PI * 42 * (1 - result.overallScore / 100),
                          }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="font-display text-3xl font-medium text-foreground">
                          {result.overallScore}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          / 100
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        Skin Health Score
                      </div>
                      <div className="mt-1 font-display text-3xl text-foreground">
                        {result.skinType} Skin
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {result.summary}
                      </p>
                    </div>
                  </div>

                  {/* Concerns */}
                  {result.concerns?.length > 0 && (
                    <div className="mt-6">
                      <div className="mb-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Observed Concerns
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.concerns.map((c, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.08 }}
                            className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm"
                          >
                            <span className="font-medium text-foreground">{c.name}</span>
                            <span className={cn("text-xs capitalize", severityColor[c.severity])}>
                              {c.severity}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Strengths */}
                  {result.strengths?.length > 0 && (
                    <div className="mt-5">
                      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Skin Strengths
                      </div>
                      <ul className="grid gap-1.5">
                        {result.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  {result.recommendations?.length > 0 && (
                    <div className="mt-5">
                      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Recommended For You
                      </div>
                      <div className="grid gap-2">
                        {result.recommendations.map((r, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                            className={cn(
                              "rounded-xl border p-3",
                              priorityColor[r.priority]
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium text-foreground">{r.treatment}</span>
                              <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                {r.priority} priority
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {r.reason}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => openBooking("Skin Consultation")}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:gap-3"
                  >
                    Book a Personal Consultation
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
