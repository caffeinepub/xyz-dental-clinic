import React, { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import DoctorProfile from '../components/DoctorProfile';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ContactSection from '../components/ContactSection';
import { useScrollReveal } from '../hooks/useScrollReveal';

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero is always visible, no reveal needed */}
      <HeroSection />

      <RevealSection delay={0}>
        <ServicesGrid />
      </RevealSection>

      <RevealSection delay={100}>
        <DoctorProfile />
      </RevealSection>

      <RevealSection delay={0}>
        <BeforeAfterSlider />
      </RevealSection>

      <RevealSection delay={0}>
        <TestimonialCarousel />
      </RevealSection>

      <RevealSection delay={0}>
        <ContactSection />
      </RevealSection>
    </div>
  );
}
