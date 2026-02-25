import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import DoctorProfile from '@/components/DoctorProfile';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ContactSection from '@/components/ContactSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FloatingDentalElements from '@/components/FloatingDentalElements';
import BackgroundParticles from '@/components/BackgroundParticles';
import ClinicStatusBanner from '@/components/ClinicStatusBanner';
import { useGetClinicStatus } from '@/hooks/useQueries';
import { ClinicStatus } from '../backend';

function ClosedClinicModal({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
    >
      <div className="glass-card rounded-3xl p-8 max-w-md mx-4 text-center border border-border/40 shadow-2xl">
        <div className="text-6xl mb-4">🏥</div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-3">
          We Are Currently Closed
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Our clinic is temporarily closed. We apologize for any inconvenience.
          Please check back later or contact us for urgent inquiries.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onDismiss}
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Continue Browsing
          </button>
          <a
            href="tel:+916352174912"
            className="px-6 py-2.5 rounded-full border border-border/60 text-foreground font-semibold hover:bg-muted/50 transition-colors"
          >
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: clinicStatus } = useGetClinicStatus();
  const [closedModalDismissed, setClosedModalDismissed] = useState(false);

  const showClosedModal =
    clinicStatus === ClinicStatus.closed && !closedModalDismissed;

  return (
    <div className="relative min-h-screen">
      <BackgroundParticles />
      <ClinicStatusBanner />

      {showClosedModal && (
        <ClosedClinicModal onDismiss={() => setClosedModalDismissed(true)} />
      )}

      <div className="relative z-10">
        <div className="relative">
          <FloatingDentalElements />
          <HeroSection />
        </div>
        <ServicesGrid />
        <BeforeAfterSlider />
        <DoctorProfile />
        <TestimonialCarousel />
        <ContactSection />
      </div>
    </div>
  );
}
