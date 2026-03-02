import React from 'react';
import Header from '../components/Header';
import ClinicStatusBanner from '../components/ClinicStatusBanner';
import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import DoctorProfile from '../components/DoctorProfile';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <ClinicStatusBanner />
      <Header />
      <main>
        <HeroSection />
        <ServicesGrid />
        <DoctorProfile />
        <BeforeAfterSlider />
        <TestimonialCarousel />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
