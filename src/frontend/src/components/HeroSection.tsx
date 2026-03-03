import { Award, ChevronDown, Clock, Star, Users } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useClinicStatusContext } from "../context/ClinicStatusContext";
import { useCountUpAnimation } from "../hooks/useCountUpAnimation";
import BookAppointmentDialog from "./BookAppointmentDialog";

const WORDS = ["Beautiful", "Healthy", "Confident", "Radiant"];

// Individual animated stat component
function AnimatedStat({
  icon,
  target,
  suffix,
  label,
}: {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
}) {
  const { count, containerRef } = useCountUpAnimation({
    target,
    duration: 1800,
  });

  return (
    <div
      ref={containerRef}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
    >
      <div className="text-blue-300 flex justify-center mb-2">{icon}</div>
      <p className="text-white font-bold text-xl">
        {Math.floor(count)}
        {suffix}
      </p>
      <p className="text-blue-200 text-xs">{label}</p>
    </div>
  );
}

// Static stat for non-numeric values like "4.9★" and "24/7"
function StaticStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
      <div className="text-blue-300 flex justify-center mb-2">{icon}</div>
      <p className="text-white font-bold text-xl">{value}</p>
      <p className="text-blue-200 text-xs">{label}</p>
    </div>
  );
}

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { isClosed } = useClinicStatusContext();
  const canBook = !isClosed;

  const leftContentRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Left content: slide from left
  useEffect(() => {
    const el = leftContentRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateX(-80px)";
    el.style.transition = "opacity 0.8s ease 0ms, transform 0.8s ease 0ms";
    const t = setTimeout(() => {
      if (el) {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      }
    }, 80);
    return () => clearTimeout(t);
  }, []);

  // Image: scale up from right with spring bounce
  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "scale(0.5)";
    el.style.transition =
      "opacity 0.9s cubic-bezier(0.34,1.56,0.64,1) 200ms, transform 0.9s cubic-bezier(0.34,1.56,0.64,1) 200ms";
    const t = setTimeout(() => {
      if (el) {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      }
    }, 80);
    return () => clearTimeout(t);
  }, []);

  // Subtitle and CTA: slide up from bottom
  useEffect(() => {
    const elements = [subtitleRef.current, ctaRef.current, statsRef.current];
    const delays = [200, 400, 600];

    for (const [i, el] of elements.entries()) {
      if (!el) continue;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `opacity 0.8s ease ${delays[i]}ms, transform 0.8s ease ${delays[i]}ms`;
      const idx = i;
      setTimeout(() => {
        const elem = elements[idx];
        if (elem) {
          elem.style.opacity = "1";
          elem.style.transform = "translateY(0)";
        }
      }, 100);
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c75 100%)",
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/assets/generated/hero-bg.dim_1920x1080.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content — slides in from left */}
          <div ref={leftContentRef}>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
              <Star size={14} className="text-yellow-400" />
              <span className="text-blue-200 text-sm font-medium">
                Trusted by 5000+ patients
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Your{" "}
              <span
                key={currentWord}
                className="text-blue-400"
                style={{
                  display: "inline-block",
                  animation: "fadeSlideUp 0.5s ease forwards",
                }}
              >
                {WORDS[currentWord]}
              </span>
              <br />
              Smile Starts Here
            </h1>

            <p
              ref={subtitleRef}
              className="text-blue-100/80 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Experience world-class dental care with cutting-edge technology
              and a compassionate team dedicated to your perfect smile.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => canBook && setIsBookingOpen(true)}
                disabled={!canBook}
                data-ocid="hero.primary_button"
                className={`px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-lg ${
                  canBook
                    ? "bg-blue-500 text-white hover:bg-blue-400 hover:shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
                style={
                  canBook
                    ? { animation: "heartbeat 2s ease infinite" }
                    : undefined
                }
              >
                {isClosed ? "Booking Unavailable" : "Book Appointment"}
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                data-ocid="hero.secondary_button"
                className="px-8 py-3.5 rounded-full font-semibold text-base border-2 border-white/30 text-white hover:bg-white/10 transition-all"
              >
                Our Services
              </button>
            </div>
          </div>

          {/* Right Image — scales up from small */}
          <div ref={imageRef} className="hidden lg:block">
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src="/assets/generated/doctor-profile.dim_600x800.png"
                  alt="Our Dentist"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/generated/hero-bg.dim_1920x1080.png";
                  }}
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-sm">
                      ISO Certified
                    </p>
                    <p className="text-gray-500 text-xs">Dental Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
        >
          <AnimatedStat
            icon={<Users size={20} />}
            target={5000}
            suffix="+"
            label="Happy Patients"
          />
          <AnimatedStat
            icon={<Award size={20} />}
            target={15}
            suffix="+"
            label="Years Experience"
          />
          <StaticStat
            icon={<Star size={20} />}
            value="4.9★"
            label="Average Rating"
          />
          <StaticStat
            icon={<Clock size={20} />}
            value="24/7"
            label="Emergency Care"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-white/50" />
      </div>

      <BookAppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
          14% { transform: scale(1.06); }
          28% { transform: scale(1); }
          42% { transform: scale(1.06); box-shadow: 0 0 0 8px rgba(59,130,246,0); }
          70% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59,130,246,0); }
        }
      `}</style>
    </section>
  );
}
