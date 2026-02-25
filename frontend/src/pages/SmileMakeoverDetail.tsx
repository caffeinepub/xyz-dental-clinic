import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import BackgroundParticles from '@/components/BackgroundParticles';
import BookAppointmentDialog from '@/components/BookAppointmentDialog';
import ZoomInImage from '@/components/ZoomInImage';
import TypewriterText from '@/components/TypewriterText';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { useGetService } from '@/hooks/useQueries';

export default function SmileMakeoverDetail() {
  const navigate = useNavigate();
  const { data: service } = useGetService('smile-makeover');
  const [bookingOpen, setBookingOpen] = useState(false);

  const title = service?.displayName || 'Smile Makeover';
  const description =
    service?.description ||
    'Complete smile transformation combining the best of cosmetic dentistry.';
  const imageUrl =
    service?.featuredPhoto?.getDirectURL() ||
    '/assets/generated/smile-makeover-banner.dim_1200x500.png';

  const benefits = [
    'Complete smile transformation in one plan',
    'Combines whitening, veneers, implants, and more',
    'Fully customized to your facial features',
    'Digital smile preview before treatment begins',
    'Long-lasting, natural-looking results',
    'Boosts confidence and quality of life',
  ];

  const steps = [
    { step: '01', title: 'Smile Analysis', desc: 'Comprehensive consultation and digital smile assessment.' },
    { step: '02', title: 'Digital Design', desc: 'Preview your new smile with advanced digital design tools.' },
    { step: '03', title: 'Treatment Plan', desc: 'Personalized multi-treatment plan tailored to your goals.' },
    { step: '04', title: 'Core Procedures', desc: 'Veneers, whitening, implants, or other chosen treatments.' },
    { step: '05', title: 'Final Polish', desc: 'Adjustments, polishing, and long-term maintenance plan.' },
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
              Premium Transformation
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
              Start Your Transformation
            </button>
          </div>
          <ZoomInImage src={imageUrl} alt={title} className="rounded-2xl shadow-xl" />
        </div>

        {/* Benefits */}
        <div className="glass-card rounded-2xl p-8 mb-10 border border-border/40">
          <TypewriterText
            text="What's Included"
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

        {/* Before/After Gallery */}
        <div className="mb-10">
          <TypewriterText
            text="Real Patient Transformations"
            tag="h2"
            className="text-2xl font-bold text-foreground mb-6"
            speed={35}
          />
          <BeforeAfterSlider
            staticPairs={[
              {
                beforeSrc: '/assets/generated/smile-before-1.dim_800x500.png',
                afterSrc: '/assets/generated/smile-after-1.dim_800x500.png',
                label: 'Smile Makeover Case 1',
              },
              {
                beforeSrc: '/assets/generated/before-whitening.dim_800x600.png',
                afterSrc: '/assets/generated/after-whitening.dim_800x600.png',
                label: 'Smile Makeover Case 2',
              },
            ]}
          />
        </div>

        {/* Process */}
        <div className="mb-10">
          <TypewriterText
            text="Your Makeover Journey"
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Your Dream Smile Awaits</h2>
          <p className="text-muted-foreground mb-6">
            Book a consultation and see your transformation before it begins.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Book Consultation
          </button>
        </div>
      </div>

      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
