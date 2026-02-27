import React, { useState } from 'react';
import HiddenAdminLoginModal from './HiddenAdminLoginModal';
import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Doctors', href: '/#doctors' },
    { label: 'Contact', href: '/#contact' },
  ];

  const services = [
    'Dental Implants',
    'Invisalign',
    'Smile Makeover',
    'Pediatric Dentistry',
    'Laser Dentistry',
    'Teeth Whitening',
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setAdminModalOpen(true)}
                className="focus:outline-none hover:opacity-80 transition-opacity"
                aria-label="Admin access"
                title="Admin"
              >
                <img
                  src="/assets/generated/tooth-logo-footer.dim_48x48.png"
                  alt="SmileCare Dental"
                  className="w-10 h-10 object-contain"
                />
              </button>
              <div>
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                  SmileCare Dental
                </h3>
                <p className="text-teal-400 text-xs">Premium Dental Care</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing exceptional dental care with a gentle touch. Your smile is our passion and our promise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <span>123 Dental Street, Medical District, City - 400001</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href="tel:+916352174912" className="hover:text-teal-400 transition-colors">
                  +91 63521 74912
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href="mailto:info@smilecare.com" className="hover:text-teal-400 transition-colors">
                  info@smilecare.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon–Sat: 9:00 AM – 7:00 PM</p>
                  <p>Sunday: 10:00 AM – 2:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SmileCare Dental. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-teal-500 fill-teal-500 mx-1" /> for healthier smiles
          </p>
        </div>
      </div>

      {/* Admin Login Modal — uses onClose prop */}
      <HiddenAdminLoginModal open={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </footer>
  );
}
