import { ArrowLeft, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import BookAppointmentDialog from "../components/BookAppointmentDialog";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MagneticButton from "../components/MagneticButton";

const BENEFITS = [
  "Nearly invisible clear aligners",
  "Removable for eating and cleaning",
  "Comfortable with no metal brackets",
  "Shorter treatment time than braces",
  "Custom-made for your teeth",
  "Regular progress check-ins",
];

export default function InvisalignDetail() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section
          className="pt-24 pb-16 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-blue-300 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
                  Clear Aligners
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-4">
                  Invisalign Treatment
                </h1>
                <p className="text-blue-100/80 text-lg leading-relaxed mb-8">
                  Straighten your teeth discreetly with the world's most
                  advanced clear aligner system. No metal, no wires — just a
                  beautiful smile.
                </p>
                <MagneticButton>
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(true)}
                    className="bg-blue-500 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-400 transition-colors shadow-lg"
                  >
                    Book Free Consultation
                  </button>
                </MagneticButton>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/invisalign-aligner.dim_600x400.png"
                  alt="Invisalign Aligner"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Before/After */}
        <BeforeAfterSlider />

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Invisalign?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm"
                >
                  <CheckCircle
                    size={20}
                    className="text-blue-600 mt-0.5 shrink-0"
                  />
                  <span className="text-gray-700">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookAppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService="Invisalign"
      />
    </div>
  );
}
