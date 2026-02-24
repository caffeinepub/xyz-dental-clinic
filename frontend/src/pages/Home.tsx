import ClinicStatusBanner from '../components/ClinicStatusBanner';
import HeroSection from '../components/HeroSection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ServicesGrid from '../components/ServicesGrid';
import DoctorProfile from '../components/DoctorProfile';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <>
      <ClinicStatusBanner />
      <HeroSection />
      
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Results, Real Smiles</h2>
            <p className="text-lg text-muted-foreground">See the transformations we've achieved</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/assets/generated/before-whitening.dim_800x600.png"
              afterImage="/assets/generated/after-whitening.dim_800x600.png"
              title="Teeth Whitening"
            />
            <BeforeAfterSlider
              beforeImage="/assets/generated/before-braces.dim_800x600.png"
              afterImage="/assets/generated/after-braces.dim_800x600.png"
              title="Orthodontic Treatment"
            />
          </div>
        </div>
      </section>

      <ServicesGrid />
      <DoctorProfile />
      <TestimonialCarousel />
      <ContactSection />
    </>
  );
}
