import { useNavigate } from '@tanstack/react-router';
import { useCursorContext } from '../context/CursorContext';

const services = [
  {
    id: 'teeth-whitening',
    icon: '/assets/generated/icon-whitening.dim_256x256.png',
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments that brighten your smile by up to 8 shades in a single visit.',
    color: 'from-teal-500/20 to-teal-600/10',
  },
  {
    id: 'dental-implants-basic',
    icon: '/assets/generated/icon-implants.dim_256x256.png',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth.',
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    id: 'braces',
    icon: '/assets/generated/icon-braces.dim_256x256.png',
    title: 'Braces & Aligners',
    description: 'Straighten your teeth with traditional braces or modern clear aligners for a perfect smile.',
    color: 'from-teal-400/20 to-teal-500/10',
  },
  {
    id: 'root-canal',
    icon: '/assets/generated/icon-root-canal.dim_256x256.png',
    title: 'Root Canal',
    description: 'Pain-free root canal treatments using the latest technology to save your natural teeth.',
    color: 'from-blue-400/20 to-blue-500/10',
  },
];

const premiumServices = [
  {
    id: 'dental-implants',
    title: 'Advanced Implants',
    description: '3D-guided precision implants with lifetime warranty and same-day placement.',
    emoji: '🦷',
    color: 'from-royal-blue/30 to-teal/20',
    badge: 'Premium',
    route: '/services/dental-implants',
    special: 'implant',
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description: 'Crystal-clear aligners with AI-powered treatment planning for invisible correction.',
    emoji: '✨',
    color: 'from-teal/30 to-blue-400/20',
    badge: 'Popular',
    route: '/services/invisalign',
    special: null,
  },
  {
    id: 'pediatric-dentistry',
    title: 'Kids Dentistry',
    description: 'Fun, fear-free dental care designed especially for children aged 1–16.',
    emoji: '🧒',
    color: 'from-teal-400/30 to-teal-300/20',
    badge: 'Family',
    route: '/services/pediatric-dentistry',
    special: 'bubble',
  },
  {
    id: 'smile-makeover',
    title: 'Smile Makeover',
    description: 'Complete smile transformation combining veneers, whitening, and contouring.',
    emoji: '😁',
    color: 'from-blue-500/30 to-teal/20',
    badge: 'Transform',
    route: '/services/smile-makeover',
    special: null,
  },
  {
    id: 'laser-dentistry',
    title: 'Laser Dentistry',
    description: 'Painless precision laser treatments for gums, cavities, and whitening.',
    emoji: '⚡',
    color: 'from-royal-blue/40 to-teal/30',
    badge: 'Advanced',
    route: '/services/laser-dentistry',
    special: 'laser',
  },
];

function BubbleCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="bubble-rise bubble-1" />
      <div className="bubble-rise bubble-2" />
      <div className="bubble-rise bubble-3" />
      {children}
    </div>
  );
}

function LaserCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="laser-beam" />
      <div className="laser-pulse" />
      {children}
    </div>
  );
}

function ImplantCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="implant-drop" />
      {children}
    </div>
  );
}

export default function ServicesGrid() {
  const navigate = useNavigate();
  const { setCursorIcon } = useCursorContext();

  return (
    <section id="services" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Comprehensive dental care with cutting-edge technology and compassionate expertise.
          </p>
        </div>

        {/* Standard Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((service) => (
            <div
              key={service.id}
              className={`glass-card bg-gradient-to-br ${service.color} rounded-2xl p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              onMouseEnter={() => setCursorIcon('dental')}
              onMouseLeave={() => setCursorIcon('default')}
            >
              <img
                src={service.icon}
                alt={service.title}
                className="w-14 h-14 mb-4 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Premium Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumServices.map((service) => {
            const cardContent = (
              <>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{service.emoji}</span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/20 text-white border border-white/30">
                    {service.badge}
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{service.description}</p>
                <span className="text-teal-300 text-sm font-medium group-hover:underline">
                  Learn more →
                </span>
              </>
            );

            const baseClass = `glass-card bg-gradient-to-br ${service.color} rounded-2xl p-6 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`;

            const mouseHandlers = {
              onMouseEnter: () => setCursorIcon('dental'),
              onMouseLeave: () => setCursorIcon('default'),
              onClick: () => navigate({ to: service.route as any }),
            };

            if (service.special === 'bubble') {
              return (
                <BubbleCard key={service.id} className={baseClass} {...mouseHandlers}>
                  {cardContent}
                </BubbleCard>
              );
            }
            if (service.special === 'laser') {
              return (
                <LaserCard key={service.id} className={baseClass} {...mouseHandlers}>
                  {cardContent}
                </LaserCard>
              );
            }
            if (service.special === 'implant') {
              return (
                <ImplantCard key={service.id} className={baseClass} {...mouseHandlers}>
                  {cardContent}
                </ImplantCard>
              );
            }
            return (
              <div key={service.id} className={baseClass} {...mouseHandlers}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
