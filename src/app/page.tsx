import HeroSection from "@/components/home/hero-section";
import BenefitsSection from "@/components/home/benefits-section";
import { IntroSection } from "@/components/home/intro-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import FeaturedProducts from "@/components/home/featured-products";
import { CtaSection } from "@/components/home/cta-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { TokenPackages } from "@/components/home/token-packages";
import { EcosystemSection } from "@/components/home/ecosystem-section";
import { SubscribeSection } from "@/components/home/subscribe-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <IntroSection />
      <HowItWorksSection />
      <FeaturedProducts />
      <TokenPackages />
      <EcosystemSection />
      <CtaSection />
      <TestimonialSection />
      <SubscribeSection />
    </main>
  );
}
