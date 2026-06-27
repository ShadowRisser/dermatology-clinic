"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { useUI } from "@/lib/store";
import type { ChatMessage } from "@/lib/types";

const SUGGESTIONS = [
  "What treatment smooths fine lines?",
  "Tell me about dermal fillers",
  "How much downtime does laser resurfacing need?",
  "Which facial is best for dull skin?",
];

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Bonjour, I'm **Lumée** — your personal guide to the Lumière clinic. Whether you're curious about a treatment, wondering what might suit your skin, or ready to book a consultation, I'm here to help. How may I assist you today?",
};

export function Chatbot() {
  const { chatOpen, toggleChat, setChatOpen } = useUI();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const history = messages.slice(1); // exclude welcome
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      const reply =
        data.success && data.reply
          ? data.reply
          : "I apologise — I couldn't compose a reply just now. Please try again or contact the clinic directly.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting just now. Please try again in a moment, or call us and our team will gladly assist.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", damping: 16 }}
        onClick={toggleChat}
        className="fixed bottom-5 right-5 z-[65] flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-luxury-lg transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
        {!chatOpen && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-24 right-3 z-[65] flex h-[560px] max-h-[calc(100vh-7rem)] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-luxury-lg sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-foreground px-5 py-4 text-background">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.12_75)]">
                <Sparkles className="h-5 w-5 text-white" strokeWidth={1.5} />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-foreground bg-sage" />
              </div>
              <div className="flex-1">
                <div className="font-display text-lg leading-none">Lumée</div>
                <div className="text-xs text-background/60">
                  AI Consultation · Online now
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-background/80 transition-colors hover:bg-background/10"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto bg-secondary/30 p-4 scrollbar-luxury"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} />
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 px-1">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                    <Sparkles className="h-4 w-4 text-background" />
                  </span>
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-card px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions (only after welcome) */}
              {messages.length === 1 && !loading && (
                <div className="space-y-2 pt-2">
                  <p className="px-1 text-xs text-muted-foreground">
                    Try asking:
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-xl border border-border bg-card px-3 py-2 text-left text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-background p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Lumée anything…"
                  className="flex-1 rounded-full border border-input bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-all hover:bg-foreground/90 disabled:opacity-40"
                  aria-label="Send"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </form>
              <p className="mt-2 px-2 text-center text-[10px] text-muted-foreground">
                Lumée offers guidance, not medical advice. Always consult a physician.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  // Simple markdown-ish formatting: **bold** and line breaks
  const formatted = message.content
    .split("\n")
    .map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
        {i < message.content.split("\n").length - 1 && <br />}
      </span>
    ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground">
          <Sparkles className="h-4 w-4 text-background" />
        </span>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-foreground text-background"
            : "rounded-bl-sm bg-card text-card-foreground shadow-sm"
        }`}
      >
        {formatted}
      </div>
    </motion.div>
  );
}
