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

const invisalignPairs = [
  {
    beforeImage: '/assets/generated/invisalign-before.dim_800x500.png',
    afterImage: '/assets/generated/invisalign-after.dim_800x500.png',
    description: 'Invisalign Results',
  },
];

export default function InvisalignDetail() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const benefits = [
    'Nearly invisible aligners',
    'Removable for eating and cleaning',
    'No metal brackets or wires',
    'Comfortable and smooth',
    'Predictable results with 3D planning',
    'Shorter treatment time',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <RevealSection>
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Clear Aligners</span>
            <h1 className="text-5xl font-bold font-playfair mt-2 mb-4">Invisalign</h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Straighten your teeth discreetly with custom clear aligners. No metal, no hassle,
              just a beautiful smile.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
            >
              Book Consultation
            </button>
          </RevealSection>
          <RevealImage
            src="/assets/generated/invisalign-aligner.dim_600x400.png"
            alt="Invisalign Aligner"
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 font-playfair">Why Invisalign?</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <RevealSection key={i}>
                <div className="glass rounded-xl p-4 flex items-center gap-3">
                  <span className="text-purple-500 text-xl">✓</span>
                  <span className="text-slate-700 font-medium">{benefit}</span>
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
          <BeforeAfterSlider staticPairs={invisalignPairs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-purple-700 text-white text-center">
        <RevealSection>
          <h2 className="text-3xl font-bold font-playfair mb-4">Start Your Invisalign Journey</h2>
          <p className="text-purple-100 mb-8 text-lg">Get a free smile assessment today.</p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 shadow-lg"
          >
            Book Free Assessment
          </button>
        </RevealSection>
      </section>

      <BookAppointmentDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultService="Invisalign"
      />
    </div>
  );
}
