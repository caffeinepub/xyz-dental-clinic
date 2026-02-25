import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import BackgroundParticles from '@/components/BackgroundParticles';
import BookAppointmentDialog from '@/components/BookAppointmentDialog';
import ZoomInImage from '@/components/ZoomInImage';
import TypewriterText from '@/components/TypewriterText';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { useGetService } from '@/hooks/useQueries';

export default function InvisalignDetail() {
  const navigate = useNavigate();
  const { data: service } = useGetService('invisalign');
  const [bookingOpen, setBookingOpen] = useState(false);

  const title = service?.displayName || 'Invisalign Clear Aligners';
  const description =
    service?.description || 'Straighten your teeth discreetly with custom clear aligners.';
  const imageUrl =
    service?.featuredPhoto?.getDirectURL() ||
    '/assets/generated/invisalign-aligner.dim_600x400.png';

  const benefits = [
    'Nearly invisible aligners',
    'Removable for eating and cleaning',
    'Comfortable with no metal brackets',
    'Fewer office visits required',
    'Predictable results with 3D planning',
    'Suitable for teens and adults',
  ];

  const steps = [
    { step: '01', title: 'Digital Scan', desc: 'Precise 3D scan of your teeth for custom aligner fabrication.' },
    { step: '02', title: 'Treatment Preview', desc: 'See your final smile before treatment even begins.' },
    { step: '03', title: 'Aligner Delivery', desc: 'Receive your first set of custom clear aligners.' },
    { step: '04', title: 'Progress Check-ins', desc: 'Regular visits every 6-8 weeks to monitor progress.' },
    { step: '05', title: 'Retainer Fitting', desc: 'Custom retainer to maintain your beautiful new smile.' },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <BackgroundParticles />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate({ to: '/' })}
          className="text-muted-foreground hover:text-foreground transition-colors mb-8 flex items-center gap-2"
        >
          ← Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Clear Aligner Therapy
            </div>
            <TypewriterText
              text={title}
              tag="h1"
              className="text-4xl font-bold text-foreground mb-4"
              speed={40}
            />
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">{description}</p>
            <button
              onClick={() => setBookingOpen(true)}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Book Free Consultation
            </button>
          </div>
          <ZoomInImage src={imageUrl} alt={title} className="rounded-2xl shadow-xl" />
        </div>

        {/* Benefits */}
        <div className="glass-card rounded-2xl p-8 mb-10 border border-border/40">
          <TypewriterText
            text="Why Choose Invisalign?"
            tag="h2"
            className="text-2xl font-bold text-foreground mb-6"
            speed={35}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-primary mt-0.5">✓</span>
                <span className="text-muted-foreground">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Before/After Slider */}
        <div className="mb-10">
          <TypewriterText
            text="Real Patient Results"
            tag="h2"
            className="text-2xl font-bold text-foreground mb-6"
            speed={35}
          />
          <BeforeAfterSlider
            staticPairs={[
              {
                beforeSrc: '/assets/generated/invisalign-before.dim_800x500.png',
                afterSrc: '/assets/generated/invisalign-after.dim_800x500.png',
                label: 'Invisalign Treatment',
              },
            ]}
          />
        </div>

        {/* Process */}
        <div className="mb-10">
          <TypewriterText
            text="Your Invisalign Journey"
            tag="h2"
            className="text-2xl font-bold text-foreground mb-6"
            speed={35}
          />
          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.step}
                className="glass-card rounded-xl p-5 border border-border/40 flex gap-4 items-start"
              >
                <span className="text-primary font-bold text-lg shrink-0">{s.step}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass-card rounded-2xl p-8 border border-border/40">
          <h2 className="text-2xl font-bold text-foreground mb-3">Start Your Smile Journey</h2>
          <p className="text-muted-foreground mb-6">
            Get a free consultation and see your new smile before treatment begins.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Book Free Consultation
          </button>
        </div>
      </div>

      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
