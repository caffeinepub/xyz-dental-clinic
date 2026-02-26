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

export default function LaserDentistryDetail() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const benefits = [
    'Minimally invasive procedures',
    'Reduced bleeding and swelling',
    'Faster healing time',
    'Less need for anesthesia',
    'Highly precise treatment',
    'Reduced risk of infection',
  ];

  const treatments = [
    { icon: '⚡', title: 'Gum Disease Treatment', desc: 'Laser removes infected tissue precisely.' },
    { icon: '🔬', title: 'Cavity Detection', desc: 'Early detection with laser diagnostics.' },
    { icon: '✨', title: 'Teeth Whitening', desc: 'Laser-activated whitening for faster results.' },
    { icon: '🛡️', title: 'Gum Contouring', desc: 'Reshape your gumline for a perfect smile.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-green-900 to-teal-900 text-white overflow-hidden">
        {/* Laser beam decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"
            style={{
              width: '200%',
              top: '30%',
              left: '-50%',
              animation: 'laserScan 3s ease-in-out infinite',
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <RevealSection>
            <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">Advanced Technology</span>
            <h1 className="text-5xl font-bold font-playfair mt-2 mb-4">Laser Dentistry</h1>
            <p className="text-slate-200 text-lg leading-relaxed mb-6">
              Experience the future of dental care with our state-of-the-art laser technology.
              Precise, comfortable, and faster healing.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
            >
              Book Consultation
            </button>
          </RevealSection>
          <RevealImage
            src="/assets/generated/laser-dentistry-card.dim_600x400.png"
            alt="Laser Dentistry"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 font-playfair">Benefits of Laser Dentistry</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <RevealSection key={i}>
                <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                  <span className="text-green-500 text-xl">⚡</span>
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 font-playfair">Laser Treatments We Offer</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {treatments.map((t) => (
              <RevealSection key={t.title}>
                <div className="glass-card rounded-xl p-6 flex items-start gap-4">
                  <span className="text-3xl">{t.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{t.title}</h3>
                    <p className="text-slate-500 text-sm">{t.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-green-700 text-white text-center">
        <RevealSection>
          <h2 className="text-3xl font-bold font-playfair mb-4">Experience Pain-Free Dentistry</h2>
          <p className="text-green-100 mb-8 text-lg">Book a laser dentistry consultation today.</p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
          >
            Book Consultation
          </button>
        </RevealSection>
      </section>

      <BookAppointmentDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultService="Laser Dentistry"
      />
    </div>
  );
}
