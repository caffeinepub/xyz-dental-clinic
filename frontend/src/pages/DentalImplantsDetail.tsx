import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import BackgroundParticles from '@/components/BackgroundParticles';
import BookAppointmentDialog from '@/components/BookAppointmentDialog';
import ZoomInImage from '@/components/ZoomInImage';
import TypewriterText from '@/components/TypewriterText';
import { useGetService } from '@/hooks/useQueries';

export default function DentalImplantsDetail() {
  const navigate = useNavigate();
  const { data: service } = useGetService('dental-implants');
  const [bookingOpen, setBookingOpen] = useState(false);

  const title = service?.displayName || 'Advanced Dental Implants';
  const description =
    service?.description ||
    'Permanent, natural-looking tooth replacement with titanium implants.';
  const imageUrl =
    service?.featuredPhoto?.getDirectURL() ||
    '/assets/generated/dental-implant-diagram.dim_600x400.png';

  const benefits = [
    'Permanent solution lasting 20+ years',
    'Natural look and feel',
    'Preserves jawbone density',
    'No adhesives or removal needed',
    'Improves speech and chewing',
    'Easy maintenance like natural teeth',
  ];

  const steps = [
    { step: '01', title: 'Consultation & 3D Scan', desc: 'Comprehensive examination with digital X-rays and 3D imaging.' },
    { step: '02', title: 'Treatment Planning', desc: 'Custom implant placement plan using advanced software.' },
    { step: '03', title: 'Implant Placement', desc: 'Titanium post surgically placed under local anesthesia.' },
    { step: '04', title: 'Healing Period', desc: '3-6 months for osseointegration with the jawbone.' },
    { step: '05', title: 'Crown Placement', desc: 'Custom ceramic crown attached for a perfect smile.' },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <BackgroundParticles />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <button
          onClick={() => navigate({ to: '/' })}
          className="text-muted-foreground hover:text-foreground transition-colors mb-8 flex items-center gap-2"
        >
          ← Back to Home
        </button>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Premium Treatment
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
              Book Consultation
            </button>
          </div>
          <ZoomInImage src={imageUrl} alt={title} className="rounded-2xl shadow-xl" />
        </div>

        {/* Benefits */}
        <div className="glass-card rounded-2xl p-8 mb-10 border border-border/40">
          <TypewriterText
            text="Why Choose Dental Implants?"
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

        {/* Process */}
        <div className="mb-10">
          <TypewriterText
            text="The Implant Process"
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to Restore Your Smile?</h2>
          <p className="text-muted-foreground mb-6">Book a free consultation today and take the first step.</p>
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
