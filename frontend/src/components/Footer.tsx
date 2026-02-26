import { useState } from 'react';
import HiddenAdminLoginModal from './HiddenAdminLoginModal';

export default function Footer() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'xyz-dental-clinic'
  );

  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-teal-400 mb-3 font-playfair">XYZ Dental Clinic</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium dental care with a gentle touch. Your smile is our passion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Services</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/services/dental-implants" className="hover:text-teal-400 transition-colors">Dental Implants</a></li>
              <li><a href="/services/invisalign" className="hover:text-teal-400 transition-colors">Invisalign</a></li>
              <li><a href="/services/pediatric-dentistry" className="hover:text-teal-400 transition-colors">Pediatric Dentistry</a></li>
              <li><a href="/services/smile-makeover" className="hover:text-teal-400 transition-colors">Smile Makeover</a></li>
              <li><a href="/services/laser-dentistry" className="hover:text-teal-400 transition-colors">Laser Dentistry</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>📞 +91 63521 74912</li>
              <li>📍 123 Dental Street, City</li>
              <li>🕐 Mon–Sat: 9AM – 7PM</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col items-center gap-3">
            <p className="text-slate-500 text-sm text-center">
              © {new Date().getFullYear()} XYZ Dental Clinic. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs text-center">
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

            {/* Tooth Logo Admin Trigger */}
            <button
              onClick={() => setAdminModalOpen(true)}
              className="mt-2 opacity-40 hover:opacity-80 transition-opacity duration-300 focus:outline-none"
              title=""
              aria-label="Admin"
            >
              <img
                src="/assets/generated/tooth-logo-footer.dim_48x48.png"
                alt=""
                className="w-8 h-8 object-contain"
                style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(160deg)' }}
              />
            </button>
          </div>
        </div>
      </div>

      <HiddenAdminLoginModal open={adminModalOpen} onOpenChange={setAdminModalOpen} />
    </footer>
  );
}
