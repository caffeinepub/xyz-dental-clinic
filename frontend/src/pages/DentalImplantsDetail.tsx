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

export default function DentalImplantsDetail() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const benefits = [
    'Permanent, lifetime solution',
    'Looks and feels like natural teeth',
    'Preserves jawbone density',
    'No adhesives or removal needed',
    'Improves speech and chewing',
    '98% success rate',
  ];

  const steps = [
    { step: '01', title: 'Consultation', desc: 'Comprehensive examination and 3D imaging to plan your implant.' },
    { step: '02', title: 'Implant Placement', desc: 'Titanium post surgically placed into the jawbone under local anesthesia.' },
    { step: '03', title: 'Osseointegration', desc: '3-6 months for the implant to fuse with your jawbone.' },
    { step: '04', title: 'Crown Placement', desc: 'Custom-made crown attached for a perfect, natural-looking smile.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-teal-900 to-slate-900 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RevealSection>
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider">Premium Service</span>
            <h1 className="text-5xl font-bold font-playfair mt-2 mb-4">Dental Implants</h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              The gold standard in tooth replacement. Permanent, natural-looking implants that restore
              your smile and confidence for life.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
            >
              Book Consultation
            </button>
          </RevealSection>
          <RevealImage
            src="/assets/generated/dental-implant-diagram.dim_600x400.png"
            alt="Dental Implant Diagram"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 font-playfair">Why Choose Implants?</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <RevealSection key={i}>
                <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                  <span className="text-teal-500 text-xl">✓</span>
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 font-playfair">The Process</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <RevealSection key={s.step}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm">{s.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-teal-700 text-white text-center">
        <RevealSection>
          <h2 className="text-3xl font-bold font-playfair mb-4">Ready to Restore Your Smile?</h2>
          <p className="text-teal-100 mb-8 text-lg">Book a free consultation today and take the first step.</p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-white text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
          >
            Book Free Consultation
          </button>
        </RevealSection>
      </section>

      <BookAppointmentDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultService="Dental Implants"
      />
    </div>
  );
}
