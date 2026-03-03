import React from "react";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import ClinicStatusBanner from "../components/ClinicStatusBanner";
import ContactSection from "../components/ContactSection";
import DoctorProfile from "../components/DoctorProfile";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ServicesGrid from "../components/ServicesGrid";
import TestimonialCarousel from "../components/TestimonialCarousel";

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
