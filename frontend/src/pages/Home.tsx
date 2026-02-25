import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import DoctorProfile from '../components/DoctorProfile';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ClinicStatusBanner from '../components/ClinicStatusBanner';
import FloatingDentalElements from '../components/FloatingDentalElements';
import UserProfileSetup from '../components/UserProfileSetup';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

function ScrambleHeading({ text, className }: { text: string; className?: string }) {
  return <h2 className={className}>{text}</h2>;
}

export default function Home() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <div className="min-h-screen relative">
      <ClinicStatusBanner />
      <Header />

      {/* Floating dental elements layer */}
      <div className="relative">
        <FloatingDentalElements />
        <HeroSection />
      </div>

      <main>
        <ServicesGrid />
        <DoctorProfile />
        <TestimonialCarousel />
        <ContactSection />
      </main>

      <Footer />

      {showProfileSetup && <UserProfileSetup />}
    </div>
  );
}
