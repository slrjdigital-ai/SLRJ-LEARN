import Hero from "@/components/Hero";
import BusinessTypes from "@/components/BusinessTypes";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import AboutPreview from "@/components/AboutPreview";
import FeedbackSection from "@/components/FeedbackSection";
import ContactCTA from "@/components/ContactCTA";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollReveal><Projects /></ScrollReveal>
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><BusinessTypes /></ScrollReveal>
      <ScrollReveal><WhyChooseUs /></ScrollReveal>
      <ScrollReveal><Process /></ScrollReveal>
      <ScrollReveal><AboutPreview /></ScrollReveal>
      <ScrollReveal><FeedbackSection /></ScrollReveal>
      <ScrollReveal><ContactCTA /></ScrollReveal>
    </>
  );
}


