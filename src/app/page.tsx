import { Hero } from "@/components/home/hero";
import { ServicesSection } from "@/components/home/services-section";
import { WorkSection } from "@/components/home/work-section";
import { ProcessSection } from "@/components/home/process-section";
import { AboutTeaser } from "@/components/home/about-teaser";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <AboutTeaser />
      <CtaBand />
    </>
  );
}
