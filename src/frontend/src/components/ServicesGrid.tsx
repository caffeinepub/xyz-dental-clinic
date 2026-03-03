import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useRef } from "react";

const SERVICES = [
  {
    id: "invisalign",
    title: "Invisalign",
    description:
      "Straighten your teeth discreetly with clear aligners. No metal braces, just a beautiful smile.",
    icon: "/assets/generated/icon-braces.dim_256x256.png",
    bg: "bg-blue-50",
    route: "/services/invisalign",
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    description:
      "Permanent tooth replacement that looks, feels, and functions like natural teeth.",
    icon: "/assets/generated/icon-implants.dim_256x256.png",
    bg: "bg-teal-50",
    route: "/services/dental-implants",
  },
  {
    id: "laser-dentistry",
    title: "Laser Dentistry",
    description:
      "Advanced laser treatments for precise, painless procedures with faster healing.",
    icon: "/assets/generated/icon-whitening.dim_256x256.png",
    bg: "bg-purple-50",
    route: "/services/laser-dentistry",
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    description:
      "Gentle, child-friendly dental care in a fun and welcoming environment.",
    icon: "/assets/generated/kids-tooth-cartoon.dim_200x200.png",
    bg: "bg-green-50",
    route: "/services/pediatric-dentistry",
  },
  {
    id: "smile-makeover",
    title: "Smile Makeover",
    description:
      "Complete smile transformation combining multiple cosmetic treatments for stunning results.",
    icon: "/assets/generated/magic-wand-sparkle.dim_300x200.png",
    bg: "bg-orange-50",
    route: "/services/smile-makeover",
  },
];

export default function ServicesGrid() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

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
          {SERVICES.map((service, i) => (
            <button
              type="button"
              key={service.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => navigate({ to: service.route })}
              className={`${service.bg} rounded-2xl p-6 cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200 text-left`}
            >
              <div className="w-16 h-16 mb-4 rounded-xl overflow-hidden bg-white shadow-sm">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                <span>Learn More</span>
                <ArrowRight size={14} />
              </div>
            </button>
          ))}

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
