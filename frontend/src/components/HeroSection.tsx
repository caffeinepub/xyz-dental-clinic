import { useState } from 'react';
import BookAppointmentDialog from './BookAppointmentDialog';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HeroSection() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.05);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt="Dental Clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 max-w-6xl mx-auto px-4 py-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-2xl">
          <span className="inline-block bg-teal-500/20 text-teal-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-teal-500/30">
            🦷 Premium Dental Care
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair leading-tight mb-6">
            Your Perfect Smile{' '}
            <span className="text-teal-400">Starts Here</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            Experience world-class dental care with cutting-edge technology and a gentle touch.
            Trusted by 5000+ happy patients.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-teal-500/30 hover:-translate-y-1"
            >
              Book Appointment
            </button>
            <a
              href="#services"
              className="border border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all text-center hover:bg-white/10"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>

      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
}
