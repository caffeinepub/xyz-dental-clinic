import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import { useGetService } from '../hooks/useQueries';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ServiceDetail() {
  const { serviceId } = useParams({ from: '/services/$serviceId' });
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);
  const { data: service, isLoading } = useGetService(serviceId);
  const { ref, isVisible } = useScrollReveal<HTMLElement>(0.05);

  const displayName = service?.displayName || serviceId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const description = service?.description || 'Professional dental care tailored to your needs.';

  return (
    <div className="min-h-screen">
      <section
        ref={ref}
        className={`py-20 px-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-8 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Home
          </button>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-8 md:p-12">
              {service?.featuredPhoto && (
                <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <img
                    src={service.featuredPhoto.getDirectURL()}
                    alt={displayName}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              <h1 className="text-4xl font-playfair font-bold text-teal-700 mb-4">{displayName}</h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">{description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {['Expert Care', 'Modern Equipment', 'Comfortable Experience', 'Affordable Pricing'].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-teal-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full shadow-lg transition-all hover:scale-105"
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>
      </section>

      <BookAppointmentDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultService={displayName}
      />
    </div>
  );
}
