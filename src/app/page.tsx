import HeroSection from "@/components/home/hero-section";
import BenefitsSection from "@/components/home/benefits-section";
import { IntroSection } from "@/components/home/intro-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import FeaturedProducts from "@/components/home/featured-products";
import { CtaSection } from "@/components/home/cta-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { SubscribeSection } from "@/components/home/subscribe-section";
import { BlogSection } from "@/components/home/blog-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <IntroSection />
      <FeaturedProducts />
      <HowItWorksSection />
      <CtaSection />
      <TestimonialSection />
      <SubscribeSection />
      <BlogSection />
    </main>
  );
}
