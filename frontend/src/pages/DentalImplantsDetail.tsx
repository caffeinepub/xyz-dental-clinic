import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle, Zap } from 'lucide-react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';

const benefits = [
  'Permanent, lifetime tooth replacement',
  'Looks, feels, and functions like natural teeth',
  'Prevents jawbone loss and facial sagging',
  'No damage to adjacent healthy teeth',
  'Improved speech, chewing, and confidence',
  '3D-guided precision placement for best outcomes',
];

const process = [
  'Comprehensive 3D CT scan and digital planning',
  'Bone density assessment and treatment design',
  'Implant post placement under local anesthesia',
  'Osseointegration healing period (3–6 months)',
  'Custom abutment and crown fabrication',
  'Final crown placement and bite adjustment',
];

export default function DentalImplantsDetail() {
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-royal-blue/10 to-teal/10 relative overflow-hidden">
        {/* Animated implant drop visual */}
        <div className="absolute right-8 top-8 opacity-10 pointer-events-none hidden lg:block">
          <div className="implant-drop-anim w-32 h-32 bg-gradient-to-b from-royal-blue to-teal rounded-full" />
        </div>

        <div className="container">
          <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="relative w-full max-w-sm mx-auto lg:mx-0 mb-6 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/assets/generated/dental-implant-diagram.dim_600x400.png"
                  alt="Dental Implant Diagram"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow">
                  3D Guided Precision
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-6 w-6 text-teal" />
                <span className="text-sm font-semibold text-teal uppercase tracking-wider">Premium Service</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Advanced Dental Implants</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Experience the gold standard in tooth replacement. Our 3D-guided implant technology ensures
                perfect placement, faster healing, and results that last a lifetime.
              </p>
              <Button size="lg" className="animated-button" onClick={() => setBookingOpen(true)}>
                <Calendar className="mr-2 h-5 w-5" />
                Book Consultation
              </Button>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 animate-slide-in-right">
              <h2 className="text-2xl font-bold mb-6">Why Choose Our Implants?</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Treatment Process</h2>
            <div className="space-y-6">
              {process.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-royal-blue to-teal flex items-center justify-center text-white font-bold">
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
