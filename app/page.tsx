import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import ProjectEstimator from "@/components/ProjectEstimator";
import BusinessTypes from "@/components/BusinessTypes";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import AboutPreview from "@/components/AboutPreview";
import FAQ from "@/components/FAQ";
import FeedbackSection from "@/components/FeedbackSection";
import ContactCTA from "@/components/ContactCTA";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ScrollReveal><Projects /></ScrollReveal>
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><ProjectEstimator /></ScrollReveal>
      <BusinessTypes />
      <ScrollReveal><WhyChooseUs /></ScrollReveal>
      <ScrollReveal><Process /></ScrollReveal>
      <ScrollReveal><AboutPreview /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
      <ScrollReveal><FeedbackSection /></ScrollReveal>
      <ScrollReveal><ContactCTA /></ScrollReveal>
    </>
  );
}
