import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import BackgroundParticles from '@/components/BackgroundParticles';
import BookAppointmentDialog from '@/components/BookAppointmentDialog';
import ZoomInImage from '@/components/ZoomInImage';
import TypewriterText from '@/components/TypewriterText';
import { useGetService } from '@/hooks/useQueries';

export default function LaserDentistryDetail() {
  const navigate = useNavigate();
  const { data: service } = useGetService('laser-dentistry');
  const [bookingOpen, setBookingOpen] = useState(false);

  const title = service?.displayName || 'Laser Dentistry';
  const description =
    service?.description ||
    'Painless precision laser treatments for gums, cavities, and whitening.';
  const imageUrl =
    service?.featuredPhoto?.getDirectURL() ||
    '/assets/generated/laser-dentistry-card.dim_600x400.png';

  const benefits = [
    'Virtually painless — minimal anesthesia needed',
    'Faster healing and reduced discomfort',
    'Highly precise — targets only affected tissue',
    'Reduced risk of infection',
    'Less bleeding and swelling',
    'Suitable for gum disease, cavities, and more',
  ];

  const steps = [
    { step: '01', title: 'Consultation', desc: 'Laser treatment assessment and digital mapping.' },
    { step: '02', title: 'Preparation', desc: 'Protective eyewear fitted for patient and team.' },
    { step: '03', title: 'Laser Treatment', desc: 'Precise laser application to targeted tissue.' },
    { step: '04', title: 'Post-Care', desc: 'Immediate post-treatment care and cooling.' },
    { step: '05', title: 'Follow-Up', desc: 'Healing progress check and maintenance guidance.' },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundParticles />

      {/* Laser beam decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '-20%',
            width: '140%',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, rgba(20,184,166,0.4), rgba(56,189,248,0.6), rgba(20,184,166,0.4), transparent)',
            boxShadow: '0 0 20px 4px rgba(20,184,166,0.2)',
            animation: 'laserSweep 6s ease-in-out infinite',
          }}
        />
      </div>

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
              Advanced Technology
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
              Book Laser Treatment
            </button>
          </div>
          <ZoomInImage src={imageUrl} alt={title} className="rounded-2xl shadow-xl" />
        </div>

        {/* Benefits */}
        <div className="glass-card rounded-2xl p-8 mb-10 border border-border/40">
          <TypewriterText
            text="Laser Advantages"
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
            text="Treatment Process"
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Experience Painless Dentistry ⚡</h2>
          <p className="text-muted-foreground mb-6">
            Book your laser treatment consultation today.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Book Laser Treatment
          </button>
        </div>
      </div>

      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
