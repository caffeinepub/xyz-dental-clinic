import React, { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useGetService } from '../hooks/useQueries';
import BookAppointmentDialog from '../components/BookAppointmentDialog';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServiceDetail() {
  const { serviceId } = useParams({ strict: false });
  const { data: service, isLoading } = useGetService(serviceId || '');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
            </div>
          ) : service ? (
            <div>
              {service.featuredPhoto && (
                <div className="rounded-2xl overflow-hidden mb-8 shadow-lg" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={service.featuredPhoto.getDirectURL()}
                    alt={service.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{service.displayName}</h1>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">{service.description}</p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                <Calendar size={18} />
                Book Appointment
              </button>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Service not found.</p>
              <button
                onClick={() => window.location.href = '/'}
                className="mt-4 text-blue-600 hover:underline"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BookAppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={service?.displayName}
      />
    </div>
  );
}
