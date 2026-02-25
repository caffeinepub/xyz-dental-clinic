import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import BackgroundParticles from '@/components/BackgroundParticles';
import BookAppointmentDialog from '@/components/BookAppointmentDialog';
import ZoomInImage from '@/components/ZoomInImage';
import TypewriterText from '@/components/TypewriterText';
import { useGetService } from '@/hooks/useQueries';

export default function PediatricDentistryDetail() {
  const navigate = useNavigate();
  const { data: service } = useGetService('pediatric-dentistry');
  const [bookingOpen, setBookingOpen] = useState(false);

  const title = service?.displayName || 'Pediatric Dentistry';
  const description =
    service?.description ||
    'Fun, fear-free dental care designed especially for children aged 1–16.';
  const imageUrl =
    service?.featuredPhoto?.getDirectURL() ||
    '/assets/generated/pediatric-dentistry-icon.dim_600x400.png';

  const benefits = [
    'Child-friendly, anxiety-free environment',
    'Gentle techniques designed for young patients',
    'Preventive care to build healthy habits early',
    'Fun, colorful treatment rooms kids love',
    'Experienced pediatric dental specialists',
    'Parent education and guidance included',
  ];

  const steps = [
    { step: '01', title: 'Warm Welcome', desc: 'Fun introduction to the clinic with child-friendly tools.' },
    { step: '02', title: 'Gentle Examination', desc: 'Thorough but gentle check-up using kid-safe instruments.' },
    { step: '03', title: 'Digital X-Rays', desc: 'Low-radiation digital X-rays for accurate diagnosis.' },
    { step: '04', title: 'Cleaning & Fluoride', desc: 'Professional cleaning and fluoride treatment.' },
    { step: '05', title: 'Fun Reward', desc: 'Sticker, prize, and take-home care kit for every visit.' },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundParticles />

      {/* Floating bubbles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${12 + (i % 4) * 8}px`,
            height: `${12 + (i % 4) * 8}px`,
            left: `${5 + i * 12}%`,
            bottom: 0,
            background: 'rgba(20,184,166,0.15)',
            animation: `bubbleRise ${3 + i * 0.5}s ease-in infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

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
              Kids Dentistry
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
              Book Kids Appointment
            </button>
          </div>
          <ZoomInImage src={imageUrl} alt={title} className="rounded-2xl shadow-xl" />
        </div>

        {/* Benefits */}
        <div className="glass-card rounded-2xl p-8 mb-10 border border-border/40">
          <TypewriterText
            text="Why Kids Love Us"
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
            text="What to Expect"
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Make Dental Visits Fun! 🎉</h2>
          <p className="text-muted-foreground mb-6">
            Book your child's first appointment and start a lifetime of healthy smiles.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Book Kids Appointment
          </button>
        </div>
      </div>

      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
