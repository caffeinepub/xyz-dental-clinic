import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import BookAppointmentDialog from './BookAppointmentDialog';

export default function Header() {
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/#services' },
    { label: 'About', path: '/#about' },
    { label: 'Contact', path: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Name - clicking causes full page reload */}
        <button
          onClick={() => window.location.reload()}
          className="text-xl font-bold text-teal-700 font-playfair hover:text-teal-600 transition-colors focus:outline-none cursor-pointer"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          XYZ Dental Clinic
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Book Appointment Button */}
        <div className="hidden md:block">
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-md"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-600 hover:text-teal-600 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="block text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setBookingOpen(true); setMobileMenuOpen(false); }}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            Book Appointment
          </button>
        </div>
      )}

      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </header>
  );
}
