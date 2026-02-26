import { useState } from 'react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import { useScrollReveal } from '../hooks/useScrollReveal';

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function RevealImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      } ${className}`}
    >
      <img src={src} alt={alt} className="w-full rounded-2xl shadow-xl object-cover" />
    </div>
  );
}

export default function PediatricDentistryDetail() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const features = [
    'Child-friendly environment',
    'Gentle, patient approach',
    'Preventive care focus',
    'Fun and stress-free visits',
    'Early orthodontic assessment',
    'Fluoride treatments',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-orange-800 to-yellow-900 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RevealSection>
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Kids Dentistry</span>
            <h1 className="text-5xl font-bold font-playfair mt-2 mb-4">Pediatric Dentistry</h1>
            <p className="text-slate-200 text-lg leading-relaxed mb-6">
              Making dental visits fun and stress-free for your little ones. We create positive
              experiences that last a lifetime.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
            >
              Book Kids Appointment
            </button>
          </RevealSection>
          <RevealImage
            src="/assets/generated/pediatric-dentistry-icon.dim_600x400.png"
            alt="Pediatric Dentistry"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 font-playfair">Our Approach to Kids' Care</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <RevealSection key={i}>
                <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Section */}
      <section className="py-20 px-4 bg-yellow-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RevealImage
            src="/assets/generated/kids-tooth-cartoon.dim_200x200.png"
            alt="Kids Dental Care"
            className="max-w-xs mx-auto"
          />
          <RevealSection>
            <h2 className="text-3xl font-bold text-slate-800 font-playfair mb-4">
              Building Healthy Habits Early
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We believe that positive early dental experiences set the foundation for a lifetime
              of good oral health. Our team is specially trained to work with children of all ages.
            </p>
            <p className="text-slate-600 leading-relaxed">
              From the first tooth to teenage years, we're here to guide your child's dental journey
              with care, patience, and a smile.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-orange-600 text-white text-center">
        <RevealSection>
          <h2 className="text-3xl font-bold font-playfair mb-4">Book Your Child's First Visit</h2>
          <p className="text-orange-100 mb-8 text-lg">We make it fun, we make it easy.</p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
          >
            Book Now
          </button>
        </RevealSection>
      </section>

      <BookAppointmentDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultService="Pediatric Dentistry"
      />
    </div>
  );
}
