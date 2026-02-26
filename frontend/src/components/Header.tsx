import { useState } from 'react';
import BookAppointmentDialog from './BookAppointmentDialog';

export default function Header() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBrandClick = () => {
    window.location.reload();
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Doctor', href: '#doctor' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand - click to reload */}
          <button
            onClick={handleBrandClick}
            className="flex items-center gap-2 focus:outline-none group"
            aria-label="XYZ Dental Clinic - Click to refresh"
          >
            <img
              src="/assets/generated/tooth-logo-footer.dim_48x48.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-lg text-gray-900 group-hover:text-teal-600 transition-colors">
              XYZ Dental Clinic
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Book Appointment Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingOpen(true)}
              className="book-appointment-btn hidden md:block"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              Book Appointment
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setBookingOpen(true);
              }}
              className="book-appointment-btn w-full mt-2"
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
