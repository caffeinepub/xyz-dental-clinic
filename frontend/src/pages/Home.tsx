import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import DoctorProfile from '../components/DoctorProfile';
import TestimonialCarousel from '../components/TestimonialCarousel';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ContactSection from '../components/ContactSection';
import ClinicStatusBanner from '../components/ClinicStatusBanner';
import FloatingDentalElements from '../components/FloatingDentalElements';

export default function Home() {
  return (
    <div>
      <ClinicStatusBanner />
      <div className="relative">
        <FloatingDentalElements />
        <HeroSection />
      </div>
      <ServicesGrid />
      <DoctorProfile />
      <BeforeAfterSlider />
      <TestimonialCarousel />
      <ContactSection />
    </div>
  );
}
