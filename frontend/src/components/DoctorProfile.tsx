export default function DoctorProfile() {
  return (
    <section id="doctor" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Meet Your Doctor</h2>
          <p className="text-white/70 text-lg">Expert care from a trusted professional</p>
        </div>

        <div
          className="glass-card rounded-3xl overflow-hidden"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr' }}
        >
          {/* Photo */}
          <div className="relative">
            <img
              src="/assets/generated/doctor-profile.dim_600x800.png"
              alt="Dr. Mehta"
              className="w-full h-full object-cover"
              style={{ minHeight: 380 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
          </div>

          {/* Info */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-4 w-fit">
              Chief Dental Surgeon
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">Dr. Anjali Mehta</h3>
            <p className="text-teal-300 font-medium mb-5">BDS, MDS – Prosthodontics & Implantology</p>

            <p className="text-white/75 text-sm leading-relaxed mb-6">
              With over 15 years of experience, Dr. Mehta specializes in full-mouth rehabilitation,
              cosmetic dentistry, and advanced implantology. She has transformed thousands of smiles
              with her gentle approach and precision techniques.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Years Experience', value: '15+' },
                { label: 'Smiles Transformed', value: '5000+' },
                { label: 'Awards Won', value: '12' },
                { label: 'Success Rate', value: '99.2%' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-teal-300">{stat.value}</div>
                  <div className="text-white/60 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {['Implantology', 'Cosmetic Dentistry', 'Invisalign Certified', 'Laser Dentistry'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs">
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
