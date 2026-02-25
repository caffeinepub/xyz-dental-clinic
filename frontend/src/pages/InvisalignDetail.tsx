import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const benefits = [
  'Nearly invisible — no metal brackets or wires',
  'Removable for eating, drinking, and brushing',
  'Comfortable smooth plastic aligners',
  'Fewer dental visits than traditional braces',
  'Predictable results with 3D digital planning',
  'Suitable for teens and adults',
];

const process = [
  'Digital 3D scan of your teeth',
  'Custom treatment plan with virtual preview',
  'Series of custom-made clear aligners fabricated',
  'Wear each aligner set for 1–2 weeks',
  'Regular check-ins every 6–8 weeks',
  'Retainer fitting after treatment completion',
];

export default function InvisalignDetail() {
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-royal-blue/10 to-teal/10">
        <div className="container">
          <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="relative w-full max-w-sm mx-auto lg:mx-0 mb-6 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/assets/generated/invisalign-aligner.dim_600x400.png"
                  alt="Invisalign Aligner"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-6 w-6 text-teal" />
                <span className="text-sm font-semibold text-teal uppercase tracking-wider">Premium Service</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Invisalign Clear Aligners</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Straighten your teeth discreetly with Invisalign — the world's most advanced clear aligner system.
                See the transformation with our interactive before & after comparison below.
              </p>
              <Button size="lg" className="animated-button" onClick={() => setBookingOpen(true)}>
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </Button>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 animate-slide-in-right">
              <h2 className="text-2xl font-bold mb-6">Why Invisalign?</h2>
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

      {/* Before/After Comparison */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">See the Transformation</h2>
            <p className="text-muted-foreground">Drag the slider to compare before and after Invisalign treatment</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/assets/generated/invisalign-before.dim_800x500.png"
              afterImage="/assets/generated/invisalign-after.dim_800x500.png"
              title="Invisalign Transformation"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Invisalign Journey</h2>
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
