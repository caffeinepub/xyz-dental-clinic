import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  accentColor: string;
}

const premiumServices: ServiceCard[] = [
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement with titanium implants that look and feel natural.',
    icon: '🦷',
    path: '/services/dental-implants',
    color: 'from-blue-50 to-teal-50',
    accentColor: 'teal',
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description: 'Clear aligners for a straighter smile without traditional metal braces.',
    icon: '😁',
    path: '/services/invisalign',
    color: 'from-purple-50 to-blue-50',
    accentColor: 'purple',
  },
  {
    id: 'pediatric-dentistry',
    title: 'Kids Dentistry',
    description: 'Gentle, fun dental care designed specifically for children of all ages.',
    icon: '👶',
    path: '/services/pediatric-dentistry',
    color: 'from-yellow-50 to-orange-50',
    accentColor: 'orange',
  },
  {
    id: 'smile-makeover',
    title: 'Smile Makeover',
    description: 'Complete smile transformation combining multiple cosmetic procedures.',
    icon: '✨',
    path: '/services/smile-makeover',
    color: 'from-pink-50 to-rose-50',
    accentColor: 'pink',
  },
  {
    id: 'laser-dentistry',
    title: 'Laser Dentistry',
    description: 'Advanced laser technology for precise, comfortable dental treatments.',
    icon: '⚡',
    path: '/services/laser-dentistry',
    color: 'from-green-50 to-teal-50',
    accentColor: 'green',
  },
];

const standardServices = [
  { icon: '🔬', title: 'General Checkup', description: 'Comprehensive oral health examination and cleaning.' },
  { icon: '🪥', title: 'Teeth Whitening', description: 'Professional whitening for a brighter, confident smile.' },
  { icon: '🦴', title: 'Root Canal', description: 'Pain-free root canal treatment to save your natural tooth.' },
  { icon: '🛡️', title: 'Dental Crown', description: 'Custom crowns to restore damaged or weakened teeth.' },
];

function PremiumServiceCard({ service }: { service: ServiceCard }) {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => navigate({ to: service.path })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer
        bg-gradient-to-br ${service.color}
        border border-white/60 shadow-md
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{
        transform: isVisible
          ? hovered
            ? 'translateY(-8px)'
            : 'translateY(0px)'
          : 'translateY(32px)',
        boxShadow: hovered
          ? '0 20px 40px rgba(13, 148, 136, 0.25), 0 0 0 1px rgba(13, 148, 136, 0.1)'
          : '0 4px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Animated background glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(13,148,136,0.08) 0%, transparent 70%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10">
        <div className="text-4xl mb-3">{service.icon}</div>
        <h3 className="text-lg font-bold text-slate-800 mb-2 font-playfair">{service.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.description}</p>
        <span className="inline-flex items-center gap-1 text-teal-600 text-sm font-semibold hover:gap-2 transition-all">
          Learn More <span>→</span>
        </span>
      </div>
    </div>
  );
}

function StandardServiceCard({ service }: { service: typeof standardServices[0] }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        bg-white rounded-xl p-5 border border-slate-100
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{
        transform: isVisible
          ? hovered ? 'translateY(-4px)' : 'translateY(0px)'
          : 'translateY(32px)',
        boxShadow: hovered
          ? '0 12px 24px rgba(13, 148, 136, 0.15)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="text-3xl mb-2">{service.icon}</div>
      <h3 className="font-semibold text-slate-800 mb-1">{service.title}</h3>
      <p className="text-slate-500 text-sm">{service.description}</p>
    </div>
  );
}

export default function ServicesGrid() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center mb-14 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-slate-800 font-playfair mb-4">
            Our Premium Services
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            World-class dental treatments delivered with precision, care, and the latest technology.
          </p>
        </div>

        {/* Premium Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {premiumServices.map((service) => (
            <PremiumServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Standard Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {standardServices.map((service) => (
            <StandardServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
