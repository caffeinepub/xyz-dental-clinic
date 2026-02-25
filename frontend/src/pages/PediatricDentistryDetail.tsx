import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle, Smile } from 'lucide-react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';

const benefits = [
  'Child-friendly, anxiety-free environment',
  'Gentle techniques designed for young patients',
  'Preventive care to build healthy habits early',
  'Fun, colorful treatment rooms kids love',
  'Experienced pediatric dental specialists',
  'Parent education and guidance included',
];

const process = [
  'Warm welcome and fun introduction to the clinic',
  'Gentle examination with child-friendly tools',
  'Digital X-rays with minimal radiation',
  'Cleaning and fluoride treatment',
  'Sealants to protect growing teeth',
  'Fun reward and take-home care kit',
];

export default function PediatricDentistryDetail() {
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-teal/10 to-royal-blue/10 relative overflow-hidden">
        {/* Floating bubbles background */}
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="bubble-particle-hero"
            style={{
              left: `${5 + i * 9}%`,
              animationDelay: `${i * 0.5}s`,
              width: `${12 + (i % 4) * 8}px`,
              height: `${12 + (i % 4) * 8}px`,
              bottom: 0,
            }}
          />
        ))}

        <div className="container relative z-10">
          <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="relative w-full max-w-sm mx-auto lg:mx-0 mb-6 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/assets/generated/pediatric-dentistry-icon.dim_600x400.png"
                  alt="Pediatric Dentistry"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Smile className="h-6 w-6 text-teal" />
                <span className="text-sm font-semibold text-teal uppercase tracking-wider">Kids Dentistry</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Pediatric Dentistry</h1>
              <p className="text-lg text-muted-foreground mb-6">
                We make dental visits fun and stress-free for children! Our specially trained pediatric team
                creates a warm, playful environment where kids actually look forward to their appointments.
              </p>
              <Button size="lg" className="animated-button" onClick={() => setBookingOpen(true)}>
                <Calendar className="mr-2 h-5 w-5" />
                Book Kids Appointment
              </Button>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 animate-slide-in-right">
              <h2 className="text-2xl font-bold mb-6">Why Kids Love Us</h2>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-teal shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-8 text-center">What to Expect</h2>
            <div className="space-y-6">
              {process.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal to-royal-blue flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-lg">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
