import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    id: "invisalign",
    title: "Invisalign",
    description:
      "Straighten your teeth discreetly with clear aligners. No metal braces, just a beautiful smile.",
    expandDetail:
      "Invisible aligners se danton ko seedha karein bina kisi ko pata chale. Removable, comfortable aur effective.",
    icon: "/assets/generated/icon-braces.dim_256x256.png",
    bg: "bg-blue-50",
    glowColor: "rgba(59,130,246,0.25)",
    route: "/services/invisalign",
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    description:
      "Permanent tooth replacement that looks, feels, and functions like natural teeth.",
    expandDetail:
      "Zindagi bhar ka saath, asli danton jaisi mazbooti. Titanium implant jo jawbone se jud jata hai.",
    icon: "/assets/generated/icon-implants.dim_256x256.png",
    bg: "bg-teal-50",
    glowColor: "rgba(20,184,166,0.25)",
    route: "/services/dental-implants",
  },
  {
    id: "laser-dentistry",
    title: "Laser Dentistry",
    description:
      "Advanced laser treatments for precise, painless procedures with faster healing.",
    expandDetail:
      "Advanced laser se precise, dard-mukt ilaaj. Healing fast hoti hai aur koi cut nahi lagta.",
    icon: "/assets/generated/icon-whitening.dim_256x256.png",
    bg: "bg-purple-50",
    glowColor: "rgba(168,85,247,0.25)",
    route: "/services/laser-dentistry",
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    description:
      "Gentle, child-friendly dental care in a fun and welcoming environment.",
    expandDetail:
      "Bacchon ke liye gentle aur fun dental care. Unhe dentist se pyaar hoga, dar nahi.",
    icon: "/assets/generated/kids-tooth-cartoon.dim_200x200.png",
    bg: "bg-green-50",
    glowColor: "rgba(34,197,94,0.25)",
    route: "/services/pediatric-dentistry",
  },
  {
    id: "smile-makeover",
    title: "Smile Makeover",
    description:
      "Complete smile transformation combining multiple cosmetic treatments for stunning results.",
    expandDetail:
      "Complete smile transformation — whitening, veneers, alignment sab ek saath. Aapki dream smile ready!",
    icon: "/assets/generated/magic-wand-sparkle.dim_300x200.png",
    bg: "bg-orange-50",
    glowColor: "rgba(249,115,22,0.25)",
    route: "/services/smile-makeover",
  },
];

export default function ServicesGrid() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    for (const card of cards) {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = cards.indexOf(entry.target as HTMLElement);
            setTimeout(() => {
              const el = entry.target as HTMLElement;
              el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, index * 100);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );

    for (const card of cards) {
      observer.observe(card);
    }
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (serviceId: string) => {
    setExpandedId((prev) => (prev === serviceId ? null : serviceId));
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" ref={sectionRef}>
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Our Specialties
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Premium Dental Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We offer a comprehensive range of dental treatments using the latest
            technology to give you the smile you deserve.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-ocid={`services.item.${i + 1}`}
                className={`${service.bg} rounded-2xl overflow-hidden group border border-transparent`}
                style={{
                  boxShadow: isExpanded
                    ? `0 8px 32px ${service.glowColor}, 0 2px 8px rgba(0,0,0,0.08)`
                    : "0 1px 4px rgba(0,0,0,0.06)",
                  transform: isExpanded ? "translateY(-6px)" : "translateY(0)",
                  transition:
                    "box-shadow 0.3s ease, transform 0.3s ease, opacity 0.6s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded) {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-6px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 8px 32px ${service.glowColor}, 0 2px 8px rgba(0,0,0,0.08)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 1px 4px rgba(0,0,0,0.06)";
                  }
                }}
              >
                {/* Clickable header area — toggle expand */}
                <button
                  type="button"
                  onClick={() => handleCardClick(service.id)}
                  className="w-full text-left p-6 pb-3 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-sm">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                        color: "#6b7280",
                        transition: "transform 0.3s ease",
                        transform: isExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </button>

                {/* Collapsed arrow hint */}
                {!isExpanded && (
                  <div className="px-6 pb-4 flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </div>
                )}

                {/* Expandable detail section */}
                <div
                  style={{
                    maxHeight: isExpanded ? "140px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div className="px-6 pb-5 pt-2 border-t border-gray-200/60">
                    <p
                      className="text-gray-700 text-sm leading-relaxed mb-3"
                      style={{ fontStyle: "italic" }}
                    >
                      {service.expandDetail}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate({ to: service.route })}
                      data-ocid={`services.item.${i + 1}.button`}
                      className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold hover:gap-2 transition-all"
                    >
                      <span>Learn More</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 flex flex-col justify-between text-white">
            <div>
              <h3 className="font-bold text-xl mb-2">
                Not sure which service?
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Book a free consultation and our experts will recommend the best
                treatment for you.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="services.consultation.button"
              className="mt-6 bg-white text-blue-700 font-semibold py-2.5 px-5 rounded-full text-sm hover:bg-blue-50 transition-colors self-start"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
