import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";
import HiddenAdminLoginModal from "./HiddenAdminLoginModal";

export default function Footer() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const year = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  title="Admin"
                >
                  <img
                    src="/assets/generated/tooth-logo-footer.dim_48x48.png"
                    alt="XYZ Dental"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </button>
                <div>
                  <p className="font-bold text-white text-lg">
                    XYZ Dental Clinic
                  </p>
                  <p className="text-xs text-gray-400">
                    Your Smile, Our Priority
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Providing exceptional dental care with the latest technology and
                a gentle touch.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["home", "services", "about", "contact"].map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className="text-sm text-gray-400 hover:text-white transition-colors capitalize"
                    >
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {[
                  "Invisalign",
                  "Dental Implants",
                  "Laser Dentistry",
                  "Pediatric Dentistry",
                  "Smile Makeover",
                ].map((s) => (
                  <li key={s}>
                    <span className="text-sm text-gray-400">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <Phone size={14} className="mt-0.5 shrink-0 text-blue-400" />
                  <span>+91 63521 74912</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <Mail size={14} className="mt-0.5 shrink-0 text-blue-400" />
                  <span>info@xyzdental.com</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-blue-400" />
                  <span>123 Dental Street, Mumbai, India</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <Clock size={14} className="mt-0.5 shrink-0 text-blue-400" />
                  <span>Mon–Sat: 9AM–7PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {year} XYZ Dental Clinic - Quality Dental Care
            </p>
          </div>
        </div>
      </footer>

      <HiddenAdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </>
  );
}
