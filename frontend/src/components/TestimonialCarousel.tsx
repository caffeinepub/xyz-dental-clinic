import { useEffect, useRef, useState } from 'react';
import { useGetApprovedReviews } from '../hooks/useQueries';

const fallbackReviews = [
  { id: 1, reviewerName: 'Priya Sharma', text: 'Absolutely amazing experience! Dr. Mehta transformed my smile completely. The staff is so caring and professional.', rating: 5 },
  { id: 2, reviewerName: 'Rahul Verma', text: 'Best dental clinic in the city! The Invisalign treatment was painless and the results are incredible.', rating: 5 },
  { id: 3, reviewerName: 'Anita Patel', text: 'I was terrified of dentists but this clinic changed everything. So gentle and thorough. Highly recommend!', rating: 5 },
  { id: 4, reviewerName: 'Suresh Kumar', text: 'Got dental implants here and they look completely natural. The 3D guided procedure was impressive.', rating: 5 },
  { id: 5, reviewerName: 'Meera Joshi', text: 'My kids love coming here! The pediatric team is fantastic with children. No more dental anxiety!', rating: 5 },
  { id: 6, reviewerName: 'Vikram Singh', text: 'Laser whitening gave me a Hollywood smile in just one session. Worth every rupee!', rating: 5 },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCarousel() {
  const { data: backendReviews } = useGetApprovedReviews();
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const reviews = backendReviews && backendReviews.length > 0
    ? backendReviews.map(r => ({
        id: Number(r.id),
        reviewerName: r.reviewerName,
        text: r.text,
        rating: Number(r.rating),
      }))
    : fallbackReviews;

  const doubled = [...reviews, ...reviews];

  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">What Our Patients Say</h2>
        <p className="text-white/70 text-lg">Real stories from real smiles</p>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />

        <div
          ref={trackRef}
          className="flex gap-6"
          style={{
            animation: paused ? 'none' : 'testimonialScroll 40s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="glass-card flex-shrink-0 w-80 rounded-2xl p-6"
              style={{ minWidth: 300 }}
            >
              <StarRating rating={review.rating} />
              <p className="text-white/85 text-sm leading-relaxed mb-4 italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-sm border border-teal-400/30">
                  {review.reviewerName.charAt(0)}
                </div>
                <span className="text-white font-medium text-sm">{review.reviewerName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
