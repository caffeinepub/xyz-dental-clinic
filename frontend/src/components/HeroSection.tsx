import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import BookAppointmentDialog from './BookAppointmentDialog';

export default function HeroSection() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 animate-fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-blue/80 to-teal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Your Journey to
            <span className="block bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
              Perfect Smiles
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 animate-slide-up animation-delay-200">
            Experience premium dental care with cutting-edge technology and compassionate service.
            Your smile transformation starts here.
          </p>

          <div className="animate-slide-up animation-delay-400">
            <Button
              size="lg"
              className="animated-button text-lg px-8 py-6 bg-white text-royal-blue hover:bg-white/90"
              onClick={() => setBookingOpen(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
          </div>
        </div>
      </div>

      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
}
