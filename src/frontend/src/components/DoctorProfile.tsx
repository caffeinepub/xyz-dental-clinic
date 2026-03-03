import { Award, GraduationCap, Heart, Star } from "lucide-react";
import React, { useRef, useEffect } from "react";

const CREDENTIALS = [
  {
    icon: <GraduationCap size={18} />,
    title: "BDS, MDS",
    subtitle: "Dental Surgery",
  },
  { icon: <Award size={18} />, title: "15+ Years", subtitle: "Experience" },
  { icon: <Star size={18} />, title: "5000+", subtitle: "Patients Treated" },
  {
    icon: <Heart size={18} />,
    title: "Gentle Care",
    subtitle: "Patient-First Approach",
  },
];

export default function DoctorProfile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements: [HTMLDivElement | null, string][] = [
      [imageRef.current, "scale(0.9)"],
      [contentRef.current, "translateX(40px)"],
    ];
    for (const [el, transform] of elements) {
      if (!el) continue;
      el.style.opacity = "0";
      el.style.transform = transform;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (imageRef.current) {
              imageRef.current.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";
              imageRef.current.style.opacity = "1";
              imageRef.current.style.transform = "scale(1)";
            }
            if (contentRef.current) {
              contentRef.current.style.transition =
                "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s";
              contentRef.current.style.opacity = "1";
              contentRef.current.style.transform = "translateX(0)";
            }
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "3/4", maxHeight: "600px" }}
            >
              <img
                src="/assets/generated/doctor-profile.dim_600x800.png"
                alt="Dr. XYZ"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white rounded-xl p-4 shadow-xl">
              <p className="font-bold text-2xl">15+</p>
              <p className="text-blue-200 text-xs">Years of Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Meet Our Lead Dentist
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Dr. Rajesh Kumar
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              With over 15 years of experience in comprehensive dental care, Dr.
              Rajesh Kumar has transformed thousands of smiles. His
              patient-first philosophy combined with cutting-edge techniques
              ensures every visit is comfortable and effective.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Specializing in cosmetic dentistry, implantology, and
              orthodontics, Dr. Kumar stays at the forefront of dental
              innovation to provide you with the best possible care.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {CREDENTIALS.map((cred) => (
                <div
                  key={cred.title}
                  className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl"
                >
                  <div className="text-blue-600 mt-0.5">{cred.icon}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {cred.title}
                    </p>
                    <p className="text-gray-500 text-xs">{cred.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
