import React, { useRef, useState } from 'react';
import HiddenAdminLoginModal from './HiddenAdminLoginModal';

export default function Footer() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopyrightClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 600);
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setAdminModalOpen(true);
    }
  };

  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'dr-smile-dental'
  );

  return (
    <>
      <footer className="bg-background border-t border-border/40 pt-12 pb-6 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C9.5 2 7 4 7 7c0 1.5.5 3 1 4.5C8.5 13 9 15 9 17c0 2 1 4 3 4s3-2 3-4c0-2 .5-4 1-5.5.5-1.5 1-3 1-4.5C17 4 14.5 2 12 2z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span className="font-bold text-xl text-foreground">Dr. Smile Dental</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Advanced dental care with a gentle touch. Your smile is our passion and our promise.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {['Home', 'Services', 'Doctor', 'Gallery', 'Reviews', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2">
                {[
                  'Dental Implants',
                  'Invisalign',
                  'Kids Dentistry',
                  'Smile Makeover',
                  'Laser Dentistry',
                ].map((s) => (
                  <li key={s}>
                    <span className="text-muted-foreground text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="text-muted-foreground text-xs cursor-default select-none"
              onClick={handleCopyrightClick}
            >
              © {year} Dr. Smile Dental. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs">
              Built with <span className="text-red-500">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>

        {/* Invisible 1×1px trigger */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 1,
            height: 1,
            opacity: 0,
            cursor: 'default',
          }}
          onClick={() => setAdminModalOpen(true)}
          aria-hidden="true"
        />
      </footer>

      <HiddenAdminLoginModal open={adminModalOpen} onOpenChange={setAdminModalOpen} />
    </>
  );
}
