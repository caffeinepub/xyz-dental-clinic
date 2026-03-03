import { Star } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useGetApprovedReviews } from "../hooks/useQueries";

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    reviewerName: "Priya Sharma",
    text: "Amazing experience! Dr. Kumar transformed my smile completely. The staff is so friendly and professional.",
    rating: 5,
  },
  {
    id: 2,
    reviewerName: "Rahul Mehta",
    text: "Best dental clinic in the city. The Invisalign treatment was painless and the results are incredible!",
    rating: 5,
  },
  {
    id: 3,
    reviewerName: "Anita Patel",
    text: "I was terrified of dentists but the team here made me feel so comfortable. Highly recommend!",
    rating: 5,
  },
  {
    id: 4,
    reviewerName: "Vikram Singh",
    text: "Got dental implants here and they look completely natural. Excellent work and great follow-up care.",
    rating: 5,
  },
  {
    id: 5,
    reviewerName: "Sunita Joshi",
    text: "My kids love coming here! The pediatric dentist is wonderful with children. 10/10 would recommend.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const { data: reviews } = useGetApprovedReviews();
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  const testimonials =
    reviews && reviews.length > 0
      ? reviews.map((r) => ({
          id: Number(r.id),
          reviewerName: r.reviewerName,
          text: r.text,
          rating: Number(r.rating),
        }))
      : FALLBACK_TESTIMONIALS;

  const doubled = [...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = 320 + 24; // width + gap
    const totalWidth = testimonials.length * cardWidth;

    const animate = () => {
      posRef.current += 0.5;
      if (posRef.current >= totalWidth) {
        posRef.current = 0;
      }
      if (track) {
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real stories from real patients who trusted us with their smiles.
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-6"
          style={{ width: "max-content" }}
        >
          {doubled.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-shrink-0"
              style={{ width: "320px" }}
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }, (_, j) => (
                  <Star
                    key={`star-${t.id}-${i}-${j}`}
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">
                    {t.reviewerName.charAt(0)}
                  </span>
                </div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t.reviewerName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
