"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, CalendarDays, User, Mail, Phone, Stethoscope, Clock } from "lucide-react";
import { useUI } from "@/lib/store";
import { Button } from "@/components/ui/button";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00",
];

const DOCTORS = [
  "Dr. Elena Marchetti",
  "Dr. James Whitford",
  "Sofia Renaud",
  "No preference",
];

export function BookingModal() {
  const { bookingOpen, bookingService, closeBooking } = useUI();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    doctor: "No preference",
    date: "",
    time: "",
    notes: "",
  });

  // Sync service when modal opens with a preset
  useEffect(() => {
    if (bookingOpen && bookingService) {
      setForm((f) => ({ ...f, service: bookingService }));
    }
  }, [bookingOpen, bookingService]);

  // Reset when closed
  useEffect(() => {
    if (!bookingOpen) {
      const t = setTimeout(() => {
        setDone(false);
        setError(null);
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          doctor: "No preference",
          date: "",
          time: "",
          notes: "",
        });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [bookingOpen]);

  // Lock body scroll
  useEffect(() => {
    if (bookingOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [bookingOpen]);

  const today = new Date().toISOString().split("T")[0];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Booking failed");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {bookingOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={closeBooking}
          />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-background p-6 shadow-luxury-lg scrollbar-luxury sm:rounded-3xl sm:p-8"
          >
            <button
              onClick={closeBooking}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {done ? (
              <div className="flex flex-col items-center py-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 14 }}
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20"
                >
                  <CheckCircle2 className="h-8 w-8 text-sage" />
                </motion.div>
                <h3 className="font-display text-3xl text-foreground">
                  Reservation received
                </h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Thank you, {form.name.split(" ")[0] || "and welcome"}. Our team
                  will confirm your appointment within 24 hours and send the
                  details to{" "}
                  <span className="font-medium text-foreground">{form.email}</span>.
                </p>
                <Button
                  onClick={closeBooking}
                  className="mt-6 rounded-full bg-foreground px-8 py-3 text-background hover:bg-foreground/90"
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    Reservation
                  </div>
                  <h3 className="mt-1 font-display text-3xl text-foreground">
                    Book your consultation
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A $50 hold secures your slot — fully credited toward treatment.
                  </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field icon={User} label="Full name">
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                        placeholder="Jane Doe"
                      />
                    </Field>
                    <Field icon={Phone} label="Phone">
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                        placeholder="+1 (555) 012 3456"
                      />
                    </Field>
                  </div>

                  <Field icon={Mail} label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                      placeholder="jane@email.com"
                    />
                  </Field>

                  <Field icon={Stethoscope} label="Treatment">
                    <input
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                      placeholder="e.g. Hydrafacial, Botox…"
                    />
                  </Field>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Specialist
                    </label>
                    <select
                      value={form.doctor}
                      onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary"
                    >
                      {DOCTORS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field icon={CalendarDays} label="Date">
                      <input
                        required
                        type="date"
                        min={today}
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full bg-transparent text-sm text-foreground outline-none"
                      />
                    </Field>
                    <div>
                      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        Time
                      </label>
                      <select
                        required
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full rounded-xl border border-input bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary"
                      >
                        <option value="">Select time</option>
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      Notes (optional)
                    </label>
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full resize-none rounded-xl border border-input bg-background px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
                      placeholder="Anything you'd like us to know…"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-4 text-sm font-medium text-background transition-all hover:bg-foreground/90 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Securing your slot…
                      </>
                    ) : (
                      "Confirm Reservation"
                    )}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    By booking, you agree to our 24-hour cancellation policy.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-input bg-background px-3 py-3 focus-within:border-primary">
        {children}
      </div>
    </div>
  );
}
