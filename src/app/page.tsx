import dynamic from "next/dynamic";
import HeroSection from "@/components/home/hero-section";
import BenefitsSection from "@/components/home/benefits-section";

/* Height-reserving loading placeholder to prevent CLS */
function SectionSkeleton({ h = "h-[400px]" }: { h?: string }) {
  return <div className={`${h} bg-muted/20`} />;
}

/* Lazy-load below-the-fold sections to reduce initial bundle & main-thread work */
const ContextSection = dynamic(() => import("@/components/home/context-section").then((m) => ({ default: m.ContextSection })), {
  loading: () => <SectionSkeleton />,
});
const IntroSection = dynamic(() => import("@/components/home/intro-section").then((m) => ({ default: m.IntroSection })), {
  loading: () => <SectionSkeleton />,
});
const ShowcaseBanner = dynamic(() => import("@/components/home/showcase-banner").then((m) => ({ default: m.ShowcaseBanner })), {
  loading: () => <SectionSkeleton h="h-[420px]" />,
});
const HowItWorksSection = dynamic(() => import("@/components/home/how-it-works-section").then((m) => ({ default: m.HowItWorksSection })), {
  loading: () => <SectionSkeleton h="h-[500px]" />,
});
const PillarsSection = dynamic(() => import("@/components/home/pillars-section").then((m) => ({ default: m.PillarsSection })), {
  loading: () => <SectionSkeleton />,
});
const TokenPackages = dynamic(() => import("@/components/home/token-packages").then((m) => ({ default: m.TokenPackages })), {
  loading: () => <SectionSkeleton />,
});
const SubscriptionPlans = dynamic(() => import("@/components/home/subscription-plans").then((m) => ({ default: m.SubscriptionPlans })), {
  loading: () => <SectionSkeleton h="h-[600px]" />,
});
const FreeTokenSection = dynamic(() => import("@/components/home/free-token-section").then((m) => ({ default: m.FreeTokenSection })), {
  loading: () => <SectionSkeleton />,
});
const EcosystemSection = dynamic(() => import("@/components/home/ecosystem-section").then((m) => ({ default: m.EcosystemSection })), {
  loading: () => <SectionSkeleton />,
});
const CtaSection = dynamic(() => import("@/components/home/cta-section").then((m) => ({ default: m.CtaSection })), {
  loading: () => <SectionSkeleton h="h-[420px]" />,
});
const TestimonialSection = dynamic(() => import("@/components/home/testimonial-section").then((m) => ({ default: m.TestimonialSection })), {
  loading: () => <SectionSkeleton />,
});
const BlogSection = dynamic(() => import("@/components/home/blog-section").then((m) => ({ default: m.BlogSection })), {
  loading: () => <SectionSkeleton h="h-[480px]" />,
});
const SubscribeSection = dynamic(() => import("@/components/home/subscribe-section").then((m) => ({ default: m.SubscribeSection })), {
  loading: () => <SectionSkeleton h="h-[300px]" />,
});

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <ContextSection />
      <IntroSection />
      <ShowcaseBanner />
      <HowItWorksSection />
      <PillarsSection />
      <TokenPackages />
      <SubscriptionPlans />
      <FreeTokenSection />
      <EcosystemSection />
      <CtaSection />
      <TestimonialSection />
      <BlogSection />
      <SubscribeSection />
    </main>
  );
}
