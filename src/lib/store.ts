"use client";

import { create } from "zustand";

interface UIState {
  // Booking modal
  bookingOpen: boolean;
  bookingService: string | null;
  openBooking: (service?: string) => void;
  closeBooking: () => void;

  // Chatbot widget
  chatOpen: boolean;
  toggleChat: () => void;
  setChatOpen: (open: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  bookingOpen: false,
  bookingService: null,
  openBooking: (service) =>
    set({ bookingOpen: true, bookingService: service ?? null }),
  closeBooking: () => set({ bookingOpen: false, bookingService: null }),

  chatOpen: false,
  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
  setChatOpen: (open) => set({ chatOpen: open }),
}));
