import { useState } from 'react';
import HiddenAdminLoginModal from './HiddenAdminLoginModal';

export default function Footer() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'xyz-dental-clinic'
  );

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/generated/tooth-logo-footer.dim_48x48.png"
                alt="XYZ Dental Clinic"
                className="w-8 h-8 object-contain"
              />
              <span className="text-white font-bold text-lg">XYZ Dental Clinic</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for a healthy, beautiful smile. Advanced dental care with a gentle touch.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Services</a></li>
              <li><a href="#doctor" className="hover:text-teal-400 transition-colors">Our Doctor</a></li>
              <li><a href="#reviews" className="hover:text-teal-400 transition-colors">Reviews</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 +91 63521 74912</li>
              <li>📍 123 Dental Street, City</li>
              <li>🕐 Mon–Sat: 9 AM – 7 PM</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-xs text-gray-500">
              © {currentYear} XYZ Dental Clinic. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Built with{' '}
              <span className="text-red-400">♥</span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                caffeine.ai
              </a>
            </p>

            {/* Secret tooth icon trigger for admin login */}
            <button
              onClick={() => setAdminModalOpen(true)}
              className="mt-2 opacity-30 hover:opacity-60 transition-opacity duration-300 focus:outline-none"
              aria-label="Admin access"
              title=""
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 4C22 4 14 11 14 20c0 5 2 9 4 13l4 18c1 4 4 6 6 6h8c2 0 5-2 6-6l4-18c2-4 4-8 4-13 0-9-8-16-18-16z"
                  fill="#0d9488"
                  stroke="#0d9488"
                  strokeWidth="1"
                />
                <path
                  d="M24 20c0-4 3-7 8-7s8 3 8 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <HiddenAdminLoginModal
        open={adminModalOpen}
        onOpenChange={setAdminModalOpen}
      />
    </footer>
  );
}
