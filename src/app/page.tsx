import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { Philosophy } from "@/components/site/philosophy";
import { Services } from "@/components/site/services";
import { SkinAnalysisSection } from "@/components/site/skin-analysis";
import { BeforeAfter } from "@/components/site/before-after";
import { Doctors } from "@/components/site/doctors";
import { Pricing } from "@/components/site/pricing";
import { Testimonials } from "@/components/site/testimonials";
import { Journal } from "@/components/site/journal";
import { FAQ } from "@/components/site/faq";
import { CtaNewsletter } from "@/components/site/cta-newsletter";
import { Footer } from "@/components/site/footer";
import { BookingModal } from "@/components/site/booking-modal";
import { Chatbot } from "@/components/site/chatbot";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Philosophy />
        <Services />
        <SkinAnalysisSection />
        <BeforeAfter />
        <Doctors />
        <Pricing />
        <Testimonials />
        <Journal />
        <FAQ />
        <CtaNewsletter />
      </main>
      <Footer />

      {/* Overlays */}
      <BookingModal />
      <Chatbot />
    </div>
  );
}
