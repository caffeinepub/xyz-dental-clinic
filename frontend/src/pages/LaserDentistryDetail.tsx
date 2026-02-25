import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle, Zap } from 'lucide-react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';

const benefits = [
  'Virtually painless procedures — minimal anesthesia needed',
  'Faster healing and reduced post-treatment discomfort',
  'Highly precise — targets only affected tissue',
  'Reduced risk of infection (laser sterilizes as it works)',
  'Less bleeding and swelling than traditional methods',
  'Suitable for gum disease, cavity removal, and more',
];

const process = [
  'Consultation and laser treatment assessment',
  'Digital mapping of treatment area',
  'Protective eyewear fitted for patient and team',
  'Precise laser application to targeted tissue',
  'Immediate post-treatment care and cooling',
  'Follow-up and healing progress check',
];

export default function LaserDentistryDetail() {
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-royal-blue/10 to-teal/10 relative overflow-hidden">
        {/* Laser beam decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="laser-hero-beam" />
        </div>

        <div className="container relative z-10">
          <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="relative w-full max-w-sm mx-auto lg:mx-0 mb-6 overflow-hidden rounded-2xl shadow-2xl laser-card-wrapper">
                <div className="laser-beam" />
                <img
                  src="/assets/generated/laser-dentistry-card.dim_600x400.png"
                  alt="Laser Dentistry"
                  className="w-full h-auto relative z-10"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-6 w-6 text-teal animate-pulse" />
                <span className="text-sm font-semibold text-teal uppercase tracking-wider">Advanced Technology</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Laser Dentistry</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Experience the future of dentistry with our state-of-the-art laser technology. Precise,
                painless, and incredibly effective — laser dentistry transforms your treatment experience.
              </p>
              <Button size="lg" className="animated-button" onClick={() => setBookingOpen(true)}>
                <Calendar className="mr-2 h-5 w-5" />
                Book Laser Treatment
              </Button>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 animate-slide-in-right">
              <h2 className="text-2xl font-bold mb-6">Laser Advantages</h2>
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
