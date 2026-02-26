import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGetApprovedReviews } from '../hooks/useQueries';

const STATIC_TESTIMONIALS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    text: 'Excellent service! Dr. Sharma is very professional and the clinic is spotless. My implant procedure was painless.',
    rating: 5,
    treatment: 'Dental Implants',
  },
  {
    id: 2,
    name: 'Priya Patel',
    text: 'My Invisalign treatment was amazing. The results exceeded my expectations. Highly recommend!',
    rating: 5,
    treatment: 'Invisalign',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    text: 'Brought my kids here and they loved it! The staff is so gentle and patient with children.',
    rating: 5,
    treatment: 'Pediatric Dentistry',
  },
  {
    id: 4,
    name: 'Sunita Verma',
    text: 'The smile makeover completely transformed my confidence. Worth every penny!',
    rating: 5,
    treatment: 'Smile Makeover',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    text: 'Laser treatment was quick and painless. Modern equipment and caring staff.',
    rating: 5,
    treatment: 'Laser Dentistry',
  },
];

export default function TestimonialCarousel() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { data: backendReviews } = useGetApprovedReviews();
  const scrollRef = useRef<HTMLDivElement>(null);

  const reviews = backendReviews && backendReviews.length > 0
    ? backendReviews.map((r) => ({
        id: Number(r.id),
        name: r.reviewerName,
        text: r.text,
        rating: Number(r.rating),
        treatment: 'Dental Care',
      }))
    : STATIC_TESTIMONIALS;

  // Duplicate for infinite scroll
  const allReviews = [...reviews, ...reviews];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animFrame: number;
    let pos = 0;

    const scroll = () => {
      pos += 0.5;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      animFrame = requestAnimationFrame(scroll);
    };

    animFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animFrame);
  }, [reviews.length]);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-slate-800 font-playfair mb-4">
            What Our Patients Say
          </h2>
          <p className="text-slate-500 text-lg">Real stories from real patients</p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          {allReviews.map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="flex-shrink-0 w-72 glass-card rounded-2xl p-6 shadow-md"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-4">
                "{review.text}"
              </p>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{review.name}</p>
                <p className="text-teal-600 text-xs">{review.treatment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
