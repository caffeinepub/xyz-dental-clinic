import React, { useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const CONTACT_CARDS = [
  {
    icon: <Phone size={24} />,
    title: 'Phone',
    lines: ['+91 63521 74912', 'Mon–Sat: 9AM–7PM'],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Mail size={24} />,
    title: 'Email',
    lines: ['info@xyzdental.com', 'We reply within 24 hours'],
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: <MapPin size={24} />,
    title: 'Address',
    lines: ['123 Dental Street', 'Mumbai, Maharashtra 400001'],
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: <Clock size={24} />,
    title: 'Hours',
    lines: ['Mon–Fri: 9AM–7PM', 'Sat: 9AM–5PM | Sun: Closed'],
    color: 'bg-orange-50 text-orange-600',
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(-30px)';
    });
    if (mapRef.current) {
      mapRef.current.style.opacity = '0';
      mapRef.current.style.transform = 'scale(0.95)';
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
              }, i * 100);
            });
            if (mapRef.current) {
              mapRef.current.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
              mapRef.current.style.opacity = '1';
              mapRef.current.style.transform = 'scale(1)';
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <div className="space-y-4">
            {CONTACT_CARDS.map((card, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{card.title}</h3>
                  {card.lines.map((line, j) => (
                    <p key={j} className="text-gray-500 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/916352174912"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={24} />
              <div>
                <p className="font-bold">Chat on WhatsApp</p>
                <p className="text-green-100 text-sm">Quick response guaranteed</p>
              </div>
            </a>
          </div>

          {/* Map */}
          <div ref={mapRef} className="rounded-2xl overflow-hidden shadow-lg h-96 lg:h-auto min-h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clinic Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
