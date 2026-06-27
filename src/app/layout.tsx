import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Aesthetic & Dermatology | Where Art Meets Science",
  description: "Lumière Aesthetic & Dermatology Clinic. Premier medical-grade skincare, injectables, laser treatments, and bespoke rejuvenation protocols delivered by board-certified physicians.",
  keywords: ["aesthetic clinic", "dermatology", "botox", "fillers", "laser treatment", "skincare", "medical spa", "anti-aging", "skin rejuvenation"],
  authors: [{ name: "Lumière Clinic" }],
  openGraph: {
    title: "Lumière — Aesthetic & Dermatology",
    description: "Where art meets science. Premier aesthetic and dermatology care.",
    siteName: "Lumière",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${jost.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
