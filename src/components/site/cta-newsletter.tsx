"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2, Sparkles } from "lucide-react";

export function CtaNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Subscription failed");
      }
      setStatus("done");
      setMsg(data.message || "You're on the list. Welcome to Lumière.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/clinic/spa-room.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/40" />
      </div>

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[oklch(0.72_0.12_75)]" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-background/80">
              The Lumière Letter
            </span>
          </div>
          <h2 className="font-display text-4xl font-light leading-tight text-background sm:text-5xl lg:text-6xl text-balance">
            Receive our seasonal edit on skin, aging, and the art of self-care.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-background/70 sm:text-lg text-pretty">
            Considered writing, exclusive invitations, and early access to new
            treatments — delivered four times a year. Never more.
          </p>

          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full border border-sage/30 bg-sage/10 px-6 py-4 text-sage"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">{msg}</span>
            </motion.div>
          ) : (
            <form
              onSubmit={submit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-background/20 bg-background/10 px-5 py-4 text-sm text-background outline-none backdrop-blur-sm placeholder:text-background/50 focus:border-[oklch(0.72_0.12_75)]"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-4 text-sm font-medium text-foreground transition-all hover:gap-3 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-[oklch(0.75_0.18_25)]">{msg}</p>
          )}

          <p className="mt-4 text-xs text-background/50">
            No spam. Unsubscribe anytime. We respect your inbox as much as your skin.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
