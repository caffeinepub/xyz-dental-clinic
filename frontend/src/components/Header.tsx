import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import BookAppointmentDialog from './BookAppointmentDialog';
import { useClinicStatusContext } from '../context/ClinicStatusContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { isClosed, isEmergency } = useClinicStatusContext();

  const canBook = !isClosed;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 group"
            >
              <img
                src="/assets/generated/tooth-logo-icon.dim_64x64.png"
                alt="XYZ Dental"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div>
                <span
                  className={`font-bold text-xl tracking-tight transition-colors ${
                    isScrolled ? 'text-blue-900' : 'text-white'
                  }`}
                >
                  XYZ Dental
                </span>
                <span
                  className={`block text-xs transition-colors ${
                    isScrolled ? 'text-blue-600' : 'text-blue-200'
                  }`}
                >
                  Clinic
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+916352174912"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
                }`}
              >
                <Phone size={16} />
                <span>+91 63521 74912</span>
              </a>
              <button
                onClick={() => canBook && setIsBookingOpen(true)}
                disabled={!canBook}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  canBook
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left text-gray-700 font-medium py-2 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="tel:+916352174912"
                className="flex items-center gap-2 text-gray-700 font-medium py-2"
              >
                <Phone size={16} />
                +91 63521 74912
              </a>
              <button
                onClick={() => {
                  if (canBook) {
                    setIsBookingOpen(true);
                    setIsMobileMenuOpen(false);
                  }
                }}
                disabled={!canBook}
                className={`w-full py-3 rounded-full text-sm font-semibold transition-all ${
                  canBook
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </header>

      <BookAppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
