import { useScrollReveal } from '../hooks/useScrollReveal';

export default function DoctorProfile() {
  const { ref: imgRef, isVisible: imgVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: textRef, isVisible: textVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Doctor Image */}
          <div
            ref={imgRef}
            className={`transition-all duration-700 ${
              imgVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-blue-200 rounded-3xl transform rotate-3 opacity-40" />
              <img
                src="/assets/generated/doctor-profile.dim_600x800.png"
                alt="Dr. Sharma"
                className="relative rounded-3xl shadow-2xl w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>

          {/* Doctor Info */}
          <div
            ref={textRef}
            className={`transition-all duration-700 delay-200 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
              Meet Your Doctor
            </span>
            <h2 className="text-4xl font-bold text-slate-800 font-playfair mt-2 mb-4">
              Dr. Priya Sharma
            </h2>
            <p className="text-slate-500 text-lg mb-2">BDS, MDS – Prosthodontics</p>
            <p className="text-slate-600 leading-relaxed mb-6">
              With over 15 years of experience in advanced dental care, Dr. Sharma combines
              technical expertise with a gentle approach to ensure every patient feels comfortable
              and confident in their treatment journey.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: '15+', label: 'Years Experience' },
                { value: '5000+', label: 'Happy Patients' },
                { value: '98%', label: 'Success Rate' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">{stat.value}</div>
                  <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2">
              {['Implantology', 'Cosmetic Dentistry', 'Orthodontics', 'Laser Dentistry'].map((tag) => (
                <span
                  key={tag}
                  className="bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full border border-teal-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
