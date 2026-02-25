import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCursorContext } from '@/context/CursorContext';
import { useGetAllServices } from '@/hooks/useQueries';

// ─── Implant 3D Rotation Card ─────────────────────────────────────────────────
function ImplantCard({
  title,
  description,
  icon,
  imageUrl,
  onClick,
}: {
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef<number>(0);
  const rotRef = useRef(0);

  useEffect(() => {
    if (hovered) {
      const animate = () => {
        rotRef.current = (rotRef.current + 1.5) % 360;
        setRotation(rotRef.current);
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]);

  return (
    <div
      className="glass-card rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all border border-border/40 hover:border-primary/40 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-32 mb-4 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-28 w-auto object-contain"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transition: hovered ? 'none' : 'transform 0.5s ease',
            }}
          />
        ) : (
          <div
            className="text-6xl"
            style={{
              transform: `rotateY(${rotation}deg)`,
              display: 'inline-block',
              transition: hovered ? 'none' : 'transform 0.5s ease',
            }}
          >
            {icon}
          </div>
        )}
      </div>
      <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <span className="text-primary text-sm mt-3 inline-block group-hover:underline">Learn more →</span>
    </div>
  );
}

// ─── Invisalign Mini Slider Card ──────────────────────────────────────────────
function InvisalignCard({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <div
      className="glass-card rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all border border-border/40 hover:border-primary/40 group"
      onClick={onClick}
    >
      <div
        ref={containerRef}
        className="relative h-32 mb-4 rounded-xl overflow-hidden select-none"
        onMouseDown={(e) => {
          dragging.current = true;
          handleMove(e.clientX);
          e.stopPropagation();
        }}
        onMouseMove={(e) => {
          if (dragging.current) handleMove(e.clientX);
        }}
        onMouseUp={() => {
          dragging.current = false;
        }}
        onMouseLeave={() => {
          dragging.current = false;
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/assets/generated/invisalign-before.dim_800x500.png"
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src="/assets/generated/invisalign-after.dim_800x500.png"
            alt="After"
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${10000 / Math.max(sliderPos, 1)}%`, maxWidth: 'none' }}
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center">
            <span className="text-xs text-primary font-bold">⇔</span>
          </div>
        </div>
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
          Before
        </div>
        <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-1.5 py-0.5 rounded">
          After
        </div>
      </div>
      <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <span className="text-primary text-sm mt-3 inline-block group-hover:underline">Learn more →</span>
    </div>
  );
}

// ─── Kids Animated Card ───────────────────────────────────────────────────────
function useSimpleReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, isVisible };
}

function KidsCard({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  const { ref: cardRef, isVisible } = useSimpleReveal();

  return (
    <div
      ref={cardRef}
      className="glass-card rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all border border-border/40 hover:border-primary/40 group"
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-32 mb-4">
        <img
          src="/assets/generated/kids-tooth-cartoon.dim_200x200.png"
          alt="Kids Dentistry"
          className="h-28 w-auto object-contain"
          style={{
            animation: isVisible ? 'kidsSmile 1.5s ease-in-out infinite alternate' : 'none',
          }}
        />
      </div>
      <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <span className="text-primary text-sm mt-3 inline-block group-hover:underline">Learn more →</span>
    </div>
  );
}

// ─── Smile Makeover Magic Wand Card ──────────────────────────────────────────
function SmileMakeoverCard({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="glass-card rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all border border-border/40 hover:border-primary/40 group relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
        <img
          src="/assets/generated/smile-before-1.dim_800x500.png"
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{
            filter: hovered
              ? 'brightness(1.3) saturate(1.2)'
              : 'brightness(0.9) saturate(0.8)',
          }}
        />
        {hovered && (
          <img
            src="/assets/generated/magic-wand-sparkle.dim_300x200.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ animation: 'sweepGlow 0.8s ease-out forwards', mixBlendMode: 'screen' }}
          />
        )}
      </div>
      <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <span className="text-primary text-sm mt-3 inline-block group-hover:underline">Learn more →</span>
    </div>
  );
}

// ─── Laser Scan Line Card ─────────────────────────────────────────────────────
function LaserCard({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="glass-card rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all border border-border/40 hover:border-primary/40 group relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
        <img
          src="/assets/generated/laser-dentistry-card.dim_600x400.png"
          alt="Laser Dentistry"
          className="w-full h-full object-cover"
        />
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ animation: 'scanLine 1.2s linear infinite' }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '-100%',
                width: '100%',
                height: '3px',
                background:
                  'linear-gradient(90deg, transparent, rgba(20,184,166,0.9), rgba(56,189,248,1), rgba(20,184,166,0.9), transparent)',
                boxShadow: '0 0 12px 4px rgba(20,184,166,0.6)',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
        )}
      </div>
      <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <span className="text-primary text-sm mt-3 inline-block group-hover:underline">Learn more →</span>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STANDARD_SERVICES = [
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Professional whitening for a brighter, more confident smile.',
    icon: '✨',
    path: '/services/teeth-whitening',
  },
  {
    id: 'root-canal',
    title: 'Root Canal',
    description: 'Pain-free root canal therapy to save your natural tooth.',
    icon: '🦷',
    path: '/services/root-canal',
  },
  {
    id: 'dental-crowns',
    title: 'Dental Crowns',
    description: 'Custom crowns to restore damaged or weakened teeth.',
    icon: '👑',
    path: '/services/dental-crowns',
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description: 'Traditional braces and modern alignment solutions.',
    icon: '😁',
    path: '/services/orthodontics',
  },
];

const PREMIUM_SERVICES_CONFIG = [
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description: 'Permanent titanium implants for a natural-looking smile.',
    icon: '🦷',
    path: '/dental-implants',
    animationType: 'implant3d' as const,
  },
  {
    id: 'invisalign',
    title: 'Invisalign',
    description: 'Clear aligners for a straighter smile, invisibly.',
    icon: '😊',
    path: '/invisalign',
    animationType: 'invisalign' as const,
  },
  {
    id: 'pediatric-dentistry',
    title: 'Kids Dentistry',
    description: 'Gentle, fun dental care for children of all ages.',
    icon: '🧒',
    path: '/pediatric-dentistry',
    animationType: 'kids' as const,
  },
  {
    id: 'smile-makeover',
    title: 'Smile Makeover',
    description: 'Complete smile transformation with advanced cosmetic dentistry.',
    icon: '✨',
    path: '/smile-makeover',
    animationType: 'smileMakeover' as const,
  },
  {
    id: 'laser-dentistry',
    title: 'Laser Dentistry',
    description: 'Precision laser treatments for painless procedures.',
    icon: '⚡',
    path: '/laser-dentistry',
    animationType: 'laser' as const,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ServicesGrid() {
  const navigate = useNavigate();
  const { setCursorIcon } = useCursorContext();
  const { data: servicesData } = useGetAllServices();

  const getServiceData = (id: string) => servicesData?.find((s) => s.id === id);

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Dental Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive dental care with cutting-edge technology and a gentle touch.
          </p>
        </div>

        {/* Standard Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STANDARD_SERVICES.map((svc) => (
            <div
              key={svc.id}
              className="glass-card rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all border border-border/40 hover:border-primary/40 group"
              onClick={() => navigate({ to: svc.path })}
              onMouseEnter={() => setCursorIcon('dental')}
              onMouseLeave={() => setCursorIcon('default')}
            >
              <div className="text-4xl mb-3">{svc.icon}</div>
              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {svc.title}
              </h3>
              <p className="text-muted-foreground text-sm">{svc.description}</p>
            </div>
          ))}
        </div>

        {/* Premium Services */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-foreground">✨ Premium Treatments</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PREMIUM_SERVICES_CONFIG.map((svc) => {
            const backendData = getServiceData(svc.id);
            const title = backendData?.displayName || svc.title;
            const description = backendData?.description || svc.description;
            const imageUrl = backendData?.featuredPhoto?.getDirectURL();
            const handleClick = () => navigate({ to: svc.path });

            const wrapCursor = (children: React.ReactNode) => (
              <div
                key={svc.id}
                onMouseEnter={() => setCursorIcon('dental')}
                onMouseLeave={() => setCursorIcon('default')}
              >
                {children}
              </div>
            );

            if (svc.animationType === 'implant3d') {
              return wrapCursor(
                <ImplantCard
                  title={title}
                  description={description}
                  icon={svc.icon}
                  imageUrl={imageUrl}
                  onClick={handleClick}
                />
              );
            }
            if (svc.animationType === 'invisalign') {
              return wrapCursor(
                <InvisalignCard title={title} description={description} onClick={handleClick} />
              );
            }
            if (svc.animationType === 'kids') {
              return wrapCursor(
                <KidsCard title={title} description={description} onClick={handleClick} />
              );
            }
            if (svc.animationType === 'smileMakeover') {
              return wrapCursor(
                <SmileMakeoverCard title={title} description={description} onClick={handleClick} />
              );
            }
            if (svc.animationType === 'laser') {
              return wrapCursor(
                <LaserCard title={title} description={description} onClick={handleClick} />
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}
