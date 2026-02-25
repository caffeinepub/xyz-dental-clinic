import React, { useState, useRef, useCallback } from 'react';
import HiddenAdminLoginModal from './HiddenAdminLoginModal';
import BookAppointmentDialog from './BookAppointmentDialog';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoMouseDown = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      setAdminModalOpen(true);
    }, 3000);
  }, []);

  const handleLogoMouseUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleLogoTouchStart = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      setAdminModalOpen(true);
    }, 3000);
  }, []);

  const handleLogoTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with long-press trigger */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onMouseDown={handleLogoMouseDown}
              onMouseUp={handleLogoMouseUp}
              onMouseLeave={handleLogoMouseUp}
              onTouchStart={handleLogoTouchStart}
              onTouchEnd={handleLogoTouchEnd}
              onTouchCancel={handleLogoTouchEnd}
              onClick={() => scrollTo('hero')}
            >
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C9.5 2 7 4 7 7c0 1.5.5 3 1 4.5C8.5 13 9 15 9 17c0 2 1 4 3 4s3-2 3-4c0-2 .5-4 1-5.5.5-1.5 1-3 1-4.5C17 4 14.5 2 12 2z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl text-foreground">Dr. Smile</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Services', id: 'services' },
                { label: 'Doctor', id: 'doctor' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'Reviews', id: 'reviews' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Book Button */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setBookingOpen(true)}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/40 px-4 py-4 space-y-3">
            {[
              { label: 'Home', id: 'hero' },
              { label: 'Services', id: 'services' },
              { label: 'Doctor', id: 'doctor' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Reviews', id: 'reviews' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setBookingOpen(true);
              }}
              className="w-full px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      <HiddenAdminLoginModal open={adminModalOpen} onOpenChange={setAdminModalOpen} />
      <BookAppointmentDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
