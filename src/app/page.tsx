import dynamic from "next/dynamic";
import HeroSection from "@/components/home/hero-section";
import BenefitsSection from "@/components/home/benefits-section";

/* Lazy-load below-the-fold sections to reduce initial bundle & main-thread work */
const IntroSection = dynamic(() => import("@/components/home/intro-section").then((m) => ({ default: m.IntroSection })));
const ShowcaseBanner = dynamic(() => import("@/components/home/showcase-banner").then((m) => ({ default: m.ShowcaseBanner })));
const HowItWorksSection = dynamic(() => import("@/components/home/how-it-works-section").then((m) => ({ default: m.HowItWorksSection })));
const PillarsSection = dynamic(() => import("@/components/home/pillars-section").then((m) => ({ default: m.PillarsSection })));
const FeaturedProducts = dynamic(() => import("@/components/home/featured-products"));
const TokenPackages = dynamic(() => import("@/components/home/token-packages").then((m) => ({ default: m.TokenPackages })));
const EcosystemSection = dynamic(() => import("@/components/home/ecosystem-section").then((m) => ({ default: m.EcosystemSection })));
const CtaSection = dynamic(() => import("@/components/home/cta-section").then((m) => ({ default: m.CtaSection })));
const TestimonialSection = dynamic(() => import("@/components/home/testimonial-section").then((m) => ({ default: m.TestimonialSection })));
const SubscribeSection = dynamic(() => import("@/components/home/subscribe-section").then((m) => ({ default: m.SubscribeSection })));

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <IntroSection />
      <ShowcaseBanner />
      <HowItWorksSection />
      <PillarsSection />
      <FeaturedProducts />
      <TokenPackages />
      <EcosystemSection />
      <CtaSection />
      <TestimonialSection />
      <SubscribeSection />
    </main>
  );
}
