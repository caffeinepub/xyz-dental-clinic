import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';

const serviceDetails: Record<string, {
  title: string;
  description: string;
  benefits: string[];
  process: string[];
  icon: string;
}> = {
  'root-canal': {
    title: 'Root Canal Treatment',
    description: 'Advanced endodontic care to save your natural teeth and eliminate pain. Our gentle approach ensures your comfort throughout the procedure.',
    benefits: [
      'Saves your natural tooth',
      'Eliminates tooth pain',
      'Prevents infection spread',
      'Restores normal biting force',
      'Natural appearance maintained',
    ],
    process: [
      'Initial examination and X-rays',
      'Local anesthesia for comfort',
      'Removal of infected pulp',
      'Cleaning and shaping of canals',
      'Filling and sealing',
      'Crown placement if needed',
    ],
    icon: '/assets/generated/icon-root-canal.dim_256x256.png',
  },
  'braces': {
    title: 'Braces & Orthodontics',
    description: 'Modern orthodontic solutions to straighten your teeth and improve your bite. We offer traditional braces and clear aligners.',
    benefits: [
      'Straighter, more attractive smile',
      'Improved bite function',
      'Easier cleaning and maintenance',
      'Reduced risk of tooth damage',
      'Boosted self-confidence',
    ],
    process: [
      'Comprehensive orthodontic evaluation',
      'Custom treatment plan creation',
      'Braces or aligner fitting',
      'Regular adjustment appointments',
      'Progress monitoring',
      'Retainer fitting after completion',
    ],
    icon: '/assets/generated/icon-braces.dim_256x256.png',
  },
  'whitening': {
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments that deliver dramatic results safely and effectively. Get a brighter smile in just one visit.',
    benefits: [
      'Dramatically whiter teeth',
      'Safe and effective treatment',
      'Quick results in one session',
      'Long-lasting brightness',
      'Customized to your needs',
    ],
    process: [
      'Initial consultation and shade assessment',
      'Professional cleaning',
      'Protective gel application',
      'Whitening treatment',
      'Post-treatment care instructions',
      'Take-home maintenance kit',
    ],
    icon: '/assets/generated/icon-whitening.dim_256x256.png',
  },
  'implants': {
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solution that looks, feels, and functions like natural teeth. The gold standard in tooth restoration.',
    benefits: [
      'Permanent tooth replacement',
      'Natural look and feel',
      'Prevents bone loss',
      'No damage to adjacent teeth',
      'Improved speech and eating',
    ],
    process: [
      'Comprehensive evaluation and planning',
      'Implant placement surgery',
      'Healing and osseointegration period',
      'Abutment placement',
      'Custom crown fabrication',
      'Final crown placement',
    ],
    icon: '/assets/generated/icon-implants.dim_256x256.png',
  },
};

export default function ServiceDetail() {
  const { serviceId } = useParams({ from: '/services/$serviceId' });
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);

  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <Button onClick={() => navigate({ to: '/' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gradient-to-br from-royal-blue/10 to-teal/10">
        <div className="container">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/' })}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <img
                src={service.icon}
                alt={service.title}
                className="w-48 h-48 mx-auto lg:mx-0 mb-6"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
              <Button size="lg" className="animated-button" onClick={() => setBookingOpen(true)}>
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
            </div>

            <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 animate-slide-in-right">
              <h2 className="text-2xl font-bold mb-6">Benefits</h2>
              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
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
              {service.process.map((step, index) => (
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
