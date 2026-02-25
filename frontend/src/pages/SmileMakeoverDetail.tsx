import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle, Star } from 'lucide-react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const benefits = [
  'Complete smile transformation in one treatment plan',
  'Combines whitening, veneers, implants, and more',
  'Fully customized to your facial features',
  'Digital smile preview before treatment begins',
  'Long-lasting, natural-looking results',
  'Boosts confidence and quality of life',
];

const process = [
  'Comprehensive smile analysis and consultation',
  'Digital smile design and preview',
  'Personalized multi-treatment plan creation',
  'Preparatory treatments (cleaning, extractions if needed)',
  'Core cosmetic procedures (veneers, whitening, implants)',
  'Final polishing, adjustments, and maintenance plan',
];

export default function SmileMakeoverDetail() {
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-royal-blue/10 to-teal/10">
        <div className="container">
          <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="relative w-full max-w-lg mx-auto lg:mx-0 mb-6 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/assets/generated/smile-makeover-banner.dim_1200x500.png"
                  alt="Smile Makeover"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-bold text-xl drop-shadow">
                  Your Dream Smile Awaits
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-teal uppercase tracking-wider">Premium Transformation</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Smile Makeover</h1>
              <p className="text-lg text-muted-foreground mb-6">
                A complete smile transformation combining the best of cosmetic dentistry. See real patient
                results in our before & after gallery below.
              </p>
              <Button size="lg" className="animated-button" onClick={() => setBookingOpen(true)}>
                <Calendar className="mr-2 h-5 w-5" />
                Start Your Transformation
              </Button>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 animate-slide-in-right">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
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

      {/* Before/After Gallery */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">Real Patient Transformations</h2>
            <p className="text-muted-foreground">Drag the sliders to see the incredible before & after results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <BeforeAfterSlider
              beforeImage="/assets/generated/smile-before-1.dim_800x500.png"
              afterImage="/assets/generated/smile-after-1.dim_800x500.png"
              title="Smile Makeover Case 1"
            />
            <BeforeAfterSlider
              beforeImage="/assets/generated/before-whitening.dim_800x600.png"
              afterImage="/assets/generated/after-whitening.dim_800x600.png"
              title="Smile Makeover Case 2"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Makeover Journey</h2>
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
