import { useState } from 'react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
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

const smilePairs = [
  {
    beforeImage: '/assets/generated/smile-before-1.dim_800x500.png',
    afterImage: '/assets/generated/smile-after-1.dim_800x500.png',
    description: 'Smile Transformation',
  },
  {
    beforeImage: '/assets/generated/before-whitening.dim_800x600.png',
    afterImage: '/assets/generated/after-whitening.dim_800x600.png',
    description: 'Whitening Results',
  },
];

export default function SmileMakeoverDetail() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const treatments = [
    'Teeth Whitening',
    'Porcelain Veneers',
    'Dental Bonding',
    'Gum Contouring',
    'Dental Crowns',
    'Orthodontic Treatment',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-pink-900 to-rose-900 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RevealSection>
            <span className="text-pink-400 font-semibold text-sm uppercase tracking-wider">Complete Transformation</span>
            <h1 className="text-5xl font-bold font-playfair mt-2 mb-4">Smile Makeover</h1>
            <p className="text-slate-200 text-lg leading-relaxed mb-6">
              A comprehensive smile transformation combining multiple cosmetic procedures tailored
              specifically to your unique facial features and goals.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-pink-500 hover:bg-pink-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
            >
              Book Consultation
            </button>
          </RevealSection>
          <RevealImage
            src="/assets/generated/smile-makeover-banner.dim_1200x500.png"
            alt="Smile Makeover"
          />
        </div>
      </section>

      {/* Treatments Included */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 font-playfair">What's Included</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {treatments.map((treatment, i) => (
              <RevealSection key={i}>
                <div className="glass rounded-xl p-4 flex items-center gap-3">
                  <span className="text-pink-500 text-xl">✨</span>
                  <span className="text-slate-700 font-medium">{treatment}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 font-playfair">Before &amp; After</h2>
            <p className="text-slate-500 mt-2">Drag the slider to see the transformation</p>
          </RevealSection>
          <BeforeAfterSlider staticPairs={smilePairs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-pink-700 text-white text-center">
        <RevealSection>
          <h2 className="text-3xl font-bold font-playfair mb-4">Transform Your Smile Today</h2>
          <p className="text-pink-100 mb-8 text-lg">Book a personalized smile consultation.</p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-white text-pink-700 hover:bg-pink-50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
          >
            Book Consultation
          </button>
        </RevealSection>
      </section>

      <BookAppointmentDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultService="Smile Makeover"
      />
    </div>
  );
}
